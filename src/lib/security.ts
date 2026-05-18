/**
 * Security utility for sanitizing user input.
 * Strips HTML tags and escapes sensitive characters to prevent XSS.
 */
export const sanitizeString = (str: unknown): string => {
  if (typeof str !== 'string') return '';
  
  // Strip HTML tags
  const stripped = str.replace(/<[^>]*>?/gm, '');
  
  // Escape sensitive characters for extra layer of protection
  const escaped = stripped
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
    
  return escaped.trim();
};

/**
 * Validates if an email is in the authorized list.
 */
export const isAuthorized = (email: string | null): boolean => {
  if (!email) return false;
  const authorizedEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || [];
  return authorizedEmails.includes(email);
};
