export interface VaultArchiveItem {
  id: string;
  name: string;
  category: 'content' | 'contracts' | 'audience' | 'standby';
  platformCount: number;
  platforms: string[];
  encryptionCipher: 'AES-256-GCM' | 'ChaCha20-Poly1305';
  status: 'synced' | 'verifying' | 'syncing' | 'warning';
  lastBackupTimestamp: string;
  lastBackupIso: string;
  checksumSha256: string;
  recordCount: number;
  sizeFormatted: string;
  recoveryRole: string;
}

export interface CreatorVaultProfile {
  creatorId: string;
  handle: string;
  name: string;
  niche: string;
  followerCount: string;
  monthlyRevenue: number;
  vaultStatus: 'ENCRYPTED & SYNCED' | 'DRILL DUE' | 'SYNCING';
  lastOverallBackup: string;
  rtoTargetHours: number;
  lastDrillRtoHours: number;
  standbyDomain: string;
  dnsHealth: 'HEALTHY' | 'PROPAGATING' | 'ATTENTION';
  archives: VaultArchiveItem[];
}

export const SAMPLE_CREATOR_PROFILES: CreatorVaultProfile[] = [
  {
    creatorId: 'fit-2026',
    handle: '@sarahfit',
    name: 'Sarah Chen',
    niche: 'Fitness & Nutrition',
    followerCount: '118K',
    monthlyRevenue: 14200,
    vaultStatus: 'ENCRYPTED & SYNCED',
    lastOverallBackup: 'Today, 03:14 AM UTC',
    rtoTargetHours: 4,
    lastDrillRtoHours: 2.75,
    standbyDomain: 'sarahchen-backup.com',
    dnsHealth: 'HEALTHY',
    archives: [
      {
        id: 'arch-content',
        name: 'Video & Post Captions Archive',
        category: 'content',
        platformCount: 3,
        platforms: ['Instagram', 'YouTube', 'TikTok'],
        encryptionCipher: 'AES-256-GCM',
        status: 'synced',
        lastBackupTimestamp: 'Today, 02:45 AM UTC',
        lastBackupIso: '2026-11-10T02:45:00Z',
        checksumSha256: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
        recordCount: 954,
        sizeFormatted: '4.8 GB',
        recoveryRole: 'Protects post descriptions, hashtags, sound links, and engagement proofs for appeals.',
      },
      {
        id: 'arch-contracts',
        name: 'Sponsor Agreements & Deliverables Vault',
        category: 'contracts',
        platformCount: 2,
        platforms: ['Direct DMs', 'Email Archive'],
        encryptionCipher: 'AES-256-GCM',
        status: 'synced',
        lastBackupTimestamp: 'Yesterday, 11:20 PM UTC',
        lastBackupIso: '2026-11-09T23:20:00Z',
        checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        recordCount: 12,
        sizeFormatted: '38.2 MB',
        recoveryRole: 'Stores signed contracts, rate cards, and DM agreements to guarantee off-platform invoicing ($8,520/mo).',
      },
      {
        id: 'arch-audience',
        name: 'Patreon & Substack Subscriber Roster',
        category: 'audience',
        platformCount: 3,
        platforms: ['Patreon', 'Substack', 'Stripe CRM'],
        encryptionCipher: 'AES-256-GCM',
        status: 'synced',
        lastBackupTimestamp: 'Today, 01:10 AM UTC',
        lastBackupIso: '2026-11-10T01:10:00Z',
        checksumSha256: '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72',
        recordCount: 13004,
        sizeFormatted: '14.6 MB',
        recoveryRole: 'Enables 1-hour email notification broadcast to paying patrons ($4,260/mo) without platform mediation.',
      },
      {
        id: 'arch-standby',
        name: 'Standby Emergency Domain Mirror',
        category: 'standby',
        platformCount: 1,
        platforms: ['Cloudflare DNS'],
        encryptionCipher: 'AES-256-GCM',
        status: 'synced',
        lastBackupTimestamp: 'Today, 03:10 AM UTC',
        lastBackupIso: '2026-11-10T03:10:00Z',
        checksumSha256: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
        recordCount: 1,
        sizeFormatted: '180 KB',
        recoveryRole: 'Maintains zero-latency domain routing to broadcast emergency statements and retain revenue.',
      },
    ],
  },
  {
    creatorId: 'tech-2026',
    handle: '@marcuslab',
    name: 'Marcus Vance',
    niche: 'Hardware & Tech Reviews',
    followerCount: '450K',
    monthlyRevenue: 28500,
    vaultStatus: 'ENCRYPTED & SYNCED',
    lastOverallBackup: 'Today, 04:00 AM UTC',
    rtoTargetHours: 4,
    lastDrillRtoHours: 3.1,
    standbyDomain: 'marcusvance.tech',
    dnsHealth: 'HEALTHY',
    archives: [
      {
        id: 'arch-content-tech',
        name: 'Video & Benchmark Data Archive',
        category: 'content',
        platformCount: 2,
        platforms: ['YouTube', 'X / Twitter'],
        encryptionCipher: 'AES-256-GCM',
        status: 'synced',
        lastBackupTimestamp: 'Today, 03:50 AM UTC',
        lastBackupIso: '2026-11-10T03:50:00Z',
        checksumSha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        recordCount: 1420,
        sizeFormatted: '12.4 GB',
        recoveryRole: 'Full scripts, spec sheets, affiliate tag mappings, and timestamps.',
      },
      {
        id: 'arch-contracts-tech',
        name: 'Agency Sponsor & Review NDAs',
        category: 'contracts',
        platformCount: 1,
        platforms: ['DocuSign / Gmail'],
        encryptionCipher: 'AES-256-GCM',
        status: 'synced',
        lastBackupTimestamp: 'Yesterday, 06:15 PM UTC',
        lastBackupIso: '2026-11-09T18:15:00Z',
        checksumSha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
        recordCount: 28,
        sizeFormatted: '84.1 MB',
        recoveryRole: 'Signed annual contracts with hardware manufacturers totaling $19,000/mo.',
      },
      {
        id: 'arch-audience-tech',
        name: 'Newsletter & Discord Backer Roster',
        category: 'audience',
        platformCount: 2,
        platforms: ['Ghost', 'Discord API'],
        encryptionCipher: 'AES-256-GCM',
        status: 'synced',
        lastBackupTimestamp: 'Today, 02:00 AM UTC',
        lastBackupIso: '2026-11-10T02:00:00Z',
        checksumSha256: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
        recordCount: 34100,
        sizeFormatted: '28.9 MB',
        recoveryRole: 'Self-hosted subscriber roster, exportable directly to portable Mailgun/SES cluster.',
      },
      {
        id: 'arch-standby-tech',
        name: 'Standby Emergency Domain Mirror',
        category: 'standby',
        platformCount: 1,
        platforms: ['Vercel Edge'],
        encryptionCipher: 'AES-256-GCM',
        status: 'synced',
        lastBackupTimestamp: 'Today, 04:00 AM UTC',
        lastBackupIso: '2026-11-10T04:00:00Z',
        checksumSha256: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
        recordCount: 1,
        sizeFormatted: '210 KB',
        recoveryRole: 'Automatic redirect to standby feed during platform outage or takedown.',
      },
    ],
  },
];

export function getProfileById(creatorId: string): CreatorVaultProfile {
  return SAMPLE_CREATOR_PROFILES.find((p) => p.creatorId === creatorId) || SAMPLE_CREATOR_PROFILES[0];
}

export function formatShortSha(sha: string): string {
  if (!sha || sha.length < 12) return sha;
  return `${sha.slice(0, 8)}...${sha.slice(-6)}`;
}

export function calculateTotalRecords(profile: CreatorVaultProfile): number {
  return profile.archives.reduce((acc, curr) => acc + curr.recordCount, 0);
}

export function verifyChecksumFormat(sha: string): boolean {
  return /^[a-f0-9]{64}$/i.test(sha);
}
