import { Metadata } from 'next';
// import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono';
import './globals.css';

// const geistSans = GeistSans;
// const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "AgentX | Smart Crypto Investment Platform",
  description: "Join AgentX - The Future of Crypto Investment. Earn up to 2.5% daily returns with our AI-powered trading strategies. Start with just 10 USDT and watch your portfolio grow. Secure, transparent, and proven track record.",
  keywords: "crypto investment, bitcoin trading, passive income, USDT investment, daily returns, cryptocurrency",
  authors: [{ name: "AgentX Team" }],
  icons: {
    icon: '/images/crypto/bitcoin.png',  
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "AgentX | Smart Crypto Investment Platform",
    description: "🚀 Earn up to 2.5% daily returns with AI-powered trading\n💎 Start with just 10 USDT\n✨ Secure & transparent\n💫 24/7 automated trading\n🌟 Join thousands of successful investors",
    url: "https://agentx.finance",
    siteName: "AgentX Finance",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AgentX Platform Preview"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentX | Earn Up to 2.5% Daily with Smart Crypto Investment",
    description: "Join the future of crypto investment. Start with 50 USDT, earn daily returns, and grow your wealth with our AI-powered platform. Secure, transparent, and proven results. 🚀",
    images: ["/images/twitter-card.jpg"],
    creator: "@AgentXFinance"
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "Finance"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>AgentX</title>
        <link rel="icon" href="/public/images/crypto/bitcoin.png" />
        {/* Rich Snippets for Google */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Investment",
              "name": "AgentX Crypto Investment Platform",
              "description": "Professional crypto investment platform offering daily returns through AI-powered trading strategies",
              "provider": {
                "@type": "Organization",
                "name": "AgentX Finance",
                "url": "https://agentx.finance"
              },
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "price": "50",
                "priceCurrency": "USDT",
                "description": "Start investing with just 50 USDT"
              }
            }
          `}
        </script>
      </head>
      <body 
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
