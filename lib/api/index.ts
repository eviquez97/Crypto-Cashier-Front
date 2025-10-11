// Export API client
export { apiClient, APIError } from './client'
export type { RequestOptions } from './client'

// Export dashboard APIs
export * from './dashboard'

// Export admin APIs
export * from './admin'

// Re-export for convenience
import {
  authAPI,
  dashboardAPI,
  transactionsAPI,
  withdrawalsAPI,
  balancesAPI,
  subAccountsAPI,
  reportsAPI,
  configAPI,
  supportAPI,
  pricingAPI,
} from './dashboard'

import { adminAPI } from './admin'

export const api = {
  auth: authAPI,
  dashboard: dashboardAPI,
  transactions: transactionsAPI,
  withdrawals: withdrawalsAPI,
  balances: balancesAPI,
  subAccounts: subAccountsAPI,
  reports: reportsAPI,
  config: configAPI,
  support: supportAPI,
  pricing: pricingAPI,
  admin: adminAPI,
}

