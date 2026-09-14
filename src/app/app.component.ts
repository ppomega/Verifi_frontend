import { Component } from '@angular/core';
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
      <span class="env-tag">local-storage · postgres</span>
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
