
export enum SchoolLevel {
  PRIMARY = 'Tiểu học',
  SECONDARY = 'Trung học cơ sở (THCS)',
  COMBINED = 'Liên cấp TH&THCS'
}

export enum ReportTone {
  FORMAL = 'Hành chính - Trang trọng (Chuẩn mực)',
  ANALYTICAL = 'Phân tích - Số liệu (Sắc sảo)',
  PEDAGOGICAL = 'Sư phạm - Chuyên môn (Tâm huyết)',
  CRITICAL = 'Đánh giá - Nhận xét (Thẳng thắn)'
}

export interface ReportCategory {
  id: string;
  name: string;
  subTypes: string[];
}

export interface AttachedFile {
  data: string; // Base64 string
  mimeType: string;
  name: string;
}

export interface ReportFormData {
  schoolName: string;
  departmentName: string; // New field for department name
  departmentHeadName: string; // Changed from principalName
  level: SchoolLevel;
  schoolYear: string;
  reportDate: string;
  category: string;
  subType: string;
  contextData: string;
  tone: ReportTone;
  attachedFile?: AttachedFile;
}

export interface GeneratedResult {
  content: string;
  audioBase64?: string;
  timestamp: number;
}
