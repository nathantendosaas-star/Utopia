/**
 * Security utility for sanitizing user input.
 * Strips HTML tags and trims whitespace to prevent XSS and injection attacks.
 */
export const sanitizeString = (str: unknown): string => {
  if (typeof str !== 'string') return '';
  // Strip HTML tags using regex
  const sanitized = str.replace(/<[^>]*>?/gm, '');
  return sanitized.trim();
};

/**
 * Validates if an email is in the authorized list.
 */
export const isAuthorized = (email: string | null): boolean => {
  if (!email) return false;
  const authorizedEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || [];
  return authorizedEmails.includes(email);
};
