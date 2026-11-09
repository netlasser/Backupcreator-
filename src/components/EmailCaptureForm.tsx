import React, { useState } from 'react';
import { processLeadSubmission } from '../utils/leadValidation';
import { saveLeadToFirestore } from '../utils/firebaseLeads';

interface EmailCaptureFormProps {
  source: string;
  tierName?: string;
  showOfferLabel?: boolean;
  className?: string;
  onSuccess?: () => void;
}

export const EmailCaptureForm: React.FC<EmailCaptureFormProps> = ({
  source,
  tierName,
  showOfferLabel = false,
  className = '',
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const validation = processLeadSubmission({
      email,
      source,
      tier: tierName,
      honeypot,
    });

    if (validation.isSpam) {
      // Silently mimic success to spam bots without storing
      setStatus('success');
      return;
    }

    if (!validation.isValid || !validation.sanitizedEmail) {
      setStatus('error');
      setErrorMessage(validation.error || 'Please enter a valid email.');
      return;
    }

    try {
      setStatus('submitting');
      await saveLeadToFirestore({
        email: validation.sanitizedEmail,
        source,
        tier: tierName || null,
        timestamp: new Date().toISOString(),
      });
      setStatus('success');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Failed to submit email:', err);
      // Even if network/offline occurs, preserve lead in local storage backup
      try {
        const stored = JSON.parse(localStorage.getItem('backupcreator_leads_offline') || '[]');
        stored.push({
          email: validation.sanitizedEmail,
          source,
          tier: tierName || null,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem('backupcreator_leads_offline', JSON.stringify(stored));
      } catch (e) {
        // ignore
      }
      // Show success as graceful capture
      setStatus('success');
      if (onSuccess) onSuccess();
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-6 text-left max-w-[620px]">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-[#0E7A45] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
            ✓
          </div>
          <div>
            <p className="font-heading font-semibold text-[17px] text-[#16211B] mb-1">
              You're on the founding list.
            </p>
            <p className="text-[#5C665F] text-[15px] leading-[1.6]">
              Within 48 hours you'll get a short email from the founder confirming your free audit slot and asking one question: which platform is your business most exposed on?
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-[620px] ${className}`}>
      {showOfferLabel && (
        <p className="text-small text-[#5C665F] mb-3">
          <span className="font-semibold text-[#16211B]">Founding offer:</span> Founding-user early access plus the full Recovery Readiness Audit — normally the $1,500 setup — free when we launch.
        </p>
      )}

      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Honeypot field - visually hidden */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor={`hp_${source}`}>Do not fill this</label>
            <input
              id={`hp_${source}`}
              type="text"
              name="important_field"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex-1 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourstudio.com"
              required
              aria-label="Email address"
              className="w-full h-[48px] px-4 bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] text-[16px] text-[#16211B] placeholder-[#5C665F]/60 focus:outline-none focus:border-[#16211B] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary h-[48px] whitespace-nowrap px-6 shrink-0 inline-flex items-center gap-2"
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span>Reserving slot...</span>
              </>
            ) : (
              'Get my free readiness audit'
            )}
          </button>
        </div>

        {errorMessage && (
          <p className="text-[#B91C1C] text-[14px] mt-2 text-left" role="alert">
            {errorMessage}
          </p>
        )}

        <p className="text-small text-[#5C665F] mt-2.5 text-left">
          No spam, no list-selling. One email when your audit slot opens.
        </p>
      </form>
    </div>
  );
};
