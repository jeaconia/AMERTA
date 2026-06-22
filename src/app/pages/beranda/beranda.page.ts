import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { SejarahComponent } from '../../shared/components/sejarah/sejarah.component';
import { KeunggulanComponent } from '../../shared/components/keunggulan/keunggulan.component';
import { KhasiatComponent } from '../../shared/components/khasiat/khasiat.component';
import { StandarKualitasComponent } from '../../shared/components/standar-kualitas/standar-kualitas.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-beranda-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, HeroComponent, SejarahComponent, KeunggulanComponent, KhasiatComponent, StandarKualitasComponent, FooterComponent],
  templateUrl: './beranda.page.html',
  styleUrl: './beranda.page.css'
})
export class BerandaPageComponent {
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
