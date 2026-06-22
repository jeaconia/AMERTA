import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface KhasiatItem {
  /** Nama ikon, dipakai untuk memilih SVG yang sesuai di template */
  icon: 'nutrisi' | 'antioksidan' | 'jantung' | 'pencernaan';
  title: string;
  description: string;
}

@Component({
  selector: 'app-khasiat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './khasiat.component.html',
  styleUrl: './khasiat.component.css'
})
export class KhasiatComponent {
  @Input() title: string = 'Khasiat Asparagus';

  /** Daftar khasiat, default sesuai referensi desain */
  @Input() items: KhasiatItem[] = [
    {
      icon: 'nutrisi',
      title: 'Kaya Nutrisi',
      description: 'Mengandung vitamin A, C, E, dan K yang baik untuk tubuh.'
    },
    {
      icon: 'antioksidan',
      title: 'Sumber Antioksidan',
      description: 'Membantu melindungi tubuh dari radikal bebas.'
    },
    {
      icon: 'jantung',
      title: 'Baik untuk Kesehatan Jantung',
      description: 'Mendukung kesehatan jantung.'
    },
    {
      icon: 'pencernaan',
      title: 'Mendukung Sistem Pencernaan',
      description: 'Serat alami membantu melancarkan pencernaan.'
    },
  ];
}
