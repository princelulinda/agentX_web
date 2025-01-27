'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { User, Plan } from '@/types';
import axiosInstance from '@/lib/axios';
import DepositModal from '@/components/modals/DepositModal';
import WithdrawModal from '@/components/modals/WithdrawModal';
import InvestModal from '@/components/modals/InvestModal';
import Card from '@/components/ui/Card';
import StatsCard from '@/components/ui/Stats';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { TradingViewChart } from '@/components/TradingViewChart';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, plansResponse] = await Promise.all([
          axiosInstance.get('/me/'),
          axiosInstance.get('/plans/')
        ]);
        setUser(userResponse.data);
        setPlans(plansResponse.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeposit = async (amount: number, planId: number, transactionHash: string) => {
    try {
      await axiosInstance.post('/transactions/deposit/', {
        amount,
        plan_id: planId,
        x_hash: transactionHash
      });
      // Refresh user data
      const response = await axiosInstance.get('/me/');
      setUser(response.data);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleWithdraw = async (investmentId: number, amount: number, walletAddress: string) => {
    try {
      await axiosInstance.post(`/my-investments/withdraw/`, {
        investment_id: investmentId,
        amount,
        wallet_address: walletAddress
      });
      // Refresh user data
      const response = await axiosInstance.get('/me/');
      setUser(response.data);
    } catch (err: any) {
      // Specific error handling for server errors
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      } else if (err.response?.data?.non_field_errors) {
        throw new Error(err.response.data.non_field_errors[0]);
      } else if (err.response?.data?.amount) {
        throw new Error(err.response.data.amount[0]);
      } else if (err.response?.data?.wallet_address) {
        throw new Error(err.response.data.wallet_address[0]);
      } else {
        throw new Error('An error occurred during withdrawal');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="text-3xl font-bold text-orange-500">
          Ag<Image src="/images/crypto/bitcoin.png" alt="AgentX" width={80} height={80} className="inline-block animate-pulse"/>ntX
        </div>
        <div className="w-8 h-8 border-t-2 border-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="text-3xl font-bold text-orange-500 mb-4">
          Ag<Image src="/images/crypto/bitcoin.png" alt="AgentX" width={80} height={80} className="inline-block"/>ntX
        </div>
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Logo */}
      <header className="bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xl font-bold text-orange-500">
              Ag<Image src="/images/crypto/bitcoin.png" alt="AgentX" width={50} height={50} className="inline-block"/>ntX
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">{user?.email}</span>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
              className="text-sm text-orange-500 hover:text-orange-400"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Quick Actions - Always visible on mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800 p-4 z-40 lg:hidden">
          <div className="flex gap-3 max-w-7xl mx-auto">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => setShowDepositModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Deposit
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowWithdrawModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Withdraw
            </Button>
          </div>
        </div>

        {/* Main Content - Add padding bottom on mobile for fixed buttons */}
        <div className="pb-24 lg:pb-0">
          {/* Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Wallet Balance"
              value={`${user?.wallet.balance.toFixed(2)} USDT`}
              subtitle={user?.wallet.address}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18m-18 6h18" />
                </svg>
              }
            />

            <StatsCard
              title="Total Invested"
              value={`${user?.total_invested.toFixed(2)} USDT`}
              trend={{
                value: `${user?.investments?.length} active investment${user?.investments?.length&& user?.investments?.length> 1 ? 's' : ''}`,
                positive: true
              }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            />

            <StatsCard
              title="Total Earnings"
              value={`${user?.total_earnings.toFixed(2)} USDT`}
              trend={{
                value: `+${((user?.total_earnings / user?.total_invested) * 100).toFixed(2)}% return`,
                positive: true
              }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <Link href="/transactions">
              <StatsCard
                title="Transactions"
                value="View All"
                subtitle="View your transaction history"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
              />
            </Link>

            <StatsCard
              title="Total Withdrawn"
              value={`${user?.total_withdrawn.toFixed(2)} USDT`}
              subtitle="Last updated a few seconds ago"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              }
            />
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex gap-4 my-6">
            <Button
              variant="primary"
              size="lg"
              className="w-48"
              onClick={() => setShowDepositModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Deposit
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-48"
              onClick={() => setShowWithdrawModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              Withdraw
            </Button>
          </div>

          {/* Chart Section */}
          <Card className="col-span-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold">Bitcoin/USDT</h2>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="secondary">1M</Button>
                <Button size="sm" variant="secondary">15M</Button>
                <Button size="sm" variant="secondary">1H</Button>
                <Button size="sm" variant="secondary">4H</Button>
                <Button size="sm" variant="secondary">1D</Button>
              </div>
            </div>
            <div className="h-[600px] sm:h-[700px] -mx-6 -mb-6">
              <TradingViewChart/>
            </div>
          </Card>

          {/* Investment Plans Section - Improved mobile layout */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Investment Plans</h2>
                <p className="text-gray-400 mt-1">Choose from our optimized investment plans</p>
              </div>
              <div className="hidden lg:flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowDepositModal(true)}
                >
                  Deposit
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setShowInvestModal(true)}
                >
                  Invest
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <Card key={plan.id} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                        <span className="text-gray-400">Daily Return</span>
                        <span className="text-green-500 font-medium">
                          {(parseFloat(plan.daily_return)).toFixed(3)}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                        <span className="text-gray-400">Minimum Investment</span>
                        <span className="font-medium">{plan.minimum_investment} USDT</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-4">
                        <span className="text-gray-400">Duration</span>
                        <span className="font-medium">∞</span>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      className="w-full mt-6"
                      onClick={() => {
                        setShowInvestModal(true);
                      }}
                    >
                      Invest Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Active Investments Section - Improved mobile layout */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Active Investments</h2>
                <p className="text-gray-400 mt-1">Track your investments in real-time</p>
              </div>
            </div>

            <div className="space-y-4">
              {user?.investments.map((investment) => (
                <Card key={investment.id} className="group">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">{investment.plan}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          investment.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                        }`}>
                          {investment.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-400">Invested Amount</div>
                          <div className="text-lg font-medium mt-1">{investment.amount_invested.toFixed(2)} USDT</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Daily Return</div>
                          <div className="text-lg font-medium text-green-500 mt-1">
                            {(investment.daily_return).toFixed(3)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Current Earnings</div>
                          <div className="text-lg font-medium mt-1">{investment.current_earnings.toFixed(2)} USDT</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Available Earnings</div>
                          <div className="text-lg font-medium mt-1">{investment.available_earnings.toFixed(2)} USDT</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4 lg:mt-0">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 lg:flex-none"
                        onClick={() => setShowWithdrawModal(true)}
                      >
                        Withdraw
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 lg:flex-none"
                        onClick={() => {
                          setShowInvestModal(true);
                        }}
                      >
                        Upgrade
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-400">
                    Started on {new Date(investment.start_date).toLocaleDateString()}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        plans={plans}
        onDeposit={handleDeposit}
      />

      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        investments={user.investments}
        onWithdraw={handleWithdraw}
      />

      <InvestModal
        isOpen={showInvestModal}
        onClose={() => setShowInvestModal(false)}
        plans={plans}
        availableBalance={user?.wallet.balance || 0}
        currentInvestments={user?.investments || []}
        onSuccess={() => {
          const fetchUserData = async () => {
            try {
              const response = await axiosInstance.get('/me/');
              setUser(response.data);
            } catch (err: any) {
              console.error('Error refreshing data:', err);
            }
          };
          fetchUserData();
        }}
      />
    </div>
  );
}
