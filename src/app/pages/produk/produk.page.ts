import { Component, Input, ViewChild, ElementRef } from '@angular/core';
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

export type TipeTanaman = 'hortikultura-sayur' | 'tanaman-pangan' | 'tanaman-perkebunan' | 'hortikultura-buah' | 'tanaman-hias' | 'biofarmaka' | 'palawija';
export type Banjar = 'jempanang' | 'bon' | 'sekarmukti' | 'lawak' | 'belok' | 'selantang' | 'sidan' | 'sidan-kawan' | 'penikit';

export const TIPE_TANAMAN_LABELS: Record<TipeTanaman, string> = {
  'hortikultura-sayur': 'Hortikultura Sayur',
  'tanaman-pangan': 'Tanaman Pangan',
  'tanaman-perkebunan': 'Tanaman Perkebunan',
  'hortikultura-buah': 'Hortikultura Buah',
  'tanaman-hias': 'Tanaman Hias',
  'biofarmaka': 'Biofarmaka',
  'palawija': 'Palawija'
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
  { title: 'Cabai', image: 'assets/images/produk-cabai besar.png', link: '/produk/cabai', tipeTanaman: ['hortikultura-sayur'], banjar: ['bon', 'jempanang', 'sekarmukti', 'lawak', 'belok', 'selantang', 'sidan', 'sidan-kawan', 'penikit'] },
  { title: 'Kubis', image: 'assets/images/produk-kubis.png', link: '/produk/kubis', tipeTanaman: ['hortikultura-sayur'], banjar: [] },
  { title: 'Sawi putih', image: 'assets/images/produk-sawi putih.png', link: '/produk/sawi-putih', tipeTanaman: ['hortikultura-sayur'], banjar: [] },
  { title: 'Buncis', image: 'assets/images/produk-buncis.png', link: '/produk/buncis', tipeTanaman: ['hortikultura-sayur'], banjar: [] },
  { title: 'Mentimun', image: 'assets/images/produk-timun jepang.png', link: '/produk/mentimun', tipeTanaman: ['hortikultura-sayur'], banjar: [] },
  { title: 'Tomat', image: 'assets/images/produk-tomat.png', link: '/produk/tomat', tipeTanaman: ['hortikultura-sayur'], banjar: [] },
  { title: 'Pakcoy', image: 'assets/images/produk-pakcoy.png', link: '/produk/pakcoy', tipeTanaman: ['hortikultura-sayur'], banjar: [] },
  { title: 'Terong', image: 'assets/images/produk-terong.png', link: '/produk/terong', tipeTanaman: ['hortikultura-sayur'], banjar: [] },
  { title: 'Labu siam', image: 'assets/images/produk-labu-siam.png', link: '/produk/labu-siam', tipeTanaman: ['hortikultura-sayur'], banjar: [] },
  { title: 'Labu pumpkin', image: 'assets/images/produk-labu-pumpkin.png', link: '/produk/labu-pumpkin', tipeTanaman: ['hortikultura-sayur'], banjar: [] },
  { title: 'Durian', image: 'assets/images/produk-durian.png', link: '/produk/durian', tipeTanaman: ['hortikultura-buah'], banjar: ['selantang'] },
  { title: 'Jeruk', image: 'assets/images/produk-jeruk siam madu.png', link: '/produk/jeruk', tipeTanaman: ['hortikultura-buah'], banjar: ['bon', 'jempanang', 'sekarmukti', 'lawak', 'belok'] },
  { title: 'Lemon', image: 'assets/images/produk-lemon.png', link: '/produk/lemon', tipeTanaman: ['hortikultura-buah'], banjar: ['bon', 'lawak'] },
  { title: 'Pisang', image: 'assets/images/produk-pisang.png', link: '/produk/pisang', tipeTanaman: ['hortikultura-buah'], banjar: [] },
  { title: 'Kopi', image: 'assets/images/produk-kopi.png', link: '/produk/kopi', tipeTanaman: ['tanaman-perkebunan'], banjar: ['jempanang', 'bon', 'sekarmukti', 'lawak', 'belok', 'selantang', 'sidan', 'sidan-kawan', 'penikit'] },
  { title: 'Vanili', image: 'assets/images/produk-vanili.png', link: '/produk/vanili', tipeTanaman: ['tanaman-perkebunan'], banjar: [] },
  { title: 'Gula aren', image: 'assets/images/produk-gula aren.png', link: '/produk/gula-aren', tipeTanaman: ['tanaman-perkebunan'], banjar: [] },
  { title: 'Cengkeh', image: 'assets/images/produk-cengkeh.png', link: '/produk/cengkeh', tipeTanaman: ['tanaman-perkebunan'], banjar: [] },
  { title: 'Kakao', image: 'assets/images/produk-kakao.png', link: '/produk/kakao', tipeTanaman: ['tanaman-perkebunan'], banjar: [] },
  { title: 'Kelapa', image: 'assets/images/produk-kelapa.png', link: '/produk/kelapa', tipeTanaman: ['tanaman-perkebunan'], banjar: [] },
  { title: 'Padi', image: 'assets/images/produk-padi.png', link: '/produk/padi', tipeTanaman: ['tanaman-pangan'], banjar: ['belok', 'lawak', 'sidan', 'penikit'] },
  { title: 'Jahe', image: 'assets/images/produk-jahe.png', link: '/produk/jahe', tipeTanaman: ['biofarmaka'], banjar: [] },
  { title: 'Umbi-umbian', image: 'assets/images/produk-umbi.png', link: '/produk/umbi-umbian', tipeTanaman: ['palawija'], banjar: [] },
  { title: 'Kacang tanah', image: 'assets/images/produk-kacang-tanah.png', link: '/produk/kacang-tanah', tipeTanaman: ['palawija'], banjar: [] },
  { title: 'Porang', image: 'assets/images/produk-porang.png', link: '/produk/porang', tipeTanaman: ['palawija'], banjar: [] },
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
  @ViewChild('filterTrack') filterTrackRef?: ElementRef<HTMLDivElement>;

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

  // Lists untuk filter UI dengan ikon Font Awesome
  tipeTanamanOptions: Array<{ key: TipeTanaman; label: string; icon: string }> = [
    { key: 'hortikultura-sayur', label: TIPE_TANAMAN_LABELS['hortikultura-sayur'], icon: 'fa-carrot' },
    { key: 'tanaman-pangan', label: TIPE_TANAMAN_LABELS['tanaman-pangan'], icon: 'fa-wheat-awn' },
    { key: 'tanaman-perkebunan', label: TIPE_TANAMAN_LABELS['tanaman-perkebunan'], icon: 'fa-tree' },
    { key: 'hortikultura-buah', label: TIPE_TANAMAN_LABELS['hortikultura-buah'], icon: 'fa-apple-whole' },
    { key: 'tanaman-hias', label: TIPE_TANAMAN_LABELS['tanaman-hias'], icon: 'fa-spa' },
    { key: 'biofarmaka', label: TIPE_TANAMAN_LABELS['biofarmaka'], icon: 'fa-mortar-pestle' },
    { key: 'palawija', label: TIPE_TANAMAN_LABELS['palawija'], icon: 'fa-seedling' }
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

  getProdukCount(tipe: TipeTanaman | null): number {
    if (!tipe) {
      return this.produkList.length;
    }
    return this.produkList.filter(produk => produk.tipeTanaman.includes(tipe)).length;
  }

  toggleTipeTanaman(tipe: TipeTanaman, event?: Event): void {
    // Single-select: pilih kategori ini, atau kembali ke "semua" jika kategori yang sama dipencet lagi
    this.selectedTipeTanaman = this.selectedTipeTanaman === tipe ? null : tipe;

    if (event?.currentTarget && typeof (event.currentTarget as HTMLElement).scrollIntoView === 'function') {
      (event.currentTarget as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }

  clearFilters(event?: Event): void {
    this.selectedTipeTanaman = null;

    if (event?.currentTarget && typeof (event.currentTarget as HTMLElement).scrollIntoView === 'function') {
      (event.currentTarget as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }

  scrollFilterTrack(direction: 'left' | 'right'): void {
    if (!this.filterTrackRef?.nativeElement) return;
    const track = this.filterTrackRef.nativeElement;
    const scrollAmount = 260;
    track.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  onLihatSelengkapnya(title: string): void {
    console.log('Lihat selengkapnya untuk:', title);
  }
}
