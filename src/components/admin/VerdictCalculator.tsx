import React from 'react';

interface VerdictProps {
  signupsCount: number;
  visitors: number;
  onVisitorsChange: (count: number) => void;
}

export const VerdictCalculator: React.FC<VerdictProps> = ({
  signupsCount,
  visitors,
  onVisitorsChange,
}) => {
  const rate = visitors > 0 ? (signupsCount / visitors) * 100 : 0;
  const roundedRate = Math.round(rate * 10) / 10;

  const getVerdict = () => {
    if (visitors < 10) {
      return {
        message: 'Awaiting minimum traffic sample (target 50–100 visitors) to compute initial verdict.',
        subtext: 'Share your launch links to get initial data.',
      };
    }
    if (rate >= 10) {
      return {
        message: 'Real interest. Build the full product.',
        subtext: 'Conversion rate exceeds 10%. Buyers have proven appetite before account disaster strikes.',
      };
    }
    if (rate >= 3) {
      return {
        message: "There's a pulse but the pitch is off. Change the headline or the offer and share again.",
        subtext: 'Conversion is between 3% and 9%. The problem is acknowledged, but positioning or urgency requires iteration.',
      };
    }
    return {
      message: "Let this one go and grab the next idea. That's the system working.",
      subtext: 'Conversion is under 3% across qualified creator traffic. Discontinue before sinking engineering capital.',
    };
  };

  const verdict = getVerdict();

  return (
    <section className="mb-12">
      <div className="mb-4">
        <p className="text-[12px] font-mono uppercase text-[#5C665F] tracking-wider mb-1">
          Validation Engine
        </p>
        <h2 className="heading-h2 text-[26px] md:text-[28px] text-[#16211B]">
          Validation Verdict
        </h2>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-6 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 pb-6 border-b border-[#E3E1DA]">
          <div>
            <label htmlFor="visitors_input" className="block text-[12px] font-mono uppercase tracking-wider text-[#5C665F] mb-1.5">
              Approximate Unique Visitors
            </label>
            <input
              id="visitors_input"
              type="number"
              min="0"
              value={visitors === 0 ? '' : visitors}
              onChange={(e) => onVisitorsChange(Math.max(0, parseInt(e.target.value) || 0))}
              placeholder="e.g. 100"
              className="w-full h-[46px] px-4 bg-[#FAFAF7] border border-[#E3E1DA] rounded-[8px] text-[16px] text-[#16211B] focus:outline-none focus:border-[#16211B] transition-colors"
            />
          </div>

          <div className="flex flex-col justify-end">
            <p className="text-[12px] font-mono uppercase tracking-wider text-[#5C665F] mb-1">
              Current Conversion Rate
            </p>
            <p className="font-heading font-bold text-[32px] text-[#16211B] leading-none">
              {roundedRate}%
              <span className="text-[14px] font-normal text-[#5C665F] ml-2">
                ({signupsCount} signups / {visitors} visitors)
              </span>
            </p>
          </div>
        </div>

        <div>
          <p className="text-[12px] font-mono uppercase tracking-wider text-[#5C665F] mb-2">
            Verdict Decision
          </p>
          <div className="text-[18px] md:text-[20px] font-heading font-bold text-[#0E7A45] leading-snug mb-1">
            {verdict.message}
          </div>
          <p className="text-[14px] text-[#5C665F] leading-relaxed">
            {verdict.subtext}
          </p>
        </div>
      </div>
    </section>
  );
};
