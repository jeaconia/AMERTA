import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

export interface ProdukDetailData {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  highlights: string[];
}

@Component({
  selector: 'app-produk-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './produk-detail.page.html',
  styleUrls: ['./produk-detail.page.css']
})
export class ProdukDetailPageComponent implements OnInit {
  detail!: ProdukDetailData;

  produkDetails: ProdukDetailData[] = [
    {
      slug: 'asparagus',
      title: 'Asparagus',
      subtitle: 'Sang Tunas Hijau Dari Dataran Tinggi',
      image: 'assets/images/produk-asparagus2.png',
      description: 'Asparagus merupakan salah satu produk unggulan Desa Belok/Sidan yang dikenal karena kualitas premium, cita rasa segar, dan budidaya yang terjaga dengan baik. Selain memiliki nilai ekonomi tinggi, asparagus juga merupakan sayuran fungsional yang kaya akan komponen bioaktif yang berperan sebagai antioksidan alami dan berpotensi memberikan berbagai manfaat bagi kesehatan.',
      highlights: [
        'Ditanam di dataran tinggi yang sejuk',
        'Dipanen dengan standar kualitas premium',
        'Menjadi sumber ekonomi utama masyarakat lokal'
      ]
    },
    {
      slug: 'durian-musangking',
      title: 'Durian Musangking',
      subtitle: 'Kelezatan khas dataran tinggi Belok/Sidan',
      image: 'assets/images/produk-durian.png',
      description: 'Durian Musangking menjadi primadona karena aroma khasnya yang kuat, daging tebal, dan cita rasa yang lezat.',
      highlights: [
        'Diolah dan dipanen dengan standar kebersihan ketat',
        'Bisa menjadi pilihan produk premium untuk wisata kuliner',
        'Mewakili kekayaan hasil bumi desa'
      ]
    },
    {
      slug: 'kopi-arabika',
      title: 'Kopi Arabika',
      subtitle: 'Rasa khas dari lereng tinggi Belok/Sidan',
      image: 'assets/images/produk-kopi.png',
      description: 'Kopi Arabika yang tumbuh di kawasan dataran tinggi menghasilkan citarasa lembut dengan aroma yang khas.',
      highlights: [
        'Tumbuh di lahan pegunungan yang cocok untuk kopi',
        'Rasa halus dan aroma menarik',
        'Mendukung ekonomi petani lokal'
      ]
    },
    {
      slug: 'bunga-gumitir',
      title: 'Bunga Gumitir',
      subtitle: 'Pesona alam yang menjadi kebanggaan desa',
      image: 'assets/images/produk-bunga-gumitir.png',
      description: 'Bunga Gumitir hadir sebagai produk alam yang menawan dan sering dijadikan simbol keindahan lingkungan Desa Belok/Sidan.',
      highlights: [
        'Menonjolkan identitas budaya dan alam desa',
        'Memiliki nilai estetika yang tinggi',
        'Dapat dikembangkan sebagai produk wisata dan kerajinan'
      ]
    },
    {
      slug: 'vanili',
      title: 'Vanili',
      subtitle: 'Produk rempah khas yang unggul dan bernilai',
      image: 'assets/images/produk-vanili.png',
      description: 'Vanili menjadi produk unggulan bernilai tinggi yang satu per satu terus dikembangkan di wilayah pedesaan.',
      highlights: [
        'Memiliki nilai ekonomi yang signifikan',
        'Cocok untuk pengembangan produk olahan',
        'Mendukung diversifikasi hasil pertanian desa'
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? 'asparagus';
    this.detail = this.produkDetails.find((item) => item.slug === slug) ?? this.produkDetails[0];
  }
}
