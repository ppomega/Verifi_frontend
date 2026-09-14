import { Routes } from '@angular/router';
import { CandidatesPageComponent } from './pages/candidates-page/candidates-page.component';
import { CandidateDetailPageComponent } from './pages/candidate-detail-page/candidate-detail-page.component';

export const routes: Routes = [
  { path: '', component: CandidatesPageComponent },
  { path: 'candidates/:id', component: CandidateDetailPageComponent },
];
