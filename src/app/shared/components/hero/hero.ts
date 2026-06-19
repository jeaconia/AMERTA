import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  /** Gambar latar belakang hero, default placeholder pegunungan */
  @Input() backgroundUrl: string = 'assets/images/background.png';

  /** Teks lokasi kecil di atas judul */
  @Input() location: string = 'Kecamatan Petang, Kabupaten Badung, Provinsi Bali';

  /** Judul besar desa */
  @Input() villageName: string = 'Desa Belok/Sidan';
}
