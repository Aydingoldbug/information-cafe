import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Award, 
  Play, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';
import { LearningModule, LearningLesson } from '../types';
import { toPersianDigits } from '../utils/formatters';

interface ModuleLearningPathProps {
  modules: LearningModule[];
  completedLessonIds: string[];
  onCompleteLesson: (lessonId: string, score: number) => void;
  remedialLessonIds: string[];
}

export const ModuleLearningPath: React.FC<ModuleLearningPathProps> = ({
  modules,
  completedLessonIds,
  onCompleteLesson,
  remedialLessonIds
}) => {
  const [activeLesson, setActiveLesson] = useState<LearningLesson | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const startLesson = (lesson: LearningLesson) => {
    setActiveLesson(lesson);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!activeLesson) return;
    let correctCount = 0;
    activeLesson.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / activeLesson.quiz.length) * 100);
    setQuizScore(finalScore);
    setQuizSubmitted(true);
    onCompleteLesson(activeLesson.id, finalScore);
  };

  return (
    <div className="space-y-6">
      {/* Header and Progress Overview */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-900 border border-slate-700 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              مسیر یادگیری تطبیقی پرسنل مبتدی تا ارشد
            </span>
            <span className="text-slate-400 text-xs">درس‌های فشرده ۵ تا ۱۰ دقیقه‌ای</span>
          </div>
          <h2 className="text-xl font-black text-white">ماژول ۲: آکادمی مهارتی و آزمون‌های سنجش درک رویه‌ها</h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            پرسنل پیش از ورود به سطح مستقل سبز هر خدمت، باید درس مربوطه را گذرانده و در کوییز کوتاه شرکت کند. خطاها به درس‌های جبرانی هوشمند تبدیل می‌شوند.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl min-w-[240px] space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">پیشرفت کل دوره‌ها:</span>
            <span className="font-bold text-amber-400">
              {toPersianDigits(progressPercent)}٪ ({toPersianDigits(completedCount)} از {toPersianDigits(totalLessons)})
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 justify-end">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>نشان شایستگی با اتمام تمام دروس صادر می‌شود</span>
          </div>
        </div>
      </div>

      {/* Remedial Suggestions Alert if Any */}
      {remedialLessonIds.length > 0 && (
        <div className="bg-amber-950/40 border border-amber-600/40 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-300">
              پیشنهاد هوشمند سیستم: دروس جبرانی بر اساس خطاهای ثبت‌شده در شبیه‌ساز یا میز خدمت
            </h4>
            <p className="text-xs text-slate-300">
              سامانه متوجه ضعف در تشخیص پیش‌نیازها یا قوانین شده است. لطفاً دروس هایلایت‌شده با نشان «نیازمند بازآموزی» را مجدداً مطالعه نمایید.
            </p>
          </div>
        </div>
      )}

      {/* Modules List */}
      <div className="space-y-6">
        {modules.map((mod, modIdx) => (
          <div
            key={mod.id}
            className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center text-amber-400 font-bold text-sm">
                  {toPersianDigits(modIdx + 1)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{mod.title}</h3>
                  <p className="text-xs text-slate-400">{mod.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  {mod.badgeName}
                </span>
              </div>
            </div>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mod.lessons.map((lesson) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                const isRemedial = remedialLessonIds.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      isRemedial
                        ? 'bg-amber-950/20 border-amber-600/50 hover:border-amber-500'
                        : isCompleted
                        ? 'bg-slate-900/60 border-slate-700/60'
                        : 'bg-slate-900/90 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {toPersianDigits(lesson.durationMinutes)} دقیقه مطالعه
                        </span>
                        {isRemedial ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            نیازمند بازآموزی جبرانی
                          </span>
                        ) : isCompleted ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            تکمیل شده
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                            در انتظار یادگیری
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-white leading-snug">{lesson.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {lesson.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        {toPersianDigits(lesson.keyPoints.length)} نکته کلیدی + کوییز ارزیابی
                      </span>
                      <button
                        onClick={() => startLesson(lesson)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          isCompleted
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                            : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                        }`}
                      >
                        <Play className="w-3 h-3" />
                        <span>{isCompleted ? 'مرور مجدد درس' : 'شروع درس و کوییز'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Lesson & Quiz Interactive Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-10 flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 block mb-1">
                  درس آموزشی تطبیقی • {toPersianDigits(activeLesson.durationMinutes)} دقیقه
                </span>
                <h3 className="text-lg font-black text-white">{activeLesson.title}</h3>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 text-sm text-slate-300">
              {/* Summary */}
              <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl leading-relaxed">
                <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  چکیده و هدف آموزشی:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">{activeLesson.summary}</p>
              </div>

              {/* Key Points */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  نکات کلیدی برای جلوگیری از خطای پرسنل:
                </h4>
                <div className="space-y-2">
                  {activeLesson.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex items-start gap-2.5 text-xs text-slate-200"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {toPersianDigits(idx + 1)}
                      </div>
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational Checklist */}
              <div className="bg-slate-800/50 border border-slate-700/80 p-4 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  چک‌لیست عملیاتی اپراتور حین پاسخگویی:
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {activeLesson.checklist.map((chk, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <div className="w-4 h-4 rounded border border-slate-600 bg-slate-900 flex items-center justify-center text-emerald-400">
                        ✓
                      </div>
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quiz Section */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-400" />
                    آزمون کوتاه سنجش تسلط (کوییز)
                  </h4>
                  {quizSubmitted && quizScore !== null && (
                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full ${
                        quizScore >= 70
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}
                    >
                      نمره شما: {toPersianDigits(quizScore)} از ۱۰۰
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {activeLesson.quiz.map((q, qIdx) => (
                    <div
                      key={q.id}
                      className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-3"
                    >
                      <div className="font-bold text-xs text-white leading-relaxed">
                        سوال {toPersianDigits(qIdx + 1)}: {q.question}
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedAnswers[q.id] === optIdx;
                          const isCorrect = q.correctIndex === optIdx;

                          let optionStyle = 'bg-slate-800/80 border-slate-700 hover:border-slate-500 text-slate-300';
                          if (quizSubmitted) {
                            if (isCorrect) {
                              optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold';
                            } else if (isSelected && !isCorrect) {
                              optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-300';
                            }
                          } else if (isSelected) {
                            optionStyle = 'bg-amber-500/20 border-amber-500 text-amber-200 font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              disabled={quizSubmitted}
                              className={`w-full text-right p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${optionStyle}`}
                            >
                              <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center shrink-0 text-[10px]">
                                {toPersianDigits(optIdx + 1)}
                              </span>
                              <span className="leading-relaxed">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="text-xs bg-slate-800/90 p-3 rounded-lg border border-slate-700/80 text-slate-300 space-y-1">
                          <span className="font-bold text-amber-400 block">توضیح آموزشی پاسخ صحیح:</span>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
              <button
                onClick={() => setActiveLesson(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                بستن
              </button>

              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < activeLesson.quiz.length}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 transition-colors shadow-lg shadow-amber-500/20"
                >
                  ثبت پاسخ‌ها و تصحیح آزمون
                </button>
              ) : (
                <button
                  onClick={() => setActiveLesson(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  ثبت نتیجه و بازگشت به مسیر یادگیری
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
