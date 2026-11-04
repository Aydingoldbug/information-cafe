import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Users, 
  AlertTriangle, 
  DollarSign, 
  FileEdit, 
  Sparkles, 
  MessageSquare, 
  ThumbsUp,
  Send,
  Plus,
  RefreshCw,
  Bell
} from 'lucide-react';
import { EscalationTicket, ServiceCard } from '../types';
import { toPersianDigits, formatPriceToman, formatPriceRial } from '../utils/formatters';

interface ModuleDashboardProps {
  escalationTickets: EscalationTicket[];
  onResolveTicket: (ticketId: string, response: string) => void;
  services: ServiceCard[];
  onUpdateTariffPrice: (serviceId: string, newPriceToman: number) => void;
  tariffVersion: string;
}

export const ModuleDashboard: React.FC<ModuleDashboardProps> = ({
  escalationTickets,
  onResolveTicket,
  services,
  onUpdateTariffPrice,
  tariffVersion
}) => {
  const [selectedTicket, setSelectedTicket] = useState<EscalationTicket | null>(null);
  const [managerReply, setManagerReply] = useState<string>('');
  const [editingServiceId, setEditingServiceId] = useState<string>('');
  const [editingPriceInput, setEditingPriceInput] = useState<number>(0);
  const [showTariffSuccessAlert, setShowTariffSuccessAlert] = useState<boolean>(false);

  const pendingTickets = escalationTickets.filter((t) => t.status === 'pending');
  const resolvedTickets = escalationTickets.filter((t) => t.status === 'resolved');

  const handleOpenResolve = (t: EscalationTicket) => {
    setSelectedTicket(t);
    setManagerReply('');
  };

  const handleConfirmResolve = () => {
    if (!selectedTicket) return;
    onResolveTicket(selectedTicket.id, managerReply.trim() || 'با هماهنگی کارفرما مسأله حل شد.');
    setSelectedTicket(null);
  };

  const handleSaveTariffEdit = () => {
    if (!editingServiceId || editingPriceInput <= 0) return;
    onUpdateTariffPrice(editingServiceId, editingPriceInput);
    setEditingServiceId('');
    setShowTariffSuccessAlert(true);
    setTimeout(() => setShowTariffSuccessAlert(false), 5000);
  };

  // High-demand mock analytics
  const topServices = [
    { name: 'ثبت‌نام و احراز هویت ثنا', count: 48, revenue: '۱۴,۴۰۰,۰۰۰ تومان', rate: '۹۲٪ مستقل' },
    { name: 'نوبت‌دهی تعویض پلاک با تسویه', count: 35, revenue: '۷,۰۰۰,۰۰۰ تومان', rate: '۸۸٪ مستقل' },
    { name: 'اظهارنامه تبصره ۱۰۰', count: 29, revenue: '۱۳,۰۵۰,۰۰۰ تومان', rate: '۸۵٪ مستقل' },
    { name: 'ثبت عدم سوء پیشینه', count: 24, revenue: '۲,۸۸۰,۰۰۰ تومان', rate: '۹۶٪ مستقل' },
    { name: 'وام ازدواج و تسهیلات', count: 21, revenue: '۳,۱۵۰,۰۰۰ تومان', rate: '۸۹٪ مستقل' },
  ];

  const recurringErrors = [
    { title: 'خطای عدم تسویه مالیات واتی قبل از نوبت تعویض پلاک', freq: '۱۸ مرتبه', lesson: 'پیش‌نیازهای اجباری تعویض پلاک' },
    { title: 'ارسال تبصره ۱۰۰ با وجود تراکنش بانکی در پوز', freq: '۷ مرتبه', lesson: 'شرایط پذیرش تبصره ۱۰۰' },
    { title: 'رد احراز هویت تصویری ثنا به دلیل نور کم', freq: '۱۲ مرتبه', lesson: 'گام‌های حیاتی ثبت‌نام ثنا' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-900 border border-slate-700 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              میز کاربری کارفرما و مدیر دفتر
            </span>
            <span className="text-slate-400 text-xs">
              پایش بلادرنگ شاخص‌ها و تایید استثناها
            </span>
          </div>
          <h2 className="text-xl font-black text-white">
            ماژول ۷: داشبورد مدیریت، کارتابل استثناهای قرمز و بهبود مستمر
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            کارفرما از «پاسخ‌دهنده روزمره به سوالات تکراری» تبدیل به «مالک قواعد و تاییدکننده استثناها» می‌شود.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl flex items-center gap-4">
          <div className="text-center">
            <span className="text-xs text-slate-400 block">تیکت‌های منتظر پاسخ:</span>
            <span
              className={`text-xl font-black block mt-0.5 ${
                pendingTickets.length > 0 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'
              }`}
            >
              {toPersianDigits(pendingTickets.length)} استثنا
            </span>
          </div>
        </div>
      </div>

      {/* 6 Key Performance Indicators (KPIs) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl space-y-1">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>درصد استقلال پرسنل</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">۸۶.۴٪</div>
          <div className="text-[10px] text-slate-500">هدف پلتفرم: بالای ۸۰٪</div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl space-y-1">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>نرخ ارجاع به کارفرما</span>
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">۴.۸٪</div>
          <div className="text-[10px] text-slate-500">فقط در موارد قرمز قانونی</div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl space-y-1">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>نرخ اولین بار درست (FTR)</span>
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
          </div>
          <div className="text-2xl font-black text-sky-400 font-mono">۹۴.۲٪</div>
          <div className="text-[10px] text-slate-500">بدون نیاز به ویرایش یا برگشت</div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl space-y-1">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>میانگین زمان انجام خدمت</span>
            <Clock className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="text-2xl font-black text-white font-mono">۷.۲ <span className="text-xs font-normal">دقیقه</span></div>
          <div className="text-[10px] text-slate-500">کاهش ۴۰٪ زمان معطلی</div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl space-y-1">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>رضایت مراجعین (CSAT)</span>
            <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">۴.۹ <span className="text-xs font-normal">از ۵</span></div>
          <div className="text-[10px] text-slate-500">بر پایه بازخورد پیامکی</div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl space-y-1">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>کل خدمات ثبت‌شده امروز</span>
            <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-400 font-mono">۱۶۷ <span className="text-xs font-normal">مورد</span></div>
          <div className="text-[10px] text-slate-500">مجموع شعب و باجه‌ها</div>
        </div>
      </div>

      {/* Main Grid: Manager Inbox & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Escalation Inbox */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/70 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-white">
                  کارتابل ارجاعات استثنا (تیکت‌های قرمز پرسنل)
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                {toPersianDigits(pendingTickets.length)} تیکت اقدام‌نشده
              </span>
            </div>

            {escalationTickets.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-400">
                هیچ استثنای قرمز یا اختلافی در حال حاضر ثبت نشده است. سیستم در استقلال کامل کار می‌کند.
              </div>
            ) : (
              <div className="space-y-3">
                {escalationTickets.map((t) => (
                  <div
                    key={t.id}
                    className={`p-4 rounded-xl border transition-all ${
                      t.status === 'pending'
                        ? 'bg-rose-950/20 border-rose-900/50 hover:border-rose-500'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                          {t.id}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                            t.status === 'pending'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {t.status === 'pending' ? 'در انتظار دستور کارفرما' : 'حل‌شده توسط کارفرما'}
                        </span>
                        <span className="text-xs text-amber-400 font-bold">{t.reason}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{t.createdAt}</span>
                    </div>

                    <div className="mt-2 space-y-1 text-xs">
                      <div className="text-slate-200">
                        خدمت: <strong>{t.serviceName}</strong> | مراجعه‌کننده:{' '}
                        <strong>{t.clientName}</strong> ({toPersianDigits(t.clientPhone)})
                      </div>
                      <div className="text-slate-400">
                        متصدی ثبت‌کننده: <strong>{t.operatorName}</strong> | سامانه: {t.systemName}
                      </div>
                      <p className="text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 mt-2 leading-relaxed">
                        <strong>شرح متصدی:</strong> {t.description}
                      </p>

                      {t.managerResponse && (
                        <div className="bg-emerald-950/30 border border-emerald-900/40 p-2.5 rounded-lg text-emerald-300 mt-2">
                          <strong>پاسخ و دستور کارفرما:</strong> {t.managerResponse}
                        </div>
                      )}
                    </div>

                    {t.status === 'pending' && (
                      <div className="mt-3 pt-2 border-t border-slate-800 flex justify-end">
                        <button
                          onClick={() => handleOpenResolve(t)}
                          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>ثبت دستور کارفرما و رفع استثنا</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recurring Errors & Suggested Micro-Lessons */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>خطاهای پرتکرار پرسنل → تبدیل هوشمند به درس‌های جدید</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              {recurringErrors.map((err, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-200">{err.title}</span>
                    <span className="text-slate-500 text-[11px] block">
                      دوره متناظر: <strong className="text-amber-300">{err.lesson}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-rose-400 font-bold bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/60 font-mono">
                      {err.freq}
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/60">
                      درس جبرانی فعال است
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: High Profit Services & Tariff Management */}
        <div className="space-y-5">
          {/* Top Services */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>پرمراجعه‌ترین و سودآورترین خدمات امروز</span>
            </h3>

            <div className="space-y-2 text-xs">
              {topServices.map((srv, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 space-y-1"
                >
                  <div className="flex justify-between items-center font-bold text-white">
                    <span>{srv.name}</span>
                    <span className="text-amber-400 font-mono">{toPersianDigits(srv.count)} بار</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 text-[11px]">
                    <span>درآمد دستمزد: {srv.revenue}</span>
                    <span className="text-emerald-400 font-semibold">{srv.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tariff Update & Broadcast Tool */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileEdit className="w-4 h-4 text-amber-400" />
                <span>مدیریت و اصلاح قیمت در نرخ‌نامه</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">نسخه {tariffVersion}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              با تغییر قیمت هر خدمت، نسخه جدید نرخ‌نامه صادر شده و به پرسنل اعلان آزمون کوتاه ارسال می‌گردد.
            </p>

            <div className="space-y-2 text-xs">
              <label className="text-slate-300 block">انتخاب خدمت جهت اصلاح نرخ:</label>
              <select
                value={editingServiceId}
                onChange={(e) => {
                  setEditingServiceId(e.target.value);
                  const found = services.find((s) => s.id === e.target.value);
                  if (found) setEditingPriceInput(found.priceToman);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="">-- انتخاب خدمت --</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({formatPriceToman(s.priceToman)})
                  </option>
                ))}
              </select>

              {editingServiceId && (
                <div className="space-y-2 pt-2">
                  <label className="text-slate-300 block">تعرفه جدید به تومان:</label>
                  <input
                    type="number"
                    value={editingPriceInput}
                    onChange={(e) => setEditingPriceInput(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                  <div className="text-[11px] text-slate-500">
                    معادل ریالی: {formatPriceRial(editingPriceInput * 10)}
                  </div>
                  <button
                    onClick={handleSaveTariffEdit}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>به‌روزرسانی رسمی نرخ‌نامه و صدور اعلان آزمون</span>
                  </button>
                </div>
              )}

              {showTariffSuccessAlert && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs">
                  ✅ نرخ‌نامه به نسخه جدید ارتقا یافت و هشدار آزمون برای پرسنل فعال شد.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resolve Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>پاسخ کارفرما به تیکت {selectedTicket.id}</span>
              </h3>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                بستن
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div>خدمت: <strong>{selectedTicket.serviceName}</strong></div>
              <div>مشتری: <strong>{selectedTicket.clientName}</strong> ({toPersianDigits(selectedTicket.clientPhone)})</div>
              <div>شرح مسأله: {selectedTicket.description}</div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="text-slate-300 block font-bold">دستور کارفرما برای پرسنل و متقاضی:</label>
              <textarea
                value={managerReply}
                onChange={(e) => setManagerReply(e.target.value)}
                placeholder="مثال: با تخفیف ۵۰ هزار تومانی خدمت تایید شد؛ یا مدارک طبق بند ۲ تحویل کارفرما گردد..."
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                انصراف
              </button>
              <button
                onClick={handleConfirmResolve}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ثبت دستور و مختومه کردن استثنا</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
