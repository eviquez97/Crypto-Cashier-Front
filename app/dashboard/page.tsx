'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  BarChart3, Search, Settings, Bell, TrendingUp, TrendingDown,
  Users, Shield, Plus, ArrowUpRight, Filter, MoreVertical,
  MapPin, Factory, Recycle, Zap, Activity, DollarSign,
  ChevronDown, Circle, User, HelpCircle, Flag
} from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedRegion, setSelectedRegion] = useState('All regions')

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col p-6 sticky top-0 h-screen overflow-y-auto"
      >
        {/* Branding */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-gray-900" />
          </div>
          <h1 className="text-xl font-bold text-white">Coinfixi</h1>
        </div>

        {/* Workspace */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-1">Team Workspace</p>
          <p className="text-brand-primary font-medium">Enterprise</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-4">NAVIGATION</h3>
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3, active: true },
              { id: 'analytics', label: 'Analytics', icon: Activity },
              { id: 'team', label: 'Team Structure', icon: Users, badge: '1' },
              { id: 'reports', label: 'Reports', icon: Shield, badge: 'New' },
              { id: 'support', label: 'Support', icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  item.active 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                    <item.icon className="w-3 h-3" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`${item.badge === 'New' ? 'bg-brand-primary text-gray-900' : 'bg-brand-primary text-gray-900'} text-xs px-2 py-1 rounded-full font-bold`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm">EU</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Enterprise User</p>
              <p className="text-gray-400 text-xs">#enterprise-001</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900 px-8 py-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-white">Dashboard</h1>
            
            {/* Environmental Quality Index Card */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-sm">Environmental Quality Index</h3>
                <BarChart3 className="w-5 h-5 text-red-400" />
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">75.50/100%</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm">1.4% than last month</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-900">
          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Air Pollution Level Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm">Air Pollution Level</h3>
                <BarChart3 className="w-5 h-5 text-brand-primary" />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">35.05 µg/m³</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-brand-primary" />
                <span className="text-brand-primary text-sm">2.3% than last month</span>
              </div>
            </motion.div>

            {/* Climate Change Index Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-gray-200"
            >
              <h3 className="text-gray-700 text-sm font-medium mb-4">Climate Change Index</h3>
              <div className="h-32 flex items-end space-x-2 mb-2">
                {[40, 60, 45, 80, 65, 90, 75, 85].map((height, index) => (
                  <div
                    key={index}
                    className="bg-brand-primary rounded-t-sm flex-1 hover:bg-brand-primary/80 transition-colors duration-200"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>20</span>
                <span>40</span>
                <span>60</span>
                <span>80</span>
                <span>100</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>W1</span>
                <span>W2</span>
                <span>W3</span>
                <span>W4</span>
              </div>
            </motion.div>

            {/* Plastic Recycling by Region Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border border-gray-200"
            >
              <h3 className="text-gray-700 text-sm font-medium mb-4">Plastic Recycling by Region</h3>
              <div className="space-y-3">
                {[
                  { region: 'USA', country: 'America', factory: '253+', recycled: '35%' },
                  { region: 'German', country: 'Europe', factory: '211+', recycled: '60%' },
                  { region: 'Japan', country: 'Asia', factory: '364+', recycled: '85%' },
                  { region: 'China', country: 'Asia', factory: '855+', recycled: '25%' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Flag className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-gray-900 font-medium text-sm">{item.region}</p>
                        <p className="text-gray-500 text-xs">{item.country}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 font-semibold text-sm">Factory {item.factory}</p>
                      <p className="text-gray-700 font-semibold">Recycled {item.recycled}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Global Pollution Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-12"
            >
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-lg font-semibold">Global pollution</h3>
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                </div>
                
                {/* Map representation */}
                <div className="relative bg-gray-700 rounded-lg p-8 h-64 flex items-center justify-center">
                  {/* Simple map representation */}
                  <div className="grid grid-cols-4 gap-4 w-full h-full">
                    {/* Countries representation */}
                    <div className="bg-brand-primary/20 rounded p-2 text-center">
                      <p className="text-xs text-white">Ukraine</p>
                      <p className="text-xs text-brand-primary">89%</p>
                    </div>
                    <div className="bg-brand-primary/20 rounded p-2 text-center">
                      <p className="text-xs text-white">Germany</p>
                      <p className="text-xs text-brand-primary">72%</p>
                    </div>
                    <div className="bg-brand-primary/20 rounded p-2 text-center">
                      <p className="text-xs text-white">France</p>
                      <p className="text-xs text-brand-primary">68%</p>
                    </div>
                    <div className="bg-brand-primary/20 rounded p-2 text-center">
                      <p className="text-xs text-white">UK</p>
                      <p className="text-xs text-brand-primary">75%</p>
                    </div>
                  </div>
                  
                  {/* Tooltip for Ukraine */}
                  <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-brand-primary" />
                      <div>
                        <p className="text-gray-900 font-medium text-sm">Ukraine</p>
                        <p className="text-gray-600 text-xs">High Level</p>
                        <p className="text-brand-primary font-bold text-sm">89%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}