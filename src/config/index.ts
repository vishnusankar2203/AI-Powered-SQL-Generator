// Environment configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 30000,
    retries: 3,
  },
  
  // Feature flags
  features: {
    voiceInput: false,
    realTimeValidation: true,
    queryHistory: true,
    exportResults: true,
  },
  
  // UI Configuration
  ui: {
    maxQueryLength: 500,
    processingDelay: 1500,
    copyTimeout: 2000,
    defaultPageSize: 10,
    animationDuration: 200,
  },
  
  // Development settings
  development: {
    enableMockData: import.meta.env.DEV,
    enableDebugLogging: import.meta.env.DEV,
    enablePerformanceMonitoring: import.meta.env.DEV,
  },
} as const;

// Type-safe config access
export type Config = typeof config; 