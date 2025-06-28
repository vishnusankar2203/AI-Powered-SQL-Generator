import { DatabaseSchema } from '@/types';

// Sample Database Schema
export const SAMPLE_DATABASE_SCHEMA: DatabaseSchema = {
  customers: {
    columns: [
      { name: 'id', type: 'INT', primary: true },
      { name: 'name', type: 'VARCHAR(255)', primary: false },
      { name: 'email', type: 'VARCHAR(255)', primary: false },
      { name: 'city', type: 'VARCHAR(100)', primary: false },
      { name: 'created_at', type: 'TIMESTAMP', primary: false },
    ]
  },
  orders: {
    columns: [
      { name: 'id', type: 'INT', primary: true },
      { name: 'customer_id', type: 'INT', primary: false },
      { name: 'total_amount', type: 'DECIMAL(10,2)', primary: false },
      { name: 'status', type: 'VARCHAR(50)', primary: false },
      { name: 'created_at', type: 'TIMESTAMP', primary: false },
    ]
  },
  products: {
    columns: [
      { name: 'id', type: 'INT', primary: true },
      { name: 'product_name', type: 'VARCHAR(255)', primary: false },
      { name: 'price', type: 'DECIMAL(10,2)', primary: false },
      { name: 'category', type: 'VARCHAR(100)', primary: false },
      { name: 'inventory_count', type: 'INT', primary: false },
    ]
  },
  order_items: {
    columns: [
      { name: 'id', type: 'INT', primary: true },
      { name: 'order_id', type: 'INT', primary: false },
      { name: 'product_id', type: 'INT', primary: false },
      { name: 'quantity', type: 'INT', primary: false },
      { name: 'unit_price', type: 'DECIMAL(10,2)', primary: false },
    ]
  }
};

// Sample Queries
export const SAMPLE_QUERIES = [
  "Show me all customers from Chennai",
  "Count total orders from last month",
  "What are the top selling products?",
  "Find customers who haven't ordered recently",
  "Show sales by region",
  "List products with low inventory"
];

// Query Suggestions
export const QUERY_SUGGESTIONS = [
  "Show me all customers from Chennai",
  "What are the top 5 best selling products?",
  "Count orders from last month"
];

// Mock Data
export const MOCK_CUSTOMER_DATA = [
  { id: 1, name: 'Raj Kumar', email: 'raj@example.com', city: 'Chennai', created_at: '2024-01-15' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com', city: 'Chennai', created_at: '2024-02-20' },
  { id: 3, name: 'Arjun Singh', email: 'arjun@example.com', city: 'Chennai', created_at: '2024-03-10' },
];

// Application Configuration
export const APP_CONFIG = {
  maxQueryLength: 500,
  processingDelay: 1500, // milliseconds
  copyTimeout: 2000, // milliseconds
  defaultPageSize: 10,
} as const;

// SQL Query Patterns
export const SQL_PATTERNS = {
  customers_chennai: "SELECT * FROM customers WHERE city = 'Chennai';",
  sales_last_month: "SELECT * FROM sales WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH);",
  count_orders: "SELECT COUNT(*) as total_orders FROM orders;",
  top_products: "SELECT product_name, SUM(quantity) as total_sold FROM order_items GROUP BY product_name ORDER BY total_sold DESC LIMIT 10;",
  default: "SELECT * FROM customers LIMIT 10;"
} as const; 