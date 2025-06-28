import { useState, useCallback } from 'react';
import { QueryProcessingState, QueryResult } from '@/types';
import { generateMockSQL, generateMockResults } from '@/utils/sqlGenerator';
import { APP_CONFIG } from '@/constants';

export interface QueryHistoryItem {
  naturalLanguage: string;
  generatedSQL: string;
  timestamp: number;
}

/**
 * Custom hook for processing natural language queries
 */
export function useQueryProcessor() {
  const [state, setState] = useState<QueryProcessingState>({
    isLoading: false,
    error: null,
    currentQuery: '',
    generatedSQL: '',
    queryResult: null,
  });
  const [history, setHistory] = useState<QueryHistoryItem[]>([]);

  const processQuery = useCallback(async (naturalLanguageQuery: string) => {
    if (!naturalLanguageQuery.trim()) {
      setState(prev => ({ ...prev, error: 'Query cannot be empty' }));
      return;
    }

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      currentQuery: naturalLanguageQuery,
    }));

    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, APP_CONFIG.processingDelay));
      
      // Generate SQL from natural language
      const generatedSQL = generateMockSQL(naturalLanguageQuery);
      
      // Generate mock results
      const queryResult = generateMockResults(generatedSQL);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        generatedSQL,
        queryResult,
        error: null,
      }));
      // Add to history
      setHistory(prev => [
        { naturalLanguage: naturalLanguageQuery, generatedSQL, timestamp: Date.now() },
        ...prev
      ]);
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred while processing the query',
      }));
    }
  }, []);

  const clearResults = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      currentQuery: '',
      generatedSQL: '',
      queryResult: null,
    });
  }, []);

  const retryQuery = useCallback(() => {
    if (state.currentQuery) {
      processQuery(state.currentQuery);
    }
  }, [state.currentQuery, processQuery]);

  const runHistoryQuery = useCallback((item: QueryHistoryItem) => {
    processQuery(item.naturalLanguage);
  }, [processQuery]);

  return {
    ...state,
    processQuery,
    clearResults,
    retryQuery,
    history,
    runHistoryQuery,
  };
} 