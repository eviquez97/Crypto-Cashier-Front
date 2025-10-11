'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Grid, Package, ShoppingCart, BarChart3, Users, DollarSign,
  HelpCircle, Settings, LogOut, Bell, Search, Plus, Download,
  Filter, Eye, Edit, Trash2, MoreVertical, ArrowDown
} from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('customers')
  const [currentPage, setCurrentPage] = useState(1)

  const customers = [
    { id: 'CUS001', name: 'John Smith', email: 'john.smith@example.com', phone: '123-456-7890', orders: 15, spend: '$2,500', lastOrder: '27-11-2024' },
    { id: 'CUS002', name: 'Emily Davis', email: 'emily.davis@example.com', phone: '234-567-8901', orders: 10, spend: '$1,800', lastOrder: '26-11-2024' },
    { id: 'CUS003', name: 'Michael Johnson', email: 'michael.j@example.com', phone: '345-678-9012', orders: 8, spend: '$2,500', lastOrder: '25-11-2024' },
    { id: 'CUS004', name: 'Sarah Lee', email: 'sarah.lee@example.com', phone: '456-789-0123', orders: 5, spend: '$600', lastOrder: '24-11-2024' },
    { id: 'CUS005', name: 'Andrew Miller', email: 'andrew.miller@example.com', phone: '567-890-1234', orders: 12, spend: '$2,100', lastOrder: '23-11-2024' },
    { id: 'CUS006', name: 'Sophia Wilson', email: 'sophia.wilson@example.com', phone: '678-901-2345', orders: 9, spend: '$1,450', lastOrder: '22-11-2024' },
    { id: 'CUS007', name: 'Olivia Taylor', email: 'olivia.taylor@example.com', phone: '890-123-4567', orders: 15, spend: '$3,200', lastOrder: '20-11-2024' },
    { id: 'CUS008', name: 'Ethan White', email: 'ethan.white@example.com', phone: '123-456-7890', orders: 5, spend: '$750', lastOrder: '17-11-2024' },
    { id: 'CUS009', name: 'Mia Harris', email: 'mia.harris@example.com', phone: '123-456-7890', orders: 15, spend: '$2,500', lastOrder: '18-11-2024' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-64 bg-[#134338] flex flex-col p-6 sticky top-0 h-screen overflow-y-auto"
      >
        {/* Branding */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-[#16F98A] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-xl font-bold text-white">Pharmly</h1>
          <div className="w-4 h-4 bg-white border border-gray-400 rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-600 rounded"></div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: Grid },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'sales', label: 'Sales', icon: BarChart3 },
              { id: 'customers', label: 'Customers', icon: Users, active: true },
              { id: 'payments', label: 'Payments', icon: DollarSign },
              { id: 'support', label: 'Help & Support', icon: HelpCircle },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  item.active 
                    ? 'bg-[#16F98A] text-[#05220B]' 
                    : 'text-white hover:bg-[#05220B]'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Upgrade Pro Section */}
        <div className="bg-[#05220B] rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-3">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <Package className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <h3 className="text-white font-bold text-center mb-2">Upgrade Pro</h3>
          <p className="text-white text-sm text-center mb-4">Master your pharmacy with detailed analytics and clear graphs.</p>
          <button className="w-full bg-[#16F98A] text-[#05220B] font-medium py-2 px-4 rounded-lg hover:bg-[#16F98A]/90 transition-colors">
            Upgrade Now
          </button>
        </div>

        {/* Logout */}
        <button className="flex items-center space-x-3 text-white hover:bg-[#05220B] px-4 py-3 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border-b border-gray-200 px-8 py-6"
        >
          <div className="flex items-center justify-between">
            {/* Left */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Lists</h1>
              <p className="text-gray-600 mt-1">Let's check your pharmacy today</p>
            </div>

            {/* Middle - Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Right */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JB</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">James Bond</p>
                  <p className="text-xs text-gray-500">@james.bond</p>
                </div>
                <ArrowDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Total Customer Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#05220B] rounded-xl p-6 text-white relative"
            >
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-[#16F98A]" />
                <MoreVertical className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-white/90 text-sm font-medium mb-2">Total Customer</h3>
              <h2 className="text-3xl font-bold text-white mb-2">$12,500</h2>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#16F98A] rounded-full flex items-center justify-center">
                  <span className="text-xs text-[#05220B]">↗</span>
                </div>
                <span className="text-white/90 text-sm">+8% Since last week</span>
              </div>
            </motion.div>

            {/* New Customers Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-600" />
                </div>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">New Customers</h3>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">120</h2>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#16F98A]/20 rounded-full flex items-center justify-center">
                  <span className="text-xs text-[#16F98A]">↗</span>
                </div>
                <span className="text-gray-600 text-sm">+5.4% Since last week</span>
              </div>
            </motion.div>

            {/* Returning Customers Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-600" />
                </div>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">Returning Customers</h3>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">65%</h2>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#16F98A]/20 rounded-full flex items-center justify-center">
                  <span className="text-xs text-[#16F98A]">↗</span>
                </div>
                <span className="text-gray-600 text-sm">+2.4% Since last week</span>
              </div>
            </motion.div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="bg-[#16F98A] text-[#05220B] font-medium py-2 px-4 rounded-lg hover:bg-[#16F98A]/90 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add New Customer</span>
              </button>
              <button className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <button className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <span>This Month</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Customer Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Table Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 bg-[#16F98A] rounded-full flex items-center justify-center hover:bg-[#16F98A]/90 transition-colors">
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#134338] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium">Customer ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Customer Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Orders Placed</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Total Spend</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Last Order Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customers.map((customer, index) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">#{customer.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                      <td className="px-6 py-4 text-sm text-blue-600 underline">{customer.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{customer.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{customer.orders}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{customer.spend}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{customer.lastOrder}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">Showing 09 out of 59</p>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, '...', 15].map((page, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(typeof page === 'number' ? page : currentPage)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      page === 1
                        ? 'bg-[#134338] text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}