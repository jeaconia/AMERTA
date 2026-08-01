import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class BerandaPageComponent implements OnInit, OnDestroy {
  heroLocation = 'Kecamatan Petang, Kabupaten Badung, Provinsi Bali';
  heroTitle = 'Desa Belok/Sidan';
  heroImages = Array.from({ length: 11 }, (_, index) => `assets/images/hero-img (${index + 1}).png`);
  activeHeroIndex = 0;
  nextHeroIndex = 1;
  isHeroFading = false;
  private heroIntervalId: number | null = null;

  sejarahTitle = 'Sejarah Desa Belok/Sidan';
  sejarahParagraph1 = 'Pada zaman dahulu, Pulau Bali memiliki beberapa kerajaan yang cukup besar. Salah dua dari kerajaan tersebut adalah kerajaan Pahyangan dan kerajaan Buleleng. Suatu ketika, pecah pertempuran antara kerajaan Pahyangan dengan kerajaan Buleleng. Pada saat itu, penduduk Desa Lantang banyak yang melarikan diri karena desanya merupakan lalu lintas penyeberangan ke kerajaan Pahyangan sehingga dilalui pasukan kerajaan Buleleng.';
  sejarahParagraph2 = 'Setelah pertempuran berakhir, beberapa penduduk Desa Lantang kembali ke desanya dan sebagian lagi memilih untuk tetap tinggal di tempat pengungsian itu. Desa tempat sebagian penduduk mengungsi tersebut pada akhirnya diberi nama Kisidan, yang berarti pindahan. Dari istilah tersebut, terjadilah perubahan dari Kisidan menjadi Sidan yang pada akhirnya menjadi nama sebuah desa.';
  sejarahParagraph3 = 'Belok/Sidan dulunya merupakan dua perbekalan, yakni Sidan dan Belok. Desa Sidan terdiri dari tiga banjar yaitu Banjar Sidan, Banjar Selantang dan Banjar Penikit. Sedangkan Desa Belok terdiri dari Banjar Belok, Banjar Lawak, Banjar Bon, Banjar Jempanang dan Banjar Sekarmukti. Akhirnya, pada tahun 1957, kedua perbekel tersebut dijadikan satu menjadi Desa Belok/Sidan yang pada saat itu dipimpin I Dewa Putu Ceped.';
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
    { title: 'Bunga Gumitir', image: 'assets/images/produk-bunga-gumitir.png', link: '/produk/bunga-gumitir' },
  ];

  ngOnInit(): void {
    this.heroIntervalId = window.setInterval(() => {
      this.isHeroFading = true;
      this.nextHeroIndex = (this.activeHeroIndex + 1) % this.heroImages.length;

      window.setTimeout(() => {
        this.activeHeroIndex = this.nextHeroIndex;
        this.nextHeroIndex = (this.activeHeroIndex + 1) % this.heroImages.length;
        this.isHeroFading = false;
      }, 700);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.heroIntervalId !== null) {
      window.clearInterval(this.heroIntervalId);
    }
  }

  getHeroImageStyle(index: number): string {
    return `url("${this.heroImages[index]}")`;
  }

  onLihatDetail(produk: string): void {
    console.log('Lihat detail untuk:', produk);
  }
}
