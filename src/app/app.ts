import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Button } from './shared/components/button/button';
import { Card } from './shared/components/card/card';
import { Hero } from './shared/components/hero/hero';
import { Sejarah } from './shared/components/sejarah/sejarah';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Button, Card, Hero, Sejarah],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('desa-belok-sidan');

  produkUnggulan = [
    {
      title: 'Asparagus',
      image: 'images/produk-asparagus.png',
      description: 'Grade A, dibudidayakan langsung oleh petani lokal.'
    },
    {
      title: 'Durian Musangking',
      image: 'images/produk-durian.png',
      description: 'Hasil panen dataran tinggi Belok/Sidan.'
    },
    {
      title: 'Kopi Arabika',
      image: 'images/produk-kopi.png',
      description: 'Ditanam di Banjar Dinas Jempanang dan Lawak.'
    },
  ];

  onLihatDetail(produk: string): void {
    console.log('Lihat detail untuk:', produk);
  }
}
