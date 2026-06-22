import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

export interface BanjarDinas {
  name: string;
  /** Daftar komoditas/produk unggulan banjar ini */
  products: string[];
  /** Posisi label relatif terhadap peta, dalam persen (0-100) */
  top: number;
  /** Sisi tempat label ditampilkan terhadap garis tengah peta */
  side: 'left' | 'right';
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
  @Input() mapImageUrl: string = 'assets/images/peta-wilayah.png';

  @Input() scaleMiles: string = '1 mi';
  @Input() scaleKm: string = '2 km';

  /** Daftar banjar dinas dan komoditas unggulannya, default sesuai referensi peta */
  @Input() banjarList: BanjarDinas[] = [
    { name: 'Banjar Dinas Jempanang', products: ['Kopi Arabika', 'Alpukat'], top: 28, side: 'left' },
    { name: 'Banjar Dinas Bon', products: ['Anggrek', 'Sawi putih', 'Jeruk Siam Madu', 'Jeruk Brastagi'], top: 18, side: 'right' },
    { name: 'Banjar Dinas Sekarmukti', products: ['Bunga Gemitir', 'Gula Aren'], top: 42, side: 'left' },
    { name: 'Banjar Dinas Lawak', products: ['Kopi', 'Padi'], top: 38, side: 'right' },
    { name: 'Banjar Dinas Belok', products: ['Bayam Inggris', 'Timun Jepang'], top: 50, side: 'right' },
    { name: 'Banjar Dinas Selantang', products: ['Asparagus', 'Sayur Hortikultura'], top: 62, side: 'right' },
    { name: 'Banjar Dinas Sidan', products: ['Asparagus', 'Vanili', 'Kopi'], top: 68, side: 'left' },
    { name: 'Banjar Dinas Sidan Kawan', products: ['Asparagus', 'Jeruk Siam', 'Cabai'], top: 78, side: 'right' },
    { name: 'Banjar Dinas Penikit', products: ['Asparagus', 'Durian Musang King', 'Durian Kane', 'Padi'], top: 88, side: 'left' },
  ];
}
