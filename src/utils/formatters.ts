import { CustomerInvoice } from '../types';

export function rialToToman(rial: number): number {
  return Math.floor(rial / 10);
}

export function formatWithCommas(value: number): string {
  return new Intl.NumberFormat('fa-IR').format(value);
}

export function formatPriceRial(rial: number): string {
  return `${formatWithCommas(rial)} ریال`;
}

export function formatPriceToman(toman: number): string {
  return `${formatWithCommas(toman)} تومان`;
}

export function toPersianDigits(str: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(str).replace(/[0-9]/g, (w) => persianDigits[+w]);
}

export function getTodayPersianDate(): string {
  return '۱۴۰۵/۰۶/۱۵';
}

export function generateCustomerInvoiceHtml(invoice: CustomerInvoice): string {
  const externalFeesRows = invoice.externalFees.map(
    (fee, index) => `
    <tr>
      <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${toPersianDigits(index + 2)}</td>
      <td style="border: 1px solid #cbd5e1; padding: 8px;">استعلام / واریزی دولتی (${fee.name})</td>
      <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">۱ مورد</td>
      <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: left; font-weight: bold;">${formatWithCommas(fee.amountToman)} تومان</td>
    </tr>
  `
  ).join('');

  return `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>فاکتور خدمات الکترونیک - ${invoice.invoiceNumber}</title>
  <style>
    body {
      font-family: 'Vazirmatn', Tahoma, sans-serif;
      direction: rtl;
      margin: 0;
      padding: 24px;
      background: #f8fafc;
      color: #0f172a;
    }
    .invoice-card {
      max-width: 680px;
      margin: 0 auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px dashed #0284c7;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }
    .badge {
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      background: #f1f5f9;
      padding: 14px;
      border-radius: 8px;
      font-size: 13px;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 13px;
    }
    th {
      background: #0284c7;
      color: #ffffff;
      padding: 10px;
      border: 1px solid #0284c7;
    }
    .total-box {
      background: #f0fdf4;
      border: 1px solid #86efac;
      padding: 14px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      color: #166534;
      margin-bottom: 20px;
    }
    .footer {
      font-size: 11px;
      color: #64748b;
      line-height: 1.8;
      border-top: 1px solid #e2e8f0;
      padding-top: 14px;
    }
    @media print {
      body { background: white; padding: 0; }
      .invoice-card { box-shadow: none; border: none; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="invoice-card">
    <div class="header">
      <div>
        <h2 style="margin: 0 0 6px 0; color: #0369a1;">رسید رسمی خدمات الکترونیک کافی‌نت</h2>
        <span class="badge">مطابق نرخ‌نامه مصوب اتحادیه سال ۱۴۰۵</span>
      </div>
      <div style="text-align: left; font-size: 12px; color: #475569;">
        <div>شماره فاکتور: <strong>${toPersianDigits(invoice.invoiceNumber)}</strong></div>
        <div>تاریخ: ${invoice.date}</div>
        <div>ساعت: ${invoice.time}</div>
      </div>
    </div>

    <div class="info-grid">
      <div>نام مشتری: <strong>${invoice.clientName || 'مشتری گرامی'}</strong></div>
      <div>شماره همراه: <strong>${toPersianDigits(invoice.clientPhone || '---')}</strong></div>
      <div>کد ملی: <strong>${toPersianDigits(invoice.nationalCode || '---')}</strong></div>
      <div>متصدی میز خدمت: <strong>${invoice.operatorName}</strong></div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 40px;">ردیف</th>
          <th>شرح خدمت / واریزی</th>
          <th style="width: 80px;">تعداد / واحد</th>
          <th style="width: 140px;">مبلغ (تومان)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">۱</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">
            <strong>${invoice.serviceName}</strong>
            <div style="font-size: 11px; color: #64748b;">(دستمزد مصوب اتحادیه: ${formatWithCommas(invoice.serviceFeeRial)} ریال)</div>
          </td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">۱ مورد</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: left; font-weight: bold;">${formatWithCommas(invoice.serviceFeeToman)} تومان</td>
        </tr>
        ${externalFeesRows}
      </tbody>
    </table>

    <div class="total-box">
      <span>مجموع کل پرداختی مشتری:</span>
      <span>${formatWithCommas(invoice.totalToman)} تومان <span style="font-size: 13px; font-weight: normal; color: #334155;">(${formatWithCommas(invoice.totalToman * 10)} ریال)</span></span>
    </div>

    ${invoice.extraNotes ? `<div style="background: #fffbeb; border: 1px solid #fde68a; padding: 10px; border-radius: 6px; font-size: 12px; color: #92400e; margin-bottom: 16px;"><strong>یادداشت متصدی:</strong> ${invoice.extraNotes}</div>` : ''}

    <div class="footer">
      <div>• اطلاعات هویتی و رمزهای یکبارمصرف مشتری در این سامانه ذخیره نمی‌شود و صرفاً با نظارت و پیامک خود مشتری فرآیند تکمیل می‌گردد.</div>
      <div>• در صورت داشتن هرگونه ابهام یا پیگیری، با در دست داشتن این رسید و کد رهگیری سامانه مراجعه فرمایید.</div>
      <div style="text-align: center; margin-top: 10px; font-weight: bold; color: #0284c7;">با تشکر از اعتماد شما - واحد صنفی خدمات اینترنت و رایانه</div>
    </div>

    <div class="no-print" style="margin-top: 24px; text-align: center;">
      <button onclick="window.print()" style="background: #0284c7; color: white; border: none; padding: 10px 24px; border-radius: 6px; font-weight: bold; cursor: pointer; font-family: inherit;">چاپ فاکتور رسمی (Print)</button>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateShortfallSlipHtml(params: {
  clientName: string;
  clientPhone: string;
  serviceName: string;
  missingItems: string[];
  requiredActions: string[];
  operatorName: string;
  deadline?: string;
}): string {
  const missingRows = params.missingItems.map(
    (item, idx) => `<li style="margin-bottom: 8px; color: #b91c1c; font-weight: 500;">❌ <strong>${item}</strong></li>`
  ).join('');

  const actionsRows = params.requiredActions.map(
    (item, idx) => `<li style="margin-bottom: 8px; color: #0369a1;">👉 ${item}</li>`
  ).join('');

  return `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>برگه کسری مدارک مراجعین - ${params.serviceName}</title>
  <style>
    body {
      font-family: 'Vazirmatn', Tahoma, sans-serif;
      direction: rtl;
      padding: 24px;
      background: #f8fafc;
      color: #0f172a;
    }
    .card {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border: 1px solid #cbd5e1;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    .header {
      background: #fee2e2;
      border: 1px solid #fca5a5;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 16px;
      color: #991b1b;
    }
    @media print {
      body { background: white; padding: 0; }
      .card { box-shadow: none; border: 1px solid #94a3b8; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h3 style="margin: 0 0 4px 0;">اطلاعیه کسری مدارک و ارجاع مراجعه‌کننده</h3>
      <div style="font-size: 12px;">پلتفرم استقلال هدایت‌شده کافی‌نت | جلوگیری از اتلاف وقت مراجعین</div>
    </div>

    <div style="background: #f1f5f9; padding: 12px; border-radius: 6px; font-size: 13px; margin-bottom: 16px;">
      <div>مشتری محترم: <strong>${params.clientName || 'مراجعه‌کننده محترم'}</strong></div>
      <div>خدمت درخواستی: <strong>${params.serviceName}</strong></div>
      <div>متصدی پاسخگو: <strong>${params.operatorName}</strong> | تاریخ: <strong>${getTodayPersianDate()}</strong></div>
    </div>

    <div style="margin-bottom: 16px;">
      <h4 style="margin: 0 0 8px 0; color: #dc2626;">مدارک کسری که باید به همراه داشته باشید:</h4>
      <ul style="padding-right: 20px; margin: 0; font-size: 13px;">
        ${missingRows}
      </ul>
    </div>

    <div style="margin-bottom: 16px; background: #f0f9ff; border: 1px solid #bae6fd; padding: 12px; border-radius: 8px;">
      <h4 style="margin: 0 0 8px 0; color: #0284c7;">اقدامات لازم پیش از مراجعه بعدی:</h4>
      <ul style="padding-right: 20px; margin: 0; font-size: 12px; line-height: 1.8;">
        ${actionsRows}
      </ul>
    </div>

    <div style="font-size: 11px; color: #64748b; line-height: 1.6; border-top: 1px dashed #cbd5e1; padding-top: 10px;">
      لطفاً پس از تهیه موارد فوق، با در دست داشتن این برگه مجدداً مراجعه فرمایید تا خدمت شما در اولویت بدون نوبت مجدد انجام پذیرد.
    </div>

    <div class="no-print" style="margin-top: 20px; text-align: center;">
      <button onclick="window.print()" style="background: #dc2626; color: white; border: none; padding: 8px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; font-family: inherit;">چاپ برگه کسری مدارک (Print Slip)</button>
    </div>
  </div>
</body>
</html>
  `;
}
