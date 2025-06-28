import React, { useState } from 'react';
import { Send, Mic, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QueryInputProps } from '@/types';
import { QUERY_SUGGESTIONS, APP_CONFIG } from '@/constants';

export const QueryInput: React.FC<QueryInputProps> = ({ 
  onSubmit, 
  isLoading, 
  disabled = false 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading && !disabled) {
      onSubmit(query.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const isSubmitDisabled = !query.trim() || isLoading || disabled;
  const characterCount = query.length;
  const isOverLimit = characterCount > APP_CONFIG.maxQueryLength;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h2 className="text-lg font-semibold text-gray-900">Ask Your Question</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question in natural language... e.g., 'Show me all customers from Chennai'"
            className={`w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[100px] ${
              isOverLimit 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300'
            }`}
            disabled={isLoading || disabled}
            maxLength={APP_CONFIG.maxQueryLength}
          />
          <button
            type="button"
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            title="Voice Input (Coming Soon)"
            disabled={isLoading || disabled}
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <div className={`text-sm ${
            isOverLimit ? 'text-red-500' : 'text-gray-500'
          }`}>
            {characterCount}/{APP_CONFIG.maxQueryLength} characters
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitDisabled}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Processing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Generate SQL
              </>
            )}
          </Button>
        </div>
      </form>
      
      {/* Quick Suggestions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">Quick suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {QUERY_SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading || disabled}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
