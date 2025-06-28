import React, { useState } from 'react';
import { QueryInput } from '@/components/QueryInput';
import { SQLDisplay } from '@/components/SQLDisplay';
import { ResultsTable } from '@/components/ResultsTable';
import { DatabaseSchema } from '@/components/DatabaseSchema';
import { Header } from '@/components/Header';
import { Database, Brain, Zap } from 'lucide-react';
import { useQueryProcessor, QueryHistoryItem } from '@/hooks/useQueryProcessor';
import { SAMPLE_QUERIES } from '@/constants';
import { generateMockResults } from '@/utils/sqlGenerator';

const Index: React.FC = () => {
  const {
    isLoading,
    error,
    currentQuery,
    generatedSQL,
    queryResult,
    processQuery,
    clearResults,
    retryQuery,
    history,
    runHistoryQuery,
  } = useQueryProcessor();

  // New state for editable SQL
  const [editableSQL, setEditableSQL] = useState<string>('');
  const [isEditingSQL, setIsEditingSQL] = useState<boolean>(false);
  const [manualResult, setManualResult] = useState<any>(null);

  // When generatedSQL changes, update editableSQL
  React.useEffect(() => {
    setEditableSQL(generatedSQL);
    setIsEditingSQL(false);
    setManualResult(null);
  }, [generatedSQL]);

  const handleEditSQL = () => {
    setIsEditingSQL(true);
  };

  const handleRunSQL = () => {
    // For now, use mock results
    const result = generateMockResults(editableSQL);
    setManualResult(result);
    setIsEditingSQL(false);
  };

  const handleSQLChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableSQL(e.target.value);
  };

  const handleQuerySubmit = (naturalLanguageQuery: string) => {
    processQuery(naturalLanguageQuery);
  };

  const handleSampleQueryClick = (sampleQuery: string) => {
    processQuery(sampleQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <Database className="h-8 w-8 text-green-600" />
            <Zap className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI-Powered SQL Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your natural language questions into powerful SQL queries. 
            Just ask in plain English and watch the magic happen!
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-red-800">{error}</p>
              <button
                onClick={retryQuery}
                className="text-red-600 hover:text-red-800 underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Main Interface */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Database Schema */}
          <div className="lg:col-span-1 space-y-6">
            <DatabaseSchema />
            {/* Query History Panel */}
            {history.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mt-8">
                <h3 className="text-md font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>Query History</span>
                </h3>
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {history.map((item: QueryHistoryItem, idx) => (
                    <li key={item.timestamp}>
                      <button
                        className="w-full text-left p-2 rounded hover:bg-blue-50 transition-colors border border-gray-100"
                        onClick={() => runHistoryQuery(item)}
                        disabled={isLoading}
                        title={item.generatedSQL}
                      >
                        <span className="block text-gray-800 truncate">{item.naturalLanguage}</span>
                        <span className="block text-xs text-gray-500 truncate">{item.generatedSQL}</span>
                        <span className="block text-[10px] text-gray-400">{new Date(item.timestamp).toLocaleString()}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Query Input */}
            <QueryInput 
              onSubmit={handleQuerySubmit}
              isLoading={isLoading}
            />

            {/* SQL Display */}
            {generatedSQL && !isEditingSQL && (
              <div>
                <SQLDisplay 
                  sql={manualResult ? manualResult.sql : generatedSQL}
                  isLoading={isLoading}
                  onExecute={handleEditSQL}
                />
                <div className="flex justify-end mt-2">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    onClick={handleEditSQL}
                  >
                    Edit SQL
                  </button>
                </div>
              </div>
            )}
            {/* SQL Edit Mode */}
            {isEditingSQL && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Edit SQL</h3>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded font-mono text-sm mb-4 min-h-[80px]"
                  value={editableSQL}
                  onChange={handleSQLChange}
                  rows={4}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                    onClick={() => setIsEditingSQL(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    onClick={handleRunSQL}
                  >
                    Run SQL
                  </button>
                </div>
              </div>
            )}
            {/* Results Table */}
            {(manualResult || queryResult) && (
              <ResultsTable 
                result={manualResult || queryResult}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>

        {/* Sample Queries */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Try These Sample Queries
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_QUERIES.map((example, index) => (
              <button
                key={index}
                onClick={() => handleSampleQueryClick(example)}
                disabled={isLoading}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <p className="text-gray-700 font-medium">{example}</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
