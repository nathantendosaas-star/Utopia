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
export const DEFAULT_ADMIN_EMAILS = [
  'nathantendo.saas@gmail.com',
  'joshuamusiime20@gmail.com',
  'goawayulc1@gmail.com'
];

export const normalizeEmail = (email: string | null | undefined): string => {
  return (email || '').trim().toLowerCase();
};

export const getAuthorizedEmails = (): string[] => {
  const envEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || [];
  return [...new Set([...DEFAULT_ADMIN_EMAILS, ...envEmails].map(normalizeEmail).filter(Boolean))];
};

export const isAuthorized = (email: string | null): boolean => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return false;
  return getAuthorizedEmails().includes(normalizedEmail);
};
