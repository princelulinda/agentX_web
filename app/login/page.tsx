'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import axiosInstance from '@/lib/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    // if (password.length < 6) return 'Password must be at least 6 characters long';
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailError = validateEmail(newEmail);
    setErrors(prev => ({ ...prev, email: emailError }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const passwordError = validatePassword(newPassword);
    setErrors(prev => ({ ...prev, password: passwordError }));
  };

  const handleSubmit = async () => {
    setError('');
    
    // Validate all fields before submission
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    const newErrors = {
      email: emailError,
      password: passwordError
    };
    
    setErrors(newErrors);

    // Check if there are any errors
    if (emailError || passwordError) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/login/', {
        email,
        password
      });

      localStorage.setItem('token', response.data.access);
      router.push('/dashboard');
    } catch (err: any) {
      console.log(err.response?.data || err, "Error details");
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-black flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 to-transparent blur-3xl" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-orange-500/20 to-transparent blur-3xl" />
      </div>

      <motion.div 
        className="w-full max-w-md space-y-8 bg-zinc-900/50 p-8 rounded-xl backdrop-blur-sm border border-zinc-800"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="text-xl font-bold text-orange-500 flex items-center justify-center">
              Ag<Image src="/images/crypto/bitcoin.png" alt="AgentX" width={50} height={50} className="inline-block"/>entX
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Or{' '}
            <Link href="/signup" className="font-medium text-orange-500 hover:text-orange-400">
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              autoComplete="email"
              required
              value={email}
              onChange={handleEmailChange}
              placeholder="example@email.com"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              }
              error={errors.email}
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              required
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              }
              error={errors.password}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-orange-500 hover:text-orange-400">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              disabled={isLoading || Object.values(errors).some(error => error !== '')}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${isLoading || Object.values(errors).some(error => error !== '') 
                  ? 'bg-orange-400 cursor-not-allowed' 
                  : 'bg-orange-500 hover:bg-orange-600'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
