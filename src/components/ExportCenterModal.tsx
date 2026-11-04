import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  FileCode, 
  Share2, 
  Printer, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Server, 
  Copy,
  FolderArchive
} from 'lucide-react';
import { ServiceCard, EscalationTicket, PersonnelCertificate } from '../types';
import { toPersianDigits, formatPriceToman } from '../utils/formatters';

interface ExportCenterModalProps {
  services: ServiceCard[];
  escalationTickets: EscalationTicket[];
  certificates: PersonnelCertificate[];
  tariffVersion: string;
  onClose: () => void;
}

export const ExportCenterModal: React.FC<ExportCenterModalProps> = ({
  services,
  escalationTickets,
  certificates,
  tariffVersion,
  onClose
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'data' | 'system' | 'docs'>('data');

  const sharedAppUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-7pr3rdifhjcmu5usuip6sm-791363738652.europe-west2.run.app';
  const pdfUrl = '/assets/aistudio/____________________________1405_968ad2ba.pdf';

  // Export Tariffs as CSV (Excel compatible with UTF-8 BOM)
  const handleExportTariffsCsv = () => {
    const headers = ['ردیف', 'کد خدمت', 'عنوان خدمت', 'دسته‌بندی', 'سطح ریسک', 'نرخ مصوب (تومان)', 'نرخ مصوب (ریال)', 'زمان استاندارد (دقیقه)', 'مدارک الزامی', 'سامانه متصل'];
    const rows = services.map((s, idx) => [
      idx + 1,
      `"${s.id}"`,
      `"${s.title.replace(/"/g, '""')}"`,
      `"${s.category.replace(/"/g, '""')}"`,
      s.riskLevel === 'green' ? 'سبز (عادی)' : s.riskLevel === 'yellow' ? 'زرد (تطبیقی)' : 'قرمز (حاکمیتی)',
      s.priceToman,
      s.priceRial,
      s.standardTimeMinutes,
      `"${s.requiredDocs.join(' - ').replace(/"/g, '""')}"`,
      `"${s.systemPortal.replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `نرخنامه_کافینت_۱۴۰۵_نسخه_${tariffVersion.replace(/\./g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export Tariffs as JSON
  const handleExportTariffsJson = () => {
    const exportData = {
      title: 'بانک اطلاعات نرخ‌نامه مصوب سال ۱۴۰۵ دفاتر کافی‌نت و پیشخوان',
      version: tariffVersion,
      exportDate: new Date().toLocaleDateString('fa-IR'),
      totalServices: services.length,
      services: services
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `نرخنامه_کافینت_۱۴۰۵_نسخه_${tariffVersion.replace(/\./g, '_')}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export Escalation Tickets as CSV
  const handleExportTicketsCsv = () => {
    const headers = ['شناسه تیکت', 'عنوان خدمت', 'نام متقاضی', 'شماره تماس', 'تاریخ ثبت', 'کارشناس ثبت‌کننده', 'دلیل ارجاع', 'سامانه', 'وضعیت', 'پاسخ کارفرما'];
    const rows = escalationTickets.map((t) => [
      `"${t.id}"`,
      `"${t.serviceName.replace(/"/g, '""')}"`,
      `"${t.clientName.replace(/"/g, '""')}"`,
      `"${t.clientPhone}"`,
      `"${t.createdAt}"`,
      `"${t.operatorName}"`,
      `"${t.reason}"`,
      `"${t.systemName}"`,
      t.status === 'resolved' ? 'بررسی و حل شده' : 'در انتظار مدیر',
      `"${(t.managerResponse || '-').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `گزارش_ارجاعات_مدیریت_کافینت.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharedAppUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                مرکز خروجی‌ها و دریافت اطلاعات پلتفرم
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">
                  v{toPersianDigits(tariffVersion)}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                دریافت انواع خروجی‌های داده‌ای (اکسل/JSON)، نسخه چاپی PDF، فاکتورها، و کد سامانه
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-5 pt-3 pb-0 bg-slate-900/60 border-b border-slate-800 flex gap-2">
          <button
            onClick={() => setActiveTab('data')}
            className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'data'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            خروجی داده‌ها و نرخ‌نامه (Excel / JSON)
          </button>

          <button
            onClick={() => setActiveTab('docs')}
            className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'docs'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            PDF رسمی و اسناد چاپی
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'system'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-4 h-4" />
            خروجی کل نرم‌افزار و استقرار
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-5 flex-1 overflow-y-auto">

          {/* TAB 1: DATA EXPORTS */}
          {activeTab === 'data' && (
            <div className="space-y-4">
              {/* Excel / CSV Tariffs */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      خروجی اکسل کامل نرخ‌نامه سال ۱۴۰۵ (فایل CSV سازگار با Excel)
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      شامل عنوان کلیه {toPersianDigits(services.length)} خدمت، تعرفه به تومان و ریال، زمان استاندارد، مدارک لازم، دسته‌بندی و ریسک (کدگذاری UTF-8 با BOM برای عدم به‌هم‌ریختگی حروف فارسی).
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleExportTariffsCsv}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-2 shrink-0 transition-colors shadow-lg shadow-emerald-900/30"
                >
                  <Download className="w-4 h-4" />
                  دانلود اکسل (CSV)
                </button>
              </div>

              {/* JSON Tariffs */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                    <FileCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      خروجی استاندارد پایگاه داده نرخ‌نامه (JSON Data)
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      مناسب برای برنامه‌نویسان، اتصال به نرم‌افزارهای حسابداری یا ایمپورت در سایر سامانه‌ها همراه با فراداده‌های تفصیلی.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleExportTariffsJson}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center justify-center gap-2 shrink-0 transition-colors shadow-lg shadow-blue-900/30"
                >
                  <Download className="w-4 h-4" />
                  دانلود فایل JSON
                </button>
              </div>

              {/* Escalations Tickets CSV */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      خروجی گزارش ارجاعات و تیکت‌های کارفرما ({toPersianDigits(escalationTickets.length)} تیکت)
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      لیست گزارش خطاها، موارد حقوقی، تخفیفات و پاسخ‌های کارفرما به تفکیک پرسنل ثبت‌کننده در قالب اکسل.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleExportTicketsCsv}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs flex items-center justify-center gap-2 shrink-0 transition-colors shadow-lg shadow-purple-900/30"
                >
                  <Download className="w-4 h-4" />
                  دانلود گزارش اکسل
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PDF & PRINT DOCS */}
          {activeTab === 'docs' && (
            <div className="space-y-4">
              {/* Official Tariff PDF */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-amber-300">
                        سند مرجع ابلاغیه رسمی نرخ‌نامه سال ۱۴۰۵ (PDF اتحادیه)
                      </h4>
                      <span className="text-[10px] bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full font-semibold">
                        سند فیزیکی
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      فایل اصلی اسکن شده نرخ‌نامه مصوب سال ۱۴۰۵ صادر شده توسط اتحادیه فناوران و رسته کافی‌نت موجود در سامانه.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    مشاهده و پرینت PDF
                  </a>
                  <a
                    href={pdfUrl}
                    download="نرخنامه_مصوب_کافینت_۱۴۰۵.pdf"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs transition-colors"
                    title="دانلود فایل PDF"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Customer Invoice instructions */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Printer className="w-4 h-4 text-emerald-400" />
                  نحوه دریافت خروجی فاکتور رسمی مشتری (Print / PDF)
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  برای صدور فاکتور رسمی به <strong>ماژول ۴ (دستیار هوشمند میز)</strong> بروید، خدمت مورد نظر را انتخاب و دکمه <strong>«صدور فاکتور مشتری»</strong> را کلیک کنید. سپس:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    <span className="font-bold text-amber-400 block mb-1">۱. چاپ مستقیم فاکتور:</span>
                    کلیک روی دکمه چاپ و ارسال به پرینتر فیش‌زن یا چاپگر A5/A4
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    <span className="font-bold text-amber-400 block mb-1">۲. ذخیره به صورت PDF:</span>
                    در کادر چاپ مرورگر، مقصد را روی «Save as PDF» بگذارید
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    <span className="font-bold text-amber-400 block mb-1">۳. دانلود فایل HTML:</span>
                    دانلود فایل فاکتور یا کپی قالب جهت ارسال مستقیم در بله/ایتا
                  </div>
                </div>
              </div>

              {/* Missing docs slip */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  خروجی فیش کسری مدارک (جهت تحویل به مشتری)
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  در صورت نقص مدرک مشتری، در ماژول ۱ یا ۴ دکمه <strong>«برگه نقص مدرک»</strong> را بزنید. متن رسمی به همراه چک‌لیست اقلام کسری و مهلت تکمیل به صورت پیامک، پیام‌رسان یا برگه چاپی صادر می‌شود.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM EXPORT & HOSTING */}
          {activeTab === 'system' && (
            <div className="space-y-4">
              {/* Direct Web App Link */}
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-indigo-400" />
                    <h4 className="text-sm font-bold text-indigo-300">
                      لینک آنلاین عمومی سامانه (آماده استفاده روی کلیه سیستم‌ها)
                    </h4>
                  </div>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-200 px-2 py-0.5 rounded-full font-mono">
                    Cloud Hosted
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  این سامانه هم‌اکنون به صورت کامل روی سرور ابری مستقر و فعال است. می‌توانید همین لینک را در مرورگر هر یک از کلاینت‌ها، سیستم‌های پرسنل یا گوشی همراه باز کنید:
                </p>
                <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-indigo-500/30">
                  <span className="font-mono text-xs text-indigo-300 truncate flex-1 dir-ltr text-left">
                    {sharedAppUrl}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1 shrink-0 transition-colors"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'کپی شد' : 'کپی لینک'}</span>
                  </button>
                </div>
              </div>

              {/* Build Production Dist */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-white">
                  <FolderArchive className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold">
                    خروجی بیلد کامل برای اجرا روی هاست شخصی یا شبکه داخلی کافی‌نت (LAN)
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  اگر مایلید نرم‌افزار را روی سرور مستقل، هاست یا شبکه داخلی کافی‌نت بدون وابستگی به اینترنت راه‌اندازی کنید:
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-400 space-y-1 dir-ltr text-left">
                  <div className="text-slate-500"># ۱. دریافت بیلد فشرده نهایی پروژه:</div>
                  <div>npm run build</div>
                  <div className="text-slate-500 mt-2"># ۲. پوشه dist تولید شده شامل کلیه فایل‌های HTML/JS/CSS آماده است</div>
                  <div className="text-slate-500"># ۳. کپی محتویات dist روی هاست یا وب‌سرور محلی (Nginx/IIS/Apache)</div>
                </div>
              </div>

              {/* Export Code / Git */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  دانلود سورس‌کد پروژه از محیط AI Studio
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  از منوی بالای محیط <strong>Google AI Studio</strong>، با کلیک بر روی گزینه <strong>Export</strong> یا آیکون سه‌نقطه/GitHub می‌توانید کل سورس‌کد پروژه را در قالب فایل فشرده <strong>ZIP</strong> دریافت کنید یا مستقیماً به مخزن گیت‌هاب منتقل نمایید.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>کلیه خروجی‌ها منطبق بر استانداردهای نرخ‌نامه مصوب سال ۱۴۰۵ تولید می‌شوند.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            بستن پنجره
          </button>
        </div>

      </div>
    </div>
  );
};
