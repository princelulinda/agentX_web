'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plan, Investment } from '@/types';
import Input from '@/components/ui/Input';
import axiosInstance from '@/lib/axios';

interface UpgradeInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plans: Plan[];
  currentInvestment: Investment;
  availableBalance: number;
  onSuccess: () => void;
}

export default function UpgradeInvestmentModal({
  isOpen,
  onClose,
  plans,
  currentInvestment,
  availableBalance,
  onSuccess
}: UpgradeInvestmentModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [additionalAmount, setAdditionalAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const currentAmount = parseFloat(currentInvestment.amount_invested);
  const maxAdditionalAmount = availableBalance;

  const handleUpgrade = async () => {
    if (!selectedPlan) {
      setError('Please select a new plan');
      return;
    }

    if (selectedPlan.id === currentInvestment.plan_id) {
      setError('Please select a different plan');
      return;
    }

    const additionalAmountValue = additionalAmount ? parseFloat(additionalAmount) : 0;
    const totalAmount = currentAmount + additionalAmountValue;

    if (additionalAmountValue > maxAdditionalAmount) {
      setError('Insufficient balance for additional amount');
      return;
    }

    if (totalAmount < parseFloat(selectedPlan.minimum_investment)) {
      setError(`Total amount must be greater than ${selectedPlan.minimum_investment} USDT for this plan`);
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post(`/my-investments/${currentInvestment.id}/upgrade/`, {
        new_plan: selectedPlan.id,
        additional_amount: additionalAmountValue || undefined
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

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
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6">Upgrade Investment</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-zinc-800/50 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Current Plan</div>
            <div className="text-xl font-bold text-white">{currentInvestment.plan}</div>
            <div className="text-sm text-gray-400 mt-1">
              Amount Invested: {currentAmount.toFixed(2)} USDT
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select New Plan
            </label>
            <div className="grid grid-cols-1 gap-2">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  disabled={plan.id === currentInvestment.plan_id}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    plan.id === currentInvestment.plan_id
                      ? 'bg-zinc-800/50 text-gray-500 cursor-not-allowed'
                      : selectedPlan?.id === plan.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                  }`}
                >
                  <div className="font-medium">{plan.name}</div>
                  <div className="text-sm opacity-80">
                    Min: {plan.minimum_investment} USDT | Daily Return: {(parseFloat(plan.daily_return) * 100).toFixed(3)}%/day
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-800/50 p-3 rounded-lg">
            <div className="text-sm text-gray-400 mb-2">Available Balance</div>
            <div className="text-lg font-bold text-white">{availableBalance.toFixed(2)} USDT</div>
          </div>

          <Input
            label="Additional Amount (optional)"
            type="number"
            value={additionalAmount}
            onChange={(e) => setAdditionalAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            max={maxAdditionalAmount}
            step="0.01"
          />

          {selectedPlan && (
            <div className="bg-zinc-800/50 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Total Amount After Upgrade</div>
              <div className="text-xl font-bold text-white">
                {(currentAmount + (parseFloat(additionalAmount) || 0)).toFixed(2)} USDT
              </div>
              {selectedPlan && (
                <div className="text-sm text-gray-400 mt-1">
                  Minimum Required: {selectedPlan.minimum_investment} USDT
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleUpgrade}
            disabled={isLoading || !selectedPlan}
            className={`w-full py-2 px-4 rounded-lg font-medium ${
              isLoading || !selectedPlan
                ? 'bg-orange-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isLoading ? 'Processing...' : 'Upgrade Investment'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
