import React, { useState } from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';
import { calculateReadiness, CalculatorInputs } from '../utils/calculator';

interface DemoScorecardProps {
  onCaptureSuccess?: () => void;
}

export const DemoScorecard: React.FC<DemoScorecardProps> = ({ onCaptureSuccess }) => {
  const [activeTab, setActiveTab] = useState<'case_study' | 'interactive'>('case_study');

  // Interactive calculator state
  const [calcInputs, setCalcInputs] = useState<CalculatorInputs>({
    primaryPlatform: 'instagram',
    monthlyRevenue: 14000,
    backupHabit: 'camera_roll',
    sponsorDealsInDms: true,
    hasOwnDomain: false,
    hasEmailList: false,
  });

  const liveResult = calculateReadiness(calcInputs);

  return (
    <section id="scorecard" className="bg-[#FFFFFF] section-spacing border-y border-[#E3E1DA] scroll-mt-20">
      <div className="content-container flex flex-col items-center">
        {/* Intro line verbatim from brief */}
        <p className="text-body font-medium text-[#16211B] text-center mb-6">
          Here's a real scorecard — this is what readiness looks like on paper.
        </p>

        {/* View Mode Switcher */}
        <div className="inline-flex items-center p-1 bg-[#FAFAF7] border border-[#E3E1DA] rounded-[8px] mb-8 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('case_study')}
            className={`px-4 py-2 rounded-[6px] text-[14px] font-medium transition-all ${
              activeTab === 'case_study'
                ? 'bg-[#FFFFFF] text-[#16211B] shadow-xs font-semibold'
                : 'text-[#5C665F] hover:text-[#16211B]'
            }`}
          >
            Verified Case Study (#2026-FIT-09)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('interactive')}
            className={`px-4 py-2 rounded-[6px] text-[14px] font-medium transition-all flex items-center gap-2 ${
              activeTab === 'interactive'
                ? 'bg-[#FFFFFF] text-[#16211B] shadow-xs font-semibold'
                : 'text-[#5C665F] hover:text-[#16211B]'
            }`}
          >
            <span>Interactive Risk Simulator</span>
            <span className="text-[10px] font-mono uppercase bg-[#0E7A45] text-white px-1.5 py-0.5 rounded font-bold">
              LIVE
            </span>
          </button>
        </div>

        {/* Two-panel report card: single bordered card, max 880px wide, centered */}
        <div className="w-full max-w-[880px] bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] overflow-hidden mb-12 taste-card">
          {/* Header Bar */}
          <div className="bg-[#FAFAF7] border-b border-[#E3E1DA] px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-small text-[#5C665F]">
            <span className="font-mono text-[12px] uppercase tracking-wider font-semibold text-[#16211B]">
              {activeTab === 'case_study'
                ? 'READINESS AUDIT ARCHIVE · CASE #2026-FIT-09'
                : 'CUSTOM EXPOSURE ASSESSMENT ENGINE · V2.4'}
            </span>
            <span className="font-mono text-[12px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0E7A45]" />
              CONFIDENTIAL · FOR CLIENT RECORDS
            </span>
          </div>

          {activeTab === 'case_study' ? (
            /* CASE STUDY VIEW (Verbatim brief data) */
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
          ) : (
            /* INTERACTIVE ESTIMATOR VIEW */
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#E3E1DA]">
              {/* Left panel: Interactive controls */}
              <div className="md:col-span-5 p-6 md:p-7 bg-[#FAFAF7]/60 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[12px] uppercase font-bold text-[#5C665F] tracking-wider mb-5">
                    Your Channel Parameters
                  </p>

                  <div className="space-y-5 text-[14px]">
                    {/* Platform Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-[#5C665F] uppercase tracking-wider mb-2">
                        Primary Platform
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: 'instagram', label: 'Instagram' },
                          { id: 'youtube', label: 'YouTube' },
                          { id: 'tiktok', label: 'TikTok' },
                          { id: 'patreon', label: 'Patreon' },
                          { id: 'multi', label: 'Multi-platform' },
                        ].map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() =>
                              setCalcInputs({
                                ...calcInputs,
                                primaryPlatform: p.id as CalculatorInputs['primaryPlatform'],
                              })
                            }
                            className={`px-2 py-1.5 text-xs font-medium rounded-[6px] border text-center transition-all ${
                              calcInputs.primaryPlatform === p.id
                                ? 'bg-[#16211B] text-white border-[#16211B]'
                                : 'bg-white text-[#16211B] border-[#E3E1DA] hover:border-[#16211B]'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Monthly Revenue */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-semibold text-[#5C665F] uppercase tracking-wider">
                          Monthly Revenue
                        </label>
                        <span className="font-mono font-bold text-[15px] text-[#0E7A45]">
                          ${calcInputs.monthlyRevenue.toLocaleString()}/mo
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5000"
                        max="50000"
                        step="1000"
                        value={calcInputs.monthlyRevenue}
                        onChange={(e) =>
                          setCalcInputs({ ...calcInputs, monthlyRevenue: Number(e.target.value) })
                        }
                        className="w-full accent-[#0E7A45] cursor-pointer"
                        aria-label="Monthly revenue slider"
                      />
                      <div className="flex justify-between text-[11px] font-mono text-[#5C665F] mt-1">
                        <span>$5K/mo</span>
                        <span>$25K/mo</span>
                        <span>$50K+/mo</span>
                      </div>
                    </div>

                    {/* Backup Habit */}
                    <div>
                      <label className="block text-xs font-semibold text-[#5C665F] uppercase tracking-wider mb-2">
                        Current Backup Method
                      </label>
                      <select
                        value={calcInputs.backupHabit}
                        onChange={(e) =>
                          setCalcInputs({
                            ...calcInputs,
                            backupHabit: e.target.value as CalculatorInputs['backupHabit'],
                          })
                        }
                        className="w-full px-3 py-2 bg-white border border-[#E3E1DA] rounded-[6px] text-xs font-medium text-[#16211B] focus:outline-none focus:border-[#16211B]"
                      >
                        <option value="none">No backups at all (0%)</option>
                        <option value="camera_roll">Camera Roll only (No captions/metadata)</option>
                        <option value="cloud_folders">Raw files in Google Drive / Dropbox</option>
                        <option value="structured_archives">Encrypted structured database backup</option>
                      </select>
                    </div>

                    {/* Vulnerability Checkboxes */}
                    <div className="space-y-2 pt-2 border-t border-[#E3E1DA]">
                      <label className="flex items-center gap-2.5 text-xs text-[#16211B] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={calcInputs.sponsorDealsInDms}
                          onChange={(e) =>
                            setCalcInputs({ ...calcInputs, sponsorDealsInDms: e.target.checked })
                          }
                          className="accent-[#0E7A45] w-4 h-4 rounded"
                        />
                        <span>Sponsor deals negotiated or confirmed in DMs</span>
                      </label>

                      <label className="flex items-center gap-2.5 text-xs text-[#16211B] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={calcInputs.hasOwnDomain}
                          onChange={(e) =>
                            setCalcInputs({ ...calcInputs, hasOwnDomain: e.target.checked })
                          }
                          className="accent-[#0E7A45] w-4 h-4 rounded"
                        />
                        <span>I own my independent domain (.com / .me)</span>
                      </label>

                      <label className="flex items-center gap-2.5 text-xs text-[#16211B] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={calcInputs.hasEmailList}
                          onChange={(e) =>
                            setCalcInputs({ ...calcInputs, hasEmailList: e.target.checked })
                          }
                          className="accent-[#0E7A45] w-4 h-4 rounded"
                        />
                        <span>I maintain an off-platform subscriber list</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-[#E3E1DA] text-[11px] font-mono text-[#5C665F]">
                  Algorithm: BackupCreator Actuarial Risk Engine v2.4
                </div>
              </div>

              {/* Right panel: Live Output Diagnostic */}
              <div className="md:col-span-7 p-6 md:p-8 space-y-6">
                <div className="border border-[#E3E1DA] rounded-[8px] p-5 bg-[#FAFAF7]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <span className="font-mono text-[12px] uppercase tracking-wider font-semibold text-[#5C665F]">
                      SIMULATED READINESS SCORE
                    </span>
                    <span
                      className={`font-mono text-[13px] font-bold uppercase tracking-wider ${
                        liveResult.exposureRating === 'CRITICAL'
                          ? 'text-[#B91C1C]'
                          : liveResult.exposureRating === 'HIGH'
                          ? 'text-[#D97706]'
                          : 'text-[#0E7A45]'
                      }`}
                    >
                      {liveResult.exposureRating} RISK
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-heading font-bold text-[36px] text-[#0E7A45] leading-none">
                      {liveResult.score} / 100
                    </span>
                  </div>
                  <p className="text-[15px] font-semibold text-[#16211B]">
                    Immediate unhedged revenue at risk:{' '}
                    <span className="text-[#B91C1C] font-bold">
                      ${liveResult.revenueAtRisk.toLocaleString()}/mo
                    </span>
                  </p>
                </div>

                {/* Identified Gaps */}
                <div>
                  <p className="font-mono text-[12px] uppercase font-bold text-[#5C665F] tracking-wider mb-3">
                    IDENTIFIED VULNERABILITIES
                  </p>
                  <div className="space-y-3 text-[13px]">
                    {liveResult.primaryGaps.map((gap, i) => (
                      <div key={i} className="border-l-2 border-[#16211B] pl-3 py-0.5">
                        <p className="text-[#16211B] font-medium leading-snug">{gap}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison drill banner */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-[#FAFAF7] border border-[#E3E1DA] rounded-[6px]">
                    <span className="text-[11px] font-mono text-[#5C665F] block uppercase">
                      Without Standby Plan
                    </span>
                    <span className="text-[14px] font-bold text-[#B91C1C]">
                      {liveResult.unhedgedRecoveryWeeksWithoutBackup}+ weeks dark
                    </span>
                  </div>
                  <div className="p-3 bg-[#FFFFFF] border border-[#0E7A45]/40 rounded-[6px]">
                    <span className="text-[11px] font-mono text-[#0E7A45] block uppercase font-semibold">
                      With BackupCreator
                    </span>
                    <span className="text-[14px] font-bold text-[#0E7A45]">
                      Under {liveResult.recoveryHoursWithBackup} hours RTO
                    </span>
                  </div>
                </div>

                {/* What we cannot restore notice */}
                <div className="p-3 bg-[#FAFAF7] border border-[#E3E1DA] rounded-[6px] text-[12px] text-[#5C665F]">
                  <strong className="text-[#16211B]">Note:</strong> BackupCreator never claims to restore platform followers or algorithmic standing. We restore your business operations, contracts, and revenue independence.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Email capture form directly below scorecard */}
        <div className="w-full max-w-[880px] flex flex-col items-center text-center">
          <p className="text-body font-semibold text-[#16211B] mb-2">
            Get your own official Recovery Readiness Audit
          </p>
          <EmailCaptureForm
            source="scorecard"
            showOfferLabel={true}
            onSuccess={onCaptureSuccess}
            className="flex flex-col items-center w-full max-w-[540px]"
          />
        </div>
      </div>
    </section>
  );
};
