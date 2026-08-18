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
      slug: 'durian-musangking',
      title: 'Durian',
      subtitle: 'Kelezatan khas dataran tinggi Belok/Sidan',
      image: 'assets/images/produk-durian.png',
      description: 'Durian Musangking menjadi primadona karena aroma khasnya yang kuat, daging tebal, dan cita rasa yang lezat.',
      shortDescription: 'Durian Musangking adalah durian unggulan dengan daging buah tebal berwarna kuning keemasan, tekstur lembut, dan rasa manis legit berpadu sedikit pahit yang khas. Tumbuh subur di dataran tinggi Desa Belok/Sidan dengan aroma yang kuat dan menggoda.',
      nutritionItems: [
        {
          title: 'Sumber Energi Alami',
          description: 'Kandungan karbohidrat dan gula alami pada durian memberikan asupan energi yang cepat diserap tubuh.'
        },
        {
          title: 'Kaya Antioksidan',
          description: 'Senyawa flavonoid dan vitamin C membantu melawan radikal bebas serta menjaga daya tahan tubuh.'
        },
        {
          title: 'Mendukung Kesehatan Tulang',
          description: 'Kandungan kalium dan mineral lain berperan dalam menjaga kepadatan dan kekuatan tulang.'
        },
        {
          title: 'Sumber Serat',
          description: 'Serat alami pada daging durian membantu melancarkan proses pencernaan.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 45 hektar lahan perkebunan durian tersebar di kawasan berbukit Desa Belok/Sidan.',
        distribution: 'Sebaran tanaman durian terkonsentrasi di dusun-dusun dengan kontur lahan berbukit dan akses air yang baik di Kecamatan Petang.',
        soilClimate: 'Tanah vulkanik yang subur dan gembur, dipadukan dengan iklim tropis lembap serta curah hujan tinggi, sangat mendukung pertumbuhan pohon durian berkualitas.'
      },
      varietyComparison: {
        title: 'Durian Musang King vs Durian Kane',
        description: 'Dua varietas durian unggulan ini punya karakter rasa dan bentuk yang cukup mudah dibedakan.',
        variants: [
          {
            name: 'Durian Musang King',
            attributes: [
              { label: 'Rasa', value: 'Manis legit berpadu pahit khas yang kuat di akhir' },
              { label: 'Aroma', value: 'Sangat tajam dan menyengat' },
              { label: 'Bentuk & Tekstur', value: 'Daging tebal, biji kecil (kempes), tekstur creamy lembut' },
              { label: 'Warna', value: 'Kuning keemasan pekat' }
            ]
          },
          {
            name: 'Durian Kane',
            attributes: [
              { label: 'Rasa', value: 'Manis dominan dengan sedikit rasa pahit' },
              { label: 'Aroma', value: 'Lebih ringan dibanding Musang King' },
              { label: 'Bentuk & Tekstur', value: 'Daging tebal namun lebih kering dan padat' },
              { label: 'Warna', value: 'Kuning pucat hingga kuning muda' }
            ]
          }
        ]
      },
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
      shortDescription: 'Kopi Arabika Desa Belok/Sidan tumbuh di lereng pegunungan dengan udara sejuk, menghasilkan biji kopi beraroma harum, rasa lembut, dan tingkat keasaman yang seimbang. Diproses secara tradisional untuk menjaga cita rasa khasnya.',
      nutritionItems: [
        {
          title: 'Sumber Antioksidan',
          description: 'Kandungan asam klorogenat pada kopi berperan sebagai antioksidan yang membantu melawan radikal bebas.'
        },
        {
          title: 'Meningkatkan Fokus',
          description: 'Kafein alami membantu meningkatkan kewaspadaan dan konsentrasi secara sementara.'
        },
        {
          title: 'Mendukung Metabolisme',
          description: 'Senyawa aktif dalam kopi berpotensi membantu meningkatkan laju metabolisme tubuh.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 454 hektar lahan perkebunan kopi arabika dikelola oleh kelompok tani di dataran tinggi Desa Belok/Sidan.',
        distribution: 'Perkebunan kopi tersebar di seluruh banjar desa Belok/Sidan yang memiliki ketinggian dan kemiringan lahan ideal.',
        soilClimate: 'Tanah andosol yang subur serta iklim sejuk dengan suhu stabil dan curah hujan merata mendukung pertumbuhan biji kopi berkualitas tinggi.'
      },
      varietyComparison: {
        title: 'Kopi Arabika vs Kopi Robusta',
        description: 'Dua jenis kopi paling populer ini memiliki perbedaan mencolok dari segi rasa, bentuk biji, hingga tempat tumbuhnya.',
        variants: [
          {
            name: 'Kopi Arabika',
            attributes: [
              { label: 'Rasa', value: 'Lembut, sedikit asam segar dengan sentuhan rasa buah atau bunga' },
              { label: 'Aroma', value: 'Harum kompleks, cenderung floral dan fruity' },
              { label: 'Bentuk Biji', value: 'Lonjong dengan garis tengah bergelombang' },
              { label: 'Kadar Kafein', value: 'Lebih rendah, sekitar 1-1,5%' },
              { label: 'Habitat Tumbuh', value: 'Optimal di dataran tinggi 700-2000 mdpl dengan suhu sejuk' }
              //{ label: ''}
            ]
          },
          {
            name: 'Kopi Robusta',
            attributes: [
              { label: 'Rasa', value: 'Lebih pahit, kuat, dan cenderung earthy' },
              { label: 'Aroma', value: 'Lebih tajam, menyerupai kacang panggang' },
              { label: 'Bentuk Biji', value: 'Bulat dengan garis tengah lurus' },
              { label: 'Kadar Kafein', value: 'Lebih tinggi, sekitar 2-2,7%' },
              { label: 'Habitat Tumbuh', value: 'Dapat tumbuh di dataran rendah hingga menengah, lebih tahan hama' }
            ]
          }
        ]
      },
      highlights: [
        'Tumbuh di lahan pegunungan yang cocok untuk kopi',
        'Rasa halus dan aroma menarik',
        'Mendukung ekonomi petani lokal'
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
      slug: 'jeruk-siam-madu',
      title: 'Jeruk',
      subtitle: 'Jeruk manis unik dengan aroma harum khas',
      image: 'assets/images/produk-jeruk siam madu.png',
      description: 'Jeruk Siam memadukan rasa manis dan aroma wangi, ideal sebagai buah segar dan bahan minuman sehat.' ,
      shortDescription: 'Jeruk Siam Desa Belok/Sidan memiliki rasa manis dominan dengan aroma harum yang khas, kulit tipis mudah dikupas, dan tekstur daging buah yang lembut berair.',
      nutritionItems: [
        {
          title: 'Sumber Vitamin C Alami',
          description: 'Kandungan vitamin C yang tinggi mendukung sistem kekebalan tubuh.'
        },
        {
          title: 'Rendah Kalori',
          description: 'Cocok dikonsumsi sebagai camilan sehat karena kandungan kalorinya yang rendah.'
        },
        {
          title: 'Mengandung Folat',
          description: 'Kandungan folat pada jeruk mendukung pembentukan sel darah merah yang sehat.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 38 hektar lahan perkebunan Jeruk Siam dikelola oleh petani setempat.',
        distribution: 'Sebaran tanaman terkonsentrasi di dusun-dusun dengan ketinggian sedang dan paparan sinar matahari yang cukup.',
        soilClimate: 'Tanah subur dengan pH seimbang serta iklim sejuk dan curah hujan merata mendukung rasa manis khas Jeruk Siam.'
      },
      varietyComparison: {
        title: 'Perbandingan Jenis Jeruk Siam',
        description: 'Perbandingan antara Jeruk Siam biasa dan Jeruk Siam Madu.',
        variants: [
          {
            name: 'Jeruk Siam',
            attributes: [
              { label: 'Rasa', value: 'Manis dominan dengan aroma harum khas' },
              { label: 'Bentuk & Tekstur', value: 'Kulit tipis dan mudah dikupas, daging lembut' },
              { label: 'Warna', value: 'Kulit oranye cerah merata' },
              { label: 'Ciri Khas', value: 'Praktis dikonsumsi langsung sebagai buah meja' }
            ]
          },
          {
            name: 'Jeruk Siam Madu',
            attributes: [
              { label: 'Rasa', value: 'Manis dominan dengan aroma harum khas' },
              { label: 'Bentuk & Tekstur', value: 'Kulit tipis dan mudah dikupas, daging lembut' },
              { label: 'Warna', value: 'Kulit oranye cerah merata' },
              { label: 'Ciri Khas', value: 'Ukuran lebih kecil, praktis dikonsumsi langsung sebagai buah meja' }
            ]
          }
        ]
      },
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
      shortDescription: 'Padi Desa Belok/Sidan ditanam di lahan sawah subur dengan sistem pengairan yang terjaga, menghasilkan gabah berkualitas sebagai sumber pangan utama masyarakat.',
      nutritionItems: [
        {
          title: 'Sumber Karbohidrat Utama',
          description: 'Padi menjadi sumber energi utama melalui kandungan karbohidrat kompleksnya.'
        },
        {
          title: 'Mengandung Vitamin B',
          description: 'Kandungan vitamin B1 dan B3 mendukung metabolisme energi dalam tubuh.'
        },
        {
          title: 'Sumber Mineral',
          description: 'Beras mengandung mineral seperti magnesium dan fosfor yang penting bagi tubuh.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 150 hektar lahan sawah aktif digunakan untuk budidaya padi di Desa Belok/Sidan.',
        distribution: 'Sawah tersebar mengikuti sistem subak tradisional di dataran dan lembah subur Kecamatan Petang.',
        soilClimate: 'Tanah aluvial yang subur dengan pengairan sawah yang teratur serta iklim tropis mendukung dua kali masa tanam per tahun.'
      },
      varietyComparison: {
        title: 'Beras Putih Pulen vs Beras Merah',
        description: 'Dua jenis beras hasil panen padi desa ini berbeda dari segi rasa, tekstur, dan kandungan gizinya.',
        variants: [
          {
            name: 'Beras Putih Pelita',
            attributes: [
              { label: 'Rasa', value: 'Pulen dan gurih netral, cocok untuk nasi sehari-hari' },
              { label: 'Bentuk & Tekstur', value: 'Butiran putih bersih, tekstur lembut saat matang' },
              { label: 'Warna', value: 'Putih bersih' },
              { label: 'Kandungan', value: 'Karbohidrat tinggi dengan indeks glikemik sedang-tinggi' }
            ]
          },
          {
            name: 'Beras Putih Ciherang',
            attributes: [
              { label: 'Rasa', value: 'Sedikit pera dengan aroma gurih khas (nutty)' },
              { label: 'Bentuk & Tekstur', value: 'Butiran lebih keras dan berserat' },
              { label: 'Warna', value: 'Cokelat kemerahan alami karena kulit ari masih menempel' },
              { label: 'Kandungan', value: 'Kaya serat dan antioksidan, indeks glikemik lebih rendah' }
            ]
          }
        ]
      },
      highlights: [
        'Diproduksi oleh petani setempat',
        'Menjadi sumber pangan utama masyarakat desa',
        'Berperan dalam kedaulatan pangan'
      ]
    },
    {
      slug: 'lemon',
      title: 'Lemon',
      subtitle: 'Buah sitrus segar dan harum',
      image: 'assets/images/produk-lemon.png',
      description: 'Lemon Desa Belok/Sidan memberikan rasa asam segar dan aroma khas, cocok untuk minuman dan olahan kuliner.',
      shortDescription: 'Lemon lokal dengan kulit tipis, sari beraroma, dan kandungan vitamin C tinggi.',
      nutritionItems: [
        { title: 'Sumber Vitamin C', description: 'Kaya vitamin C yang membantu daya tahan tubuh.' },
        { title: 'Antioksidan', description: 'Mengandung senyawa flavonoid yang bersifat antioksidan.' }
      ],
      farmInfo: {
        hectares: 'Sekitar 20 hektar lahan sitrus kecil dikelola oleh petani lokal.',
        distribution: 'Tersebar di beberapa dusun dengan paparan matahari yang baik.',
        soilClimate: 'Tanah subur dan iklim sejuk hingga sedang mendukung pertumbuhan lemon.'
      },
      varietyComparison: {
        title: 'Lemon California',
        description: 'Perbandingan sederhana antara lemon California',
        variants: [
          { name: 'Lemon California', attributes: [ { label: 'Rasa', value: 'Asam segar' }, { label: 'Ciri Khas', value: 'Kulit lebih tipis, aroma tajam' } ] }
        ]
      },
      highlights: [
        'Cocok untuk minuman dan pengawet',
        'Mengandung vitamin C tinggi'
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? 'asparagus';
    this.detail = this.produkDetails.find((item) => item.slug === slug) ?? this.produkDetails[0];
    this.badges = this.buildBadges(this.detail);
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
}
