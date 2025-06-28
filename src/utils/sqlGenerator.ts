import { SQL_PATTERNS, MOCK_CUSTOMER_DATA } from '@/constants';
import { QueryResult } from '@/types';

/**
 * Generates mock SQL based on natural language query patterns
 * In a real application, this would call an AI service
 */
export function generateMockSQL(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('customers') && lowerQuery.includes('chennai')) {
    return SQL_PATTERNS.customers_chennai;
  } 
  
  if (lowerQuery.includes('sales') && lowerQuery.includes('last month')) {
    return SQL_PATTERNS.sales_last_month;
  } 
  
  if (lowerQuery.includes('count') && lowerQuery.includes('orders')) {
    return SQL_PATTERNS.count_orders;
  } 
  
  if (lowerQuery.includes('top') && lowerQuery.includes('products')) {
    return SQL_PATTERNS.top_products;
  } 
  
  return SQL_PATTERNS.default;
}

/**
 * Generates mock query results based on the SQL
 * In a real application, this would execute against a database
 */
export function generateMockResults(sql: string): QueryResult {
  const mockData = [...MOCK_CUSTOMER_DATA];
  
  return {
    sql,
    data: mockData,
    columns: Object.keys(mockData[0] || {}),
    executionTime: Math.random() * 100 + 50,
    rowCount: mockData.length
  };
}

/**
 * Analyzes SQL query to extract metadata
 */
export function analyzeSQL(sql: string): {
  queryType: string;
  tableCount: number;
  estimatedRows: number;
} {
  const upperSQL = sql.toUpperCase();
  
  let queryType = 'SELECT';
  if (upperSQL.includes('INSERT')) queryType = 'INSERT';
  else if (upperSQL.includes('UPDATE')) queryType = 'UPDATE';
  else if (upperSQL.includes('DELETE')) queryType = 'DELETE';
  
  // Simple table count estimation
  const tableCount = (sql.match(/FROM\s+(\w+)/gi) || []).length;
  
  // Rough row estimation
  let estimatedRows = 50;
  if (sql.includes('LIMIT')) {
    const limitMatch = sql.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) {
      estimatedRows = parseInt(limitMatch[1], 10);
    }
  }
  
  return {
    queryType,
    tableCount,
    estimatedRows
  };
}

/**
 * Validates SQL query syntax (basic validation)
 */
export function validateSQL(sql: string): { isValid: boolean; error?: string } {
  if (!sql.trim()) {
    return { isValid: false, error: 'SQL query cannot be empty' };
  }
  
  const upperSQL = sql.toUpperCase();
  
  // Check for basic SQL keywords
  if (!upperSQL.includes('SELECT') && !upperSQL.includes('INSERT') && 
      !upperSQL.includes('UPDATE') && !upperSQL.includes('DELETE')) {
    return { isValid: false, error: 'Query must contain a valid SQL command' };
  }
  
  // Check for semicolon
  if (!sql.trim().endsWith(';')) {
    return { isValid: false, error: 'SQL query must end with semicolon' };
  }
  
  return { isValid: true };
} 