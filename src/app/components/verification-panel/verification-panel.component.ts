import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Verification, VerificationStatus, VerificationType } from '../../models/bgv.models';
import { formatLabel } from '../../utils/format';

const VERIFICATION_TYPES: VerificationType[] = [
  'IDENTITY',
  'ADDRESS',
  'EDUCATION',
  'EMPLOYMENT',
  'CRIMINAL_RECORD',
  'REFERENCE_CHECK',
  'CREDIT_CHECK',
];

const STATUSES: VerificationStatus[] = ['PENDING', 'IN_PROGRESS', 'VERIFIED', 'REJECTED', 'DISCREPANCY_FOUND'];

@Component({
  selector: 'app-verification-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verification-panel.component.html',
})
export class VerificationPanelComponent {
  @Input({ required: true }) candidateId!: number;
  @Input() verifications: Verification[] = [];
  @Output() changed = new EventEmitter<void>();

  verificationTypes = VERIFICATION_TYPES;
  statuses = STATUSES;
  selectedType: VerificationType = 'IDENTITY';
  adding = false;

  readonly formatLabel = formatLabel;

  constructor(private api: ApiService) {}

  add(): void {
    this.adding = true;
    this.api.createVerification(this.candidateId, { type: this.selectedType, status: 'PENDING' }).subscribe({
      next: () => {
        this.adding = false;
        this.changed.emit();
      },
      error: () => {
        this.adding = false;
      },
    });
  }

  onStatusChange(id: number, status: string): void {
    this.api.updateVerification(id, { status: status as VerificationStatus }).subscribe(() => this.changed.emit());
  }

  onRemarksBlur(id: number, remarks: string): void {
    this.api.updateVerification(id, { remarks }).subscribe(() => this.changed.emit());
  }
}
