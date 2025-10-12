'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Home,
  Wallet,
  Users,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  TrendingUp,
  Shield,
  UserCheck,
  Activity,
} from 'lucide-react'

interface SidebarProps {
  userRole?: 'casino' | 'sportsbook' | 'admin'
}

export default function Sidebar({ userRole = 'casino' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const casinoMenuItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Overview and KPIs'
    },
    {
      title: 'Transactions',
      href: '/dashboard/transactions',
      icon: CreditCard,
      description: 'All transactions'
    },
    {
      title: 'Balances',
      href: '/dashboard/balances',
      icon: Wallet,
      description: 'Crypto wallets'
    },
    {
      title: 'Clients',
      href: '/dashboard/clients',
      icon: Users,
      description: 'Sub-accounts'
    },
    {
      title: 'Reports',
      href: '/dashboard/reports',
      icon: FileText,
      description: 'Financial reports'
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      description: 'Configuration'
    },
    {
      title: 'Support',
      href: '/dashboard/support',
      icon: HelpCircle,
      description: 'Help & tickets'
    },
  ]

  const adminMenuItems = [
    {
      title: 'Overview',
      href: '/admin',
      icon: Home,
      description: 'Global dashboard'
    },
    {
      title: 'Clients',
      href: '/admin/clients',
      icon: Users,
      description: 'Manage clients'
    },
    {
      title: 'Transactions',
      href: '/admin/transactions',
      icon: Activity,
      description: 'Global transactions'
    },
    {
      title: 'Compliance',
      href: '/admin/compliance',
      icon: Shield,
      description: 'AML/KYC monitoring'
    },
    {
      title: 'Finance',
      href: '/admin/finance',
      icon: TrendingUp,
      description: 'Revenue & fees'
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: UserCheck,
      description: 'Internal users'
    },
    {
      title: 'Configuration',
      href: '/admin/config',
      icon: Settings,
      description: 'System settings'
    },
  ]

  const menuItems = userRole === 'admin' ? adminMenuItems : casinoMenuItems
  const basePath = userRole === 'admin' ? '/admin' : '/dashboard'

  const isActive = (href: string) => {
    if (href === basePath) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className={`fixed left-0 top-0 h-full bg-[#134338] shadow-xl z-40 transition-all duration-300 ${
        collapsed ? 'overflow-hidden' : ''
      }`}
      style={{ width: collapsed ? 80 : 280 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-[#05220B]">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: collapsed ? 0 : 1 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-[#16F98A] rounded-lg flex items-center justify-center">
              <span className="text-[#05220B] font-bold text-sm">C</span>
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">
                {userRole === 'admin' ? 'Coinfixi Admin' : 'Crypto Cashier'}
              </h2>
              <p className="text-[#16F98A] text-xs">
                {userRole === 'admin' ? 'Administration Panel' : 'Agent Dashboard'}
              </p>
            </div>
          </motion.div>
        )}
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 text-[#16F98A] hover:bg-[#05220B] rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                active
                  ? 'bg-[#16F98A] text-[#05220B]'
                  : 'text-[#CBD5E1] hover:bg-[#05220B] hover:text-[#16F98A]'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && (
                <motion.div
                  initial={false}
                  animate={{ opacity: collapsed ? 0 : 1 }}
                  className="flex-1 min-w-0"
                >
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className={`text-xs mt-0.5 ${
                    active ? 'text-[#05220B]/70' : 'text-[#94A3B8]'
                  }`}>
                    {item.description}
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#05220B]">
        {!collapsed && (
          <motion.div
            initial={false}
            animate={{ opacity: collapsed ? 0 : 1 }}
            className="mb-4 p-3 bg-[#05220B] rounded-lg"
          >
            <div className="text-[#16F98A] text-sm font-medium mb-1">
              Upgrade to Pro
            </div>
            <div className="text-[#94A3B8] text-xs mb-2">
              Get advanced features
            </div>
            <button className="w-full bg-[#16F98A] text-[#05220B] text-xs font-medium py-2 px-3 rounded-lg hover:bg-[#16F98A]/90 transition-colors">
              Upgrade Now
            </button>
          </motion.div>
        )}
        
        <button className="flex items-center space-x-3 w-full px-3 py-3 text-[#CBD5E1] hover:bg-[#05220B] hover:text-[#16F98A] rounded-lg transition-colors">
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && (
            <motion.span
              initial={false}
              animate={{ opacity: collapsed ? 0 : 1 }}
              className="text-sm font-medium"
            >
              Logout
            </motion.span>
          )}
        </button>
      </div>
    </motion.aside>
  )
}