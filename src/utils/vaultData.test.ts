import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SAMPLE_CREATOR_PROFILES,
  getProfileById,
  formatShortSha,
  calculateTotalRecords,
  verifyChecksumFormat,
} from './vaultData.ts';

test('retrieves default and specific creator vault profiles', () => {
  const profile = getProfileById('fit-2026');
  assert.equal(profile.handle, '@sarahfit');
  assert.equal(profile.archives.length, 4);

  const fallback = getProfileById('non-existent');
  assert.equal(fallback.creatorId, 'fit-2026');
});

test('validates SHA-256 checksum format and short display formatting', () => {
  const fullSha = '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069';
  assert.equal(verifyChecksumFormat(fullSha), true);
  assert.equal(verifyChecksumFormat('notasha'), false);

  const shortSha = formatShortSha(fullSha);
  assert.equal(shortSha, '7f83b165...6d9069');
});

test('calculates total records across all archives in vault', () => {
  const profile = SAMPLE_CREATOR_PROFILES[0];
  const total = calculateTotalRecords(profile);
  assert.equal(total, 954 + 12 + 13004 + 1); // 13971
});
