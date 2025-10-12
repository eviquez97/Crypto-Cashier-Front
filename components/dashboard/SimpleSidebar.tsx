'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, CreditCard, Wallet, Users, FileText, Settings, HelpCircle } from 'lucide-react'

export default function SimpleSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Transactions', href: '/dashboard/transactions', icon: CreditCard },
    { title: 'Balances', href: '/dashboard/balances', icon: Wallet },
    { title: 'Clients', href: '/dashboard/clients', icon: Users },
    { title: 'Reports', href: '/dashboard/reports', icon: FileText },
    { title: 'Settings', href: '/dashboard/settings', icon: Settings },
    { title: 'Support', href: '/dashboard/support', icon: HelpCircle },
  ]

  return (
    <aside className="fixed left-0 top-0 h-full w-80 bg-[#134338] shadow-xl z-40">
      <div className="p-4 border-b border-[#05220B]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#16F98A] rounded-lg flex items-center justify-center">
            <span className="text-[#05220B] font-bold text-sm">C</span>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Crypto Cashier</h2>
            <p className="text-[#16F98A] text-xs">Agent Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-[#16F98A] text-[#05220B]'
                  : 'text-[#CBD5E1] hover:bg-[#05220B] hover:text-[#16F98A]'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}