'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex space-x-6">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors ${
              isActive('/dashboard')
                ? 'text-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/referrals"
            className={`text-sm font-medium transition-colors ${
              isActive('/referrals')
                ? 'text-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Referral
          </Link>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
