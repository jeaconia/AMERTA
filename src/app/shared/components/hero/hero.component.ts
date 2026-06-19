import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  /** Gambar latar belakang hero, default placeholder pegunungan */
  @Input() backgroundUrl: string = 'assets/images/background.png';

  /** Teks lokasi kecil di atas judul */
  @Input() location: string = 'Kecamatan Petang, Kabupaten Badung, Provinsi Bali';

  /** Judul besar desa */
  @Input() villageName: string = 'Desa Belok/Sidan';
}
