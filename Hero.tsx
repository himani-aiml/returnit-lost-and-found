import React, { useState } from 'react';
import { Search, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="bg-gradient-to-b from-[#1e3a5f] to-[#142841] text-white px-5 pt-6 pb-7 rounded-b-3xl shadow-inner relative">
      {/* Official badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-[11px] font-semibold mb-3 border border-blue-400/25">
        <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
        Official Portal for Public Spaces
      </div>

      {/* Main heading */}
      <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-white mb-2">
        Lost Something? Found Something? We Connect You.
      </h1>

      <p className="text-xs text-blue-100/90 leading-relaxed mb-5">
        Instant matchmaking across campuses, medical centers, transit hubs, and municipal halls.
      </p>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center">
          <input
            id="hero-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lost wallets, keys, phones, bags..."
            className="w-full bg-white text-slate-900 placeholder:text-slate-400 pl-10 pr-24 py-3 rounded-xl text-xs font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border border-slate-100 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <button
            id="hero-search-submit-btn"
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#2563eb] hover:bg-blue-700 text-white px-4 rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center gap-1"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
};
