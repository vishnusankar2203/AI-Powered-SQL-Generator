import { APP_CONFIG } from '@/constants';

/**
 * Copies text to clipboard with error handling
 */
export async function copyToClipboard(text: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return { success: true };
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (result) {
        return { success: true };
      } else {
        return { success: false, error: 'Failed to copy text' };
      }
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to copy text' 
    };
  }
}

/**
 * Creates a temporary success state for copy operations
 */
export function createCopySuccessState(setCopied: (value: boolean) => void): void {
  setCopied(true);
  setTimeout(() => setCopied(false), APP_CONFIG.copyTimeout);
} 