import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Candidate } from '../../models/bgv.models';
import { caseId, formatLabel } from '../../utils/format';

@Component({
  selector: 'app-candidates-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './candidates-page.component.html',
})
export class CandidatesPageComponent implements OnInit {
  candidates: Candidate[] = [];
  loading = true;
  error: string | null = null;
  showForm = false;
  submitting = false;

  fullName = '';
  email = '';
  phone = '';
  position = '';

  readonly caseId = caseId;
  readonly formatLabel = formatLabel;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.api.getCandidates().subscribe({
      next: (data) => {
        this.candidates = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load candidates';
        this.loading = false;
      },
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  submit(): void {
    this.submitting = true;
    this.error = null;
    this.api
      .createCandidate({
        fullName: this.fullName,
        email: this.email,
        phone: this.phone || undefined,
        positionAppliedFor: this.position || undefined,
      })
      .subscribe({
        next: () => {
          this.fullName = '';
          this.email = '';
          this.phone = '';
          this.position = '';
          this.showForm = false;
          this.submitting = false;
          this.load();
        },
        error: (err) => {
          this.error = err?.error?.error ?? 'Failed to create candidate';
          this.submitting = false;
        },
      });
  }
}
