'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileCheck,
  Users,
  Flag,
  RefreshCw,
} from 'lucide-react'
import { Card, Table, Button, Badge, Modal, useToastActions } from '@/components/ui'
import { adminAPI } from '@/lib/api'
import type { ComplianceCheck, ComplianceFlag, Column } from '@/lib/types'

export default function CompliancePage() {
  const [checks, setChecks] = useState<ComplianceCheck[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCheck, setSelectedCheck] = useState<ComplianceCheck | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const toast = useToastActions()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.compliance.listChecks()
      setChecks(response.data)
    } catch (error) {
      toast.error('Failed to load compliance data')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveKYC = async (clientId: string) => {
    try {
      await adminAPI.compliance.approveKYC(clientId, 'Approved by admin')
      toast.success('KYC approved')
      loadData()
    } catch (error) {
      toast.error('Failed to approve KYC')
    }
  }

  const handleRejectKYC = async (clientId: string) => {
    try {
      await adminAPI.compliance.rejectKYC(clientId, 'Documents insufficient')
      toast.success('KYC rejected')
      loadData()
    } catch (error) {
      toast.error('Failed to reject KYC')
    }
  }

  const handleResolveFlag = async (flagId: string) => {
    try {
      await adminAPI.compliance.resolveFlag(flagId, 'Resolved after investigation')
      toast.success('Flag resolved')
      loadData()
    } catch (error) {
      toast.error('Failed to resolve flag')
    }
  }

  const columns: Column<ComplianceCheck>[] = [
    {
      key: 'client_name',
      label: 'Client',
      width: '20%',
      render: (value, row) => (
        <div>
          <p className="font-medium text-white">{value}</p>
          <p className="text-sm text-gray-400">{row.client_id.slice(0, 12)}...</p>
        </div>
      ),
    },
    {
      key: 'kyc_status',
      label: 'KYC Status',
      width: '15%',
      render: (value) => {
        const variants = {
          approved: 'success',
          pending: 'warning',
          rejected: 'error',
          requires_update: 'info',
        } as const
        return (
          <Badge variant={variants[value as keyof typeof variants]}>
            {value.replace('_', ' ')}
          </Badge>
        )
      },
    },
    {
      key: 'aml_score',
      label: 'AML Score',
      width: '10%',
      render: (value) => (
        <span
          className={`font-medium ${
            value > 70 ? 'text-red-400' : value > 40 ? 'text-yellow-400' : 'text-green-400'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'risk_level',
      label: 'Risk Level',
      width: '12%',
      render: (value) => {
        const variants = {
          low: 'success',
          medium: 'warning',
          high: 'error',
          critical: 'error',
        } as const
        return <Badge variant={variants[value as keyof typeof variants]}>{value}</Badge>
      },
    },
    {
      key: 'flags',
      label: 'Active Flags',
      width: '12%',
      render: (flags) => {
        const activeFlags = flags.filter((f: ComplianceFlag) => !f.resolved)
        return (
          <span className={`font-medium ${activeFlags.length > 0 ? 'text-red-400' : 'text-gray-400'}`}>
            {activeFlags.length}
          </span>
        )
      },
    },
    {
      key: 'last_review',
      label: 'Last Review',
      width: '15%',
      render: (value) => (
        <span className="text-sm text-gray-400">{new Date(value).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'reviewed_by',
      label: 'Reviewer',
      width: '10%',
      render: (value) => <span className="text-sm text-gray-300">{value}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '6%',
      render: (_, row) => (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setSelectedCheck(row)
            setShowDetailModal(true)
          }}
        >
          View
        </Button>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Compliance & Risk</h1>
            <p className="text-gray-400 mt-1">Monitor KYC/AML and manage compliance</p>
          </div>

          <Button
            variant="primary"
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={loadData}
          >
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending Review</p>
                <h3 className="text-2xl font-bold text-yellow-400">
                  {checks.filter((c) => c.kyc_status === 'pending').length}
                </h3>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Verified</p>
                <h3 className="text-2xl font-bold text-green-400">
                  {checks.filter((c) => c.kyc_status === 'approved').length}
                </h3>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">High Risk</p>
                <h3 className="text-2xl font-bold text-red-400">
                  {checks.filter((c) => c.risk_level === 'high' || c.risk_level === 'critical').length}
                </h3>
              </div>
              <Shield className="w-8 h-8 text-red-400" />
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Flags</p>
                <h3 className="text-2xl font-bold text-orange-400">
                  {checks.reduce((sum, c) => sum + c.flags.filter((f) => !f.resolved).length, 0)}
                </h3>
              </div>
              <Flag className="w-8 h-8 text-orange-400" />
            </div>
          </Card>
        </div>

        {/* Compliance Table */}
        <Card className="bg-gray-800 border-gray-700">
          <Table
            data={checks}
            columns={columns}
            loading={loading}
            searchable
            searchPlaceholder="Search clients..."
            emptyMessage="No compliance checks found"
          />
        </Card>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Compliance Review"
        size="xl"
      >
        {selectedCheck && (
          <div className="space-y-6">
            {/* Client Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Client Name</label>
                <p className="font-medium text-gray-900 mt-1">{selectedCheck.client_name}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">AML Score</label>
                <p className="font-medium text-gray-900 mt-1">{selectedCheck.aml_score}/100</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Risk Level</label>
                <Badge
                  variant={
                    selectedCheck.risk_level === 'critical'
                      ? 'error'
                      : selectedCheck.risk_level === 'high'
                      ? 'warning'
                      : 'success'
                  }
                >
                  {selectedCheck.risk_level}
                </Badge>
              </div>

              <div>
                <label className="text-sm text-gray-600">Last Review</label>
                <p className="font-medium text-gray-900 mt-1">
                  {new Date(selectedCheck.last_review).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Flags */}
            {selectedCheck.flags.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Compliance Flags</h4>
                <div className="space-y-2">
                  {selectedCheck.flags.map((flag, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        flag.resolved ? 'bg-gray-100' : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {flag.type.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{flag.description}</p>
                          {flag.resolved && (
                            <p className="text-xs text-green-600 mt-2">
                              Resolved by {flag.resolved_by} on{' '}
                              {new Date(flag.resolved_at!).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        {!flag.resolved && (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => toast.info('Resolve flag feature')}
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {selectedCheck.kyc_status === 'pending' && (
              <div className="flex items-center space-x-3 pt-4 border-t">
                <Button
                  variant="primary"
                  fullWidth
                  icon={<CheckCircle className="w-4 h-4" />}
                  onClick={() => handleApproveKYC(selectedCheck.client_id)}
                >
                  Approve KYC
                </Button>
                <Button
                  variant="danger"
                  fullWidth
                  icon={<XCircle className="w-4 h-4" />}
                  onClick={() => handleRejectKYC(selectedCheck.client_id)}
                >
                  Reject KYC
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

