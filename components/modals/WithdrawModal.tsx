'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Investment } from '@/types';
import Input from '@/components/ui/Input';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  investments: Investment[];
  onWithdraw: (investmentId: number, amount: number, walletAddress: string) => Promise<void>;
}

export default function WithdrawModal({ isOpen, onClose, investments, onWithdraw }: WithdrawModalProps) {
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedInvestment(null);
      setAmount('');
      setWalletAddress('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedInvestment) {
      setError('Please select an investment');
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError('Invalid amount');
      return;
    }

    // Validation de l'adresse TRC20
    if (!walletAddress || walletAddress.length < 34) {
      setError('Invalid TRC20 wallet address');
      return;
    }

    setIsLoading(true);
    try {
      await onWithdraw(selectedInvestment.id, withdrawAmount, walletAddress);
      onClose();
    } catch (err: any) {
      // Afficher l'erreur du serveur
      setError(err.message);
      // Réinitialiser le montant si l'erreur concerne le dépassement des bénéfices
      if (err.message.includes('exceeds available earnings')) {
        setAmount('');
      }
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
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative"
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6">Withdraw Funds</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select an investment
            </label>
            <div className="grid grid-cols-1 gap-2">
              {investments.map((investment) => (
                <button
                  key={investment.id}
                  onClick={() => {
                    setSelectedInvestment(investment);
                    // Réinitialiser le montant et l'erreur lors du changement d'investissement
                    setAmount('');
                    setError('');
                  }}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    selectedInvestment?.id === investment.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                  }`}
                >
                  <div className="font-medium">Plan: {investment.plan.name}</div>
                  <div className="text-sm opacity-80">
                    Amount: {investment.amount} USDT
                  </div>
                  <div className="text-sm text-orange-500 font-medium">
                    Available earnings: {investment.available_earnings} USDT
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Wallet Address (TRC20)"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your TRC20 wallet address"
            helperText="Enter your TRC20 wallet address to receive funds"
          />

          <Input
            label="Withdrawal Amount (USDT)"
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError(''); // Réinitialiser l'erreur lors de la modification du montant
            }}
            placeholder="Enter amount in USDT"
            min="0"
            step="0.01"
            helperText={selectedInvestment ? `Maximum: ${selectedInvestment.available_earnings} USDT` : undefined}
          />

          {selectedInvestment && (
            <div className="text-sm text-gray-400">
              Available earnings: {selectedInvestment.available_earnings} USDT
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !selectedInvestment || !amount || !walletAddress}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                isLoading || !selectedInvestment || !amount || !walletAddress
                  ? 'bg-orange-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : 'Withdraw'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
