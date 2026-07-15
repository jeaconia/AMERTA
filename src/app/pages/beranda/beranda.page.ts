import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-beranda-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, NavbarComponent, FooterComponent],
  templateUrl: './beranda.page.html',
  styleUrl: './beranda.page.css'
})
export class BerandaPageComponent {
  heroBackgroundUrl = 'assets/images/background.png';
  heroLocation = 'Kecamatan Petang, Kabupaten Badung, Provinsi Bali';
  heroTitle = 'Desa Belok/Sidan';

  sejarahTitle = 'Sejarah Desa Belok/Sidan';
  sejarahParagraph1 = 'Lahir dari jejak epik perang Kerajaan Pahyangan dan Buleleng, Desa Belok/Sidan bermula dari "Kisidan" atau tempat pindahan para pengungsi yang mencari kedamaian.';
  sejarahParagraph2 = 'Setelah resmi dilebur pada tahun 1957, sejarah tangguh Belok/Sidan kini berpadu dengan suburnya alam mereka. Dataran tinggi ini sukses menjadi rumah bagi asparagus premium yang menjadi primadona penggerak ekonomi warga.';
  sejarahEmblemUrl = 'assets/images/lambang-belok-sidan.png';

  tunasTitle = 'Sang Tunas Hijau Dari Dataran Tinggi';
  tunasImageUrl = 'assets/images/produk-asparagus2.png';
  tunasParagraph1 = 'Di balik sejuknya dataran tinggi Bali, Desa Belok/Sidan menyimpan primadona kebanggaan berupa hamparan ladang Asparagus yang subur. Tanaman premium ini bukan sekadar hasil panen biasa, melainkan urat nadi penggerak ekonomi masyarakat setempat.';
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
    }
  ];

  kualitasTitle = 'Standar Kualitas';
  kualitasImageUrl = 'assets/images/produk-asparagus.png';
  kualitasPrice = 'RP.60.000 / KG';
  kualitasDescriptionBefore = 'Asparagus yang dihasilkan dari lahan pertanian Desa Belok/Sidan dikenal sebagai asparagus Grade A. Kualitas ini ditandai dengan batang yang lurus dan kokoh, warna hijau cerah yang seragam, serta ujung kuncup yang masih kencang dan segar.';
  kualitasHighlightWord = 'Grade A';
  kualitasDescriptionAfter = '';

  produkUnggulan = [
    {
      title: 'Asparagus',
      image: 'assets/images/produk-asparagus.png',
      description: 'Grade A, dibudidayakan langsung oleh petani lokal.'
    },
    {
      title: 'Durian Musangking',
      image: 'assets/images/produk-durian.png',
      description: 'Hasil panen dataran tinggi Belok/Sidan.'
    },
    {
      title: 'Kopi Arabika',
      image: 'assets/images/produk-kopi.png',
      description: 'Ditanam di Banjar Dinas Jempanang dan Lawak.'
    }
  ];

  onLihatDetail(produk: string): void {
    console.log('Lihat detail untuk:', produk);
  }
}
