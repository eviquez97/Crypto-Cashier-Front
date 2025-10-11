// ============================================
// API ENDPOINTS - DASHBOARD ADMIN COINFIXI
// ============================================

import { apiClient } from './client'
import type {
  GlobalKPIs,
  RegionalData,
  TrendData,
  Client,
  ClientFilters,
  ClientAction,
  ClientLimits,
  GlobalTransaction,
  GlobalTransactionFilters,
  TransactionAlert,
  ComplianceCheck,
  ComplianceFlag,
  CommissionReport,
  FinancialMetrics,
  Invoice,
  AdminUser,
  AdminRole,
  Permission,
  ActivityLog,
  SystemConfig,
  APIStatus,
  SystemHealthMetrics,
  GlobalWebhook,
  AdminDashboardData,
  ApiResponse,
  PaginatedResponse,
} from '../types'

// ========== DASHBOARD OVERVIEW ==========
export const adminDashboardAPI = {
  getData: () =>
    apiClient.get<ApiResponse<AdminDashboardData>>('/admin/dashboard'),

  getKPIs: () =>
    apiClient.get<ApiResponse<GlobalKPIs>>('/admin/dashboard/kpis'),

  getRegionalData: () =>
    apiClient.get<ApiResponse<RegionalData[]>>('/admin/dashboard/regional'),

  getTrends: (dateFrom: string, dateTo: string) =>
    apiClient.get<ApiResponse<TrendData[]>>(
      '/admin/dashboard/trends',
      { date_from: dateFrom, date_to: dateTo }
    ),

  getSystemHealth: () =>
    apiClient.get<ApiResponse<SystemHealthMetrics>>('/admin/system/health'),
}

// ========== GESTIÓN DE CLIENTES ==========
export const adminClientsAPI = {
  list: (filters?: ClientFilters, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<Client>>(
      '/admin/clients',
      { ...filters, page: String(page), limit: String(limit) } as any
    ),

  get: (clientId: string) =>
    apiClient.get<ApiResponse<Client>>(`/admin/clients/${clientId}`),

  create: (data: Partial<Client>) =>
    apiClient.post<ApiResponse<Client>>('/admin/clients', data),

  update: (clientId: string, data: Partial<Client>) =>
    apiClient.put<ApiResponse<Client>>(`/admin/clients/${clientId}`, data),

  suspend: (clientId: string, reason: string) =>
    apiClient.post<ApiResponse<{ suspended: boolean }>>(
      `/admin/clients/${clientId}/suspend`,
      { reason }
    ),

  resume: (clientId: string) =>
    apiClient.post<ApiResponse<{ resumed: boolean }>>(
      `/admin/clients/${clientId}/resume`
    ),

  updateLimits: (clientId: string, limits: ClientLimits) =>
    apiClient.put<ApiResponse<ClientLimits>>(
      `/admin/clients/${clientId}/limits`,
      limits
    ),

  impersonate: (clientId: string) =>
    apiClient.post<ApiResponse<{ token: string }>>(
      `/admin/clients/${clientId}/impersonate`
    ),

  export: (clientId: string) =>
    `/admin/clients/${clientId}/export`,

  getActions: (clientId: string, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<ClientAction>>(
      `/admin/clients/${clientId}/actions`,
      { page: String(page), limit: String(limit) }
    ),
}

// ========== TRANSACCIONES GLOBALES ==========
export const adminTransactionsAPI = {
  list: (filters?: GlobalTransactionFilters, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<GlobalTransaction>>(
      '/admin/transactions',
      { ...filters, page: String(page), limit: String(limit) } as any
    ),

  get: (transactionId: string) =>
    apiClient.get<ApiResponse<GlobalTransaction>>(
      `/admin/transactions/${transactionId}`
    ),

  approve: (transactionId: string, note?: string) =>
    apiClient.post<ApiResponse<{ approved: boolean }>>(
      `/admin/transactions/${transactionId}/approve`,
      { note }
    ),

  reject: (transactionId: string, reason: string) =>
    apiClient.post<ApiResponse<{ rejected: boolean }>>(
      `/admin/transactions/${transactionId}/reject`,
      { reason }
    ),

  addNote: (transactionId: string, note: string, isInternal = true) =>
    apiClient.post<ApiResponse<{ note_id: string }>>(
      `/admin/transactions/${transactionId}/notes`,
      { note, is_internal: isInternal }
    ),

  escalate: (transactionId: string, department: 'compliance' | 'finance' | 'support') =>
    apiClient.post<ApiResponse<{ escalated: boolean }>>(
      `/admin/transactions/${transactionId}/escalate`,
      { department }
    ),

  export: (filters?: GlobalTransactionFilters) =>
    `/admin/transactions/export?${new URLSearchParams(filters as any).toString()}`,

  getAlerts: (page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<TransactionAlert>>(
      '/admin/transactions/alerts',
      { page: String(page), limit: String(limit) }
    ),

  acknowledgeAlert: (alertId: string) =>
    apiClient.post<ApiResponse<{ acknowledged: boolean }>>(
      `/admin/transactions/alerts/${alertId}/acknowledge`
    ),
}

// ========== COMPLIANCE ==========
export const adminComplianceAPI = {
  listChecks: (status?: string, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<ComplianceCheck>>(
      '/admin/compliance/checks',
      { status, page: String(page), limit: String(limit) } as any
    ),

  getCheck: (checkId: string) =>
    apiClient.get<ApiResponse<ComplianceCheck>>(
      `/admin/compliance/checks/${checkId}`
    ),

  approveKYC: (clientId: string, note?: string) =>
    apiClient.post<ApiResponse<{ approved: boolean }>>(
      `/admin/compliance/clients/${clientId}/kyc/approve`,
      { note }
    ),

  rejectKYC: (clientId: string, reason: string) =>
    apiClient.post<ApiResponse<{ rejected: boolean }>>(
      `/admin/compliance/clients/${clientId}/kyc/reject`,
      { reason }
    ),

  requestUpdate: (clientId: string, documents: string[]) =>
    apiClient.post<ApiResponse<{ requested: boolean }>>(
      `/admin/compliance/clients/${clientId}/kyc/request-update`,
      { documents }
    ),

  resolveFlag: (flagId: string, resolution: string) =>
    apiClient.post<ApiResponse<{ resolved: boolean }>>(
      `/admin/compliance/flags/${flagId}/resolve`,
      { resolution }
    ),

  getIntegrations: () =>
    apiClient.get<ApiResponse<any>>('/admin/compliance/integrations'),

  syncIntegration: (provider: string) =>
    apiClient.post<ApiResponse<{ synced: boolean }>>(
      `/admin/compliance/integrations/${provider}/sync`
    ),
}

// ========== FINANZAS ==========
export const adminFinanceAPI = {
  getMetrics: (period: 'today' | 'month' | 'year' = 'month') =>
    apiClient.get<ApiResponse<FinancialMetrics>>(
      '/admin/finance/metrics',
      { period }
    ),

  listCommissions: (period?: string, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<CommissionReport>>(
      '/admin/finance/commissions',
      { period, page: String(page), limit: String(limit) } as any
    ),

  listInvoices: (status?: string, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<Invoice>>(
      '/admin/finance/invoices',
      { status, page: String(page), limit: String(limit) } as any
    ),

  getInvoice: (invoiceId: string) =>
    apiClient.get<ApiResponse<Invoice>>(`/admin/finance/invoices/${invoiceId}`),

  generateInvoice: (clientId: string, period: string) =>
    apiClient.post<ApiResponse<Invoice>>(
      '/admin/finance/invoices/generate',
      { client_id: clientId, period }
    ),

  markInvoicePaid: (invoiceId: string) =>
    apiClient.post<ApiResponse<{ paid: boolean }>>(
      `/admin/finance/invoices/${invoiceId}/mark-paid`
    ),

  exportFinancialReport: (dateFrom: string, dateTo: string, format: 'csv' | 'pdf') =>
    `/admin/finance/export?date_from=${dateFrom}&date_to=${dateTo}&format=${format}`,
}

// ========== USUARIOS Y PERMISOS ==========
export const adminUsersAPI = {
  list: (role?: AdminRole, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<AdminUser>>(
      '/admin/users',
      { role, page: String(page), limit: String(limit) } as any
    ),

  get: (userId: string) =>
    apiClient.get<ApiResponse<AdminUser>>(`/admin/users/${userId}`),

  create: (data: {
    name: string
    email: string
    role: AdminRole
    permissions?: Permission[]
  }) =>
    apiClient.post<ApiResponse<AdminUser>>('/admin/users', data),

  update: (userId: string, data: Partial<AdminUser>) =>
    apiClient.put<ApiResponse<AdminUser>>(`/admin/users/${userId}`, data),

  suspend: (userId: string) =>
    apiClient.post<ApiResponse<{ suspended: boolean }>>(
      `/admin/users/${userId}/suspend`
    ),

  reactivate: (userId: string) =>
    apiClient.post<ApiResponse<{ reactivated: boolean }>>(
      `/admin/users/${userId}/reactivate`
    ),

  resetPassword: (userId: string) =>
    apiClient.post<ApiResponse<{ reset_link: string }>>(
      `/admin/users/${userId}/reset-password`
    ),

  getActivityLogs: (userId?: string, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<ActivityLog>>(
      '/admin/users/activity-logs',
      { user_id: userId, page: String(page), limit: String(limit) } as any
    ),
}

// ========== CONFIGURACIÓN AVANZADA ==========
export const adminConfigAPI = {
  getSystem: () =>
    apiClient.get<ApiResponse<SystemConfig>>('/admin/config/system'),

  updateSystem: (data: Partial<SystemConfig>) =>
    apiClient.put<ApiResponse<SystemConfig>>('/admin/config/system', data),

  getAPIStatuses: () =>
    apiClient.get<ApiResponse<APIStatus[]>>('/admin/config/api/status'),

  testBlockchainNode: (chain: string) =>
    apiClient.post<ApiResponse<{ online: boolean; latency: number }>>(
      `/admin/config/blockchain/${chain}/test`
    ),

  listGlobalWebhooks: () =>
    apiClient.get<ApiResponse<GlobalWebhook[]>>('/admin/config/webhooks/global'),

  createGlobalWebhook: (data: {
    name: string
    url: string
    events: string[]
    clients: 'all' | string[]
  }) =>
    apiClient.post<ApiResponse<GlobalWebhook>>(
      '/admin/config/webhooks/global',
      data
    ),

  updateGlobalWebhook: (webhookId: string, data: Partial<GlobalWebhook>) =>
    apiClient.put<ApiResponse<GlobalWebhook>>(
      `/admin/config/webhooks/global/${webhookId}`,
      data
    ),

  deleteGlobalWebhook: (webhookId: string) =>
    apiClient.delete<ApiResponse<{ deleted: boolean }>>(
      `/admin/config/webhooks/global/${webhookId}`
    ),

  enableMaintenance: (startTime: string, endTime: string, message: string) =>
    apiClient.post<ApiResponse<{ enabled: boolean }>>(
      '/admin/config/maintenance/enable',
      { start_time: startTime, end_time: endTime, message }
    ),

  disableMaintenance: () =>
    apiClient.post<ApiResponse<{ disabled: boolean }>>(
      '/admin/config/maintenance/disable'
    ),
}

// Export all admin APIs
export const adminAPI = {
  dashboard: adminDashboardAPI,
  clients: adminClientsAPI,
  transactions: adminTransactionsAPI,
  compliance: adminComplianceAPI,
  finance: adminFinanceAPI,
  users: adminUsersAPI,
  config: adminConfigAPI,
}

