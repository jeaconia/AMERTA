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
  styleUrls: ['./produk.page.css']
})
export class ProdukPageComponent {
  @Input() bannerTitle: string = 'Produk Unggulan';

  /** Produk utama yang ditonjolkan di bagian atas halaman */
  @Input() featured: ProdukFeatured = {
    title: 'Asparagus',
    subtitle: 'Sang Tunas Hijau Dari Dataran Tinggi',
    image: 'assets/images/produk-asparagus2.png',
    link: '/produk/asparagus',
  };

  /** Daftar produk unggulan lainnya, ditampilkan dalam grid kartu */
  @Input() produkList: ProdukItem[] = [
    { title: 'Asparagus', image: 'assets/images/produk-asparagus.png', link: '/produk/asparagus' },
    { title: 'Alpukat', image: 'assets/images/produk-alpukat.png', link: '/produk/alpukat' },
    { title: 'Baya Inggris', image: 'assets/images/produk-baya inggris.png', link: '/produk/baya-inggris' },
    { title: 'Bunga Anggrek', image: 'assets/images/produk-bunga anggrek.png', link: '/produk/bunga-anggrek' },
    { title: 'Bunga Gemitir', image: 'assets/images/produk-bunga-gemitir.png', link: '/produk/bunga-gemitir' },
    { title: 'Cabai', image: 'assets/images/produk-cabai.png', link: '/produk/cabai' },
    { title: 'Durian Musangking', image: 'assets/images/produk-durian.png', link: '/produk/durian-musangking' },
    { title: 'Gula Aren', image: 'assets/images/produk-gula aren.png', link: '/produk/gula-aren' },
    { title: 'Jeruk Brastagi', image: 'assets/images/produk-jeruk brastagi.png', link: '/produk/jeruk-brastagi' },
    { title: 'Jeruk Siam Madu', image: 'assets/images/produk-jeruk siam madu.png', link: '/produk/jeruk-siam-madu' },
    { title: 'Kopi Arabika', image: 'assets/images/produk-kopi.png', link: '/produk/kopi-arabika' },
    { title: 'Padi', image: 'assets/images/produk-padi.png', link: '/produk/padi' },
    { title: 'Sawi Putih', image: 'assets/images/produk-sawi putih.png', link: '/produk/sawi-putih' },
    { title: 'Sayur Hortikultura', image: 'assets/images/produk-sayur hortikultura.png', link: '/produk/sayur-hortikultura' },
    { title: 'Timun Jepang', image: 'assets/images/produk-timun jepang.png', link: '/produk/timun-jepang' },
    { title: 'Vanili', image: 'assets/images/produk-vanili.png', link: '/produk/vanili' },
  ];

  onLihatSelengkapnya(title: string): void {
    console.log('Lihat selengkapnya untuk:', title);
  }
}
