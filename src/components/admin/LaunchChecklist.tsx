import React from 'react';

interface ChecklistProps {
  checklist: Record<string, boolean>;
  onToggleItem: (key: string) => void;
}

export const LaunchChecklist: React.FC<ChecklistProps> = ({
  checklist,
  onToggleItem,
}) => {
  const items = [
    { key: 'page_live', label: '1. Landing page live on real Cloud Run URL with meta tags and favicon' },
    { key: 'share_reddit', label: '2. Post shared to Reddit (r/patreon or r/InstagramDisabledBans)' },
    { key: 'share_linkedin', label: '3. Post shared to LinkedIn (agency principals & managers)' },
    { key: 'share_x', label: '4. Post shared to X (platform risk metric breakdown)' },
    { key: 'send_dms', label: '5. 10 personal DMs sent to full-time creators earning $5K+/mo' },
    { key: 'reach_100', label: '6. 100 unique visitors reached — read the validation verdict below' },
  ];

  const completedCount = items.filter((i) => checklist[i.key]).length;

  return (
    <section className="mb-12">
      <div className="mb-4">
        <p className="text-[12px] font-mono uppercase text-[#5C665F] tracking-wider mb-1">
          Execution Milestones
        </p>
        <h2 className="heading-h2 text-[26px] md:text-[28px] text-[#16211B]">
          Launch Checklist
        </h2>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-6 text-left">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E3E1DA]">
          <span className="font-mono text-[12px] uppercase tracking-wider text-[#5C665F]">
            Progress ({completedCount} of {items.length} completed)
          </span>
          <span className="text-[13px] font-medium text-[#16211B]">
            {completedCount === items.length ? 'All launch steps complete' : 'In progress'}
          </span>
        </div>

        <div className="space-y-3.5">
          {items.map((item) => {
            const isChecked = !!checklist[item.key];
            return (
              <label
                key={item.key}
                className="flex items-start gap-3.5 cursor-pointer select-none group"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleItem(item.key)}
                  className="mt-1 w-4 h-4 rounded-[4px] border-[#E3E1DA] text-[#0E7A45] focus:ring-0 cursor-pointer shrink-0 accent-[#0E7A45]"
                />
                <span
                  className={`text-[15px] leading-snug transition-colors ${
                    isChecked
                      ? 'line-through text-[#5C665F]'
                      : 'text-[#16211B] group-hover:text-[#5C665F]'
                  }`}
                >
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </section>
  );
};
