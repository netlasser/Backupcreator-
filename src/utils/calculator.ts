export interface CalculatorInputs {
  primaryPlatform: 'instagram' | 'youtube' | 'tiktok' | 'patreon' | 'multi';
  monthlyRevenue: number;
  backupHabit: 'none' | 'camera_roll' | 'cloud_folders' | 'structured_archives';
  sponsorDealsInDms: boolean;
  hasOwnDomain: boolean;
  hasEmailList: boolean;
}

export interface ReadinessResult {
  score: number; // 0 - 100
  exposureRating: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'DEFENDED';
  revenueAtRisk: number;
  recoveryHoursWithBackup: number;
  unhedgedRecoveryWeeksWithoutBackup: number;
  primaryGaps: string[];
}

export function calculateReadiness(inputs: CalculatorInputs): ReadinessResult {
  let score = 20;

  // Platform exposure factor
  if (inputs.primaryPlatform === 'multi') {
    score += 10;
  }

  // Backup habits
  if (inputs.backupHabit === 'none') {
    score -= 10;
  } else if (inputs.backupHabit === 'camera_roll') {
    score += 5;
  } else if (inputs.backupHabit === 'cloud_folders') {
    score += 20;
  } else if (inputs.backupHabit === 'structured_archives') {
    score += 35;
  }

  // Domain & owned channel
  if (inputs.hasOwnDomain) {
    score += 15;
  }
  if (inputs.hasEmailList) {
    score += 20;
  }

  // Sponsor contracts vulnerability
  if (inputs.sponsorDealsInDms) {
    score -= 15;
  }

  // Clamp score
  score = Math.max(8, Math.min(94, score));

  // Determine exposure rating
  let exposureRating: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'DEFENDED' = 'CRITICAL';
  if (score >= 80) exposureRating = 'DEFENDED';
  else if (score >= 60) exposureRating = 'MODERATE';
  else if (score >= 40) exposureRating = 'HIGH';

  // Calculate unhedged revenue at risk
  // If email list + domain exist, ~40% survives; otherwise 90% is at risk
  const riskFraction = inputs.hasEmailList && inputs.hasOwnDomain ? 0.35 : 0.88;
  const revenueAtRisk = Math.round(inputs.monthlyRevenue * riskFraction);

  const gaps: string[] = [];
  if (!inputs.hasEmailList) {
    gaps.push('Zero off-platform contact list: audience cannot be reached if handle is locked.');
  }
  if (inputs.sponsorDealsInDms) {
    gaps.push('Sponsor agreements live in platform DMs: no independent proof of contracted deliverables.');
  }
  if (!inputs.hasOwnDomain) {
    gaps.push('No independent standby domain: fans see a 404 instead of a verified incident notice.');
  }
  if (inputs.backupHabit === 'camera_roll' || inputs.backupHabit === 'none') {
    gaps.push('Content archive limited to video files: captions, tags, and timestamps are lost.');
  }

  return {
    score,
    exposureRating,
    revenueAtRisk,
    recoveryHoursWithBackup: inputs.primaryPlatform === 'multi' ? 48 : 24,
    unhedgedRecoveryWeeksWithoutBackup: inputs.hasEmailList ? 4 : 12,
    primaryGaps: gaps.slice(0, 3),
  };
}
