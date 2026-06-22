import { Routes } from '@angular/router';
import { BerandaPageComponent } from './pages/beranda/beranda.page';
import { PetaPageComponent } from './pages/peta/peta.page';

export const routes: Routes = [
  { path: '', component: BerandaPageComponent },
  { path: 'peta', component: PetaPageComponent },
];
