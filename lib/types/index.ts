// Export all types from dashboard
export * from './dashboard'

// Export all types from admin  
export * from './admin'

// Re-export common types with aliases if needed
export type { Transaction as DashboardTransaction } from './dashboard'
export type { GlobalTransaction as AdminTransaction } from './admin'

