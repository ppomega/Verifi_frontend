import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="topbar">
      <a routerLink="/" class="brand">
        <span class="brand-mark">Verifi</span>
        <span class="brand-tag">Background Verification</span>
      </a>
      <button class="theme-toggle" type="button" (click)="toggleTheme()"
        [attr.aria-label]="darkTheme ? 'Switch to light theme' : 'Switch to dark theme'">
        {{ darkTheme ? 'Light theme' : 'Dark theme' }}
      </button>
      <span class="env-tag">local-storage · postgres</span>
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent implements OnInit {
  darkTheme = false;

  ngOnInit(): void {
    this.darkTheme = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    localStorage.setItem('theme', this.darkTheme ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.dataset['theme'] = this.darkTheme ? 'dark' : 'light';
  }
}
