import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Layers, 
  ArrowUpRight, 
  FileSpreadsheet, 
  Info, 
  Sparkles,
  BookOpen,
  X,
  CreditCard,
  Building,
  Check,
  ChevronLeft
} from 'lucide-react';
import { ServiceCard, AutonomyLevel } from '../types';
import { formatPriceRial, formatPriceToman, toPersianDigits } from '../utils/formatters';

interface ModuleKnowledgeBaseProps {
  services: ServiceCard[];
  onOpenInAssistant: (service: ServiceCard) => void;
  onOpenMissingDocsSlip: (service: ServiceCard) => void;
  tariffVersion: string;
}

export const ModuleKnowledgeBase: React.FC<ModuleKnowledgeBaseProps> = ({
  services,
  onOpenInAssistant,
  onOpenMissingDocsSlip,
  tariffVersion
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAutonomy, setSelectedAutonomy] = useState<string>('all');
  const [onlyMultiSystem, setOnlyMultiSystem] = useState<boolean>(false);
  const [activeCardModal, setActiveCardModal] = useState<ServiceCard | null>(null);

  const categories = [
    { id: 'all', label: 'همه خدمات' },
    { id: 'judiciary', label: 'قضایی و انتظامی' },
    { id: 'vehicle', label: 'خودرو و راهور' },
    { id: 'social_security', label: 'تأمین اجتماعی و کارگری' },
    { id: 'tax', label: 'مالیاتی و اصناف' },
    { id: 'banking', label: 'بانکی و وام' },
    { id: 'housing', label: 'مسکن و خودنویس' },
    { id: 'education', label: 'دانشگاهی و کتب' },
    { id: 'general', label: 'عمومی و سجام' },
  ];

  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchSearch =
        srv.name.includes(searchTerm) ||
        srv.primarySystem.includes(searchTerm) ||
        srv.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.description.includes(searchTerm);

      const matchCategory = selectedCategory === 'all' || srv.category === selectedCategory;
      const matchAutonomy = selectedAutonomy === 'all' || srv.autonomyLevel === selectedAutonomy;
      const matchMultiSystem = !onlyMultiSystem || srv.externalFees.length > 0;

      return matchSearch && matchCategory && matchAutonomy && matchMultiSystem;
    });
  }, [services, searchTerm, selectedCategory, selectedAutonomy, onlyMultiSystem]);

  const getAutonomyBadge = (level: AutonomyLevel) => {
    switch (level) {
      case 'green':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            سطح سبز: انجام مستقل با چک‌لیست
          </span>
        );
      case 'yellow':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            سطح زرد: انجام با تأیید سیستمی/چک‌لیست
          </span>
        );
      case 'red':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            سطح قرمز: ارجاع به کارفرما
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Version Header Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-900 border border-slate-700 p-5 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                نرخ‌نامه مصوب اتحادیه سال ۱۴۰۵
              </span>
              <span className="text-slate-400 text-xs">
                نسخه فعال: {toPersianDigits(tariffVersion)} | تاریخ اجرا: ۱۴۰۵/۰۶/۰۱
              </span>
            </div>
            <h2 className="text-xl font-black text-white">
              ماژول ۱: پایگاه دانش نسخه‌دار و شناسنامه خدمات (Service Cards)
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              کلیه خدمات اینترنتی، قضایی، مالیاتی، خودرو و رفاهی بدون خدمات چاپ. مجهز به تفکیک قیمت‌گذاری چندسامانه‌ای، واریزی‌های دولتی، مراحل گام‌به‌گام و کتابخانه رفع خطاهای رایج سامانه‌ها.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900/90 border border-slate-700 p-3 rounded-xl text-center min-w-[130px]">
              <div className="text-xs text-slate-400">کل خدمات بارگذاری‌شده</div>
              <div className="text-xl font-black text-amber-400 mt-0.5">
                {toPersianDigits(services.length)} <span className="text-xs font-normal text-slate-300">خدمت</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجوی نام خدمت، سامانه (عدل ایران، سخا، مای‌تکس، واتی...) یا کد خدمت..."
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                پاک کردن
              </button>
            )}
          </div>

          {/* Autonomy Level Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedAutonomy}
              onChange={(e) => setSelectedAutonomy(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">همه سطوح اختیار</option>
              <option value="green">🟢 سطح سبز (مستقل)</option>
              <option value="yellow">🟡 سطح زرد (با تایید سیستمی)</option>
              <option value="red">🔴 سطح قرمز (ارجاع به کارفرما)</option>
            </select>

            {/* Multi-system Toggle */}
            <button
              onClick={() => setOnlyMultiSystem(!onlyMultiSystem)}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm border transition-all ${
                onlyMultiSystem
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>خدمات چندسامانه‌ای (با استعلام واسط)</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => {
          const hasExternalFees = service.externalFees && service.externalFees.length > 0;
          return (
            <div
              key={service.id}
              className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-600 transition-all hover:shadow-xl group"
            >
              <div className="space-y-3">
                {/* Header & Badges */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700/60">
                    {service.code}
                  </span>
                  <div>{getAutonomyBadge(service.autonomyLevel)}</div>
                </div>

                {/* Service Name */}
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {service.name}
                </h3>

                {/* Primary System */}
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="text-slate-500">سامانه اصلی:</span>
                  <span className="text-slate-300 font-medium">{service.primarySystem}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>

                {/* Multi-system indicator */}
                {hasExternalFees && (
                  <div className="bg-indigo-950/40 border border-indigo-800/40 rounded-xl p-2.5 text-xs text-indigo-300">
                    <div className="font-semibold flex items-center gap-1.5 mb-1 text-indigo-200">
                      <Layers className="w-3.5 h-3.5" />
                      نیازمند استعلام و تسویه چندسامانه‌ای:
                    </div>
                    <div className="text-[11px] text-indigo-300/80">
                      {service.externalFees.map((f) => f.name).join(' • ')}
                    </div>
                  </div>
                )}
              </div>

              {/* Price & Action Footer */}
              <div className="mt-5 pt-4 border-t border-slate-700/70 space-y-3">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">تعرفه مصوب نرخ‌نامه ۱۴۰۵:</div>
                    <div className="text-base font-black text-amber-400">
                      {formatPriceToman(service.priceToman)}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      معادل {formatPriceRial(service.priceRial)}
                    </div>
                  </div>

                  <div className="text-left">
                    <span className="text-[11px] text-slate-400 block">گام‌های اجرایی:</span>
                    <span className="text-xs font-bold text-slate-300">
                      {toPersianDigits(service.steps.length)} مرحله استاندارد
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setActiveCardModal(service)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-700/80 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-sky-400" />
                    <span>شناسنامه خدمت</span>
                  </button>

                  <button
                    onClick={() => onOpenInAssistant(service)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>اجرا در میز خدمت</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16 bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl">
          <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-300">هیچ خدمتی با فیلترهای جاری یافت نشد</h4>
          <p className="text-xs text-slate-500 mt-1">
            عبارت جستجو را تغییر دهید یا فیلتر دسته‌بندی را روی «همه خدمات» بگذارید.
          </p>
        </div>
      )}

      {/* Service Card Detail Modal */}
      {activeCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {activeCardModal.code}
                  </span>
                  {getAutonomyBadge(activeCardModal.autonomyLevel)}
                  <span className="text-xs text-slate-400">
                    نسخه {toPersianDigits(activeCardModal.version)}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{activeCardModal.name}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span>سامانه رسمی: {activeCardModal.primarySystem}</span>
                  {activeCardModal.primarySystemUrl && (
                    <a
                      href={activeCardModal.primarySystemUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:underline flex items-center gap-0.5"
                    >
                      <span>ورود به سامانه</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <button
                onClick={() => setActiveCardModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 text-sm text-slate-300">
              {/* Pricing Breakdown Box */}
              <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" />
                  ساختار قیمت‌گذاری شفاف نرخ‌نامه ۱۴۰۵
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="text-xs text-slate-400 block">دستمزد مصوب اتحادیه برای کافی‌نت:</span>
                    <span className="text-lg font-black text-white">
                      {formatPriceToman(activeCardModal.priceToman)}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      ({formatPriceRial(activeCardModal.priceRial)})
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="text-xs text-slate-400 block">سطح مسئولیت و اختیار:</span>
                    <div className="mt-1">{getAutonomyBadge(activeCardModal.autonomyLevel)}</div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      مسیر ارجاع در استثناها: <strong>{activeCardModal.escalationRole}</strong>
                    </span>
                  </div>
                </div>

                {/* External Fees Table if any */}
                {activeCardModal.externalFees.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-700/80">
                    <h5 className="text-xs font-bold text-slate-300 mb-2">
                      واریزی‌ها و استعلام‌های چندسامانه‌ای مرتبط (جدا از دستمزد کافی‌نت):
                    </h5>
                    <div className="space-y-2">
                      {activeCardModal.externalFees.map((fee, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row sm:items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 gap-1"
                        >
                          <div>
                            <span className="font-semibold text-slate-200">{fee.name}</span>
                            <span className="text-slate-400 block text-[11px]">
                              سامانه: {fee.system} | {fee.description}
                            </span>
                          </div>
                          <div className="text-left font-mono text-amber-300 font-bold whitespace-nowrap">
                            {fee.amountToman > 0 ? formatPriceToman(fee.amountToman) : 'برحسب استعلام'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Required Documents & Prerequisites */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 border border-slate-700/70 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                      مدارک لازم از مراجعه‌کننده
                    </h4>
                    <button
                      onClick={() => onOpenMissingDocsSlip(activeCardModal)}
                      className="text-[11px] text-rose-400 hover:underline"
                    >
                      صدور برگه کسری مدارک
                    </button>
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    {activeCardModal.requiredDocuments.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/70 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    پیش‌نیازها و پیش‌شرط‌های قانونی
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    {activeCardModal.prerequisites.map((pre, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></div>
                        <span>{pre}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step-by-step Procedures */}
              <div className="bg-slate-800/50 border border-slate-700/70 p-4 rounded-xl">
                <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-1.5">
                  <ChevronLeft className="w-4 h-4 text-amber-400" />
                  مراحل گام‌به‌گام انجام خدمت در سامانه‌ها
                </h4>
                <div className="space-y-3">
                  {activeCardModal.steps.map((st) => (
                    <div
                      key={st.stepNumber}
                      className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800"
                    >
                      <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold flex items-center justify-center shrink-0">
                        {toPersianDigits(st.stepNumber)}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">{st.title}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{st.system}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{st.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Errors & Solutions */}
              {activeCardModal.commonErrors.length > 0 && (
                <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-rose-300 mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    کتابخانه خطاهای رایج سامانه و راه حل عملیاتی
                  </h4>
                  <div className="space-y-3">
                    {activeCardModal.commonErrors.map((err, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900/80 p-3 rounded-xl border border-rose-900/50 space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between text-rose-300 font-bold">
                          <span>{err.errorTitle}</span>
                          {err.errorCode && (
                            <span className="font-mono text-[10px] bg-rose-950 px-2 py-0.5 rounded text-rose-400">
                              {err.errorCode}
                            </span>
                          )}
                        </div>
                        <div className="text-slate-400">
                          <strong>علت ریشه‌ای:</strong> {err.rootCause}
                        </div>
                        <div className="text-emerald-400 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
                          <strong>راه حل و اقدام پرسنل:</strong> {err.solution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Escalation Policy */}
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong>دستورالعمل استثنا و ارجاع قرمز:</strong> {activeCardModal.escalationCondition}
                  <div className="text-slate-400 mt-0.5">
                    در صورت برخورد با این حالت، از تصمیم خودسرانه پرهیز کرده و تیکت ارجاع به {activeCardModal.escalationRole} ثبت کنید.
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveCardModal(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                بستن پنجره
              </button>
              <button
                onClick={() => {
                  const srv = activeCardModal;
                  setActiveCardModal(null);
                  onOpenInAssistant(srv);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/20"
              >
                انتقال به میز خدمت دستیار هوشمند
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
