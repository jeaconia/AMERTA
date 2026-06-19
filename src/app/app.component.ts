import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './shared/components/button/button.component';
import { CardComponent } from './shared/components/card/card.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HeroComponent } from './shared/components/hero/hero.component';
import { SejarahComponent } from './shared/components/sejarah/sejarah.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, CardComponent, NavbarComponent, HeroComponent, SejarahComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'desa-belok-sidan';

  // Contoh data produk unggulan (biasanya datang dari service, ini cuma contoh statis)
  produkUnggulan = [
    {
      title: 'Asparagus',
      image: 'assets/images/produk-asparagus.png',
      description: 'Grade A, dibudidayakan langsung oleh petani lokal.'
    },
    {
      title: 'Durian Musangking',
      image: 'assets/images/produk-durian.png',
      description: 'Hasil panen dataran tinggi Belok/Sidan.'
    },
    {
      title: 'Kopi Arabika',
      image: 'assets/images/produk-kopi.png',
      description: 'Ditanam di Banjar Dinas Jempanang dan Lawak.'
    },
  ];

  onLihatDetail(produk: string): void {
    console.log('Lihat detail untuk:', produk);
    // logika navigasi / modal bisa ditambahkan di sini
  }
}
