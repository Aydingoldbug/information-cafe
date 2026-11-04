import React from 'react';
import { 
  ShieldCheck, 
  User, 
  Crown, 
  Clock, 
  FileText, 
  Bell, 
  Sparkles,
  BookOpen,
  MonitorPlay,
  Zap,
  GitBranch,
  Award,
  BarChart3,
  Download
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface NavbarProps {
  currentRole: 'staff' | 'manager';
  onRoleChange: (role: 'staff' | 'manager') => void;
  activeModule: number;
  onSelectModule: (moduleId: number) => void;
  pendingEscalationsCount: number;
  tariffVersion: string;
  onOpenExportCenter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeModule,
  onSelectModule,
  pendingEscalationsCount,
  tariffVersion,
  onOpenExportCenter
}) => {
  const modules = [
    { id: 1, title: 'پایگاه دانش نرخ‌نامه', icon: FileText, badge: '۱۴۰۵' },
    { id: 2, title: 'یادگیری تطبیقی', icon: BookOpen, badge: '۷ دوره' },
    { id: 3, title: 'شبیه‌ساز عملی', icon: MonitorPlay, badge: '۴ سناریو' },
    { id: 4, title: 'دستیار هوشمند میز', icon: Zap, badge: 'زنده' },
    { id: 5, title: 'درخت تصمیم و رویه‌ها', icon: GitBranch, badge: '۳ سطح' },
    { id: 6, title: 'ارزیابی و گواهینامه', icon: Award, badge: '۵ مهارت' },
    { id: 7, title: 'داشبورد کارفرما', icon: BarChart3, badge: pendingEscalationsCount > 0 ? `${pendingEscalationsCount} تیکت` : 'مدیریت' },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-xl backdrop-blur-md bg-opacity-95">
      {/* Top Bar: Brand, Role Switcher, System Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-slate-800/80">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  پلتفرم استقلال هدایت‌شده کافی‌نت
                </h1>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-2 py-0.5 rounded-full font-semibold">
                  نسخه {toPersianDigits(tariffVersion)}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                نرخ‌نامه مصوب سال ۱۴۰۵ | مدل سه سطحی (سبز، زرد، قرمز) بدون خدمات چاپ
              </p>
            </div>
          </div>

          {/* Right side controls: Role Toggle & Export & Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status pill */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300">اتصال پایگاه داده نرخ‌نامه: برخط</span>
            </div>

            {/* Export Center Trigger Button */}
            <button
              onClick={onOpenExportCenter}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-semibold transition-all shadow-sm shadow-amber-500/10"
              title="دریافت انواع خروجی‌ها (اکسل، PDF، فاکتور، JSON)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>مرکز خروجی‌ها</span>
            </button>

            {/* Role switcher toggle */}
            <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700 flex items-center shadow-inner">
              <button
                onClick={() => onRoleChange('staff')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  currentRole === 'staff'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>پرسنل میز خدمت</span>
              </button>

              <button
                onClick={() => onRoleChange('manager')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative ${
                  currentRole === 'manager'
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>کارفرما / مدیر</span>
                {pendingEscalationsCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {pendingEscalationsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (7 Core Modules) */}
        <nav className="flex items-center space-x-reverse space-x-1 overflow-x-auto py-2.5 scrollbar-none">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            const isManagerOnly = mod.id === 7 && currentRole !== 'manager';

            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-slate-800 text-amber-400 border border-slate-700 shadow-md shadow-slate-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{mod.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-normal ${
                    isActive
                      ? 'bg-amber-400/10 text-amber-300'
                      : mod.id === 7 && pendingEscalationsCount > 0
                      ? 'bg-red-500/20 text-red-300 font-bold'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {mod.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
