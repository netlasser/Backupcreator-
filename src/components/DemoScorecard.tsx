import React from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';

interface DemoScorecardProps {
  onCaptureSuccess?: () => void;
}

export const DemoScorecard: React.FC<DemoScorecardProps> = ({ onCaptureSuccess }) => {
  return (
    <section className="bg-[#FFFFFF] section-spacing border-y border-[#E3E1DA]">
      <div className="content-container flex flex-col items-center">
        {/* Intro line verbatim */}
        <p className="text-body font-medium text-[#16211B] text-center mb-8">
          Here's a real scorecard — this is what readiness looks like on paper.
        </p>

        {/* Two-panel report card: single bordered card, max 880px wide, centered */}
        <div className="w-full max-w-[880px] bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] overflow-hidden mb-12">
          {/* Header Bar */}
          <div className="bg-[#FAFAF7] border-b border-[#E3E1DA] px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-small text-[#5C665F]">
            <span className="font-mono text-[12px] uppercase tracking-wider font-semibold text-[#16211B]">
              READINESS AUDIT ARCHIVE · CASE #2026-FIT-09
            </span>
            <span className="font-mono text-[12px]">
              CONFIDENTIAL · FOR CLIENT RECORDS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#E3E1DA]">
            {/* Left panel: What she told us (intake summary) */}
            <div className="md:col-span-4 p-6 md:p-7 bg-[#FAFAF7]/50 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[12px] uppercase font-bold text-[#5C665F] tracking-wider mb-4">
                  What she told us
                </p>
                <div className="text-[14px] text-[#16211B] space-y-3 leading-[1.55]">
                  <p className="font-semibold text-[15px]">
                    Fitness creator · 118K Instagram followers
                  </p>
                  <p>
                    <span className="text-[#5C665F]">Monthly revenue:</span> $14,200/mo
                  </p>
                  <div className="pl-3 border-l-2 border-[#E3E1DA] space-y-1 text-[#5C665F] text-[13px]">
                    <p>• 60% sponsorships (3 active deals, negotiated in DMs)</p>
                    <p>• 30% Patreon memberships</p>
                    <p>• 10% preset sales</p>
                  </div>
                  <p>
                    <span className="text-[#5C665F]">Email list:</span> none
                  </p>
                  <p>
                    <span className="text-[#5C665F]">Backup today:</span> camera roll only
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E3E1DA] text-[12px] text-[#5C665F]">
                Intake verified via public profile & export questionnaire
              </div>
            </div>

            {/* Right panel: the report */}
            <div className="md:col-span-8 p-6 md:p-8 space-y-6">
              {/* Score and exposure banner */}
              <div className="border border-[#E3E1DA] rounded-[8px] p-5 bg-[#FAFAF7]">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <span className="font-mono text-[12px] uppercase tracking-wider font-semibold text-[#5C665F]">
                    READINESS SCORE
                  </span>
                  <span className="font-mono text-[13px] font-bold text-[#B91C1C] uppercase tracking-wider">
                    CRITICAL EXPOSURE
                  </span>
                </div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-heading font-bold text-[36px] text-[#0E7A45] leading-none">
                    24 / 100
                  </span>
                </div>
                <p className="text-[15px] font-semibold text-[#16211B]">
                  Revenue dark on day one of a ban: <span className="text-[#0E7A45] font-bold">$12,780/mo</span>
                </p>
              </div>

              {/* Ranked Gaps */}
              <div>
                <p className="font-mono text-[12px] uppercase font-bold text-[#5C665F] tracking-wider mb-3">
                  RANKED GAPS
                </p>
                <div className="space-y-3.5 text-[14px]">
                  <div className="border-l-2 border-[#16211B] pl-3.5">
                    <p className="font-semibold text-[#16211B] mb-0.5">
                      1. 118K followers, zero reachable off-platform.
                    </p>
                    <p className="text-[#5C665F] leading-snug">
                      If the account dies today, you can contact 0 people. <span className="text-[#16211B] font-medium">Fix:</span> standby site + owned contact capture. <span className="text-[#16211B] font-medium">Protects:</span> everything.
                    </p>
                  </div>

                  <div className="border-l-2 border-[#16211B] pl-3.5">
                    <p className="font-semibold text-[#16211B] mb-0.5">
                      2. 3 sponsor contracts live only in Instagram DMs ($8,520/mo).
                    </p>
                    <p className="text-[#5C665F] leading-snug">
                      No off-platform record exists for appeals or invoicing. <span className="text-[#16211B] font-medium">Fix:</span> archive contracts + payment terms to the vault.
                    </p>
                  </div>

                  <div className="border-l-2 border-[#16211B] pl-3.5">
                    <p className="font-semibold text-[#16211B] mb-0.5">
                      3. Patreon member list never exported ($4,260/mo).
                    </p>
                    <p className="text-[#5C665F] leading-snug">
                      One CSV export, archived monthly, protects it. <span className="text-[#16211B] font-medium">Effort:</span> 10 minutes.
                    </p>
                  </div>

                  <div className="border-l-2 border-[#16211B] pl-3.5">
                    <p className="font-semibold text-[#16211B] mb-0.5">
                      4. Content archive = camera roll.
                    </p>
                    <p className="text-[#5C665F] leading-snug">
                      No captions, no analytics, no posting history — nothing to prove ownership in an appeal.
                    </p>
                  </div>
                </div>
              </div>

              {/* What we cannot restore */}
              <div className="p-4 bg-[#FAFAF7] border border-[#E3E1DA] rounded-[8px] text-[13px] text-[#5C665F] leading-relaxed">
                <span className="font-semibold text-[#16211B] uppercase tracking-wide font-mono text-[11px] block mb-1">
                  WHAT WE CANNOT RESTORE
                </span>
                your followers, your algorithmic reach, or the account itself. No one can. Anyone who promises that is selling you something.
              </div>

              {/* Drill target after setup */}
              <div className="pt-2 text-[13px] text-[#16211B] border-t border-[#E3E1DA]">
                <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#5C665F] block mb-1">
                  DRILL TARGET AFTER SETUP
                </span>
                <span className="font-medium text-[#16211B]">
                  standby site live in 48 hours · members notified in 1 hour · sponsors contacted with records in 24 hours.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Email capture form directly below worked-example scorecard */}
        <div className="w-full max-w-[880px] flex flex-col items-center text-center">
          <p className="text-body font-semibold text-[#16211B] mb-2">
            Get your own Recovery Readiness Audit
          </p>
          <EmailCaptureForm
            source="scorecard"
            showOfferLabel={true}
            onSuccess={onCaptureSuccess}
            className="flex flex-col items-center"
          />
        </div>
      </div>
    </section>
  );
};
