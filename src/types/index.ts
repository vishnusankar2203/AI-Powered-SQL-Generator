// Database Schema Types
export interface DatabaseColumn {
  name: string;
  type: string;
  primary: boolean;
}

export interface DatabaseTable {
  columns: DatabaseColumn[];
}

export interface DatabaseSchema {
  [tableName: string]: DatabaseTable;
}

// Query Result Types
export interface QueryResult {
  sql: string;
  data: Record<string, any>[];
  columns: string[];
  executionTime?: number;
  rowCount?: number;
}

// Query Processing Types
export interface QueryProcessingState {
  isLoading: boolean;
  error: string | null;
  currentQuery: string;
  generatedSQL: string;
  queryResult: QueryResult | null;
}

// Component Props Types
export interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export interface SQLDisplayProps {
  sql: string;
  isLoading: boolean;
  onExecute?: () => void;
}

export interface ResultsTableProps {
  result: QueryResult;
  isLoading: boolean;
  onExport?: () => void;
  onVisualize?: () => void;
}

export interface DatabaseSchemaProps {
  schema?: DatabaseSchema;
  onTableSelect?: (tableName: string) => void;
}

// API Response Types
export interface SQLGenerationResponse {
  sql: string;
  confidence: number;
  explanation?: string;
}

export interface QueryExecutionResponse {
  data: Record<string, any>[];
  columns: string[];
  executionTime: number;
  rowCount: number;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'; 