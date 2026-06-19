import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sejarah',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sejarah.html',
  styleUrl: './sejarah.css'
})
export class Sejarah {
  @Input() title: string = 'Sejarah Desa Belok/Sidan';

  @Input() paragraph1: string =
    'Lahir dari jejak epik perang Kerajaan Pahyangan dan Buleleng, Desa Belok/Sidan bermula dari "Kisidan" atau tempat pindahan para pengungsi yang mencari kedamaian.';

  @Input() paragraph2: string =
    'Setelah resmi dilebur pada tahun 1957, sejarah tangguh Belok/Sidan kini berpadu dengan suburnya alam mereka. Dataran tinggi ini sukses menjadi rumah bagi asparagus premium yang menjadi primadona penggerak ekonomi warga.';

  /** Lambang/logo desa, default placeholder */
  @Input() emblemUrl: string = 'images/lambang-desa.png';
}
