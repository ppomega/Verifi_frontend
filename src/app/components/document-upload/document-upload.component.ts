import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { DocumentExtraction, DocumentMeta, DocumentType, ExtractedDocumentFields } from '../../models/bgv.models';
import { formatLabel, formatSize } from '../../utils/format';

const DOCUMENT_TYPES: DocumentType[] = [
  'ID_PROOF',
  'ADDRESS_PROOF',
  'EDUCATION_CERTIFICATE',
  'EMPLOYMENT_LETTER',
  'PAN_CARD',
  'PHOTOGRAPH',
  'OTHER',
];

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-upload.component.html',
})
export class DocumentUploadComponent implements OnChanges {
  @Input({ required: true }) candidateId!: number;
  @Input() documents: DocumentMeta[] = [];
  @Output() changed = new EventEmitter<void>();

  documentTypes = DOCUMENT_TYPES;
  docType: DocumentType = 'ID_PROOF';
  selectedFile: File | null = null;
  uploading = false;
  error: string | null = null;
  extractingDocumentId: number | null = null;
  deletingDocumentId: number | null = null;
  extractionError: string | null = null;
  extractions: Record<number, DocumentExtraction> = {};

  readonly formatLabel = formatLabel;
  readonly formatSize = formatSize;

  constructor(private api: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documents']) {
      this.documents.forEach((document) => this.loadExtraction(document.id));
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  upload(): void {
    if (!this.selectedFile) return;
    this.uploading = true;
    this.error = null;
    this.api.uploadDocument(this.candidateId, this.docType, this.selectedFile).subscribe({
      next: () => {
        this.selectedFile = null;
        this.uploading = false;
        this.changed.emit();
      },
      error: (err) => {
        this.error = err?.error?.error ?? 'Upload failed';
        this.uploading = false;
      },
    });
  }

  downloadUrl(documentId: number): string {
    return this.api.documentDownloadUrl(documentId);
  }

  remove(documentId: number): void {
    if (this.deletingDocumentId !== null) return;

    this.deletingDocumentId = documentId;
    this.error = null;
    this.api.deleteDocument(documentId).subscribe({
      next: () => {
        delete this.extractions[documentId];
        this.deletingDocumentId = null;
        this.changed.emit();
      },
      error: (err) => {
        this.error = err?.error?.error ?? 'Document could not be deleted.';
        this.deletingDocumentId = null;
      },
    });
  }

  supportsExtraction(document: DocumentMeta): boolean {
    return ['application/pdf', 'image/jpeg', 'image/png'].includes(document.contentType);
  }

  extract(documentId: number): void {
    if (this.extractingDocumentId !== null) return;

    this.extractingDocumentId = documentId;
    this.extractionError = null;
    this.api.extractDocument(documentId).subscribe({
      next: (extraction) => {
        this.extractions[documentId] = extraction;
        this.extractingDocumentId = null;
      },
      error: (err) => {
        this.extractionError = err?.error?.error ?? 'AI extraction could not be completed.';
        this.extractingDocumentId = null;
      },
    });
  }

  extractionEntries(documentId: number): Array<{ label: string; value: string | number }> {
    const rawJson = this.extractions[documentId]?.extractedJson;
    if (!rawJson) return [];

    try {
      const fields = JSON.parse(rawJson) as ExtractedDocumentFields;
      return Object.entries(fields)
        .filter(([, value]) => value !== null && value !== undefined && value !== '')
        .map(([key, value]) => ({ label: this.formatLabel(key), value: value as string | number }));
    } catch {
      return [];
    }
  }

  private loadExtraction(documentId: number): void {
    this.api.getDocumentExtraction(documentId).subscribe({
      next: (extraction) => (this.extractions[documentId] = extraction),
      error: () => undefined,
    });
  }
}
