import React from 'react';
import { AdminLead } from '../../utils/adminService';

interface SignupsFeedProps {
  leads: AdminLead[];
  isLoading: boolean;
}

export const SignupsFeed: React.FC<SignupsFeedProps> = ({ leads, isLoading }) => {
  // Compute counts per day
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;

  let todayCount = 0;
  let yesterdayCount = 0;
  let earlierCount = 0;

  leads.forEach((l) => {
    if (!l.createdAt) return;
    const time = new Date(l.createdAt).getTime();
    if (isNaN(time)) return;
    if (time >= startOfToday) {
      todayCount++;
    } else if (time >= startOfYesterday) {
      yesterdayCount++;
    } else {
      earlierCount++;
    }
  });

  const formatDate = (isoString: string | null) => {
    if (!isoString) return 'Just now';
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return 'Recently';
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }).format(d);
    } catch {
      return 'Recently';
    }
  };

  return (
    <section className="mb-12">
      <div className="mb-4">
        <p className="text-[12px] font-mono uppercase text-[#5C665F] tracking-wider mb-1">
          Live Conversion Scoreboard
        </p>
        <h2 className="heading-h2 text-[26px] md:text-[28px] text-[#16211B]">
          Signups Feed
        </h2>
      </div>

      {/* Metrics Row (short numbers in columns) */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-4 text-left">
          <p className="text-[12px] font-mono uppercase text-[#5C665F] mb-1">Total</p>
          <p className="font-heading font-bold text-[28px] text-[#16211B] leading-none">
            {leads.length}
          </p>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-4 text-left">
          <p className="text-[12px] font-mono uppercase text-[#5C665F] mb-1">Today</p>
          <p className="font-heading font-bold text-[28px] text-[#16211B] leading-none">
            {todayCount}
          </p>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-4 text-left">
          <p className="text-[12px] font-mono uppercase text-[#5C665F] mb-1">Yesterday</p>
          <p className="font-heading font-bold text-[28px] text-[#16211B] leading-none">
            {yesterdayCount}
          </p>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-4 text-left">
          <p className="text-[12px] font-mono uppercase text-[#5C665F] mb-1">Earlier</p>
          <p className="font-heading font-bold text-[28px] text-[#16211B] leading-none">
            {earlierCount}
          </p>
        </div>
      </div>

      {/* Leads Feed List (Single level card) */}
      <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#E3E1DA] bg-[#FAFAF7] flex items-center justify-between">
          <span className="font-mono text-[12px] uppercase tracking-wider text-[#5C665F]">
            Captured Contacts ({leads.length})
          </span>
          <span className="text-[12px] text-[#5C665F]">
            {isLoading ? 'Syncing...' : 'Realtime Firestore connection active'}
          </span>
        </div>

        {leads.length === 0 ? (
          <div className="p-8 text-center text-[#5C665F] text-[15px]">
            {isLoading
              ? 'Loading signups feed...'
              : 'No signups yet. Share your first link from the Launch Kit below to start capturing leads.'}
          </div>
        ) : (
          <div className="divide-y divide-[#E3E1DA]">
            {leads.map((lead) => (
              <div key={lead.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-[#16211B] text-[15px] truncate">
                    {lead.email}
                  </p>
                  <div className="flex items-center gap-2 text-[13px] text-[#5C665F] mt-0.5">
                    <span>Source: {lead.source}</span>
                    {lead.tier && (
                      <>
                        <span>·</span>
                        <span className="font-medium text-[#16211B]">Tier: {lead.tier}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="font-mono text-[12px] text-[#5C665F]">
                    {formatDate(lead.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
