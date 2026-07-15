import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './produk.page.html',
  styleUrl: './produk.page.css'
})
export class ProdukPageComponent {
  @Input() bannerTitle: string = 'Produk Unggulan';

  /** Produk utama yang ditonjolkan di bagian atas halaman */
  @Input() featured: ProdukFeatured = {
    title: 'Asparagus',
    subtitle: 'Sang Tunas Hijau Dari Dataran Tinggi',
    image: 'assets/images/produk-asparagus2.png',
    link: '#',
  };

  /** Daftar produk unggulan lainnya, ditampilkan dalam grid kartu */
  @Input() produkList: ProdukItem[] = [
    { title: 'Durian Musangking', image: 'assets/images/produk-durian.png', link: '#' },
    { title: 'Durian Musangking', image: 'assets/images/produk-durian.png', link: '#' },
    { title: 'Durian Musangking', image: 'assets/images/produk-durian.png', link: '#' },
    { title: 'Durian Musangking', image: 'assets/images/produk-durian.png', link: '#' },
  ];

  onLihatSelengkapnya(title: string): void {
    console.log('Lihat selengkapnya untuk:', title);
    // logika navigasi / modal bisa ditambahkan di sini
  }
}
