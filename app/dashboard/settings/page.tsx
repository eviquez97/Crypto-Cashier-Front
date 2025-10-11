'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Building,
  Key,
  Webhook as WebhookIcon,
  Shield,
  Bell,
  Save,
  Plus,
  Trash2,
  Copy,
  CheckCircle,
} from 'lucide-react'
import { Card, Button, Badge, Modal, useToastActions } from '@/components/ui'
import { configAPI } from '@/lib/api'
import type {
  BusinessConfig,
  APIKey,
  Webhook,
  SecurityLimits,
  NotificationSettings,
} from '@/lib/types'

export default function SettingsPage() {
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig | null>(null)
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [webhooks, setWebhooks] = useState<Webhook[]>([])
  const [securityLimits, setSecurityLimits] = useState<SecurityLimits | null>(null)
  const [notifications, setNotifications] = useState<NotificationSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<
    'business' | 'api-keys' | 'webhooks' | 'security' | 'notifications'
  >('business')
  const [showNewKeyModal, setShowNewKeyModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newApiKey, setNewApiKey] = useState<string | null>(null)

  const toast = useToastActions()
  const tenantId = 'tenant-001'

  useEffect(() => {
    loadSettings()
  }, [activeTab])

  const loadSettings = async () => {
    try {
      setLoading(true)

      if (activeTab === 'business') {
        const res = await configAPI.getBusiness(tenantId)
        setBusinessConfig(res.data)
      } else if (activeTab === 'api-keys') {
        const res = await configAPI.listAPIKeys(tenantId)
        setApiKeys(res.data)
      } else if (activeTab === 'webhooks') {
        const res = await configAPI.listWebhooks(tenantId)
        setWebhooks(res.data)
      } else if (activeTab === 'security') {
        const res = await configAPI.getSecurityLimits(tenantId)
        setSecurityLimits(res.data)
      } else if (activeTab === 'notifications') {
        const res = await configAPI.getNotificationSettings(tenantId)
        setNotifications(res.data)
      }
    } catch (error) {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveBusinessConfig = async () => {
    try {
      if (!businessConfig) return
      await configAPI.updateBusiness(tenantId, businessConfig)
      toast.success('Business config saved')
    } catch (error) {
      toast.error('Failed to save config')
    }
  }

  const handleCreateAPIKey = async () => {
    try {
      const res = await configAPI.createAPIKey(tenantId, newKeyName, ['read', 'write'])
      setNewApiKey(res.data.key)
      toast.success('API Key created')
      loadSettings()
    } catch (error) {
      toast.error('Failed to create API key')
    }
  }

  const handleRevokeAPIKey = async (keyId: string) => {
    try {
      await configAPI.revokeAPIKey(tenantId, keyId)
      toast.success('API Key revoked')
      loadSettings()
    } catch (error) {
      toast.error('Failed to revoke key')
    }
  }

  const tabs = [
    { id: 'business', label: 'Business Info', icon: Building },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'webhooks', label: 'Webhooks', icon: WebhookIcon },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account configuration</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#16F98A] text-[#05220B]'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Business Info */}
        {activeTab === 'business' && businessConfig && (
          <Card>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessConfig.business_name}
                    onChange={(e) =>
                      setBusinessConfig({ ...businessConfig, business_name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={businessConfig.email}
                    onChange={(e) =>
                      setBusinessConfig({ ...businessConfig, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={businessConfig.phone}
                    onChange={(e) =>
                      setBusinessConfig({ ...businessConfig, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    value={businessConfig.country}
                    onChange={(e) =>
                      setBusinessConfig({ ...businessConfig, country: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold text-gray-900 mb-4">Master Wallets</h3>
                <div className="space-y-3">
                  {['BTC', 'ETH', 'USDT'].map((currency) => (
                    <div key={currency}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currency} Wallet
                      </label>
                      <input
                        type="text"
                        value={businessConfig.master_wallets[currency as keyof typeof businessConfig.master_wallets] || ''}
                        onChange={(e) =>
                          setBusinessConfig({
                            ...businessConfig,
                            master_wallets: {
                              ...businessConfig.master_wallets,
                              [currency]: e.target.value,
                            },
                          })
                        }
                        placeholder={`Enter ${currency} address`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A] font-mono text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  variant="primary"
                  icon={<Save className="w-4 h-4" />}
                  onClick={handleSaveBusinessConfig}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* API Keys */}
        {activeTab === 'api-keys' && (
          <div className="space-y-6">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900">API Keys</h3>
                  <p className="text-sm text-gray-600">Manage your API authentication keys</p>
                </div>
                <Button
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  onClick={() => setShowNewKeyModal(true)}
                >
                  Create Key
                </Button>
              </div>

              <div className="space-y-3">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Key className="w-5 h-5 text-[#16F98A]" />
                      <div>
                        <p className="font-medium text-gray-900">{key.name}</p>
                        <p className="text-sm text-gray-500">
                          Created {new Date(key.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {key.status === 'active' ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="error">Revoked</Badge>
                      )}
                      {key.status === 'active' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Trash2 className="w-4 h-4" />}
                          onClick={() => handleRevokeAPIKey(key.id)}
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Webhooks */}
        {activeTab === 'webhooks' && (
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-gray-900">Webhooks</h3>
                <p className="text-sm text-gray-600">Configure webhook endpoints</p>
              </div>
              <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
                Add Webhook
              </Button>
            </div>

            <div className="space-y-3">
              {webhooks.map((webhook) => (
                <div
                  key={webhook.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{webhook.url}</p>
                    <p className="text-sm text-gray-500">{webhook.events.length} events</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Badge variant={webhook.status === 'active' ? 'success' : 'error'}>
                      {webhook.status}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {webhook.success_rate.toFixed(1)}% success
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Security */}
        {activeTab === 'security' && securityLimits && (
          <Card>
            <h3 className="font-semibold text-gray-900 mb-6">Security Limits</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Withdrawal Limit (USD)
                </label>
                <input
                  type="number"
                  value={securityLimits.daily_withdrawal_limit}
                  onChange={(e) =>
                    setSecurityLimits({
                      ...securityLimits,
                      daily_withdrawal_limit: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Single Transaction Max (USD)
                </label>
                <input
                  type="number"
                  value={securityLimits.single_transaction_max}
                  onChange={(e) =>
                    setSecurityLimits({
                      ...securityLimits,
                      single_transaction_max: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Require 2FA Above (USD)
                </label>
                <input
                  type="number"
                  value={securityLimits.require_2fa_above}
                  onChange={(e) =>
                    setSecurityLimits({
                      ...securityLimits,
                      require_2fa_above: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button variant="primary" icon={<Save className="w-4 h-4" />}>
                  Save Security Settings
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && notifications && (
          <Card>
            <h3 className="font-semibold text-gray-900 mb-6">Notification Preferences</h3>
            <div className="space-y-6">
              {/* Email Notifications */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Email Notifications</h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Large Deposits</span>
                    <input
                      type="checkbox"
                      checked={notifications.email.large_deposits.enabled}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          email: {
                            ...notifications.email,
                            large_deposits: {
                              ...notifications.email.large_deposits,
                              enabled: e.target.checked,
                            },
                          },
                        })
                      }
                      className="w-4 h-4 text-[#16F98A] focus:ring-[#16F98A]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Failed Transactions</span>
                    <input
                      type="checkbox"
                      checked={notifications.email.failed_transactions}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          email: {
                            ...notifications.email,
                            failed_transactions: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 text-[#16F98A] focus:ring-[#16F98A]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Weekly Summary</span>
                    <input
                      type="checkbox"
                      checked={notifications.email.weekly_summary}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          email: {
                            ...notifications.email,
                            weekly_summary: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 text-[#16F98A] focus:ring-[#16F98A]"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="primary" icon={<Save className="w-4 h-4" />}>
                  Save Preferences
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* New API Key Modal */}
      <Modal
        isOpen={showNewKeyModal}
        onClose={() => {
          setShowNewKeyModal(false)
          setNewApiKey(null)
          setNewKeyName('')
        }}
        title={newApiKey ? 'API Key Created' : 'Create API Key'}
        size="md"
      >
        {newApiKey ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="font-medium text-green-900">API Key Created Successfully</p>
              </div>
              <p className="text-sm text-green-700">
                Copy this key now. It won't be shown again.
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono text-gray-900">{newApiKey}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  icon={<Copy className="w-4 h-4" />}
                  onClick={() => {
                    navigator.clipboard.writeText(newApiKey)
                    toast.success('API Key copied!')
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Name</label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Production API Key"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
              />
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={handleCreateAPIKey}
              disabled={!newKeyName}
            >
              Generate API Key
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}

