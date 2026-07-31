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

  getAddressLink(): string {
    return 'https://share.google/WOzDfNk7hdhWCSa1j';
  }

  @Input() about: string =
    'Lahir dari sejarah penyatuan wilayah pada 1957, Desa Belok/Sidan kini bertransformasi menjadi dataran tinggi yang mengubah hamparan ladang asparagus premium menjadi penggerak utama ekonomi warga.';

  @Input() address: string = 'Kantor Perbekel Desa Belok Sidan, Kecamatan Petang, Kabupaten Badung';

  @Input() phone: string = '0361 844151';

  @Input() email: string = 'beloksidan@badungkab.go.id';

  /** Daftar tautan social media, default sesuai referensi desain */
  @Input() socialLinks: SocialLink[] = [
    { platform: 'instagram', url: 'https://www.instagram.com/beloksidan01/' },
    { platform: 'facebook', url: 'https://web.facebook.com/pages/Desa%20Belok-Sidan%20Kec.%20Petang/528585030968969/' },
    { platform: 'youtube', url: 'https://youtu.be/6uN8YUNKpCA?si=YGAaTR45H4oJP1iD' },
  ];

  @Input() copyrightText: string = 'Copyright © 2026 Pemerintah Kabupaten Badung. All rights reserved.';
}
