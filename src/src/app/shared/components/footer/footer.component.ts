import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SocialLink {
  /** Nama platform, dipakai untuk memilih ikon SVG yang sesuai */
  platform: 'instagram' | 'facebook' | 'youtube' | 'twitter';
  url: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() villageName: string = 'Desa Belok/Sidan';

  @Input() about: string =
    'Lahir dari sejarah penyatuan wilayah pada 1957, Desa Belok/Sidan kini bertransformasi menjadi dataran tinggi yang mengubah hamparan ladang asparagus premium menjadi penggerak utama ekonomi warga.';

  @Input() address: string = 'Kantor Perbekel Desa Belok Sidan, Kecamatan Petang, Kabupaten Badung';

  @Input() phone: string = '0361 844151';

  @Input() email: string = 'beloksidan@badungkab.go.id';

  /** Daftar tautan social media, default sesuai referensi desain */
  @Input() socialLinks: SocialLink[] = [
    { platform: 'instagram', url: '#' },
    { platform: 'facebook', url: '#' },
    { platform: 'youtube', url: '#' },
    { platform: 'twitter', url: '#' },
  ];

  @Input() copyrightText: string = 'Copyright © 2026 Pemerintah Kabupaten Badung. All rights reserved.';
}
