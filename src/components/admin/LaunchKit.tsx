import React, { useState } from 'react';

interface LaunchKitProps {
  liveUrl: string;
  onUrlChange: (newUrl: string) => void;
}

export const LaunchKit: React.FC<LaunchKitProps> = ({ liveUrl, onUrlChange }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const cleanUrl = liveUrl.trim() || (typeof window !== 'undefined' ? window.location.origin : 'https://backupcreator.app');

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const posts = [
    {
      key: 'reddit',
      caption: 'REDDIT (R/PATREON OR R/INSTAGRAMDISABLEDBANS) · VALUE & RESEARCH POST',
      rawText: `I've been researching what actually happens to full-time creators after a ban — not the appeal process, but the business side. YouTube removed 2.7M channels in Q2 alone this year, and the pattern in every story is the same: the videos were backed up, but the sponsor contracts were in DMs, the member list was never exported, and there was no way to reach the audience. I put together a page for a service that archives the business records (not just content), stands up a standby site on your own domain, and runs a quarterly drill so you know your actual time-to-recovery. It deliberately does NOT promise account recovery or restored followers — I think that promise is where the scams live. Would genuinely like honest feedback from people here: is this something you'd have wanted before it happened, or does nobody buy this until after? [YOUR LINK]`,
    },
    {
      key: 'linkedin',
      caption: 'LINKEDIN · FOR CREATOR AGENCY PRINCIPALS & MANAGERS',
      rawText: `Agencies already sell "protection" — DMCA takedowns, 24/7 monitoring, impersonation sweeps. But I haven't found one that can answer a sponsor's simplest question: if this creator's account goes down tomorrow, how fast are they back online? I've been researching creator continuity and put together a page for a per-seat service agencies could add to their roster: encrypted archives of each client's business records, a standby site per creator, and a quarterly drill that produces a dated readiness report you can show sponsors. Creator insurance just passed $2B as a market, so someone is going to standardize this. If you manage creator accounts, I'd value a blunt read on whether your clients would pay for it — page is here: [YOUR LINK]`,
    },
    {
      key: 'x',
      caption: 'X / TWITTER · HIGH-IMPACT METRIC POST',
      rawText: `YouTube removed 2,732,395 channels in Q2 2026. Meta purged 10M+ Instagram accounts the same year. Most "backup" advice for creators covers the videos and ignores the business — contracts, member lists, the ability to reach your audience at all. I put together a page for a disaster-recovery service built around that gap: archive the records, keep a standby site warm, drill the recovery quarterly. Honest feedback wanted, especially from full-time creators: [YOUR LINK]`,
    },
    {
      key: 'dm',
      caption: 'DIRECT MESSAGE · 1-ON-1 OUTREACH TO FULL-TIME CREATORS',
      rawText: `I'm researching how full-time creators would recover if their main account got banned tomorrow — records, members, sponsor contracts, not just the content — and I put together a page for a service built around that. Since your business runs on your account, would you take two minutes and tell me honestly whether this is something you'd pay for before it happens? [YOUR LINK]`,
    },
  ];

  return (
    <section className="mb-12">
      <div className="mb-4">
        <p className="text-[12px] font-mono uppercase text-[#5C665F] tracking-wider mb-1">
          Distribution Channels
        </p>
        <h2 className="heading-h2 text-[26px] md:text-[28px] text-[#16211B]">
          Launch Kit
        </h2>
      </div>

      {/* Live URL Input (Single level card) */}
      <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-5 mb-6 text-left">
        <p className="text-[12px] font-mono uppercase tracking-wider text-[#5C665F] mb-1.5">
          Your Live Landing Page URL
        </p>
        <p className="text-[14px] text-[#5C665F] mb-3">
          Paste your public Cloud Run URL once — it automatically replaces <code className="font-mono text-[13px] text-[#16211B] bg-[#FAFAF7] px-1 py-0.5 rounded-[4px] border border-[#E3E1DA]">[YOUR LINK]</code> in all launch materials.
        </p>
        <input
          type="url"
          value={liveUrl}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="https://ais-pre-...run.app"
          className="w-full h-[46px] px-4 bg-[#FAFAF7] border border-[#E3E1DA] rounded-[8px] text-[15px] text-[#16211B] font-mono focus:outline-none focus:border-[#16211B] transition-colors"
        />
      </div>

      {/* Stacked Post Cards (Strictly 1 column, un-nested cards) */}
      <div className="space-y-6">
        {posts.map((post) => {
          const processedText = post.rawText.replace(/\[YOUR LINK\]/g, cleanUrl);
          const isCopied = copiedKey === post.key;

          return (
            <div
              key={post.key}
              className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-6 text-left flex flex-col justify-between"
            >
              <div>
                <p className="text-[12px] font-mono uppercase tracking-wider text-[#5C665F] mb-3">
                  {post.caption}
                </p>
                <div className="text-[15px] text-[#16211B] leading-[1.6] max-w-[75ch] whitespace-pre-line mb-6 font-normal">
                  {processedText}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleCopy(post.key, processedText)}
                  className="btn-primary text-[13px] py-2 px-5"
                >
                  {isCopied ? 'Copied to clipboard' : 'Copy post'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
