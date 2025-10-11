// ============================================
// API ENDPOINTS - DASHBOARD CASINO/SPORTSBOOK
// ============================================

import { apiClient } from './client'
import type {
  Transaction,
  TransactionFilters,
  DashboardMetrics,
  Balance,
  SubAccount,
  Report,
  ReportType,
  ReportPeriod,
  ReportFormat,
  BusinessConfig,
  APIKey,
  Webhook,
  WebhookEvent,
  SecurityLimits,
  NotificationSettings,
  SupportTicket,
  SystemAlert,
  ApiResponse,
  PaginatedResponse,
  TimeSeriesData,
} from '../types'

// ========== AUTENTICACIÓN ==========
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  user: {
    id: string
    email: string
    name: string
    role: string
    tenant_id: string
  }
}

export interface Setup2FAResponse {
  qr_code: string
  secret: string
}

export interface Verify2FARequest {
  code: string
}

export const authAPI = {
  login: (data: LoginRequest) => 
    apiClient.post<LoginResponse>('/auth/login', data),

  setup2FA: () =>
    apiClient.post<Setup2FAResponse>('/auth/setup-2fa'),

  verify2FA: (data: Verify2FARequest) =>
    apiClient.post<ApiResponse<{ verified: boolean }>>('/auth/verify-2fa', data),

  getMe: () =>
    apiClient.get<ApiResponse<LoginResponse['user']>>('/auth/me'),

  logout: () => {
    apiClient.clearToken()
    return Promise.resolve()
  },
}

// ========== DASHBOARD HOME / MÉTRICAS ==========
export const dashboardAPI = {
  getMetrics: (tenantId: string, period: '7d' | '30d' = '30d') =>
    apiClient.get<ApiResponse<DashboardMetrics>>(
      `/tenants/${tenantId}/dashboard/metrics`,
      { period }
    ),

  getTimeSeriesData: (tenantId: string, dateFrom: string, dateTo: string) =>
    apiClient.get<ApiResponse<TimeSeriesData[]>>(
      `/tenants/${tenantId}/dashboard/timeseries`,
      { date_from: dateFrom, date_to: dateTo }
    ),
}

// ========== TRANSACCIONES ==========
export interface CreateDepositRequest {
  chain: string
  currency: string
  expected_amount?: number
}

export interface CreateDepositResponse {
  deposit_id: string
  address: string
  qr_code: string
  expected_amount?: number
  expires_at: string
}

export const transactionsAPI = {
  list: (tenantId: string, filters?: TransactionFilters, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<Transaction>>(
      `/tenants/${tenantId}/transactions`,
      {
        ...filters,
        page: String(page),
        limit: String(limit),
      } as any
    ),

  get: (tenantId: string, transactionId: string) =>
    apiClient.get<ApiResponse<Transaction>>(
      `/tenants/${tenantId}/transactions/${transactionId}`
    ),

  createDeposit: (tenantId: string, data: CreateDepositRequest) =>
    apiClient.post<ApiResponse<CreateDepositResponse>>(
      `/tenants/${tenantId}/deposits`,
      data
    ),

  listDeposits: (tenantId: string, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<Transaction>>(
      `/tenants/${tenantId}/deposits`,
      { page: String(page), limit: String(limit) }
    ),

  getDeposit: (tenantId: string, depositId: string) =>
    apiClient.get<ApiResponse<Transaction>>(
      `/tenants/${tenantId}/deposits/${depositId}`
    ),
}

// ========== RETIROS ==========
export interface WithdrawalQuoteRequest {
  chain: string
  to_address: string
  amount: number
  currency: string
}

export interface WithdrawalQuote {
  amount: number
  network_fee: number
  platform_fee: number
  total_deducted: number
  amount_to_receive: number
  estimated_time: string
}

export interface CreateWithdrawalRequest extends WithdrawalQuoteRequest {
  two_factor_code?: string
}

export interface CreateWithdrawalResponse {
  withdrawal_id: string
  status: string
  estimated_completion: string
}

export const withdrawalsAPI = {
  getQuote: (tenantId: string, data: WithdrawalQuoteRequest) =>
    apiClient.post<ApiResponse<WithdrawalQuote>>(
      `/tenants/${tenantId}/withdrawals/quote`,
      data
    ),

  create: (tenantId: string, data: CreateWithdrawalRequest) =>
    apiClient.post<ApiResponse<CreateWithdrawalResponse>>(
      `/tenants/${tenantId}/withdrawals`,
      data
    ),

  list: (tenantId: string, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<Transaction>>(
      `/tenants/${tenantId}/withdrawals`,
      { page: String(page), limit: String(limit) }
    ),

  get: (tenantId: string, withdrawalId: string) =>
    apiClient.get<ApiResponse<Transaction>>(
      `/tenants/${tenantId}/withdrawals/${withdrawalId}`
    ),

  cancel: (tenantId: string, withdrawalId: string) =>
    apiClient.post<ApiResponse<{ cancelled: boolean }>>(
      `/tenants/${tenantId}/withdrawals/${withdrawalId}/cancel`
    ),
}

// ========== BALANCES / WALLETS ==========
export const balancesAPI = {
  list: (tenantId: string) =>
    apiClient.get<ApiResponse<Balance[]>>(`/tenants/${tenantId}/balances`),

  getByAsset: (tenantId: string, asset: string) =>
    apiClient.get<ApiResponse<Balance>>(`/tenants/${tenantId}/balances/${asset}`),

  getMovements: (tenantId: string, asset?: string, limit = 10) =>
    apiClient.get<ApiResponse<Transaction[]>>(
      `/tenants/${tenantId}/balances/movements`,
      asset ? { asset, limit: String(limit) } : { limit: String(limit) }
    ),
}

// ========== CLIENTES / SUBCUENTAS ==========
export interface CreateSubAccountRequest {
  name: string
  type: 'sala' | 'usuario_final'
  daily_limit: number
  weekly_limit: number
}

export const subAccountsAPI = {
  list: (tenantId: string, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<SubAccount>>(
      `/tenants/${tenantId}/subaccounts`,
      { page: String(page), limit: String(limit) }
    ),

  get: (tenantId: string, subAccountId: string) =>
    apiClient.get<ApiResponse<SubAccount>>(
      `/tenants/${tenantId}/subaccounts/${subAccountId}`
    ),

  create: (tenantId: string, data: CreateSubAccountRequest) =>
    apiClient.post<ApiResponse<SubAccount>>(
      `/tenants/${tenantId}/subaccounts`,
      data
    ),

  update: (tenantId: string, subAccountId: string, data: Partial<CreateSubAccountRequest>) =>
    apiClient.put<ApiResponse<SubAccount>>(
      `/tenants/${tenantId}/subaccounts/${subAccountId}`,
      data
    ),

  suspend: (tenantId: string, subAccountId: string) =>
    apiClient.post<ApiResponse<{ suspended: boolean }>>(
      `/tenants/${tenantId}/subaccounts/${subAccountId}/suspend`
    ),

  resume: (tenantId: string, subAccountId: string) =>
    apiClient.post<ApiResponse<{ resumed: boolean }>>(
      `/tenants/${tenantId}/subaccounts/${subAccountId}/resume`
    ),
}

// ========== REPORTES ==========
export interface GenerateReportRequest {
  type: ReportType
  period: ReportPeriod
  format: ReportFormat
  date_from?: string
  date_to?: string
  filters?: any
}

export const reportsAPI = {
  list: (tenantId: string, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<Report>>(
      `/tenants/${tenantId}/reports`,
      { page: String(page), limit: String(limit) }
    ),

  get: (tenantId: string, reportId: string) =>
    apiClient.get<ApiResponse<Report>>(
      `/tenants/${tenantId}/reports/${reportId}`
    ),

  generate: (tenantId: string, data: GenerateReportRequest) =>
    apiClient.post<ApiResponse<Report>>(
      `/tenants/${tenantId}/reports/generate`,
      data
    ),

  download: (tenantId: string, reportId: string) =>
    `/tenants/${tenantId}/reports/${reportId}/download`,

  getSummary: (tenantId: string, dateFrom?: string, dateTo?: string) =>
    apiClient.get<ApiResponse<any>>(
      `/tenants/${tenantId}/reports/summary`,
      dateFrom && dateTo ? { date_from: dateFrom, date_to: dateTo } : undefined
    ),
}

// ========== CONFIGURACIÓN ==========
export const configAPI = {
  getBusiness: (tenantId: string) =>
    apiClient.get<ApiResponse<BusinessConfig>>(`/tenants/${tenantId}/config/business`),

  updateBusiness: (tenantId: string, data: Partial<BusinessConfig>) =>
    apiClient.put<ApiResponse<BusinessConfig>>(
      `/tenants/${tenantId}/config/business`,
      data
    ),

  // API Keys
  listAPIKeys: (tenantId: string) =>
    apiClient.get<ApiResponse<APIKey[]>>(`/tenants/${tenantId}/config/api-keys`),

  createAPIKey: (tenantId: string, name: string, permissions: string[]) =>
    apiClient.post<ApiResponse<APIKey>>(
      `/tenants/${tenantId}/config/api-keys`,
      { name, permissions }
    ),

  revokeAPIKey: (tenantId: string, keyId: string) =>
    apiClient.delete<ApiResponse<{ revoked: boolean }>>(
      `/tenants/${tenantId}/config/api-keys/${keyId}`
    ),

  // Webhooks
  listWebhooks: (tenantId: string) =>
    apiClient.get<ApiResponse<Webhook[]>>(`/tenants/${tenantId}/config/webhooks`),

  createWebhook: (tenantId: string, url: string, events: WebhookEvent[]) =>
    apiClient.post<ApiResponse<Webhook>>(
      `/tenants/${tenantId}/config/webhooks`,
      { url, events }
    ),

  updateWebhook: (tenantId: string, webhookId: string, data: Partial<Webhook>) =>
    apiClient.put<ApiResponse<Webhook>>(
      `/tenants/${tenantId}/config/webhooks/${webhookId}`,
      data
    ),

  deleteWebhook: (tenantId: string, webhookId: string) =>
    apiClient.delete<ApiResponse<{ deleted: boolean }>>(
      `/tenants/${tenantId}/config/webhooks/${webhookId}`
    ),

  testWebhook: (tenantId: string, webhookId: string) =>
    apiClient.post<ApiResponse<{ success: boolean; response: any }>>(
      `/tenants/${tenantId}/config/webhooks/${webhookId}/test`
    ),

  // Security Limits
  getSecurityLimits: (tenantId: string) =>
    apiClient.get<ApiResponse<SecurityLimits>>(`/tenants/${tenantId}/config/security`),

  updateSecurityLimits: (tenantId: string, data: Partial<SecurityLimits>) =>
    apiClient.put<ApiResponse<SecurityLimits>>(
      `/tenants/${tenantId}/config/security`,
      data
    ),

  // Notifications
  getNotificationSettings: (tenantId: string) =>
    apiClient.get<ApiResponse<NotificationSettings>>(
      `/tenants/${tenantId}/config/notifications`
    ),

  updateNotificationSettings: (tenantId: string, data: Partial<NotificationSettings>) =>
    apiClient.put<ApiResponse<NotificationSettings>>(
      `/tenants/${tenantId}/config/notifications`,
      data
    ),
}

// ========== SOPORTE ==========
export interface CreateTicketRequest {
  subject: string
  message: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  attachments?: string[]
}

export interface ReplyTicketRequest {
  message: string
  attachments?: string[]
}

export const supportAPI = {
  listTickets: (tenantId: string, status?: string, page = 1, limit = 25) =>
    apiClient.get<PaginatedResponse<SupportTicket>>(
      `/tenants/${tenantId}/support/tickets`,
      { status, page: String(page), limit: String(limit) } as any
    ),

  getTicket: (tenantId: string, ticketId: string) =>
    apiClient.get<ApiResponse<SupportTicket>>(
      `/tenants/${tenantId}/support/tickets/${ticketId}`
    ),

  createTicket: (tenantId: string, data: CreateTicketRequest) =>
    apiClient.post<ApiResponse<SupportTicket>>(
      `/tenants/${tenantId}/support/tickets`,
      data
    ),

  replyTicket: (tenantId: string, ticketId: string, data: ReplyTicketRequest) =>
    apiClient.post<ApiResponse<SupportTicket>>(
      `/tenants/${tenantId}/support/tickets/${ticketId}/reply`,
      data
    ),

  closeTicket: (tenantId: string, ticketId: string) =>
    apiClient.post<ApiResponse<{ closed: boolean }>>(
      `/tenants/${tenantId}/support/tickets/${ticketId}/close`
    ),

  // System Alerts
  listAlerts: (tenantId: string, unread_only = false, limit = 10) =>
    apiClient.get<ApiResponse<SystemAlert[]>>(
      `/tenants/${tenantId}/alerts`,
      { unread_only: String(unread_only), limit: String(limit) }
    ),

  markAlertRead: (tenantId: string, alertId: string) =>
    apiClient.post<ApiResponse<{ read: boolean }>>(
      `/tenants/${tenantId}/alerts/${alertId}/read`
    ),

  markAllAlertsRead: (tenantId: string) =>
    apiClient.post<ApiResponse<{ count: number }>>(
      `/tenants/${tenantId}/alerts/read-all`
    ),
}

// ========== PRICING ==========
export interface PriceQuote {
  from_currency: string
  to_currency: string
  amount: number
  price: number
  total: number
  timestamp: string
}

export const pricingAPI = {
  getQuote: (from: string, to: string, amount: number) =>
    apiClient.get<ApiResponse<PriceQuote>>(
      '/pricing/quote',
      { from, to, amount: String(amount) }
    ),

  getRates: () =>
    apiClient.get<ApiResponse<Record<string, number>>>('/pricing/rates'),
}

