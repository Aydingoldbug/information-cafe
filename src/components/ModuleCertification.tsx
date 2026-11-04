import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  RotateCw, 
  FileCheck, 
  Printer, 
  Sparkles,
  Calendar,
  X,
  HelpCircle
} from 'lucide-react';
import { PersonnelCertificate } from '../types';
import { toPersianDigits, getTodayPersianDate } from '../utils/formatters';

interface ModuleCertificationProps {
  certificates: PersonnelCertificate[];
  onRenewCertificate: (categoryId: string, score: number) => void;
  operatorName: string;
}

export const ModuleCertification: React.FC<ModuleCertificationProps> = ({
  certificates,
  onRenewCertificate,
  operatorName
}) => {
  const [activeExamCat, setActiveExamCat] = useState<PersonnelCertificate | null>(null);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<number | null>(null);

  const certifiedCount = certificates.filter((c) => c.isCertified && !c.isExpired).length;
  const totalCount = certificates.length;

  const mockExamQuestions: Record<string, { q: string; opts: string[]; correct: number; exp: string }[]> = {
    judiciary: [
      {
        q: 'مشتری احراز هویت تصویری ثنا را ۳ بار ناموفق گذرانده است؛ اقدام قانونی پرسنل چیست؟',
        opts: [
          'به کارفرما گزارش داده و مشتری را به دفتر خدمات الکترونیک قضایی حضوری ارجاع دهد.',
          'عکس کارت ملی را مقابل دوربین بگذارد.',
          'شناسه مشتری را عوض کند.',
          'از مشتری هزینه دوباره بگیرد.'
        ],
        correct: 0,
        exp: 'پس از ۳ بار رد هوش مصنوعی بیومتریک، مراجعه حضوری به دفاتر قضایی اجباری است.'
      },
      {
        q: 'هزینه دادرسی سوء پیشینه الکترونیکی چقدر است؟',
        opts: [
          '۲۰,۰۰۰ تومان درگاه قوه قضاییه + ۱۲۰,۰۰۰ تومان دستمزد مصوب کافی‌نت',
          'رایگان است.',
          '۵۰,۰۰۰ تومان در مجموع.',
          '۳۰۰,۰۰۰ تومان یکجا.'
        ],
        correct: 0,
        exp: 'مطابق نرخ‌نامه ۱۴۰۵ هزینه دادرسی تمبر دولتی جدا و دستمزد ۱۲۰ هزار تومان است.'
      }
    ],
    tax: [
      {
        q: 'اگر مودی دارای گردش پوز بالا باشد، آیا می‌توان اظهارنامه تبصره ۱۰۰ صفر ارسال کرد؟',
        opts: [
          'خیر، وجود حتی یک تراکنش کتمان درآمد تلقی شده و مشمول جریمه سنگین است.',
          'بله، اگر مودی قسم بخورد اشکالی ندارد.',
          'بله، به شرط تقسیط.',
          'اختیار با مشتری است.'
        ],
        correct: 0,
        exp: 'اظهارنامه صفر در حضور تراکنش پوز تخلف سنگین مالیاتی است.'
      }
    ],
    vehicle: [
      {
        q: 'پیش‌نیازهای اجباری تعویض پلاک خودرو قبل از ورود به مرکز چیست؟',
        opts: [
          'تسویه کامل مالیات واتی + تسویه خلافی راهور + احراز نشانی سکونت در سخا',
          'صرفاً برگ سبز خودرو کافی است.',
          'فقط داشتن گواهینامه معتبر.',
          'نیازی به تسویه مالیات نیست.'
        ],
        correct: 0,
        exp: 'وب‌سرویس راهور بدون این ۳ استعلام اجازه ورود به گیت مرکز تعویض پلاک را نمی‌دهد.'
      }
    ],
    social_security: [
      {
        q: 'مهلت قانونی کارگر اخراجی برای درخواست بیمه بیکاری طبق ماده ۶ قانون کار چقدر است؟',
        opts: [
          'حداکثر ۳۰ روز از تاریخ قطع همکاری (نامه عدم نیاز)',
          '۶ ماه کامل.',
          '۱ سال تقویمی.',
          'هیچ مهلتی ندارد.'
        ],
        correct: 0,
        exp: 'گذشت بیش از ۳۰ روز نیازمند هیئت تشخیص و اثبات عذر موجه در مراجع حل اختلاف است.'
      }
    ],
    housing_banking: [
      {
        q: 'چرا تنظیم قرارداد خودنویس همواره در سطح اختیار قرمز (نظارت کارفرما) است؟',
        opts: [
          'به دلیل بار حقوقی، تعهدات مالیاتی، شروط فسخ و بررسی اصالت اسناد مالکیت طرفین',
          'چون هزینه آن زیاد است.',
          'چون سامانه فیلتر است.',
          'چون پرسنل سرعت تایپ پایینی دارند.'
        ],
        correct: 0,
        exp: 'قرارداد اجاره سند لازم‌الاجراست و هرگونه اشتباه مستوجب مسئولیت مدنی و کیفری است.'
      }
    ]
  };

  const startExam = (cert: PersonnelCertificate) => {
    setActiveExamCat(cert);
    setExamAnswers({});
    setExamSubmitted(false);
    setExamScore(null);
  };

  const handleFinishExam = () => {
    if (!activeExamCat) return;
    const questions = mockExamQuestions[activeExamCat.categoryId] || mockExamQuestions['judiciary'];
    let correct = 0;
    questions.forEach((q, idx) => {
      if (examAnswers[idx] === q.correct) correct++;
    });
    const score = Math.round((correct / questions.length) * 100);
    setExamScore(score);
    setExamSubmitted(true);
    if (score >= 70) {
      onRenewCertificate(activeExamCat.categoryId, score);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-900 border border-slate-700 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              مجوزهای حرفه‌ای میز خدمت
            </span>
            <span className="text-slate-400 text-xs">مطابق استاندارد صلاحیت شغلی ۱۴۰۵</span>
          </div>
          <h2 className="text-xl font-black text-white">
            ماژول ۶: سیستم ارزیابی صلاحیت و گواهینامه‌های دوره‌ای خدمت
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            قانون استقلال هدایت‌شده: پرسنل تنها در صورتی مجاز به انجام مستقل خدمات (سطح سبز) هستند که گواهینامه معتبر آن حوزه را در این سامانه دریافت کرده باشند.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl min-w-[240px] space-y-2">
          <div className="text-xs text-slate-400">شناسه صلاحیت پرسنل:</div>
          <div className="font-bold text-white text-sm flex items-center justify-between">
            <span>{operatorName}</span>
            <span className="text-xs font-mono text-amber-400">OP-8847</span>
          </div>
          <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
            <span className="text-slate-400">گواهی‌های فعال:</span>
            <span className="text-emerald-400 font-bold">
              {toPersianDigits(certifiedCount)} از {toPersianDigits(totalCount)} حوزه
            </span>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((cert) => {
          const isValid = cert.isCertified && !cert.isExpired;

          return (
            <div
              key={cert.categoryId}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between shadow-sm ${
                isValid
                  ? 'bg-slate-800/90 border-slate-700/80 hover:border-emerald-500/50'
                  : 'bg-slate-800/50 border-rose-900/40 hover:border-rose-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                      isValid
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  {isValid ? (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      گواهینامه فعال
                    </span>
                  ) : cert.isExpired ? (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      منقضی شده (نیاز به آزمون مجدد)
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      در انتظار آزمون
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  گواهی صلاحیت {cert.categoryTitle}
                </h3>

                <div className="text-xs text-slate-400 space-y-1.5 pt-1">
                  <div className="flex justify-between">
                    <span>آخرین نمره آزمون:</span>
                    <strong className="text-white">
                      {cert.score > 0 ? `${toPersianDigits(cert.score)} از ۱۰۰` : 'ثبت‌نشده'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>تاریخ صدور:</span>
                    <span className="font-mono text-slate-300">{cert.issuedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تاریخ انقضا:</span>
                    <span className="font-mono text-slate-300">{cert.expiresAt}</span>
                  </div>
                </div>

                {isValid ? (
                  <div className="p-2.5 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-[11px] text-emerald-300">
                    مجوز قانونی اقدام مستقل در خدمات این حوزه فعال است.
                  </div>
                ) : (
                  <div className="p-2.5 bg-rose-950/20 border border-rose-900/40 rounded-xl text-[11px] text-rose-300">
                    انجام خدمات این دسته بدون تأیید سرپرست مجاز نیست.
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-700/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">آزمون جامع ۲ سواله</span>
                <button
                  onClick={() => startExam(cert)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    isValid
                      ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                  }`}
                >
                  <RotateCw className="w-3 h-3" />
                  <span>{isValid ? 'تمدید پیش از موعد' : 'شرکت در آزمون گواهینامه'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Exam Modal */}
      {activeExamCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-10 flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 block mb-0.5">
                  آزمون اعطای گواهینامه مهارت و صلاحیت شغلی
                </span>
                <h3 className="text-base font-black text-white">
                  سنجش تسلط: {activeExamCat.categoryTitle}
                </h3>
              </div>
              <button
                onClick={() => setActiveExamCat(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions */}
            <div className="p-6 space-y-5 text-xs text-slate-300">
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 text-slate-300">
                برای اخذ یا تمدید گواهینامه رسمی باید حداقل نمره <strong>۷۰ از ۱۰۰</strong> را کسب فرمایید.
              </div>

              {(mockExamQuestions[activeExamCat.categoryId] || mockExamQuestions['judiciary']).map(
                (item, qIdx) => (
                  <div
                    key={qIdx}
                    className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3"
                  >
                    <div className="font-bold text-white leading-relaxed">
                      سوال {toPersianDigits(qIdx + 1)}: {item.q}
                    </div>

                    <div className="space-y-2">
                      {item.opts.map((opt, oIdx) => {
                        const isSelected = examAnswers[qIdx] === oIdx;
                        const isCorrect = item.correct === oIdx;

                        let style = 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500';
                        if (examSubmitted) {
                          if (isCorrect) style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                          else if (isSelected && !isCorrect) style = 'bg-rose-950/60 border-rose-500 text-rose-300';
                        } else if (isSelected) {
                          style = 'bg-amber-500/20 border-amber-500 text-amber-200 font-semibold';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => !examSubmitted && setExamAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))}
                            className={`w-full text-right p-3 rounded-lg border transition-all flex items-start gap-2.5 ${style}`}
                          >
                            <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                              {toPersianDigits(oIdx + 1)}
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {examSubmitted && (
                      <div className="p-2.5 bg-slate-800/90 rounded-lg text-slate-400 text-[11px]">
                        <strong>دلیل پاسخ صحیح:</strong> {item.exp}
                      </div>
                    )}
                  </div>
                )
              )}

              {examSubmitted && examScore !== null && (
                <div
                  className={`p-4 rounded-xl text-center font-bold text-sm border ${
                    examScore >= 70
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                  }`}
                >
                  {examScore >= 70
                    ? `تبریک! نمره شما ${toPersianDigits(examScore)} از ۱۰۰ شد. گواهینامه معتبر با موفقیت صادر گردید.`
                    : `نمره شما ${toPersianDigits(examScore)} شد. برای قبولی نمره ۷۰ لازم است. لطفاً درس جبرانی را مطالعه کنید.`}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end gap-2">
              <button
                onClick={() => setActiveExamCat(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                بستن
              </button>

              {!examSubmitted ? (
                <button
                  onClick={handleFinishExam}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm"
                >
                  ثبت پاسخ‌ها و صدور گواهینامه
                </button>
              ) : (
                <button
                  onClick={() => setActiveExamCat(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
                >
                  تأیید و ذخیره
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
