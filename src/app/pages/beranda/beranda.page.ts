import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-beranda-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.css']
})
export class BerandaPageComponent implements OnInit {
  heroLocation = 'Kecamatan Petang, Kabupaten Badung, Provinsi Bali';
  heroTitle = 'Desa Belok/Sidan';
  heroImages = Array.from({ length: 11 }, (_, index) => `assets/images/hero-img (${index + 1}).png`);

  // Signal dipakai (bukan variabel biasa) supaya perubahan di dalam setInterval
  // tetap otomatis memicu re-render di Angular versi zoneless (tanpa zone.js).
  activeHeroIndex = signal(0);

  private heroIntervalId: ReturnType<typeof setInterval> | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private destroyRef: DestroyRef
  ) {
    this.destroyRef.onDestroy(() => this.clearHeroTimers());
  }

  sejarahTitle = 'Sejarah Desa Belok/Sidan';
  sejarahParagraph1 = 'Pada zaman dahulu, terjadi pertempuran antara Kerajaan Pahyangan dan Kerajaan Buleleng. Karena Desa Lantang menjadi salah satu jalur lalu lintas menuju Kerajaan Pahyangan, banyak penduduknya yang mengungsi untuk menghindari dampak peperangan. Setelah pertempuran berakhir, sebagian penduduk kembali ke Desa Lantang, sementara sebagian lainnya memilih menetap di tempat pengungsian. Tempat tersebut kemudian dikenal dengan nama Kisidan, yang berarti pindahan, dan seiring waktu berubah menjadi Sidan.';
  sejarahParagraph2 = 'Pada awalnya, wilayah Belok/Sidan terdiri atas dua perbekel, yaitu Desa Sidan dan Desa Belok. Desa Sidan terdiri dari Banjar Sidan, Banjar Selantang, dan Banjar Penikit, sedangkan Desa Belok terdiri dari Banjar Belok, Banjar Lawak, Banjar Bon, Banjar Jempanang, dan Banjar Sekarmukti. Pada tahun 1957, kedua perbekel tersebut kemudian digabung menjadi satu wilayah yang dikenal sebagai Desa Belok/Sidan, dengan I Dewa Putu Ceped sebagai pemimpin pertama.';
  sejarahParagraph3 = 'Saat ini, Desa Belok/Sidan merupakan salah satu desa yang berada di Kecamatan Petang dengan luas wilayah sekitar 3.226 km², yang terdiri atas 6 desa adat dan 8 banjar dinas. Desa ini memiliki jumlah penduduk sebanyak 5.607 jiwa, terdiri dari 2.880 laki-laki dan 2.727 perempuan. Dengan kondisi wilayah dan sumber daya alam yang mendukung, sektor pertanian menjadi sektor utama yang menopang kehidupan masyarakat Desa Belok/Sidan, dengan berbagai komoditas pertanian yang menjadi potensi unggulan desa.';
  sejarahEmblemUrl = 'assets/images/lambang-belok-sidan.png';

  tunasTitle = 'Sang Tunas Hijau Dari Dataran Tinggi';
  tunasImageUrl = 'assets/images/produk-asparagus2.png';
  tunasParagraph1 = 'Asparagus merupakan salah satu produk unggulan Desa Belok/Sidan yang dikenal karena kualitas premium, cita rasa segar, dan budidaya yang terjaga dengan baik. Selain memiliki nilai ekonomi tinggi, asparagus juga merupakan sayuran fungsional yang kaya akan komponen bioaktif yang berperan sebagai antioksidan alami dan berpotensi memberikan berbagai manfaat bagi kesehatan.';
  tunasParagraph2 = 'Demi menjaga kualitasnya agar selalu juara, perawatannya menuntut presisi tinggi, termasuk penerapan inovasi sistem pengairan cerdas yang mampu menjaga kelembapan secara akurat.';

  keunggulanTitle = 'Keunggulan Asparagus';
  keunggulanItems = [
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
    }
  ];

  khasiatTitle = 'Khasiat Asparagus';
  khasiatItems = [
    {
      icon: 'antioksidan',
      title: 'Sumber Antioksidan',
      description: 'Polifenol dan flavonoid berperan sebagai antioksidan alami yang membantu melindungi sel tubuh dari kerusakan akibat radikal bebas.'
    },
    {
      icon: 'kolesterol',
      title: 'Menurunkan Kadar Kolesterol',
      description: 'Saponin yang terdapat pada asparagus dilaporkan memiliki potensi membantu menurunkan kadar kolesterol (hipokolesterolemik) serta memiliki aktivitas antitumor.'
    },
    {
      icon: 'usus',
      title: 'Mendukung Kesehatan Usus',
      description: 'Senyawa fenolik berpotensi mendukung kesehatan usus karena dapat dimetabolisme oleh mikrobiota usus menjadi senyawa yang bermanfaat bagi tubuh.'
    },
    {
      icon: 'neurodegeneratif',
      title: 'Melindungi dari Penyakit Neurodegeneratif',
      description: 'Asam kafeat memiliki aktivitas antioksidan yang dapat membantu menghambat peroksidasi lipid dan berpotensi memberikan efek protektif terhadap penyakit neurodegeneratif.'
    },
  ];

  kualitasTitle = 'Standar Kualitas';
  kualitasImageUrl = 'assets/images/produk-asparagus.png';
  kualitasPrice = 'RP.60.000 / KG';
  kualitasDescriptionBefore = 'Asparagus yang dihasilkan dari lahan pertanian Desa Belok/Sidan dikenal sebagai asparagus Grade A. Kualitas ini ditandai dengan batang yang lurus dan kokoh, warna hijau cerah yang seragam, serta ujung kuncup yang masih kencang dan segar.';
  kualitasHighlightWord = 'Grade A';
  kualitasDescriptionAfter = '';

  produkUnggulan = [
    {title: 'Asparagus',
    image: 'assets/images/produk-asparagus.png',
    link: '/produk/asparagus'},
    { title: 'Durian Musangking', image: 'assets/images/produk-durian.png', link: '/produk/durian-musangking' },
    { title: 'Kopi Arabika', image: 'assets/images/produk-kopi.png', link: '/produk/kopi-arabika' },
    { title: 'Bunga Gemitir', image: 'assets/images/produk-bunga-gemitir.png', link: '/produk/bunga-gemitir' },
  ];

  ngOnInit(): void {
    // Carousel hanya perlu berjalan di browser; saat SSR, window/timer tidak relevan
    // dan justru bisa menyisakan interval "hantu" di server kalau tetap dijalankan.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.heroIntervalId = setInterval(() => {
      this.activeHeroIndex.update(current => (current + 1) % this.heroImages.length);
    }, 5000);
  }

  private clearHeroTimers(): void {
    if (this.heroIntervalId !== null) {
      clearInterval(this.heroIntervalId);
      this.heroIntervalId = null;
    }
  }

  getHeroImageStyle(index: number): string {
    return `url("${this.heroImages[index]}")`;
  }

  onLihatDetail(produk: string): void {
    console.log('Lihat detail untuk:', produk);
  }
}
