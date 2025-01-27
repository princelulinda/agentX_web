'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    referral_code: '', 
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: []
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('https://agentx.pythonanywhere.com/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data);
        return;
      }

      setRegistrationSuccess(true);
      
    } catch (error) {
      console.error('Error during registration:', error);
      setErrors({
        general: ["Unable to connect to server. Please check your connection and try again."]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const SuccessComponent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center"
        >
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
        <p className="text-gray-400 mb-8">Download the app to start trading</p>
      </div>

      <div className="space-y-4">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#"
          className="flex items-center justify-center gap-3 w-full bg-zinc-800 text-white py-4 rounded-xl font-medium hover:bg-zinc-700 transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Download on App Store
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#"
          className="flex items-center justify-center gap-3 w-full bg-zinc-800 text-white py-4 rounded-xl font-medium hover:bg-zinc-700 transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
          </svg>
          Download on Google Play
        </motion.a>

        <div className="mt-8 p-6 bg-zinc-800/50 rounded-xl text-center">
          <p className="text-sm text-gray-400 mb-4">Or scan this QR code</p>
          <div className="w-48 h-48 bg-white mx-auto rounded-lg mb-4"></div>
          <Link href="/dashboard" className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
            Continue with Web Version
          </Link>
        </div>
      </div>
    </motion.div>
  );

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          >
            <div className="w-full h-full bg-orange-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
        <div className="w-full max-w-md">
          <SuccessComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          >
          <div className="w-full h-full bg-orange-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-16 h-16 bg-orange-500/20 rounded-xl mx-auto mb-4 flex items-center justify-center"
          >
            <div className="w-8 h-8 bg-orange-500 rounded-lg" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-gray-400">Join thousands of users</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Enter your first name"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Enter your last name"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">{errors.last_name[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Referral Code (Optional)</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="referral_code"
                value={formData.referral_code}
                onChange={handleInputChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Enter referral code"
              />
              {errors.referral_code && (
                <p className="text-red-500 text-sm mt-1">{errors.referral_code[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Create your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="password"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleInputChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Confirm your password"
              />
              {errors.password_confirm && (
                <p className="text-red-500 text-sm mt-1">{errors.password_confirm[0]}</p>
              )}
            </div>

            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-500 text-sm">{errors.general[0]}</p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create my account'}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-500 hover:text-orange-400 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
