// ============================================
// TIPOS PARA DASHBOARD CASINO / SPORTSBOOK
// ============================================

// ========== TABLE COLUMN TYPE ==========
export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
  width?: string
}

// ========== TRANSACCIONES ==========
export type TransactionType = 'deposit' | 'withdrawal' | 'fee' | 'conversion' | 'sweep' | 'settlement'
export type ChainType = 'BTC' | 'ETH' | 'TRON' | 'BEP20' | 'BSC' | 'POLYGON'
export type TransactionStatus = 'pending' | 'confirming' | 'completed' | 'expired' | 'failed'

export interface Transaction {
  id: string
  tenant_id: string
  type: TransactionType
  chain: ChainType
  status: TransactionStatus
  amount: number
  currency: string
  fee?: number
  from_address?: string
  to_address: string
  tx_hash?: string
  confirmations: number
  required_confirmations: number
  created_at: string
  confirmed_at?: string
  completed_at?: string
  metadata?: TransactionMetadata
}

export interface TransactionMetadata {
  block_height?: number
  gas_used?: number
  gas_price?: number
  network_fee?: number
  exchange_rate?: number
  usd_value?: number
  risk_score?: number
  compliance_flags?: string[]
}

export interface TransactionFilters {
  dateRange?: { from: Date; to: Date }
  type?: TransactionType | 'all'
  status?: TransactionStatus | 'all'
  currency?: string | 'all'
  search?: string
}

// ========== KPI CARDS ==========
export interface KPICard {
  title: string
  value: string | number
  change: number // porcentaje
  trend: 'up' | 'down'
  period: '7d' | '30d'
  icon: string // nombre del icono de lucide-react
  color: string
  description?: string
}

export interface DashboardMetrics {
  volumeProcessed7d: number
  volumeProcessed30d: number
  totalDeposits: number
  totalWithdrawals: number
  successRate: number
  balances: Balance[]
}

// ========== BALANCES / WALLETS ==========
export interface Balance {
  asset: 'USDT' | 'BTC' | 'ETH' | 'TRON' | 'BNB'
  available: number
  reserved: number
  total: number
  usd_value: number
}

export interface WalletMovement {
  id: string
  type: 'deposit' | 'withdrawal'
  asset: string
  amount: number
  timestamp: string
  status: TransactionStatus
}

// ========== CLIENTES / SUBCUENTAS ==========
export interface SubAccount {
  id: string
  name: string
  type: 'sala' | 'usuario_final'
  daily_limit: number
  weekly_limit: number
  current_daily_usage: number
  current_weekly_usage: number
  balances: Balance[]
  status: 'active' | 'suspended'
  created_at: string
  last_activity?: string
}

// ========== REPORTES ==========
export type ReportType = 'transactions' | 'balance' | 'fees' | 'custom'
export type ReportPeriod = 'day' | 'week' | 'month' | 'quarter' | 'year' | 'custom'
export type ReportFormat = 'csv' | 'pdf' | 'excel' | 'json'

export interface Report {
  id: string
  type: ReportType
  period: ReportPeriod
  format: ReportFormat
  date_from: string
  date_to: string
  status: 'generating' | 'ready' | 'failed'
  download_url?: string
  created_at: string
}

export interface ReportData {
  summary: {
    total_transactions: number
    total_volume: number
    total_fees: number
    success_rate: number
  }
  transactions: Transaction[]
  balances: Balance[]
  fees: FeeBreakdown[]
}

export interface FeeBreakdown {
  date: string
  platform_fee: number
  network_fee: number
  total_fee: number
}

// ========== CONFIGURACIÓN ==========
export interface BusinessConfig {
  business_name: string
  email: string
  phone: string
  country: string
  master_wallets: {
    BTC?: string
    ETH?: string
    USDT?: string
    TRON?: string
    BNB?: string
  }
}

export interface APIKey {
  id: string
  name: string
  key: string // solo se muestra al crear
  created_at: string
  last_used?: string
  status: 'active' | 'revoked'
  permissions: string[]
}

export interface Webhook {
  id: string
  url: string
  events: WebhookEvent[]
  secret: string
  status: 'active' | 'failed'
  last_call?: string
  success_rate: number
  logs: WebhookLog[]
}

export type WebhookEvent = 
  | 'deposit.created'
  | 'deposit.confirming'
  | 'deposit.confirmed'
  | 'withdrawal.created'
  | 'withdrawal.processing'
  | 'withdrawal.completed'
  | 'withdrawal.failed'

export interface WebhookLog {
  id: string
  timestamp: string
  event: WebhookEvent
  status_code: number
  response_time: number
  payload: any
  response: any
}

export interface SecurityLimits {
  daily_withdrawal_limit: number
  single_transaction_max: number
  require_2fa_above: number
  allowed_ips: string[]
  email_confirmations: boolean
}

export interface NotificationSettings {
  email: {
    large_deposits: { enabled: boolean; threshold: number }
    failed_transactions: boolean
    withdrawals: boolean
    weekly_summary: boolean
  }
  push: {
    critical_alerts: boolean
    deposits: boolean
    withdrawals: boolean
  }
  toast: {
    real_time_updates: boolean
  }
}

// ========== SOPORTE ==========
export interface SupportTicket {
  id: string
  subject: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  created_at: string
  updated_at: string
  messages: SupportMessage[]
}

export interface SupportMessage {
  id: string
  from: 'user' | 'support'
  message: string
  timestamp: string
  attachments?: string[]
}

export interface SystemAlert {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  timestamp: string
  read: boolean
  action_url?: string
  action_label?: string
}

// ========== GRÁFICOS ==========
export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string
  borderWidth?: number
  fill?: boolean
}

export interface TimeSeriesData {
  date: string
  deposits: number
  withdrawals: number
  volume: number
}

// ========== API RESPONSES ==========
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

