import React, { useState } from 'react';
import {
  SAMPLE_CREATOR_PROFILES,
  CreatorVaultProfile,
  VaultArchiveItem,
  formatShortSha,
  calculateTotalRecords,
} from '../../utils/vaultData';
import { Logo } from '../Logo';
import {
  ShieldCheck,
  Clock,
  RefreshCw,
  Download,
  Lock,
  ExternalLink,
  CheckCircle2,
  FileText,
  Database,
  Globe,
  AlertTriangle,
  Copy,
  Check,
} from 'lucide-react';

interface CreatorVaultProps {
  onBackToLanding: () => void;
}

export const CreatorVault: React.FC<CreatorVaultProps> = ({ onBackToLanding }) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>('fit-2026');
  const [profile, setProfile] = useState<CreatorVaultProfile>(SAMPLE_CREATOR_PROFILES[0]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncProgressStep, setSyncProgressStep] = useState<string>('');
  const [copiedSha, setCopiedSha] = useState<string | null>(null);
  const [activeModalArchive, setActiveModalArchive] = useState<VaultArchiveItem | null>(null);
  const [showRestoreModal, setShowRestoreModal] = useState<boolean>(false);
  const [showDrillCertModal, setShowDrillCertModal] = useState<boolean>(false);

  // Switch creator profile
  const handleSelectProfile = (id: string) => {
    setSelectedProfileId(id);
    const p = SAMPLE_CREATOR_PROFILES.find((item) => item.creatorId === id) || SAMPLE_CREATOR_PROFILES[0];
    setProfile(p);
  };

  // Simulate on-demand backup sync
  const handleTriggerSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncProgressStep('Connecting to creator APIs...');

    setTimeout(() => {
      setSyncProgressStep('Encrypting metadata stream via AES-256-GCM...');
    }, 800);

    setTimeout(() => {
      setSyncProgressStep('Computing SHA-256 cryptographic checksums...');
    }, 1600);

    setTimeout(() => {
      // Update profile with "Just now" timestamps
      const updatedArchives = profile.archives.map((a) => ({
        ...a,
        lastBackupTimestamp: 'Just now (0.2s ago)',
        status: 'synced' as const,
      }));

      setProfile({
        ...profile,
        lastOverallBackup: 'Just now',
        archives: updatedArchives,
      });

      setIsSyncing(false);
      setSyncProgressStep('');
    }, 2400);
  };

  const handleCopyChecksum = (sha: string) => {
    navigator.clipboard?.writeText(sha);
    setCopiedSha(sha);
    setTimeout(() => setCopiedSha(null), 2000);
  };

  const totalRecords = calculateTotalRecords(profile);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#16211B] flex flex-col font-body selection:bg-[#0E7A45]/20 selection:text-[#16211B]">
      {/* 1. Vault Dedicated Header */}
      <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#E3E1DA]">
        <div className="content-container min-h-[64px] sm:h-[72px] py-2 sm:py-0 flex items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={onBackToLanding}
              className="flex items-center text-inherit no-underline shrink-0 group cursor-pointer focus-visible:outline-none"
              aria-label="Return to BackupCreator Home"
            >
              <Logo size={22} className="scale-95 sm:scale-100 origin-left transition-transform duration-200 group-hover:scale-105" />
            </button>

            <span className="text-[#E3E1DA] select-none hidden sm:inline" aria-hidden="true">
              /
            </span>

            <div className="hidden sm:flex items-center gap-2 text-[14px]">
              <span className="font-semibold text-[#16211B]">Disaster Recovery Vault</span>
              <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-[#0E7A45] text-white rounded-[4px]">
                LIVE MONITOR
              </span>
            </div>
          </div>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Creator selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="creator-select" className="text-xs font-mono text-[#5C665F] hidden md:inline">
                ACCOUNT:
              </label>
              <select
                id="creator-select"
                value={selectedProfileId}
                onChange={(e) => handleSelectProfile(e.target.value)}
                className="px-2.5 py-1.5 bg-[#FFFFFF] border border-[#E3E1DA] rounded-[6px] text-xs font-semibold text-[#16211B] focus:outline-none focus:border-[#16211B] cursor-pointer"
              >
                {SAMPLE_CREATOR_PROFILES.map((p) => (
                  <option key={p.creatorId} value={p.creatorId}>
                    {p.handle} ({p.niche})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={onBackToLanding}
              className="btn-secondary !text-[12px] sm:!text-[13px] !py-1.5 sm:!py-2 !px-3 sm:!px-4 shrink-0"
            >
              Exit Vault
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Vault Dashboard Content */}
      <main className="flex-1 content-container py-8 md:py-12">
        {/* Profile Status Banner */}
        <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-6 md:p-8 mb-8 taste-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E3E1DA]">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <h1 className="heading-h2 text-[#16211B] tracking-tight">
                  {profile.name} <span className="text-[#5C665F] font-normal text-xl">({profile.handle})</span>
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#0E7A45]/10 text-[#0E7A45] border border-[#0E7A45]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E7A45] animate-pulse" />
                  {profile.vaultStatus}
                </span>
              </div>
              <p className="text-[15px] text-[#5C665F]">
                {profile.niche} · {profile.followerCount} audience · Est. ${profile.monthlyRevenue.toLocaleString()}/mo revenue
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleTriggerSync}
                disabled={isSyncing}
                className={`btn-secondary !py-2 !px-3.5 text-xs font-medium flex items-center gap-2 ${
                  isSyncing ? 'opacity-70 cursor-wait' : ''
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#0E7A45]' : ''}`} />
                <span>{isSyncing ? 'Running Snapshot...' : 'Run Instant Backup'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowRestoreModal(true)}
                className="btn-primary !py-2 !px-3.5 text-xs font-semibold flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Restore Package</span>
              </button>
            </div>
          </div>

          {/* Sync progress indicator if active */}
          {isSyncing && (
            <div className="mt-4 p-3 bg-[#FAFAF7] border border-[#E3E1DA] rounded-[6px] flex items-center gap-3 text-xs font-mono text-[#16211B] animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-[#0E7A45]" />
              <span>{syncProgressStep}</span>
            </div>
          )}

          {/* KPI Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-6">
            <div className="p-4 bg-[#FAFAF7] border border-[#E3E1DA] rounded-[6px]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5C665F] uppercase mb-1">
                <Database className="w-3.5 h-3.5 text-[#0E7A45]" />
                <span>Encrypted Assets</span>
              </div>
              <div className="text-xl md:text-2xl font-bold font-heading text-[#16211B]">
                {totalRecords.toLocaleString()}
              </div>
              <div className="text-[12px] text-[#5C665F] mt-0.5">
                4 verified archive lanes
              </div>
            </div>

            <div className="p-4 bg-[#FAFAF7] border border-[#E3E1DA] rounded-[6px]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5C665F] uppercase mb-1">
                <Clock className="w-3.5 h-3.5 text-[#0E7A45]" />
                <span>Last Snapshot</span>
              </div>
              <div className="text-xl md:text-2xl font-bold font-heading text-[#16211B]">
                {profile.lastOverallBackup}
              </div>
              <div className="text-[12px] text-[#5C665F] mt-0.5">
                Automated daily schedule
              </div>
            </div>

            <div className="p-4 bg-[#FAFAF7] border border-[#E3E1DA] rounded-[6px]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5C665F] uppercase mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0E7A45]" />
                <span>Certified RTO</span>
              </div>
              <div className="text-xl md:text-2xl font-bold font-heading text-[#0E7A45]">
                {profile.lastDrillRtoHours}h
              </div>
              <div className="text-[12px] text-[#5C665F] mt-0.5">
                Target: under {profile.rtoTargetHours} hours
              </div>
            </div>

            <div className="p-4 bg-[#FAFAF7] border border-[#E3E1DA] rounded-[6px]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5C665F] uppercase mb-1">
                <Globe className="w-3.5 h-3.5 text-[#0E7A45]" />
                <span>Standby Mirror</span>
              </div>
              <div className="text-[15px] font-bold font-mono text-[#16211B] truncate">
                {profile.standbyDomain}
              </div>
              <div className="text-[12px] text-[#0E7A45] font-semibold mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E7A45]" />
                DNS Failover Armed
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="heading-h3 text-[#16211B]">
              Active Encrypted Archive Lanes
            </h2>
            <p className="text-sm text-[#5C665F]">
              Cryptographically sealed with AES-256-GCM. Creator holds master offline restore token.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowDrillCertModal(true)}
            className="text-xs font-mono font-semibold text-[#0E7A45] hover:underline flex items-center gap-1"
          >
            <span>VIEW Q2 DRILL CERTIFICATE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3. Archives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {profile.archives.map((archive) => (
            <div
              key={archive.id}
              className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-6 flex flex-col justify-between taste-card group"
            >
              <div>
                {/* Archive Card Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[6px] bg-[#FAFAF7] border border-[#E3E1DA] flex items-center justify-center text-[#16211B]">
                      {archive.category === 'content' && <FileText className="w-4 h-4" />}
                      {archive.category === 'contracts' && <Lock className="w-4 h-4" />}
                      {archive.category === 'audience' && <Database className="w-4 h-4" />}
                      {archive.category === 'standby' && <Globe className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-[17px] text-[#16211B] leading-tight">
                        {archive.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {archive.platforms.map((p) => (
                          <span
                            key={p}
                            className="px-1.5 py-0.5 bg-[#FAFAF7] border border-[#E3E1DA] rounded text-[10px] font-mono text-[#5C665F]"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#0E7A45]/10 text-[#0E7A45] border border-[#0E7A45]/20 shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{archive.status.toUpperCase()}</span>
                  </span>
                </div>

                <p className="text-[13px] text-[#5C665F] leading-relaxed mb-5">
                  {archive.recoveryRole}
                </p>

                {/* Technical Ledger details */}
                <div className="bg-[#FAFAF7] border border-[#E3E1DA] rounded-[6px] p-3 space-y-2 font-mono text-xs mb-4">
                  <div className="flex items-center justify-between text-[#5C665F]">
                    <span>LAST BACKUP TIMESTAMP</span>
                    <span className="text-[#16211B] font-semibold">{archive.lastBackupTimestamp}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#5C665F]">
                    <span>CIPHER & VOLUME</span>
                    <span className="text-[#16211B]">
                      {archive.encryptionCipher} · {archive.recordCount.toLocaleString()} items ({archive.sizeFormatted})
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#5C665F] pt-1 border-t border-[#E3E1DA]">
                    <span>SHA-256 CHECKSUM</span>
                    <div className="flex items-center gap-1.5 text-[#16211B]">
                      <span className="text-[11px]">{formatShortSha(archive.checksumSha256)}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyChecksum(archive.checksumSha256)}
                        title="Copy full SHA-256 checksum"
                        className="text-[#5C665F] hover:text-[#16211B] p-0.5 rounded cursor-pointer"
                        aria-label={`Copy SHA-256 for ${archive.name}`}
                      >
                        {copiedSha === archive.checksumSha256 ? (
                          <Check className="w-3 h-3 text-[#0E7A45]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#E3E1DA] flex items-center justify-between text-xs">
                <span className="text-[#5C665F] font-mono text-[11px]">
                  Encrypted locally before transmission
                </span>
                <button
                  type="button"
                  onClick={() => setActiveModalArchive(archive)}
                  className="font-medium text-[#16211B] hover:text-[#0E7A45] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Inspect Manifest</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Quarterly Drill Status Callout */}
        <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-[#FAFAF7] border border-[#E3E1DA] text-[#5C665F] mb-2">
              <Clock className="w-3 h-3 text-[#0E7A45]" />
              <span>NEXT AUDIT DRILL: IN 18 DAYS</span>
            </div>
            <h3 className="heading-h3 text-[#16211B] mb-1">
              Quarterly Disaster Drill Protocol
            </h3>
            <p className="text-sm text-[#5C665F] leading-relaxed">
              Every 90 days, we run an end-to-end recovery drill: simulating an emergency DNS shift, staging the encrypted records on an alternate domain, and generating an official certified RTO report for your agency and brand sponsors.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowDrillCertModal(true)}
            className="btn-secondary text-xs shrink-0 whitespace-nowrap"
          >
            Review Last Drill Certificate
          </button>
        </div>
      </main>

      {/* 5. Modal: Archive Manifest Inspector */}
      {activeModalArchive && (
        <div className="fixed inset-0 z-50 bg-[#16211B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] max-w-xl w-full p-6 animate-dialog-enter shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3E1DA] mb-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#5C665F] block">
                  CRYPTOGRAPHIC ARCHIVE INSPECTOR
                </span>
                <h3 className="font-heading font-semibold text-lg text-[#16211B]">
                  {activeModalArchive.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalArchive(null)}
                className="text-gray-400 hover:text-[#16211B] text-xl font-bold cursor-pointer"
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono mb-6">
              <div className="bg-[#FAFAF7] p-3 rounded-[6px] border border-[#E3E1DA] space-y-1.5">
                <div className="text-[#5C665F]">FULL SHA-256 HASH:</div>
                <div className="text-[#16211B] break-all select-all font-bold">
                  {activeModalArchive.checksumSha256}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#FAFAF7] rounded-[6px] border border-[#E3E1DA]">
                  <span className="text-[#5C665F] block text-[10px]">RECORD COUNT</span>
                  <span className="text-[#16211B] font-bold text-sm">
                    {activeModalArchive.recordCount.toLocaleString()} items
                  </span>
                </div>
                <div className="p-3 bg-[#FAFAF7] rounded-[6px] border border-[#E3E1DA]">
                  <span className="text-[#5C665F] block text-[10px]">COMPRESSED SIZE</span>
                  <span className="text-[#16211B] font-bold text-sm">
                    {activeModalArchive.sizeFormatted}
                  </span>
                </div>
              </div>

              <div className="border border-[#E3E1DA] rounded-[6px] overflow-hidden">
                <div className="bg-[#FAFAF7] px-3 py-1.5 border-b border-[#E3E1DA] font-semibold text-[#16211B]">
                  SAMPLE ARCHIVE MANIFEST MANIFEST.JSON.ENC
                </div>
                <div className="p-3 bg-white text-[11px] text-[#5C665F] space-y-1 font-mono">
                  <p>• 2026-11-10_captions_catalog.aes (encrypted JSON)</p>
                  <p>• 2026-11-10_sound_and_media_hashes.aes (SHA-256 proofs)</p>
                  <p>• 2026-11-10_audience_metadata.aes (portable CSV)</p>
                  <p>• signature_ed25519.sig (verified creator signature)</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => handleCopyChecksum(activeModalArchive.checksumSha256)}
                className="btn-secondary !py-2 !px-4 text-xs"
              >
                {copiedSha === activeModalArchive.checksumSha256 ? 'Checksum Copied!' : 'Copy SHA-256'}
              </button>
              <button
                type="button"
                onClick={() => setActiveModalArchive(null)}
                className="btn-primary !py-2 !px-4 text-xs font-semibold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal: Export Restore Package */}
      {showRestoreModal && (
        <div className="fixed inset-0 z-50 bg-[#16211B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] max-w-lg w-full p-6 animate-dialog-enter shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E1DA] mb-4">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-[#0E7A45]" />
                <h3 className="font-heading font-semibold text-lg text-[#16211B]">
                  Disaster Restore Package
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRestoreModal(false)}
                className="text-gray-400 hover:text-[#16211B] text-xl font-bold cursor-pointer"
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>

            <p className="text-sm text-[#5C665F] mb-4 leading-relaxed">
              Your restore package is a self-contained, portable tarball containing your encrypted post captions, sponsor contracts, and member list. It can be decrypted using your offline private key to migrate to any new handle or standby domain.
            </p>

            <div className="bg-[#FAFAF7] border border-[#E3E1DA] rounded-[6px] p-3 text-xs font-mono space-y-2 mb-5">
              <div className="flex justify-between text-[#5C665F]">
                <span>ARCHIVE ID:</span>
                <span className="text-[#16211B] font-bold">BC-RESTORE-{profile.handle.replace('@', '').toUpperCase()}-2026</span>
              </div>
              <div className="flex justify-between text-[#5C665F]">
                <span>TARGET RTO:</span>
                <span className="text-[#0E7A45] font-bold">&lt; 4 Hours Guaranteed</span>
              </div>
              <div className="flex justify-between text-[#5C665F]">
                <span>TOTAL ASSETS:</span>
                <span className="text-[#16211B]">{totalRecords.toLocaleString()} encrypted items</span>
              </div>
            </div>

            <div className="p-3 bg-[#0E7A45]/5 border border-[#0E7A45]/20 rounded-[6px] text-xs text-[#16211B] mb-5">
              <span className="font-semibold block mb-0.5">Honest Limit Reminder:</span>
              Followers, algorithmic reach, and platform handles cannot be restored by any vendor. This package restores your business contracts, member communications, and revenue continuity.
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRestoreModal(false)}
                className="btn-secondary !py-2 !px-4 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Restore package manifest prepared for ${profile.handle}. Cryptographic bundle verified.`);
                  setShowRestoreModal(false);
                }}
                className="btn-primary !py-2 !px-4 text-xs font-semibold"
              >
                Download Manifest (.bc-pkg)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Modal: Drill Certificate */}
      {showDrillCertModal && (
        <div className="fixed inset-0 z-50 bg-[#16211B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border-2 border-[#0E7A45] rounded-[8px] max-w-lg w-full p-7 animate-dialog-enter shadow-xl">
            <div className="text-center pb-4 border-b border-[#E3E1DA] mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0E7A45]/10 text-[#0E7A45] rounded-full text-xs font-mono font-bold uppercase mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>OFFICIAL RECOVERY READINESS CERTIFICATE</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#16211B]">
                Quarterly Drill Compliance
              </h3>
              <p className="text-xs text-[#5C665F] font-mono mt-1">
                CERTIFICATE ID: BC-2026-Q2-{profile.handle.replace('@', '').toUpperCase()}
              </p>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[#16211B] mb-6">
              <p>
                This certifies that on <strong>April 18, 2026</strong>, an unannounced disaster simulation was executed for account <strong>{profile.handle}</strong>.
              </p>
              <div className="bg-[#FAFAF7] p-3 rounded border border-[#E3E1DA] font-mono space-y-1">
                <div className="flex justify-between">
                  <span>DNS Failover Test:</span>
                  <span className="font-bold text-[#0E7A45]">PASSED (18m)</span>
                </div>
                <div className="flex justify-between">
                  <span>Sponsor Contract Manifest:</span>
                  <span className="font-bold text-[#0E7A45]">VERIFIED (12 of 12)</span>
                </div>
                <div className="flex justify-between">
                  <span>Patron Communication Relay:</span>
                  <span className="font-bold text-[#0E7A45]">ARMED (&lt; 1 hour)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E3E1DA]">
                  <span>Total Measured RTO:</span>
                  <span className="font-bold text-[#0E7A45]">2h 45m (Target: 4h)</span>
                </div>
              </div>
              <p className="text-[#5C665F] text-[11px]">
                Valid for presentation to creator management agencies, brand sponsorship legal teams, and creator insurance underwriters.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowDrillCertModal(false)}
                className="btn-primary !py-2 !px-5 text-xs font-semibold"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
