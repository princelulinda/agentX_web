'use client';
import Image from 'next/image';
import { motion} from 'framer-motion';
import Link from 'next/link';
import { HeadlineRotator } from './components/HeadlineRotator';
import { TradingViewChart } from './components/TradingViewChart';

const FLOATING_POSITIONS = [
  { top: 25, left: 45 },
  { top: 75, left: 35 },
  { top: 45, left: 85 },
  { top: 65, left: 75 },
  { top: 85, left: 65 },
  { top: 35, left: 55 },
  { top: 55, left: 45 },
  { top: 25, left: 75 },
  { top: 75, left: 25 },
  { top: 45, left: 35 },
  { top: 65, left: 15 },
  { top: 15, left: 65 }
].map((pos, index) => ({
  ...pos,
  symbol: ['BTC', 'ETH', 'USDT'][index % 3]
}));

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function Home() {
  return (
    <motion.main 
      className="bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-xl font-bold text-orange-500">Ag<Image src="/images/crypto/bitcoin.png" alt="AgentX" width={50} height={50} className="inline-block"/>ntX</div>
              <div className="hidden md:flex space-x-6">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#plans" className="text-gray-300 hover:text-white transition-colors">Plans</a>
                <a href="#security" className="text-gray-300 hover:text-white transition-colors">Security</a>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Sign in</Link>
              <Link href="/signup">
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-md"
                >
                  Start Trading
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 to-transparent blur-3xl"
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-orange-500/20 to-transparent blur-3xl"
          />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full">
            <path
              d="M0,50 Q250,0 500,50 T1000,50"
              stroke="url(#gradient1)"
              strokeWidth="0.5"
              fill="none"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(249, 115, 22, 0.2)" />
                <stop offset="50%" stopColor="rgba(249, 115, 22, 0.1)" />
                <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 text-green-500 text-xs font-mono"
              style={{
                left: `${(i * 5)}%`,
              }}
            >
              {[...Array(20)].map((_, j) => (
                <div key={j} className="my-1">
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[15%] left-[10%]"
          >
            <Image
              src="/images/crypto/bitcoin.png"
              alt="Bitcoin"
              width={80}
              height={80}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>

          <div
            className="absolute top-[25%] right-[15%]"
          >
            <Image
              src="/images/crypto/ethereum.png"
              alt="Ethereum"
              width={70}
              height={70}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>

          <div
            className="absolute bottom-[20%] left-[20%]"
          >
            <Image
              src="/images/crypto/tether.png"
              alt="Tether"
              width={60}
              height={60}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Circuit Pattern */}
          <div
            className="absolute bottom-1/3 right-[25%] w-32 h-32"
          >
            <div className="w-full h-full border-2 border-orange-500/20 rounded-lg relative">
              <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500/40 rounded-full" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500/40 rounded-full" />
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-500/40 rounded-full" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500/40 rounded-full" />
              <div
                className="absolute inset-2 border border-orange-500/20"
              />
            </div>
          </div>

          {FLOATING_POSITIONS.map((position, i) => (
            <div
              key={i}
              className="absolute text-orange-500/20 text-xs font-bold"
              style={{
                top: `${position.top}%`,
                left: `${position.left}%`,
              }}
            >
              {position.symbol}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <motion.div 
          className="container mx-auto px-4 relative z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center py-16 md:py-24">
            <div className="inline-block mb-12">
              <div className="bg-orange-500/5 rounded-full p-6">
                <div className="bg-orange-500/10 rounded-full p-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="AgentX Logo"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <HeadlineRotator />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <Link href="/signup">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white font-medium text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300">
                  Start Now
                </button>
              </Link>
              <button className="px-8 py-4 bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/30 rounded-xl text-white font-medium text-lg transition-all duration-300">
                View Demo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 hover:scale-105">
              <div className="text-2xl font-bold text-orange-500">97.8%</div>
              <p className="text-gray-400">AI Accuracy</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 hover:scale-105">
              <div className="text-2xl font-bold text-orange-500">24/7</div>
              <p className="text-gray-400">Active Trading</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 hover:scale-105">
              <div className="text-2xl font-bold text-orange-500">0.5-1.2%</div>
              <p className="text-gray-400">Daily Returns</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 hover:scale-105">
              <div className="text-2xl font-bold text-orange-500">5-36%</div>
              <p className="text-gray-400">Monthly Returns</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">AI Neural Network</h3>
                <p className="text-gray-400 text-sm">Real-time market analysis</p>
              </div>
              <div className="h-64 relative">
                <div className="absolute inset-0 bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                  <div className="w-full h-full border-2 border-orange-500/20 rounded-lg relative">
                    <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500/40 rounded-full" />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500/40 rounded-full" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-500/40 rounded-full" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500/40 rounded-full" />
                    <div
                      className="absolute inset-2 border border-orange-500/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Live BTC/USDT Chart</h3>
                <p className="text-gray-400 text-sm">Real-time price action</p>
              </div>
              <div className="h-[400px] relative">
                <TradingViewChart />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trading Stats */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-8 bg-zinc-900/50 backdrop-blur-sm p-4 rounded-2xl border border-zinc-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-400">24/7 Trading</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-sm text-gray-400">Real-time Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span className="text-sm text-gray-400">AI-Powered</span>
          </div>
        </motion.div>
      </header>

      {/* AI Features Section */}
      <motion.section 
        className="py-20 px-4 relative overflow-hidden"
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Powered by Advanced AI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Market Analysis",
                description: "Real-time analysis of 500+ market indicators with continuous adaptation to market conditions.",
                stats: "500+ Indicators"
              },
              {
                title: "Smart Predictions",
                description: "97.8% accuracy rate with optimized trading signals and intelligent risk management.",
                stats: "97.8% Accuracy"
              },
              {
                title: "Automated Execution",
                description: "24/7 automated trading with instant reaction to market opportunities and volatility protection.",
                stats: "24/7 Trading"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-500/40 rounded-full" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <div className="text-orange-500 font-semibold">{feature.stats}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Investment Plans */}
      <motion.section 
        className="py-20 px-4 bg-zinc-900/30"
        id="plans"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Investment Plans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "IA Starter",
                price: "10 USDT",
                returns: "0.5% Daily",
                features: [
                  "Basic AI Features",
                  "Standard Support",
                  "Weekly Reports",
                  "Community Access"
                ]
              },
              {
                name: "IA Pro",
                price: "30 USDT",
                returns: "0.8% Daily",
                features: [
                  "Advanced AI Signals",
                  "Priority Support",
                  "Daily Reports",
                  "Exclusive Webinars"
                ],
                popular: true
              },
              {
                name: "IA Elite",
                price: "100 USDT",
                returns: "1.2% Daily",
                features: [
                  "Full AI Access",
                  "24/7 VIP Support",
                  "Custom Reports",
                  "Advanced Training"
                ]
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border ${
                  plan.popular ? 'border-orange-500' : 'border-zinc-800'
                } relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {plan.price}
                </div>
                <div className="text-gray-400 mb-6">{plan.returns}</div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg ${
                    plan.popular
                      ? 'bg-orange-500 text-white'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  } transition-colors`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Referral Section */}
      <motion.section 
        className="py-20 px-4 relative overflow-hidden"
        id="referral"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Earn More with Referrals</h2>
            <p className="text-xl text-gray-400">Share AgentX and multiply your earnings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Referral Tiers */}
            <div className="space-y-8">
              {[
                { level: "Level 1", percentage: "10%", description: "Direct referral commission", color: "orange" },
                { level: "Level 2", percentage: "5%", description: "Indirect referral commission", color: "purple" },
                { level: "Level 3", percentage: "3%", description: "Extended network earnings", color: "blue" }
              ].map((tier, index) => (
                <div key={index} className="relative">
                  <div className="relative bg-zinc-900 p-6 rounded-lg border border-zinc-800 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-r"
                      style={{
                        background: `linear-gradient(to right, ${
                          tier.color === 'orange' ? 'rgb(249,115,22)' :
                          tier.color === 'purple' ? 'rgb(168,85,247)' : 'rgb(59,130,246)'
                        }, transparent)`,
                        opacity: 0.1
                      }}
                    />
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold">{tier.level}</h3>
                      <span className="text-3xl font-bold" style={{
                        color: tier.color === 'orange' ? '#f97316' :
                               tier.color === 'purple' ? '#a855f7' : '#3b82f6'
                      }}>{tier.percentage}</span>
                    </div>
                    <p className="text-gray-400">{tier.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Earnings Calculator */}
            <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-xl border border-zinc-800">
              <h3 className="text-2xl font-bold mb-6">Potential Earnings Calculator</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Number of Referrals</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={0}
                      onChange={() => {}}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white"
                      placeholder="Enter number of referrals"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="text-orange-500">
                        👥
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Average Investment (USDT)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={0}
                      onChange={() => {}}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white"
                      placeholder="Enter average investment"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="text-orange-500">
                        💰
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500/20 to-purple-500/20 p-6 rounded-lg">
                  <div className="text-center">
                    <h4 className="text-lg text-gray-300 mb-2">Potential Monthly Earnings</h4>
                    <div className="text-4xl font-bold text-orange-500">
                      $0
                    </div>
                  </div>
                </div>

                <Link href="/signup">
                  <button
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300"
                  >
                    Start Earning Now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-12">Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex",
                  referrals: 15,
                  earnings: "$3,750",
                  avatar: "👨‍💼"
                },
                {
                  name: "Sarah",
                  referrals: 28,
                  earnings: "$6,200",
                  avatar: "👩‍💼"
                },
                {
                  name: "Michael",
                  referrals: 42,
                  earnings: "$9,800",
                  avatar: "👨‍💻"
                }
              ].map((story, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">
                      {story.avatar}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{story.name}</h4>
                    <p className="text-gray-400 mb-4">{story.referrals} Referrals</p>
                    <div className="text-2xl font-bold text-orange-500">{story.earnings}</div>
                    <p className="text-sm text-gray-400 mt-2">Monthly Earnings</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download CTA */}
          <div className="mt-20 text-center">
            <Link href="/download">
              <button
                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download AgentX Now
              </button>
            </Link>
            <p className="text-gray-400 mt-4">Available for iOS and Android</p>
          </div>
        </div>
      </motion.section>

      {/* Download App Section */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-b from-zinc-900/30 to-black"
        id="download"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Download AgentX Mobile</h2>
            <p className="text-gray-400">Trade anytime, anywhere with our mobile app</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Real-Time Trading</h3>
                  <p className="text-gray-400">Monitor and execute trades instantly from your mobile device</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instant Notifications</h3>
                  <p className="text-gray-400">Get alerts for market opportunities and trade executions</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
                  <p className="text-gray-400">Enhanced security with biometric authentication</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/download/android" className="flex-1">
                  <button
                    className="w-full bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-xl border border-zinc-700 flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.523 15.34l.003-.006 1.405-2.432a.504.504 0 00-.178-.689.507.507 0 00-.69.178l-1.343 2.325a7.03 7.03 0 01-9.44 0L5.937 12.39a.507.507 0 00-.69-.178.504.504 0 00-.178.69l1.405 2.432.003.006a8.015 8.015 0 0011.046 0z" />
                    </svg>
                    Download for Android
                  </button>
                </Link>
                <Link href="/download/ios" className="flex-1">
                  <button
                    className="w-full bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-xl border border-zinc-700 flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.94 5.19A4.38 4.38 0 0016 2a4.38 4.38 0 00-3 1.52 4.09 4.09 0 00-1 3 3.62 3.62 0 002.94-1.33zm2 5.88c0-2.28 1.91-4.1 4.06-4.1a4.08 4.08 0 00-1.6-3.49C17.79 2.05 15.84 1 13.5 1 9.82 1 8.5 3.12 8.5 3.12A4.08 4.08 0 006.9 6.97C4.75 6.97 3 8.79 3 11.07v9.86A3.07 3.07 0 006.07 24h11.86A3.07 3.07 0 0021 20.93v-9.86z" />
                    </svg>
                    Download for iOS
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/mobile-app-preview.png"
                alt="AgentX Mobile App"
                width={400}
                height={800}
                className="mx-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Security Section */}
      <motion.section 
        className="py-20 px-4"
        id="security"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Enterprise-Grade Security
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
                <h3 className="text-xl font-semibold mb-4">Fund Protection</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    95% Cold Storage
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Audited Smart Contracts
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    24/7 Monitoring
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
                <h3 className="text-xl font-semibold mb-4">Risk Management</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    AI-Powered Diversification
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Smart Stop-Loss
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    Portfolio Balancing
                  </li>
                </ul>
              </div>
            </div>

            {/* Security Animation */}
            <div className="relative">
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48">
                    <div className="w-full h-full border-4 border-orange-500/20 rounded-full" />
                    <div className="absolute inset-4 border-4 border-orange-500/40 rounded-full" />
                    <div className="absolute inset-8 border-4 border-orange-500/60 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="py-12 px-4 bg-zinc-900/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Community</li>
                <li>Support</li>
                <li>Status</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-gray-400">
            <p> 2025 AgentX. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </motion.main>
  );
}