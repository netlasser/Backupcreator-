import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateReadiness } from './calculator.ts';

test('critical risk for high-earning creator with DM contracts and no email list', () => {
  const result = calculateReadiness({
    primaryPlatform: 'instagram',
    monthlyRevenue: 15000,
    backupHabit: 'camera_roll',
    sponsorDealsInDms: true,
    hasOwnDomain: false,
    hasEmailList: false,
  });

  assert.equal(result.exposureRating, 'CRITICAL');
  assert.ok(result.score <= 30);
  assert.equal(result.revenueAtRisk, 13200); // 88% of 15,000
  assert.equal(result.primaryGaps.length, 3);
});

test('moderate or defended rating when creator owns domain, email list, and structured archives', () => {
  const result = calculateReadiness({
    primaryPlatform: 'multi',
    monthlyRevenue: 20000,
    backupHabit: 'structured_archives',
    sponsorDealsInDms: false,
    hasOwnDomain: true,
    hasEmailList: true,
  });

  assert.ok(result.score >= 80);
  assert.equal(result.exposureRating, 'DEFENDED');
  assert.equal(result.revenueAtRisk, 7000); // 35% of 20,000
  assert.equal(result.recoveryHoursWithBackup, 48);
});
