import React, { useState } from 'react';
import { Database, Table, ChevronDown, ChevronRight, Key, Hash } from 'lucide-react';
import { DatabaseSchemaProps } from '@/types';
import { SAMPLE_DATABASE_SCHEMA } from '@/constants';

export const DatabaseSchema: React.FC<DatabaseSchemaProps> = ({ 
  schema = SAMPLE_DATABASE_SCHEMA,
  onTableSelect 
}) => {
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set(['customers']));

  const toggleTable = (tableName: string) => {
    const newExpanded = new Set(expandedTables);
    if (newExpanded.has(tableName)) {
      newExpanded.delete(tableName);
    } else {
      newExpanded.add(tableName);
    }
    setExpandedTables(newExpanded);
  };

  const handleTableClick = (tableName: string) => {
    if (onTableSelect) {
      onTableSelect(tableName);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Database className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Database Schema</h3>
      </div>
      
      <div className="space-y-3">
        {Object.entries(schema).map(([tableName, tableData]) => (
          <div key={tableName} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleTable(tableName)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Table className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-900 capitalize">
                  {tableName}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {tableData.columns.length} cols
                </span>
              </div>
              {expandedTables.has(tableName) ? (
                <ChevronDown className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-600" />
              )}
            </button>
            
            {expandedTables.has(tableName) && (
              <div className="border-t border-gray-200 p-3 bg-gray-50">
                <div className="space-y-2">
                  {tableData.columns.map((column, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-100 p-1 rounded"
                      onClick={() => handleTableClick(`${tableName}.${column.name}`)}
                      title={`Click to reference ${tableName}.${column.name} in your query`}
                    >
                      <div className="flex items-center gap-2">
                        {column.primary ? (
                          <Key className="h-3 w-3 text-yellow-600" />
                        ) : (
                          <Hash className="h-3 w-3 text-gray-400" />
                        )}
                        <span className="font-mono text-gray-900">
                          {column.name}
                        </span>
                      </div>
                      <span className="text-gray-600 font-mono text-xs">
                        {column.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Reference these table names and columns in your natural language queries for better results.
        </p>
      </div>
    </div>
  );
};
