import React, { useState } from 'react';
import { Item, ItemType, Category } from '../types';
import { CATEGORIES } from '../mockData';
import { ArrowLeft, CheckCircle2, HeartHandshake, MapPin, Send, AlertCircle, FileText, Compass, RotateCcw } from 'lucide-react';

interface ReportFormProps {
  type: ItemType;
  onAddItem: (newItem: Item) => void;
  onNavigateBack: () => void;
  onNavigateToBrowse: () => void;
  onNavigateToItem: (id: string) => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({
  type,
  onAddItem,
  onNavigateBack,
  onNavigateToBrowse,
  onNavigateToItem,
}) => {
  const isLost = type === 'lost';
  const pageTitle = isLost ? 'Report a Lost Item' : 'Report a Found Item';
  const submitBtnText = isLost ? 'Submit Lost Report' : 'Submit Found Report';

  const [formData, setFormData] = useState({
    title: '',
    category: 'Wallet' as Category,
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    name: '',
    email: '',
    phone: '',
  });

  const [submittedItem, setSubmittedItem] = useState<Item | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Item title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.date.trim()) newErrors.date = 'Date is required';
    if (!formData.name.trim()) newErrors.name = 'Your name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Contact phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newItem: Item = {
      id: `item-${Date.now()}`,
      type,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      location: formData.location.trim(),
      date: formData.date,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      status: 'active',
      postedAt: new Date().toISOString(),
    };

    onAddItem(newItem);
    setSubmittedItem(newItem);
  };

  // SUCCESS CONFIRMATION SCREEN
  if (submittedItem) {
    return (
      <div className="p-5 text-center space-y-5 animate-in fade-in duration-200">
        <div
          className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-lg ${
            isLost
              ? 'bg-red-100 text-[#dc2626] border border-red-200'
              : 'bg-green-100 text-[#16a34a] border border-green-200'
          }`}
        >
          {isLost ? (
            <CheckCircle2 className="w-8 h-8" />
          ) : (
            <HeartHandshake className="w-8 h-8" />
          )}
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-1">
            Report Successfully Filed!
          </h2>
          <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
            {isLost
              ? "Your lost item report is live. Our AI matching system is actively comparing it against newly discovered belongings."
              : 'Thank you for reporting this found property! We are matching it against owner reports right away.'}
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Record ID:</span>
            <span className="font-mono font-bold text-slate-800">{submittedItem.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Item Title:</span>
            <span className="font-semibold text-slate-800 line-clamp-1">{submittedItem.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Classification:</span>
            <span
              className={`font-bold capitalize ${
                isLost ? 'text-[#dc2626]' : 'text-[#16a34a]'
              }`}
            >
              {submittedItem.type} ({submittedItem.category})
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Location:</span>
            <span className="font-medium text-slate-700 line-clamp-1">{submittedItem.location}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            id="btn-view-item-detail"
            onClick={() => onNavigateToItem(submittedItem.id)}
            className="w-full bg-[#1e3a5f] hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" /> View Your Item &amp; AI Matches
          </button>

          <button
            id="btn-browse-all-redirect"
            onClick={onNavigateToBrowse}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-semibold text-xs border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-4 h-4" /> Browse All Reported Items
          </button>

          <button
            onClick={() => {
              setSubmittedItem(null);
              setFormData({
                title: '',
                category: 'Wallet',
                description: '',
                location: '',
                date: new Date().toISOString().split('T')[0],
                name: '',
                email: '',
                phone: '',
              });
            }}
            className="text-xs text-blue-600 font-semibold py-1.5 hover:underline flex items-center justify-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Submit another report
          </button>
        </div>
      </div>
    );
  }

  // FORM INPUT SCREEN
  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex items-center gap-3">
        <button
          id="btn-report-back"
          onClick={onNavigateBack}
          className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Back to previous screen"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black text-slate-900 tracking-tight">{pageTitle}</h1>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                isLost ? 'bg-red-100 text-[#dc2626]' : 'bg-green-100 text-[#16a34a]'
              }`}
            >
              {type}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            All fields are required to guarantee accurate AI matching
          </p>
        </div>
      </div>

      {/* Main form */}
      <form
        id="report-lost-found-form"
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3.5"
      >
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Item Title <span className="text-red-500">*</span>
          </label>
          <input
            id="form-input-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={
              isLost ? 'e.g., Brown Coach Leather Wallet' : 'e.g., AirPods Pro in White Case'
            }
            className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 bg-slate-50/50 transition-all ${
              errors.title
                ? 'border-red-500 focus:ring-red-400'
                : 'border-slate-300 focus:ring-blue-500'
            }`}
          />
          {errors.title && (
            <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.title}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="form-select-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-slate-800"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Description (3 rows) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Description (3 rows) <span className="text-red-500">*</span>
          </label>
          <textarea
            id="form-textarea-description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Include color, brand, distinct marks, serial stickers, scratches, or interior contents..."
            className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 bg-slate-50/50 resize-none leading-relaxed transition-all ${
              errors.description
                ? 'border-red-500 focus:ring-red-400'
                : 'border-slate-300 focus:ring-blue-500'
            }`}
          />
          {errors.description && (
            <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.description}
            </p>
          )}
        </div>

        {/* Location & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isLost ? 'Location Lost' : 'Location Found'} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="form-input-location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Science Hall 2nd Floor, Bus #42"
                className={`w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 bg-slate-50/50 transition-all ${
                  errors.location
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-slate-300 focus:ring-blue-500'
                }`}
              />
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>
            {errors.location && (
              <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.location}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isLost ? 'Date Lost' : 'Date Found'} <span className="text-red-500">*</span>
            </label>
            <input
              id="form-input-date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 bg-white transition-all ${
                errors.date
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-slate-300 focus:ring-blue-500'
              }`}
            />
            {errors.date && (
              <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.date}
              </p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-800 mb-2">
            Reporter Contact Information
          </h4>

          <div className="space-y-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="form-input-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Jordan Miller"
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 bg-slate-50/50 transition-all ${
                  errors.name
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-slate-300 focus:ring-blue-500'
                }`}
              />
              {errors.name && (
                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="form-input-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 bg-slate-50/50 transition-all ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-slate-300 focus:ring-blue-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="form-input-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 bg-slate-50/50 transition-all ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-slate-300 focus:ring-blue-500'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            id="form-submit-btn"
            type="submit"
            className={`w-full py-3.5 rounded-xl font-bold text-xs text-white shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer ${
              isLost
                ? 'bg-[#dc2626] hover:bg-red-700'
                : 'bg-[#16a34a] hover:bg-green-700'
            }`}
          >
            <Send className="w-4 h-4" />
            {submitBtnText}
          </button>
        </div>
      </form>
    </div>
  );
};
