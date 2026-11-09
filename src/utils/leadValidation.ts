/**
 * Validation and payload sanitization for BackupCreator leads.
 */

export interface LeadSubmission {
  email: string;
  source: string;
  tier?: string;
  honeypot?: string;
}

export interface ValidationResult {
  isValid: boolean;
  isSpam: boolean;
  sanitizedEmail?: string;
  error?: string;
}

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim().toLowerCase();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  // RFC 5322 compliant simplified check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

export function processLeadSubmission(payload: LeadSubmission): ValidationResult {
  // Silent drop for bots filling hidden honeypot
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return {
      isValid: false,
      isSpam: true,
      error: 'Spam detected',
    };
  }

  const cleanEmail = (payload.email || '').trim().toLowerCase();
  if (!cleanEmail) {
    return {
      isValid: false,
      isSpam: false,
      error: 'Please enter your email address.',
    };
  }

  if (!validateEmail(cleanEmail)) {
    return {
      isValid: false,
      isSpam: false,
      error: 'Please enter a valid email address (e.g., you@yourstudio.com).',
    };
  }

  return {
    isValid: true,
    isSpam: false,
    sanitizedEmail: cleanEmail,
  };
}
