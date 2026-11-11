/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { HowItWorks } from './components/HowItWorks';
import { DemoScorecard } from './components/DemoScorecard';
import { Benefits } from './components/Benefits';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { TierModal } from './components/TierModal';
import { AdminHQ } from './components/admin/AdminHQ';
import { CreatorVault } from './components/vault/CreatorVault';

type AppView = 'landing' | 'vault' | 'admin';

function determineCurrentView(): AppView {
  if (typeof window === 'undefined') return 'landing';
  const path = window.location.pathname;
  const hash = window.location.hash;

  if (
    path === '/admin' ||
    path.startsWith('/admin/') ||
    hash === '#admin' ||
    hash === '#/admin' ||
    hash.startsWith('#/admin')
  ) {
    return 'admin';
  }

  if (
    path === '/vault' ||
    path.startsWith('/vault/') ||
    hash === '#vault' ||
    hash === '#/vault' ||
    hash.startsWith('#/vault')
  ) {
    return 'vault';
  }

  return 'landing';
}

export default function App() {
  const [view, setView] = useState<AppView>(determineCurrentView);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setView(determineCurrentView());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // 1. Admin Route View
  if (view === 'admin') {
    return <AdminHQ />;
  }

  // 2. Creator Vault Route View
  if (view === 'vault') {
    return (
      <CreatorVault
        onBackToLanding={() => {
          setView('landing');
          if (window.location.hash.includes('vault')) {
            window.history.pushState(null, '', window.location.pathname || '/');
          }
        }}
      />
    );
  }

  // 3. Public Landing Page
  const handleSelectTier = (tierName: string) => {
    setSelectedTier(tierName);
    setIsModalOpen(true);
  };

  const handleScrollToTopCta = () => {
    const heroInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    if (heroInput) {
      heroInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      heroInput.focus();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenVault = () => {
    setView('vault');
    window.location.hash = '#/vault';
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#16211B] flex flex-col font-body selection:bg-[#0E7A45]/20 selection:text-[#16211B]">
      {/* 1. Nav with Vault link */}
      <Nav onCtaClick={handleScrollToTopCta} onOpenVault={handleOpenVault} />

      <main className="flex-1">
        {/* 2. Hero (Background token) */}
        <Hero onCaptureSuccess={() => {}} />

        {/* 3. Problem (Surface token band) */}
        <Problem />

        {/* 4. How It Works (Background token) */}
        <HowItWorks />

        {/* 5. Demo Scorecard & Email Capture (Surface token band) */}
        <DemoScorecard onCaptureSuccess={() => {}} />

        {/* 6. Benefits (Background token) */}
        <Benefits />

        {/* 7. Pricing (Surface token band) */}
        <Pricing onSelectTier={handleSelectTier} />

        {/* 8. FAQ (Background token) */}
        <FAQ />

        {/* 9. Final CTA (Surface token band) */}
        <FinalCTA onCaptureSuccess={() => {}} />
      </main>

      {/* 10. Footer (Background token) */}
      <Footer />

      {/* Pricing Tier Intent Capture Modal */}
      <TierModal
        isOpen={isModalOpen}
        tierName={selectedTier}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </div>
  );
}
