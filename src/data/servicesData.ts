import { ServiceCard } from '../types';

export const SERVICES_CATALOG: ServiceCard[] = [
  // ==========================
  // بخش ۱: قضایی و انتظامی
  // ==========================
  {
    id: 'sana_reg',
    code: 'JUD-01',
    name: 'ثبت‌نام ثنا و احراز هویت الکترونیک',
    category: 'judiciary',
    primarySystem: 'سامانه عدل ایران (درگاه ملی قوه قضاییه)',
    primarySystemUrl: 'https://adliran.ir',
    priceRial: 3000000,
    priceToman: 300000,
    autonomyLevel: 'yellow',
    description: 'تشکیل پرونده ثنا، ثبت اطلاعات هویتی و عکس، و انجام احراز هویت برخط با ضبط ویدیو و تطبیق چهره با ثبت احوال.',
    requiredDocuments: [
      'کارت ملی هوشمند یا رسید تعویض کارت ملی',
      'شناسنامه (اطلاعات شماره سریال و تاریخ تولد دقیق)',
      'سیم‌کارت فعال به نام شخص متقاضی',
      'کد پستی ۱۰ رقمی معتبر و تاییدیه نشانی'
    ],
    prerequisites: [
      'روشن بودن دوربین و میکروفون سیستم در مرحله ضبط ویدیو',
      'تطابق دقیق نام مالک سیم‌کارت با کد ملی (تایید سامانه شاهکار)'
    ],
    prerequisiteSystems: ['سامانه ثبت احوال', 'سامانه شاهکار تنظیم مقررات'],
    externalFees: [
      {
        name: 'تعرفه کارمزد کارگزاری احراز هویت قوه قضاییه',
        system: 'اپراتور احراز هویت قوه قضاییه',
        amountRial: 250000,
        amountToman: 25000,
        isMandatory: true,
        description: 'واریزی رسمی پردازش بیومتریک و تطبیق هوش مصنوعی ثبت احوال'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود به درگاه ثنا و ثبت اطلاعات پایه',
        system: 'عدل ایران - ثبت نام برخط شخص حقیقی',
        description: 'کد ملی، تاریخ تولد و سریال شناسنامه وارد شده و استعلام اولیه از ثبت احوال گرفته می‌شود.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'تأیید شماره همراه و آدرس',
        system: 'شاهکار و کدپستی',
        description: 'کد پیامکی ارسال شده به سیم‌کارت مشتری وارد می‌شود؛ کد پستی و آدرس دقیق محل سکونت درج می‌گردد.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 3,
        title: 'پرداخت تعرفه دولتی و احراز هویت چهره',
        system: 'درگاه پرداخت شاپرک و موتور بیومتریک',
        description: 'پرداخت ۲۵ هزار تومان تعرفه مصوب قوه قضاییه، ضبط سلفی متحرک یا تلفظ عبارت تصادفی طبق راهنما.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 4,
        title: 'دریافت رمز شخصی (کد ثنا) و چاپ برگه',
        system: 'عدل ایران',
        description: 'پس از تایید خودکار، رمز شخصی ثنا به شماره مشتری پیامک شده و برگه ثنا تحویل داده می‌شود.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'SHAHKAR_MISMATCH',
        errorTitle: 'عدم تطابق کدملی و شماره سیم‌کارت',
        symptom: 'پیام خطای "شماره همراه با کد ملی همخوانی ندارد" نمایش داده می‌شود.',
        rootCause: 'سیم‌کارت به نام همسر، فرزند یا دیگری است یا به تازگی انتقال یافته است.',
        solution: 'مشتری باید سیم‌کارت فعال به نام خود تهیه کند یا سیم‌کارت دیگری به نام خود ارائه دهد. کار را متوقف کنید.',
        escalateIfFails: false
      },
      {
        errorCode: 'FACIAL_FAIL',
        errorTitle: 'رد احراز چهره (عدم تطابق با عکس کارت ملی)',
        symptom: 'پس از ۳ بار ارسال ویدیو، خطای تطبیق ناموفق صادر می‌گردد.',
        rootCause: 'نور کم، تغییرات چهره، حجاب نامناسب نسبت به مدارک یا عدم تطابق با پایگاه ثبت احوال.',
        solution: 'افزایش نور پس‌زمینه، نگاه مستقیم به لنز دوربین و خواندن آرام متن تصادفی. اگر نشد، ارجاع به دفاتر خدمات الکترونیک قضایی حضوری.',
        escalateIfFails: true
      }
    ],
    escalationCondition: 'در صورت فوت متقاضی، محجور بودن، کارت ملی مخدوش یا مغایرت سجلی شدید.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'sana_clearance',
    code: 'JUD-02',
    name: 'ثبت عدم سوء پیشینه الکترونیکی',
    category: 'judiciary',
    primarySystem: 'سامانه عدل ایران (سامانه جامع خدمات الکترونیک قضایی)',
    primarySystemUrl: 'https://adliran.ir',
    priceRial: 1200000,
    priceToman: 120000,
    autonomyLevel: 'green',
    description: 'درخواست صدور گواهی عدم سوء پیشینه کیفری برای ارائه به ادارات، شرکت‌ها، اصناف و مراکز استخدامی.',
    requiredDocuments: [
      'حساب کاربری فعال ثنا (رمز شخصی و نام کاربری)',
      'سیم‌کارت ثنا در دسترس متقاضی جهت دریافت رمز موقت ورود',
      'مشخص بودن مرجع متقاضی گواهی (مثلاً شرکت، اداره، سازمان یا شخصی)'
    ],
    prerequisites: ['ثبت‌نام کامل ثنا', 'کارت بانکی جهت پرداخت هزینه دادرسی'],
    prerequisiteSystems: ['سامانه ثنا'],
    externalFees: [
      {
        name: 'هزینه تمبر دادرسی قوه قضاییه',
        system: 'عدل ایران',
        amountRial: 200000,
        amountToman: 20000,
        isMandatory: true,
        description: 'هزینه قانونی استعلام از دادستانی کل کشور'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود به سامانه خدمات قضایی من',
        system: 'عدل ایران',
        description: 'ورود با کد ملی و رمز شخصی ثنا و دریافت رمز موقت پیامکی از مشتری.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'ثبت درخواست گواهی جدید',
        system: 'بخش سوء پیشینه عدل ایران',
        description: 'انتخاب واحد قضایی صادرکننده و ثبت مرجع تقاضاکننده (نام ارگان، شرکت خصوصی یا اصناف).',
        isCritical: false,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'پرداخت الکترونیک تمبر دادرسی',
        system: 'شاپرک قضایی',
        description: 'پرداخت ۲۰ هزار تومان هزینه دادرسی با کارت بانکی متقاضی.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 4,
        title: 'ارائه کد پیگیری و راهنمای دریافت',
        system: 'سامانه و پیامک',
        description: 'تحویل برگه رهگیری با کدرهگیری ۱۶ رقمی به مشتری با توضیح بازه زمانی صدور (معمولاً ۲۴ تا ۴۸ ساعت).',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'SANA_EXPIRED_PASS',
        errorTitle: 'فراموشی رمز شخصی ثنا',
        symptom: 'مشتری رمز شخصی ثنا را به خاطر ندارد.',
        rootCause: 'فراموشی رمز یا تعویض خط.',
        solution: 'روی لینک بازیابی رمز شخصی کلیک کنید (هزینه طبق نرخ‌نامه ۳۰,۰۰۰ تومان). رمز جدید به خط پیامک می‌شود.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'وجود پرونده باز دادگاه کیفری یا درخواست تسریع فوری اضطراری با دستور قضایی خاص.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'sana_eblagh',
    code: 'JUD-03',
    name: 'دریافت ابلاغیه قضایی',
    category: 'judiciary',
    primarySystem: 'سامانه ابلاغ الکترونیک عدل ایران',
    primarySystemUrl: 'https://eblagh.adliran.ir',
    priceRial: 500000,
    priceToman: 50000,
    autonomyLevel: 'green',
    description: 'مشاهده، ذخیره و پرینت متن ابلاغیه‌های دادگاه، احضاریه‌ها، دادنامه‌ها و قرارهای قضایی.',
    requiredDocuments: [
      'کد ملی',
      'رمز شخصی ثنا',
      'گوشی متقاضی جهت دریافت رمز موقت'
    ],
    prerequisites: ['حساب کاربری ثنا فعال'],
    prerequisiteSystems: ['عدل ایران'],
    externalFees: [],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود به سامانه ابلاغ',
        system: 'eblagh.adliran.ir',
        description: 'درج کد ملی و رمز ثنا و دریافت کد پیامکی ۵ رقمی.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'بررسی ابلاغیه‌های جدید و پیوست‌ها',
        system: 'کارتابل ابلاغ قضایی',
        description: 'کلیک روی ابلاغیه جدید، مشاهده پیوست دادنامه یا قرار نهایی دادگاه.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'تحویل محرمانه فایل / پرینت',
        system: 'سیستم محلی',
        description: 'ذخیره PDF در پوشه مشتری یا تحویل مستقیم بدون ذخیره‌سازی روی دسکتاپ به منظور رعایت حریم خصوصی.',
        isCritical: true,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'ATTACHMENT_DOWNLOAD_ERROR',
        errorTitle: 'خطای عدم باز شدن پیوست رأی دادگاه',
        symptom: 'پیوست دانلود نمی‌شود یا خطای امنیتی مرورگر می‌دهد.',
        rootCause: 'مسدود بودن پاپ‌آپ در مرورگر یا کندی سرور قضایی.',
        solution: 'پاپ‌آپ را در مرورگر مجاز کنید (Allow Popups) و با مرورگر فایرفاکس یا اج مجدداً باز نمایید.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'مهلت اعتراض ۲۰ روزه رو به پایان باشد و مشتری درخواست مشاوره حقوقی داشته باشد.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'sana_nobat',
    code: 'JUD-04',
    name: 'نوبت‌دهی قضایی شعبه دادگاه / اجرای احکام',
    category: 'judiciary',
    primarySystem: 'سامانه نوبت دهی قضایی عدل ایران',
    primarySystemUrl: 'https://adliran.ir',
    priceRial: 1200000,
    priceToman: 120000,
    autonomyLevel: 'green',
    description: 'رزرو نوبت حضور در شعب دادسرا، محاکم عمومی، حقوقی، خانواده یا اجرای احکام مدنی و کیفری.',
    requiredDocuments: [
      'کد ملی و رمز ثنا',
      'شماره پرونده ۱۶ رقمی یا ردیف فرعی پرونده',
      'نام دقیق مجتمع قضایی و شعبه مربوطه'
    ],
    prerequisites: ['تشکیل پرونده قبلی در سامانه قضایی'],
    prerequisiteSystems: ['عدل ایران'],
    externalFees: [],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود به سامانه نوبت‌دهی',
        system: 'عدل ایران',
        description: 'ورود با اطلاعات ثنا متقاضی.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'انتخاب استان، حوزه قضایی و شعبه',
        system: 'فرم نوبت‌دهی',
        description: 'تطبیق دقیق نام شعبه و موضوع مراجعه با ابلاغیه مشتری.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'رزرو نزدیک‌ترین تاریخ و زمان خالی',
        system: 'تقویم رزرو',
        description: 'هماهنگی روز و ساعت با مشتری و ثبت نهایی رزرو.',
        isCritical: false,
        requiresClientAuth: false
      },
      {
        stepNumber: 4,
        title: 'چاپ برگه نوبت با بارکد',
        system: 'گواهی نوبت',
        description: 'پرینت برگه دارای کد رهگیری، ساعت حضور و الزامات همراه داشتن کارت شناسایی.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'NO_OPEN_SLOT',
        errorTitle: 'پر بودن ظرفیت نوبت‌های شعبه تا پایان ماه',
        symptom: 'همه روزهای تقویم قرمز یا غیرفعال است.',
        rootCause: 'ترافیک بالای شعبه قضایی؛ باز شدن نوبت‌ها در ساعت مشخصی از روز (معمولاً ۸ یا ۱۰ صبح).',
        solution: 'توضیح زمان بازگشایی ظرفیت‌ها به مشتری، و تعیین زمان مراجعه مجدد در رأس ساعت باز شدن ظرفیت سامانه.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'ارجاع به کارفرما در صورت پرونده‌های فوری زندانی‌دار یا دستور بازداشت.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },

  // ==========================
  // بخش ۲: خودرو و راهور
  // ==========================
  {
    id: 'car_plate_appointment',
    code: 'VEH-01',
    name: 'نوبت‌دهی تعویض پلاک خودرو',
    category: 'vehicle',
    primarySystem: 'سامانه نوبت‌دهی تعویض پلاک راهور',
    primarySystemUrl: 'https://nobatdehi.epolice.ir',
    priceRial: 2000000,
    priceToman: 200000,
    autonomyLevel: 'yellow',
    description: 'رزرو نوبت مراکز تعویض پلاک سراسر کشور. این خدمت بدون تسویه پیش‌نیازها در مراکز رد می‌شود!',
    requiredDocuments: [
      'کد ملی و شماره موبایل به نام متقاضی',
      'شماره پلاک خودرو و مشخصات برگ سبز (VIN و شماره موتور/شاسی)',
      'تاییدیه تسویه خلافی و عوارض آزادراهی',
      'تاییدیه پرداخت مالیات نقل و انتقال خودرو',
      'احراز نشانی سکونت در سامانه سخا'
    ],
    prerequisites: [
      'تسویه کامل مالیات نقل و انتقال خودرو (سامانه واتی)',
      'تسویه خلافی و عوارض آزادراهی (سخا یا راهور ۱۲۰)',
      'ثبت احراز نشانی سکونت مالک جدید در سخا'
    ],
    prerequisiteSystems: [
      'سامانه واتی (مالیات نقل و انتقال cartax.tax.gov.ir)',
      'سامانه سخا (احراز سکونت sakha.epolice.ir)',
      'سامانه استعلام خلافی راهور'
    ],
    externalFees: [
      {
        name: 'مالیات نقل و انتقال خودرو به حساب دولت (متغیر بر اساس مدل و سال ساخت)',
        system: 'سامانه واتی امور مالیاتی',
        amountRial: 1500000,
        amountToman: 150000,
        isMandatory: true,
        description: 'هزینه خدمت پرداخت مالیات خودرو (۱۵۰ هزار تومان) + اصل مبلغ مالیات دولتی'
      },
      {
        name: 'تسویه خلافی و جرایم معوقه راهنمایی و رانندگی',
        system: 'پلیس راهور ۱۲۰',
        amountRial: 1500000,
        amountToman: 150000,
        isMandatory: true,
        description: 'هزینه خدمت استعلام و پرداخت خلافی (۱۵۰ هزار تومان) + اصل جریمه'
      },
      {
        name: 'تاییدیه احراز آدرس و کد پستی در سخا (پست هوشمند)',
        system: 'سخا و پست',
        amountRial: 2000000,
        amountToman: 200000,
        isMandatory: true,
        description: 'در صورت عدم احراز قبلی نشانی در سامانه سخا'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'بررسی پیش‌نیاز مالیات نقل و انتقال',
        system: 'cartax.tax.gov.ir',
        description: 'استعلام اینکه آیا مالیات نقل و انتقال واریز شده یا خیر. در صورت عدم پرداخت، ابتدا کارمزد مالیات خودرو افزوده و تسویه شود.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'بررسی خلافی خودرو و عوارض آزادراهی',
        system: 'راهور ۱۲۰ / سخا',
        description: 'استعلام جرایم؛ خلافی خودرو در زمان تعویض پلاک باید صفر باشد.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 3,
        title: 'بررسی احراز سکونت خریدار در سامانه سخا',
        system: 'sakha.epolice.ir',
        description: 'اگر وضعیت سکونت تأیید نشده باشد، کارت خودرو به آدرس جدید ارسال نخواهد شد.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 4,
        title: 'ورود به سامانه نوبت‌دهی و رزرو مرکز',
        system: 'nobatdehi.epolice.ir',
        description: 'انتخاب مرکز تعویض پلاک، درج پلاک و VIN، تعیین روز و بازه زمانی، و چاپ نهایی برگه رزرو نوبت.',
        isCritical: true,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'TAX_UNPAID_BLOCK',
        errorTitle: 'پیام خطای "مالیات نقل و انتقال پرداخت نشده است"',
        symptom: 'سامانه اجازه ثبت پلاک خودرو را نمی‌دهد.',
        rootCause: 'مالیات در سامانه واتی امور مالیاتی پرداخت نشده یا به تازگی پرداخت شده و نشست اطلاعات انجام نشده است.',
        solution: 'مشتری را به خدمت "ثبت‌نام و پرداخت مالیات نقل و انتقال" راهنمایی کنید. پس از پرداخت آنلاین، ۱۰ دقیقه صبر کرده و مجدد اقدام کنید.',
        escalateIfFails: false
      },
      {
        errorCode: 'SAKHA_ADDRESS_UNVERIFIED',
        errorTitle: 'عدم تایید احراز سکونت خریدار',
        symptom: 'خطای "احراز آدرس در سامانه سخا انجام نگرفته" صادر می‌شود.',
        rootCause: 'کد پستی مشتری در سخا ثبت نشده یا تاییدیه پست ندارد.',
        solution: 'ورود به سامانه سخا -> خدمات پلیس راهور -> احراز سکونت -> ثبت کد پستی و ارجاع مامور پست یا تایید پیامکی.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'اختلاف مالکیت، توقیف قضایی پلاک یا شکایت خریدار/فروشنده درباره هزینه‌های تسویه.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'car_tax_fines',
    code: 'VEH-02',
    name: 'ثبت‌نام و پرداخت مالیات نقل و انتقال و خلافی خودرو',
    category: 'vehicle',
    primarySystem: 'سامانه مالیات بر نقل و انتقال خودرو (واتی)',
    primarySystemUrl: 'https://cartax.tax.gov.ir',
    priceRial: 1500000,
    priceToman: 150000,
    autonomyLevel: 'yellow',
    description: 'محاسبه ارزش روز خودرو، پرداخت مالیات قطعی دولتی نقل و انتقال و دریافت رسید رسمی مالیاتی قبل از تعویض پلاک.',
    requiredDocuments: [
      'کد ملی مالک فعلی (فروشنده)',
      'شماره تلفن همراه به نام فروشنده',
      'پلاک خودرو و شماره شاسی/VIN'
    ],
    prerequisites: ['اطلاعات هویتی مالک و پلاک فعال'],
    prerequisiteSystems: ['سازمان امور مالیاتی کشور', 'شاپرک'],
    externalFees: [
      {
        name: 'مبلغ اصل مالیات دولتی خودرو (طبق جدول دارایی)',
        system: 'سازمان مالیاتی',
        amountRial: 0,
        amountToman: 0,
        isMandatory: true,
        description: 'مبلغ دقیق در سیستم بر حسب ارزش، سال ساخت و داخلی/وارداتی بودن محاسبه و به واریزی افزوده می‌شود'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود با کدملی فروشنده به واتی',
        system: 'cartax.tax.gov.ir',
        description: 'ارسال کد یکبارمصرف به شماره مالک و ورود به داشبورد.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'استعلام خودرو و نمایش ارزش معاملاتی',
        system: 'سامانه واتی',
        description: 'انتخاب خودرو از لیست پلاک‌های فعال و مشاهده مبلغ مالیات برآورد شده توسط سازمان مالیاتی.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'پرداخت از درگاه بانکی و صدور مفاصاحساب',
        system: 'درگاه پرداخت شاپرک',
        description: 'پرداخت آنلاین مالیات با کارت خریدار یا فروشنده و صدور گواهی پرداخت با شناسه قبض و پرداخت.',
        isCritical: true,
        requiresClientAuth: true
      }
    ],
    commonErrors: [
      {
        errorCode: 'CAR_NOT_FOUND',
        errorTitle: 'خودرو در لیست پلاک‌های مالک وجود ندارد',
        symptom: 'پلاک مورد نظر در لیست نمایش داده نمی‌شود.',
        rootCause: 'خودرو به صورت وکالتی خریداری شده و هنوز در سیستم راهور به نام فرد جدید ننشسته است.',
        solution: 'باید با کدملی شخص قبلی که برگ سبز به نام اوست وارد سامانه شوید یا از گزینه "افزودن پلاک جدید با کد VIN" استفاده کنید.',
        escalateIfFails: true
      }
    ],
    escalationCondition: 'اعتراض به مبلغ مالیات محاسبه شده یا پلاک دارای دستور منع معامله.',
    escalationRole: 'حسابدار ارشد',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'car_lottery_reg',
    code: 'VEH-03',
    name: 'ثبت‌نام اولیه ایران‌خودرو، سایپا و سامانه یکپارچه',
    category: 'vehicle',
    primarySystem: 'سامانه یکپارچه عرضه خودروهای داخلی / ایران خودرو',
    primarySystemUrl: 'https://ikcosales.ir',
    priceRial: 3500000,
    priceToman: 350000,
    autonomyLevel: 'yellow',
    description: 'افتتاح پروفایل، ثبت گواهینامه رانندگی، تایید حساب وکالتی و احراز شماره شبا و شرایط قرعه‌کشی.',
    requiredDocuments: [
      'کارت ملی هوشمند و شناسنامه',
      'شماره گواهینامه معتبر دارای اعتبار',
      'حساب وکالتی با موجودی مسدود شده مصوب در بانک عامل',
      'شماره شبا و شماره موبایل به نام متقاضی',
      'کد پستی معتبر'
    ],
    prerequisites: [
      'عدم داشتن پلاک فعال انتظامی فعال در خانواده طبق بخشنامه',
      'گذشت حداقل ۴۸ ماه از آخرین خرید خودروسازان',
      'مسدودسازی وجه ضمانت حساب وکالتی در موعد مقرر بخشنامه'
    ],
    prerequisiteSystems: ['بانک عامل (سامانه حساب وکالتی)', 'پلیس راهور (استعلام گواهینامه)'],
    externalFees: [
      {
        name: 'انتخاب خودرو و واریز وجه اولویت‌بندی (در صورت انتخاب بعد)',
        system: 'خودروساز',
        amountRial: 1500000,
        amountToman: 150000,
        isMandatory: false,
        description: 'هزینه خدمت مرحله دوم انتخاب خودرو طبق نرخنامه: ۱۵۰,۰۰۰ تومان'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'بررسی افتتاح حساب وکالتی و استعلام موجودی',
        system: 'سامانه بانکی مشتری',
        description: 'اطمینان از اینکه بانک عامل حساب را به نفع سامانه یکپارچه یا خودروساز وکالتی کرده و وجه واریز شده است.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'ثبت اطلاعات هویتی و شماره گواهینامه',
        system: 'سامانه خودروساز',
        description: 'استعلام گواهینامه از راهور و تطبیق کدملی و شبا بانکی.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 3,
        title: 'ثبت متقاضی در طرح مربوطه (عادی، مادران یا جوانی جمعیت)',
        system: 'پرتال یکپارچه',
        description: 'انتخاب طرح، تایید تعهدنامه‌ها، دریافت کدرهگیری و پرینت رسید ثبت‌نام.',
        isCritical: true,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'VAKALATI_NOT_SYNCED',
        errorTitle: 'خطای "عدم تایید حساب وکالتی توسط بانک"',
        symptom: 'سامانه پیام می‌دهد که حساب وکالتی یافت نشد.',
        rootCause: 'بانک هنوز لیست مشتریان وکالتی را به سرور خودروساز ارسال نکرده است (معمولاً ۲۴ ساعت زمان می‌برد).',
        solution: 'بررسی رسید وکالتی بانک. اگر کمتر از ۲۴ ساعت گذشته، به مشتری اطلاع دهید فردا مراجعه نماید. در صورتی که زمان گذشته، تماس با بانک عامل ضروری است.',
        escalateIfFails: true
      }
    ],
    escalationCondition: 'تغییر ناگهانی شرایط بخشنامه یا بروز دعوای متقاضی مبنی بر جا ماندن از مهلت قرعه‌کشی.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'sakha_police',
    code: 'VEH-04',
    name: 'خدمات سامانه سخا (نیروی انتظامی و پلیس)',
    category: 'vehicle',
    primarySystem: 'درگاه خدمات الکترونیک انتظامی (سخا)',
    primarySystemUrl: 'https://sakha.epolice.ir',
    priceRial: 2000000,
    priceToman: 200000,
    autonomyLevel: 'green',
    description: 'احراز نشانی محل سکونت، استعلام وضعیت گذرنامه، کارت پایان خدمت، وضعیت پلاک‌ها و گواهینامه.',
    requiredDocuments: [
      'کد ملی',
      'کد پستی معتبر محل سکونت',
      'شماره تلفن همراه به نام متقاضی'
    ],
    prerequisites: ['مالکیت سیم‌کارت'],
    prerequisiteSystems: ['شرکت ملی پست جمهوری اسلامی ایران'],
    externalFees: [
      {
        name: 'هزینه استعلام و تایید نشانی پستی مامور پست',
        system: 'پست',
        amountRial: 400000,
        amountToman: 40000,
        isMandatory: false,
        description: 'در صورتی که ارسال کد تایید با مامور پست الزامی باشد'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود به سامانه سخا',
        system: 'sakha.epolice.ir',
        description: 'ورود یا ثبت‌نام اولیه با کدملی و رمز یکبارمصرف.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'ثبت و استعلام کد پستی در احراز نشانی',
        system: 'بخش خدمات اقامت و آدرس',
        description: 'درج کدپستی ۱۰ رقمی و دریافت خودکار آدرس متناظر از دیتابیس پست.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'تأیید نهایی نشانی و صدور گواهی سکونت',
        system: 'سامانه سخا',
        description: 'دریافت تاییدیه سیستمی یا ثبت درخواست تایید با مامور توزیع پست.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'POSTAL_CODE_INVALID',
        errorTitle: 'کد پستی در پایگاه داده پست یافت نشد',
        symptom: 'با زدن کد پستی هیچ آدرسی لود نمی‌شود.',
        rootCause: 'کد پستی اشتباه است یا ساختمان نوساز بوده و کد پستی هنوز ژئوکد نشده است.',
        solution: 'مشتری باید از سامانه gnaf.post.ir کد پستی تاییدیه دار بگیرد (خدمت تاییدیه پستی با هزینه ۱۵۰,۰۰۰ تومان).',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'مسدودی امنیتی کد ملی در سامانه انتظامی سخا.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },

  // ==========================
  // بخش ۳: تأمین اجتماعی و روابط کار
  // ==========================
  {
    id: 'tamin_history',
    code: 'SSO-01',
    name: 'دریافت سوابق بیمه تأمین اجتماعی',
    category: 'social_security',
    primarySystem: 'سامانه خدمات غیرحضوری تأمین اجتماعی',
    primarySystemUrl: 'https://eservices.tamin.ir',
    priceRial: 500000,
    priceToman: 50000,
    autonomyLevel: 'green',
    description: 'استعلام کلیه سوابق بیمه‌ای، ریز دستمزد، تعداد روزهای کارکرد و پرینت سوابق تلفیقی با بارکد اصالت.',
    requiredDocuments: [
      'کد ملی',
      'گوشی موبایل به نام متقاضی یا رمز عبور سامانه تأمین اجتماعی'
    ],
    prerequisites: ['پروفایل فعال در تأمین اجتماعی (در صورت نداشتن، هزینه ثبت پروفایل ۱۰۰ هزار تومان جداست)'],
    prerequisiteSystems: ['eservices.tamin.ir'],
    externalFees: [],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود به سامانه تأمین اجتماعی',
        system: 'eservices.tamin.ir',
        description: 'ورود با نام کاربری و گذرواژه یا ورود با دولت من.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'بیمه‌شدگان -> خدمات سابقه -> کلیه سوابق',
        system: 'پنل سوابق',
        description: 'مشاهده ریز سوابق به تفکیک کارگاه و سال.',
        isCritical: false,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'صدور برگه سوابق با کد QR و رمز تصدیق',
        system: 'دانلود PDF رسمی',
        description: 'دانلود فایل رسمی مهر و امضای دیجیتال سازمان تأمین اجتماعی.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'PASS_FORGOTTEN',
        errorTitle: 'فراموشی گذرواژه تأمین اجتماعی',
        symptom: 'ورود ناموفق با خطای گذرواژه اشتباه.',
        rootCause: 'عدم به یاد داشتن رمز ترکیبی حروف بزرگ، کوچک و عدد.',
        solution: 'کلیک روی گزینه "بازیابی گذرواژه" و دریافت کد پیامکی ۵ رقمی به سیم‌کارت مشتری.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'کسری سابقه در سال‌های قبل از ۱۳۸۶ و نیاز به طرح دعوا در کمیسیون ادعای سابقه ماده ۳۹.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'tamin_pension_slip',
    code: 'SSO-02',
    name: 'دریافت فیش حقوق / حکم بازنشستگی / فیش حق بیمه',
    category: 'social_security',
    primarySystem: 'سامانه خدمات غیرحضوری تأمین اجتماعی',
    primarySystemUrl: 'https://eservices.tamin.ir',
    priceRial: 500000,
    priceToman: 50000,
    autonomyLevel: 'green',
    description: 'مشاهده و چاپ آخرین فیش مستمری، احکام افزایش سالانه مستمری و صدور برگ پرداخت بیمه مشاغل آزاد و اختیاری.',
    requiredDocuments: [
      'کد ملی مستمری‌بگیر یا بیمه‌شده',
      'شماره مستمری یا موبایل فعال'
    ],
    prerequisites: ['ثبت پروفایل در تأمین اجتماعی'],
    prerequisiteSystems: ['تأمین اجتماعی'],
    externalFees: [],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود به منوی مستمری‌بگیران یا بیمه‌شدگان',
        system: 'eservices.tamin.ir',
        description: 'انتخاب گزینه مشاهده فیش حقوقی یا صدور برگ پرداخت بیمه اختیاری.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'انتخاب ماه و سال مورد نظر',
        system: 'گزارش‌گیری',
        description: 'انتخاب جدیدترین ماه کاری یا ماه مد نظر بازنشسته.',
        isCritical: false,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'نمایش و چاپ فیش حقوقی',
        system: 'سیستم محلی',
        description: 'تحویل نسخه چاپی با جزئیات کسورات، وام و مبلغ واریزی.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'SLIP_NOT_ISSUED_YET',
        errorTitle: 'فیش ماه جاری هنوز صادر نشده',
        symptom: 'ماه انتخابی خالی است.',
        rootCause: 'فیش‌های مستمری معمولاً از هفدهم هر ماه صادر می‌شوند.',
        solution: 'انتخاب ماه قبل یا توضیح تقویم واریز مستمری تأمین اجتماعی به مشتری.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'اختلاف در مبالغ معوقه متناسب‌سازی یا کسر اقساط غیرمجاز.',
    escalationRole: 'حسابدار ارشد',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'tamin_unemployment',
    code: 'SSO-03',
    name: 'ثبت درخواست بیمه بیکاری در سامانه جامع روابط کار',
    category: 'social_security',
    primarySystem: 'سامانه جامع روابط کار (وزارت تعاون، کار و رفاه اجتماعی)',
    primarySystemUrl: 'https://prkar.mcls.gov.ir',
    priceRial: 3500000,
    priceToman: 350000,
    autonomyLevel: 'yellow',
    description: 'احراز هویت جامع کار، بارگذاری نامه عدم نیاز کارفرما، ثبت درخواست مقرری بیمه بیکاری طبق ماده ۶ و ۷ قانون بیمه بیکاری.',
    requiredDocuments: [
      'احراز هویت قبلی در سامانه جامع کار (در صورت نیاز به احراز جدید: ۱۴۰ هزار تومان)',
      'نامه عدم نیاز کارفرما با مهر و امضای معتبر در سربرگ کارگاه',
      'آخرین قرارداد کارگری',
      'تصویر صفحه اول دفترچه یا برگه شماره حساب بانکی رفاه',
      'حداقل ۶ ماه سابقه بیمه متوالی در کارگاه اخراجی'
    ],
    prerequisites: [
      'گذشت حداکثر ۳۰ روز تقویمی از تاریخ ترک کار / اخراج (مهلت قانونی ماده ۶)',
      'احراز هویت جامع کار در دفاتر پیشخوان یا سامانه برخط'
    ],
    prerequisiteSystems: ['سامانه جامع کار prkar.mcls.gov.ir', 'سامانه تأمین اجتماعی'],
    externalFees: [
      {
        name: 'احراز هویت سامانه جامع کار (در صورت عدم احراز قبلی)',
        system: 'سامانه جامع روابط کار',
        amountRial: 1400000,
        amountToman: 140000,
        isMandatory: false,
        description: 'هزینه خدمت احراز هویت اولیه جامع کار طبق نرخنامه'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'بررسی شرط مهلت ۳۰ روزه',
        system: 'چک‌لیست حقوقی',
        description: 'تاریخ نامه عدم نیاز بررسی شود. اگر بیش از ۳۰ روز گذشته، کارمند نمی‌تواند مستقل انجام دهد و باید به کارفرما ارجاع دهد!',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 2,
        title: 'ورود به سامانه جامع روابط کار',
        system: 'prkar.mcls.gov.ir',
        description: 'ورود با نام کاربری جامع کار و رمز عبور.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 3,
        title: 'ثبت دادخواست بیمه بیکاری و بارگذاری مدارک',
        system: 'کارتابل کارگر',
        description: 'بارگذاری نامه عدم نیاز با کیفیت مناسب، درج شماره حساب رفاه، تاریخ شروع بیکاری و انتخاب شعبه بیمه.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 4,
        title: 'ارائه کدرهگیری و راهنمای پیامک بازرسی',
        system: 'رسید سامانه',
        description: 'تحویل پرینت ثبت‌نام با کدرهگیری و تذکر به متقاضی مبنی بر حضور مامور بازرسی یا دریافت پیامک زمان مصاحبه اداره کار.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'EXPIRED_30_DAYS',
        errorTitle: 'گذشت بیش از ۳۰ روز از تاریخ اخراج',
        symptom: 'سامانه اخطار انقضای مهلت قانونی ماده ۶ را می‌دهد.',
        rootCause: 'مراجعه دیرهنگام کارگر پس از قطع همکاری.',
        solution: 'ثبت مستقیم مقدور نیست؛ کارگر باید ابتدا دادخواست عذر موجه در هیئت تشخیص ثبت کند. فوری ارجاع به کارفرما.',
        escalateIfFails: true
      }
    ],
    escalationCondition: 'گذشت بیش از ۳۰ روز از اخراج، استعفای داوطلبانه، یا ادعای اخراج بدون نامه کارفرما.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'tamin_insurance_list',
    code: 'SSO-04',
    name: 'ارسال لیست بیمه ماهانه کارگاه و پرداخت حق بیمه',
    category: 'social_security',
    primarySystem: 'سامانه پورتال بیمه تأمین اجتماعی کارفرمایان',
    primarySystemUrl: 'https://eservices.tamin.ir',
    priceRial: 2000000,
    priceToman: 200000,
    autonomyLevel: 'yellow',
    description: 'بارگذاری فایل‌های DSKKAR و DSKWOR یا ورود دستی ریز کارکرد پرسنل، صدور فیش و پرداخت حق بیمه کارگاه.',
    requiredDocuments: [
      'نام کاربری و رمز سامانه کارفرمایی تأمین اجتماعی',
      'کد کارگاهی و ردیف پیمان',
      'فایل اطلاعات کارکرد ماهانه پرسنل (تعداد روزهای کارکرد، دستمزد روزانه، مزایای مشمول)'
    ],
    prerequisites: ['نام‌نویسی قبلی کارفرما و پرسنل در شعبه تامین اجتماعی'],
    prerequisiteSystems: ['تامین اجتماعی کارفرمایان'],
    externalFees: [
      {
        name: 'پرداخت آنلاین فیش حق بیمه (خدمت درون سایتی)',
        system: 'شاپرک تأمین اجتماعی',
        amountRial: 700000,
        amountToman: 70000,
        isMandatory: false,
        description: 'هزینه خدمت پرداخت آنلاین حق بیمه طبق نرخنامه ۷۰ هزار تومان'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود به منوی کارفرمایان',
        system: 'eservices.tamin.ir',
        description: 'انتخاب کارگاه مربوطه و سال/ماه عملکرد.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'بارگذاری یا ویرایش لیست پرسنل',
        system: 'بارگذاری لیست',
        description: 'بررسی روزهای ماه (ماه‌های ۳۱ روزه، ۳۰ روزه یا اسفند ۲۹ روزه) و کنترل ترک کار یا اضافه شدن افراد.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'محاسبه حق بیمه و صدور برگ پرداخت',
        system: 'صدور فیش',
        description: 'بررسی سهم کارفرما، بیمه بیکاری و سهم بیمه‌شده و صدور شناسه قبض و پرداخت.',
        isCritical: true,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'DAYS_COUNT_MISMATCH',
        errorTitle: 'خطای مغایرت روزهای ماه با تقویم',
        symptom: 'سامانه لیست را رد می‌کند (مثلاً در ماه‌های نیمه دوم ۳۱ روز ثبت شده باشد).',
        rootCause: 'ثبت اشتباه ۳۱ روز برای ماه‌های ۳۰ روزه پاییز یا اسفند.',
        solution: 'ویرایش فایل اکسل یا فرم کارکرد و اصلاح تعداد روزها بر مبنای تقویم رسمی سال جاری.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'جریمه دیرکرد سنگین، اخطار اجرای ثبت، یا اخراج کارگر حین ماه بدون تسویه‌حساب.',
    escalationRole: 'حسابدار ارشد',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },

  // ==========================
  // بخش ۴: مالیاتی و اصناف
  // ==========================
  {
    id: 'tax_tabasareh_100',
    code: 'TAX-01',
    name: 'اظهارنامه تبصره ۱۰۰ مالیات عملکرد مشاغل',
    category: 'tax',
    primarySystem: 'درگاه ملی خدمات الکترونیک مالیاتی (مای‌تکس)',
    primarySystemUrl: 'https://my.tax.gov.ir',
    priceRial: 4500000,
    priceToman: 450000,
    autonomyLevel: 'yellow',
    description: 'ثبت مالیات مقطوع توافقی بر اساس اطلاعات دستگاه‌های پوز، درگاه‌های پرداخت و اینتاکد مودی بدون نیاز به دفاتر قانونی.',
    requiredDocuments: [
      'کد ملی مودی',
      'سیم‌کارت به نام مودی جهت دریافت OTP سامانه مای‌تکس',
      'کد رهگیری پیش‌ثبت‌نام یا پرونده مالیاتی فعال (گام ۴)',
      'گردش دستگاه کارتخوان (پوز) و واریز به حساب‌های تجاری'
    ],
    prerequisites: [
      'تکمیل بودن پرونده مالیاتی در وضعیت گام ۴',
      'فروش مودی کمتر از سقف مجاز تبصره ۱۰۰ سال جاری (ماده ۱۰۰ قانون مالیات‌های مستقیم)',
      'عدم بدهی تکلیفی ارزش افزوده'
    ],
    prerequisiteSystems: ['مای‌تکس my.tax.gov.ir', 'سامانه مودیان'],
    externalFees: [
      {
        name: 'پرداخت قبض مالیات مقطوع (خدمت پرداخت قبض)',
        system: 'بانک ملی / شاپرک مالیاتی',
        amountRial: 600000,
        amountToman: 60000,
        isMandatory: false,
        description: 'هزینه خدمت صدور و پرداخت قبض مالیاتی طبق نرخنامه ۶۰,۰۰۰ تومان'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود به مای‌تکس و بررسی وضعیت پرونده',
        system: 'my.tax.gov.ir',
        description: 'اطمینان از قرار داشتن پرونده در وضعیت گام ۴ و اتصال صحیح دستگاه‌های کارتخوان.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'استعلام مالیات مقطوع پیشنهادی سازمان',
        system: 'بخش اظهارنامه تبصره ماده ۱۰۰',
        description: 'بررسی مجموع واریزی دستگاه‌های پوز، درصد اینتاکد صنف و مالیات محاسبه‌شده سیستمی.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'بررسی تأیید یا تقسیط با مودی',
        system: 'فرم توافق تبصره ۱۰۰',
        description: 'در صورت پذیرش مودی، انتخاب تعداد اقساط (تا حداکثر مصوب سال) یا پرداخت نقدی یکجا.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 4,
        title: 'ثبت نهایی و دریافت کد رهگیری و قبوض اقساط',
        system: 'سامانه امور مالیاتی',
        description: 'صدور قبوض تقسیط شده، تحویل برگه رسید رسمی اظهارنامه ممهور به کد رهگیری یکتای دارایی.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'SALES_EXCEEDS_CAP',
        errorTitle: 'فروش مودی بالاتر از سقف تبصره ۱۰۰ است',
        symptom: 'گزینه تبصره ۱۰۰ غیرفعال است یا پیغام اجبار به اظهارنامه عادی می‌دهد.',
        rootCause: 'مجموع گردش حساب‌های تجاری متصل به پوز از حدنصاب ۱۰۰ برابر معافیت سال بالاتر رفته است.',
        solution: 'مودی واجد شرایط تبصره ۱۰۰ نیست و باید "اظهارنامه عادی ماده ۹۵" تنظیم شود. ارجاع فوری به کارفرما.',
        escalateIfFails: true
      },
      {
        errorCode: 'INCORRECT_INTACODE',
        errorTitle: 'عدم تطابق اینتاکد صنف با فعالیت واقعی',
        symptom: 'مالیات با ضریب سود بسیار بالا محاسبه شده است.',
        rootCause: 'کد فعالیت شغلی ثبت شده در سال‌های قبل اشتباه درج گردیده است.',
        solution: 'ابتدا باید درخواست ویرایش اینتاکد در کارتابل داده شود یا اعتراض ثبت گردد. بدون تایید کارفرما ارسال نگردد.',
        escalateIfFails: true
      }
    ],
    escalationCondition: 'فروش بالاتر از سقف قانونی، عدم تمایل مودی به پذیرش ارقام پوز، یا مغایرت شرکا در پرونده شراکتی.',
    escalationRole: 'حسابدار ارشد',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'tax_tabasareh_zero',
    code: 'TAX-02',
    name: 'اظهارنامه تبصره ۱۰۰ عملکرد صفر (مغازه یا پرونده غیرفعال)',
    category: 'tax',
    primarySystem: 'مای‌تکس',
    primarySystemUrl: 'https://my.tax.gov.ir',
    priceRial: 3000000,
    priceToman: 300000,
    autonomyLevel: 'green',
    description: 'ثبت عدم فعالیت و عملکرد صفر در سال مالیاتی برای جلوگیری از جرایم عدم تسلیم اظهارنامه.',
    requiredDocuments: [
      'کد ملی مودی',
      'سیم‌کارت جهت دریافت رمز موقت',
      'اطمینان از صفر بودن کامل تراکنش‌های کارتخوان در کل سال مالیاتی'
    ],
    prerequisites: ['هیچ پوز فعالی به پرونده متصل نباشد یا گردش تراکنش آن صفر باشد'],
    prerequisiteSystems: ['مای‌تکس'],
    externalFees: [],
    steps: [
      {
        stepNumber: 1,
        title: 'کنترل گردش دستگاه پوز در سامانه',
        system: 'my.tax.gov.ir',
        description: 'بررسی دقیق جدول واریزی‌ها در سامانه مالیاتی که عدد صفر باشد.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 2,
        title: 'ثبت عملکرد صفر و تاییدیه مودی',
        system: 'فرم اظهارنامه صفر',
        description: 'ثبت تبصره ۱۰۰ با فروش صفر و تایید نهایی.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 3,
        title: 'صدور رسید بدون بدهی',
        system: 'سامانه دارایی',
        description: 'چاپ رسید با مالیات صفر ریال و بایگانی رسید.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'UNEXPECTED_POS_TRANSACTION',
        errorTitle: 'وجود تراکنش در کارتخوان با وجود ادعای عدم فعالیت',
        symptom: 'در سامانه مبلغ گردش وجود دارد اما مشتری مدعی عدم فعالیت است.',
        rootCause: 'دستگاه پوز روشن بوده یا به شخصی قرض داده شده است.',
        solution: 'نمی‌توان اظهارنامه صفر رد کرد زیرا کتمان درآمد محسوب شده و مشمول جرایم غیرقابل بخشش می‌شود. متوقف کردن کار و ارجاع.',
        escalateIfFails: true
      }
    ],
    escalationCondition: 'وجود تراکنش پوز مغایر با ادعای مودی.',
    escalationRole: 'حسابدار ارشد',
    updatedAt: '۱۴۰5/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'tax_mojavez_portal',
    code: 'TAX-03',
    name: 'ورود به درگاه ملی مجوزها و ثبت‌نام اولیه و احراز نشانی',
    category: 'tax',
    primarySystem: 'درگاه ملی مجوزهای کشور',
    primarySystemUrl: 'https://mojavez.ir',
    priceRial: 1500000,
    priceToman: 150000,
    autonomyLevel: 'yellow',
    description: 'ثبت درخواست پروانه کسب صنفی یا مجوزهای دولتی، استعلام کدملی، سوء‌پیشینه و استعلام کدپستی ملک کسبی.',
    requiredDocuments: [
      'کارت ملی و شناسنامه متقاضی',
      'کد پستی دقیق محل واحد صنفی (تاییدیه پستی)',
      'سند مالکیت یا اجاره‌نامه با کد رهگیری خودنویس/املاک',
      'گواهی صلاحیت اماکن یا مدارک صنف مربوطه'
    ],
    prerequisites: ['عدم داشتن منع قانونی استعلام هویتی و ثنا'],
    prerequisiteSystems: ['درگاه ملی مجوزها mojavez.ir', 'سامانه نوین اصناف novinasnaf.ir', 'سامانه پست'],
    externalFees: [
      {
        name: 'استعلام تایید نشانی پستی کسب و کار',
        system: 'پست',
        amountRial: 400000,
        amountToman: 40000,
        isMandatory: true,
        description: 'هزینه استعلام مکانیزه نشانی'
      },
      {
        name: 'ثبت‌نام مراحل اشخاص حقیقی در نوین اصناف (مرحله بعد)',
        system: 'سامانه نوین اصناف',
        amountRial: 3500000,
        amountToman: 350000,
        isMandatory: false,
        description: 'هزینه خدمت نوین اصناف طبق نرخنامه ۳۵۰ هزار تومان'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود به درگاه ملی مجوزها از پنجره ملی دولت',
        system: 'mojavez.ir',
        description: 'احراز هویت پیامکی از طریق سامانه پنجره ملی خدمات دولت هوشمند.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'جستجوی عنوان شغلی و بررسی شرایط مجوز محور/ثبت‌محور',
        system: 'درگاه ملی مجوزها',
        description: 'انتخاب رسته شغلی و بررسی اینکه آیا مجوز ثبت‌محور (فوری) است یا تاییدمحور (نیازمند بازدید اماکن و بهداشت).',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'استعلام کدپستی و بارگذاری اجاره‌نامه',
        system: 'فرم استعلامات پایه',
        description: 'ورود کد پستی واحد صنفی و تطبیق با آدرس اجاره‌نامه خودنویس.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 4,
        title: 'ارسال خودکار به سامانه نوین اصناف',
        system: 'novinasnaf.ir',
        description: 'دریافت کد رهگیری درگاه ملی مجوزها و هدایت به سامانه تخصصی اصناف.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'POSTAL_COMMERCIAL_FAIL',
        errorTitle: 'کد پستی ملک کاربری تجاری/اداری ندارد',
        symptom: 'سامانه اجازه ثبت واحد صنفی روی کد پستی مسکونی را نمی‌دهد.',
        rootCause: 'ملک در دیتابیس شهرداری/پست مسکونی ثبت شده است.',
        solution: 'متقاضی باید مجوز اداری/تجاری شهرداری یا موافقت هیئت مدیره ساختمان (در مشاغل مجاز) ارائه دهد.',
        escalateIfFails: true
      }
    ],
    escalationCondition: 'رسته‌های صنفی حساس (طلافروشی، تجهیزات نظامی، اماکن خاص) یا مشکلات حقوقی سرقفلی و سند مالکیت.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'tax_electronic_code',
    code: 'TAX-04',
    name: 'ثبت‌نام کد اقتصادی به‌صورت کامل',
    category: 'tax',
    primarySystem: 'سازمان امور مالیاتی کشور',
    primarySystemUrl: 'https://my.tax.gov.ir',
    priceRial: 5000000,
    priceToman: 500000,
    autonomyLevel: 'yellow',
    description: 'تشکیل پرونده مالیاتی کامل تا مرحله گام ۴، تعیین اینتاکد، معرفی شعب، اتصال حساب‌های تجاری و صدور شناسه ملی مالیاتی.',
    requiredDocuments: [
      'کارت ملی و شناسنامه تمام شرکا یا صاحب جواز',
      'جواز کسب یا اجاره‌نامه رسمی با کد رهگیری',
      'تاییدیه پستی ۱۰ رقمی',
      'شماره شبای حساب بانکی تجاری'
    ],
    prerequisites: ['تاییدیه ثبت احوال و سیم‌کارت به نام'],
    prerequisiteSystems: ['مای‌تکس', 'سامانه شاهکار', 'پست'],
    externalFees: [
      {
        name: 'افزودن هر شریک در ثبت‌نام (در صورت داشتن شریک)',
        system: 'سازمان مالیاتی',
        amountRial: 800000,
        amountToman: 80000,
        isMandatory: false,
        description: 'هزینه خدمت به ازای هر شریک مازاد: ۸۰ هزار تومان طبق نرخنامه'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'پیش‌ثبت‌نام و اعتبارسنجی تلفن و هویت',
        system: 'register.tax.gov.ir',
        description: 'ورود مشخصات هویتی و ثبت شماره تلفن اختصاصی مودی.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'انتخاب اینتاکد دقیق فعالیت و درصد سود',
        system: 'بخش انتخاب رسته شغلی',
        description: 'انتخاب اینتاکد متناظر با مجوز، ثبت درصد شراکت در صورت پرونده‌های مشارکتی.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'ثبت حساب‌های بانکی تجاری و تعیین موقعیت جغرافیایی',
        system: 'نقشه و بانک',
        description: 'جانمایی واحد صنفی روی نقشه، ثبت شماره شبا و رسیدن به گام ۴ کامل.',
        isCritical: true,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'DUPLICATE_FILE',
        errorTitle: 'مودی دارای پرونده مالیاتی قبلی در همان حوزه است',
        symptom: 'سامانه خطای تکراری بودن کدپستی یا کدملی می‌دهد.',
        rootCause: 'پرونده قدیمی غیرفعال در سنوات گذشته که ابطال یا غیرفعال نشده است.',
        solution: 'باید به جای ثبت پرونده جدید، پرونده قبلی بازیابی یا غیرفعال شود. ارجاع به کارفرما.',
        escalateIfFails: true
      }
    ],
    escalationCondition: 'پرونده‌های شرکت‌های حقوقی، بدهی‌های معوق سنگین یا مغایرت سند مالکیت.',
    escalationRole: 'حسابدار ارشد',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },

  // ==========================
  // بخش ۵: بانکی و وام
  // ==========================
  {
    id: 'bank_marriage_loan',
    code: 'BNK-01',
    name: 'ثبت‌نام وام ازدواج به ازای هر نفر',
    category: 'banking',
    primarySystem: 'سامانه تسهیلات قرض‌الحسنه ازدواج بانک مرکزی',
    primarySystemUrl: 'https://ve.cbi.ir',
    priceRial: 1500000,
    priceToman: 150000,
    autonomyLevel: 'yellow',
    description: 'ثبت‌نام متقاضیان وام ازدواج در سامانه متمرکز بانک مرکزی، تعیین بانک عامل دارای سهمیه اعتباری و دریافت کدرهگیری ۱۰ رقمی.',
    requiredDocuments: [
      'اصل سند ازدواج رسمی (شماره و تاریخ عقدنامه)',
      'کارت ملی و شناسنامه زوجین',
      'کد پستی ۱۰ رقمی محل سکونت',
      'شماره تلفن همراه به نام شخص متقاضی وام'
    ],
    prerequisites: [
      'گذشت کمتر از ۲۴ یا ۳۶ ماه از تاریخ وقوع عقد طبق بخشنامه بودجه سال جاری',
      'عدم دریافت وام ازدواج در سنوات قبلی'
    ],
    prerequisiteSystems: ['ثبت احوال (استعلام وقایع اربعه)', 'بانک مرکزی'],
    externalFees: [
      {
        name: 'هزینه اعتبارسنجی بانکی مرآت یا ایرانیان (در مرحله معرفی ضامن)',
        system: 'سامانه اعتبارسنجی',
        amountRial: 1000000,
        amountToman: 100000,
        isMandatory: false,
        description: 'هزینه استعلام نمره اعتباری وام‌گیرنده و ضامن در بانک'
      },
      {
        name: 'صدور سفته الکترونیکی ضمانت بانکی (در صورت درخواست بانک)',
        system: 'سامانه سفته الکترونیک آی‌کاپ / رسالت',
        amountRial: 2000000,
        amountToman: 200000,
        isMandatory: false,
        description: 'هزینه خدمت صدور سفته الکترونیک طبق نرخنامه: ۲۰۰,۰۰۰ تومان'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'بررسی تاریخ عقد و شرایط سنی و مدارک',
        system: 'چک‌لیست مدارک',
        description: 'کنترل تاریخ عقدنامه و استعلام سهمیه ویژه زیر ۲۵ سال پسر / زیر ۲۳ سال دختر طبق قانون جوانی جمعیت.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 2,
        title: 'ورود به سامانه تسهیلات قرض‌الحسنه بانک مرکزی',
        system: 've.cbi.ir',
        description: 'انتخاب استان، شهر و استعلام بانک‌های دارای سهمیه و ظرفیت فعال.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'ثبت اطلاعات عقدنامه و زوجین',
        system: 'فرم ثبت نام cbi',
        description: 'درج شماره سریال شناسنامه، شماره عقدنامه، کدپستی و تاییدیه ثبت احوال.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 4,
        title: 'دریافت کدرهگیری ۱۰ رقمی و پرینت فرم نهایی',
        system: 'برگه تاییدیه ثبت‌نام',
        description: 'ارائه برگه رسمی ثبت‌نام با هشدار مهلت مراجعه به شعبه پس از دریافت پیامک تعیین شعبه.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'NO_BANK_QUOTA',
        errorTitle: 'هیچ بانکی در شهر انتخابی ظرفیت ندارد',
        symptom: 'لیست بانک‌های استان/شهرستان خالی است.',
        rootCause: 'سهمیه ماهانه بانک‌ها به پایان رسیده و اول هر ماه یا ساعت ۱۰ صبح شارژ می‌شود.',
        solution: 'ساعت باز شدن سهمیه‌ها را برای مشتری یادداشت کنید؛ یا در صورت امکان شهر مجاور با موافقت متقاضی تست شود.',
        escalateIfFails: false
      },
      {
        errorCode: 'SABT_AHVAL_MARRIAGE_MISMATCH',
        errorTitle: 'ثبت احوال واقعه ازدواج را تایید نکرد',
        symptom: 'خطای "شماره عقدنامه با مشخصات شناسنامه‌ای ثبت احوال مطابقت ندارد".',
        rootCause: 'دفترخانه عقدنامه را در سامانه برخط وقایع ثبت احوال نهایی نکرده یا شماره اشتباه درج شده است.',
        solution: 'مشتری باید به دفترخانه صادرکننده سند ازدواج مراجعه کرده و درخواست ثبت برخط وقایع بنماید.',
        escalateIfFails: true
      }
    ],
    escalationCondition: 'ازدواج مجدد، متقاضیان خارج از کشور، یا خطای سامانه بدون باز شدن ظرفیت با ضرب‌الاجل پایان مهلت قانونی عقد.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'bank_safteh_electronic',
    code: 'BNK-02',
    name: 'سفته الکترونیکی و ضمانت بانکی',
    category: 'banking',
    primarySystem: 'سامانه سفته الکترونیک (آی‌کاپ / رسالت / آینده)',
    primarySystemUrl: 'https://icup.ir',
    priceRial: 2000000,
    priceToman: 200000,
    autonomyLevel: 'yellow',
    description: 'صدور سفته الکترونیک، امضای دیجیتال با گواهی ریشه، ظهرنویسی و ضمانت الکترونیک جهت وام‌های بانکی بدون نیاز به سفته کاغذی.',
    requiredDocuments: [
      'کارت ملی هوشمند متعهد و ضامن',
      'کد ملی و شماره موبایل به نام شخص متعهد و ضامن',
      'نصب برنامه امضای دیجیتال و صدور گواهی امضا',
      'کد ملی شناسه بانک / دریافت‌کننده وجه'
    ],
    prerequisites: ['صدور گواهی امضای دیجیتال فعال بر روی گوشی متقاضی'],
    prerequisiteSystems: ['مرکز ریشه گواهی الکترونیکی کشور (نماد)', 'وزارت امور اقتصادی و دارایی'],
    externalFees: [
      {
        name: 'هزینه تمبر مالیاتی سفته الکترونیک به حساب خزانه‌داری کل کشور',
        system: 'وزارت اقتصاد',
        amountRial: 500000,
        amountToman: 50000,
        isMandatory: true,
        description: 'نیم در هزار مبلغ اسمی سفته الکترونیک (مثلاً برای ۱۰۰ میلیون تومان معادل ۵۰ هزار تومان)'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'صدور گواهی امضای دیجیتال برخط',
        system: 'اپلیکیشن امضا',
        description: 'احراز هویت و صدور کلید خصوصی امن امضای دیجیتال.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'تعیین مبلغ و تاریخ سررسید سفته',
        system: 'پرتال صدور سفته',
        description: 'درج مبلغ دقیق درخواستی بانک و درج شناسه اختصاصی متعهدله (بانک یا کارفرما).',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'پرداخت حق تمبر و امضای دیجیتال',
        system: 'شاپرک و توکن امن',
        description: 'پرداخت تمبر دولتی با کارت شتاب، امضای دیجیتال سفته و دریافت فایل PDF دارای شناسه یکتای سفته الکترونیک.',
        isCritical: true,
        requiresClientAuth: true
      }
    ],
    commonErrors: [
      {
        errorCode: 'SIGNATURE_CERT_FAIL',
        errorTitle: 'انقضا یا خطای گواهی امضای دیجیتال',
        symptom: 'سفته امضا نمی‌شود و خطای توکن نامعتبر می‌دهد.',
        rootCause: 'تاریخ گواهی یکساله امضا به پایان رسیده است.',
        solution: 'صدور مجدد گواهی امضای الکترونیک در اپلیکیشن با پرداخت تعرفه تمدید.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'اختلاف در مبالغ میلیاردی سفته، عدم رضایت ضامن، یا استفاده تجاری حقوقی خاص.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'bank_resalat_merat',
    code: 'BNK-03',
    name: 'افتتاح حساب و اعتبار سنجی مرآت رسالت',
    category: 'banking',
    primarySystem: 'سامانه اعتبارسنجی مرآت / همراه بانک رسالت',
    primarySystemUrl: 'https://omerat.ir',
    priceRial: 4000000,
    priceToman: 400000,
    autonomyLevel: 'yellow',
    description: 'بارگذاری مدارک شغلی، احراز درآمد، اعتبارسنجی نمره بانکی و افتتاح حساب قرض‌الحسنه جهت دریافت وام بدون کارمزد رسالت.',
    requiredDocuments: [
      'کارت ملی و شناسنامه',
      'مدارک شغلی (فیش حقوقی، حکم کارگزینی، جواز کسب یا گواهی اشتغال به کار)',
      'پرینت ۳ تا ۶ ماه گردش حساب با مهر بانک',
      'کد پستی و تاییدیه نشانی'
    ],
    prerequisites: ['حساب کاربری فعال در سامانه مرآت'],
    prerequisiteSystems: ['سامانه مرآت omerat.ir', 'سامانه ام شتاب بانک مرکزی'],
    externalFees: [
      {
        name: 'تعرفه رسمی اعتبارسنجی سامانه مرآت',
        system: 'مرآت',
        amountRial: 600000,
        amountToman: 60000,
        isMandatory: true,
        description: 'هزینه ارزیابی پرونده توسط کارشناسان ریسک اعتباری'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'افتتاح حساب دیجیتال در پلتفرم بانک',
        system: 'بانک رسالت',
        description: 'بارگذاری سلفی و ثبت اطلاعات فردی جهت تخصیص شماره مشتری و شبا.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'ثبت اطلاعات در سامانه مرآت و بارگذاری مدارک شغلی',
        system: 'omerat.ir',
        description: 'ورود میزان درآمد، هزینه‌ها، تعهدات و بارگذاری مستندات مالی معتبر.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'پرداخت هزینه ارزیابی و دریافت نتیجه ظرفیت وام',
        system: 'درگاه مرآت',
        description: 'پرداخت کارمزد سنجش و صدور کارنامه توان بازپرداخت (ممتاز، کاملاً متناسب یا نیازمند ضامن).',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'REJECT_INCOME_DOCS',
        errorTitle: 'رد مدارک شغلی توسط ارزیاب مرآت',
        symptom: 'وضعیت اعتبارسنجی به علت "ناقص بودن مدرک شغلی" برگشت می‌خورد.',
        rootCause: 'بارگذاری فیش بدون مهر، تاریخ گذشته یا بدون پرینت حساب حقوقی متناظر.',
        solution: 'مشتری باید فیش حقوقی ممهور به مهر کارگزینی یا جواز کسب دارای اعتبار بارگذاری کند.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'چک برگشتی رفع سوء اثر نشده یا بدهی سررسید گذشته وام‌گیرنده.',
    escalationRole: 'حسابدار ارشد',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },

  // ==========================
  // بخش ۶: مسکن و املاک
  // ==========================
  {
    id: 'house_khodnevis',
    code: 'HOU-01',
    name: 'سامانه خودنویس: ثبت قرارداد اجاره مسکونی مالک و مستأجر',
    category: 'housing',
    primarySystem: 'سامانه ثبت رایگان قراردادهای اجاره (خودنویس)',
    primarySystemUrl: 'https://khodnevis.mrud.ir',
    priceRial: 14000000,
    priceToman: 140000,
    autonomyLevel: 'red',
    description: 'تنظیم مبایعه‌نامه و اجاره‌نامه مسکونی، احراز هویت مالک و مستأجر، معرفی ۲ شاهد معتبر و صدور کد رهگیری رایگان دولتی. (حضور طرفین یا نظارت کارفرما الزامی است)',
    requiredDocuments: [
      'کارت ملی و شناسنامه اصل هر دو طرف (موجر و مستأجر)',
      'سند مالکیت ملک (سند تک‌برگ یا بنچاق با پلاک ثبتی)',
      'قبض برق با کد پستی ۱۰ رقمی دقیق ملک',
      'کد ملی و شماره موبایل فعال حداقل ۲ شاهد عاقل و بالغ',
      'تعیین دقیق مبلغ ودیعه، اجاره‌بها، تاریخ تحویل و تخلیه'
    ],
    prerequisites: [
      'ثبت قبلی ملک در سامانه ملی املاک و اسکان توسط مالک',
      'حضور همزمان موجر و مستأجر جهت تأیید کدهای پیامکی امنیتی'
    ],
    prerequisiteSystems: [
      'سامانه ملی املاک و اسکان amlak.mrud.ir',
      'سامانه ثبت اسناد و املاک کشور ssaa.ir',
      'سامانه شاهکار'
    ],
    externalFees: [
      {
        name: 'ثبت‌نام ملک در سامانه املاک و اسکان (در صورت عدم ثبت قبلی)',
        system: 'املاک و اسکان',
        amountRial: 2500000,
        amountToman: 250000,
        isMandatory: false,
        description: 'هزینه خدمت ثبت املاک و اسکان طبق نرخنامه ۲۵۰,۰۰۰ تومان'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'بررسی ثبت ملک در سامانه املاک و اسکان',
        system: 'amlak.mrud.ir',
        description: 'اگر ملک توسط مالک در املاک و اسکان خوداظهاری نشده باشد، در خودنویس بالا نمی‌آید!',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'ورود به سامانه خودنویس با کدملی مالک',
        system: 'khodnevis.mrud.ir',
        description: 'ایجاد قرارداد جدید، انتخاب ملک، ثبت مبلغ رهن، اجاره ماهانه و شروط ضمن عقد.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 3,
        title: 'ارسال دعوت‌نامه برای مستأجر و شهود',
        system: 'پیامک امنیتی خودنویس',
        description: 'ورود مستأجر به کارتابل خودنویس خود و تایید قرارداد؛ ورود شهود و تایید قرارداد با پیامک.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 4,
        title: 'صدور کد رهگیری و نسخه چاپی با بارکد و QR',
        system: 'سامانه خودنویس',
        description: 'دریافت برگه نهایی اجاره‌نامه رسمی با مهر دیجیتال وزارت مسکن و تحویل نسخه‌ها به طرفین.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'PROPERTY_NOT_IN_AMLAK',
        errorTitle: 'ملک در لیست املاک ثبت شده مالک وجود ندارد',
        symptom: 'پلاک ثبتی یا آدرس ملک در کارتابل خودنویس ظاهر نمی‌شود.',
        rootCause: 'مالک هنوز ملک را در سامانه املاک و اسکان ثبت نکرده است.',
        solution: 'ابتدا باید خدمت "ثبت‌نام سامانه املاک و اسکان" به صورت کامل انجام شود و تاییدیه پستی اخذ گردد.',
        escalateIfFails: false
      },
      {
        errorCode: 'OWNERSHIP_DISPUTE',
        errorTitle: 'سند مشاعی یا وکالت‌نامه بلاعزل بدون تایید دادگاه',
        symptom: 'شخص اجاره‌دهنده مالک دانگی است یا وکالت دارد.',
        rootCause: 'پیچیدگی‌های حقوقی وکالت‌نامه‌های ملکی.',
        solution: 'به هیچ وجه نباید پرسنل خودسرانه ثبت کند؛ ارجاع قطعی قرمز به کارفرما.',
        escalateIfFails: true
      }
    ],
    escalationCondition: 'عدم تطابق نام در سند با کدملی، ملک ورثه‌ای، وکالتی، یا اختلاف طرفین بر سر شروط قرارداد.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'house_amlak_eskan',
    code: 'HOU-02',
    name: 'ثبت‌نام سامانه املاک و اسکان کشور',
    category: 'housing',
    primarySystem: 'سامانه ملی املاک و اسکان',
    primarySystemUrl: 'https://amlak.mrud.ir',
    priceRial: 2500000,
    priceToman: 250000,
    autonomyLevel: 'yellow',
    description: 'خوداظهاری املاک ملکی، سکونتی، استیجاری و اراضی سرپرست خانوار جهت جلوگیری از جریمه مالیات بر خانه‌های خالی و قطع یارانه‌ها.',
    requiredDocuments: [
      'کارت ملی و شناسنامه سرپرست خانوار',
      'کد پستی ۱۰ رقمی محل سکونت اصلی و فرعی',
      'شماره شناسه قبض برق اقامتگاه',
      'مشخصات افراد تحت تکفل خانوار'
    ],
    prerequisites: ['سیم‌کارت به نام سرپرست'],
    prerequisiteSystems: ['سامانه ثبت احوال', 'وزارت نیرو (استعلام کنتور)'],
    externalFees: [],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود سرپرست خانوار به درگاه دولت',
        system: 'amlak.mrud.ir',
        description: 'احراز هویت پیامکی از پنجره ملی دولت.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'تأیید افراد تحت تکفل و اقامتگاه اصلی',
        system: 'کارتابل خانوار',
        description: 'بررسی همسر و فرزندان، ثبت کدپستی محل زندگی و مشخص نمودن وضعیت مالک یا مستأجر.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'ثبت مشخصات کنتور برق و شناسه قبض',
        system: 'استعلام توانیر',
        description: 'تطبیق کنتور با کدپستی و تایید نهایی وضعیت سکونت.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'POWER_BILL_MISMATCH',
        errorTitle: 'شناسه قبض برق با کدپستی ملک همخوانی ندارد',
        symptom: 'سامانه خطای مغایرت کنتور با نقشه می‌دهد.',
        rootCause: 'شماره کنتور یا کدپستی اشتباه وارد شده یا کنتور تفکیک نشده است.',
        solution: 'مشتری باید برگه آخرین قبض برق فیزیکی یا پیامکی را بیاورد و شناسه قبض ۱۳ رقمی مجدداً بررسی شود.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'شناسایی اشتباه ملک به عنوان خانه خالی و صدور برگ تشخیص مالیاتی خانه خالی.',
    escalationRole: 'حسابدار ارشد',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'house_sabtemelk',
    code: 'HOU-03',
    name: 'ثبت‌نام سند ملکی در سامانه sabtemelk.ssaa.ir',
    category: 'housing',
    primarySystem: 'سامانه ثبت الکترونیک اسناد و املاک کشور (سازمان ثبت)',
    primarySystemUrl: 'https://sabtemelk.ssaa.ir',
    priceRial: 7000000,
    priceToman: 700000,
    autonomyLevel: 'red',
    description: 'ثبت‌نام تقاضای صدور سند مالکیت قانون تعیین تکلیف اراضی و ساختمان‌های فاقد سند رسمی (ماده ۱ و ۲ قانون ثبت اسناد).',
    requiredDocuments: [
      'کارت ملی و شناسنامه متقاضی',
      'نقشه یو‌تی‌ام (UTM) با مهر کارشناس رسمی دادگستری یا نقشه‌بردار نظام مهندسی',
      'تصویر قولنامه‌ها یا مبایعه‌نامه‌های دست‌اول تا متقاضی نهایی',
      'گواهی فوت و انحصار وراثت (در صورت املاک ارثی)'
    ],
    prerequisites: ['تهیه فایل گواهی مختصات UTM', 'شماره ثنا متقاضی'],
    prerequisiteSystems: ['ثبت اسناد و املاک ssaa.ir', 'سامانه نقشه شمیم'],
    externalFees: [
      {
        name: 'هزینه دادرسی و کارشناسی هیئت ماده ۱ سازمان ثبت',
        system: 'سازمان ثبت اسناد',
        amountRial: 1000000,
        amountToman: 100000,
        isMandatory: true,
        description: 'پرداخت در مرحله ارسال پرونده پستی'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'کنترل کامل مدارک و نقشه UTM',
        system: 'بررسی پیش از ورود',
        description: 'اطمینان از وجود فایل الکترونیکی نقشه UTM و عدم وجود ابهام در مبایعه‌نامه‌ها.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 2,
        title: 'ورود به سامانه sabtemelk.ssaa.ir و ورود اطلاعات ثبتی',
        system: 'سامانه ثبت ملک',
        description: 'درج پلاک اصلی و فرعی، آدرس، مشخصات متقاضی و بارگذاری تصاویر مدارک و نقشه.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 3,
        title: 'چاپ فرم اولیه و ارسال مدارک از طریق باجه‌های پستی ویژه',
        system: 'باجه پست قضایی',
        description: 'چاپ فرم درخواست دارای بارکد و راهنمایی مشتری جهت مراجعه به دفاتر پستی منتخب.',
        isCritical: false,
        requiresClientAuth: false
      }
    ],
    commonErrors: [
      {
        errorCode: 'UTM_COORDINATES_ERROR',
        errorTitle: 'خطای فرمت یا بیرون‌زدگی مختصات نقشه UTM',
        symptom: 'سامانه نقشه را قبول نمی‌کند.',
        rootCause: 'فایل اکسل یا تکست مختصات با زون جغرافیایی استان همخوانی ندارد.',
        solution: 'مشتری باید به مهندس نقشه‌بردار مراجعه کند تا فایل استاندارد سامانه ثبت را مجدداً خروجی بگیرد.',
        escalateIfFails: true
      }
    ],
    escalationCondition: 'املاک وقفی، اراضی منابع طبیعی، اراضی موات، یا ادعای تصرف عدوانی.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },

  // ==========================
  // بخش ۷: دانشگاهی و عمومی
  // ==========================
  {
    id: 'edu_azad_amoozyar',
    code: 'EDU-01',
    name: 'ثبت‌نام پذیرش دانشگاه آزاد اسلامی (سامانه آموزشیار)',
    category: 'education',
    primarySystem: 'سامانه جامع آموزشیار دانشگاه آزاد اسلامی',
    primarySystemUrl: 'https://edu.iau.ir',
    priceRial: 3500000,
    priceToman: 350000,
    autonomyLevel: 'yellow',
    description: 'بارگذاری مدارک پذیرفته‌شدگان کنکور و سوابق تحصیلی، تایید شهریه، ثبت نام در سامانه آموزشیار و دریافت شماره دانشجویی.',
    requiredDocuments: [
      'کارت ملی و شناسنامه داوطلب',
      'مدرک دیپلم یا پیش‌دانشگاهی / لیسانس با معدل کتبی دقیق',
      'کد رهگیری تاییدیه تحصیلی آموزش و پرورش',
      'عکس پرسنلی ۳ در ۴ استاندارد اسکن شده',
      'مشخصات نظام وظیفه (برای آقایان)'
    ],
    prerequisites: ['اخذ تاییدیه تحصیلی و سوابق فارغ‌التحصیلی از سامانه emt.medu.ir'],
    prerequisiteSystems: ['سامانه تاییدیه تحصیلی وزارت آموزش و پرورش emt.medu.ir'],
    externalFees: [
      {
        name: 'اخذ تاییدیه تحصیلی آموزش و پرورش (خدمت برون‌سازمانی)',
        system: 'emt.medu.ir',
        amountRial: 2500000,
        amountToman: 250000,
        isMandatory: true,
        description: 'هزینه خدمت استعلام تاییدیه تحصیلی طبق نرخنامه ۲۵۰,۰۰۰ تومان'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'ثبت درخواست تاییدیه تحصیلی',
        system: 'emt.medu.ir',
        description: 'اگر داوطلب قبلاً کدرهگیری نگرفته، ابتدا باید خدمت تاییدیه تحصیلی ثبت و دانشگاه آزاد به عنوان استعلام‌گیرنده انتخاب شود.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 2,
        title: 'ورود به سامانه ثبت نام داوطلبان جدیدالورود آموزشیار',
        system: 'edu.iau.ir',
        description: 'درج کدملی، کد داوطلبی و اطلاعات فردی و شناسنامه‌ای.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'بارگذاری مدارک و پرداخت الکترونیکی هزینه خدمات آموزشی',
        system: 'درگاه آموزشیار',
        description: 'بارگذاری عکس و مدارک با حجم زیر ۲۰۰ کیلوبایت و دریافت شماره دانشجویی موقت.',
        isCritical: true,
        requiresClientAuth: true
      }
    ],
    commonErrors: [
      {
        errorCode: 'IMAGE_SIZE_LIMIT',
        errorTitle: 'خطای حجم یا فرمت نامعتبر تصاویر مدارک',
        symptom: 'بارگذاری عکس خطا می‌دهد.',
        rootCause: 'حجم عکس بیش از ۱۰۰ یا ۲۰۰ کیلوبایت است.',
        solution: 'تغییر سایز و فشرده‌سازی استاندارد تصاویر به زیر ۱۰۰ کیلوبایت با فرمت JPG.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'عدم تطابق دیپلم کاردانش/فنی، کسری سال نظام وظیفه یا غیبت سربازی.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'edu_textbooks',
    code: 'EDU-02',
    name: 'ثبت‌نام کتب درسی دانش‌آموزان',
    category: 'education',
    primarySystem: 'سامانه فروش و توزیع مواد آموزشی (پایگاه کتاب)',
    primarySystemUrl: 'https://irtextbook.ir',
    priceRial: 1000000,
    priceToman: 100000,
    autonomyLevel: 'green',
    description: 'ثبت سفارش فردی کتاب‌های درسی دوره‌های ابتدایی، متوسطه اول و دوم و فنی‌حرفه‌ای با پرداخت آنلاین بهای دولتی کتاب.',
    requiredDocuments: [
      'کد ملی دانش‌آموز',
      'شماره سریال ۶ رقمی شناسنامه دانش‌آموز',
      'نام دقیق مدرسه ثبت‌نامی در سامانه سیدا'
    ],
    prerequisites: ['ثبت‌نام قطعی دانش‌آموز در سامانه سیدا توسط مدیر مدرسه'],
    prerequisiteSystems: ['سامانه سیدا وزارت آموزش و پرورش'],
    externalFees: [
      {
        name: 'بهای رسمی بسته کتاب‌های درسی (واریزی به حساب آموزش و پرورش)',
        system: 'بانک ملی / شاپرک',
        amountRial: 0,
        amountToman: 0,
        isMandatory: true,
        description: 'مبلغ بسته کتاب بر اساس پایه تحصیلی در سامانه مشخص و آنلاین پرداخت می‌گردد'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'ورود با کدملی و سریال شناسنامه دانش‌آموز',
        system: 'irtextbook.ir',
        description: 'ورود به پنل سفارش فردی.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 2,
        title: 'بررسی پایه و بسته کتاب پیشنهادی',
        system: 'پنل کتاب',
        description: 'کنترل پایه تحصیلی و مدرسه مقصد جهت توزیع کتاب.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'پرداخت الکترونیکی بهای کتاب و صدور فاکتور',
        system: 'شاپرک',
        description: 'پرداخت آنلاین بهای کتاب با کارت والدین و دریافت رسید رسمی ثبت سفارش.',
        isCritical: true,
        requiresClientAuth: true
      }
    ],
    commonErrors: [
      {
        errorCode: 'SIDA_NOT_REGISTERED',
        errorTitle: 'خطای "دانش‌آموز در سامانه سیدا ثبت‌نام نشده است"',
        symptom: 'سامانه ورود را قبول نمی‌کند.',
        rootCause: 'مدیر مدرسه هنوز پرونده دانش‌آموز را در سامانه سیدا نهایی نکرده است.',
        solution: 'والدین باید با مدرسه تماس بگیرند تا ثبت‌نام دانش‌آموز در کلاس مربوطه فعال شود.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'جابجایی بین استانی یا تغییر رشته در شهریور ماه و مغایرت بسته‌های کتب.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  },
  {
    id: 'gen_sejam',
    code: 'GEN-01',
    name: 'ثبت‌نام سامانه سجام به همراه پرداخت و احراز هویت',
    category: 'general',
    primarySystem: 'سامانه جامع اطلاعات مشتریان بازار سرمایه (سجام)',
    primarySystemUrl: 'https://sejam.ir',
    priceRial: 2000000,
    priceToman: 200000,
    autonomyLevel: 'green',
    description: 'ثبت اطلاعات هویتی، آدرس، شغلی و حساب بانکی جهت دریافت کد بورسی و دریافت سود سهام عدالت و مجامع شرکت‌ها.',
    requiredDocuments: [
      'کارت ملی و شناسنامه',
      'شماره شبا و مشخصات حساب بانکی فعال به نام متقاضی',
      'شماره موبایل به نام متقاضی',
      'کد پستی ۱۰ رقمی'
    ],
    prerequisites: ['سیم‌کارت به نام'],
    prerequisiteSystems: ['شرکت سپرده‌گذاری مرکزی اوراق بهادار', 'شاپرک'],
    externalFees: [
      {
        name: 'کارمزد رسمی دولتی ثبت‌نام سجام',
        system: 'سپرده‌گذاری مرکزی',
        amountRial: 150000,
        amountToman: 15000,
        isMandatory: true,
        description: 'هزینه دولتی تخصیص کد معاملاتی بورسی'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'ثبت‌نام اولیه و پرداخت کارمزد دولتی سجام',
        system: 'sejam.ir',
        description: 'ورود اطلاعات هویتی، واریز ۱۵ هزار تومان تعرفه دولتی سجام.',
        isCritical: true,
        requiresClientAuth: true
      },
      {
        stepNumber: 2,
        title: 'ثبت اطلاعات بانکی و شماره شبا',
        system: 'فرم سجام',
        description: 'ورود شماره شبا و استعلام خودکار تطابق نام با کدملی.',
        isCritical: true,
        requiresClientAuth: false
      },
      {
        stepNumber: 3,
        title: 'انجام احراز هویت الکترونیکی سجام',
        system: 'احراز هویت بیومتریک',
        description: 'ضبط ویدیو و تایید چهره و صدور کد بورسی و کدرهگیری ۱۰ رقمی سجام.',
        isCritical: true,
        requiresClientAuth: true
      }
    ],
    commonErrors: [
      {
        errorCode: 'SHEBA_NAME_MISMATCH',
        errorTitle: 'نام صاحب شماره شبا با کدملی مغایرت دارد',
        symptom: 'شماره شبا رد می‌شود.',
        rootCause: 'حساب مشترک، متعلق به بستگان، یا خطای ثبت در بانک.',
        solution: 'مشتری باید شبای حسابی را بدهد که ۱۰۰٪ به نام خودش باشد.',
        escalateIfFails: false
      }
    ],
    escalationCondition: 'افراد صغیر زیر ۱۸ سال نیازمند احراز ولی قهری یا اتباع غیرایرانی دارای کد فراگیر.',
    escalationRole: 'کارفرما / وکیل حقوقی',
    updatedAt: '۱۴۰۵/۰۶/۰۱',
    version: '1.4.05'
  }
];
