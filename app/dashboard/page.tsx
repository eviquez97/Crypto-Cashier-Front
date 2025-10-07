'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the configured dashboard URL
    const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3000'
    window.location.href = dashboardUrl
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}

export default Dashboard
