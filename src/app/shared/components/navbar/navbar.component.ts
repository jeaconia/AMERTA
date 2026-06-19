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
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input() logoUrl: string = 'assets/images/lambang-belok-sidan.png';
  @Input() links: NavLink[] = [
    { label: 'Beranda', path: '/' },
    { label: 'Produk', path: '/produk' },
    { label: 'Peta', path: '/peta' },
  ];
}
