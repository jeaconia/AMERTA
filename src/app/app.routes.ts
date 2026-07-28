import { Routes } from '@angular/router';
import { BerandaPageComponent } from './pages/beranda/beranda.page';
import { PetaPageComponent } from './pages/peta/peta.page';
import { ProdukPageComponent } from './pages/produk/produk.page';
import { ProdukDetailPageComponent } from './pages/produk-detail/produk-detail.page';

export const routes: Routes = [
  { path: '', component: BerandaPageComponent },
  { path: 'produk', component: ProdukPageComponent, pathMatch: 'full' },
  { path: 'produk/:slug', component: ProdukDetailPageComponent },
  { path: 'peta', component: PetaPageComponent },
];
