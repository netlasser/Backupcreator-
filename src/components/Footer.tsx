import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAFAF7] border-t border-[#E3E1DA] py-16">
      <div className="content-container flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="max-w-[480px]">
          <Logo className="mb-3" />
          <p className="text-[14px] text-[#5C665F] leading-relaxed">
            A hard drive saves your videos; this preserves the business — sponsor contracts, member lists, a standby site, and a drill-tested plan to be live again in 48 hours.
          </p>
        </div>

        <div className="flex flex-col md:items-end text-[13px] text-[#5C665F] gap-2">
          <p>© {new Date().getFullYear()} BackupCreator. All rights reserved.</p>
          <p>
            Documented recovery readiness · Encrypted creator vaults · Zero credentials requested
          </p>
        </div>
      </div>
    </footer>
  );
};
