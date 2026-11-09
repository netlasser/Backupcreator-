/**
 * Admin Service: Authentication, owner claim, settings, and leads feed.
 */
import { auth, db } from './firebaseLeads';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

export interface AdminLead {
  id: string;
  email: string;
  source: string;
  tier: string | null;
  createdAt: string | null;
  clientTimestamp?: string;
}

export interface AdminSettingsData {
  ownerUid: string;
  ownerEmail: string;
  liveUrl?: string;
  visitorsCount?: number;
  checklist?: Record<string, boolean>;
  createdAt?: unknown;
  updatedAt?: unknown;
}

const SETTINGS_DOC_PATH = 'settings/config';

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signOutAdmin(): Promise<void> {
  await fbSignOut(auth);
}

export async function getSettings(): Promise<AdminSettingsData | null> {
  const docRef = doc(db, SETTINGS_DOC_PATH);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return snap.data() as AdminSettingsData;
}

export async function claimOwnership(user: User): Promise<AdminSettingsData> {
  const docRef = doc(db, SETTINGS_DOC_PATH);
  const existing = await getDoc(docRef);
  if (existing.exists()) {
    return existing.data() as AdminSettingsData;
  }

  const initialSettings: AdminSettingsData = {
    ownerUid: user.uid,
    ownerEmail: user.email || '',
    liveUrl: window.location.origin,
    visitorsCount: 0,
    checklist: {
      page_live: true,
      share_reddit: false,
      share_linkedin: false,
      share_x: false,
      send_dms: false,
      reach_100: false,
    },
  };

  await setDoc(docRef, {
    ...initialSettings,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return initialSettings;
}

export async function updateAdminSettings(updates: Partial<AdminSettingsData>): Promise<void> {
  const docRef = doc(db, SETTINGS_DOC_PATH);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export function subscribeToSettings(callback: (data: AdminSettingsData | null) => void) {
  const docRef = doc(db, SETTINGS_DOC_PATH);
  return onSnapshot(docRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as AdminSettingsData);
    } else {
      callback(null);
    }
  });
}

export function subscribeToLeads(callback: (leads: AdminLead[]) => void, onError?: (err: Error) => void) {
  const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const items: AdminLead[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        let formattedDate = '';
        if (d.createdAt instanceof Timestamp) {
          formattedDate = d.createdAt.toDate().toISOString();
        } else if (typeof d.createdAt === 'string') {
          formattedDate = d.createdAt;
        } else if (d.clientTimestamp) {
          formattedDate = d.clientTimestamp;
        }

        return {
          id: docSnap.id,
          email: d.email || '',
          source: d.source || 'direct',
          tier: d.tier || null,
          createdAt: formattedDate,
          clientTimestamp: d.clientTimestamp,
        };
      });
      callback(items);
    },
    (err) => {
      console.warn('Leads subscription error:', err);
      if (onError) onError(err);
    }
  );
}
