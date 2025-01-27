'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Users, DollarSign, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatsCard from '@/components/ui/Stats';
import axiosInstance from '@/lib/axios';

export default function ReferralsPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/profile/referrals/');
        setUser(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const generateShareableLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const referralCode = user?.referral_code;
    return `${baseUrl}?ref=${referralCode}`;
  };

  const generateShareableText = () => {
    const referralCode = user?.referral_code;
    return `🚀 Join me on AgentX - The Future of Crypto Investment!\n\n💎 Start with just 10 USDT\n✨ Earn up to 2.5% daily returns\n💫 AI-powered trading strategies\n\n🎁 Use my referral code: ${referralCode}\n\n${generateShareableLink()}`;
  };

  const copyToClipboard = async (text: string) => {
    if (typeof window === 'undefined') return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          toast.success('Copied to clipboard!');
        } catch (err) {
          toast.error('Failed to copy text');
          console.error('Failed to copy text:', err);
        }
        
        textArea.remove();
      }
    } catch (err) {
      toast.error('Failed to copy text');
      console.error('Failed to copy text:', err);
    }
  };

  const handleCopyLink = () => {
    copyToClipboard(generateShareableLink());
  };

  const handleCopyText = () => {
    copyToClipboard(generateShareableText());
  };

  const handleShare = async () => {
    if (typeof window === 'undefined') return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join AgentX - Smart Crypto Investment',
          text: generateShareableText(),
          url: generateShareableLink()
        });
      } catch (err) {
        console.error('Error sharing:', err);
        handleCopyText();
      }
    } else {
      handleCopyText();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Referral Program</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard
            title="Total Referrals"
            value={user.referrals?.length || 0}
            icon={<Users className="w-4 h-4" />}
          />
          <StatsCard
            title="Active Referrals"
            value={user.referrals?.filter((r: any) => r.active).length || 0}
            icon={<Users className="w-4 h-4" />}
          />
          <StatsCard
            title="Total Earnings"
            value={`${user.total_referral_earnings || 0} USDT`}
            icon={<DollarSign className="w-4 h-4" />}
          />
        </div>

        <Card>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Your Referral Link</h2>
              <p className="text-zinc-400">Share your referral link and earn 5% commission on your referrals&apos; investments</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Referral Code</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-zinc-900 p-3 rounded-lg font-mono">
                    {user.referral_code}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(user.referral_code)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Referral Link</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-zinc-900 p-3 rounded-lg font-mono text-sm overflow-hidden text-ellipsis">
                    {generateShareableLink()}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Share Message</label>
                <div className="bg-zinc-900 p-3 rounded-lg text-sm whitespace-pre-wrap">
                  {generateShareableText()}
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={handleCopyText}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Message
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Your Referrals</h2>
          {user.referrals && user.referrals.length > 0 ? (
            <div className="space-y-4">
              {user.referrals.map((referral: any) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{referral.email}</div>
                    <div className="text-sm text-zinc-400">
                      Joined {new Date(referral.registration_date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-orange-500">
                      {referral.total_investments} USDT
                    </div>
                    <div className="text-sm text-zinc-400">
                      Earned: {referral.commission_earned} USDT
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-zinc-400">
              No referrals yet. Share your link to start earning!
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
