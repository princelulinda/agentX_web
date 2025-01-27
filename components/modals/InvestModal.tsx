'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plan, Investment } from '@/types';
import Input from '@/components/ui/Input';
import axiosInstance from '@/lib/axios';
import UpgradeInvestmentModal from './UpgradeInvestmentModal';

interface InvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  plans: Plan[];
  availableBalance: number;
  onSuccess: () => void;
  currentInvestments: Investment[];
}

export default function InvestModal({ 
  isOpen, 
  onClose, 
  plans,
  availableBalance,
  onSuccess,
  currentInvestments 
}: InvestModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeInvestment, setActiveInvestment] = useState<Investment | null>(null);

  const handleSubmit = async () => {
    if (!selectedPlan) {
      setError('Veuillez sélectionner un plan');
      return;
    }

    const investAmount = parseFloat(amount);
    if (isNaN(investAmount) || investAmount < parseFloat(selectedPlan.minimum_investment)) {
      setError(`Le montant minimum pour ce plan est de ${selectedPlan.minimum_investment} USDT`);
      return;
    }

    if (investAmount > availableBalance) {
      setError('Solde insuffisant');
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post('/my-investments/', {
        plan_id: selectedPlan.id,
        amount_invested: investAmount
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      if (err.response?.data?.[0] === "Vous avez déjà un investissement actif. Utilisez la mise à niveau pour changer de plan.") {
        const activeInv = currentInvestments.find(inv => inv.status === 'ACTIVE');
        if (activeInv) {
          setActiveInvestment(activeInv);
          setShowUpgradeModal(true);
          onClose(); // Ferme le modal d'investissement
        }
      } else {
        setError(err.response?.data?.message || err.response?.data?.[0] || 'Une erreur est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (showUpgradeModal && activeInvestment) {
    return (
      <UpgradeInvestmentModal
        isOpen={showUpgradeModal}
        onClose={() => {
          setShowUpgradeModal(false);
          setActiveInvestment(null);
        }}
        plans={plans}
        currentInvestment={activeInvestment}
        availableBalance={availableBalance}
        onSuccess={onSuccess}
      />
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6">Investir</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-zinc-800/50 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Solde disponible</div>
            <div className="text-xl font-bold text-white">{availableBalance.toFixed(2)} USDT</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sélectionner un plan
            </label>
            <div className="grid grid-cols-1 gap-2">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    selectedPlan?.id === plan.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                  }`}
                >
                  <div className="font-medium">{plan.name}</div>
                  <div className="text-sm opacity-80">
                    Min: {plan.minimum_investment} USDT | Rendement: {(parseFloat(plan.daily_return) * 100).toFixed(3)}%/jour
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Montant à investir (USDT)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min={selectedPlan ? parseFloat(selectedPlan.minimum_investment) : 0}
            max={availableBalance}
            step="0.01"
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading || !selectedPlan || !amount}
            className={`w-full py-2 px-4 rounded-lg font-medium ${
              isLoading || !selectedPlan || !amount
                ? 'bg-orange-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isLoading ? 'Chargement...' : 'Investir maintenant'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
