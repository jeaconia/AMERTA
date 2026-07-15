import { Routes } from '@angular/router';
import { BerandaPageComponent } from './pages/beranda/beranda.page';
import { PetaPageComponent } from './pages/peta/peta.page';
import { ProdukPageComponent } from './pages/produk/produk.page';

export const routes: Routes = [
  { path: '', component: BerandaPageComponent },
  { path: 'produk', component: ProdukPageComponent },
  { path: 'peta', component: PetaPageComponent },
];
