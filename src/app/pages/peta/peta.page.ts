import { Component, Input } from '@angular/core';
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
export class PetaPageComponent {
  /** Gambar peta wilayah desa, default placeholder */
  @Input() mapImageUrl: string = 'assets/images/peta-belok-sidan.png';

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
