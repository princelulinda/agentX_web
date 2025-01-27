export interface Wallet {
  address: string;
  balance: number;
}

export interface Investment {
  id: number;
  plan: string;
  amount_invested: number;
  start_date: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PENDING';
  daily_return: number;
  current_earnings: number;
  available_earnings: number;
  total_withdrawn: number;
}

export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  wallet: Wallet;
  investments: Investment[];
  total_invested: number;
  total_earnings: number;
  total_withdrawn: number;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  minimum_investment: string;
  daily_return: string;
  level: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: number;
  email: string;
  registration_date: string;
  total_investments: string;
  commission_earned: string;
}

export interface ReferralData {
  referral_code: string;
  total_referral_earnings: string;
  referrals: Referral[];
}

export interface Transaction {
  id: number;
  wallet: number;
  transaction_type: 'INVESTMENT' | 'WITHDRAWAL' | 'EARNING';
  amount: string;
  tx_hash: string | null;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  created_at: string;
  updated_at: string;
}
