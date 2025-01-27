'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Transaction } from '@/types';
import axiosInstance from '@/lib/axios';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get('/transactions/');
        setTransactions(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getTransactionTypeColor = (type: Transaction['transaction_type']) => {
    switch (type) {
      case 'INVESTMENT':
        return 'text-blue-500';
      case 'WITHDRAWAL':
        return 'text-orange-500';
      case 'EARNING':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500/10 text-green-500';
      case 'PENDING':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'FAILED':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Historique des transactions</h1>
          <p className="text-gray-400 mt-2">
            Consultez l'historique de toutes vos transactions
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-4 text-gray-400 font-medium">ID</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Type</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Montant</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Hash</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border-b border-zinc-800 hover:bg-zinc-800/50"
                  >
                    <td className="p-4 text-sm">#{transaction.id}</td>
                    <td className="p-4 text-sm">
                      {new Date(transaction.created_at).toLocaleString('fr-FR', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </td>
                    <td className="p-4 text-sm">
                      <span className={getTransactionTypeColor(transaction.transaction_type)}>
                        {transaction.transaction_type}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      {parseFloat(transaction.amount).toFixed(2)} USDT
                    </td>
                    <td className="p-4 text-sm">
                      {transaction.tx_hash ? (
                        <span className="text-xs font-mono text-gray-400">
                          {transaction.tx_hash.slice(0, 8)}...{transaction.tx_hash.slice(-8)}
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="p-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
