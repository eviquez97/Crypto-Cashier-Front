// ============================================
// TIPOS PARA DASHBOARD ADMIN COINFIXI
// ============================================

import { Transaction, TransactionStatus, ChainType, Balance } from './dashboard'

// ========== KPIs GLOBALES ==========
export interface GlobalKPIs {
  total_volume_today: number
  total_volume_month: number
  active_clients: number
  new_integrations: number
  active_alerts: number
  system_health: 'healthy' | 'warning' | 'critical'
  uptime_percentage: number
}

export interface RegionalData {
  country: string
  country_code: string
  clients_count: number
  volume: number
  lat: number
  lng: number
}

export interface TrendData {
  date: string
  deposits: number
  withdrawals: number
  volume: number
  clients: number
}

// ========== GESTIÓN DE CLIENTES ==========
export interface Client {
  id: string
  business_name: string
  email: string
  phone: string
  country: string
  country_code: string
  monthly_volume: number
  total_volume: number
  account_status: 'active' | 'suspended' | 'pending' | 'closed'
  kyc_status: 'verified' | 'pending' | 'rejected' | 'not_started'
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  fee_percentage: number
  custom_limits: ClientLimits
  created_at: string
  last_activity: string
  last_login: string
  users_count: number
  transactions_count: number
}

export interface ClientLimits {
  daily_withdrawal_limit: number
  monthly_volume_limit: number
  single_transaction_max: number
  require_2fa_above: number
}

export interface ClientFilters {
  country?: string
  status?: string
  risk_level?: string
  kyc_status?: string
  monthly_volume_min?: number
  monthly_volume_max?: number
  search?: string
}

export interface ClientAction {
  type: 'suspend' | 'resume' | 'update_limits' | 'impersonate' | 'export'
  client_id: string
  reason?: string
  new_limits?: Partial<ClientLimits>
  performed_by: string
  timestamp: string
}

// ========== TRANSACCIONES GLOBALES ==========
export interface GlobalTransaction extends Transaction {
  client_name: string
  client_id: string
  risk_score: number
  aml_flags: AMLFlag[]
  admin_notes: AdminNote[]
  requires_approval: boolean
  approved_by?: string
  approved_at?: string
}

export interface AMLFlag {
  type: 'suspicious_volume' | 'blacklist_match' | 'high_risk_country' | 'rapid_movement' | 'structuring'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  timestamp: string
  resolved: boolean
  resolved_by?: string
  resolved_at?: string
}

export interface AdminNote {
  id: string
  note: string
  created_by: string
  created_at: string
  is_internal: boolean
}

export interface GlobalTransactionFilters {
  client_id?: string
  asset?: ChainType | 'all'
  blockchain?: ChainType | 'all'
  status?: TransactionStatus | 'all'
  amount_min?: number
  amount_max?: number
  risk_score_min?: number
  risk_score_max?: number
  has_aml_flags?: boolean
  requires_approval?: boolean
  date_from?: string
  date_to?: string
  search?: string
}

export interface TransactionAlert {
  id: string
  transaction_id: string
  client_id: string
  client_name: string
  type: 'consecutive_failures' | 'suspicious_volume' | 'blacklist' | 'pattern'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  timestamp: string
  acknowledged: boolean
  acknowledged_by?: string
  acknowledged_at?: string
}

// ========== COMPLIANCE ==========
export interface ComplianceCheck {
  id: string
  client_id: string
  client_name: string
  kyc_status: 'pending' | 'approved' | 'rejected' | 'requires_update'
  aml_score: number
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  flags: ComplianceFlag[]
  last_review: string
  reviewed_by: string
  next_review: string
  documents: ComplianceDocument[]
}

export interface ComplianceFlag {
  type: 
    | 'suspicious_volume'
    | 'blacklist_match'
    | 'high_risk_country'
    | 'pep_match'
    | 'sanctions_match'
    | 'adverse_media'
    | 'inconsistent_info'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  timestamp: string
  resolved: boolean
  resolved_by?: string
  resolved_at?: string
  resolution_notes?: string
}

export interface ComplianceDocument {
  id: string
  type: 'id_front' | 'id_back' | 'proof_of_address' | 'business_registration' | 'tax_id' | 'other'
  filename: string
  uploaded_at: string
  verified: boolean
  verified_by?: string
  verified_at?: string
  expiry_date?: string
}

export interface ComplianceIntegration {
  provider: 'chainalysis' | 'elliptic' | 'comply_advantage' | 'ofac'
  status: 'active' | 'inactive' | 'error'
  last_sync: string
  api_calls_today: number
  api_limit: number
}

// ========== COMISIONES Y FINANZAS ==========
export interface CommissionReport {
  client_id: string
  client_name: string
  period: string
  volume: number
  fee_percentage: number
  platform_fees: number
  network_fees: number
  total_fees: number
  payment_status: 'pending' | 'paid' | 'overdue'
  payment_date?: string
  invoice_url?: string
}

export interface FinancialMetrics {
  total_revenue_today: number
  total_revenue_month: number
  total_revenue_year: number
  revenue_by_client: RevenueByClient[]
  revenue_trend: RevenueTrend[]
  projected_monthly_revenue: number
  average_fee_percentage: number
}

export interface RevenueByClient {
  client_id: string
  client_name: string
  revenue: number
  percentage_of_total: number
}

export interface RevenueTrend {
  date: string
  revenue: number
  fees: number
  volume: number
}

export interface Invoice {
  id: string
  client_id: string
  client_name: string
  period: string
  total_amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  due_date: string
  paid_date?: string
  pdf_url: string
  line_items: InvoiceLineItem[]
}

export interface InvoiceLineItem {
  description: string
  quantity: number
  unit_price: number
  total: number
}

// ========== ADMINISTRADORES Y PERMISOS ==========
export interface AdminUser {
  id: string
  name: string
  email: string
  role: AdminRole
  permissions: Permission[]
  last_login: string
  login_count: number
  status: 'active' | 'suspended' | 'inactive'
  two_factor_enabled: boolean
  created_at: string
  created_by: string
}

export type AdminRole = 'super_admin' | 'support' | 'compliance' | 'finance' | 'developer'

export interface Permission {
  resource: Resource
  actions: Action[]
}

export type Resource = 
  | 'clients'
  | 'transactions'
  | 'compliance'
  | 'finance'
  | 'users'
  | 'config'
  | 'api_keys'
  | 'webhooks'
  | 'reports'

export type Action = 'read' | 'write' | 'delete' | 'approve' | 'execute'

export interface ActivityLog {
  id: string
  user_id: string
  user_name: string
  action: string
  resource: string
  resource_id?: string
  details: any
  ip_address: string
  user_agent: string
  timestamp: string
  success: boolean
}

// ========== CONFIGURACIÓN AVANZADA ==========
export interface SystemConfig {
  fees: FeeConfig
  networks: NetworkConfig
  limits: GlobalLimits
  integrations: IntegrationConfig
  maintenance: MaintenanceConfig
}

export interface FeeConfig {
  platform_fee_percentage: number
  minimum_fee: number
  custom_fees: Record<string, number> // client_id -> fee_percentage
}

export interface NetworkConfig {
  BTC: NetworkSettings
  ETH: NetworkSettings
  TRON: NetworkSettings
  BEP20: NetworkSettings
  BSC: NetworkSettings
  POLYGON: NetworkSettings
}

export interface NetworkSettings {
  enabled: boolean
  confirmations_required: number
  min_deposit: number
  min_withdrawal: number
  network_fee_multiplier: number
  rpc_url: string
  rpc_status: 'online' | 'offline' | 'degraded'
  last_block: number
  last_sync: string
}

export interface GlobalLimits {
  daily_withdrawal_limit: number
  monthly_volume_limit: number
  single_transaction_max: number
  new_client_daily_limit: number
  unverified_client_limit: number
}

export interface IntegrationConfig {
  blockchain_providers: BlockchainProvider[]
  aml_providers: AMLProvider[]
  email_provider: EmailProvider
  sms_provider: SMSProvider
  monitoring: MonitoringProvider
}

export interface BlockchainProvider {
  name: string
  type: 'alchemy' | 'infura' | 'quicknode' | 'custom'
  chains: ChainType[]
  status: 'active' | 'inactive'
  api_key_set: boolean
  requests_today: number
  requests_limit: number
}

export interface AMLProvider {
  name: string
  type: 'chainalysis' | 'elliptic' | 'comply_advantage'
  status: 'active' | 'inactive'
  api_key_set: boolean
  last_sync: string
}

export interface EmailProvider {
  type: 'sendgrid' | 'ses' | 'mailgun'
  status: 'active' | 'inactive'
  api_key_set: boolean
  emails_sent_today: number
  emails_limit: number
}

export interface SMSProvider {
  type: 'twilio' | 'nexmo' | 'sns'
  status: 'active' | 'inactive'
  api_key_set: boolean
  sms_sent_today: number
  sms_limit: number
}

export interface MonitoringProvider {
  sentry: { enabled: boolean; dsn_set: boolean }
  datadog: { enabled: boolean; api_key_set: boolean }
  logtail: { enabled: boolean; token_set: boolean }
}

export interface MaintenanceConfig {
  scheduled_maintenance: boolean
  maintenance_start?: string
  maintenance_end?: string
  maintenance_message?: string
  affected_services: string[]
}

// ========== MONITOREO DE APIs ==========
export interface APIStatus {
  endpoint: string
  method: string
  status: 'healthy' | 'degraded' | 'down'
  response_time_avg: number
  response_time_p95: number
  success_rate: number
  requests_last_hour: number
  errors_last_hour: number
  last_error?: string
  last_error_time?: string
}

export interface SystemHealthMetrics {
  api: {
    uptime: number
    response_time: number
    error_rate: number
  }
  database: {
    status: 'healthy' | 'warning' | 'critical'
    connections: number
    max_connections: number
    query_time_avg: number
  }
  redis: {
    status: 'healthy' | 'warning' | 'critical'
    memory_used: number
    memory_max: number
    hits_rate: number
  }
  workers: {
    active: number
    idle: number
    failed_tasks_24h: number
    pending_tasks: number
  }
  blockchain_nodes: {
    BTC: NodeStatus
    ETH: NodeStatus
    TRON: NodeStatus
    BEP20: NodeStatus
    BSC: NodeStatus
  }
}

export interface NodeStatus {
  status: 'synced' | 'syncing' | 'error'
  last_block: number
  blocks_behind: number
  last_check: string
}

// ========== WEBHOOKS GLOBALES ==========
export interface GlobalWebhook {
  id: string
  name: string
  url: string
  events: string[]
  clients: 'all' | string[] // 'all' o array de client_ids
  secret: string
  status: 'active' | 'inactive'
  success_rate: number
  last_triggered: string
  triggers_count: number
}

// ========== DASHBOARD ==========
export interface AdminDashboardData {
  kpis: GlobalKPIs
  regional_data: RegionalData[]
  trends: TrendData[]
  recent_alerts: TransactionAlert[]
  top_clients: Client[]
  system_health: SystemHealthMetrics
}

