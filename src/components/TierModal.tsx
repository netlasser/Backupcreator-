import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { EmailCaptureForm } from './EmailCaptureForm';

interface TierModalProps {
  isOpen: boolean;
  tierName: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const TierModal: React.FC<TierModalProps> = ({
  isOpen,
  tierName,
  onClose,
  onSuccess,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !tierName) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#16211B]/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-[540px] bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-7 md:p-8 relative text-left animate-dialog-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#5C665F] hover:text-[#16211B] p-1.5 rounded-[6px] border border-transparent hover:border-[#E3E1DA] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <span className="font-mono text-[12px] uppercase tracking-wider font-semibold text-[#5C665F] block mb-2">
          RESERVE TIER · FOUNDING ACCESS
        </span>

        <h3 id="modal-title" className="heading-h3 text-[#16211B] mb-2">
          {tierName} Plan
        </h3>

        <p className="text-[15px] text-[#5C665F] mb-6 leading-relaxed">
          Founding-user early access plus the full Recovery Readiness Audit — normally the $1,500 setup — free when we launch. Enter your email to reserve your spot.
        </p>

        <EmailCaptureForm
          source={`pricing_${tierName.toLowerCase().replace(/\s+/g, '_')}`}
          tierName={tierName}
          onSuccess={() => {
            setTimeout(() => {
              onSuccess();
            }, 1200);
          }}
        />
      </div>
    </div>
  );
};
