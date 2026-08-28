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

export interface ProdukGalleryImage {
  url: string;
  label: string;
}

export interface ProdukDetailData {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  galleryImages?: ProdukGalleryImage[];
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
  activeGalleryImage: string = '';
  activeGalleryLabel: string = '';

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
      galleryImages: [
        { url: 'assets/images/produk-asparagus2.png', label: 'Asparagus Segar' },
        { url: 'assets/images/produk-asparagus.png', label: 'Asparagus Grade A' }
      ],
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
        hectares: '120 hektar lahan pertanian aktif dikelola untuk budidaya asparagus di wilayah dataran tinggi Desa Belok/Sidan.',
        distribution: 'Sebaran budidaya tersebar di beberapa dusun dan kawasan pertanian dataran tinggi di Kecamatan Petang, Desa Belok/Sidan, dengan fokus pada area yang memiliki suhu sejuk dan tingkat kelembapan stabil.',
        soilClimate: 'Tanah umumnya bersifat subur dengan tekstur yang baik untuk perakaran tanaman, sementara iklim dingin, curah hujan cukup, dan ketinggian lokasi mendukung pertumbuhan asparagus yang kuat dan berkualitas.'
      },
      varietyComparison: {
        title: 'Asparagus Hijau vs Asparagus Putih',
        description: 'Kedua jenis asparagus ini berasal dari tanaman yang sama, namun metode budidayanya membuat rasa, tekstur, dan tampilannya berbeda.',
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
      slug: 'alpukat',
      title: 'Alpukat',
      subtitle: 'Buah bernutrisi tinggi dengan keunggulan varietas dataran tinggi',
      image: 'assets/images/produk-alpukat.png',
      description: 'Alpukat (Persea americana) merupakan buah yang dikenal memiliki daging lembut dengan kandungan lemak sehat yang tinggi. Buah ini memiliki beragam bentuk, warna kulit, ukuran, dan karakteristik rasa tergantung pada varietasnya. Alpukat dapat dikonsumsi secara langsung maupun diolah menjadi berbagai jenis makanan dan minuman bernilai gizi tinggi.',
      shortDescription: 'Alpukat Desa Belok/Sidan dibudidayakan pada lingkungan yang mendukung pertumbuhan optimal. Varietas Alpukat Hass sangat diunggulkan untuk kawasan dataran tinggi di atas 800 mdpl, sedangkan Alpukat Mentega sangat produktif untuk wilayah dataran yang lebih rendah.',
      nutritionItems: [
        {
          title: 'Kaya Lemak Tak Jenuh',
          description: 'Alpukat merupakan sumber lemak tak jenuh tunggal yang sangat baik untuk menjaga kesehatan jantung dan pembuluh darah.'
        },
        {
          title: 'Sumber Serat Alami',
          description: 'Mengandung serat pangan larut dan tak larut yang membantu menjaga kesehatan saluran pencernaan dan metabolisme tubuh.'
        },
        {
          title: 'Kandungan Vitamin & Mineral',
          description: 'Kaya akan vitamin E, vitamin K, vitamin B kompleks, folat, kalium, dan magnesium yang dibutuhkan tubuh setiap hari.'
        },
        {
          title: 'Antioksidan Karotenoid',
          description: 'Mengandung antioksidan lutein dan zeaksantin yang berperan penting dalam memelihara kesehatan mata dan jaringan sel.'
        }
      ],
      farmInfo: {
        hectares: '35 hektar lahan perkebunan alpukat dikelola oleh petani di Desa Belok/Sidan.',
        distribution: 'Tanaman alpukat tersebar di Banjar Bon, Banjar Jempanang, Sekarmukti, Lawak, dan Belok.',
        soilClimate: 'Tanah subur berdrainase baik dengan paparan sinar matahari cukup serta iklim dataran sejuk mendukung pertumbuhan tanaman dan pembentukan buah alpukat berkualitas.'
      },
      varietyComparison: {
        title: 'Alpukat Mentega vs Alpukat Hass',
        description: 'Perbandingan varietas Alpukat Mentega dan Alpukat Hass mencakup lima aspek utama: ketinggian tempat tumbuh, tekstur buah, karakteristik tanaman dan buah, khasiat atau kandungan, serta kondisi lingkungan yang sesuai.',
        variants: [
          {
            name: 'Alpukat Mentega',
            tagline: 'Varietas dengan daging buah tebal, pulen, dan legit untuk dataran menengah-rendah',
            attributes: [
              {
                label: 'Ketinggian Tempat Tumbuh',
                value: 'Lebih sesuai dan tumbuh produktif pada kondisi dataran yang lebih rendah hingga menengah.'
              },
              {
                label: 'Tekstur Buah',
                value: 'Daging buah lembut, halus, padat, pulen (creamy mentega), dan bersih tanpa serat kasar ketika matang.'
              },
              {
                label: 'Karakteristik Tanaman & Buah',
                value: 'Pohon berkanopi rimbun; buah berbentuk bulat oval memanjang dengan kulit mulus berwarna hijau yang berubah hijau kekuningan atau keunguan saat matang sempurna.'
              },
              {
                label: 'Khasiat atau Kandungan',
                value: 'Kaya akan asam lemak tak jenuh tunggal yang menyehatkan jantung, vitamin E, vitamin A, folat, serta serat pangan tinggi.'
              },
              {
                label: 'Kondisi Lingkungan yang Sesuai',
                value: 'Membutuhkan tanah gembur subur dengan drainase lancar dan paparan sinar matahari cukup di kawasan dataran rendah-menengah.'
              }
            ]
          },
          {
            name: 'Alpukat Hass',
            tagline: 'Varietas premium dataran tinggi dengan cita rasa gurih dan kaya minyak alami',
            attributes: [
              {
                label: 'Ketinggian Tempat Tumbuh',
                value: 'Ditonjolkan sebagai varietas yang menghasilkan kualitas sangat baik pada dataran tinggi, terutama pada ketinggian sekitar 800 mdpl ke atas.'
              },
              {
                label: 'Tekstur Buah',
                value: 'Daging buah sangat lembut, bermentega pekat, dengan kandungan minyak alami yang relatif tinggi dan cita rasa gurih khas (nutty flavour).'
              },
              {
                label: 'Karakteristik Tanaman & Buah',
                value: 'Ukuran buah berkisar 200–300 gram berbentuk bulat pir, dengan kulit khas bertekstur kasar/berkerikil yang berubah warna menjadi ungu kehitaman ketika matang sempurna.'
              },
              {
                label: 'Khasiat atau Kandungan',
                value: 'Mengandung antioksidan tinggi (lutein, karotenoid), vitamin K, asam folat, kalium, dan lemak tak jenuh rantai tunggal untuk perlindungan kardiovaskular.'
              },
              {
                label: 'Kondisi Lingkungan yang Sesuai',
                value: 'Sangat cocok pada udara sejuk dataran tinggi dengan drainase tanah yang baik, sinar matahari cukup, dan kelembapan stabil khas Belok/Sidan.'
              }
            ]
          }
        ]
      },
      highlights: [
        'Alpukat Hass menghasilkan kualitas terbaik pada dataran tinggi di atas 800 mdpl',
        'Alpukat Mentega sangat produktif dan sesuai untuk kondisi dataran yang lebih rendah',
        'Luas budidaya mencapai 35 hektar di wilayah Desa Belok/Sidan',
        'Perbandingan varietas mencakup ketinggian, tekstur, karakteristik buah, khasiat, dan lingkungan',
        'Kaya akan asam lemak tak jenuh tunggal, vitamin E, dan antioksidan alami'
      ]
    },
    {
      slug: 'bunga-gemitir',
      title: 'Bunga Gemitir',
      subtitle: 'Bunga sarana upacara, persembahyangan, dan tradisi budaya Bali',
      image: 'assets/images/produk-bunga-gemitir.png',
      description: 'Bunga Gemitir (Tagetes / Marigold) merupakan komoditas bunga yang memiliki arti sangat penting dalam kehidupan masyarakat Bali. Bunga ini dimanfaatkan secara luas sebagai sarana persembahyangan, pembuatan canang sari, banten sesajen, upacara adat, perayaan hari raya keagamaan, serta hiasan dan dekorasi kegiatan desa maupun kegiatan masyarakat lainnya.',
      shortDescription: 'Bunga Gemitir di Desa Belok/Sidan memiliki dua varietas unggulan yaitu Bunga Antasena dan Bunga Garuda. Luas budidaya bunga gemitir tidak bersifat tetap (fluktuatif) karena petani menyesuaikan intensitas penanaman dengan kebutuhan hari raya keagamaan, upacara adat, dan kegiatan masyarakat.',
      nutritionItems: [
        {
          title: 'Sarana Persembahyangan Utama',
          description: 'Menjadi komponen esensial dalam ritual sembahyang harian umat Hindu di Bali, canang sari, dan aneka banten persembahan.'
        },
        {
          title: 'Upacara Adat & Hari Raya Keagamaan',
          description: 'Kebutuhan meningkat drastis menjelang hari raya Galungan, Kuningan, Nyepi, piodalan pura, dan rangkaian upacara adat desa.'
        },
        {
          title: 'Dekorasi Kegiatan Desa & Masyarakat',
          description: 'Warna kuning dan oranye yang cerah menjadikannya pilihan utama untuk hiasan gapura, dekorasi panggung, dan acara adat kemasyarakatan.'
        },
        {
          title: 'Kandungan Lutein Alami',
          description: 'Kelopak bunga gemitir mengandung pigmen alami lutein yang berpotensi dimanfaatkan dalam industri pakan alami dan kesehatan.'
        }
      ],
      farmInfo: {
        hectares: 'Luas budidaya bunga gemitir tidak bersifat tetap (fluktuatif). Petani cenderung meningkatkan penanaman ketika mendekati hari raya, upacara adat, maupun kegiatan desa lainnya sehingga disajikan sebagai data yang bervariasi mengikuti musim kegiatan.',
        distribution: 'Budidaya bunga gemitir banyak terdapat di Banjar Sekarmukti, Lawak, Belok, Selantang, dan Sidan.',
        soilClimate: 'Tumbuh subur pada berbagai jenis tanah gembur dengan drainase baik serta membutuhkan penyinaran sinar matahari penuh agar menghasilkan mahkota bunga lebat.'
      },
      varietyComparison: {
        title: 'Bunga Antasena vs Bunga Garuda',
        description: 'Bunga Gemitir di Desa Belok/Sidan memiliki dua varietas yang dibudidayakan oleh petani, yaitu Bunga Antasena dan Bunga Garuda. Perbedaan utama kedua varietas terletak pada warna bunga dan tinggi tanaman, sedangkan pemanfaatannya pada dasarnya tetap sama.',
        variants: [
          {
            name: 'Bunga Antasena',
            tagline: 'Varietas gemitir dengan warna kuning keemasan yang cerah dan tajuk kompak',
            attributes: [
              {
                label: 'Warna Bunga',
                value: 'Bunga berwarna kuning cerah hingga kuning keemasan yang berkilau terang.'
              },
              {
                label: 'Tinggi Tanaman',
                value: 'Postur tanaman relatif sedang dan kompak dengan percabangan rimbun.'
              },
              {
                label: 'Karakteristik Bunga',
                value: 'Kelopak bunga padat, mekar serentak, dan memiliki ketahanan simpan yang baik pascapanen.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Sarana persembahyangan harian, canang sari, banten sesajen, upacara adat, hari raya keagamaan, serta dekorasi kegiatan desa.'
              }
            ]
          },
          {
            name: 'Bunga Garuda',
            tagline: 'Varietas gemitir dengan warna oranye pekat dan mahkota bunga tebal',
            attributes: [
              {
                label: 'Warna Bunga',
                value: 'Bunga berwarna jingga menyala hingga oranye pekat yang tebal dan mencolok.'
              },
              {
                label: 'Tinggi Tanaman',
                value: 'Postur tanaman cenderung lebih tinggi, tegak, dan batang lebih kokoh.'
              },
              {
                label: 'Karakteristik Bunga',
                value: 'Ukuran bunga besar dan bervolume tebal dengan susunan mahkota rapat.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Sarana persembahyangan harian, canang sari, banten sesajen, upacara adat, hari raya keagamaan, serta dekorasi kegiatan desa.'
              }
            ]
          }
        ]
      },
      highlights: [
        'Komoditas bunga utama untuk sarana persembahyangan dan upacara adat di Bali',
        'Digunakan luas untuk canang sari, banten sesajen, dan dekorasi kegiatan desa',
        'Memiliki dua varietas unggulan: Bunga Antasena (kuning) dan Bunga Garuda (oranye)',
        'Luas budidaya bersifat fluktuatif mengikuti siklus hari raya dan upacara adat',
        'Perbedaan utama kedua varietas terletak pada warna bunga dan tinggi tanaman'
      ]
    },
    {
      slug: 'cabai',
      title: 'Cabai',
      subtitle: 'Komoditas hortikultura sayuran strategis Desa Belok/Sidan',
      image: 'assets/images/produk-cabai besar.png',
      galleryImages: [
        { url: 'assets/images/produk-cabai besar.png', label: 'Cabai Besar' },
        { url: 'assets/images/produk-cabai rawit.png', label: 'Cabai Rawit' }
      ],
      description: 'Cabai merupakan salah satu komoditas hortikultura sayuran utama yang dibudidayakan oleh masyarakat Desa Belok/Sidan. Pembahasan komoditas cabai dibedakan secara tegas menjadi Cabai Besar dan Cabai Rawit, dengan keunikan sebaran wilayah, penanganan budidaya, serta karakteristik tingkat kepedasannya masing-masing.',
      shortDescription: 'Cabai Besar banyak dibudidayakan di Banjar Bon, sedangkan Cabai Rawit ditanam merata di seluruh banjar di Desa Belok/Sidan. Keduanya memiliki peranan penting dalam kebutuhan konsumsi pangan sehari-hari dan bumbu dapur khas Nusantara.',
      nutritionItems: [
        {
          title: 'Kandungan Capsaicin Alami',
          description: 'Capsaicin merupakan senyawa bioaktif pemberi rasa pedas khas yang membantu meningkatkan metabolisme dan sirkulasi darah.'
        },
        {
          title: 'Tinggi Vitamin C & A',
          description: 'Cabai segar mengandung kadar vitamin C dan vitamin A tinggi yang berperan sebagai antioksidan alami pelindung daya tahan tubuh.'
        },
        {
          title: 'Antioksidan Karotenoid',
          description: 'Pigmen merah pada cabai kaya akan kapsantin dan lutein yang baik untuk menangkal radikal bebas.'
        }
      ],
      farmInfo: {
        largeChili: {
          title: 'Budidaya Cabai Besar',
          hectares: 'Data luas budidaya cabai besar disajikan secara khusus berdasarkan data petani dan perkebunan cabai besar di Desa Belok/Sidan.',
          distribution: 'Cabai besar banyak dibudidayakan secara terpusat oleh petani di Banjar Bon.',
          soilClimate: 'Membutuhkan tanah gembur subur dengan drainase optimal, pasokan air terkontrol, dan penyinaran matahari penuh.'
        },
        birdEyeChili: {
          title: 'Budidaya Cabai Rawit',
          hectares: 'Data luas budidaya cabai rawit disajikan secara terpisah berdasarkan data petani dan perkebunan cabai rawit di Desa Belok/Sidan.',
          distribution: 'Cabai rawit dibudidayakan di seluruh banjar (9 banjar) di wilayah Desa Belok/Sidan.',
          soilClimate: 'Tumbuh adaptif di berbagai kondisi lahan kebun maupun pekarangan warga dengan paparan sinar matahari memadai.'
        }
      },
      varietyComparison: {
        title: 'Cabai Besar vs Cabai Rawit',
        description: 'Cabai Besar dan Cabai Rawit merupakan dua jenis cabai yang dibudidayakan di Desa Belok/Sidan. Keduanya memiliki perbedaan signifikan pada ukuran buah, bentuk, tingkat kepedasan, dan konsentrasi sebaran wilayahnya.',
        variants: [
          {
            name: 'Cabai Besar',
            tagline: 'Ukuran buah besar dengan daging tebal dan kepedasan sedang, banyak di Banjar Bon',
            attributes: [
              {
                label: 'Ukuran & Bentuk',
                value: 'Buah berukuran panjang dan silindris relatif besar dengan dinding daging buah yang tebal.'
              },
              {
                label: 'Tingkat Kepedasan',
                value: 'Tingkat kepedasan sedang dengan rasa segar yang dominan.'
              },
              {
                label: 'Sebaran Wilayah di Desa',
                value: 'Banyak dibudidayakan secara intensif oleh petani di Banjar Bon.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Bahan masakan harian, tumisan, sambal merah besar, saus, dan industri olahan pangan.'
              },
              {
                label: 'Pengelolaan Kebun',
                value: 'Dikelola secara khusus dalam bedengan perkebunan terpusat dengan data budidaya mandiri.'
              }
            ]
          },
          {
            name: 'Cabai Rawit',
            tagline: 'Ukuran buah kecil dengan kepedasan sangat tinggi, ditanam di seluruh banjar',
            attributes: [
              {
                label: 'Ukuran & Bentuk',
                value: 'Buah berukuran kecil memanjang dengan ujung runcing dan kulit mengilap.'
              },
              {
                label: 'Tingkat Kepedasan',
                value: 'Tingkat kepedasan sangat tinggi dan tajam khas cabai rawit.'
              },
              {
                label: 'Sebaran Wilayah di Desa',
                value: 'Dibudidayakan secara merata di seluruh banjar di Desa Belok/Sidan.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Bahan sambal ulek, bumbu rempah pedas, pelengkap lalapan/gorengan, dan bumbu dapur harian.'
              },
              {
                label: 'Pengelolaan Kebun',
                value: 'Dibudidayakan di berbagai tipe lahan perkebunan dan pekarangan warga di seluruh banjar.'
              }
            ]
          }
        ]
      },
      highlights: [
        'Cabai Besar banyak dibudidayakan secara terfokus di Banjar Bon',
        'Cabai Rawit ditanam merata di seluruh banjar Desa Belok/Sidan',
        'Data budidaya petani cabai besar dan cabai rawit disajikan secara terpisah',
        'Dilengkapi dokumentasi visual Cabai Besar dan Cabai Rawit',
        'Mengandung capsaicin dan vitamin C tinggi sebagai bumbu dapur bernilai ekonomi'
      ]
    },
    {
      slug: 'durian',
      title: 'Durian',
      subtitle: 'Komoditas buah bernilai tinggi dengan sentra budidaya di Banjar Selantang',
      image: 'assets/images/produk-durian.png',
      description: 'Durian merupakan salah satu komoditas buah yang dibudidayakan di Desa Belok/Sidan. Potensi durian terutama terdapat di Banjar Selantang, sedangkan Banjar Bon tidak memiliki potensi durian sehingga tidak dimasukkan dalam wilayah sebaran. Beberapa jenis durian yang terdapat di wilayah Belok/Sidan antara lain Durian Black Thorn, Durian Kane, Durian Musang King, dan durian lokal.',
      shortDescription: 'Durian Kane menjadi varietas yang lebih populer di Belok/Sidan dibandingkan Musang King karena dinilai dapat tumbuh secara relatif stabil pada berbagai kondisi ketinggian. Durian Musang King tergolong varietas yang relatif baru masuk ke wilayah Belok/Sidan, berdampingan dengan Durian Black Thorn dan durian lokal.',
      nutritionItems: [
        {
          title: 'Sumber Energi Alami',
          description: 'Durian mengandung karbohidrat dan gula alami yang cepat diserap tubuh sebagai sumber energi.'
        },
        {
          title: 'Kaya Vitamin B Kompleks',
          description: 'Mengandung vitamin B (niasin, riboflavin, folat) yang mendukung fungsi saraf dan metabolisme sel.'
        },
        {
          title: 'Serat Makanan Alami',
          description: 'Daging buah durian mengandung serat pangan yang membantu memperlancar sistem pencernaan.'
        },
        {
          title: 'Kandungan Mineral & Antioksidan',
          description: 'Mengandung kalium, tembaga, vitamin C, serta polifenol yang berperan dalam menangkal oksidasi sel.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya durian dicatat berdasarkan luasan kebun produktif yang dikembangkan oleh petani di desa.',
        distribution: 'Potensi durian terutama terdapat di Banjar Selantang. Banjar Bon tidak memiliki potensi durian sehingga tidak dimasukkan sebagai wilayah sebaran durian.',
        soilClimate: 'Tanaman durian membutuhkan lahan dengan drainase baik, ketersediaan air yang cukup, serta iklim mikro dataran yang mendukung pembungaan dan pembuahan optimal.'
      },
      varietyComparison: {
        title: 'Durian Lokal vs Durian Kane',
        description: 'Durian Lokal dan Durian Kane merupakan dua jenis yang menjadi perbandingan utama dalam budidaya durian di wilayah Belok/Sidan. Durian Kane menjadi varietas yang lebih populer karena terbukti mampu tumbuh stabil pada berbagai tingkat ketinggian dan menghasilkan buah berkualitas tinggi.',
        variants: [
          {
            name: 'Durian Lokal',
            tagline: 'Durian khas kebun warga dengan karakter rasa alami yang kaya dan bervariasi',
            attributes: [
              {
                label: 'Karakteristik Tanaman',
                value: 'Pohon berukuran besar dengan sistem perakaran kuat, dibudidayakan secara turun-temurun oleh masyarakat.'
              },
              {
                label: 'Cita Rasa',
                value: 'Karakter rasa bervariasi khas durian lokal, mulai dari manis legit hingga kombinasi manis berpadu gurih dan sedikit pahit lembut.'
              },
              {
                label: 'Tekstur Buah',
                value: 'Tekstur daging buah bervariasi dari lembut berserat halus hingga creamy sesuai karakteristik pohon induknya.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Dikonsumsi secara langsung sebagai buah meja segar dan memenuhi kebutuhan konsumsi masyarakat lokal.'
              }
            ]
          },
          {
            name: 'Durian Kane',
            tagline: 'Varietas unggulan terpopuler di Belok/Sidan dengan buah besar dan daging tebal',
            attributes: [
              {
                label: 'Tingkat Popularitas',
                value: 'Menjadi varietas yang lebih populer di Belok/Sidan dibandingkan Musang King.'
              },
              {
                label: 'Karakteristik Tanaman',
                value: 'Memiliki karakter pohon yang relatif kompak/kecil namun sangat produktif.'
              },
              {
                label: 'Karakteristik Buah',
                value: 'Dikenal mampu menghasilkan buah berukuran besar dengan daging buah tebal, bertekstur legit, biji kempes, dan rasa manis mantap.'
              },
              {
                label: 'Kondisi Tumbuh',
                value: 'Dinilai dapat tumbuh secara relatif stabil pada berbagai kondisi ketinggian di wilayah Desa Belok/Sidan.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Komoditas buah unggulan bernilai jual tinggi untuk pasar buah segar lokal dan wisatawan.'
              }
            ]
          }
        ]
      },
      highlights: [
        'Potensi budidaya durian terutama terdapat di Banjar Selantang',
        'Durian Kane lebih populer di Belok/Sidan karena tumbuh relatif stabil pada berbagai ketinggian',
        'Varietas di Belok/Sidan meliputi Durian Black Thorn, Durian Kane, Musang King, dan Durian Lokal',
        'Durian Musang King tergolong varietas yang relatif baru masuk ke Belok/Sidan',
        'Banjar Bon tidak dimasukkan dalam wilayah sebaran durian karena tidak memiliki potensi budidaya'
      ]
    },
    {
      slug: 'jeruk',
      title: 'Jeruk',
      subtitle: 'Komoditas andalan utama desa dengan beragam varietas unggul',
      image: 'assets/images/produk-jeruk siam madu.png',
      galleryImages: [
        { url: 'assets/images/produk-jeruk siam madu.png', label: 'Jeruk Siam Madu' },
        { url: 'assets/images/produk-jeruk brastagi.png', label: 'Jeruk Berastagi' }
      ],
      description: 'Jeruk merupakan salah satu komoditas andalan Desa Belok/Sidan. Varietas jeruk yang terdapat di wilayah ini meliputi Jeruk Siam, Jeruk Berastagi, Jeruk Selayak, Jeruk RGL, dan Jeruk Siam Madu. Produksi jeruk di Desa Belok/Sidan saat ini dinilai memiliki keunggulan rasa manis segar dan kualitas buah dibandingkan produksi jeruk di Kintamani.',
      shortDescription: 'Jeruk menjadi komoditas utama dengan total luas budidaya mencapai 267.000 pohon atau setara dengan 267 hektar. Sebaran budidaya berpusat di Banjar Bon, Banjar Jempanang, Sekarmukti, Belok, dan Lawak.',
      nutritionItems: [
        {
          title: 'Sumber Vitamin C Tinggi',
          description: 'Satu buah jeruk mencukupi kebutuhan harian vitamin C untuk memperkuat sistem kekebalan tubuh.'
        },
        {
          title: 'Kaya Kandungan Air Alami',
          description: 'Kandungan air yang melimpah memberikan efek hidrasi yang menyegarkan bagi tubuh.'
        },
        {
          title: 'Serat Pektin Alami',
          description: 'Mengandung serat larut pektin yang membantu menjaga keseimbangan kolesterol dan kesehatan pencernaan.'
        },
        {
          title: 'Bioflavonoid Hesperidin',
          description: 'Mengandung hesperidin dan naringenin yang memiliki aktivitas antioksidan dan pelindung pembuluh darah.'
        }
      ],
      farmInfo: {
        hectares: 'Total luas budidaya jeruk: 267.000 pohon atau setara dengan 267 ha.',
        distribution: 'Budidaya jeruk banyak terdapat di wilayah: Banjar Bon, Banjar Jempanang, Sekarmukti, Belok, dan Lawak.',
        soilClimate: 'Karakteristik tanah dan iklim yang mendukung budidaya pada jenis-jenis jeruk tersebut pada dasarnya relatif sama (tanah subur berdrainase baik dengan iklim sejuk dataran tinggi).'
      },
      varietyComparison: {
        title: 'Perbandingan 4 Varietas Jeruk Unggulan',
        description: 'Perbandingan dibuat menjadi empat jenis utama: Jeruk Siam, Jeruk Siam Madu, Jeruk Selayak, dan Jeruk RGL. Masing-masing memiliki ciri fisik dan keunggulan rasa tersendiri.',
        variants: [
          {
            name: 'Jeruk Siam',
            tagline: 'Jeruk konsumsi populer dengan kulit tipis dan bulir air melimpah',
            attributes: [
              {
                label: 'Karakteristik Buah',
                value: 'Kulit relatif tipis dan mudah dikupas saat matang dengan bulir daging buah yang sangat berair.'
              },
              {
                label: 'Cita Rasa',
                value: 'Rasa manis segar dengan keasaman seimbang yang menjadikannya jeruk konsumsi favorit.'
              },
              {
                label: 'Ciri Tanah & Iklim',
                value: 'Tumbuh subur pada tanah lempung gembur dengan pengairan memadai di dataran Belok/Sidan.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Buah meja segar, bahan perasan jus buah murni, dan pasokan pasar buah regional.'
              }
            ]
          },
          {
            name: 'Jeruk Siam Madu',
            tagline: 'Cita rasa manis legit khas madu dengan kulit halus berkilau',
            attributes: [
              {
                label: 'Karakteristik Buah',
                value: 'Bentuk bulat simetris, kulit halus mengilap, dan aroma manis yang khas.'
              },
              {
                label: 'Cita Rasa',
                value: 'Rasa manis legit menyerupai madu dengan tingkat keasaman yang sangat rendah.'
              },
              {
                label: 'Ciri Tanah & Iklim',
                value: 'Karakteristik tanah dan iklim relatif sama dengan varietas jeruk lainnya di wilayah desa.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Buah konsumsi segar premium untuk pasar modern, perhotelan, restoran, dan toko buah.'
              }
            ]
          },
          {
            name: 'Jeruk Selayak',
            tagline: 'Jeruk keprok lokal dengan warna jingga cerah dan rasa manis renyah',
            attributes: [
              {
                label: 'Karakteristik Buah',
                value: 'Karakteristik buah tipe jeruk keprok dengan warna kulit berubah jingga cerah ketika memasuki kematangan.'
              },
              {
                label: 'Cita Rasa',
                value: 'Rasa manis segar khas jeruk keprok dengan bulir padat renyah.'
              },
              {
                label: 'Ciri Tanah & Iklim',
                value: 'Mendukung budidaya optimal pada kondisi tanah dan iklim mikro sentra jeruk Belok/Sidan.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Buah konsumsi segar dan sarana pelengkap banten persembahyangan di Bali.'
              }
            ]
          },
          {
            name: 'Jeruk RGL',
            tagline: 'Jeruk Rimau Gerga Lebong berukuran besar dengan cita rasa manis-asam segar',
            attributes: [
              {
                label: 'Karakteristik Buah',
                value: 'Ukuran buah relatif besar dengan kulit jingga-kuning tebal dan daya simpan yang baik.'
              },
              {
                label: 'Cita Rasa',
                value: 'Karakter rasa segar dengan perpaduan manis kuat dan asam menyegarkan.'
              },
              {
                label: 'Ciri Tanah & Iklim',
                value: 'Sangat cocok dikembangkan pada ketinggian dan iklim sejuk Desa Belok/Sidan.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Komoditas bernilai ekonomi tinggi untuk buah konsumsi segar dan oleh-oleh khas.'
              }
            ]
          }
        ]
      },
      highlights: [
        'Komoditas andalan utama Desa Belok/Sidan',
        'Total luas budidaya 267.000 pohon atau setara dengan 267 hektar',
        'Sebaran utama di Banjar Bon, Banjar Jempanang, Sekarmukti, Belok, dan Lawak',
        'Perbandingan 4 varietas: Jeruk Siam, Jeruk Siam Madu, Jeruk Selayak, dan Jeruk RGL',
        'Kualitas produksi dinilai memiliki keunggulan dibandingkan jeruk Kintamani'
      ]
    },
    {
      slug: 'kopi',
      title: 'Kopi',
      subtitle: 'Komoditas utama andalan dengan keragaman klon Arabika unggul',
      image: 'assets/images/produk-kopi.png',
      description: 'Kopi merupakan salah satu komoditas utama andalan Desa Belok/Sidan yang dibudidayakan secara luas oleh masyarakat. Jenis kopi yang menjadi perbandingan utama adalah Kopi Arabika dan Kopi Robusta. Kopi Arabika dibudidayakan di seluruh banjar di Desa Belok/Sidan dengan keberagaman klon unggulan yang berbeda pada masing-masing wilayah.',
      shortDescription: 'Kopi Arabika dibudidayakan di seluruh banjar dengan 9 klon teridentifikasi: Homasti, Kopyol B1, Kopyol B2, Yellow Bourbon, Yellow Caturra, Kopi Gayo, Sigara Rutang, Lini S 795, dan USDA 762. Kopi Arabika tumbuh optimal pada ketinggian 500 mdpl ke atas, sedangkan Kopi Robusta pada ketinggian 500 mdpl ke bawah.',
      nutritionItems: [
        {
          title: 'Kandungan Kafein Alami',
          description: 'Kafein alami pada biji kopi memberikan efek stimulan yang meningkatkan kewaspadaan, konsentrasi, dan stamina.'
        },
        {
          title: 'Kaya Asam Klorogenat',
          description: 'Asam klorogenat adalah senyawa antioksidan polifenol utama pada kopi yang membantu menangkal stres oksidatif.'
        },
        {
          title: 'Senyawa Bioaktif Alami',
          description: 'Mengandung trigonelin, diterpen (kafestol dan kahweol), serta asam organik yang membentuk aroma dan rasa khas.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya kopi dimasukkan berdasarkan besaran luasan yang telah diperoleh dari data lapangan.',
        distribution: 'Kopi Arabika terdapat di seluruh banjar di Desa Belok/Sidan dengan perbedaan klon yang dibudidayakan pada masing-masing banjar. Kopi Robusta dibudidayakan pada area dataran yang lebih rendah.',
        soilClimate: 'Kopi Arabika umumnya dibudidayakan pada ketinggian 500 mdpl ke atas dengan kondisi iklim sejuk. Kopi Robusta umumnya dibudidayakan pada ketinggian 500 mdpl ke bawah dengan toleransi suhu yang lebih hangat.'
      },
      varietyComparison: {
        title: 'Kopi Arabika vs Kopi Robusta',
        description: 'Kopi Arabika dan Kopi Robusta merupakan dua jenis kopi utama di Belok/Sidan. Kopi Arabika menjadi fokus utama karena dibudidayakan di seluruh banjar dengan variasi klon yang memberikan keunikan cita rasa pada masing-masing wilayah.',
        variants: [
          {
            name: 'Kopi Arabika',
            tagline: 'Kopi spesialti dataran tinggi dengan profil cita rasa kaya dan 9 klon teridentifikasi',
            attributes: [
              {
                label: 'Ketinggian Tempat Tumbuh',
                value: 'Umumnya dibudidayakan pada ketinggian 500 mdpl ke atas di kawasan dataran tinggi yang sejuk.'
              },
              {
                label: 'Sebaran Wilayah',
                value: 'Dibudidayakan di seluruh banjar (9 banjar) di Desa Belok/Sidan dengan karakteristik klon berbeda antarwilayah.'
              },
              {
                label: 'Klon yang Teridentifikasi',
                value: 'Homasti, Kopyol B1, Kopyol B2, Yellow Bourbon, Yellow Caturra, Kopi Gayo, Sigara Rutang, Lini S 795, dan USDA 762.'
              },
              {
                label: 'Karakteristik Rasa & Biji',
                value: 'Biji berbentuk lonjong dengan celah tengah berlekuk; cita rasa kompleks, beraroma harum floral/fruity dengan keasaman segar.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Kopi spesialti (specialty coffee) bernilai ekonomi tinggi untuk pasar kedai kopi, roastery, dan ekspor.'
              }
            ]
          },
          {
            name: 'Kopi Robusta',
            tagline: 'Kopi dataran rendah-menengah dengan rasa mantap, body tebal, dan aroma tajam',
            attributes: [
              {
                label: 'Ketinggian Tempat Tumbuh',
                value: 'Umumnya dibudidayakan pada ketinggian 500 mdpl ke bawah di kawasan yang lebih hangat.'
              },
              {
                label: 'Sebaran Wilayah',
                value: 'Dibudidayakan pada wilayah-wilayah banjar dengan elevasi lebih rendah di Desa Belok/Sidan.'
              },
              {
                label: 'Identifikasi Klon',
                value: 'Klon Robusta belum teridentifikasi secara pasti di lapangan sehingga belum dijabarkan berdasarkan klon.'
              },
              {
                label: 'Karakteristik Rasa & Biji',
                value: 'Biji berbentuk lebih bulat dengan garis tengah lurus; rasa pahit tegas, body tebal, dan kadar kafein lebih tinggi.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Bahan baku kopi bubuk tradisional, kopi tubruk, dan campuran minuman olahan kopi.'
              }
            ]
          }
        ]
      },
      highlights: [
        'Kopi merupakan salah satu komoditas utama Desa Belok/Sidan',
        'Kopi Arabika dibudidayakan di seluruh banjar dengan variasi klon antarwilayah',
        '9 klon Arabika teridentifikasi: Homasti, Kopyol B1/B2, Yellow Bourbon/Caturra, Gayo, Sigara Rutang, Lini S 795, USDA 762',
        'Kopi Arabika optimal pada 500 mdpl ke atas, Robusta pada 500 mdpl ke bawah',
        'Klon Robusta belum teridentifikasi pasti sehingga dicatat secara umum'
      ]
    },
    {
      slug: 'lemon',
      title: 'Lemon',
      subtitle: 'Lemon California segar dengan sebaran terbanyak di Bon dan Lawak',
      image: 'assets/images/produk-lemon.png',
      description: 'Lemon merupakan salah satu komoditas buah sitrus yang dibudidayakan oleh petani di Desa Belok/Sidan. Varietas yang dikembangkan adalah Lemon California, yang dikenal memiliki rasa asam segar, aroma harum kuat, serta kandungan vitamin C dan antioksidan tinggi.',
      shortDescription: 'Lemon California dibudidayakan di Desa Belok/Sidan dengan total luas budidaya 19,25 hektar. Wilayah dengan sebaran lemon terbanyak terdapat di Banjar Bon dan Banjar Lawak.',
      nutritionItems: [
        {
          title: 'Tinggi Vitamin C',
          description: 'Mendukung pembentukan kolagen, imunitas tubuh, dan mempercepat penyerapan zat besi dari makanan.'
        },
        {
          title: 'Mengandung Asam Sitrat Alami',
          description: 'Membantu melancarkan metabolisme energi dan mendukung keseimbangan pH cairan tubuh.'
        },
        {
          title: 'Antioksidan Flavonoid',
          description: 'Kaya flavonoid seperti eriositrin dan hesperidin yang melindungi sel dari stres oksidatif.'
        }
      ],
      farmInfo: {
        hectares: 'Total luas budidaya Lemon California: 19,25 ha.',
        distribution: 'Wilayah dengan sebaran lemon terbanyak: Banjar Bon dan Banjar Lawak.',
        soilClimate: 'Tumbuh optimal pada tanah berdrainase baik, cukup ketersediaan air, dan paparan sinar matahari penuh di wilayah dataran sejuk.'
      },
      varietyComparison: {
        title: 'Karakteristik Lemon California',
        description: 'Lemon California merupakan varietas utama yang dibudidayakan di Desa Belok/Sidan. Buah ini memiliki keunggulan pada kesegaran sari buah dan aroma sitrus yang pekat.',
        variants: [
          {
            name: 'Lemon California',
            tagline: 'Varietas sitrus premium dengan sari buah melimpah dan aroma khas',
            attributes: [
              {
                label: 'Varietas',
                value: 'Lemon California.'
              },
              {
                label: 'Rasa',
                value: 'Rasa asam murni yang sangat segar dan kaya sari buah alami.'
              },
              {
                label: 'Aroma',
                value: 'Aroma sitrus khas yang tajam, harum, dan menyegarkan.'
              },
              {
                label: 'Karakteristik Buah',
                value: 'Kulit buah kuning cerah berpori halus, tebal, dan berair melimpah.'
              },
              {
                label: 'Pusat Sebaran',
                value: 'Banyak dibudidayakan di Banjar Bon dan Banjar Lawak.'
              },
              {
                label: 'Pemanfaatan',
                value: 'Bahan minuman segar, infused water, campuran kuliner, bumbu dapur, dan produk kesehatan/kebugaran.'
              }
            ]
          }
        ]
      },
      highlights: [
        'Varietas unggulan Lemon California',
        'Total luas budidaya mencapai 19,25 hektar',
        'Sebaran terbanyak di Banjar Bon dan Banjar Lawak',
        'Kandungan sari buah melimpah dengan vitamin C tinggi',
        'Bahan favorit untuk minuman segar dan kebutuhan kuliner'
      ]
    },
    {
      slug: 'padi',
      title: 'Padi',
      subtitle: 'Komoditas pangan utama dan potensi pemasaran hasil pertanian desa',
      image: 'assets/images/produk-padi.png',
      description: 'Padi merupakan salah satu komoditas pertanian strategis yang dibudidayakan oleh masyarakat Desa Belok/Sidan. Selain berperan sebagai pemenuhan kebutuhan pangan pokok, komoditas padi tetap dimasukkan dalam pemetaan dan pembahasan potensi wilayah karena memiliki keterkaitan erat dengan kegiatan pemasaran hasil pertanian desa.',
      shortDescription: 'Padi di Desa Belok/Sidan dibudidayakan di empat wilayah: Belok, Lawak, Sidan, dan Penikit dengan total luas budidaya mencapai 100,2 hektar. Petani menerapkan pola dua kali masa tanam dalam setahun dengan varietas Beras Ciherang dan Beras Putih Pelita.',
      nutritionItems: [
        {
          title: 'Sumber Karbohidrat Kompleks',
          description: 'Menjadi sumber energi primer sehari-hari untuk mendukung aktivitas fisik masyarakat.'
        },
        {
          title: 'Kandungan Vitamin B1 & Mineral',
          description: 'Mengandung tiamin (vitamin B1), fosfor, dan magnesium yang bermanfaat untuk metabolisme energi tubuh.'
        },
        {
          title: 'Bebas Gluten Alami',
          description: 'Beras merupakan bahan pangan alami bebas gluten yang aman dan nyaman bagi saluran pencernaan.'
        }
      ],
      farmInfo: {
        hectares: 'Total luas budidaya padi: 100,2 ha.',
        distribution: 'Padi terdapat di: Belok, Lawak, Sidan, Penikit. Wilayah lainnya tidak dimasukkan karena tidak terdapat data atau potensi budidaya padi.',
        soilClimate: 'Didukung lahan sawah berterasering dengan ketersediaan air irigasi yang stabil. Karakteristik iklim dan ketersediaan air mendukung pelaksanaan dua kali masa tanam dalam setahun.'
      },
      varietyComparison: {
        title: 'Beras Ciherang vs Beras Putih Pelita',
        description: 'Beras Ciherang dan Beras Putih Pelita merupakan dua varietas utama yang menjadi perbandingan dalam budidaya padi di Desa Belok/Sidan. Keduanya menghasilkan beras putih berkualitas dengan karakteristik nasi yang disukai masyarakat.',
        variants: [
          {
            name: 'Beras Ciherang',
            tagline: 'Varietas beras putih unggul dengan tekstur nasi pulen dan bersih',
            attributes: [
              {
                label: 'Varietas Padi',
                value: 'Beras putih unggul yang berasal dari varietas padi Ciherang.'
              },
              {
                label: 'Bentuk & Tekstur Nasi',
                value: 'Butir beras ramping bening, menghasilkan nasi pulen, putih bersih, dan tahan lama.'
              },
              {
                label: 'Pola Tanam',
                value: 'Ditanam dalam siklus dua kali masa tanam setahun dengan masa panen relatif genjah.'
              },
              {
                label: 'Pemanfaatan & Pemasaran',
                value: 'Bahan pangan pokok utama keluarga dan komoditas beras konsumsi bernilai jual stabil di pasar.'
              }
            ]
          },
          {
            name: 'Beras Putih Pelita',
            tagline: 'Varietas beras putih lokal tradisional dengan rasa gurih alami',
            attributes: [
              {
                label: 'Varietas Padi',
                value: 'Beras putih yang berasal dari varietas padi Pelita.'
              },
              {
                label: 'Bentuk & Tekstur Nasi',
                value: 'Butir beras agak bulat montok, menghasilkan tekstur nasi lembut, sedikit mekar, dan mengenyangkan.'
              },
              {
                label: 'Pola Tanam',
                value: 'Dapat dibudidayakan dalam pola dua kali masa tanam setahun menyesuaikan jadwal irigasi sawah.'
              },
              {
                label: 'Pemanfaatan & Pemasaran',
                value: 'Bahan pangan pokok harian dan pemenuhan kebutuhan beras masyarakat desa.'
              }
            ]
          }
        ]
      },
      highlights: [
        'Total luas budidaya padi mencapai 100,2 hektar',
        'Sebaran wilayah khusus di Belok, Lawak, Sidan, dan Penikit',
        'Menerapkan pola dua kali masa tanam dalam satu tahun',
        'Perbandingan varietas Beras Ciherang dan Beras Putih Pelita',
        'Terintegrasi dalam pemetaan potensi dan pemasaran hasil pertanian desa'
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? 'asparagus';
    this.detail = this.produkDetails.find((item) => item.slug === slug) ?? this.createAdditionalDetail(slug);
    this.badges = this.buildBadges(this.detail);

    if (this.detail.galleryImages && this.detail.galleryImages.length > 0) {
      this.activeGalleryImage = this.detail.galleryImages[0].url;
      this.activeGalleryLabel = this.detail.galleryImages[0].label;
    } else {
      this.activeGalleryImage = this.detail.image;
      this.activeGalleryLabel = this.detail.title;
    }
  }

  selectGalleryImage(url: string, label: string): void {
    this.activeGalleryImage = url;
    this.activeGalleryLabel = label;
  }

  private createAdditionalDetail(slug: string): ProdukDetailData {
    const produk = PRODUK_LIST.find((item) => item.link === `/produk/${slug}`);
    const title = produk?.title ?? 'Produk Desa Belok/Sidan';
    const distribution = produk?.banjar.length
      ? produk.banjar
      .map((banjar) => BANJAR_LABELS[banjar].replace('Banjar Dinas ', ''))
      .join(', ')
      : 'Berdasarkan data potensi wilayah Desa Belok/Sidan';

    // Spesifikasi data khusus sesuai notulensi rapat untuk komoditas hortikultura buah & perkebunan lainnya
    if (slug === 'pisang') {
      return {
        slug,
        title: 'Pisang',
        subtitle: 'Potensi komoditas buah hortikultura Desa Belok/Sidan',
        image: produk?.image ?? 'assets/images/produk-pisang.png',
        description: 'Pisang merupakan salah satu komoditas hortikultura buah yang dibudidayakan oleh masyarakat di Desa Belok/Sidan. Dengan jumlah budidaya mencapai 64.000 rumpun, pisang menjadi komoditas penting untuk konsumsi buah segar keluarga, bahan kuliner tradisional, sarana upacara keagamaan di Bali, serta pemasaran buah lokal.',
        shortDescription: 'Pisang dibudidayakan dengan jumlah mencapai 64.000 rumpun di Desa Belok/Sidan sebagai komoditas hortikultura buah yang bernilai pangan dan tradisi.',
        farmInfo: {
          hectares: 'Jumlah budidaya: 64.000 rumpun.',
          distribution: 'Ditanam di berbagai kebun pekarangan dan lahan pertanian masyarakat Desa Belok/Sidan.',
          soilClimate: 'Tumbuh subur pada tanah lembap gembur dengan ketersediaan air yang baik di iklim dataran Belok/Sidan.'
        },
        highlights: [
          'Jumlah budidaya mencapai 64.000 rumpun',
          'Termasuk komoditas hortikultura buah unggulan',
          'Pemanfaatan untuk konsumsi harian dan sarana upacara adat'
        ]
      };
    }

    if (slug === 'kelapa') {
      return {
        slug,
        title: 'Kelapa',
        subtitle: 'Komoditas tanaman perkebunan multiguna khas pedesaan',
        image: produk?.image ?? 'assets/images/produk-kelapa.png',
        description: 'Kelapa merupakan komoditas tanaman perkebunan yang memiliki peranan penting dan nilai multiguna di Desa Belok/Sidan. Komoditas ini mencakup varietas Kelapa Dalam dan Kelapa Genjah, yang dimanfaatkan secara luas sebagai bahan baku minyak kelapa (VCO), bahan kuliner, sarana upacara keagamaan adat Bali, serta pemanfaatan produk turunan seperti sabut dan tempurung kelapa.',
        shortDescription: 'Kelapa di Desa Belok/Sidan mencakup varietas Kelapa Dalam dan Kelapa Genjah dengan pemanfaatan luas untuk bahan pangan, minyak, dan perlengkapan sarana upacara adat.',
        farmInfo: {
          hectares: 'Data luas budidaya kelapa dicatat berdasarkan data survei lapangan kebun masyarakat.',
          distribution: 'Tersebar di wilayah-wilayah perkebunan masyarakat Desa Belok/Sidan.',
          soilClimate: 'Membutuhkan tanah subur dengan aerasi baik dan penyinaran matahari penuh.'
        },
        varietyComparison: {
          title: 'Kelapa Dalam vs Kelapa Genjah',
          description: 'Kelapa di Desa Belok/Sidan terdiri atas dua varietas utama dengan karakteristik postur tanaman dan pemanfaatan yang saling melengkapi.',
          variants: [
            {
              name: 'Kelapa Dalam',
              tagline: 'Pohon tinggi berumur panjang dengan produksi kopra dan minyak kelapa tinggi',
              attributes: [
                { label: 'Karakteristik Tanaman', value: 'Pohon berbatang tinggi kokoh dengan usia produktif puluhan tahun.' },
                { label: 'Karakteristik Buah', value: 'Buah berukuran relatif besar dengan daging buah tebal dan kadar minyak tinggi.' },
                { label: 'Pemanfaatan', value: 'Bahan pembuatan minyak kelapa tradisional/VCO, santan masakan, dan bahan bangunan.' }
              ]
            },
            {
              name: 'Kelapa Genjah',
              tagline: 'Pohon berpostur pendek/sedang yang cepat berbuah dan lebat',
              attributes: [
                { label: 'Karakteristik Tanaman', value: 'Pohon relatif pendek dan mulai berbuah pada usia tanaman yang lebih dini.' },
                { label: 'Karakteristik Buah', value: 'Buah lebat dalam jumlah banyak, sangat diminati untuk air kelapa muda.' },
                { label: 'Pemanfaatan', value: 'Minuman kelapa muda segar dan sarana utama kelapa upakara/banten adat Bali.' }
              ]
            }
          ]
        },
        highlights: [
          'Meliputi varietas Kelapa Dalam dan Kelapa Genjah',
          'Pemanfaatan sebagai bahan minyak kelapa, kuliner, dan sarana adat',
          'Bagian dari potensi tanaman perkebunan Desa Belok/Sidan'
        ]
      };
    }

    if (slug === 'gula-aren') {
      return {
        slug,
        title: 'Gula Aren',
        subtitle: 'Produk olahan nira pohon aren (nao) khas Desa Belok/Sidan',
        image: produk?.image ?? 'assets/images/produk-gula aren.png',
        description: 'Pohon Nao (Aren / Enau) merupakan tanaman perkebunan bernilai ekonomi tinggi di Desa Belok/Sidan. Nira manis yang disadap dari pohon nao diolah secara tradisional menjadi gula aren murni berkualitas tinggi dengan aroma harum dan rasa manis alami khas pedesaan.',
        shortDescription: 'Gula aren Desa Belok/Sidan diproduksi secara tradisional dari sadapan nira pohon nao (aren) yang tumbuh di lereng dan perkebunan desa.',
        farmInfo: {
          hectares: 'Data luas budidaya dan sebaran pohon nao dicatat berdasarkan populasi tegakan pohon produktif di desa.',
          distribution: 'Tumbuh di lereng-lereng perbukitan dan area perkebunan alami masyarakat.',
          soilClimate: 'Tumbuh optimal di kawasan perbukitan dataran sejuk dengan kelembapan tanah yang baik.'
        },
        highlights: [
          'Dihasilkan dari sadapan nira segar pohon nao (aren)',
          'Diolah secara tradisional tanpa bahan kimia tambahan',
          'Memiliki cita rasa manis legit dan aroma karamel khas'
        ]
      };
    }

    return {
      slug,
      title,
      subtitle: `Potensi komoditas ${title} Desa Belok/Sidan`,
      image: produk?.image ?? 'assets/images/produk-sayur hortikultura.png',
      description: `${title} merupakan bagian dari potensi wilayah Desa Belok/Sidan sesuai hasil pembahasan dan revisi data komoditas pertanian. Komoditas ini dibudidayakan oleh masyarakat untuk mendukung keragaman hasil bumi, ketahanan pangan, dan pemasaran hasil pertanian desa.`,
      shortDescription: `${title} termasuk komoditas yang melengkapi peta potensi wilayah Desa Belok/Sidan.`,
      farmInfo: {
        hectares: 'Data luas budidaya disajikan berdasarkan data lapangan yang telah teridentifikasi.',
        distribution: `Sebaran wilayah: ${distribution}.`,
        soilClimate: 'Budidaya disesuaikan dengan kondisi tanah subur, ketersediaan air, dan penyinaran matahari yang mendukung pertumbuhan optimal tanaman.'
      },
      highlights: [
        `Termasuk komoditas ${title} di Desa Belok/Sidan`,
        'Dibudidayakan secara langsung oleh masyarakat desa',
        'Data sebaran mengikuti wilayah yang telah teridentifikasi di lapangan'
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

  activeFarmIndex: number = 0;

  get farmGroups(): ProdukFarmDetail[] {
    if (!this.detail?.farmInfo) return [];
    if (this.detail.farmInfo.largeChili || this.detail.farmInfo.birdEyeChili) {
      const groups: ProdukFarmDetail[] = [];
      if (this.detail.farmInfo.largeChili) {
        groups.push(this.detail.farmInfo.largeChili);
      }
      if (this.detail.farmInfo.birdEyeChili) {
        groups.push(this.detail.farmInfo.birdEyeChili);
      }
      return groups;
    }
    return [];
  }

  setActiveFarm(index: number): void {
    if (index >= 0 && index < this.farmGroups.length) {
      this.activeFarmIndex = index;
    }
  }

  nextFarm(): void {
    if (this.farmGroups.length > 1) {
      this.activeFarmIndex = (this.activeFarmIndex + 1) % this.farmGroups.length;
    }
  }

  prevFarm(): void {
    if (this.farmGroups.length > 1) {
      this.activeFarmIndex = (this.activeFarmIndex - 1 + this.farmGroups.length) % this.farmGroups.length;
    }
  }
}
