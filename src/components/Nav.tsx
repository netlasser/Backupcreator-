import React from 'react';
import { Logo } from './Logo';

interface NavProps {
  onCtaClick: () => void;
}

export const Nav: React.FC<NavProps> = ({ onCtaClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-xs border-b border-[#E3E1DA]">
      <div className="content-container min-h-[64px] sm:h-[72px] py-2 sm:py-0 flex items-center justify-between gap-2 px-4 sm:px-6">
        <a href="#" className="flex items-center text-inherit no-underline shrink-0" aria-label="BackupCreator home">
          <Logo size={22} className="scale-95 sm:scale-100 origin-left" />
        </a>

        <div className="flex items-center gap-4 sm:gap-8 shrink-0">
          <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-[#16211B]" aria-label="Main Navigation">
            <a href="#how-it-works" className="hover:text-[#5C665F] transition-colors">
              How it works
            </a>
            <span className="text-[#E3E1DA] select-none" aria-hidden="true">·</span>
            <a href="#pricing" className="hover:text-[#5C665F] transition-colors">
              Pricing
            </a>
            <span className="text-[#E3E1DA] select-none" aria-hidden="true">·</span>
            <a href="#faq" className="hover:text-[#5C665F] transition-colors">
              FAQ
            </a>
          </nav>

          <button
            type="button"
            onClick={onCtaClick}
            className="btn-primary !text-[11px] sm:!text-[14px] !py-2 sm:!py-2.5 !px-2.5 sm:!px-5 shrink-0 text-center leading-normal whitespace-nowrap"
          >
            Get my free readiness audit
          </button>
        </div>
      </div>
    </header>
  );
};
