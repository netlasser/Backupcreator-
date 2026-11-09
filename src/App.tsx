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

function checkIsAdminRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname;
  const hash = window.location.hash;
  return (
    path === '/admin' ||
    path.startsWith('/admin/') ||
    hash === '#admin' ||
    hash === '#/admin' ||
    hash.startsWith('#/admin')
  );
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(checkIsAdminRoute);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdmin(checkIsAdminRoute());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Admin Route View (No marketing hero, clean dedicated app shell)
  if (isAdmin) {
    return <AdminHQ />;
  }

  // Public Landing Page
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

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#16211B] flex flex-col font-body selection:bg-[#0E7A45]/20 selection:text-[#16211B]">
      {/* 1. Nav */}
      <Nav onCtaClick={handleScrollToTopCta} />

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
