import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEmail, processLeadSubmission } from './leadValidation.ts';

test('validates correct email addresses', () => {
  assert.equal(validateEmail('creator@studio.com'), true);
  assert.equal(validateEmail('alex.smith+test@domain.co.uk'), true);
});

test('rejects invalid email formats', () => {
  assert.equal(validateEmail(''), false);
  assert.equal(validateEmail('notanemail'), false);
  assert.equal(validateEmail('@domain.com'), false);
  assert.equal(validateEmail('creator@'), false);
  assert.equal(validateEmail('creator@domain'), false);
});

test('honeypot trigger flags as spam and fails silently', () => {
  const result = processLeadSubmission({
    email: 'creator@studio.com',
    source: 'hero',
    honeypot: 'bot-fill-value',
  });
  assert.equal(result.isValid, false);
  assert.equal(result.isSpam, true);
});

test('processes valid lead submission correctly', () => {
  const result = processLeadSubmission({
    email: '  CREATOR@STUDIO.COM  ',
    source: 'scorecard',
    tier: 'Creator Pro',
    honeypot: '',
  });
  assert.equal(result.isValid, true);
  assert.equal(result.isSpam, false);
  assert.equal(result.sanitizedEmail, 'creator@studio.com');
});
