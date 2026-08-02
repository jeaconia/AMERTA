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
      slug: 'bunga-gemitir',
      title: 'Bunga Gemitir',
      subtitle: 'Pesona alam yang menjadi kebanggaan desa',
      image: 'assets/images/produk-bunga-gemitir.png',
      description: 'Bunga Gemitir hadir sebagai produk alam yang menawan dan sering dijadikan simbol keindahan lingkungan Desa Belok/Sidan.',
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
    },
    {
      slug: 'alpukat',
      title: 'Alpukat',
      subtitle: 'Buah hijau yang kaya nutrisi dan tekstur lembut',
      image: 'assets/images/produk-alpukat.png',
      description: 'Alpukat Desa Belok/Sidan dipanen matang sempurna, menawarkan tekstur lembut dan cita rasa yang kaya untuk konsumsi segar maupun olahan.',
      highlights: [
        'Kaya vitamin dan lemak sehat',
        'Cocok untuk jus, salad, dan paté',
        'Produk buah lokal dengan permintaan tinggi'
      ]
    },
    {
      slug: 'bayam-inggris',
      title: 'Bayam Inggris',
      subtitle: 'Buah beri kecil dengan rasa asam-manis khas',
      image: 'assets/images/produk-bayam inggris.png',
      description: 'Bayam Inggris menjadi salah satu produk hortikultura unggulan yang memberikan variasi buah segar dengan kandungan antioksidan tinggi.',
      highlights: [
        'Sumber vitamin C alami',
        'Baik untuk olahan minuman dan selai',
        'Diproduksi oleh petani lokal yang terampil'
      ]
    },
    {
      slug: 'bunga-anggrek',
      title: 'Bunga Anggrek',
      subtitle: 'Keindahan bunga anggrek yang elegan dan eksotis',
      image: 'assets/images/produk-bunga anggrek.png',
      description: 'Bunga Anggrek di Desa Belok/Sidan menambah nilai estetika dan menjadi pilihan tanaman hias premium untuk pasar lokal dan pariwisata.',
      highlights: [
        'Bentuk dan warna yang menawan',
        'Tumbuh baik di dataran tinggi',
        'Cocok untuk dekorasi dan hadiah'
      ]
    },
    {
      slug: 'cabai',
      title: 'Cabai',
      subtitle: 'Cabai segar dengan warna cerah dan rasa pedas khas',
      image: 'assets/images/produk-cabai.png',
      description: 'Cabai lokal Desa Belok/Sidan dipilih dari panen terbaik, memberikan rasa pedas segar untuk konsumsi sehari-hari dan bumbu masak tradisional.',
      highlights: [
        'Dipanen secara selektif',
        'Aroma pedas tajam dan segar',
        'Komoditas penting untuk pasar lokal'
      ]
    },
    {
      slug: 'gula-aren',
      title: 'Gula Aren',
      subtitle: 'Gula tradisional dengan rasa manis alami dan aroma khas',
      image: 'assets/images/produk-gula aren.png',
      description: 'Gula Aren diolah menggunakan metode tradisional, menjadikannya pilihan manis alami yang bernilai budaya dan gizi.' ,
      highlights: [
        'Tidak menggunakan bahan kimia',
        'Aroma wangi khas aren',
        'Alternatif gula alami yang populer'
      ]
    },
    {
      slug: 'jeruk-brastagi',
      title: 'Jeruk Brastagi',
      subtitle: 'Jeruk segar dari varietas premium dataran tinggi',
      image: 'assets/images/produk-jeruk brastagi.png',
      description: 'Jeruk Brastagi menawarkan rasa segar dan manis-kecut seimbang, cocok untuk konsumsi segar atau minuman sehat.',
      highlights: [
        'Ditanam di iklim pegunungan yang sejuk',
        'Buah tebal dan berair',
        'Sumber vitamin C lokal'
      ]
    },
    {
      slug: 'jeruk-siam-madu',
      title: 'Jeruk Siam Madu',
      subtitle: 'Jeruk manis unik dengan aroma harum khas',
      image: 'assets/images/produk-jeruk siam madu.png',
      description: 'Jeruk Siam Madu memadukan rasa manis dan aroma wangi, ideal sebagai buah segar dan bahan minuman sehat.' ,
      highlights: [
        'Rasa manis alami',
        'Aroma buah yang kuat',
        'Cocok untuk pasar premium'
      ]
    },
    {
      slug: 'padi',
      title: 'Padi',
      subtitle: 'Komoditas pokok hasil pertanian lokal',
      image: 'assets/images/produk-padi.png',
      description: 'Padi Desa Belok/Sidan dihasilkan dari lahan pertanian subur dengan praktik bercocok tanam yang mendukung ketahanan pangan lokal.',
      highlights: [
        'Diproduksi oleh petani setempat',
        'Menjadi sumber pangan utama masyarakat desa',
        'Berperan dalam kedaulatan pangan'
      ]
    },
    {
      slug: 'sawi-putih',
      title: 'Sawi Putih',
      subtitle: 'Sayuran hijau renyah dan segar untuk menu sehat',
      image: 'assets/images/produk-sawi putih.png',
      description: 'Chinese cabbage (sawi putih) merupakan salah satu sayuran yang kaya akan berbagai zat gizi penting dan banyak dikonsumsi sebagai sumber nutrisi sehari-hari. Berdasarkan penelitian Horticulturae (2023), sawi putih mengandung vitamin, mineral, gula alami, serat, protein, serta asam amino yang berperan dalam mendukung kesehatan tubuh. Kandungan nutrisi tersebut menjadikan sawi putih sebagai salah satu sayuran yang memiliki nilai gizi tinggi dan baik untuk dikonsumsi secara rutin.',
      highlights: [
        'Tekstur renyah dan warna cerah',
        'Sumber serat dan vitamin',
        'Tumbuh baik di dataran tinggi'
      ]
    },
    {
      slug: 'sayur-hortikultura',
      title: 'Sayur Hortikultura',
      subtitle: 'Beragam sayuran hortikultura berkualitas lokal',
      image: 'assets/images/produk-sayur hortikultura.png',
      description: 'Sayur Hortikultura mencakup berbagai jenis sayuran segar yang ditanam dengan standar kualitas untuk pasar lokal dan wisata kuliner.',
      highlights: [
        'Hasil panen bervariasi',
        'Segar langsung dari pertanian',
        'Mendukung pola makan sehat'
      ]
    },
    {
      slug: 'timun-jepang',
      title: 'Timun Jepang',
      subtitle: 'Timun segar dengan tekstur renyah khas Jepang',
      image: 'assets/images/produk-timun jepang.png',
      description: 'Timun Jepang lokal menawarkan kesegaran dan kerenyahan yang cocok untuk salad maupun sajian kuliner pedesaan.' ,
      highlights: [
        'Tekstur renyah dan segar',
        'Pilihan sehat untuk menu harian',
        'Bernilai tinggi sebagai produk hortikultura'
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? 'asparagus';
    this.detail = this.produkDetails.find((item) => item.slug === slug) ?? this.produkDetails[0];
  }
}
