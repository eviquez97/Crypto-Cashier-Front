'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  MessageCircle,
  FileText,
  HelpCircle,
  Send,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Book,
  ExternalLink,
} from 'lucide-react'
import { Card, Button, Badge, Modal, useToastActions } from '@/components/ui'
import { supportAPI } from '@/lib/api'
import type { SupportTicket, SystemAlert } from '@/lib/types'

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [alerts, setAlerts] = useState<SystemAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewTicketModal, setShowNewTicketModal] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
  })

  const toast = useToastActions()
  const tenantId = 'tenant-001'

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [ticketsRes, alertsRes] = await Promise.all([
        supportAPI.listTickets(tenantId),
        supportAPI.listAlerts(tenantId),
      ])

      setTickets(ticketsRes.data)
      setAlerts(alertsRes.data)
    } catch (error) {
      toast.error('Failed to load support data')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTicket = async () => {
    try {
      await supportAPI.createTicket(tenantId, newTicket)
      toast.success('Ticket created successfully')
      setShowNewTicketModal(false)
      setNewTicket({ subject: '', message: '', priority: 'medium' })
      loadData()
    } catch (error) {
      toast.error('Failed to create ticket')
    }
  }

  const handleMarkAlertRead = async (alertId: string) => {
    try {
      await supportAPI.markAlertRead(tenantId, alertId)
      loadData()
    } catch (error) {
      toast.error('Failed to mark alert as read')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'in_progress':
        return <AlertCircle className="w-4 h-4 text-blue-600" />
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <HelpCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'default',
      medium: 'info',
      high: 'warning',
      urgent: 'error',
    } as const

    return <Badge variant={variants[priority as keyof typeof variants]}>{priority}</Badge>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support & Help</h1>
          <p className="text-gray-600 mt-1">Get help and manage support tickets</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hover onClick={() => window.open('/docs', '_blank')}>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-[#16F98A]/10 rounded-lg">
                <Book className="w-6 h-6 text-[#16F98A]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">API Documentation</h3>
                <p className="text-sm text-gray-600">View technical docs</p>
              </div>
            </div>
          </Card>

          <Card hover onClick={() => setShowNewTicketModal(true)}>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Create Ticket</h3>
                <p className="text-sm text-gray-600">Submit a support request</p>
              </div>
            </div>
          </Card>

          <Card hover onClick={() => toast.info('Live chat coming soon')}>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Live Chat</h3>
                <p className="text-sm text-gray-600">Chat with support team</p>
              </div>
            </div>
          </Card>
        </div>

        {/* System Alerts */}
        <Card title="System Alerts" subtitle="Important notifications from Coinfixi">
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No alerts at the moment</p>
            ) : (
              alerts.slice(0, 5).map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-lg border ${
                    alert.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>

                    {!alert.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMarkAlertRead(alert.id)}
                      >
                        Mark Read
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </Card>

        {/* Support Tickets */}
        <Card
          title="Your Support Tickets"
          subtitle="Track your support requests"
        >
          <div className="space-y-3">
            {tickets.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No tickets yet</p>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={() => setShowNewTicketModal(true)}
                >
                  Create Your First Ticket
                </Button>
              </div>
            ) : (
              tickets.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(ticket.status)}
                      <div>
                        <h4 className="font-medium text-gray-900">{ticket.subject}</h4>
                        <div className="flex items-center space-x-3 mt-2">
                          <Badge
                            variant={
                              ticket.status === 'resolved'
                                ? 'success'
                                : ticket.status === 'in_progress'
                                ? 'info'
                                : 'warning'
                            }
                          >
                            {ticket.status.replace('_', ' ')}
                          </Badge>
                          {getPriorityBadge(ticket.priority)}
                          <span className="text-xs text-gray-500">
                            {new Date(ticket.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </Card>

        {/* FAQ */}
        <Card title="Frequently Asked Questions">
          <div className="space-y-4">
            {[
              {
                q: 'How long does a deposit take to confirm?',
                a: 'Deposits are confirmed after the required number of blockchain confirmations. BTC: 6, ETH: 12, TRON: 19.',
              },
              {
                q: 'What are the withdrawal limits?',
                a: 'Default limits are $10,000 per day. Contact support to increase your limits.',
              },
              {
                q: 'How do I generate an API key?',
                a: 'Go to Settings > API Keys > Create Key. Keep your key secure and never share it.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <summary className="font-medium text-gray-900 cursor-pointer">
                  {faq.q}
                </summary>
                <p className="text-sm text-gray-600 mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </Card>
      </div>

      {/* New Ticket Modal */}
      <Modal
        isOpen={showNewTicketModal}
        onClose={() => setShowNewTicketModal(false)}
        title="Create Support Ticket"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={newTicket.subject}
              onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
              placeholder="Brief description of your issue"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={newTicket.priority}
              onChange={(e) =>
                setNewTicket({ ...newTicket, priority: e.target.value as any })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={newTicket.message}
              onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
              placeholder="Describe your issue in detail..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16F98A]"
            />
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" fullWidth onClick={() => setShowNewTicketModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              icon={<Send className="w-4 h-4" />}
              onClick={handleCreateTicket}
              disabled={!newTicket.subject || !newTicket.message}
            >
              Submit Ticket
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

