import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PRODUK_LIST, TIPE_TANAMAN_LABELS, BANJAR_LABELS } from '../produk/produk.page';

export interface ProdukNutrisiItem {
  icon?: string;
  title: string;
  description: string;
}

export interface ProdukHighlightItem {
  icon?: string;
  title: string;
  description: string;
}

export interface ProdukFarmDetail {
  title?: string;
  hectares: string;
  distribution: string;
  soilClimate: string;
}

export interface ProdukFarmInfo {
  hectares?: string;
  distribution?: string;
  soilClimate?: string;
  largeChili?: ProdukFarmDetail;
  birdEyeChili?: ProdukFarmDetail;
}

export interface ProdukVarietyAttribute {
  label: string;
  value: string;
}

export interface ProdukVarietyItem {
  name: string;
  tagline?: string;
  attributes: ProdukVarietyAttribute[];
}

export interface ProdukVarietyComparison {
  /** Judul section, mis. "Kopi Arabika vs Kopi Robusta" */
  title: string;
  /** Kalimat pengantar singkat tentang perbandingan jenis */
  description?: string;
  variants: ProdukVarietyItem[];
}

export interface ProdukDetailData {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  shortDescription?: string;
  nutritionItems?: ProdukNutrisiItem[];
  farmInfo?: ProdukFarmInfo;
  /** Perbandingan jenis/varietas dari hasil bumi yang sama (mis. Kopi Arabika vs Kopi Robusta) */
  varietyComparison?: ProdukVarietyComparison;
  /** Boleh berupa teks polos, atau objek { title, description, icon } seperti pada section "Keunggulan" di Beranda */
  highlights: (string | ProdukHighlightItem)[];
}

/** Pemetaan kunci ikon (dipakai bersama dengan halaman Beranda) ke ikon Font Awesome */
const ICON_MAP: Record<string, string> = {
  budidaya: 'fa-users',
  kualitas: 'fa-leaf',
  dataran: 'fa-mountain-city',
  antioksidan: 'fa-shield-heart',
  kolesterol: 'fa-heart-pulse',
  usus: 'fa-bacteria',
  neurodegeneratif: 'fa-bolt'
};

export interface ProdukBadge {
  label: string;
  type: 'tipe' | 'banjar';
}

@Component({
  selector: 'app-produk-detail-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './produk-detail.page.html',
  styleUrls: ['./produk-detail.page.css']
})
export class ProdukDetailPageComponent implements OnInit {
  detail!: ProdukDetailData;
  badges: ProdukBadge[] = [];
  activeVariantIndex: number = 0;
  varietyViewMode: 'slider' | 'side-by-side' = 'slider';

  /** Ikon fallback untuk kartu "Keunggulan" bila item tidak punya kunci ikon sendiri */
  readonly highlightIcons: string[] = ['fa-seedling', 'fa-leaf', 'fa-mountain-sun', 'fa-award', 'fa-hand-holding-heart', 'fa-sun'];

  /** Ikon fallback untuk kartu "Khasiat" bila item tidak punya kunci ikon sendiri */
  readonly nutritionIcons: string[] = ['fa-leaf', 'fa-atom', 'fa-heart-pulse', 'fa-shield-heart', 'fa-brain', 'fa-wheat-awn'];

  produkDetails: ProdukDetailData[] = [
    {
      slug: 'asparagus',
      title: 'Asparagus',
      subtitle: 'Sang Tunas Hijau Dari Dataran Tinggi',
      image: 'assets/images/produk-asparagus2.png',
      description: 'Asparagus merupakan salah satu produk unggulan Desa Belok/Sidan yang dikenal karena kualitas premium, cita rasa segar, dan budidaya yang terjaga dengan baik. Selain memiliki nilai ekonomi tinggi, asparagus juga merupakan sayuran fungsional yang kaya akan komponen bioaktif yang berperan sebagai antioksidan alami dan berpotensi memberikan berbagai manfaat bagi kesehatan.',
      shortDescription: 'Asparagus adalah sayuran premium hasil pertanian dataran tinggi yang memiliki batang kuat, warna hijau cerah, dan rasa segar khas. Tanaman ini tidak hanya digemari sebagai bahan masakan, tetapi juga dihargai karena kandungan gizinya yang tinggi dan proses budidaya yang terjaga kualitasnya.',
      nutritionItems: [
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
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 120 hektar lahan pertanian aktif dikelola untuk budidaya asparagus di wilayah dataran tinggi Desa Belok/Sidan.',
        distribution: 'Sebaran budidaya tersebar di beberapa dusun dan kawasan pertanian dataran tinggi di Kecamatan Petang, dengan fokus pada area yang memiliki suhu sejuk dan tingkat kelembapan stabil.',
        soilClimate: 'Tanah umumnya bersifat subur dengan tekstur yang baik untuk akar tanaman, sementara iklim dingin, curah hujan cukup, dan ketinggian lokasi mendukung pertumbuhan asparagus yang kuat dan berkualitas.'
      },
      varietyComparison: {
        title: 'Asparagus Hijau vs Asparagus Putih',
        description: 'Kedua jenis asparagus ini berasal dari tanaman yang sama, namun cara budidayanya membuat rasa, tekstur, dan tampilannya berbeda.',
        variants: [
          {
            name: 'Asparagus Hijau',
            attributes: [
              { label: 'Rasa', value: 'Renyah dengan sedikit rasa pahit yang segar' },
              { label: 'Aroma', value: 'Aroma rumput yang khas dan cukup tajam' },
              { label: 'Bentuk & Tekstur', value: 'Batang ramping, kulit tipis, tekstur renyah' },
              { label: 'Warna', value: 'Hijau cerah karena tumbuh terpapar sinar matahari' }
            ]
          },
          {
            name: 'Asparagus Putih',
            attributes: [
              { label: 'Rasa', value: 'Lebih lembut dan manis, hampir tanpa rasa pahit' },
              { label: 'Aroma', value: 'Aroma lebih halus dan ringan' },
              { label: 'Bentuk & Tekstur', value: 'Batang lebih gemuk dengan tekstur lebih empuk' },
              { label: 'Warna', value: 'Putih pucat karena ditimbun tanah selama tumbuh (etiolasi)' }
            ]
          }
        ]
      },
      highlights: [
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
      ]
    },
    {
      slug: 'durian',

      title: 'Durian',

      subtitle: 'Buah tropis khas Belok/Sidan dengan beragam varietas',

      image: 'assets/images/produk-durian.png',

      description: 'Durian merupakan salah satu komoditas buah yang mulai diminati untuk dibudidayakan di Desa Belok/Sidan. Potensi durian terutama terdapat di Banjar Selantang. Beberapa jenis durian yang terdapat di wilayah Belok/Sidan antara lain Durian Black Thorn, Durian Kane, Durian Musang King, dan durian lokal.',

      shortDescription: 'Durian Kane menjadi salah satu varietas yang lebih populer di Belok/Sidan karena dinilai dapat tumbuh relatif stabil pada berbagai kondisi ketinggian di wilayah tersebut. Selain Durian Kane, terdapat pula Durian Black Thorn, Durian Musang King yang relatif baru masuk, serta berbagai durian lokal yang dibudidayakan oleh masyarakat.',

      nutritionItems: [
        {
          title: 'Sumber Energi',
          description: 'Durian mengandung karbohidrat dan gula alami yang dapat menjadi sumber energi dari makanan.'
        },

        {
          title: 'Mengandung Vitamin dan Mineral',
          description: 'Daging buah durian mengandung berbagai vitamin dan mineral yang berkontribusi terhadap nilai gizinya.'
        },

        {
          title: 'Mengandung Serat',
          description: 'Durian mengandung serat pangan yang menjadi bagian dari kandungan gizi buah.'
        },

        {
          title: 'Mengandung Senyawa Antioksidan',
          description: 'Durian mengandung vitamin dan berbagai senyawa yang memiliki aktivitas antioksidan.'
        }
      ],

      farmInfo: {
        hectares: 'Luas budidaya durian di Desa Belok/Sidan dapat berubah mengikuti perkembangan budidaya dan jumlah petani yang menanam durian.',

        distribution: 'Potensi budidaya durian terutama terdapat di Banjar Selantang. Banjar Bon tidak termasuk wilayah yang memiliki potensi durian sehingga tidak digunakan sebagai wilayah sebaran komoditas ini.',

        soilClimate: 'Tanaman durian membutuhkan kondisi lingkungan yang sesuai, termasuk tanah yang memiliki drainase baik, ketersediaan air yang cukup, serta kondisi iklim yang mendukung pertumbuhan tanaman.'
      },

      varietyComparison: {
        title: 'Durian Lokal vs Durian Kane',

        description: 'Durian lokal dan Durian Kane merupakan dua jenis yang dapat ditemukan dalam budidaya durian di wilayah Belok/Sidan. Durian Kane menjadi salah satu varietas yang lebih populer di wilayah tersebut karena dinilai dapat tumbuh relatif stabil pada berbagai kondisi ketinggian.',

        variants: [
          {
            name: 'Durian Lokal',

            attributes: [
              {
                label: 'Karakteristik',
                value: 'Memiliki karakter buah yang dapat berbeda-beda sesuai dengan pohon dan varietas lokal yang dibudidayakan oleh masyarakat.'
              },

              {
                label: 'Rasa',
                value: 'Karakter rasa bervariasi, mulai dari manis hingga memiliki perpaduan rasa khas masing-masing durian lokal.'
              },

              {
                label: 'Tekstur',
                value: 'Tekstur daging buah dapat bervariasi sesuai dengan jenis dan tingkat kematangan buah.'
              },

              {
                label: 'Pemanfaatan',
                value: 'Dikonsumsi secara langsung dan dapat menjadi bagian dari hasil perkebunan serta produk buah lokal masyarakat.'
              }
            ]
          },

          {
            name: 'Durian Kane',

            attributes: [
              {
                label: 'Popularitas',
                value: 'Menjadi salah satu varietas durian yang lebih populer di wilayah Belok/Sidan dibandingkan Musang King.'
              },

              {
                label: 'Karakteristik Tanaman',
                value: 'Memiliki karakter pohon yang relatif kecil sehingga dapat menjadi pilihan untuk budidaya pada lahan yang sesuai.'
              },

              {
                label: 'Karakteristik Buah',
                value: 'Dikenal mampu menghasilkan buah berukuran besar meskipun memiliki ukuran pohon yang relatif kecil.'
              },

              {
                label: 'Kondisi Tumbuh',
                value: 'Dinilai dapat tumbuh relatif stabil pada berbagai kondisi ketinggian di wilayah Belok/Sidan.'
              }
            ]
          }
        ]
      },

      highlights: [
        'Potensi durian terutama terdapat di Banjar Selantang',
        'Durian Kane menjadi salah satu varietas yang lebih populer di Belok/Sidan',
        'Terdapat Durian Black Thorn, Kane, Musang King, dan durian lokal',
        'Musang King relatif baru masuk ke wilayah Belok/Sidan',
        'Durian menjadi salah satu komoditas yang mulai diminati petani di Belok/Sidan'
      ]
    },
    {
      slug: 'kopi',

      title: 'Kopi',

      subtitle: 'Komoditas kopi dengan beragam klon Arabika dari Desa Belok/Sidan',

      image: 'assets/images/produk-kopi.png',

      description: 'Kopi merupakan salah satu komoditas utama Desa Belok/Sidan yang dibudidayakan oleh masyarakat di berbagai wilayah desa. Jenis kopi yang menjadi perbandingan utama adalah Kopi Arabika dan Kopi Robusta. Kopi Arabika terdapat di seluruh banjar di Desa Belok/Sidan, dengan berbagai klon yang berbeda pada masing-masing wilayah.',

      shortDescription: 'Kopi Arabika menjadi salah satu komoditas penting Desa Belok/Sidan dan ditemukan di seluruh banjar. Berbagai klon Arabika seperti Homasti, Kopyol B1, Kopyol B2, Yellow Bourbon, Yellow Caturra, Kopi Gayo, Sigara Rutang, Lini S 795, dan USDA 762 telah teridentifikasi dibudidayakan di wilayah desa. Selain Arabika, terdapat pula Kopi Robusta yang umumnya sesuai untuk kondisi dataran yang lebih rendah.',

      nutritionItems: [
        {
          title: 'Mengandung Kafein',
          description: 'Kopi mengandung kafein yang merupakan senyawa alami yang dapat memberikan efek stimulan terhadap sistem saraf pusat.'
        },

        {
          title: 'Mengandung Antioksidan',
          description: 'Kopi mengandung berbagai senyawa seperti asam klorogenat yang berkontribusi terhadap aktivitas antioksidan.'
        },

        {
          title: 'Memiliki Senyawa Bioaktif',
          description: 'Selain kafein, kopi mengandung berbagai senyawa bioaktif yang terbentuk secara alami pada biji kopi.'
        }
      ],

      farmInfo: {
        hectares: 'Luas budidaya kopi di Desa Belok/Sidan disesuaikan dengan besaran luasan yang diperoleh dari data lapangan.',

        distribution: 'Kopi Arabika terdapat di seluruh banjar di Desa Belok/Sidan. Masing-masing wilayah dapat memiliki klon Arabika yang berbeda sesuai dengan jenis yang dibudidayakan oleh petani. Sebaran Kopi Robusta dicatat secara terpisah berdasarkan data lapangan.',

        soilClimate: 'Kopi Arabika umumnya dibudidayakan pada wilayah dengan ketinggian sekitar 500 mdpl ke atas dan kondisi lingkungan yang lebih sejuk. Kopi Robusta umumnya lebih sesuai pada wilayah dengan ketinggian sekitar 500 mdpl ke bawah dan memiliki toleransi yang lebih baik terhadap kondisi lingkungan yang lebih hangat.'
      },

      varietyComparison: {
        title: 'Kopi Arabika vs Kopi Robusta',

        description: 'Kopi Arabika dan Kopi Robusta merupakan dua jenis kopi yang dibudidayakan di wilayah Belok/Sidan. Keduanya memiliki karakteristik tanaman, biji, rasa, serta kondisi tumbuh yang berbeda. Kopi Arabika menjadi perhatian khusus karena berbagai klonnya ditemukan di seluruh banjar dengan karakteristik yang dapat berbeda antarwilayah.',

        variants: [
          {
            name: 'Kopi Arabika',

            attributes: [
              {
                label: 'Karakteristik',
                value: 'Memiliki cita rasa dan aroma yang cenderung lebih kompleks dengan tingkat keasaman yang dapat berbeda berdasarkan varietas, lingkungan, dan pengolahan.'
              },

              {
                label: 'Bentuk Biji',
                value: 'Biji umumnya berbentuk lebih lonjong dengan garis tengah yang berkelok atau bergelombang.'
              },

              {
                label: 'Ketinggian',
                value: 'Umumnya dibudidayakan pada wilayah dengan ketinggian sekitar 500 mdpl ke atas dan kondisi yang relatif sejuk.'
              },

              {
                label: 'Sebaran',
                value: 'Dibudidayakan di seluruh banjar di Desa Belok/Sidan.'
              },

              {
                label: 'Klon yang Teridentifikasi',
                value: 'Homasti, Kopyol B1, Kopyol B2, Yellow Bourbon, Yellow Caturra, Kopi Gayo, Sigara Rutang, Lini S 795, dan USDA 762.'
              }
            ]
          },

          {
            name: 'Kopi Robusta',

            attributes: [
              {
                label: 'Karakteristik',
                value: 'Cenderung memiliki cita rasa lebih kuat dan pahit dibandingkan Arabika serta karakter rasa yang lebih sederhana.'
              },

              {
                label: 'Bentuk Biji',
                value: 'Biji umumnya lebih bulat dengan garis tengah yang relatif lurus.'
              },

              {
                label: 'Ketinggian',
                value: 'Umumnya dibudidayakan pada wilayah dengan ketinggian sekitar 500 mdpl ke bawah dan kondisi yang lebih hangat.'
              },

              {
                label: 'Sebaran',
                value: 'Sebaran Robusta di Desa Belok/Sidan disajikan berdasarkan data wilayah dan petani yang telah teridentifikasi.'
              },

              {
                label: 'Klon',
                value: 'Klon Robusta yang dibudidayakan di wilayah Belok/Sidan belum teridentifikasi secara pasti sehingga belum dijabarkan berdasarkan klon.'
              }
            ]
          }
        ]
      },

      highlights: [
        'Kopi merupakan salah satu komoditas utama Desa Belok/Sidan',
        'Kopi Arabika terdapat di seluruh banjar',
        'Memiliki beragam klon Arabika yang berbeda antarwilayah',
        'Klon Arabika yang teridentifikasi meliputi Homasti, Kopyol B1, Kopyol B2, Yellow Bourbon, Yellow Caturra, Kopi Gayo, Sigara Rutang, Lini S 795, dan USDA 762',
        'Kopi Robusta dibudidayakan pada wilayah dengan kondisi yang sesuai, tetapi klonnya belum teridentifikasi secara pasti'
      ]
    },
    {
      slug: 'bunga-gemitir',

      title: 'Bunga Gemitir',

      subtitle: 'Bunga khas Bali untuk persembahyangan, upacara adat, dan hiasan',

      image: 'assets/images/produk-bunga-gemitir.png',

      description: 'Bunga Gemitir (Tagetes) merupakan salah satu bunga yang banyak dimanfaatkan oleh masyarakat Bali sebagai sarana persembahyangan, sesajen, dan berbagai upacara adat keagamaan. Selain memiliki warna kuning dan oranye yang cerah, bunga gemitir juga digunakan sebagai hiasan untuk memperindah canang, upakara, serta berbagai kegiatan masyarakat.',

      shortDescription: 'Bunga Gemitir menjadi bagian penting dalam kehidupan masyarakat Bali, terutama sebagai sarana sembahyang dan pelengkap berbagai upacara adat serta hari raya keagamaan. Warna bunganya yang cerah juga menjadikannya sebagai pilihan untuk hiasan canang, sesajen, dekorasi, dan berbagai kegiatan masyarakat.',

      nutritionItems: [
        {
          title: 'Sarana Persembahyangan',
          description: 'Bunga gemitir digunakan sebagai salah satu sarana dalam persembahyangan masyarakat Hindu di Bali dan dapat menjadi bagian dari rangkaian canang serta sesajen.'
        },

        {
          title: 'Hiasan Canang dan Sesajen',
          description: 'Warna bunga gemitir yang cerah membuatnya banyak digunakan untuk memperindah canang, banten, dan berbagai bentuk sesajen.'
        },

        {
          title: 'Upacara Adat dan Hari Raya',
          description: 'Kebutuhan bunga gemitir meningkat ketika masyarakat melaksanakan upacara adat maupun hari raya keagamaan karena bunga digunakan sebagai bagian dari sarana upacara.'
        },

        {
          title: 'Dekorasi Kegiatan Masyarakat',
          description: 'Selain untuk persembahyangan, bunga gemitir dapat digunakan sebagai bunga hias dan dekorasi dalam berbagai kegiatan masyarakat.'
        }
      ],

      farmInfo: {
        hectares: 'Luas budidaya bunga gemitir di Desa Belok/Sidan bersifat fluktuatif dan dapat berubah mengikuti kebutuhan masyarakat serta permintaan pasar.',

        distribution: 'Bunga gemitir dibudidayakan oleh petani pada lahan pertanian dan kebun warga dengan kondisi lingkungan yang mendukung pertumbuhan tanaman.',

        soilClimate: 'Tanaman gemitir dapat tumbuh pada berbagai kondisi tanah dan umumnya berkembang baik pada tanah dengan drainase yang baik serta mendapatkan cahaya matahari yang cukup.'
      },

      varietyComparison: {
        title: 'Bunga Antasena vs Bunga Garuda',

        description: 'Bunga Gemitir di Desa Belok/Sidan memiliki beberapa varietas yang dibudidayakan oleh petani, di antaranya Bunga Antasena dan Bunga Garuda. Perbedaan kedua varietas dapat dilihat terutama dari warna bunga dan tinggi tanaman, sedangkan pemanfaatannya pada dasarnya tetap sama, yaitu sebagai bunga hias serta sarana persembahyangan dan upacara adat.',

        variants: [
          {
            name: 'Bunga Antasena',

            attributes: [
              {
                label: 'Warna Bunga',
                value: 'Karakteristik warna bunga mengikuti ciri varietas Antasena yang dibudidayakan oleh petani Desa Belok/Sidan.'
              },

              {
                label: 'Tinggi Tanaman',
                value: 'Memiliki karakteristik tinggi tanaman yang menjadi salah satu pembeda dari varietas Garuda.'
              },

              {
                label: 'Pemanfaatan',
                value: 'Digunakan sebagai bunga hias, sarana sembahyang, canang, sesajen, serta berbagai kegiatan upacara adat dan keagamaan.'
              }
            ]
          },

          {
            name: 'Bunga Garuda',

            attributes: [
              {
                label: 'Warna Bunga',
                value: 'Memiliki karakteristik warna bunga yang menjadi salah satu pembeda dari varietas Antasena.'
              },

              {
                label: 'Tinggi Tanaman',
                value: 'Memiliki karakteristik tinggi tanaman yang menjadi salah satu pembeda dari varietas Antasena.'
              },

              {
                label: 'Pemanfaatan',
                value: 'Digunakan sebagai bunga hias, sarana sembahyang, canang, sesajen, serta berbagai kegiatan upacara adat dan keagamaan.'
              }
            ]
          }
        ]
      },

      highlights: [
        'Digunakan sebagai sarana persembahyangan masyarakat Bali',
        'Menjadi bagian dari canang, sesajen, dan upakara',
        'Banyak digunakan dalam upacara adat dan hari raya keagamaan',
        'Memiliki nilai estetika sebagai bunga hias dan dekorasi',
        'Kebutuhan budidaya dapat meningkat menjelang upacara dan hari raya'
      ]
    },
    {
      slug: 'alpukat',

      title: 'Alpukat',

      subtitle: 'Buah kaya nutrisi dengan daging lembut dan rasa khas',

      image: 'assets/images/produk-alpukat.png',

      description: 'Alpukat (Persea americana) merupakan buah yang dikenal memiliki daging lembut dengan kandungan lemak yang tinggi. Buah ini memiliki beragam bentuk, warna kulit, ukuran, dan karakteristik rasa tergantung pada varietasnya. Alpukat dapat dikonsumsi secara langsung maupun diolah menjadi berbagai jenis makanan dan minuman.',

      shortDescription: 'Alpukat Desa Belok/Sidan dibudidayakan pada lingkungan yang mendukung pertumbuhan tanaman alpukat. Buah alpukat memiliki daging yang lembut dengan kandungan lemak tak jenuh tunggal, serat, vitamin, dan mineral. Karakteristik buah dapat berbeda berdasarkan varietas, seperti Alpukat Mentega dan Alpukat Hass.',

      nutritionItems: [
        {
          title: 'Kaya Lemak Tak Jenuh',
          description: 'Alpukat merupakan sumber lemak tak jenuh tunggal yang menjadi salah satu karakteristik utama kandungan gizinya.'
        },

        {
          title: 'Sumber Serat',
          description: 'Alpukat mengandung serat pangan yang dapat menjadi bagian dari pola makan bergizi seimbang.'
        },

        {
          title: 'Mengandung Vitamin dan Mineral',
          description: 'Alpukat mengandung berbagai vitamin dan mineral, termasuk vitamin E, vitamin K, kalium, dan magnesium.'
        },

        {
          title: 'Mengandung Antioksidan',
          description: 'Alpukat mengandung berbagai senyawa seperti karotenoid yang berkontribusi terhadap nilai gizinya.'
        }
      ],

      farmInfo: {
        hectares: 'Sekitar 35 hektar lahan perkebunan alpukat dikelola oleh petani di dataran tinggi Desa Belok/Sidan.',

        distribution: 'Tanaman alpukat tersebar di kebun-kebun warga dan lahan perbukitan Kecamatan Petang dengan kondisi lahan yang mendukung pertumbuhan tanaman.',

        soilClimate: 'Lingkungan dengan tanah yang subur, drainase yang baik, serta kondisi iklim yang sesuai mendukung pertumbuhan tanaman alpukat dan produksi buah.'
      },

      varietyComparison: {
        title: 'Alpukat Mentega vs Alpukat Hass',

        description: 'Alpukat memiliki berbagai varietas dengan karakteristik buah yang berbeda. Alpukat Mentega dikenal dengan daging buah yang lembut dan bersih ketika matang, sedangkan Alpukat Hass memiliki kulit bertekstur kasar yang berubah menjadi ungu kehitaman saat matang serta daging berwarna hijau pucat hingga kuning-hijau.',

        variants: [
          {
            name: 'Alpukat Mentega',

            attributes: [
              {
                label: 'Tekstur',
                value: 'Daging buah lembut, halus, dan bersih ketika matang.'
              },

              {
                label: 'Kulit',
                value: 'Kulit dapat berubah dari hijau menuju hijau keunguan hingga ungu ketika matang.'
              },

              {
                label: 'Karakteristik Buah',
                value: 'Memiliki daging buah yang lembut dan dikenal dengan karakter rasa yang legit ketika matang.'
              },

              {
                label: 'Kondisi Lingkungan',
                value: 'Lebih sesuai dikembangkan pada kondisi dataran yang lebih rendah dengan lingkungan tumbuh yang sesuai.'
              }
            ]
          },

          {
            name: 'Alpukat Hass',

            attributes: [
              {
                label: 'Tekstur',
                value: 'Daging buah memiliki tekstur lembut dan kaya dengan kandungan minyak yang relatif tinggi.'
              },

              {
                label: 'Kulit',
                value: 'Kulit berwarna hijau gelap dan bertekstur kasar, kemudian berubah menjadi ungu kehitaman ketika matang.'
              },

              {
                label: 'Karakteristik Buah',
                value: 'Buah berukuran sekitar 200–300 gram dengan daging berwarna hijau pucat di bagian dekat kulit dan semakin kuning-hijau menuju bagian tengah.'
              },

              {
                label: 'Kondisi Lingkungan',
                value: 'Dapat tumbuh baik pada lingkungan dengan drainase tanah yang baik, sinar matahari yang cukup, serta kondisi yang sejuk. Di Desa Belok/Sidan, varietas Hass dapat ditonjolkan sebagai varietas yang sesuai untuk area dataran tinggi, terutama pada ketinggian sekitar 800 mdpl ke atas.'
              }
            ]
          }
        ]
      },

      highlights: [
        'Kaya lemak tak jenuh, serat, vitamin, dan mineral',
        'Memiliki karakteristik buah yang berbeda berdasarkan varietas',
        'Alpukat Mentega dikenal dengan daging buah yang lembut dan legit',
        'Alpukat Hass memiliki kulit kasar yang berubah menjadi ungu kehitaman saat matang',
        'Cocok dikonsumsi segar maupun diolah menjadi berbagai hidangan'
      ]
    },
    {
      slug: 'cabai',

      title: 'Cabai',

      subtitle: 'Komoditas pedas yang dibudidayakan petani Desa Belok/Sidan',

      image: 'assets/images/produk-cabai besar.png',

      description: 'Cabai merupakan salah satu komoditas pertanian yang dibudidayakan oleh masyarakat Desa Belok/Sidan. Jenis cabai yang banyak dibahas meliputi cabai besar dan cabai rawit. Keduanya memiliki karakteristik buah, tingkat kepedasan, serta pemanfaatan yang berbeda dalam kebutuhan pangan sehari-hari.',

      shortDescription: 'Cabai besar banyak dibudidayakan di Banjar Bon, sedangkan cabai rawit ditanam di seluruh banjar di Desa Belok/Sidan. Kedua jenis cabai dimanfaatkan sebagai bahan masakan dan bumbu, dengan perbedaan utama pada ukuran buah, bentuk, dan tingkat kepedasannya.',

      nutritionItems: [
        {
          title: 'Mengandung Capsaicin',
          description: 'Capsaicin merupakan senyawa yang memberikan rasa pedas khas pada cabai.'
        },

        {
          title: 'Sumber Vitamin',
          description: 'Cabai mengandung berbagai vitamin dan senyawa yang menjadi bagian dari nilai gizi buah cabai.'
        },

        {
          title: 'Mengandung Senyawa Antioksidan',
          description: 'Cabai mengandung berbagai senyawa seperti karotenoid dan vitamin yang berkontribusi terhadap nilai gizinya.'
        }
      ],

      farmInfo: {
        largeChili: {
          title: 'Budidaya Cabai Besar',
          hectares: 'Data luas lahan cabai besar disajikan secara khusus berdasarkan data petani dan perkebunan cabai besar di Desa Belok/Sidan.',
          distribution: 'Cabai besar banyak dibudidayakan oleh petani di Banjar Bon.',
          soilClimate: 'Tanaman cabai membutuhkan lingkungan tumbuh dengan kondisi tanah yang mendukung pertumbuhan, drainase yang baik, serta mendapatkan cahaya matahari yang cukup.'
        },

        birdEyeChili: {
          title: 'Budidaya Cabai Rawit',
          hectares: 'Data luas lahan cabai rawit disajikan secara terpisah berdasarkan data petani dan perkebunan cabai rawit di Desa Belok/Sidan.',
          distribution: 'Cabai rawit dibudidayakan di seluruh banjar yang terdapat di Desa Belok/Sidan.',
          soilClimate: 'Cabai rawit dapat dibudidayakan pada lahan dengan kondisi tanah yang mendukung pertumbuhan tanaman serta mendapatkan cahaya matahari yang cukup.'
        }
      },

      varietyComparison: {
        title: 'Cabai Besar vs Cabai Rawit',

        description: 'Cabai besar dan cabai rawit merupakan dua jenis cabai yang dibudidayakan di Desa Belok/Sidan. Keduanya sama-sama digunakan sebagai bahan pangan dan bumbu masakan, tetapi memiliki perbedaan terutama pada ukuran buah, bentuk, dan tingkat kepedasan.',

        variants: [
          {
            name: 'Cabai Besar',

            attributes: [
              {
                label: 'Ukuran',
                value: 'Memiliki ukuran buah yang relatif lebih besar dibandingkan cabai rawit.'
              },

              {
                label: 'Bentuk',
                value: 'Buah umumnya berbentuk memanjang dengan ukuran yang lebih besar.'
              },

              {
                label: 'Tingkat Kepedasan',
                value: 'Memiliki tingkat kepedasan yang bervariasi tergantung jenis dan kultivarnya.'
              },

              {
                label: 'Pemanfaatan',
                value: 'Digunakan sebagai bahan masakan, bumbu, sambal, dan berbagai olahan pangan.'
              },

              {
                label: 'Budidaya di Desa',
                value: 'Banyak dibudidayakan oleh petani di Banjar Bon.'
              }
            ]
          },

          {
            name: 'Cabai Rawit',

            attributes: [
              {
                label: 'Ukuran',
                value: 'Memiliki buah yang relatif kecil dibandingkan cabai besar.'
              },

              {
                label: 'Bentuk',
                value: 'Buah umumnya berukuran kecil dan memanjang dengan bentuk yang dapat bervariasi.'
              },

              {
                label: 'Tingkat Kepedasan',
                value: 'Dikenal memiliki rasa yang sangat pedas dan menjadi salah satu ciri khas cabai rawit.'
              },

              {
                label: 'Warna',
                value: 'Warna buah dapat berubah sesuai tingkat kematangan, dari hijau hingga merah.'
              },

              {
                label: 'Pemanfaatan',
                value: 'Banyak digunakan sebagai bahan sambal, bumbu masakan, dan berbagai olahan makanan.'
              },

              {
                label: 'Budidaya di Desa',
                value: 'Dibudidayakan di seluruh banjar di Desa Belok/Sidan.'
              }
            ]
          }
        ]
      },

      highlights: [
        'Cabai besar banyak dibudidayakan di Banjar Bon',
        'Cabai rawit ditanam di seluruh banjar Desa Belok/Sidan',
        'Memiliki karakteristik ukuran dan tingkat kepedasan yang berbeda',
        'Digunakan sebagai bumbu dan bahan berbagai olahan pangan',
        'Menjadi salah satu komoditas pertanian masyarakat Desa Belok/Sidan'
      ]
    },
    {
      slug: 'jeruk',

      title: 'Jeruk',

      subtitle: 'Komoditas unggulan Desa Belok/Sidan dengan beragam varietas',

      image: 'assets/images/produk-jeruk siam madu.png',

      description: 'Jeruk merupakan salah satu komoditas andalan Desa Belok/Sidan yang dibudidayakan oleh masyarakat di berbagai wilayah desa. Jenis jeruk yang terdapat di wilayah ini meliputi Jeruk Siam, Jeruk Berastagi, Jeruk Selayak, Jeruk RGL, dan Jeruk Siam Madu. Keberagaman varietas tersebut menghasilkan karakter buah yang berbeda dan menjadi salah satu potensi hasil pertanian Desa Belok/Sidan.',

      shortDescription: 'Jeruk menjadi salah satu komoditas utama Desa Belok/Sidan dengan total budidaya mencapai 267.000 pohon atau setara dengan 267 hektar. Budidayanya tersebar di Banjar Bon, Banjar Jempanang, Sekarmuti, Belok, dan Lawak. Produksi jeruk di wilayah ini juga dinilai memiliki keunggulan dibandingkan produksi jeruk di Kintamani.',

      nutritionItems: [
        {
          title: 'Sumber Vitamin C',
          description: 'Jeruk mengandung vitamin C yang menjadi salah satu kandungan gizi utama buah jeruk.'
        },

        {
          title: 'Mengandung Air',
          description: 'Kandungan air yang tinggi membuat jeruk terasa segar dan cocok dikonsumsi sebagai buah segar maupun diolah menjadi minuman.'
        },

        {
          title: 'Mengandung Serat',
          description: 'Jeruk mengandung serat pangan yang menjadi bagian dari nilai gizi buah.'
        },

        {
          title: 'Mengandung Senyawa Bioaktif',
          description: 'Jeruk mengandung berbagai senyawa seperti flavonoid dan karotenoid yang berkontribusi terhadap nilai gizinya.'
        }
      ],

      farmInfo: {
        hectares: 'Total luas budidaya jeruk di Desa Belok/Sidan mencapai 267.000 pohon atau setara dengan 267 hektar.',

        distribution: 'Budidaya jeruk banyak terdapat di Banjar Bon, Banjar Jempanang, Sekarmuti, Belok, dan Lawak.',

        soilClimate: 'Jenis-jenis jeruk yang dibudidayakan pada dasarnya memiliki kebutuhan lingkungan yang relatif serupa, yaitu tanah dengan drainase baik, ketersediaan air yang cukup, serta paparan sinar matahari yang mendukung pertumbuhan dan pembentukan buah.'
      },

      varietyComparison: {
        title: 'Perbandingan Jenis Jeruk',

        description: 'Desa Belok/Sidan memiliki beberapa jenis jeruk yang dibudidayakan oleh masyarakat. Empat jenis yang menjadi perbandingan utama adalah Jeruk Siam, Jeruk Siam Madu, Jeruk Selayak, dan Jeruk RGL. Masing-masing memiliki karakteristik buah dan keunggulan yang berbeda.',

        variants: [
          {
            name: 'Jeruk Siam',

            attributes: [
              {
                label: 'Rasa',
                value: 'Umumnya memiliki rasa manis dengan tingkat keasaman yang dapat berbeda sesuai kondisi buah dan tingkat kematangan.'
              },

              {
                label: 'Kulit',
                value: 'Kulit relatif tipis dan mudah dikupas ketika buah telah matang.'
              },

              {
                label: 'Daging Buah',
                value: 'Memiliki daging buah yang berair dan mudah dikonsumsi secara langsung.'
              },

              {
                label: 'Pemanfaatan',
                value: 'Cocok dikonsumsi sebagai buah segar maupun digunakan sebagai bahan minuman dan olahan makanan.'
              }
            ]
          },

          {
            name: 'Jeruk Siam Madu',

            attributes: [
              {
                label: 'Rasa',
                value: 'Dikenal memiliki rasa manis dengan karakter rasa yang menjadi ciri khas Jeruk Siam Madu.'
              },

              {
                label: 'Kulit',
                value: 'Kulit relatif mudah dikupas sehingga praktis untuk dikonsumsi secara langsung.'
              },

              {
                label: 'Daging Buah',
                value: 'Memiliki daging buah yang berair dengan rasa manis.'
              },

              {
                label: 'Ciri Khas',
                value: 'Dikembangkan sebagai salah satu jenis jeruk konsumsi dengan cita rasa manis dan praktis dikonsumsi sebagai buah segar.'
              }
            ]
          },

          {
            name: 'Jeruk Selayak',

            attributes: [
              {
                label: 'Karakteristik',
                value: 'Merupakan salah satu jenis jeruk yang mulai dibudidayakan dan dikembangkan di wilayah Belok/Sidan.'
              },

              {
                label: 'Buah',
                value: 'Memiliki karakteristik buah jeruk keprok dengan warna kulit yang berubah menjadi kuning atau jingga ketika memasuki kematangan.'
              },

              {
                label: 'Pemanfaatan',
                value: 'Dapat dimanfaatkan sebagai buah konsumsi segar dan menjadi salah satu komoditas pertanian yang dikembangkan oleh petani.'
              },

              {
                label: 'Budidaya',
                value: 'Mulai menunjukkan potensi produksi di wilayah Belok/Sidan dan menjadi bagian dari keberagaman jenis jeruk yang dibudidayakan.'
              }
            ]
          },

          {
            name: 'Jeruk RGL',

            attributes: [
              {
                label: 'Karakteristik',
                value: 'Jeruk RGL merupakan salah satu jenis jeruk yang dibudidayakan sebagai komoditas pertanian dengan nilai ekonomi.'
              },

              {
                label: 'Rasa',
                value: 'Memiliki karakter rasa jeruk yang segar dengan perpaduan rasa manis dan asam yang dapat dipengaruhi oleh tingkat kematangan.'
              },

              {
                label: 'Buah',
                value: 'Memiliki buah dengan karakteristik yang sesuai untuk konsumsi segar.'
              },

              {
                label: 'Pemanfaatan',
                value: 'Dapat dipasarkan sebagai buah segar dan menjadi salah satu pilihan komoditas jeruk bernilai ekonomi.'
              }
            ]
          }
        ]
      },

      highlights: [
        'Salah satu komoditas utama Desa Belok/Sidan',
        'Memiliki sekitar 267.000 pohon atau setara dengan 267 hektar budidaya',
        'Tersebar di Banjar Bon, Jempanang, Sekarmuti, Belok, dan Lawak',
        'Memiliki beragam jenis seperti Siam, Berastagi, Selayak, RGL, dan Siam Madu',
        'Produksi jeruk Belok/Sidan dinilai memiliki keunggulan dibandingkan Kintamani'
      ]
    },
    {
      slug: 'padi',

      title: 'Padi',

      subtitle: 'Komoditas pangan dan potensi pertanian Desa Belok/Sidan',

      image: 'assets/images/produk-padi.png',

      description: 'Padi merupakan salah satu komoditas pertanian yang dibudidayakan oleh masyarakat Desa Belok/Sidan. Selain berperan sebagai sumber pangan utama, komoditas padi juga tetap dimasukkan dalam pemetaan potensi desa karena memiliki keterkaitan dengan kegiatan pemasaran hasil pertanian.',

      shortDescription: 'Padi Desa Belok/Sidan dibudidayakan pada beberapa wilayah, yaitu Belok, Lawak, Sidan, dan Penikit. Dengan luas budidaya sekitar 100,2 hektar dan pola tanam yang dapat dilakukan hingga dua kali dalam setahun, padi menjadi salah satu komoditas yang mendukung kebutuhan pangan sekaligus potensi ekonomi masyarakat desa.',

      nutritionItems: [
        {
          title: 'Sumber Karbohidrat',
          description: 'Beras yang dihasilkan dari tanaman padi merupakan salah satu sumber karbohidrat utama dalam makanan sehari-hari.'
        },

        {
          title: 'Sumber Energi',
          description: 'Kandungan karbohidrat pada beras dapat digunakan tubuh sebagai salah satu sumber energi.'
        },

        {
          title: 'Mengandung Vitamin dan Mineral',
          description: 'Beras mengandung sejumlah vitamin dan mineral, dengan kandungan yang dapat berbeda berdasarkan varietas dan tingkat pengolahannya.'
        }
      ],

      farmInfo: {
        hectares: 'Total luas budidaya padi di Desa Belok/Sidan mencapai 100,2 hektar.',

        distribution: 'Budidaya padi terdapat di wilayah Belok, Lawak, Sidan, dan Penikit. Wilayah lain tidak dimasukkan dalam sebaran apabila belum terdapat data atau potensi budidaya padi yang teridentifikasi.',

        soilClimate: 'Budidaya padi didukung oleh kondisi lahan dan pengairan yang sesuai. Dalam satu tahun, petani dapat melakukan hingga dua kali masa tanam sehingga pola budidaya dapat menyesuaikan kondisi iklim dan ketersediaan air.'
      },

      varietyComparison: {
        title: 'Beras Ciherang vs Beras Putih Pelita',

        description: 'Beras Ciherang dan Beras Putih Pelita merupakan dua varietas yang digunakan sebagai perbandingan dalam komoditas padi Desa Belok/Sidan. Keduanya merupakan beras putih yang dapat dimanfaatkan sebagai bahan pangan sehari-hari, dengan karakteristik varietas yang berbeda.',

        variants: [
          {
            name: 'Beras Ciherang',

            attributes: [
              {
                label: 'Jenis',
                value: 'Beras putih yang berasal dari varietas padi Ciherang.'
              },

              {
                label: 'Bentuk & Tekstur',
                value: 'Memiliki bentuk butiran yang relatif ramping dan menghasilkan nasi dengan tekstur yang sesuai untuk konsumsi sehari-hari.'
              },

              {
                label: 'Warna',
                value: 'Putih setelah melalui proses penggilingan dan pengolahan menjadi beras.'
              },

              {
                label: 'Pemanfaatan',
                value: 'Umumnya digunakan sebagai bahan pangan pokok dan dikonsumsi sebagai nasi sehari-hari.'
              }
            ]
          },

          {
            name: 'Beras Putih Pelita',

            attributes: [
              {
                label: 'Jenis',
                value: 'Beras putih yang berasal dari varietas padi Pelita.'
              },

              {
                label: 'Bentuk & Tekstur',
                value: 'Memiliki karakteristik butiran dan tekstur nasi yang menjadi ciri dari varietas Pelita.'
              },

              {
                label: 'Warna',
                value: 'Berwarna putih setelah melalui proses penggilingan.'
              },

              {
                label: 'Pemanfaatan',
                value: 'Digunakan sebagai bahan pangan pokok dan dapat dikonsumsi sebagai nasi sehari-hari.'
              }
            ]
          }
        ]
      },

      highlights: [
        'Luas budidaya mencapai sekitar 100,2 hektar',
        'Terdapat di Belok, Lawak, Sidan, dan Penikit',
        'Dapat dibudidayakan hingga dua kali masa tanam dalam setahun',
        'Memiliki varietas seperti Ciherang dan Pelita',
        'Menjadi komoditas pangan sekaligus potensi pemasaran hasil pertanian desa'
      ]
    },
    {
      slug: 'lemon',

      title: 'Lemon',

      subtitle: 'Lemon California segar dari Desa Belok/Sidan',

      image: 'assets/images/produk-lemon.png',

      description: 'Lemon merupakan salah satu komoditas buah sitrus yang dibudidayakan oleh petani di Desa Belok/Sidan. Varietas yang dikembangkan adalah Lemon California, yang dikenal memiliki rasa asam segar dan aroma khas serta dapat dimanfaatkan untuk berbagai kebutuhan minuman dan olahan kuliner.',

      shortDescription: 'Lemon California Desa Belok/Sidan dibudidayakan terutama di wilayah Banjar Bon dan Banjar Lawak. Buahnya memiliki rasa asam yang segar dan aroma khas, sehingga cocok dikonsumsi sebagai bahan minuman maupun berbagai olahan makanan.',

      nutritionItems: [
        {
          title: 'Sumber Vitamin C',
          description: 'Lemon mengandung vitamin C yang menjadi salah satu kandungan gizi utama buah sitrus.'
        },

        {
          title: 'Mengandung Senyawa Antioksidan',
          description: 'Lemon mengandung berbagai senyawa, termasuk flavonoid dan vitamin C, yang berkontribusi terhadap nilai gizinya.'
        },

        {
          title: 'Mengandung Air',
          description: 'Kandungan air pada buah lemon memberikan karakter rasa yang segar dan membuatnya banyak dimanfaatkan dalam minuman.'
        }
      ],

      farmInfo: {
        hectares: 'Total luas budidaya Lemon California di Desa Belok/Sidan mencapai 19,25 hektar.',

        distribution: 'Sebaran budidaya Lemon California paling banyak terdapat di Banjar Bon dan Banjar Lawak.',

        soilClimate: 'Tanaman lemon membutuhkan kondisi lingkungan yang mendukung pertumbuhan tanaman, termasuk tanah dengan drainase yang baik, ketersediaan air yang cukup, serta paparan sinar matahari.'
      },

      varietyComparison: {
        title: 'Karakteristik Lemon California',

        description: 'Lemon California merupakan varietas lemon yang dibudidayakan di Desa Belok/Sidan. Buah ini dikenal memiliki rasa asam yang segar dan aroma khas sehingga banyak dimanfaatkan sebagai bahan minuman maupun olahan kuliner.',

        variants: [
          {
            name: 'Lemon California',

            attributes: [
              {
                label: 'Rasa',
                value: 'Memiliki rasa asam yang segar dan khas.'
              },

              {
                label: 'Aroma',
                value: 'Memiliki aroma sitrus yang segar dan kuat.'
              },

              {
                label: 'Karakteristik Buah',
                value: 'Buah memiliki karakteristik khas lemon dengan kandungan sari buah yang dapat dimanfaatkan untuk berbagai kebutuhan.'
              },

              {
                label: 'Pemanfaatan',
                value: 'Digunakan sebagai bahan minuman, campuran makanan, bumbu, serta berbagai olahan kuliner.'
              }
            ]
          }
        ]
      },

      highlights: [
        'Varietas Lemon California',
        'Luas budidaya mencapai sekitar 19,25 hektar',
        'Banyak dibudidayakan di Banjar Bon dan Banjar Lawak',
        'Memiliki rasa asam segar dan aroma khas',
        'Cocok untuk minuman dan berbagai olahan kuliner'
      ]
    }

  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? 'asparagus';
    this.detail = this.produkDetails.find((item) => item.slug === slug) ?? this.createAdditionalDetail(slug);
    this.badges = this.buildBadges(this.detail);
  }

  private createAdditionalDetail(slug: string): ProdukDetailData {
    const produk = PRODUK_LIST.find((item) => item.link === `/produk/${slug}`);
    const title = produk?.title ?? 'Produk Desa Belok/Sidan';
    const distribution = produk?.banjar.length
      ? produk.banjar
      .map((banjar) => BANJAR_LABELS[banjar].replace('Banjar Dinas ', ''))
      .join(', ')
      : 'belum dirinci dalam data lapangan';
    const hectares = title === 'Pisang'
      ? 'Jumlah budidaya mencapai 64.000 rumpun.'
      : 'Data luas budidaya disajikan berdasarkan data lapangan yang telah teridentifikasi.';

    return {
      slug,
      title,
      subtitle: `Potensi ${title} Desa Belok/Sidan`,
      image: produk?.image ?? 'assets/images/produk-sayur hortikultura.png',
      description: `${title} merupakan bagian dari potensi wilayah Desa Belok/Sidan sesuai hasil pembahasan dan revisi data komoditas. Komoditas ini dikembangkan oleh masyarakat dan dapat mendukung keragaman serta pemasaran hasil pertanian desa.`,
      shortDescription: `${title} termasuk komoditas yang perlu dimasukkan dalam potensi wilayah Desa Belok/Sidan.`,
      farmInfo: {
        hectares,
        distribution: `Data sebaran yang tercatat: ${distribution}.`,
        soilClimate: 'Budidaya disesuaikan dengan kondisi tanah, ketersediaan air, cahaya matahari, dan lingkungan yang sesuai bagi pertumbuhan tanaman.'
      },
      highlights: [
        `Termasuk potensi ${title} Desa Belok/Sidan`,
        'Dibudidayakan oleh masyarakat desa',
        'Data sebaran mengikuti wilayah yang telah teridentifikasi'
      ]
    };
  }

  /** Menyusun badge kategori tanaman + banjar (maks. 2) dari data produk di halaman list */
  private buildBadges(detail: ProdukDetailData): ProdukBadge[] {
    const produk = PRODUK_LIST.find((item) => item.link === `/produk/${detail.slug}`);
    if (!produk) {
      return [];
    }

    const tipeBadges: ProdukBadge[] = produk.tipeTanaman.map((tipe) => ({
      label: TIPE_TANAMAN_LABELS[tipe],
      type: 'tipe'
    }));
    const banjarBadges: ProdukBadge[] = produk.banjar
      .slice(0, 2)
      .map((banjar) => ({
        label: BANJAR_LABELS[banjar].replace('Banjar Dinas', 'Banjar'),
        type: 'banjar'
      }));

    return [...tipeBadges, ...banjarBadges];
  }

  /** Item highlight bisa berupa string polos atau objek { title, description, icon } */
  isHighlightObject(item: string | ProdukHighlightItem): item is ProdukHighlightItem {
    return typeof item !== 'string';
  }

  highlightDescription(item: string | ProdukHighlightItem): string {
    return typeof item === 'string' ? item : item.description;
  }

  highlightTitle(item: string | ProdukHighlightItem): string | null {
    return typeof item === 'string' ? null : item.title;
  }

  resolveHighlightIcon(item: string | ProdukHighlightItem, index: number): string {
    const key = typeof item === 'string' ? undefined : item.icon;
    return (key && ICON_MAP[key]) || this.highlightIcons[index % this.highlightIcons.length];
  }

  resolveNutritionIcon(item: ProdukNutrisiItem, index: number): string {
    return (item.icon && ICON_MAP[item.icon]) || this.nutritionIcons[index % this.nutritionIcons.length];
  }

  setActiveVariant(index: number): void {
    if (this.detail?.varietyComparison?.variants) {
      const total = this.detail.varietyComparison.variants.length;
      if (index >= 0 && index < total) {
        this.activeVariantIndex = index;
      }
    }
  }

  nextVariant(): void {
    if (this.detail?.varietyComparison?.variants) {
      const total = this.detail.varietyComparison.variants.length;
      this.activeVariantIndex = (this.activeVariantIndex + 1) % total;
    }
  }

  prevVariant(): void {
    if (this.detail?.varietyComparison?.variants) {
      const total = this.detail.varietyComparison.variants.length;
      this.activeVariantIndex = (this.activeVariantIndex - 1 + total) % total;
    }
  }

  setVarietyViewMode(mode: 'slider' | 'side-by-side'): void {
    this.varietyViewMode = mode;
  }
}
