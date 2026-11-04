import { DecisionNode } from '../types';

export const DECISION_NODES: Record<string, DecisionNode> = {
  root: {
    id: 'root',
    question: 'وضعیت اولیه مراجعه‌کننده و مدارک ارائه‌شده چگونه است؟',
    description: 'نقطه شروع بررسی هوشمند خدمت بر پایه اصل استقلال هدایت‌شده پرسنل.',
    options: [
      {
        label: 'مدارک شناسایی و اطلاعات درخواستی کاملاً حاضر و معتبر است',
        nextId: 'check_system_status'
      },
      {
        label: 'یک یا چند مدرک ضروری (کارت ملی، اجاره‌نامه، کد پستی یا خط به نام) همراه مشتری نیست',
        nextId: 'branch_missing_docs'
      },
      {
        label: 'مشتری مدارک ناقص یا مشکوک دارد یا متقاضی انجام کار برای شخص ثالث غایب است',
        nextId: 'branch_suspicious_or_absent'
      }
    ]
  },

  check_system_status: {
    id: 'check_system_status',
    question: 'آیا سامانه اصلی و وب‌سرویس‌های استعلامی در دسترس و فعال هستند؟',
    description: 'بررسی درگاه‌های دولتی (عدل ایران، راهور، مای‌تکس، تامین اجتماعی، ثبت احوال).',
    options: [
      {
        label: 'سامانه باز است و کد پیامکی و کپچا بدون مشکل دریافت می‌شود',
        nextId: 'check_rules_and_pricing'
      },
      {
        label: 'سامانه خطای قطعی سرور (Error 500 / 502 / پایگاه داده در دسترس نیست) می‌دهد',
        nextId: 'branch_system_outage'
      },
      {
        label: 'سامانه خطای اعتبارسنجی کاربری خاص می‌دهد (مثلاً کاربر مسدود است یا کد خطا در کتابخانه نیست)',
        nextId: 'branch_technical_unknown'
      }
    ]
  },

  check_rules_and_pricing: {
    id: 'check_rules_and_pricing',
    question: 'آیا شرایط خدمت و هزینه‌های مصوب مورد توافق مشتری قرار دارد؟',
    description: 'انطباق درخواست با شرایط نرخ‌نامه مصوب ۱۴۰۵ و شرایط سنی/قانونی.',
    options: [
      {
        label: 'مشتری پیش‌فاکتور تفکیک‌شده (دستمزد + واریزی دولتی) را تایید کرده و شرایط قانونی را دارد',
        outcome: {
          level: 'green',
          actionTitle: 'مجوز انجام مستقل خدمت (سطح سبز)',
          actionMessage: 'پرسنل می‌تواند با چک‌لیست پلتفرم و راهنمای گام‌به‌گام خدمت را مستقل انجام داده و رسید نهایی را صادر کند.',
          actionType: 'proceed'
        }
      },
      {
        label: 'خدمت نیازمند تایید مراحل حساس است (مانند قرعه‌کشی، مالیات خودرو، سفته الکترونیک)',
        outcome: {
          level: 'yellow',
          actionTitle: 'انجام با تایید سیستمی و اعتبارسنجی (سطح زرد)',
          actionMessage: 'پرسنل مراحل را طی می‌کند؛ پیش از زدن دکمه پرداخت نهایی، کنترل‌های سیستمی تطبیق داده می‌شود.',
          actionType: 'proceed'
        }
      },
      {
        label: 'مشتری به قیمت مصوب معترض است یا تقاضای تخفیف خارج از عرف دارد',
        nextId: 'branch_pricing_dispute'
      },
      {
        label: 'موضوع دارای بار حقوقی پیچیده است (مانند قرارداد خودنویس، سند مشاعی، مهلت منقضی بیمه بیکاری)',
        outcome: {
          level: 'red',
          actionTitle: 'ارجاع اجباری به کارفرما (سطح قرمز)',
          actionMessage: 'موضوع خارج از حیطه استقلال پرسنل است. فرم ارجاع و تیکت استثنا ایجاد شده و به مدیر دفتر ارجاع شود.',
          actionType: 'manager_escalation'
        }
      }
    ]
  },

  branch_missing_docs: {
    id: 'branch_missing_docs',
    question: 'چه مواردی ناقص است و آیا مشتری می‌تواند فوراً تهیه کند؟',
    description: 'بررسی راهکارهای جبران کسری مدارک در محل یا صدور برگه رسمی.',
    options: [
      {
        label: 'نقص اطلاعات ساده است (مثلاً کد پستی ندارد که می‌توان با خدمت تاییدیه پستی فوراً استعلام گرفت)',
        outcome: {
          level: 'green',
          actionTitle: 'حل کسری با استعلام آنلاین درون‌سامانه‌ای',
          actionMessage: 'خدمت تاییدیه پستی (۱۵۰,۰۰۰ تومان) را به فاکتور افزوده و استعلام را انجام دهید و کار را ادامه دهید.',
          actionType: 'proceed'
        }
      },
      {
        label: 'مدرک اصلی غایب است (مانند عدم همراه داشتن اصل سند ازدواج، کارت ملی یا خط به نام)',
        outcome: {
          level: 'yellow',
          actionTitle: 'صدور برگه رسمی کسری مدارک مراجعین (HTML Slip)',
          actionMessage: 'جهت جلوگیری از سردرگمی مشتری و اتلاف وقت، برگه رسمی کسری مدارک را چاپ و تحویل متقاضی نمایید.',
          actionType: 'missing_docs',
          deliverable: 'فرم چاپی کسری مدارک'
        }
      }
    ]
  },

  branch_suspicious_or_absent: {
    id: 'branch_suspicious_or_absent',
    question: 'ماهیت درخواست غیرعادی چیست؟',
    options: [
      {
        label: 'فرد ادعا می‌کند کارت ملی همسر، پدر یا دوستش است و رمز پیامکی را هم دارد',
        outcome: {
          level: 'red',
          actionTitle: 'ممنوعیت اقدام - ارجاع امنیتی به کارفرما (سطح قرمز)',
          actionMessage: 'ثبت خدمات قضایی، ثنا، تسهیلات بانکی و مالیاتی برای فرد غایب بدون وکالت‌نامه رسمی اکیداً ممنوع و جرم انتظامی است. موضوع را متوقف و به مدیر گزارش دهید.',
          actionType: 'manager_escalation'
        }
      },
      {
        label: 'ارائه مدارک فتوکپی مخدوش، عکس تیره یا کارت منقضی‌شده',
        outcome: {
          level: 'red',
          actionTitle: 'توقف کار و استعلام از کارفرما (سطح قرمز)',
          actionMessage: 'ثبت پرونده با مدارک مشکوک ممکن است باعث پیگرد قانونی واحد صنفی شود. تیکت کارفرما صادر کنید.',
          actionType: 'manager_escalation'
        }
      }
    ]
  },

  branch_system_outage: {
    id: 'branch_system_outage',
    question: 'مدت و نوع قطعی سامانه دولتی:',
    options: [
      {
        label: 'سامانه در حال به‌روزرسانی سراسری است و پیام رسمی زمان راه‌اندازی دارد',
        outcome: {
          level: 'yellow',
          actionTitle: 'اطلاع‌رسانی به مشتری و ثبت نوبت موقت',
          actionMessage: 'پیام رسمی سازمان دولتی را به مشتری نشان دهید، شماره تماس وی را ثبت و زمان تخمینی بازگشت سامانه را اعلام نمایید.',
          actionType: 'technical_ticket'
        }
      },
      {
        label: 'قطعی نامشخص است یا مشتری ادعا می‌کند دفاتر دیگر همین خدمت را الان انجام می‌دهند',
        outcome: {
          level: 'red',
          actionTitle: 'بررسی زیرساخت شبکه و ارجاع به کارفرما (سطح قرمز)',
          actionMessage: 'بررسی تنظیمات DNS، کش مرورگر و آی‌پی استاتیک توسط مدیر فنی؛ ایجاد تیکت پشتیبانی.',
          actionType: 'manager_escalation'
        }
      }
    ]
  },

  branch_pricing_dispute: {
    id: 'branch_pricing_dispute',
    question: 'علت اعتراض مالی مشتری:',
    options: [
      {
        label: 'مشتری تصور می‌کرد هزینه واریزی دولتی (مثلاً تمبر یا مالیات) مشمول دستمزد کافی‌نت است',
        outcome: {
          level: 'green',
          actionTitle: 'توضیح پیش‌فاکتور تفکیک‌شده شفاف',
          actionMessage: 'برگه پیش‌فاکتور تفکیک‌شده را به مشتری نشان دهید و خط نرخ‌نامه مصوب ۱۴۰۵ نصب شده در دفتر را به او ارائه دهید.',
          actionType: 'proceed'
        }
      },
      {
        label: 'مشتری اصرار بر عدم پرداخت دستمزد قانونی دارد یا قصد ترک دفتر بدون تسویه را دارد',
        outcome: {
          level: 'red',
          actionTitle: 'ارجاع فوری به کارفرما / مدیر دفتر (سطح قرمز)',
          actionMessage: 'پرسنل نباید وارد بحث لفظی شود. بلافاصله کارفرما را مطلع سازید.',
          actionType: 'manager_escalation'
        }
      }
    ]
  },

  branch_technical_unknown: {
    id: 'branch_technical_unknown',
    question: 'کد خطای سامانه چیست؟',
    options: [
      {
        label: 'کد خطا در کتابخانه خطاهای رایج پلتفرم موجود است',
        outcome: {
          level: 'green',
          actionTitle: 'اجرای راهکار استاندارد از کتابخانه خطاها',
          actionMessage: 'راه حل ثبت‌شده در Service Card یا کتابخانه را اجرا نمایید (مثل تغییر مرورگر یا اصلاح فرمت فایل).',
          actionType: 'proceed'
        }
      },
      {
        label: 'کد خطای جدید یا ناشناخته است که قبلاً ثبت نشده',
        outcome: {
          level: 'red',
          actionTitle: 'ثبت تیکت فنی و ارجاع به کارفرما (سطح قرمز)',
          actionMessage: 'اسکرین‌شات خطا و کد مربوطه را در تیکت ضمیمه کنید تا کارفرما آن را بررسی و به کتابخانه خطاهای پلتفرم اضافه کند.',
          actionType: 'manager_escalation'
        }
      }
    ]
  }
};
