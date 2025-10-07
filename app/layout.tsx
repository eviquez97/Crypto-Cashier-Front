import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coinfixi — Global Crypto Cashier for Sportbooks & Casinos',
  description: 'Integrate instant crypto deposits and withdrawals with one-time addresses, ultra-low fees and enterprise dashboards.',
  keywords: 'crypto cashier, sportbook, casino, cryptocurrency, payments, blockchain, bitcoin, ethereum',
  authors: [{ name: 'Coinfixi Team' }],
  creator: 'Coinfixi',
  publisher: 'Coinfixi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://coinfixi.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Coinfixi — Global Crypto Cashier for Sportbooks & Casinos',
    description: 'Integrate instant crypto deposits and withdrawals with one-time addresses, ultra-low fees and enterprise dashboards.',
    url: '/',
    siteName: 'Coinfixi',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Coinfixi - Global Crypto Cashier',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coinfixi — Global Crypto Cashier for Sportbooks & Casinos',
    description: 'Integrate instant crypto deposits and withdrawals with one-time addresses, ultra-low fees and enterprise dashboards.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6C4BFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
                `,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Coinfixi',
              description: 'Global Crypto Cashier for Sportbooks & Casinos',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://coinfixi.com',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://coinfixi.com'}/logo.png`,
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-555-123-4567',
                contactType: 'customer service',
              },
              sameAs: [
                'https://twitter.com/coinfixi',
                'https://linkedin.com/company/coinfixi',
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
