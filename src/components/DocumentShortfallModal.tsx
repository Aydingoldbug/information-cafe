import React, { useState } from 'react';
import { X, Printer, Copy, Check, Download, AlertTriangle } from 'lucide-react';
import { ServiceCard } from '../types';
import { generateShortfallSlipHtml, getTodayPersianDate } from '../utils/formatters';

interface DocumentShortfallModalProps {
  service: ServiceCard | null;
  operatorName: string;
  onClose: () => void;
}

export const DocumentShortfallModal: React.FC<DocumentShortfallModalProps> = ({
  service,
  operatorName,
  onClose
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedMissing, setSelectedMissing] = useState<Record<string, boolean>>({});
  const [customMissingItem, setCustomMissingItem] = useState('');
  const [copied, setCopied] = useState(false);

  const defaultItems = service?.requiredDocuments || [
    'کارت ملی هوشمند اصل',
    'سیم‌کارت فعال به نام شخص متقاضی',
    'کد پستی ۱۰ رقمی معتبر و تاییدیه نشانی',
    'شناسنامه (اطلاعات شماره سریال دقیق)'
  ];

  const missingList = Object.keys(selectedMissing).filter((k) => selectedMissing[k]);

  const defaultActions = [
    'مراجعه به اداره پست یا سامانه gnaf.post.ir جهت دریافت تاییدیه کد پستی',
    'تهیه سیم‌کارت فعال به نام متقاضی از امور مشترکین اپراتورها جهت اعتبارسنجی شاهکار',
    'همراه داشتن اصل اسناد مالکیت یا عقدنامه رسمی در مراجعه بعدی'
  ];

  const htmlContent = generateShortfallSlipHtml({
    clientName: clientName.trim() || 'مراجعه‌کننده محترم',
    clientPhone: clientPhone.trim() || '---',
    serviceName: service?.name || 'خدمت درخواستی',
    missingItems: missingList.length > 0 ? missingList : ['اصل کارت ملی هوشمند', 'سیم‌کارت به نام متقاضی'],
    requiredActions: defaultActions,
    operatorName: operatorName
  });

  const toggleItem = (item: string) => {
    setSelectedMissing((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleAddCustom = () => {
    if (customMissingItem.trim()) {
      toggleItem(customMissingItem.trim());
      setCustomMissingItem('');
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kasri-Madarek-${Date.now().toString().slice(-4)}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <h3 className="text-sm font-bold text-white">
              صدور برگه رسمی کسری مدارک مراجعین (خروجی HTML و چاپی)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyHtml}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'کپی شد' : 'کپی HTML'}</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">دانلود فایل</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Two columns (Selector + Preview) */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto">
          {/* Left Form: Select missing items */}
          <div className="space-y-4 text-xs">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3">
              <h4 className="font-bold text-white">مشخصات مراجعه‌کننده:</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-slate-400 block mb-1">نام مشتری:</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="نام مشتری"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">شماره تماس:</label>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="09..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2.5">
              <h4 className="font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                تیک بزنید کدام مدارک کسری دارد:
              </h4>

              <div className="space-y-2">
                {defaultItems.map((item, idx) => (
                  <label
                    key={idx}
                    className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                      selectedMissing[item]
                        ? 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(selectedMissing[item])}
                      onChange={() => toggleItem(item)}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-0 bg-slate-950 border-slate-700"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              {/* Add custom item */}
              <div className="pt-2 flex gap-1.5">
                <input
                  type="text"
                  value={customMissingItem}
                  onChange={(e) => setCustomMissingItem(e.target.value)}
                  placeholder="مورد کسری دلخواه دیگر..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
                />
                <button
                  onClick={handleAddCustom}
                  className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold"
                >
                  افزودن
                </button>
              </div>
            </div>
          </div>

          {/* Right Preview */}
          <div className="bg-slate-950 rounded-xl p-2 border border-slate-800 overflow-hidden">
            <iframe
              srcDoc={htmlContent}
              title="پیش‌نمایش برگه کسری مدارک"
              className="w-full h-[450px] border-0 rounded-lg bg-white"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
          >
            بستن
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-2 shadow-lg shadow-rose-600/20"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ برگه کسری مدارک (Print Slip)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
