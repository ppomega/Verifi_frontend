import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

@Component({
  selector: 'app-candidate-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate-chat.component.html',
})
export class CandidateChatComponent {
  @Input({ required: true }) candidateId!: number;

  message = '';
  messages: ChatMessage[] = [];
  sending = false;
  error: string | null = null;

  constructor(private api: ApiService) {}

  send(): void {
    const text = this.message.trim();
    if (!text || this.sending) return;

    this.messages.push({ role: 'user', text });
    this.message = '';
    this.sending = true;
    this.error = null;

    this.api.chatWithCandidateSupport(this.candidateId, text).subscribe({
      next: ({ answer }) => {
        this.messages.push({ role: 'assistant', text: answer });
        this.sending = false;
      },
      error: (err) => {
        this.error = err?.error?.error ?? 'AI support is currently unavailable. Please try again.';
        this.sending = false;
      },
    });
  }
}
