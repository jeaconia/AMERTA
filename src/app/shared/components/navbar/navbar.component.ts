import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() logoUrl: string = 'assets/icons/logo-desa.svg';

  /** Daftar link navigasi, default sesuai referensi: Beranda, Produk, Peta */
  @Input() links: NavLink[] = [
    { label: 'Beranda', path: '/' },
    { label: 'Produk', path: '/produk' },
    { label: 'Peta', path: '/peta' },
  ];
}
