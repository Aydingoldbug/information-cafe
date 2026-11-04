import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ModuleKnowledgeBase } from './components/ModuleKnowledgeBase';
import { ModuleLearningPath } from './components/ModuleLearningPath';
import { ModuleSimulator } from './components/ModuleSimulator';
import { ModuleDeskAssistant } from './components/ModuleDeskAssistant';
import { ModuleDecisionTree } from './components/ModuleDecisionTree';
import { ModuleCertification } from './components/ModuleCertification';
import { ModuleDashboard } from './components/ModuleDashboard';
import { InvoiceModal } from './components/InvoiceModal';
import { DocumentShortfallModal } from './components/DocumentShortfallModal';
import { ExportCenterModal } from './components/ExportCenterModal';

import { SERVICES_CATALOG } from './data/servicesData';
import { LEARNING_MODULES } from './data/learningModulesData';
import { SIMULATION_SCENARIOS } from './data/scenariosData';
import { 
  ServiceCard, 
  CustomerInvoice, 
  EscalationTicket, 
  PersonnelCertificate 
} from './types';
import { getTodayPersianDate, toPersianDigits } from './utils/formatters';

export default function App() {
  const [currentRole, setCurrentRole] = useState<'staff' | 'manager'>('staff');
  const [activeModule, setActiveModule] = useState<number>(1);
  const [tariffVersion, setTariffVersion] = useState<string>('1.4.05');

  // Services Catalog State
  const [services, setServices] = useState<ServiceCard[]>(SERVICES_CATALOG);
  const [activeServiceForAssistant, setActiveServiceForAssistant] = useState<ServiceCard | null>(services[0]);

  // Learning Path State
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([
    'les_sec_1',
    'les_price_1'
  ]);
  const [remedialLessonIds, setRemedialLessonIds] = useState<string[]>([
    'les_veh_1' // Initially recommended due to high error in vehicle taxes
  ]);

  // Escalation Tickets State
  const [escalationTickets, setEscalationTickets] = useState<EscalationTicket[]>([
    {
      id: 'TCK-9901',
      serviceId: 'car_plate_appointment',
      serviceName: 'نوبت‌دهی تعویض پلاک خودرو',
      clientName: 'مهدی کریمی',
      clientPhone: '09121112233',
      createdAt: '۱۴۰۵/۰۶/۱۴ - ۱۰:۴۵',
      operatorName: 'علی مرادی (میز ۱)',
      reason: 'خطای سامانه',
      description: 'سامانه راهور خطای عدم تسویه مالیات واتی می‌دهد اما مشتری مدعی است پریروز فیش واریزی بانک ملی دارد. اجازه نوبت دستی داده شود؟',
      systemName: 'سامانه نوبت‌دهی تعویض پلاک',
      status: 'pending'
    },
    {
      id: 'TCK-9902',
      serviceId: 'house_khodnevis',
      serviceName: 'سامانه خودنویس: ثبت قرارداد اجاره مسکونی',
      clientName: 'اصغر رحمانی',
      clientPhone: '09354445566',
      createdAt: '۱۴۰۵/۰۶/۱۳ - ۱۶:۲۰',
      operatorName: 'سارا احمدی (میز ۲)',
      reason: 'مدارک ناقص یا مشکوک',
      description: 'سند مالکیت دارای ۲ دانگ مشاعی است و یکی از مالکان خارج از کشور است. متقاضی درخواست دارد بدون حضور وی قرارداد ثبت شود.',
      systemName: 'سامانه خودنویس مسکن',
      status: 'resolved',
      managerResponse: 'دستور کارفرما: ثبت قرارداد مشاعی بدون وکالت‌نامه رسمی غیرقانونی است. به دفتر خدمات قضایی ارجاع داده شد.',
      resolvedAt: '۱۴۰۵/۰۶/۱۳ - ۱۶:۵۰'
    }
  ]);

  // Personnel Certificates State
  const [certificates, setCertificates] = useState<PersonnelCertificate[]>([
    {
      categoryId: 'judiciary',
      categoryTitle: 'خدمات قضایی و احراز هویت ثنا',
      isCertified: true,
      score: 95,
      issuedAt: '۱۴۰۵/۰۱/۱۵',
      expiresAt: '۱۴۰۶/۰۱/۱۵',
      isExpired: false
    },
    {
      categoryId: 'tax',
      categoryTitle: 'امور مالیاتی، تبصره ۱۰۰ و مودیان',
      isCertified: true,
      score: 88,
      issuedAt: '۱۴۰۵/۰۲/۱۰',
      expiresAt: '۱۴۰۶/۰۲/۱۰',
      isExpired: false
    },
    {
      categoryId: 'vehicle',
      categoryTitle: 'خودرو، تعویض پلاک، مالیات و راهور',
      isCertified: false,
      score: 65,
      issuedAt: '۱۴۰۴/۰۶/۰۱',
      expiresAt: '۱۴۰۵/۰۶/۰۱',
      isExpired: true // Expired, triggers yellow mode until re-exam
    },
    {
      categoryId: 'social_security',
      categoryTitle: 'تأمین اجتماعی، کارفرمایی و بیمه بیکاری',
      isCertified: true,
      score: 90,
      issuedAt: '۱۴۰۵/۰۳/۰۱',
      expiresAt: '۱۴۰۶/۰۳/۰۱',
      isExpired: false
    },
    {
      categoryId: 'housing_banking',
      categoryTitle: 'سامانه خودنویس املاک، وام و سفته الکترونیک',
      isCertified: true,
      score: 85,
      issuedAt: '۱۴۰۵/۰۱/۲۰',
      expiresAt: '۱۴۰۶/۰۱/۲۰',
      isExpired: false
    }
  ]);

  // Modals State
  const [activeInvoice, setActiveInvoice] = useState<CustomerInvoice | null>(null);
  const [shortfallService, setShortfallService] = useState<ServiceCard | null>(null);
  const [isExportCenterOpen, setIsExportCenterOpen] = useState<boolean>(false);

  const operatorName = 'علی مرادی (کارشناس میز خدمت)';

  // Handlers
  const handleOpenInAssistant = (service: ServiceCard) => {
    setActiveServiceForAssistant(service);
    setActiveModule(4); // Switch to Module 4 (Desk Assistant)
  };

  const handleOpenMissingDocsSlip = (service: ServiceCard) => {
    setShortfallService(service);
  };

  const handleCompleteLesson = (lessonId: string, score: number) => {
    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
    }
    // Remove from remedial if score is good
    if (score >= 70) {
      setRemedialLessonIds((prev) => prev.filter((id) => id !== lessonId));
    }
  };

  const handleLogSimError = (errorTitle: string, remedialLessonId: string) => {
    if (!remedialLessonIds.includes(remedialLessonId)) {
      setRemedialLessonIds((prev) => [...prev, remedialLessonId]);
    }
  };

  const handleCreateEscalation = (ticket: EscalationTicket) => {
    setEscalationTickets((prev) => [ticket, ...prev]);
  };

  const handleResolveTicket = (ticketId: string, response: string) => {
    setEscalationTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: 'resolved',
              managerResponse: response,
              resolvedAt: `${getTodayPersianDate()} - ${new Date().toLocaleTimeString('fa-IR')}`
            }
          : t
      )
    );
  };

  const handleRenewCertificate = (categoryId: string, score: number) => {
    setCertificates((prev) =>
      prev.map((c) =>
        c.categoryId === categoryId
          ? {
              ...c,
              isCertified: true,
              score,
              isExpired: false,
              issuedAt: getTodayPersianDate(),
              expiresAt: '۱۴۰۶/۰۶/۰۱'
            }
          : c
      )
    );
  };

  const handleUpdateTariffPrice = (serviceId: string, newPriceToman: number) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? {
              ...s,
              priceToman: newPriceToman,
              priceRial: newPriceToman * 10,
              version: '1.4.06',
              updatedAt: getTodayPersianDate()
            }
          : s
      )
    );
    setTariffVersion('1.4.06');
  };

  const pendingCount = escalationTickets.filter((t) => t.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Vazirmatn',sans-serif] selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        pendingEscalationsCount={pendingCount}
        tariffVersion={tariffVersion}
        onOpenExportCenter={() => setIsExportCenterOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {activeModule === 1 && (
          <ModuleKnowledgeBase
            services={services}
            onOpenInAssistant={handleOpenInAssistant}
            onOpenMissingDocsSlip={handleOpenMissingDocsSlip}
            tariffVersion={tariffVersion}
          />
        )}

        {activeModule === 2 && (
          <ModuleLearningPath
            modules={LEARNING_MODULES}
            completedLessonIds={completedLessonIds}
            onCompleteLesson={handleCompleteLesson}
            remedialLessonIds={remedialLessonIds}
          />
        )}

        {activeModule === 3 && (
          <ModuleSimulator
            scenarios={SIMULATION_SCENARIOS}
            onLogSimError={handleLogSimError}
            onNavigateToLesson={(lessonId) => {
              setActiveModule(2);
            }}
          />
        )}

        {activeModule === 4 && (
          <ModuleDeskAssistant
            services={services}
            activeService={activeServiceForAssistant}
            onSelectService={setActiveServiceForAssistant}
            onGenerateInvoice={setActiveInvoice}
            onCreateEscalation={handleCreateEscalation}
            onOpenMissingDocsSlip={handleOpenMissingDocsSlip}
            operatorName={operatorName}
          />
        )}

        {activeModule === 5 && (
          <ModuleDecisionTree
            onOpenMissingDocsSlipDirect={() => setShortfallService(services[0])}
            onOpenEscalationTicketDirect={() => {
              setActiveModule(4);
            }}
          />
        )}

        {activeModule === 6 && (
          <ModuleCertification
            certificates={certificates}
            onRenewCertificate={handleRenewCertificate}
            operatorName={operatorName}
          />
        )}

        {activeModule === 7 && (
          <ModuleDashboard
            escalationTickets={escalationTickets}
            onResolveTicket={handleResolveTicket}
            services={services}
            onUpdateTariffPrice={handleUpdateTariffPrice}
            tariffVersion={tariffVersion}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            سامانه استقلال هدایت‌شده کافی‌نت و دفاتر پیشخوان | طراحی شده بر مبنای نرخ‌نامه مصوب اتحادیه سال ۱۴۰۵ (بدون خدمات چاپ)
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>مدل سه‌سطحی: 🟢 سبز • 🟡 زرد • 🔴 قرمز</span>
            <span className="font-mono text-amber-500">v{toPersianDigits(tariffVersion)}</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeInvoice && (
        <InvoiceModal
          invoice={activeInvoice}
          onClose={() => setActiveInvoice(null)}
        />
      )}

      {shortfallService && (
        <DocumentShortfallModal
          service={shortfallService}
          operatorName={operatorName}
          onClose={() => setShortfallService(null)}
        />
      )}

      {isExportCenterOpen && (
        <ExportCenterModal
          services={services}
          escalationTickets={escalationTickets}
          certificates={certificates}
          tariffVersion={tariffVersion}
          onClose={() => setIsExportCenterOpen(false)}
        />
      )}
    </div>
  );
}
