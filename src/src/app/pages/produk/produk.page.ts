import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

export interface ProdukFeatured {
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export interface ProdukItem {
  title: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-produk-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './produk.page.html',
  styleUrl: './produk.page.css'
})
export class ProdukPageComponent {
  @Input() bannerTitle: string = 'Produk Unggulan';

  /** Produk utama yang ditonjolkan di bagian atas halaman */
  @Input() featured: ProdukFeatured = {
    title: 'Asparagus',
    subtitle: 'Sang Tunas Hijau Dari Dataran Tinggi',
    image: 'assets/images/produk-asparagus.png',
    link: '/produk/asparagus',
  };

  /** Daftar produk unggulan lainnya, ditampilkan dalam grid kartu */
  @Input() produkList: ProdukItem[] = [
    { title: 'Durian Musangking', image: 'assets/images/produk-durian.png', link: '/produk/durian-musangking' },
    { title: 'Kopi Arabika', image: 'assets/images/produk-kopi.png', link: '/produk/kopi-arabika' },
    { title: 'Bunga Gumitir', image: 'assets/images/produk-bunga-gumitir.png', link: '/produk/bunga-gumitir' },
    { title: 'Vanili', image: 'assets/images/produk-vanili.png', link: '/produk/vanili' },
  ];

  onLihatSelengkapnya(title: string): void {
    console.log('Lihat selengkapnya untuk:', title);
  }
}
