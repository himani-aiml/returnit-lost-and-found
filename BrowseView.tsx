import React from 'react';
import { Item, Category } from '../types';
import { CATEGORIES } from '../mockData';
import { ItemCard } from './ItemCard';
import { Search, X, RotateCcw, SearchX } from 'lucide-react';

interface BrowseViewProps {
  items: Item[];
  totalCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTypeFilter: 'All' | 'Lost Only' | 'Found Only';
  setActiveTypeFilter: (filter: 'All' | 'Lost Only' | 'Found Only') => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onSelectItem: (id: string) => void;
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  items,
  totalCount,
  searchQuery,
  setSearchQuery,
  activeTypeFilter,
  setActiveTypeFilter,
  activeCategory,
  setActiveCategory,
  onSelectItem,
}) => {
  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-200">
      {/* Header title & count */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">Browse Reported Items</h1>
          <p className="text-[11px] text-slate-500">Filter, inspect, and claim belongings</p>
        </div>
        <span
          id="browse-counter-badge"
          className="text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg shadow-2xs"
        >
          {items.length} of {totalCount}
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          id="browse-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, description, or location..."
          className="w-full text-xs bg-white text-slate-900 placeholder:text-slate-400 pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs transition-all"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
        {searchQuery && (
          <button
            id="browse-clear-search-btn"
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs & Category Dropdown */}
      <div className="space-y-2">
        {/* Type Filter pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
          {(['All', 'Lost Only', 'Found Only'] as const).map((filter) => {
            const isActive = activeTypeFilter === filter;
            let activeStyle = 'bg-white text-slate-900 font-bold shadow-xs';
            if (isActive && filter === 'Lost Only') {
              activeStyle = 'bg-[#dc2626] text-white font-bold shadow-xs';
            } else if (isActive && filter === 'Found Only') {
              activeStyle = 'bg-[#16a34a] text-white font-bold shadow-xs';
            }

            return (
              <button
                key={filter}
                id={`filter-tab-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveTypeFilter(filter)}
                className={`flex-1 py-1.5 text-xs rounded-lg transition-all text-center cursor-pointer ${
                  isActive ? activeStyle : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 shrink-0">Category:</span>
          <select
            id="browse-category-select"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
          >
            <option value="All Categories">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Items list or empty state */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 pt-1">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} onSelect={() => onSelectItem(item.id)} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-3 mt-4 shadow-2xs">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">No matching items found</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            We couldn't find items matching your search or filters. Try adjusting keywords or clearing filters.
          </p>
          <button
            id="btn-clear-browse-filters"
            onClick={() => {
              setSearchQuery('');
              setActiveTypeFilter('All');
              setActiveCategory('All Categories');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
