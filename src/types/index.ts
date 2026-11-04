export type AutonomyLevel = 'green' | 'yellow' | 'red';

export interface ExternalFee {
  name: string;
  system: string;
  amountRial: number;
  amountToman: number;
  isMandatory: boolean;
  description: string;
}

export interface ServiceStep {
  stepNumber: number;
  title: string;
  system: string;
  systemUrl?: string;
  description: string;
  isCritical: boolean;
  requiresClientAuth: boolean;
  note?: string;
}

export interface CommonError {
  errorCode?: string;
  errorTitle: string;
  symptom: string;
  rootCause: string;
  solution: string;
  escalateIfFails: boolean;
}

export interface ServiceCard {
  id: string;
  code: string;
  name: string;
  category: 
    | 'judiciary'       // قضایی و انتظامی
    | 'social_security' // تأمین اجتماعی و روابط کار
    | 'tax'             // مالیاتی و اصناف
    | 'vehicle'         // خودرو و راهور
    | 'banking'         // بانکی و وام
    | 'housing'         // مسکن و املاک
    | 'education'       // دانشگاهی و آموزشی
    | 'general';        // عمومی و دولتی
  primarySystem: string;
  primarySystemUrl: string;
  priceRial: number;
  priceToman: number;
  autonomyLevel: AutonomyLevel;
  description: string;
  requiredDocuments: string[];
  prerequisites: string[];
  prerequisiteSystems: string[];
  externalFees: ExternalFee[];
  steps: ServiceStep[];
  commonErrors: CommonError[];
  escalationCondition: string;
  escalationRole: 'کارفرما / وکیل حقوقی' | 'پشتیبان فنی سامانه' | 'حسابدار ارشد';
  updatedAt: string;
  version: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningLesson {
  id: string;
  title: string;
  durationMinutes: number;
  category: string;
  summary: string;
  keyPoints: string[];
  checklist: string[];
  quiz: QuizQuestion[];
  isCompleted?: boolean;
  score?: number;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  iconName: string;
  lessons: LearningLesson[];
  badgeName: string;
}

export interface SimulationStep {
  id: string;
  prompt: string;
  mockScreenTitle: string;
  mockScreenSystem: string;
  instruction: string;
  fields?: {
    id: string;
    label: string;
    type: 'text' | 'select' | 'checkbox' | 'radio' | 'file';
    options?: string[];
    correctValue?: string | boolean;
    hint?: string;
  }[];
  trapQuestion?: {
    question: string;
    options: { text: string; isCorrect: boolean; feedback: string }[];
  };
}

export interface SimulatorScenario {
  id: string;
  title: string;
  serviceId: string;
  difficulty: 'مبتدی' | 'متوسط' | 'پیشرفته';
  estimatedTime: string;
  situation: string;
  clientProfile: {
    name: string;
    nationalId: string;
    mobile: string;
    notes: string;
  };
  steps: SimulationStep[];
  remedialLessonId: string;
}

export interface DecisionNode {
  id: string;
  question: string;
  description?: string;
  options: {
    label: string;
    nextId?: string;
    outcome?: {
      level: AutonomyLevel;
      actionTitle: string;
      actionMessage: string;
      actionType: 'proceed' | 'missing_docs' | 'technical_ticket' | 'manager_escalation';
      deliverable?: string;
    };
  }[];
}

export interface EscalationTicket {
  id: string;
  serviceId: string;
  serviceName: string;
  clientName: string;
  clientPhone: string;
  createdAt: string;
  operatorName: string;
  reason: 'اختلاف مالی' | 'خطای سامانه' | 'مدارک ناقص یا مشکوک' | 'شکایت مشتری' | 'تصمیم حقوقی';
  description: string;
  systemName: string;
  status: 'pending' | 'resolved' | 'rejected';
  managerResponse?: string;
  resolvedAt?: string;
}

export interface PersonnelCertificate {
  categoryId: string;
  categoryTitle: string;
  isCertified: boolean;
  score: number;
  issuedAt: string;
  expiresAt: string;
  isExpired: boolean;
}

export interface CustomerInvoice {
  invoiceNumber: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  nationalCode?: string;
  serviceName: string;
  serviceFeeRial: number;
  serviceFeeToman: number;
  externalFees: {
    name: string;
    amountToman: number;
  }[];
  extraNotes?: string;
  totalToman: number;
  operatorName: string;
}
