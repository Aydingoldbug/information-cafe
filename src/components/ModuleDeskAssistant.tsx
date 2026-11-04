import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Receipt, 
  Layers, 
  ExternalLink, 
  Lock, 
  Send, 
  Printer, 
  FileCheck2,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { ServiceCard, CustomerInvoice, EscalationTicket } from '../types';
import { formatPriceRial, formatPriceToman, toPersianDigits, getTodayPersianDate } from '../utils/formatters';

interface ModuleDeskAssistantProps {
  services: ServiceCard[];
  activeService: ServiceCard | null;
  onSelectService: (service: ServiceCard) => void;
  onGenerateInvoice: (invoice: CustomerInvoice) => void;
  onCreateEscalation: (ticket: EscalationTicket) => void;
  onOpenMissingDocsSlip: (service: ServiceCard) => void;
  operatorName: string;
}

export const ModuleDeskAssistant: React.FC<ModuleDeskAssistantProps> = ({
  services,
  activeService,
  onSelectService,
  onGenerateInvoice,
  onCreateEscalation,
  onOpenMissingDocsSlip,
  operatorName
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [selectedExternalFees, setSelectedExternalFees] = useState<Record<string, boolean>>({});
  const [selectedErrorSolution, setSelectedErrorSolution] = useState<string | null>(null);

  // Escalation Modal
  const [showEscalateModal, setShowEscalateModal] = useState<boolean>(false);
  const [escalateReason, setEscalateReason] = useState<EscalationTicket['reason']>('خطای سامانه');
  const [escalateDesc, setEscalateDesc] = useState('');

  const currentService = activeService || services[0];

  // Calculate live total
  const baseToman = currentService ? currentService.priceToman : 0;
  const externalFeesTotalToman = currentService?.externalFees.reduce((sum, fee) => {
    if (selectedExternalFees[fee.name] || fee.isMandatory) {
      return sum + fee.amountToman;
    }
    return sum;
  }, 0) || 0;

  const totalToman = baseToman + externalFeesTotalToman;
  const totalRial = totalToman * 10;

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => ({ ...prev, [doc]: !prev[doc] }));
  };

  const toggleStep = (stepNum: number) => {
    setCheckedSteps((prev) => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  const toggleExternalFee = (name: string) => {
    setSelectedExternalFees((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleOpenInvoice = () => {
    if (!currentService) return;

    const externalFeesList = currentService.externalFees
      .filter((fee) => fee.isMandatory || selectedExternalFees[fee.name])
      .map((fee) => ({
        name: fee.name,
        amountToman: fee.amountToman
      }));

    const newInvoice: CustomerInvoice = {
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      date: getTodayPersianDate(),
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      clientName: clientName.trim() || 'مراجعه‌کننده محترم',
      clientPhone: clientPhone.trim() || '---',
      nationalCode: nationalCode.trim() || '---',
      serviceName: currentService.name,
      serviceFeeRial: currentService.priceRial,
      serviceFeeToman: currentService.priceToman,
      externalFees: externalFeesList,
      totalToman: totalToman,
      operatorName: operatorName
    };

    onGenerateInvoice(newInvoice);
  };

  const handleSubmitEscalation = () => {
    if (!currentService) return;

    const newTicket: EscalationTicket = {
      id: `TCK-${Date.now().toString().slice(-5)}`,
      serviceId: currentService.id,
      serviceName: currentService.name,
      clientName: clientName || 'مراجعه‌کننده ناشناس',
      clientPhone: clientPhone || 'ثبت‌نشده',
      createdAt: `${getTodayPersianDate()} - ${new Date().toLocaleTimeString('fa-IR')}`,
      operatorName: operatorName,
      reason: escalateReason,
      description: escalateDesc.trim() || 'بدون شرح تفصیلی',
      systemName: currentService.primarySystem,
      status: 'pending'
    };

    onCreateEscalation(newTicket);
    setShowEscalateModal(false);
    setEscalateDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner with Security Oath */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-900 border border-slate-700 p-5 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              دستیار عملیاتی پاسخگویی زنده
            </span>
            <span className="text-slate-400 text-xs">متصدی میز: {operatorName}</span>
          </div>
          <h2 className="text-xl font-black text-white">ماژول ۴: دستیار هوشمند لحظه‌ای میز خدمت کافی‌نت</h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            محاسبه‌گر خودکار قیمت‌های چندسامانه‌ای، چک‌لیست هوشمند مدارک، گام‌به‌گام تصویری و صدور آنی فاکتور رسمی یا تیکت ارجاع قرمز به کارفرما.
          </p>
        </div>

        {/* Security Oath Pill */}
        <div className="bg-slate-900/90 border border-slate-700 p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-white block">حفظ امنیت و محرمانگی</span>
            <span className="text-slate-400 text-[11px]">عدم ذخیره هرگونه رمز یا کارت مشتری</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Client Dossier & Service Quick Picker */}
        <div className="space-y-5">
          {/* Quick Service Picker */}
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-3">
            <label className="text-xs font-bold text-white block flex items-center justify-between">
              <span>انتخاب خدمت جاری:</span>
              <span className="text-[11px] text-amber-400 font-normal">
                {toPersianDigits(services.length)} خدمت مصوب
              </span>
            </label>

            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی سریع خدمت..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1 scrollbar-thin">
              {services
                .filter(
                  (s) =>
                    s.name.includes(searchQuery) ||
                    s.primarySystem.includes(searchQuery) ||
                    s.code.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, 15)
                .map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => onSelectService(srv)}
                    className={`w-full text-right p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                      currentService?.id === srv.id
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-700/60'
                    }`}
                  >
                    <span className="truncate max-w-[200px]">{srv.name}</span>
                    <span className="text-[10px] font-mono shrink-0">
                      {formatPriceToman(srv.priceToman)}
                    </span>
                  </button>
                ))}
            </div>
          </div>

          {/* Client Info Form */}
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-amber-400" />
              اطلاعات مراجعه‌کننده جهت صدور رسید:
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">نام و نام خانوادگی مشتری:</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="مثال: محمد حسینی"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">شماره همراه متقاضی (جهت پیامک):</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="0912..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">کد ملی (اختیاری):</label>
                <input
                  type="text"
                  value={nationalCode}
                  onChange={(e) => setNationalCode(e.target.value)}
                  placeholder="00..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Quick Action: Document Shortfall Slip */}
          <button
            onClick={() => currentService && onOpenMissingDocsSlip(currentService)}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold border border-rose-500/40 bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>صدور فوری برگه کسری مدارک به مشتری</span>
          </button>
        </div>

        {/* Center & Right Column: Interactive Runner */}
        <div className="lg:col-span-2 space-y-5">
          {currentService && (
            <>
              {/* Active Service Summary Card */}
              <div className="bg-slate-800/90 border border-slate-700/80 p-5 rounded-2xl space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
                        {currentService.code}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          currentService.autonomyLevel === 'green'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : currentService.autonomyLevel === 'yellow'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {currentService.autonomyLevel === 'green'
                          ? 'سطح سبز: مستقل'
                          : currentService.autonomyLevel === 'yellow'
                          ? 'سطح زرد: با تایید'
                          : 'سطح قرمز: ارجاع به کارفرما'}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white mt-1">{currentService.name}</h3>
                  </div>

                  <div className="text-left bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">دستمزد مصوب نرخ‌نامه:</span>
                    <span className="text-base font-black text-amber-400">
                      {formatPriceToman(currentService.priceToman)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      ({formatPriceRial(currentService.priceRial)})
                    </span>
                  </div>
                </div>

                {/* Live Document Checklist */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-400" />
                      چک‌لیست مدارک الزامی قبل از ورود به سامانه:
                    </span>
                    <span className="text-[11px] text-slate-400">
                      تیک بزنید تا از کسری مدارک جلوگیری شود
                    </span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentService.requiredDocuments.map((doc, idx) => (
                      <label
                        key={idx}
                        className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 cursor-pointer transition-all ${
                          checkedDocs[doc]
                            ? 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200'
                            : 'bg-slate-900/80 border-slate-700/70 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(checkedDocs[doc])}
                          onChange={() => toggleDoc(doc)}
                          className="w-4 h-4 rounded text-amber-500 focus:ring-0 bg-slate-900 border-slate-600"
                        />
                        <span className="leading-snug">{doc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Multi-System External Fees Calculator */}
                {currentService.externalFees.length > 0 && (
                  <div className="bg-indigo-950/20 border border-indigo-900/50 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                        <Layers className="w-4 h-4" />
                        هزینه‌ها و استعلام‌های چندسامانه‌ای واسط (دولتی):
                      </h4>
                      <span className="text-[11px] text-indigo-400">
                        به پیش‌فاکتور مشتری افزوده می‌شود
                      </span>
                    </div>

                    <div className="space-y-2">
                      {currentService.externalFees.map((fee, idx) => {
                        const isChecked = Boolean(selectedExternalFees[fee.name]) || fee.isMandatory;
                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                              isChecked
                                ? 'bg-indigo-900/30 border-indigo-600/50 text-indigo-200'
                                : 'bg-slate-900/80 border-slate-800 text-slate-400'
                            }`}
                          >
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                disabled={fee.isMandatory}
                                onChange={() => toggleExternalFee(fee.name)}
                                className="w-4 h-4 rounded text-indigo-500 focus:ring-0 bg-slate-900 border-slate-700"
                              />
                              <div>
                                <span className="font-semibold block">{fee.name}</span>
                                <span className="text-[11px] text-slate-400">{fee.description}</span>
                              </div>
                            </label>

                            <div className="text-left font-mono font-bold text-amber-300 shrink-0">
                              {fee.amountToman > 0 ? formatPriceToman(fee.amountToman) : 'متغیر'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Live Step-by-Step Procedure */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center justify-between">
                    <span>مراحل اجرای خدمت در سامانه‌ها:</span>
                    <a
                      href={currentService.primarySystemUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:underline flex items-center gap-1 text-xs"
                    >
                      <span>باز کردن {currentService.primarySystem}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </h4>

                  <div className="space-y-2">
                    {currentService.steps.map((st) => (
                      <div
                        key={st.stepNumber}
                        onClick={() => toggleStep(st.stepNumber)}
                        className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-3 ${
                          checkedSteps[st.stepNumber]
                            ? 'bg-slate-900/40 border-slate-800 text-slate-500 line-through'
                            : 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-slate-500'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5 ${
                            checkedSteps[st.stepNumber]
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {checkedSteps[st.stepNumber] ? '✓' : toPersianDigits(st.stepNumber)}
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold">{st.title}</span>
                            <span className="text-[10px] font-mono text-slate-400">{st.system}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {st.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Error Troubleshooting Helper */}
                {currentService.commonErrors.length > 0 && (
                  <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        راهنمای رفع خطای فوری حین کار:
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        انتخاب خطای مشاهده‌شده در سیستم
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {currentService.commonErrors.map((err, i) => (
                        <button
                          key={i}
                          onClick={() =>
                            setSelectedErrorSolution(
                              selectedErrorSolution === err.solution ? null : err.solution
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg border text-[11px] transition-colors ${
                            selectedErrorSolution === err.solution
                              ? 'bg-rose-500 text-white border-rose-400 font-bold'
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          {err.errorTitle}
                        </button>
                      ))}
                    </div>

                    {selectedErrorSolution && (
                      <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-lg text-emerald-300 mt-2 text-xs leading-relaxed">
                        <strong>راه حل فوری برای پرسنل:</strong> {selectedErrorSolution}
                      </div>
                    )}
                  </div>
                )}

                {/* Live Checkout & Actions Footer */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block">مجموع کل قابل دریافت از مشتری:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-amber-400">
                        {formatPriceToman(totalToman)}
                      </span>
                      <span className="text-xs text-slate-500">
                        ({formatPriceRial(totalRial)})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowEscalateModal(true)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-950/40 hover:bg-rose-950/80 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      <span>ارجاع قرمز به کارفرما</span>
                    </button>

                    <button
                      onClick={handleOpenInvoice}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors shadow-lg shadow-amber-500/20"
                    >
                      <Printer className="w-4 h-4" />
                      <span>صدور فاکتور رسمی مشتری (HTML)</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Red Escalation Modal */}
      {showEscalateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-rose-900/60 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>ثبت تیکت ارجاع استثنا به کارفرما (سطح قرمز)</span>
              </div>
              <button
                onClick={() => setShowEscalateModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                انصراف
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">دلیل اصلی ارجاع به کارفرما:</label>
                <select
                  value={escalateReason}
                  onChange={(e) => setEscalateReason(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                >
                  <option value="خطای سامانه">خطای غیرعادی سامانه دولتی</option>
                  <option value="اختلاف مالی">اختلاف مالی و اعتراض به نرخ‌نامه</option>
                  <option value="مدارک ناقص یا مشکوک">مدارک ناقص، مخدوش یا متقاضی غایب</option>
                  <option value="تصمیم حقوقی">تصمیم حقوقی و تعهدات قراردادی خاص</option>
                  <option value="شکایت مشتری">شکایت یا ادعای خسارت مشتری</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">توضیحات و شرح واقعه برای کارفرما:</label>
                <textarea
                  value={escalateDesc}
                  onChange={(e) => setEscalateDesc(e.target.value)}
                  placeholder="شرح دقیق مشکل، واکنش مشتری یا شماره پیگیری خطا..."
                  rows={4}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                ></textarea>
              </div>

              <div className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-xl text-slate-300 space-y-1 text-[11px]">
                <p>
                  • این تیکت بلافاصله در داشبورد کارفرما با هشدار صوتی و بصری ثبت می‌شود.
                </p>
                <p>• از درگیری لفظی با مشتری خودداری نموده و او را به مدیریت راهنمایی کنید.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowEscalateModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                لغو
              </button>
              <button
                onClick={handleSubmitEscalation}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ارسال تیکت به کارتابل کارفرما</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
