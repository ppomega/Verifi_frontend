import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Candidate, DocumentMeta, Verification } from '../../models/bgv.models';
import { caseId, formatLabel } from '../../utils/format';
import { DocumentUploadComponent } from '../../components/document-upload/document-upload.component';
import { VerificationPanelComponent } from '../../components/verification-panel/verification-panel.component';
import { CandidateChatComponent } from '../../components/candidate-chat/candidate-chat.component';

@Component({
  selector: 'app-candidate-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, DocumentUploadComponent, VerificationPanelComponent, CandidateChatComponent],
  templateUrl: './candidate-detail-page.component.html',
})
export class CandidateDetailPageComponent implements OnInit {
  candidateId!: number;
  candidate: Candidate | null = null;
  documents: DocumentMeta[] = [];
  verifications: Verification[] = [];
  loading = true;

  readonly caseId = caseId;
  readonly formatLabel = formatLabel;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.candidateId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    forkJoin({
      candidate: this.api.getCandidate(this.candidateId),
      documents: this.api.getDocuments(this.candidateId),
      verifications: this.api.getVerifications(this.candidateId),
    }).subscribe({
      next: ({ candidate, documents, verifications }) => {
        this.candidate = candidate;
        this.documents = documents;
        this.verifications = verifications;
        this.loading = false;
      },
      error: () => {
        this.candidate = null;
        this.loading = false;
      },
    });
  }
}
