export type CandidateStatus =
  | 'REGISTERED'
  | 'DOCUMENTS_PENDING'
  | 'VERIFICATION_IN_PROGRESS'
  | 'CLEARED'
  | 'REJECTED';

export type DocumentType =
  | 'ID_PROOF'
  | 'ADDRESS_PROOF'
  | 'EDUCATION_CERTIFICATE'
  | 'EMPLOYMENT_LETTER'
  | 'PAN_CARD'
  | 'PHOTOGRAPH'
  | 'OTHER';

export type VerificationType =
  | 'IDENTITY'
  | 'ADDRESS'
  | 'EDUCATION'
  | 'EMPLOYMENT'
  | 'CRIMINAL_RECORD'
  | 'REFERENCE_CHECK'
  | 'CREDIT_CHECK';

export type VerificationStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'VERIFIED'
  | 'REJECTED'
  | 'DISCREPANCY_FOUND';

export interface Candidate {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  currentAddress?: string;
  positionAppliedFor?: string;
  status: CandidateStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface CandidateRequest {
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  currentAddress?: string;
  positionAppliedFor?: string;
}

export interface DocumentMeta {
  id: number;
  documentType: DocumentType;
  originalFileName: string;
  storedFileName: string;
  filePath: string;
  contentType: string;
  fileSizeBytes: number;
  uploadedAt: string;
}

export type DocumentExtractionStatus = 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface DocumentExtraction {
  id: number;
  status: DocumentExtractionStatus;
  extractedJson?: string | null;
  confidence?: number | null;
  errorMessage?: string | null;
  processedAt?: string | null;
}

export interface ExtractedDocumentFields {
  documentType?: string | null;
  fullName?: string | null;
  dateOfBirth?: string | null;
  documentNumber?: string | null;
  employer?: string | null;
  institute?: string | null;
  issueDate?: string | null;
  expiryDate?: string | null;
  confidence?: number | null;
  notes?: string | null;
}

export interface CandidateChatResponse {
  answer: string;
}

export interface Verification {
  id: number;
  type: VerificationType;
  status: VerificationStatus;
  remarks?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface VerificationRequest {
  type?: VerificationType;
  status?: VerificationStatus;
  remarks?: string;
  verifiedBy?: string;
}
