'use client'

import { ToastProvider } from '@/components/ui/Toast'
import SimpleSidebar from '@/components/dashboard/SimpleSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-gray-50">
        <SimpleSidebar />
        <main className="flex-1 ml-80 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}