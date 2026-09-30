import React from 'react';

interface StatsRowProps {
  lostCount: number;
  foundCount: number;
  matchesCount: number;
}

export const StatsRow: React.FC<StatsRowProps> = ({
  lostCount,
  foundCount,
  matchesCount,
}) => {
  return (
    <section className="px-4">
      <div className="bg-slate-100/95 rounded-2xl p-3 border border-slate-200 grid grid-cols-3 gap-2 text-center shadow-xs">
        <div className="bg-white p-2.5 rounded-xl shadow-xs border border-slate-100/80">
          <span className="block text-xl font-black text-[#dc2626] leading-tight">
            {lostCount}
          </span>
          <span className="text-[10px] font-medium text-slate-500 leading-tight block mt-0.5">
            Items Reported Lost
          </span>
        </div>

        <div className="bg-white p-2.5 rounded-xl shadow-xs border border-slate-100/80">
          <span className="block text-xl font-black text-[#16a34a] leading-tight">
            {foundCount}
          </span>
          <span className="text-[10px] font-medium text-slate-500 leading-tight block mt-0.5">
            Items Reported Found
          </span>
        </div>

        <div className="bg-white p-2.5 rounded-xl shadow-xs border border-slate-100/80">
          <span className="block text-xl font-black text-[#2563eb] leading-tight">
            {matchesCount}
          </span>
          <span className="text-[10px] font-medium text-slate-500 leading-tight block mt-0.5">
            Successful Matches
          </span>
        </div>
      </div>
    </section>
  );
};
