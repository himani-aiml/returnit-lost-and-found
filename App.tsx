import React, { useState, useEffect, useMemo } from 'react';
import { Item, PageRoute } from './types';
import { INITIAL_ITEMS } from './mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ActionCards } from './components/ActionCards';
import { StatsRow } from './components/StatsRow';
import { ItemCard } from './components/ItemCard';
import { ReportForm } from './components/ReportForm';
import { BrowseView } from './components/BrowseView';
import { DetailView } from './components/DetailView';
import { BottomDock } from './components/BottomDock';
import { ApiKeyModal } from './components/ApiKeyModal';
import { ChevronRight } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTypeFilter, setActiveTypeFilter] = useState<'All' | 'Lost Only' | 'Found Only'>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All Categories');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // LocalStorage state initialization
  const [items, setItems] = useState<Item[]>(() => {
    try {
      const saved = localStorage.getItem('returnit_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error loading items from localStorage', err);
    }
    return INITIAL_ITEMS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('returnit_items', JSON.stringify(items));
    } catch (err) {
      console.error('Error saving items to localStorage', err);
    }
  }, [items]);

  // Route navigation helper
  const navigateTo = (route: PageRoute, itemId?: string) => {
    setCurrentRoute(route);
    if (itemId) {
      setSelectedItemId(itemId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add new item
  const handleAddItem = (newItem: Item) => {
    setItems((prev) => [newItem, ...prev]);
  };

  // Reset items to initial demo dataset
  const handleResetData = () => {
    if (window.confirm('Reset all Lost & Found items back to the hackathon demo dataset?')) {
      setItems(INITIAL_ITEMS);
      localStorage.setItem('returnit_items', JSON.stringify(INITIAL_ITEMS));
      setSelectedItemId(INITIAL_ITEMS[0].id);
      navigateTo('home');
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    const lostCount = items.filter((i) => i.type === 'lost').length;
    const foundCount = items.filter((i) => i.type === 'found').length;
    // 144 baseline matches + dynamic proportion
    const matchesCount = 144 + Math.floor((lostCount + foundCount) * 0.3);
    return { lostCount, foundCount, matchesCount };
  }, [items]);

  // Selected item for detail view
  const selectedItem = useMemo(() => {
    if (!selectedItemId && items.length > 0) return items[0];
    return items.find((i) => i.id === selectedItemId) || items[0];
  }, [items, selectedItemId]);

  // Filtered items for Browse
  const browseFilteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      const matchesType =
        activeTypeFilter === 'All'
          ? true
          : activeTypeFilter === 'Lost Only'
          ? item.type === 'lost'
          : item.type === 'found';

      const matchesCat =
        activeCategory === 'All Categories' ? true : item.category === activeCategory;

      return matchesSearch && matchesType && matchesCat;
    });
  }, [items, searchQuery, activeTypeFilter, activeCategory]);

  // 4 most recent reports for Home page
  const recentReports = useMemo(() => {
    return items.slice(0, 4);
  }, [items]);

  return (
    <div className="bg-slate-100 min-h-screen flex justify-center text-slate-800 antialiased selection:bg-blue-100">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col relative border-x border-slate-200">
        {/* Navbar */}
        <Navbar
          currentRoute={currentRoute}
          navigateTo={navigateTo}
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          onResetData={handleResetData}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 pb-16">
          {/* 1. HOME VIEW */}
          {currentRoute === 'home' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Hero Banner with Search */}
              <Hero
                initialQuery={searchQuery}
                onSearch={(q) => {
                  setSearchQuery(q);
                  navigateTo('browse');
                }}
              />

              {/* Action Cards (Report Lost / Report Found) */}
              <ActionCards
                onReportLost={() => navigateTo('report-lost')}
                onReportFound={() => navigateTo('report-found')}
              />

              {/* Stats Counters */}
              <StatsRow
                lostCount={stats.lostCount}
                foundCount={stats.foundCount}
                matchesCount={stats.matchesCount}
              />

              {/* Recent Reports section matching Stitch design */}
              <section className="px-4 pb-2">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 tracking-tight">
                      Recent Reports
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Newly posted lost and recovered items
                    </p>
                  </div>
                  <button
                    id="btn-view-all-recent"
                    onClick={() => navigateTo('browse')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer transition-colors"
                  >
                    View all ({items.length}) <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {recentReports.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onSelect={() => navigateTo('detail', item.id)}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* 2. REPORT LOST VIEW */}
          {currentRoute === 'report-lost' && (
            <ReportForm
              type="lost"
              onAddItem={handleAddItem}
              onNavigateBack={() => navigateTo('home')}
              onNavigateToBrowse={() => navigateTo('browse')}
              onNavigateToItem={(id) => navigateTo('detail', id)}
            />
          )}

          {/* 3. REPORT FOUND VIEW */}
          {currentRoute === 'report-found' && (
            <ReportForm
              type="found"
              onAddItem={handleAddItem}
              onNavigateBack={() => navigateTo('home')}
              onNavigateToBrowse={() => navigateTo('browse')}
              onNavigateToItem={(id) => navigateTo('detail', id)}
            />
          )}

          {/* 4. BROWSE ITEMS VIEW */}
          {currentRoute === 'browse' && (
            <BrowseView
              items={browseFilteredItems}
              totalCount={items.length}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeTypeFilter={activeTypeFilter}
              setActiveTypeFilter={setActiveTypeFilter}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onSelectItem={(id) => navigateTo('detail', id)}
            />
          )}

          {/* 5. ITEM DETAIL VIEW */}
          {currentRoute === 'detail' && selectedItem && (
            <DetailView
              item={selectedItem}
              allItems={items}
              onBack={() => navigateTo('browse')}
              onSelectItem={(id) => navigateTo('detail', id)}
              onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            />
          )}
        </main>

        {/* Persistent Bottom Mobile Dock */}
        <BottomDock currentRoute={currentRoute} navigateTo={navigateTo} />

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 text-center py-6 px-4 text-xs border-t border-slate-800 mt-auto">
          <div className="flex items-center justify-center gap-1.5 text-slate-200 font-bold mb-1">
            <span>ReturnIt 🔍</span>
          </div>
          <p className="text-slate-300 font-medium">Connecting people with their belongings</p>
          <p className="text-slate-500 text-[11px] mt-1">
            For schools, hospitals &amp; public transport facilities
          </p>
          <div className="flex justify-center gap-3 mt-3 text-[11px] text-slate-400">
            <button
              onClick={() => navigateTo('browse')}
              className="hover:underline hover:text-slate-200 cursor-pointer"
            >
              Directory
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('report-lost')}
              className="hover:underline hover:text-slate-200 cursor-pointer"
            >
              Lost Reports
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('report-found')}
              className="hover:underline hover:text-slate-200 cursor-pointer"
            >
              Found Reports
            </button>
          </div>
        </footer>

        {/* API Key Modal */}
        <ApiKeyModal
          isOpen={isApiKeyModalOpen}
          onClose={() => setIsApiKeyModalOpen(false)}
        />
      </div>
    </div>
  );
}
