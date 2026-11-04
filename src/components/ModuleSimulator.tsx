import React, { useState } from 'react';
import { 
  MonitorPlay, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Play, 
  User, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { SimulatorScenario, SimulationStep } from '../types';
import { toPersianDigits } from '../utils/formatters';

interface ModuleSimulatorProps {
  scenarios: SimulatorScenario[];
  onLogSimError: (errorTitle: string, remedialLessonId: string) => void;
  onNavigateToLesson: (lessonId: string) => void;
}

export const ModuleSimulator: React.FC<ModuleSimulatorProps> = ({
  scenarios,
  onLogSimError,
  onNavigateToLesson
}) => {
  const [selectedScenario, setSelectedScenario] = useState<SimulatorScenario | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [selectedTrapOption, setSelectedTrapOption] = useState<number | null>(null);
  const [stepEvaluated, setStepEvaluated] = useState<boolean>(false);
  const [stepSuccess, setStepSuccess] = useState<boolean>(false);
  const [scenarioCompleted, setScenarioCompleted] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(100);
  const [mistakesList, setMistakesList] = useState<string[]>([]);

  const startScenario = (sc: SimulatorScenario) => {
    setSelectedScenario(sc);
    setCurrentStepIndex(0);
    setFormValues({});
    setSelectedTrapOption(null);
    setStepEvaluated(false);
    setStepSuccess(false);
    setScenarioCompleted(false);
    setFinalScore(100);
    setMistakesList([]);
  };

  const handleFieldChange = (fieldId: string, val: any) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: val }));
  };

  const handleEvaluateStep = () => {
    if (!selectedScenario) return;
    const currentStep = selectedScenario.steps[currentStepIndex];
    let stepMistakes: string[] = [];

    // Check fields
    if (currentStep.fields) {
      currentStep.fields.forEach((f) => {
        if (f.correctValue !== undefined) {
          const userVal = formValues[f.id];
          if (f.type === 'checkbox') {
            if (Boolean(userVal) !== Boolean(f.correctValue)) {
              stepMistakes.push(`اشتباه در انتخاب «${f.label}»`);
            }
          } else if (userVal !== f.correctValue) {
            stepMistakes.push(`مقدار انتخابی برای «${f.label}» ناصحیح است.`);
          }
        }
      });
    }

    // Check trap question
    if (currentStep.trapQuestion && selectedTrapOption !== null) {
      const chosen = currentStep.trapQuestion.options[selectedTrapOption];
      if (!chosen.isCorrect) {
        stepMistakes.push(chosen.feedback);
      }
    } else if (currentStep.trapQuestion && selectedTrapOption === null) {
      stepMistakes.push('پاسخ به سوال تحلیلی مرحله الزامی است.');
    }

    const isStepOk = stepMistakes.length === 0;
    setStepSuccess(isStepOk);
    setStepEvaluated(true);

    if (!isStepOk) {
      setFinalScore((prev) => Math.max(0, prev - Math.round(100 / selectedScenario.steps.length / 2)));
      setMistakesList((prev) => [...prev, ...stepMistakes]);
      onLogSimError(stepMistakes[0], selectedScenario.remedialLessonId);
    }
  };

  const handleNextStep = () => {
    if (!selectedScenario) return;
    if (currentStepIndex + 1 < selectedScenario.steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      setFormValues({});
      setSelectedTrapOption(null);
      setStepEvaluated(false);
      setStepSuccess(false);
    } else {
      setScenarioCompleted(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-900 border border-slate-700 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              محیط امن شبیه‌سازی کلیک‌به‌کلیک
            </span>
            <span className="text-slate-400 text-xs">سامانه‌های بانکی، راهور، مالیاتی و قضایی</span>
          </div>
          <h2 className="text-xl font-black text-white">
            ماژول ۳: شبیه‌ساز عملی سناریوهای حساس و انتقال خطا به کتابخانه
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            پرسنل در این ماژول بدون ترس از جریمه یا اشتباه، با سناریوهای مراجعین واقعی و ماک‌آپ سامانه‌ها مواجه می‌شوند و تصمیم‌گیری درست را تمرین می‌کنند.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl text-center min-w-[180px]">
          <span className="text-xs text-slate-400 block">سناریوهای فعال:</span>
          <span className="text-xl font-black text-amber-400 mt-0.5 block">
            {toPersianDigits(scenarios.length)} سناریوی واقعی
          </span>
        </div>
      </div>

      {/* Main View: Scenario Selection or Live Simulation */}
      {!selectedScenario ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 hover:border-slate-600 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                    درجه دشواری: {sc.difficulty}
                  </span>
                  <span className="text-xs text-slate-400">زمان تخمینی: {toPersianDigits(sc.estimatedTime)}</span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{sc.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  {sc.situation}
                </p>

                {/* Profile snippet */}
                <div className="text-xs text-slate-400 space-y-1">
                  <div>
                    مراجعه‌کننده فرضی: <strong className="text-slate-200">{sc.clientProfile.name}</strong>
                  </div>
                  <div>یادداشت مورد: {sc.clientProfile.notes}</div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-700/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {toPersianDigits(sc.steps.length)} مرحله کلیک‌به‌کلیک
                </span>
                <button
                  onClick={() => startScenario(sc)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>ورود به شبیه‌ساز</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Live Simulation Console */
        <div className="space-y-5">
          {/* Top Control Bar */}
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedScenario(null)}
                className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>خروج از سناریو</span>
              </button>
              <div>
                <h3 className="text-sm font-bold text-white">{selectedScenario.title}</h3>
                <span className="text-xs text-slate-400">
                  مرحله {toPersianDigits(currentStepIndex + 1)} از {toPersianDigits(selectedScenario.steps.length)}
                </span>
              </div>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">امتیاز شبیه‌سازی:</span>
              <span
                className={`text-base font-black px-3 py-1 rounded-xl ${
                  finalScore >= 80
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}
              >
                {toPersianDigits(finalScore)} / ۱۰۰
              </span>
            </div>
          </div>

          {!scenarioCompleted ? (
            /* Current Step Workspace */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Client Briefing & Dossier Sidebar */}
              <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  پرونده مراجعه‌کننده روی میز
                </h4>
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
                  <div>
                    نام مشتری: <strong className="text-white">{selectedScenario.clientProfile.name}</strong>
                  </div>
                  <div>
                    کد ملی: <span className="font-mono">{toPersianDigits(selectedScenario.clientProfile.nationalId)}</span>
                  </div>
                  <div>
                    تلفن همراه: <span className="font-mono">{toPersianDigits(selectedScenario.clientProfile.mobile)}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <strong>شرح تقاضا:</strong> {selectedScenario.situation}
                  </div>
                </div>

                <div className="bg-indigo-950/30 border border-indigo-900/40 p-3.5 rounded-xl text-xs text-indigo-300 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-indigo-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    راهنمای شبیه‌ساز:
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    فرم ماک‌آپ روبه‌رو را بررسی نموده و با استقلال هدایت‌شده، گزینه‌های قانونی صحیح را برگزینید.
                  </p>
                </div>
              </div>

              {/* Mockup Interactive Screen */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between">
                {/* Browser-like Header */}
                <div className="bg-slate-800 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="font-mono text-slate-400 text-[11px] truncate max-w-xs sm:max-w-md">
                      {selectedScenario.steps[currentStepIndex].mockScreenSystem}
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono">
                    ماک‌آپ شبیه‌ساز
                  </span>
                </div>

                {/* Step Form Body */}
                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      {selectedScenario.steps[currentStepIndex].prompt}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {selectedScenario.steps[currentStepIndex].instruction}
                    </p>
                  </div>

                  {/* Dynamic Fields */}
                  {selectedScenario.steps[currentStepIndex].fields && (
                    <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-3">
                      {selectedScenario.steps[currentStepIndex].fields.map((field) => (
                        <div key={field.id} className="space-y-1.5">
                          {field.type === 'checkbox' ? (
                            <label className="flex items-start gap-2.5 text-xs text-slate-200 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Boolean(formValues[field.id])}
                                onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                                disabled={stepEvaluated}
                                className="w-4 h-4 mt-0.5 rounded text-amber-500 focus:ring-0 bg-slate-900 border-slate-700"
                              />
                              <span className="leading-relaxed">{field.label}</span>
                            </label>
                          ) : field.type === 'select' ? (
                            <div>
                              <label className="text-xs text-slate-300 font-medium block mb-1">
                                {field.label}
                              </label>
                              <select
                                value={formValues[field.id] || ''}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                disabled={stepEvaluated}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                              >
                                <option value="">-- انتخاب کنید --</option>
                                {field.options?.map((opt, i) => (
                                  <option key={i} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <div>
                              <label className="text-xs text-slate-300 font-medium block mb-1">
                                {field.label}
                              </label>
                              <input
                                type="text"
                                value={formValues[field.id] || ''}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                disabled={stepEvaluated}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                              />
                            </div>
                          )}
                          {field.hint && (
                            <span className="text-[10px] text-slate-500 block">{field.hint}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Trap Question if present */}
                  {selectedScenario.steps[currentStepIndex].trapQuestion && (
                    <div className="bg-slate-800/90 border border-amber-600/40 p-4 rounded-xl space-y-3">
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        مسئله تصمیم‌گیری حساس اپراتور:
                      </div>
                      <p className="text-xs text-white font-medium">
                        {selectedScenario.steps[currentStepIndex].trapQuestion.question}
                      </p>

                      <div className="space-y-2 pt-1">
                        {selectedScenario.steps[currentStepIndex].trapQuestion.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => !stepEvaluated && setSelectedTrapOption(oIdx)}
                            className={`w-full text-right p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${
                              selectedTrapOption === oIdx
                                ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-semibold'
                                : 'bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                              {toPersianDigits(oIdx + 1)}
                            </span>
                            <span className="leading-relaxed">{opt.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Evaluation Feedback */}
                  {stepEvaluated && (
                    <div
                      className={`p-4 rounded-xl border text-xs leading-relaxed ${
                        stepSuccess
                          ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                          : 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        {stepSuccess ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>عالی! این مرحله بدون خطا و بر اساس استانداردهای مصوب انجام شد.</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                            <span>خطا در تصمیم‌گیری یا ورود اطلاعات شناسایی شد:</span>
                          </>
                        )}
                      </div>
                      {!stepSuccess && (
                        <div className="mt-1 space-y-1 text-slate-200">
                          {selectedScenario.steps[currentStepIndex].trapQuestion &&
                            selectedTrapOption !== null && (
                              <p>
                                {
                                  selectedScenario.steps[currentStepIndex].trapQuestion.options[
                                    selectedTrapOption
                                  ].feedback
                                }
                              </p>
                            )}
                          <p className="text-[11px] text-amber-400 pt-1">
                            این خطا به کتابخانه خطاهای پرسنل ثبت شد و درس جبرانی پیشنهاد خواهد شد.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Evaluation Controls */}
                <div className="p-4 bg-slate-800/90 border-t border-slate-700 flex items-center justify-between">
                  {!stepEvaluated ? (
                    <button
                      onClick={handleEvaluateStep}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm ml-auto"
                    >
                      ثبت و ارزیابی مرحله
                    </button>
                  ) : (
                    <button
                      onClick={handleNextStep}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm flex items-center gap-1.5 ml-auto"
                    >
                      <span>
                        {currentStepIndex + 1 < selectedScenario.steps.length
                          ? 'گام بعدی شبیه‌سازی'
                          : 'مشاهده نتیجه نهایی سناریو'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Scenario Final Result Card */
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl text-center max-w-2xl mx-auto space-y-5 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">اتمام سناریوی شبیه‌سازی</h3>
                <p className="text-xs text-slate-400 mt-1">{selectedScenario.title}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 max-w-xs mx-auto">
                <span className="text-xs text-slate-400 block">نمره نهایی عملکرد شما:</span>
                <span className="text-3xl font-black text-amber-400 mt-1 block">
                  {toPersianDigits(finalScore)} / ۱۰۰
                </span>
              </div>

              {mistakesList.length > 0 && (
                <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl text-right text-xs space-y-2">
                  <span className="font-bold text-rose-300 block">
                    موارد ثبت شده در کتابخانه خطاهای آموزشی:
                  </span>
                  <ul className="space-y-1 text-slate-300 list-disc pr-4">
                    {mistakesList.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        const lessonId = selectedScenario.remedialLessonId;
                        setSelectedScenario(null);
                        onNavigateToLesson(lessonId);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>مشاهده درس جبرانی این سناریو</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-3 pt-3">
                <button
                  onClick={() => startScenario(selectedScenario)}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>تکرار مجدد سناریو</span>
                </button>
                <button
                  onClick={() => setSelectedScenario(null)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950"
                >
                  بازگشت به لیست سناریوها
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
