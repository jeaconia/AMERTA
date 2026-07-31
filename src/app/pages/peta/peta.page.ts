import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

export interface BanjarDinas {
  name: string;
  /** Daftar komoditas/produk unggulan banjar ini */
  products: string[];
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
    { name: 'Banjar Dinas Jempanang', products: ['Kopi Arabika', 'Alpukat'], top: 15, side: 'left', offsetX: 180, connectorLength: 100, connectorTop: 15 },
    { name: 'Banjar Dinas Bon', products: ['Anggrek', 'Sawi putih', 'Jeuk Siam Madu', 'Jeruk Brastagi'], top: 13, side: 'right', offsetX: 115, connectorLength: 125, connectorTop: 15 },
    { name: 'Banjar Dinas Sekarmukti', products: ['Bunga Gemitir', 'Gula Aren'], top: 30, side: 'left', offsetX: 90, connectorLength: 50, connectorTop: 15 },
    { name: 'Banjar Dinas Lawak', products: ['Kopi', 'Padi'], top: 30, side: 'right', offsetX: 100, connectorLength: 50, connectorTop: 15 },
    { name: 'Banjar Dinas Belok', products: ['Bayam Inggris', 'Timun Jepang'], top: 43, side: 'right', offsetX: 70, connectorLength: 50, connectorTop: 15 },
    { name: 'Banjar Dinas Selantang', products: ['Asparagus', 'Sayur Hortikultura'], top: 49, side: 'left', offsetX: 30, connectorLength: 60, connectorTop: 15 },
    { name: 'Banjar Dinas Sidan', products: ['Asparagus', 'Vanili', 'Kopi'], top: 60, side: 'left', offsetX: 45, connectorLength: 90, connectorTop: 15 },
    { name: 'Banjar Dinas Sidan Kawan', products: ['Asparagus', 'Jeruk Siam', 'Cabai'], top: 78, side: 'right', offsetX: 100, connectorLength: 70, connectorTop: 15 },
    { name: 'Banjar Dinas Penikit', products: ['Asparagus', 'Durian Musang King', 'Durian Kane', 'Padi'], top: 85, side: 'left', offsetX: 40, connectorLength: 50, connectorTop: 15 },
  ];
}
