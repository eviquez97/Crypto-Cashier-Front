import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import I18nProvider from '../components/I18nProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coinfixi - Premium Crypto Cashier for Sportbooks & Casinos',
  description: 'Process crypto deposits and withdrawals in seconds with banking-grade security and transparent pricing.',
  keywords: 'crypto payments, sportbooks, casinos, bitcoin, ethereum, tron, compliance, enterprise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
