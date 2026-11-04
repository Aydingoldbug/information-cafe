import React, { useState } from 'react';
import { 
  GitBranch, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Printer, 
  RotateCcw, 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  Send,
  Sparkles
} from 'lucide-react';
import { DecisionNode, AutonomyLevel } from '../types';
import { DECISION_NODES } from '../data/decisionTreeData';
import { toPersianDigits } from '../utils/formatters';

interface ModuleDecisionTreeProps {
  onOpenMissingDocsSlipDirect: () => void;
  onOpenEscalationTicketDirect: () => void;
}

export const ModuleDecisionTree: React.FC<ModuleDecisionTreeProps> = ({
  onOpenMissingDocsSlipDirect,
  onOpenEscalationTicketDirect
}) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('root');
  const [pathHistory, setPathHistory] = useState<string[]>([]);
  const [activeOutcome, setActiveOutcome] = useState<any | null>(null);

  const currentNode: DecisionNode = DECISION_NODES[currentNodeId] || DECISION_NODES['root'];

  const handleSelectOption = (opt: any) => {
    if (opt.outcome) {
      setActiveOutcome(opt.outcome);
    } else if (opt.nextId) {
      setPathHistory((prev) => [...prev, currentNodeId]);
      setCurrentNodeId(opt.nextId);
      setActiveOutcome(null);
    }
  };

  const handleReset = () => {
    setCurrentNodeId('root');
    setPathHistory([]);
    setActiveOutcome(null);
  };

  const handleGoBack = () => {
    if (pathHistory.length > 0) {
      const prevId = pathHistory[pathHistory.length - 1];
      setPathHistory((prev) => prev.slice(0, -1));
      setCurrentNodeId(prevId);
      setActiveOutcome(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-900 border border-slate-700 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
              مدل استقلال هدایت‌شده
            </span>
            <span className="text-slate-400 text-xs">پروتکل سه‌سطحی تصمیم‌گیری</span>
          </div>
          <h2 className="text-xl font-black text-white">
            ماژول ۵: موتور رویه و درخت تصمیم هوشمند (Decision Tree Engine)
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            این موتور جلوی سردرگمی، مراجعات مکرر به کارفرما و تصمیمات خودسرانه در موارد حساس را می‌گیرد. برای هر وضعیت، مسیر قانونی استاندارد تعریف شده است.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>شروع مجدد درخت رویه</span>
        </button>
      </div>

      {/* Main Interactive Tree Card */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-sm space-y-6 max-w-3xl mx-auto">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between border-b border-slate-700/70 pb-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <GitBranch className="w-4 h-4 text-purple-400" />
            <span>گام‌های طی‌شده:</span>
            <span className="font-bold text-slate-200">
              {toPersianDigits(pathHistory.length + 1)} مرحله
            </span>
          </div>

          {pathHistory.length > 0 && (
            <button
              onClick={handleGoBack}
              className="text-amber-400 hover:underline flex items-center gap-1 text-xs"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>بازگشت به گام قبل</span>
            </button>
          )}
        </div>

        {/* Question Section */}
        {!activeOutcome ? (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold text-amber-400 block mb-1">
                پرسش تشخیصی سامانه:
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentNode.question}
              </h3>
              {currentNode.description && (
                <p className="text-xs text-slate-400 mt-1">{currentNode.description}</p>
              )}
            </div>

            {/* Options Buttons */}
            <div className="space-y-3 pt-2">
              <span className="text-xs text-slate-400 block">
                وضعیت مراجعه‌کننده روی میز خدمت را انتخاب کنید:
              </span>
              {currentNode.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full text-right p-4 rounded-xl border border-slate-700 bg-slate-900/90 hover:border-amber-500 hover:bg-slate-900 text-xs sm:text-sm text-slate-200 transition-all flex items-center justify-between group shadow-sm"
                >
                  <span className="leading-relaxed flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-400 group-hover:text-amber-400">
                      {toPersianDigits(idx + 1)}
                    </span>
                    <span>{opt.label}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Final Decision Outcome */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div
              className={`p-6 rounded-2xl border text-right space-y-3 ${
                activeOutcome.level === 'green'
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                  : activeOutcome.level === 'yellow'
                  ? 'bg-amber-950/30 border-amber-500/50 text-amber-300'
                  : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {activeOutcome.level === 'green' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                ) : activeOutcome.level === 'yellow' ? (
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                ) : (
                  <ShieldAlert className="w-6 h-6 text-rose-400" />
                )}
                <h3 className="text-base sm:text-lg font-black text-white">
                  {activeOutcome.actionTitle}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeOutcome.actionMessage}
              </p>
            </div>

            {/* Action Buttons based on Outcome */}
            <div className="space-y-3 pt-2">
              {activeOutcome.actionType === 'missing_docs' && (
                <button
                  onClick={onOpenMissingDocsSlipDirect}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Printer className="w-4 h-4" />
                  <span>صدور فوری برگه رسمی کسری مدارک مراجعین (HTML Print)</span>
                </button>
              )}

              {activeOutcome.actionType === 'manager_escalation' && (
                <button
                  onClick={onOpenEscalationTicketDirect}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span>ایجاد تیکت فوری ارجاع قرمز به کارفرما</span>
                </button>
              )}

              {activeOutcome.actionType === 'proceed' && (
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 text-center">
                  ✅ وضعیت کاملاً استاندارد است. به ماژول «دستیار هوشمند میز» رفته و خدمت را تکمیل نمایید.
                </div>
              )}

              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium bg-slate-700/60 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                بررسی مجدد برای خدمت یا مراجعه‌کننده دیگر
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
