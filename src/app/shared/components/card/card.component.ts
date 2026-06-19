import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  /** URL gambar produk, misal 'assets/images/produk-asparagus.png' */
  @Input() imageUrl: string = '';

  /** Judul kartu, misal 'Asparagus' */
  @Input() title: string = '';

  /** Deskripsi singkat (opsional) */
  @Input() description: string = '';

  /** Jika true, tampilkan border alih-alih shadow */
  @Input() bordered: boolean = false;
}
