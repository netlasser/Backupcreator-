import React from 'react';
import { Logo } from './Logo';

interface NavProps {
  onCtaClick: () => void;
  onOpenVault?: () => void;
}

export const Nav: React.FC<NavProps> = ({ onCtaClick, onOpenVault }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#E3E1DA]">
      <div className="content-container min-h-[64px] sm:h-[72px] py-2 sm:py-0 flex items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#" className="flex items-center text-inherit no-underline shrink-0 group" aria-label="BackupCreator home">
          <Logo size={22} className="scale-95 sm:scale-100 origin-left transition-transform duration-200 group-hover:scale-105" />
        </a>

        {/* Center Live Indicator - subtle system status */}
        <div className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFFFF] border border-[#E3E1DA] rounded-[6px] text-[11px] font-mono text-[#5C665F] whitespace-nowrap shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0E7A45] animate-pulse shrink-0" aria-hidden="true" />
          <span>STANDBY DNS PROTOCOL ACTIVE · RTO &lt; 4H</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <nav className="hidden md:flex items-center gap-5 text-[14px] font-medium text-[#16211B]" aria-label="Main Navigation">
            <a href="#scorecard" className="hover:text-[#0E7A45] transition-colors py-1">
              Readiness Scorecard
            </a>
            <span className="text-[#E3E1DA] select-none" aria-hidden="true">/</span>
            <a href="#how-it-works" className="hover:text-[#0E7A45] transition-colors py-1">
              How it works
            </a>
            <span className="text-[#E3E1DA] select-none" aria-hidden="true">/</span>
            <a href="#pricing" className="hover:text-[#0E7A45] transition-colors py-1">
              Pricing
            </a>
            <span className="text-[#E3E1DA] select-none" aria-hidden="true">/</span>
            <a
              href="#/vault"
              onClick={(e) => {
                if (onOpenVault) {
                  e.preventDefault();
                  onOpenVault();
                }
              }}
              className="hover:text-[#0E7A45] transition-colors py-1 flex items-center gap-1.5 font-semibold text-[#16211B]"
            >
              <span>Creator Vault</span>
              <span className="px-1.5 py-0.5 bg-[#0E7A45]/10 text-[#0E7A45] text-[10px] font-mono rounded font-bold border border-[#0E7A45]/20">
                LIVE
              </span>
            </a>
          </nav>

          {/* Quick vault access button for mobile / tablet */}
          <button
            type="button"
            onClick={onOpenVault}
            className="md:hidden text-xs font-semibold px-2.5 py-1.5 border border-[#E3E1DA] rounded-[6px] text-[#16211B] bg-white hover:border-[#16211B] flex items-center gap-1"
          >
            <span>Vault</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E7A45]" />
          </button>

          <button
            type="button"
            onClick={onCtaClick}
            className="btn-primary !text-[12px] sm:!text-[14px] !py-2 sm:!py-2.5 !px-3 sm:!px-5 shrink-0 text-center leading-normal whitespace-nowrap active:scale-[0.98]"
          >
            Get my free readiness audit
          </button>
        </div>
      </div>
    </header>
  );
};

