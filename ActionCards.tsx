import React from 'react';
import { Package, CheckSquare } from 'lucide-react';

interface ActionCardsProps {
  onReportLost: () => void;
  onReportFound: () => void;
}

export const ActionCards: React.FC<ActionCardsProps> = ({
  onReportLost,
  onReportFound,
}) => {
  return (
    <section className="px-4 grid grid-cols-2 gap-3">
      {/* Report Lost Card */}
      <button
        id="btn-report-lost-action"
        onClick={onReportLost}
        className="group bg-[#dc2626] hover:bg-red-700 active:scale-[0.98] text-white p-3.5 rounded-2xl shadow-md transition-all flex flex-col items-center text-center border border-red-500/40 cursor-pointer"
      >
        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform text-xl shadow-inner">
          📦
        </div>
        <span className="font-bold text-sm tracking-tight leading-none text-white">
          Report Lost Item
        </span>
        <span className="text-[10px] text-red-100 mt-1 font-medium">
          File lost property
        </span>
      </button>

      {/* Report Found Card */}
      <button
        id="btn-report-found-action"
        onClick={onReportFound}
        className="group bg-[#16a34a] hover:bg-green-700 active:scale-[0.98] text-white p-3.5 rounded-2xl shadow-md transition-all flex flex-col items-center text-center border border-green-500/40 cursor-pointer"
      >
        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform text-xl shadow-inner">
          ✅
        </div>
        <span className="font-bold text-sm tracking-tight leading-none text-white">
          Report Found Item
        </span>
        <span className="text-[10px] text-green-100 mt-1 font-medium">
          Help owner recover
        </span>
      </button>
    </section>
  );
};
