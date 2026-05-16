/**
 * Shared domain types consumed by apps (spa, ssr, api) and packages (ui).
 */

export type UserRole = 'admin' | 'member' | 'guest'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  inStock: boolean
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  timestamp: string
}

export type HealthState = 'ok' | 'degraded'

export interface HealthStatus {
  status: HealthState
  version: string
  /** Milliseconds since process start */
  uptime: number
  timestamp: string
}
