import React, { useState } from 'react';
import { Copy, Play, Code, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SQLDisplayProps } from '@/types';
import { copyToClipboard, createCopySuccessState } from '@/utils/clipboard';
import { analyzeSQL } from '@/utils/sqlGenerator';

export const SQLDisplay: React.FC<SQLDisplayProps> = ({ 
  sql, 
  isLoading, 
  onExecute 
}) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const handleCopy = async () => {
    const result = await copyToClipboard(sql);
    
    if (result.success) {
      createCopySuccessState(setCopied);
      setCopyError(null);
    } else {
      setCopyError(result.error || 'Failed to copy SQL');
    }
  };

  const handleExecute = () => {
    if (onExecute) {
      onExecute();
    }
  };

  const sqlAnalysis = analyzeSQL(sql);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Generated SQL</h3>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Generated SQL</h3>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Ready
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          
          <Button
            onClick={handleExecute}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Execute
          </Button>
        </div>
      </div>

      {/* Copy Error Display */}
      {copyError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-red-800 text-sm">{copyError}</span>
        </div>
      )}
      
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-green-400 font-mono text-sm leading-relaxed">
          <code>{sql}</code>
        </pre>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span>Query Type: {sqlAnalysis.queryType}</span>
          <span>Tables: {sqlAnalysis.tableCount}</span>
        </div>
        <span>Estimated rows: ~{sqlAnalysis.estimatedRows}</span>
      </div>
    </div>
  );
};
