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
  { title: 'Asparagus', image: 'assets/images/produk-asparagus.png', link: '/produk/asparagus', tipeTanaman: ['hortikultura-sayur'], banjar: ['selantang', 'sidan', 'sidan-kawan', 'penikit'] },
  { title: 'Alpukat', image: 'assets/images/produk-alpukat.png', link: '/produk/alpukat', tipeTanaman: ['hortikultura-buah'], banjar: ['bon', 'jempanang', 'sekarmukti', 'lawak', 'belok'] },
  { title: 'Bayam Inggris', image: 'assets/images/produk-bayam inggris.png', link: '/produk/bayam-inggris', tipeTanaman: ['hortikultura-sayur'], banjar: ['belok'] },
  { title: 'Bunga Gemitir', image: 'assets/images/produk-bunga-gemitir.png', link: '/produk/bunga-gemitir', tipeTanaman: ['tanaman-hias'], banjar: ['sekarmukti', 'lawak', 'belok', 'selantang', 'sidan'] },
  { title: 'Cabai', image: 'assets/images/produk-cabai.png', link: '/produk/cabai', tipeTanaman: ['hortikultura-sayur'], banjar: ['bon', 'jempanang', 'sekarmukti', 'sidan'] },
  { title: 'Durian Musangking', image: 'assets/images/produk-durian.png', link: '/produk/durian-musangking', tipeTanaman: ['hortikultura-buah'], banjar: ['selantang', 'sidan', 'sidan-kawan', 'penikit'] },
  { title: 'Gula Aren', image: 'assets/images/produk-gula aren.png', link: '/produk/gula-aren', tipeTanaman: ['tanaman-perkebunan'], banjar: ['sekarmukti'] },
  { title: 'Jeruk Brastagi', image: 'assets/images/produk-jeruk brastagi.png', link: '/produk/jeruk-brastagi', tipeTanaman: ['hortikultura-buah'], banjar: ['bon'] },
  { title: 'Jeruk Siam Madu', image: 'assets/images/produk-jeruk siam madu.png', link: '/produk/jeruk-siam-madu', tipeTanaman: ['hortikultura-buah'], banjar: ['bon', 'jempanang', 'sekarmukti', 'lawak', 'belok'] },
  { title: 'Kopi Arabika', image: 'assets/images/produk-kopi.png', link: '/produk/kopi-arabika', tipeTanaman: ['tanaman-perkebunan'], banjar: ['jempanang', 'bon', 'sekarmukti', 'lawak', 'belok', 'selantang', 'sidan', 'sidan-kawan', 'penikit'] },
  { title: 'Padi', image: 'assets/images/produk-padi.png', link: '/produk/padi', tipeTanaman: ['tanaman-pangan'], banjar: ['sidan', 'sidan-kawan', 'penikit'] },
  { title: 'Sawi Putih', image: 'assets/images/produk-sawi putih.png', link: '/produk/sawi-putih', tipeTanaman: ['hortikultura-sayur'], banjar: ['bon'] },
  { title: 'Sayur Hortikultura', image: 'assets/images/produk-sayur hortikultura.png', link: '/produk/sayur-hortikultura', tipeTanaman: ['hortikultura-sayur'], banjar: ['selantang'] },
  { title: 'Timun Jepang', image: 'assets/images/produk-timun jepang.png', link: '/produk/timun-jepang', tipeTanaman: ['hortikultura-sayur'], banjar: ['belok'] },
  { title: 'Vanili', image: 'assets/images/produk-vanili.png', link: '/produk/vanili', tipeTanaman: ['tanaman-perkebunan'], banjar: ['sidan'] },
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

  // Filter state — hanya satu kategori tanaman yang bisa dipilih dalam satu waktu
  selectedTipeTanaman: TipeTanaman | null = null;
  selectedBanjar: Banjar | null = null;

  // Lists untuk filter UI
  tipeTanamanOptions: Array<{ key: TipeTanaman; label: string }> = [
    { key: 'hortikultura-sayur', label: TIPE_TANAMAN_LABELS['hortikultura-sayur'] },
    { key: 'tanaman-pangan', label: TIPE_TANAMAN_LABELS['tanaman-pangan'] },
    { key: 'tanaman-perkebunan', label: TIPE_TANAMAN_LABELS['tanaman-perkebunan'] },
    { key: 'hortikultura-buah', label: TIPE_TANAMAN_LABELS['hortikultura-buah'] },
    { key: 'tanaman-hias', label: TIPE_TANAMAN_LABELS['tanaman-hias'] }
  ];

  banjarOptions: Array<{ key: Banjar; label: string }> = [
    { key: 'jempanang', label: BANJAR_LABELS['jempanang'] },
    { key: 'bon', label: BANJAR_LABELS['bon'] },
    { key: 'sekarmukti', label: BANJAR_LABELS['sekarmukti'] },
    { key: 'lawak', label: BANJAR_LABELS['lawak'] },
    { key: 'belok', label: BANJAR_LABELS['belok'] },
    { key: 'selantang', label: BANJAR_LABELS['selantang'] },
    { key: 'sidan', label: BANJAR_LABELS['sidan'] },
    { key: 'sidan-kawan', label: BANJAR_LABELS['sidan-kawan'] },
    { key: 'penikit', label: BANJAR_LABELS['penikit'] }
  ];

  get filteredProdukList(): ProdukItem[] {
    if (!this.selectedTipeTanaman && !this.selectedBanjar) {
      return this.produkList;
    }

    return this.produkList.filter(produk => {
      const matchesTipe = !this.selectedTipeTanaman ||
        produk.tipeTanaman.includes(this.selectedTipeTanaman);
      const matchesBanjar = !this.selectedBanjar ||
        produk.banjar.includes(this.selectedBanjar);

      return matchesTipe && matchesBanjar;
    });
  }

  /** Apakah kartu produk unggulan (featured) sesuai dengan filter yang aktif saat ini */
  get isFeaturedVisible(): boolean {
    if (!this.selectedTipeTanaman) {
      return true;
    }
    return this.featured.tipeTanaman.includes(this.selectedTipeTanaman);
  }

  toggleTipeTanaman(tipe: TipeTanaman): void {
    // Single-select: pilih kategori ini, atau kembali ke "semua" jika kategori yang sama dipencet lagi
    this.selectedTipeTanaman = this.selectedTipeTanaman === tipe ? null : tipe;
  }

  toggleBanjar(banjar: Banjar): void {
    this.selectedBanjar = this.selectedBanjar === banjar ? null : banjar;
  }

  clearFilters(): void {
    this.selectedTipeTanaman = null;
    this.selectedBanjar = null;
  }

  onLihatSelengkapnya(title: string): void {
    console.log('Lihat selengkapnya untuk:', title);
  }
}
