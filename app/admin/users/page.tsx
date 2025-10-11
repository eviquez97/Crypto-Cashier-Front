'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Users,
  UserPlus,
  Shield,
  Pause,
  Play,
  Key,
  Activity,
  Eye,
} from 'lucide-react'
import { Card, Table, Button, Badge, Modal, useToastActions } from '@/components/ui'
import { adminAPI } from '@/lib/api'
import type { AdminUser, AdminRole, ActivityLog, Column } from '@/lib/types'

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showLogsModal, setShowLogsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'support' as AdminRole,
  })

  const toast = useToastActions()

  useEffect(() => {
    loadUsers()
    loadActivityLogs()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.users.list()
      setUsers(response.data)
    } catch (error) {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const loadActivityLogs = async () => {
    try {
      const response = await adminAPI.users.getActivityLogs()
      setActivityLogs(response.data)
    } catch (error) {
      console.error('Failed to load activity logs')
    }
  }

  const handleCreateUser = async () => {
    try {
      await adminAPI.users.create(newUser)
      toast.success('User created successfully')
      setShowCreateModal(false)
      setNewUser({ name: '', email: '', role: 'support' })
      loadUsers()
    } catch (error) {
      toast.error('Failed to create user')
    }
  }

  const handleSuspend = async (userId: string) => {
    try {
      await adminAPI.users.suspend(userId)
      toast.success('User suspended')
      loadUsers()
    } catch (error) {
      toast.error('Failed to suspend user')
    }
  }

  const handleReactivate = async (userId: string) => {
    try {
      await adminAPI.users.reactivate(userId)
      toast.success('User reactivated')
      loadUsers()
    } catch (error) {
      toast.error('Failed to reactivate user')
    }
  }

  const handleResetPassword = async (userId: string) => {
    try {
      await adminAPI.users.resetPassword(userId)
      toast.success('Password reset link sent')
    } catch (error) {
      toast.error('Failed to reset password')
    }
  }

  const usersColumns: Column<AdminUser>[] = [
    {
      key: 'name',
      label: 'Name',
      width: '20%',
      render: (value, row) => (
        <div>
          <p className="font-medium text-white">{value}</p>
          <p className="text-sm text-gray-400">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      width: '15%',
      render: (value) => (
        <Badge variant="info">
          {value.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      width: '12%',
      render: (value) => {
        const variants = {
          active: 'success',
          suspended: 'error',
          inactive: 'default',
        } as const
        return <Badge variant={variants[value as keyof typeof variants]}>{value}</Badge>
      },
    },
    {
      key: 'two_factor_enabled',
      label: '2FA',
      width: '10%',
      render: (value) =>
        value ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400" />
        ),
    },
    {
      key: 'last_login',
      label: 'Last Login',
      width: '15%',
      render: (value) => (
        <span className="text-sm text-gray-400">{new Date(value).toLocaleString()}</span>
      ),
    },
    {
      key: 'login_count',
      label: 'Logins',
      width: '10%',
      render: (value) => <span className="text-gray-300">{value}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '18%',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          {row.status === 'active' ? (
            <button
              onClick={() => handleSuspend(row.id)}
              className="p-2 hover:bg-gray-700 rounded-lg"
              title="Suspend"
            >
              <Pause className="w-4 h-4 text-red-400" />
            </button>
          ) : (
            <button
              onClick={() => handleReactivate(row.id)}
              className="p-2 hover:bg-gray-700 rounded-lg"
              title="Reactivate"
            >
              <Play className="w-4 h-4 text-green-400" />
            </button>
          )}
          <button
            onClick={() => handleResetPassword(row.id)}
            className="p-2 hover:bg-gray-700 rounded-lg"
            title="Reset Password"
          >
            <Key className="w-4 h-4 text-blue-400" />
          </button>
          <button
            onClick={() => {
              setSelectedUser(row)
              setShowLogsModal(true)
            }}
            className="p-2 hover:bg-gray-700 rounded-lg"
            title="View Activity"
          >
            <Activity className="w-4 h-4 text-purple-400" />
          </button>
        </div>
      ),
    },
  ]

  const logsColumns: Column<ActivityLog>[] = [
    {
      key: 'action',
      label: 'Action',
      width: '25%',
      render: (value) => <span className="font-medium text-gray-900">{value}</span>,
    },
    {
      key: 'resource',
      label: 'Resource',
      width: '15%',
      render: (value) => <span className="text-gray-600 capitalize">{value}</span>,
    },
    {
      key: 'timestamp',
      label: 'Timestamp',
      width: '20%',
      render: (value) => (
        <span className="text-sm text-gray-600">{new Date(value).toLocaleString()}</span>
      ),
    },
    {
      key: 'ip_address',
      label: 'IP Address',
      width: '15%',
      render: (value) => <span className="font-mono text-sm text-gray-600">{value}</span>,
    },
    {
      key: 'success',
      label: 'Status',
      width: '10%',
      render: (value) => (
        <Badge variant={value ? 'success' : 'error'}>{value ? 'Success' : 'Failed'}</Badge>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-gray-400 mt-1">Manage internal Coinfixi users</p>
          </div>

          <Button
            variant="primary"
            icon={<UserPlus className="w-4 h-4" />}
            onClick={() => setShowCreateModal(true)}
          >
            Create User
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <h3 className="text-2xl font-bold text-white">{users.length}</h3>
              </div>
              <Users className="w-8 h-8 text-[#16F98A]" />
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active</p>
                <h3 className="text-2xl font-bold text-green-400">
                  {users.filter((u) => u.status === 'active').length}
                </h3>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">With 2FA</p>
                <h3 className="text-2xl font-bold text-blue-400">
                  {users.filter((u) => u.two_factor_enabled).length}
                </h3>
              </div>
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Super Admins</p>
                <h3 className="text-2xl font-bold text-purple-400">
                  {users.filter((u) => u.role === 'super_admin').length}
                </h3>
              </div>
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="bg-gray-800 border-gray-700">
          <Table
            data={users}
            columns={usersColumns}
            loading={loading}
            searchable
            emptyMessage="No users found"
          />
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-800 border-gray-700" title="Recent Activity" subtitle="Last 10 actions">
          <Table
            data={activityLogs.slice(0, 10)}
            columns={logsColumns}
            emptyMessage="No activity logs"
          />
        </Card>
      </div>

      {/* Create User Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New User"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as AdminRole })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="support">Support</option>
              <option value="compliance">Compliance</option>
              <option value="finance">Finance</option>
              <option value="developer">Developer</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <Button variant="ghost" fullWidth onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleCreateUser}
              disabled={!newUser.name || !newUser.email}
            >
              Create User
            </Button>
          </div>
        </div>
      </Modal>

      {/* Activity Logs Modal */}
      <Modal
        isOpen={showLogsModal}
        onClose={() => setShowLogsModal(false)}
        title={`Activity Logs - ${selectedUser?.name}`}
        size="xl"
      >
        {selectedUser && (
          <Table
            data={activityLogs.filter((log) => log.user_id === selectedUser.id)}
            columns={logsColumns}
            searchable
            emptyMessage="No activity logs for this user"
          />
        )}
      </Modal>
    </div>
  )
}

