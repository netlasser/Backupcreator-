import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  subscribeToAuth,
  signInWithGoogle,
  signOutAdmin,
  getSettings,
  claimOwnership,
  subscribeToSettings,
  subscribeToLeads,
  updateAdminSettings,
  AdminLead,
  AdminSettingsData,
} from '../../utils/adminService';
import { AdminHeader } from './AdminHeader';
import { SignupsFeed } from './SignupsFeed';
import { LaunchKit } from './LaunchKit';
import { WelcomeEmails } from './WelcomeEmails';
import { LaunchChecklist } from './LaunchChecklist';
import { VerdictCalculator } from './VerdictCalculator';
import { Logo } from '../Logo';

export const AdminHQ: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [settings, setSettings] = useState<AdminSettingsData | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Subscribe to Firebase Auth
  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        try {
          const currentSettings = await getSettings();
          if (!currentSettings) {
            // First user auto-claims ownership
            const newSettings = await claimOwnership(user);
            setSettings(newSettings);
          } else {
            setSettings(currentSettings);
          }
        } catch (err) {
          console.error('Error fetching admin settings:', err);
          setErrorMsg('Failed to check authorization. Please refresh.');
        } finally {
          setSettingsLoading(false);
        }
      } else {
        setSettings(null);
        setSettingsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Subscribe to realtime settings updates when authenticated as owner
  useEffect(() => {
    if (!currentUser || !settings || settings.ownerUid !== currentUser.uid) return;
    const unsub = subscribeToSettings((updated) => {
      if (updated) setSettings(updated);
    });
    return () => unsub();
  }, [currentUser, settings?.ownerUid]);

  // Subscribe to realtime leads feed when owner
  useEffect(() => {
    if (!currentUser || !settings || settings.ownerUid !== currentUser.uid) {
      setLeadsLoading(false);
      return;
    }
    setLeadsLoading(true);
    const unsub = subscribeToLeads(
      (items) => {
        setLeads(items);
        setLeadsLoading(false);
      },
      (err) => {
        console.error('Leads subscription error:', err);
        setLeadsLoading(false);
      }
    );
    return () => unsub();
  }, [currentUser, settings?.ownerUid]);

  const handleSignIn = async () => {
    setErrorMsg(null);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setErrorMsg(`Sign-in failed: ${message}`);
    }
  };

  const handleSignOut = async () => {
    await signOutAdmin();
  };

  const handleUrlChange = async (newUrl: string) => {
    if (!settings) return;
    setSettings((prev) => (prev ? { ...prev, liveUrl: newUrl } : prev));
    try {
      await updateAdminSettings({ liveUrl: newUrl });
    } catch (err) {
      console.warn('Could not sync liveUrl to Firestore:', err);
    }
  };

  const handleVisitorsChange = async (count: number) => {
    if (!settings) return;
    setSettings((prev) => (prev ? { ...prev, visitorsCount: count } : prev));
    try {
      await updateAdminSettings({ visitorsCount: count });
    } catch (err) {
      console.warn('Could not sync visitorsCount to Firestore:', err);
    }
  };

  const handleToggleChecklist = async (key: string) => {
    if (!settings) return;
    const updated = {
      ...(settings.checklist || {}),
      [key]: !settings.checklist?.[key],
    };
    setSettings((prev) => (prev ? { ...prev, checklist: updated } : prev));
    try {
      await updateAdminSettings({ checklist: updated });
    } catch (err) {
      console.warn('Could not sync checklist to Firestore:', err);
    }
  };

  // State 1: Auth or settings loading
  if (authLoading || (currentUser && settingsLoading)) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-6 text-[#5C665F]">
        <div className="text-center">
          <Logo size={28} className="justify-center mb-4" />
          <p className="text-[14px] font-mono">Authenticating Launch HQ...</p>
        </div>
      </div>
    );
  }

  // State 2: Not signed in
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-6">
        <div className="w-full max-w-[420px] bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-8 text-left">
          <div className="mb-6">
            <Logo size={24} className="mb-3" />
            <span className="text-[12px] font-mono uppercase tracking-wider text-[#5C665F] block mb-1">
              PRIVATE OWNER ACCESS
            </span>
            <h1 className="heading-h3 text-[#16211B]">
              BackupCreator Launch HQ
            </h1>
          </div>

          <p className="text-[14px] text-[#5C665F] mb-6 leading-relaxed">
            Sign in with your Google account. The first account to authenticate claims ownership of this dashboard and the live signup feed.
          </p>

          {errorMsg && (
            <p className="text-[#B91C1C] text-[13px] mb-4 bg-red-50 p-2.5 rounded-[6px] border border-red-200">
              {errorMsg}
            </p>
          )}

          <button
            type="button"
            onClick={handleSignIn}
            className="btn-primary w-full text-[14px] py-3 justify-center"
          >
            Sign in with Google
          </button>

          <p className="text-[12px] text-[#5C665F] text-center mt-4">
            Secured via Firebase Auth & owner-only rules
          </p>
        </div>
      </div>
    );
  }

  // State 3: Signed in, but not the claimed owner
  if (settings && settings.ownerUid !== currentUser.uid) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-6">
        <div className="w-full max-w-[460px] bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-8 text-left">
          <Logo size={24} className="mb-4" />
          <span className="text-[12px] font-mono uppercase tracking-wider text-[#B91C1C] font-semibold block mb-1">
            ACCESS RESTRICTED
          </span>
          <h2 className="heading-h3 text-[#16211B] mb-3">
            Dashboard Claimed by Owner
          </h2>
          <p className="text-[14px] text-[#5C665F] mb-6 leading-relaxed">
            This Launch HQ has already been claimed by another Google account (<code className="font-mono text-[#16211B] text-[13px]">{settings.ownerEmail || 'designated owner'}</code>). Only the owner UID can access the private scoreboard and lead records.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSignOut}
              className="btn-secondary text-[13px] py-2 px-4"
            >
              Sign out
            </button>
            <a
              href="/"
              className="text-[14px] text-[#5C665F] hover:text-[#16211B] transition-colors"
            >
              Return to public page
            </a>
          </div>
        </div>
      </div>
    );
  }

  // State 4: Owner Authenticated - Single-Column HQ
  const liveUrlValue = settings?.liveUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  const visitorsValue = settings?.visitorsCount ?? 0;
  const checklistValue = settings?.checklist || {};

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#16211B] font-body selection:bg-[#0E7A45]/20 selection:text-[#16211B]">
      <AdminHeader userEmail={currentUser.email} onSignOut={handleSignOut} />

      <main className="max-w-[780px] mx-auto px-4 py-10 md:py-12">
        {/* 1. SIGNUPS FEED */}
        <SignupsFeed leads={leads} isLoading={leadsLoading} />

        {/* 2. LAUNCH KIT */}
        <LaunchKit liveUrl={liveUrlValue} onUrlChange={handleUrlChange} />

        {/* 3. WELCOME EMAILS */}
        <WelcomeEmails />

        {/* 4. CHECKLIST */}
        <LaunchChecklist
          checklist={checklistValue}
          onToggleItem={handleToggleChecklist}
        />

        {/* 5. VERDICT */}
        <VerdictCalculator
          signupsCount={leads.length}
          visitors={visitorsValue}
          onVisitorsChange={handleVisitorsChange}
        />
      </main>
    </div>
  );
};
