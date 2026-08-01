import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

export interface BanjarDinas {
  name: string;
  /** Daftar komoditas/produk unggulan banjar ini */
  products: string[];
  /** Tautan ke lokasi banjar di Google Maps */
  mapsUrl: string;
  /** Posisi label relatif terhadap peta secara vertikal, dalam persen (0-100) */
  top: number;
  /** Sisi tempat label ditampilkan terhadap garis tengah peta */
  side: 'left' | 'right';
  /** Offset horizontal tambahan dalam piksel setelah posisi dasar berdasarkan side */
  offsetX?: number;
  /** Panjang garis konektor dari label menuju peta, dalam piksel */
  connectorLength?: number;
  /** Posisi vertikal garis konektor relatif ke atas label, dalam piksel */
  connectorTop?: number;
}

@Component({
  selector: 'app-peta-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './peta.page.html',
  styleUrl: './peta.page.css'
})
export class PetaPageComponent implements AfterViewInit, OnDestroy {
  /** Gambar peta wilayah desa, default placeholder */
  @Input() mapImageUrl: string = 'assets/images/peta-belok-sidan.png';

  /** Referensi ke bingkai peta, dipakai untuk mengukur lebar layar yang tersedia */
  @ViewChild('mapFrame') mapFrameRef?: ElementRef<HTMLDivElement>;

  /** Lebar rancangan asli peta (sama seperti versi web/desktop), dalam px */
  readonly mapDesignWidth = 760;

  /** Rasio tinggi:lebar gambar peta asli, dipakai supaya bingkai tidak "kosong" atau kepotong */
  readonly mapAspectRatio = 6260 / 4428;

  /** Skala saat ini (1 = ukuran penuh seperti di web) */
  mapScale = 1;

  /** Tinggi bingkai hasil perkalian tinggi asli dengan skala saat ini */
  mapFrameHeight = this.mapDesignWidth * this.mapAspectRatio;

  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    this.updateMapScale();

    if (typeof ResizeObserver !== 'undefined' && this.mapFrameRef) {
      this.resizeObserver = new ResizeObserver(() => this.updateMapScale());
      this.resizeObserver.observe(this.mapFrameRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateMapScale();
  }

  /**
   * Menghitung skala peta berdasarkan lebar bingkai yang tersedia dibanding lebar rancangan asli (760px).
   * Ini menjaga tata letak (posisi label, ukuran font, garis konektor) tetap identik dengan versi web,
   * hanya diperkecil secara proporsional agar pas di layar mobile.
   */
  private updateMapScale(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const frameEl = this.mapFrameRef?.nativeElement;
    const availableWidth = frameEl?.clientWidth || this.mapDesignWidth;

    const scale = Math.min(1, availableWidth / this.mapDesignWidth);
    this.mapScale = scale;
    this.mapFrameHeight = this.mapDesignWidth * this.mapAspectRatio * scale;
  }

  /** Daftar banjar dinas dan komoditas unggulannya, default sesuai referensi peta */
  @Input() banjarList: BanjarDinas[] = [
    {
      name: 'Banjar Dinas Jempanang',
      products: ['Kopi Arabika', 'Alpukat'],
      mapsUrl: 'https://maps.app.goo.gl/jwj5Dd14bLEZYH6W6',
      top: 15,
      side: 'left',
      offsetX: 190,
      connectorLength: 100,
      connectorTop: 15
    },
    {
      name: 'Banjar Dinas Bon',
      products: ['Anggrek', 'Sawi putih', 'Jeuk Siam Madu', 'Jeruk Brastagi'],
      mapsUrl: 'https://maps.app.goo.gl/Lo2TSkNQGH2sR63DA',
      top: 13,
      side: 'right',
      offsetX: 115,
      connectorLength: 125,
      connectorTop: 15
    },
    {
      name: 'Banjar Dinas Sekarmukti',
      products: ['Bunga Gemitir', 'Gula Aren'],
      mapsUrl: 'https://maps.app.goo.gl/BdXRwcR7S3NsVQcy9',
      top: 30,
      side: 'left',
      offsetX: 90,
      connectorLength: 50,
      connectorTop: 15
    },
    {
      name: 'Banjar Dinas Lawak',
      products: ['Kopi', 'Padi'],
      mapsUrl: 'https://maps.app.goo.gl/6UZtSYs941E4EJ737',
      top: 30,
      side: 'right',
      offsetX: 100,
      connectorLength: 50,
      connectorTop: 15
    },
    {
      name: 'Banjar Dinas Belok',
      products: ['Bayam Inggris', 'Timun Jepang'],
      mapsUrl: 'https://maps.app.goo.gl/EgcrEXpZdCzvimTw5',
      top: 43,
      side: 'right',
      offsetX: 70,
      connectorLength: 50,
      connectorTop: 15
    },
    {
      name: 'Banjar Dinas Selantang',
      products: ['Asparagus', 'Sayur Hortikultura'],
      mapsUrl: 'https://maps.app.goo.gl/CWEJx43FXWs7dtFK7',
      top: 49,
      side: 'left',
      offsetX: 30,
      connectorLength: 60,
      connectorTop: 15
    },
    {
      name: 'Banjar Dinas Sidan',
      products: ['Asparagus', 'Vanili', 'Kopi'],
      mapsUrl: 'https://maps.app.goo.gl/F1N5B2D4nSYzrzbdA',
      top: 60,
      side: 'left',
      offsetX: 45,
      connectorLength: 90,
      connectorTop: 15
    },
    {
      name: 'Banjar Dinas Sidan Kawan',
      products: ['Asparagus', 'Jeruk Siam', 'Cabai'],
      mapsUrl: 'https://maps.app.goo.gl/mpnB512zKmJ4sszJ6',
      top: 78,
      side: 'right',
      offsetX: 100,
      connectorLength: 70,
      connectorTop: 15
    },
    {
      name: 'Banjar Dinas Penikit',
      products: ['Asparagus', 'Durian Musang King', 'Durian Kane', 'Padi'],
      mapsUrl: 'https://maps.app.goo.gl/KPfakxK5rjAa44QY9',
      top: 85,
      side: 'left',
      offsetX: 40,
      connectorLength: 50,
      connectorTop: 15
    },
  ];
}
