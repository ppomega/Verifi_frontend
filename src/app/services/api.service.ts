import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Candidate,
  CandidateChatResponse,
  CandidateRequest,
  DocumentExtraction,
  DocumentMeta,
  DocumentType,
  Verification,
  VerificationRequest,
} from '../models/bgv.models';

const API = '/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  // ---- Candidates ----

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${API}/candidates`);
  }

  getCandidate(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${API}/candidates/${id}`);
  }

  createCandidate(payload: CandidateRequest): Observable<Candidate> {
    return this.http.post<Candidate>(`${API}/candidates`, payload);
  }

  updateCandidate(id: number, payload: CandidateRequest): Observable<Candidate> {
    return this.http.put<Candidate>(`${API}/candidates/${id}`, payload);
  }

  deleteCandidate(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/candidates/${id}`);
  }

  // ---- Documents ----

  getDocuments(candidateId: number): Observable<DocumentMeta[]> {
    return this.http.get<DocumentMeta[]>(`${API}/candidates/${candidateId}/documents`);
  }

  uploadDocument(candidateId: number, documentType: DocumentType, file: File): Observable<DocumentMeta> {
    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('file', file);
    return this.http.post<DocumentMeta>(`${API}/candidates/${candidateId}/documents`, formData);
  }

  documentDownloadUrl(documentId: number): string {
    return `${API}/documents/${documentId}/download`;
  }

  deleteDocument(documentId: number): Observable<void> {
    return this.http.delete<void>(`${API}/documents/${documentId}`);
  }

  extractDocument(documentId: number): Observable<DocumentExtraction> {
    return this.http.post<DocumentExtraction>(`${API}/documents/${documentId}/extraction`, {});
  }

  getDocumentExtraction(documentId: number): Observable<DocumentExtraction> {
    return this.http.get<DocumentExtraction>(`${API}/documents/${documentId}/extraction`);
  }

  // ---- AI candidate support ----

  chatWithCandidateSupport(candidateId: number, message: string): Observable<CandidateChatResponse> {
    return this.http.post<CandidateChatResponse>(
      `${API}/candidates/${candidateId}/support/chat`,
      { message },
    );
  }

  // ---- Verifications ----

  getVerifications(candidateId: number): Observable<Verification[]> {
    return this.http.get<Verification[]>(`${API}/candidates/${candidateId}/verifications`);
  }

  createVerification(candidateId: number, payload: VerificationRequest): Observable<Verification> {
    return this.http.post<Verification>(`${API}/candidates/${candidateId}/verifications`, payload);
  }

  updateVerification(id: number, payload: VerificationRequest): Observable<Verification> {
    return this.http.put<Verification>(`${API}/verifications/${id}`, payload);
  }

  deleteVerification(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/verifications/${id}`);
  }
}
