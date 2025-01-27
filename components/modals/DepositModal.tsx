'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plan } from '@/types';
import Input from '@/components/ui/Input';
import { QRCodeSVG } from 'qrcode.react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  plans: Plan[];
  onDeposit: (amount: number, planId: number, transactionHash: string) => Promise<void>;
}

export default function DepositModal({ isOpen, onClose, plans, onDeposit }: DepositModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'select_plan' | 'payment'>('select_plan');
  const [copySuccess, setCopySuccess] = useState(false);

  const WALLET_ADDRESS = '0x19563cF5bB4935043a9220eBc292456A72380B1D';

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setAmount('');
      setSelectedPlan(null);
      setTransactionHash('');
      setError('');
      setStep('select_plan');
      setCopySuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedPlan) {
      setError('Please select a plan');
      return;
    }

    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount < parseFloat(selectedPlan.minimum_investment)) {
      setError(`The minimum deposit amount for this plan is ${selectedPlan.minimum_investment} USDT`);
      return;
    }

    if (!transactionHash) {
      setError('Please enter the transaction hash');
      return;
    }

    if (!/^0x[a-fA-F0-9]{64}$/.test(transactionHash)) {
      setError('Invalid transaction hash');
      return;
    }

    setIsLoading(true);
    try {
      await onDeposit(depositAmount, selectedPlan.id, transactionHash);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    try {
      // Utilisation de l'API du presse-papiers avec fallback
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(WALLET_ADDRESS).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        });
      } else {
        // Fallback pour les contextes non sécurisés
        const textArea = document.createElement('textarea');
        textArea.value = WALLET_ADDRESS;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          console.error('Erreur lors de la copie :', err);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Erreur lors de la copie :', err);
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

        <h2 className="text-2xl font-bold mb-6">Deposit Funds</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        {step === 'select_plan' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select a plan
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
                      Min: {plan.minimum_investment} USDT | Return: {(parseFloat(plan.daily_return) * 100).toFixed(3)}%/day
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Deposit amount (USDT)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min={selectedPlan ? parseFloat(selectedPlan.minimum_investment) : 0}
              step="0.01"
            />

            <button
              onClick={() => selectedPlan && amount && setStep('payment')}
              disabled={!selectedPlan || !amount}
              className={`w-full py-2 px-4 rounded-lg font-medium ${
                !selectedPlan || !amount
                  ? 'bg-orange-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mb-4">
                <QRCodeSVG 
                  value={WALLET_ADDRESS}
                  size={200}
                  level="H"
                  className="mx-auto bg-white p-2 rounded-lg"
                />
              </div>
              
              <div className="bg-zinc-800 p-3 rounded-lg">
                <p className="text-sm text-gray-300 mb-2">USDT (TRC20) deposit address</p>
                <div className="flex items-center justify-between bg-zinc-900 px-3 py-2 rounded">
                  <code className="text-sm text-orange-500 break-all">
                    {WALLET_ADDRESS}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="ml-2 p-1 hover:bg-zinc-800 rounded group relative"
                  >
                    {copySuccess ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                      </svg>
                    )}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                1. Send exactly <span className="text-orange-500 font-bold">{amount} USDT</span> to the address above
              </p>
              <p className="text-sm text-gray-300">
                2. Copy the transaction hash once the transaction is complete
              </p>
              <p className="text-sm text-gray-300">
                3. Paste the transaction hash below and confirm
              </p>
            </div>

            <Input
              label="Transaction hash"
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
              placeholder="0x..."
              helperText="The transaction hash starts with 0x and contains 64 characters"
            />

            <div className="flex space-x-3">
              <button
                onClick={() => setStep('select_plan')}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-2 px-4 rounded-lg font-medium"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading || !transactionHash}
                className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                  isLoading || !transactionHash
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
                    Confirming...
                  </div>
                ) : 'Confirm deposit'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
