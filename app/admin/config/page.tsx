'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Settings,
  Save,
  Activity,
  Webhook as WebhookIcon,
  AlertCircle,
  CheckCircle,
  Plus,
  Wrench,
} from 'lucide-react'
import { Card, Button, Badge, Modal, useToastActions } from '@/components/ui'
import { adminAPI } from '@/lib/api'
import type {
  SystemConfig,
  APIStatus,
  GlobalWebhook,
  SystemHealthMetrics,
} from '@/lib/types'

export default function ConfigPage() {
  const [config, setConfig] = useState<SystemConfig | null>(null)
  const [apiStatuses, setApiStatuses] = useState<APIStatus[]>([])
  const [webhooks, setWebhooks] = useState<GlobalWebhook[]>([])
  const [healthMetrics, setHealthMetrics] = useState<SystemHealthMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'system' | 'apis' | 'webhooks' | 'health'>('system')

  const toast = useToastActions()

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    try {
      setLoading(true)

      if (activeTab === 'system') {
        const res = await adminAPI.config.getSystem()
        setConfig(res.data)
      } else if (activeTab === 'apis') {
        const res = await adminAPI.config.getAPIStatuses()
        setApiStatuses(res.data)
      } else if (activeTab === 'webhooks') {
        const res = await adminAPI.config.listGlobalWebhooks()
        setWebhooks(res.data)
      } else if (activeTab === 'health') {
        const res = await adminAPI.dashboard.getSystemHealth()
        setHealthMetrics(res.data)
      }
    } catch (error) {
      toast.error('Failed to load configuration')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveConfig = async () => {
    try {
      if (!config) return
      await adminAPI.config.updateSystem(config)
      toast.success('Configuration saved')
    } catch (error) {
      toast.error('Failed to save configuration')
    }
  }

  const handleTestNode = async (chain: string) => {
    try {
      const res = await adminAPI.config.testBlockchainNode(chain)
      if (res.data.online) {
        toast.success(`${chain} node online (${res.data.latency}ms)`)
      } else {
        toast.error(`${chain} node offline`)
      }
    } catch (error) {
      toast.error(`Failed to test ${chain} node`)
    }
  }

  const tabs = [
    { id: 'system', label: 'System Config', icon: Settings },
    { id: 'apis', label: 'API Status', icon: Activity },
    { id: 'webhooks', label: 'Global Webhooks', icon: WebhookIcon },
    { id: 'health', label: 'System Health', icon: AlertCircle },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Advanced Configuration</h1>
          <p className="text-gray-400 mt-1">Manage system-wide settings and integrations</p>
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
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* System Config */}
        {activeTab === 'system' && config && (
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700" title="Fee Configuration">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Platform Fee %
                  </label>
                  <input
                    type="number"
                    value={config.fees.platform_fee_percentage}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        fees: {
                          ...config.fees,
                          platform_fee_percentage: parseFloat(e.target.value),
                        },
                      })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Minimum Fee (USD)
                  </label>
                  <input
                    type="number"
                    value={config.fees.minimum_fee}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        fees: { ...config.fees, minimum_fee: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700" title="Network Configuration">
              <div className="space-y-4">
                {Object.entries(config.networks).map(([chain, settings]) => (
                  <div key={chain} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">{chain}</h4>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.enabled}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              networks: {
                                ...config.networks,
                                [chain]: { ...settings, enabled: e.target.checked },
                              },
                            })
                          }
                          className="w-4 h-4 text-[#16F98A]"
                        />
                        <span className="text-sm text-gray-300">Enabled</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-400">Confirmations</label>
                        <input
                          type="number"
                          value={settings.confirmations_required}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              networks: {
                                ...config.networks,
                                [chain]: {
                                  ...settings,
                                  confirmations_required: parseInt(e.target.value),
                                },
                              },
                            })
                          }
                          className="w-full px-3 py-1 bg-gray-600 border border-gray-500 text-white rounded text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-400">Min Deposit</label>
                        <input
                          type="number"
                          value={settings.min_deposit}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              networks: {
                                ...config.networks,
                                [chain]: {
                                  ...settings,
                                  min_deposit: parseFloat(e.target.value),
                                },
                              },
                            })
                          }
                          className="w-full px-3 py-1 bg-gray-600 border border-gray-500 text-white rounded text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex justify-end">
              <Button
                variant="primary"
                icon={<Save className="w-4 h-4" />}
                onClick={handleSaveConfig}
              >
                Save Configuration
              </Button>
            </div>
          </div>
        )}

        {/* API Status */}
        {activeTab === 'apis' && (
          <Card className="bg-gray-800 border-gray-700">
            <div className="space-y-3">
              {apiStatuses.map((api) => (
                <div key={api.endpoint} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm text-white">{api.method}</span>
                        <span className="text-gray-300">{api.endpoint}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-400">
                          Avg: {api.response_time_avg}ms
                        </span>
                        <span className="text-xs text-gray-400">
                          P95: {api.response_time_p95}ms
                        </span>
                        <span className="text-xs text-gray-400">
                          Success: {api.success_rate.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <Badge
                      variant={
                        api.status === 'healthy'
                          ? 'success'
                          : api.status === 'degraded'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      {api.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Webhooks */}
        {activeTab === 'webhooks' && (
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Global Webhooks</h3>
                <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
                  Add Webhook
                </Button>
              </div>

              <div className="space-y-3">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-white">{webhook.name}</p>
                        <p className="text-sm text-gray-400 mt-1">{webhook.url}</p>
                        <div className="flex items-center space-x-3 mt-2">
                          <span className="text-xs text-gray-400">
                            {webhook.events.length} events
                          </span>
                          <span className="text-xs text-gray-400">
                            Success: {webhook.success_rate.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <Badge variant={webhook.status === 'active' ? 'success' : 'error'}>
                        {webhook.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* System Health */}
        {activeTab === 'health' && healthMetrics && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700" title="API Health">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime</span>
                    <span className="font-semibold text-green-400">
                      {healthMetrics.api.uptime.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Response Time</span>
                    <span className="font-semibold text-white">
                      {healthMetrics.api.response_time}ms
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Error Rate</span>
                    <span className="font-semibold text-yellow-400">
                      {healthMetrics.api.error_rate.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-800 border-gray-700" title="Database Health">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <Badge
                      variant={
                        healthMetrics.database.status === 'healthy'
                          ? 'success'
                          : healthMetrics.database.status === 'warning'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      {healthMetrics.database.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Connections</span>
                    <span className="font-semibold text-white">
                      {healthMetrics.database.connections}/{healthMetrics.database.max_connections}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Query Time</span>
                    <span className="font-semibold text-white">
                      {healthMetrics.database.query_time_avg}ms
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700" title="Blockchain Nodes">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(healthMetrics.blockchain_nodes).map(([chain, node]) => (
                  <div key={chain} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">{chain}</h4>
                      <Badge
                        variant={
                          node.status === 'synced'
                            ? 'success'
                            : node.status === 'syncing'
                            ? 'warning'
                            : 'error'
                        }
                      >
                        {node.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Block</span>
                        <span className="text-white">{node.last_block.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Behind</span>
                        <span className="text-white">{node.blocks_behind}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      fullWidth
                      className="mt-3"
                      onClick={() => handleTestNode(chain)}
                    >
                      Test Connection
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700" title="Workers Status">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Active Workers</p>
                  <p className="text-2xl font-bold text-green-400">
                    {healthMetrics.workers.active}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Idle Workers</p>
                  <p className="text-2xl font-bold text-white">{healthMetrics.workers.idle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Pending Tasks</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {healthMetrics.workers.pending_tasks}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Failed (24h)</p>
                  <p className="text-2xl font-bold text-red-400">
                    {healthMetrics.workers.failed_tasks_24h}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

