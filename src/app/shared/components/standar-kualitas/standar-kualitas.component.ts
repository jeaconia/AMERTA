import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standar-kualitas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standar-kualitas.component.html',
  styleUrl: './standar-kualitas.component.css'
})
export class StandarKualitasComponent {
  @Input() title: string = 'Standar Kualitas';

  /** Gambar asparagus close-up, default placeholder */
  @Input() imageUrl: string = 'assets/images/produk-asparagus2.png';

  /** Harga per kilogram, ditampilkan di dalam badge */
  @Input() price: string = 'Rp.60.000 / Kg';

  /** Teks sebelum kata yang ditebalkan */
  @Input() descriptionBefore: string =
    'Asparagus yang dihasilkan dari lahan pertanian Desa Belok/Sidan dikenal sebagai asparagus';

  /** Kata yang ditebalkan di tengah deskripsi, mis. "Grade A" */
  @Input() highlightWord: string = 'Grade A';

  /** Teks setelah kata yang ditebalkan */
  @Input() descriptionAfter: string =
    '. Kualitas ini ditandai dengan batang yang lurus dan kokoh, warna hijau cerah yang seragam, serta ujung kuncup yang masih kencang dan segar.';
}
