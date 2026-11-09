import React from 'react';
import { Logo } from '../Logo';

interface AdminHeaderProps {
  userEmail: string | null;
  onSignOut: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ userEmail, onSignOut }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-xs border-b border-[#E3E1DA]">
      <div className="max-w-[780px] mx-auto px-4 h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={22} />
          <span className="text-[#E3E1DA] select-none" aria-hidden="true">/</span>
          <span className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#5C665F]">
            Launch HQ
          </span>
        </div>

        <div className="flex items-center gap-4 text-[13px]">
          <span className="text-[#5C665F] hidden sm:inline font-mono">
            {userEmail}
          </span>
          <button
            type="button"
            onClick={onSignOut}
            className="text-[#16211B] hover:text-[#5C665F] font-medium transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};
