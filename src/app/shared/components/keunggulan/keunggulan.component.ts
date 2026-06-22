import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface KeunggulanItem {
  /** Nama ikon, dipakai untuk memilih SVG yang sesuai di template */
  icon: 'budidaya' | 'kualitas' | 'dataran';
  title: string;
  description: string;
}

@Component({
  selector: 'app-keunggulan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keunggulan.component.html',
  styleUrl: './keunggulan.component.css'
})
export class KeunggulanComponent {
  @Input() title: string = 'Keunggulan Asparagus';

  /** Daftar keunggulan, default sesuai referensi desain */
  @Input() items: KeunggulanItem[] = [
    {
      icon: 'budidaya',
      title: 'Budidaya oleh Petani Lokal',
      description: 'Dibudidayakan langsung oleh petani desa berpengalaman.'
    },
    {
      icon: 'kualitas',
      title: 'Kualitas Segar',
      description: 'Dipanen rutin untuk menjaga kesegaran dan kualitas.'
    },
    {
      icon: 'dataran',
      title: 'Tumbuh di Dataran Tinggi',
      description: 'Dataran tinggi yang sejuk dan tanah subur menghasilkan asparagus berkualitas.'
    },
  ];
}
