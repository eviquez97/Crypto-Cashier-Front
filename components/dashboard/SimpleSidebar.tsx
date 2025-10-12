'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, CreditCard, Wallet, Users, FileText, Settings, HelpCircle, LogOut } from 'lucide-react'

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
    <aside 
      className="fixed left-0 top-0 h-full w-80 bg-[#134338] shadow-2xl z-50"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: '320px',
        backgroundColor: '#134338',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        zIndex: 50,
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-[#05220B]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#16F98A] rounded-lg flex items-center justify-center">
            <span className="text-[#05220B] font-bold text-lg">C</span>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Crypto Cashier</h2>
            <p className="text-[#16F98A] text-xs">Agent Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#16F98A]/10 ${
                active 
                  ? 'bg-[#16F98A] text-[#05220B]' 
                  : 'text-[#CBD5E1] hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#05220B]">
        <Link
          href="/logout"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  )
}