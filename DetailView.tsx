// AI Matching powered by Google Gemini API
// Compares lost vs found items and returns top 3 matches

import React, { useState } from 'react';
import { Item, AiMatchResult } from '../types';
import { findAiMatches } from '../aiService';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Tag,
  Mail,
  Phone,
  User,
  Copy,
  Check,
  Sparkles,
  Bot,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Loader2,
} from 'lucide-react';

interface DetailViewProps {
  item: Item;
  allItems: Item[];
  onBack: () => void;
  onSelectItem: (id: string) => void;
  onOpenApiKeyModal: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
  item,
  allItems,
  onBack,
  onSelectItem,
  onOpenApiKeyModal,
}) => {
  const isLost = item.type === 'lost';
  const [copiedContact, setCopiedContact] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matchResults, setMatchResults] = useState<AiMatchResult[] | null>(null);
  const [matchSource, setMatchSource] = useState<'gemini' | 'heuristic' | null>(null);
  const [showAiSection, setShowAiSection] = useState(false);

  const handleCopyContact = () => {
    const contactText = `${item.name} | ${item.email} | ${item.phone || 'No phone'}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(contactText);
      setCopiedContact(true);
      setTimeout(() => setCopiedContact(false), 2000);
    }
  };

  const handleTriggerAiMatch = async () => {
    if (showAiSection && matchResults) {
      // Toggle off if already showing
      setShowAiSection(false);
      return;
    }

    setIsMatching(true);
    setShowAiSection(true);
    try {
      const { matches, source } = await findAiMatches(item, allItems);
      setMatchResults(matches);
      setMatchSource(source);
    } catch (err) {
      console.error('Error finding matches', err);
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-200">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <button
          id="btn-detail-back"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to items
        </button>
        <span className="text-[11px] font-mono text-slate-400">ID: {item.id}</span>
      </div>

      {/* Primary Item Detail Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 relative overflow-hidden">
        {/* Top colored accent banner */}
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 ${
            isLost ? 'bg-[#dc2626]' : 'bg-[#16a34a]'
          }`}
        />

        {/* Badges */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isLost
                ? 'bg-red-100 text-[#dc2626] border border-red-200'
                : 'bg-green-100 text-[#16a34a] border border-green-200'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLost ? 'bg-[#dc2626] animate-pulse' : 'bg-[#16a34a]'
              }`}
            />
            {isLost ? 'Lost Item Report' : 'Found Item Report'}
          </span>

          <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 flex items-center gap-1">
            <Tag className="w-3 h-3 text-slate-400" />
            {item.category}
          </span>
        </div>

        {/* Item Title & Date */}
        <div>
          <h1 className="text-xl font-black text-slate-900 leading-snug">
            {item.title}
          </h1>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Reported incident date: <span className="font-semibold text-slate-600">{item.date}</span>
          </p>
        </div>

        {/* Full Description */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Full Description
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
            {item.description}
          </p>
        </div>

        {/* Location Box */}
        <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-blue-50/70 p-3.5 rounded-xl border border-blue-100">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">
              {isLost ? 'Last Known Location' : 'Discovery Location'}
            </span>
            <span className="text-slate-600 mt-0.5 block">{item.location}</span>
          </div>
        </div>

        {/* Reporter & Contact Info */}
        <div className="border-t border-slate-100 pt-3">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-blue-600" />
            Reporter &amp; Contact Details
          </h4>

          <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Full Name:</span>
              <span className="font-bold text-slate-800">{item.name}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Email Address:</span>
              <a
                href={`mailto:${item.email}`}
                className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Mail className="w-3 h-3" /> {item.email}
              </a>
            </div>

            {item.phone && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Phone Number:</span>
                <a
                  href={`tel:${item.phone}`}
                  className="font-semibold text-slate-800 hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-slate-500" /> {item.phone}
                </a>
              </div>
            )}

            <button
              id="btn-copy-contact"
              onClick={handleCopyContact}
              className="w-full mt-2 bg-white hover:bg-slate-100 text-slate-700 py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copiedContact ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-700">Contact Details Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Contact Information</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* PROMINENT AI MATCH BUTTON */}
        <div className="pt-2">
          <button
            id="btn-find-ai-matches"
            onClick={handleTriggerAiMatch}
            disabled={isMatching}
            className="w-full bg-[#2563eb] hover:bg-blue-700 active:scale-[0.99] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-blue-400/30 cursor-pointer disabled:opacity-75"
          >
            {isMatching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Belongings with Gemini AI...</span>
              </>
            ) : (
              <>
                <Bot className="w-5 h-5" />
                <span>{showAiSection ? 'Hide AI Matches' : '🤖 Find AI Matches'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI MATCHES ACCORDION / RESULTS CONTAINER */}
      {showAiSection && (
        <div
          id="ai-matches-container"
          className="space-y-3 pt-1 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AI Suggested Matches</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Top 3 candidates compared by physical attributes, category, location, and dates
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full inline-block">
                {matchSource === 'gemini' ? 'Gemini 2.5 AI' : 'Semantic Engine'}
              </span>
            </div>
          </div>

          {/* Loading state */}
          {isMatching && (
            <div className="bg-white p-6 rounded-xl border border-blue-200 text-center space-y-2">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-800">
                Cross-referencing lost and found inventory...
              </p>
              <p className="text-[11px] text-slate-500">
                Evaluating descriptive tokens, brand names, and timeline proximity
              </p>
            </div>
          )}

          {/* Match cards */}
          {!isMatching && matchResults && matchResults.length > 0 && (
            <div className="space-y-3">
              {matchResults.map((result, idx) => {
                const matchItem = result.matchedItem;
                const isMatchLost = matchItem.type === 'lost';

                return (
                  <div
                    key={result.itemId}
                    id={`ai-match-card-${idx}`}
                    className="bg-white rounded-xl p-4 border border-blue-200/90 shadow-sm hover:border-blue-400 transition-all space-y-2.5 relative"
                  >
                    {/* Header with tags and Match % */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            isMatchLost
                              ? 'bg-red-100 text-[#dc2626]'
                              : 'bg-green-100 text-[#16a34a]'
                          }`}
                        >
                          {matchItem.type}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded border border-slate-200">
                          {matchItem.category}
                        </span>
                      </div>

                      {/* Percentage Badge */}
                      <span
                        className={`text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs ${
                          result.matchPercentage >= 85
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : result.matchPercentage >= 70
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {result.matchPercentage}% Match
                      </span>
                    </div>

                    {/* Candidate Title & Description */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                        {matchItem.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                        {matchItem.description}
                      </p>
                    </div>

                    {/* AI Reasoning box */}
                    <div className="bg-blue-50/80 p-2.5 rounded-lg border border-blue-100 text-[11px] text-blue-950 leading-relaxed">
                      <span className="font-bold text-blue-900 block mb-0.5">
                        💡 Match Analysis:
                      </span>
                      {result.reason}
                    </div>

                    {/* Footer info & Inspect button */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <div className="truncate max-w-[170px] flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{matchItem.location}</span>
                      </div>

                      <button
                        id={`btn-inspect-match-${matchItem.id}`}
                        onClick={() => onSelectItem(matchItem.id)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-md text-xs flex items-center gap-1 transition-colors cursor-pointer border border-blue-200"
                      >
                        Inspect <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* If no matches found */}
          {!isMatching && matchResults && matchResults.length === 0 && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center text-xs text-slate-600">
              No matching counterpart items found in inventory right now. New submissions will be compared continuously.
            </div>
          )}

          {/* Quick API Key prompt note */}
          <div className="text-center pt-1">
            <button
              onClick={onOpenApiKeyModal}
              className="text-[11px] text-slate-400 hover:text-blue-700 underline inline-flex items-center gap-1 cursor-pointer"
            >
              Configure or change Gemini API key
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
