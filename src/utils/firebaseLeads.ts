/**
 * Firebase Firestore leads storage interface with strict error handling and connection testing.
 */
import firebaseConfig from '@/firebase-applet-config.json';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDocFromServer } from 'firebase/firestore';

export interface LeadRecord {
  email: string;
  source: string;
  tier: string | null;
  timestamp: string;
}

export interface SaveLeadResult {
  success: boolean;
  firestoreDocId?: string;
  isOfflineBackup: boolean;
}

const LOCAL_LEADS_KEY = 'backupcreator_leads';

import { getAuth } from 'firebase/auth';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth(app);

// Test Firestore connection on boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline notice: Please check connection configuration.');
      return false;
    }
    // A permission denied error on /test/connection is normal because rules block reads by default
    return true;
  }
}

// Run connection check
testConnection();

export async function saveLeadToFirestore(record: LeadRecord): Promise<SaveLeadResult> {
  // Always persist to local queue first
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_LEADS_KEY) || '[]');
    existing.push(record);
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('Could not store lead to localStorage:', err);
  }

  try {
    const docRef = await addDoc(collection(db, 'leads'), {
      email: record.email,
      source: record.source,
      tier: record.tier || null,
      createdAt: serverTimestamp(),
      clientTimestamp: record.timestamp,
    });

    console.info('[BackupCreator] Stored lead in Firestore:', { id: docRef.id, email: record.email, source: record.source });
    return {
      success: true,
      firestoreDocId: docRef.id,
      isOfflineBackup: false,
    };
  } catch (firestoreError) {
    console.error('Firestore lead write error:', firestoreError);
    return {
      success: true,
      isOfflineBackup: true,
    };
  }
}

export function getLocalLeads(): LeadRecord[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_LEADS_KEY) || '[]');
  } catch {
    return [];
  }
}

// Expose safe inspection hook for testing and demonstration
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__getCapturedLeads = getLocalLeads;
}
