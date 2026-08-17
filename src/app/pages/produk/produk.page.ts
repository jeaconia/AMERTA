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
  tipeTanaman: TipeTanaman[];
}

export type TipeTanaman = 'hortikultura-sayur' | 'tanaman-pangan' | 'tanaman-perkebunan' | 'hortikultura-buah' | 'tanaman-hias';
export type Banjar = 'jempanang' | 'bon' | 'sekarmukti' | 'lawak' | 'belok' | 'selantang' | 'sidan' | 'sidan-kawan' | 'penikit';

export const TIPE_TANAMAN_LABELS: Record<TipeTanaman, string> = {
  'hortikultura-sayur': 'Hortikultura Sayur',
  'tanaman-pangan': 'Tanaman Pangan',
  'tanaman-perkebunan': 'Tanaman Perkebunan',
  'hortikultura-buah': 'Hortikultura Buah',
  'tanaman-hias': 'Tanaman Hias'
};

export const BANJAR_LABELS: Record<Banjar, string> = {
  'jempanang': 'Banjar Dinas Jempanang',
  'bon': 'Banjar Dinas Bon',
  'sekarmukti': 'Banjar Dinas Sekarmukti',
  'lawak': 'Banjar Dinas Lawak',
  'belok': 'Banjar Dinas Belok',
  'selantang': 'Banjar Dinas Selantang',
  'sidan': 'Banjar Dinas Sidan',
  'sidan-kawan': 'Banjar Dinas Sidan Kawan',
  'penikit': 'Banjar Dinas Penikit'
};

export interface ProdukItem {
  title: string;
  image: string;
  link: string;
  tipeTanaman: TipeTanaman[];
  banjar: Banjar[];
}

/** Daftar produk unggulan — sumber data tunggal, dipakai juga oleh halaman detail produk untuk badge kategori/banjar.
 * Sebaran banjar mengikuti tabel "Potensi Wilayah Desa Belok Sidan". */
export const PRODUK_LIST: ProdukItem[] = [
  { title: 'Alpukat', image: 'assets/images/produk-alpukat.png', link: '/produk/alpukat', tipeTanaman: ['hortikultura-buah'], banjar: ['bon', 'jempanang', 'sekarmukti', 'lawak', 'belok'] },
  { title: 'Bunga Gemitir', image: 'assets/images/produk-bunga-gemitir.png', link: '/produk/bunga-gemitir', tipeTanaman: ['tanaman-hias'], banjar: ['sekarmukti', 'lawak', 'belok', 'selantang', 'sidan'] },
  { title: 'Cabai Besar', image: 'assets/images/produk-cabai besar.png', link: '/produk/cabai-besar', tipeTanaman: ['hortikultura-sayur'], banjar: ['bon', 'jempanang', 'sekarmukti', 'sidan'] },
  { title: 'Cabai Rawit', image: 'assets/images/produk-cabai rawit.png', link: '/produk/cabai-rawit', tipeTanaman: ['hortikultura-sayur'], banjar: ['bon', 'jempanang', 'sekarmukti', 'sidan'] },
  { title: 'Durian Musangking', image: 'assets/images/produk-durian.png', link: '/produk/durian-musangking', tipeTanaman: ['hortikultura-buah'], banjar: ['selantang', 'sidan', 'sidan-kawan', 'penikit'] },
  { title: 'Jeruk Siam', image: 'assets/images/produk-jeruk siam madu.png', link: '/produk/jeruk-siam-madu', tipeTanaman: ['hortikultura-buah'], banjar: ['bon', 'jempanang', 'sekarmukti', 'lawak', 'belok'] },
  { title: 'Lemon', image: 'assets/images/produk-lemon.png', link: '/produk/lemon', tipeTanaman: ['hortikultura-buah'], banjar: ['bon', 'lawak'] },
  { title: 'Kopi Arabika', image: 'assets/images/produk-kopi.png', link: '/produk/kopi-arabika', tipeTanaman: ['tanaman-perkebunan'], banjar: ['jempanang', 'bon', 'sekarmukti', 'lawak', 'belok', 'selantang', 'sidan', 'sidan-kawan', 'penikit'] },
  { title: 'Padi', image: 'assets/images/produk-padi.png', link: '/produk/padi', tipeTanaman: ['tanaman-pangan'], banjar: ['sidan', 'sidan-kawan', 'penikit'] },
];

@Component({
  selector: 'app-produk-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.css']
})
export class ProdukPageComponent {
  @Input() bannerTitle: string = 'Produk Unggulan';

  // Expose constants untuk template
  readonly tipeTanamanLabels = TIPE_TANAMAN_LABELS;
  readonly banjarLabels = BANJAR_LABELS;

  /** Produk utama yang ditonjolkan di bagian atas halaman */
  @Input() featured: ProdukFeatured = {
    title: 'Asparagus',
    subtitle: 'Sang Tunas Hijau Dari Dataran Tinggi',
    image: 'assets/images/produk-asparagus2.png',
    link: '/produk/asparagus',
    tipeTanaman: ['hortikultura-sayur'],
  };

  /** Daftar produk unggulan lainnya, ditampilkan dalam grid kartu */
  @Input() produkList: ProdukItem[] = PRODUK_LIST;

  // Filter state — hanya kategori tanaman yang bisa dipilih
  selectedTipeTanaman: TipeTanaman | null = null;

  // Lists untuk filter UI
  tipeTanamanOptions: Array<{ key: TipeTanaman; label: string }> = [
    { key: 'hortikultura-sayur', label: TIPE_TANAMAN_LABELS['hortikultura-sayur'] },
    { key: 'tanaman-pangan', label: TIPE_TANAMAN_LABELS['tanaman-pangan'] },
    { key: 'tanaman-perkebunan', label: TIPE_TANAMAN_LABELS['tanaman-perkebunan'] },
    { key: 'hortikultura-buah', label: TIPE_TANAMAN_LABELS['hortikultura-buah'] },
    { key: 'tanaman-hias', label: TIPE_TANAMAN_LABELS['tanaman-hias'] }
  ];

  get filteredProdukList(): ProdukItem[] {
    if (!this.selectedTipeTanaman) {
      return this.produkList;
    }

    return this.produkList.filter(produk =>
      produk.tipeTanaman.includes(this.selectedTipeTanaman as TipeTanaman)
    );
  }

  /** Apakah kartu produk unggulan (featured) sesuai dengan filter yang aktif saat ini */
  get isFeaturedVisible(): boolean {
    const featuredProduk = this.produkList.find((produk) => produk.link === this.featured.link);

    if (!featuredProduk) {
      return !this.selectedTipeTanaman || this.featured.tipeTanaman.includes(this.selectedTipeTanaman as TipeTanaman);
    }

    return !this.selectedTipeTanaman ||
      featuredProduk.tipeTanaman.includes(this.selectedTipeTanaman as TipeTanaman);
  }

  toggleTipeTanaman(tipe: TipeTanaman): void {
    // Single-select: pilih kategori ini, atau kembali ke "semua" jika kategori yang sama dipencet lagi
    this.selectedTipeTanaman = this.selectedTipeTanaman === tipe ? null : tipe;
  }

  clearFilters(): void {
    this.selectedTipeTanaman = null;
  }

  onLihatSelengkapnya(title: string): void {
    console.log('Lihat selengkapnya untuk:', title);
  }
}
