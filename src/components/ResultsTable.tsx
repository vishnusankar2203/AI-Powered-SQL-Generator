import React from 'react';
import { Download, Filter, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResultsTableProps } from '@/types';

export const ResultsTable: React.FC<ResultsTableProps> = ({ 
  result, 
  isLoading, 
  onExport,
  onVisualize 
}) => {
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Default export behavior
      const csvContent = generateCSV(result.data, result.columns);
      downloadCSV(csvContent, 'query_results.csv');
    }
  };

  const handleVisualize = () => {
    if (onVisualize) {
      onVisualize();
    }
  };

  const generateCSV = (data: Record<string, any>[], columns: string[]): string => {
    const header = columns.join(',');
    const rows = data.map(row => 
      columns.map(col => `"${row[col] || ''}"`).join(',')
    );
    return [header, ...rows].join('\n');
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-100 rounded"></div>
            <div className="h-8 bg-gray-100 rounded"></div>
            <div className="h-8 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Query Results</h3>
          <p className="text-sm text-gray-600">
            {result.rowCount || result.data.length} rows • Executed in {result.executionTime?.toFixed(0)}ms
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button 
            onClick={handleVisualize}
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Visualize
          </Button>
          <Button 
            onClick={handleExport}
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      {result.data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {result.columns.map((column, index) => (
                  <th
                    key={index}
                    className="text-left p-3 font-semibold text-gray-900 capitalize"
                  >
                    {column.replace('_', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {result.columns.map((column, colIndex) => (
                    <td key={colIndex} className="p-3 text-gray-700">
                      {row[column]?.toString() || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <BarChart3 className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-600">No results found</p>
        </div>
      )}
    </div>
  );
};
