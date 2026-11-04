import React, { useState } from 'react';
import { X, Printer, Copy, Check, Download, ExternalLink } from 'lucide-react';
import { CustomerInvoice } from '../types';
import { generateCustomerInvoiceHtml, formatPriceToman, formatPriceRial, toPersianDigits } from '../utils/formatters';

interface InvoiceModalProps {
  invoice: CustomerInvoice | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!invoice) return null;

  const htmlContent = generateCustomerInvoiceHtml(invoice);

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
    a.download = `Factor-${invoice.invoiceNumber}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <h3 className="text-sm font-bold text-white">
              پیش‌نمایش رسمی فاکتور مشتری (خروجی HTML استاندارد)
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {invoice.invoiceNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyHtml}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
              title="کپی سورس کامل HTML فاکتور"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'کپی شد' : 'کپی HTML'}</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
              title="دانلود فایل فاکتور HTML"
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

        {/* Live HTML Preview inside iFrame / Container */}
        <div className="p-4 bg-slate-950 flex-1 overflow-y-auto">
          <div className="bg-white rounded-xl shadow p-2 overflow-hidden border border-slate-700 max-w-2xl mx-auto">
            <iframe
              srcDoc={htmlContent}
              title="پیش‌نمایش فاکتور"
              className="w-full h-[520px] border-0"
            />
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            مجموع فاکتور: <strong className="text-amber-400 text-sm">{formatPriceToman(invoice.totalToman)}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              بستن
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ فاکتور رسمی (Print Window)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
