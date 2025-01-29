/**
 * Generic error response structure used across the application
 */
export interface ApiError {
  code?: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp?: string;
  path?: string;
}
