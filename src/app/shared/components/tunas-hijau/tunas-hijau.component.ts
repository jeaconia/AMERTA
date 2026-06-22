import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tunas-hijau',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tunas-hijau.component.html',
  styleUrl: './tunas-hijau.component.css'
})
export class TunasHijauComponent {
  @Input() title: string = 'Sang Tunas Hijau Dari Dataran Tinggi';

  /** Gambar ikatan asparagus segar, default placeholder */
  @Input() imageUrl: string = 'assets/images/produk-asparagus2.png';

  @Input() paragraph1: string =
    'Di balik sejuknya dataran tinggi Bali, Desa Belok/Sidan menyimpan primadona kebanggaan berupa hamparan ladang Asparagus yang subur. Tanaman premium ini bukan sekadar hasil panen biasa, melainkan urat nadi penggerak ekonomi masyarakat setempat.';

  @Input() paragraph2: string =
    'Demi menjaga kualitasnya agar selalu juara, perawatannya menuntut presisi tinggi, termasuk penerapan inovasi sistem pengairan cerdas yang mampu menjaga kelembapan secara akurat.';
}
