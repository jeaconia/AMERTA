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
        hectares: '120 Hektar lahan pertanian aktif dikelola untuk budidaya asparagus di wilayah dataran tinggi Desa Belok/Sidan.',
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
        hectares: '35 Hektar lahan perkebunan alpukat dikelola oleh petani di Desa Belok/Sidan.',
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
        'Luas budidaya mencapai 35 Hektar di wilayah Desa Belok/Sidan',
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
          hectares: '0,5 Hektar lahan perkebunan cabai besar dikelola secara terpusat oleh petani di Banjar Bon.',
          distribution: 'Cabai besar banyak dibudidayakan secara terpusat oleh petani di Banjar Bon.',
          soilClimate: 'Membutuhkan tanah gembur subur dengan drainase optimal, pasokan air terkontrol, dan penyinaran matahari penuh.'
        },
        birdEyeChili: {
          title: 'Budidaya Cabai Rawit',
          hectares: 'Terdapat 8 Hektar lahan perkebunan cabai rawit yang dikelola oleh petani di wilayah Desa Belok/Sidan.',
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
        hectares: 'Terdapat 72 Hektar lahan perkebunan durian yang dikelola oleh petani di wilayah Desa Belok/Sidan.',
        distribution: 'Potensi durian terutama terdapat di Banjar Belok, Selantang, Sidan, dan Penikit.',
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
      shortDescription: 'Jeruk menjadi komoditas utama dengan total luas budidaya mencapai 267.000 pohon atau setara dengan 267 Hektar. Sebaran budidaya berpusat di Banjar Bon, Banjar Jempanang, Sekarmukti, Belok, dan Lawak.',
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
        'Total luas budidaya 267.000 pohon atau setara dengan 267 Hektar',
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
      shortDescription: 'Lemon California dibudidayakan di Desa Belok/Sidan dengan total luas budidaya 19,25 Hektar. Wilayah dengan sebaran lemon terbanyak terdapat di Banjar Bon dan Banjar Lawak.',
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
    },
    {
      slug: 'kubis',
      title: 'Kubis',
      subtitle: 'Sayuran daun dataran tinggi yang kaya vitamin C dan serat',
      image: 'assets/images/produk-kubis.png',
      description: 'Kubis atau kol (Brassica oleracea var. capitata) merupakan tanaman sayuran daun berkepala padat yang tumbuh sangat optimal di daerah dataran tinggi beriklim sejuk seperti Desa Belok/Sidan. Kubis banyak dimanfaatkan sebagai bahan aneka masakan sup, tumisan, lalapan segar, hingga olahan fermentasi bernilai gizi tinggi.',
      shortDescription: 'Kubis Desa Belok/Sidan dibudidayakan di lahan pertanian dataran tinggi berhawa sejuk, menghasilkan krop padat, renyah, dan kaya akan antioksidan serta vitamin C.',
      nutritionItems: [
        {
          title: 'Kaya Vitamin C',
          description: 'Satu porsi kubis segar mencukupi sebagian besar kebutuhan harian vitamin C untuk meningkatkan kekebalan tubuh.'
        },
        {
          title: 'Sumber Vitamin K & Kalsium',
          description: 'Mendukung proses pembekuan darah normal dan memelihara kepadatan tulang serta gigi.'
        },
        {
          title: 'Senyawa Glukosinolat',
          description: 'Mengandung senyawa sulfur glukosinolat yang memiliki sifat detoksifikasi dan potensi antikanker alami.'
        },
        {
          title: 'Serat Pangan Sehat',
          description: 'Membantu melancarkan saluran pencernaan, mencegah sembelit, dan menjaga kesehatan mikrobiota usus.'
        }
      ],
      farmInfo: {
        hectares: 'Terdapat 6,2 Hektar lahan pertanian kubis yang dikelola oleh kelompok tani sayur di Desa Belok/Sidan.',
        distribution: 'Tersebar di Banjar Bon, Jempanang, Sekarmukti, Lawak, Belok, Selantang, danSidan.',
        soilClimate: 'Memerlukan suhu sejuk berkisar 15–20°C, tanah gembur kaya humus dengan drainase baik dan kelembapan stabil.'
      },
      varietyComparison: {
        title: 'Kubis Hijau Bulat vs Kubis Ungu',
        description: 'Kubis memiliki variasi kultivar dengan perbedaan pigmen warna daun, kepadatan krop, dan profil antioksidan.',
        variants: [
          {
            name: 'Kubis Hijau Bulat',
            tagline: 'Kultivar kubis paling populer dengan krop padat renyah dan rasa manis segar',
            attributes: [
              { label: 'Karakteristik Krop', value: 'Krop bulat padat dengan lembaran daun berlapis hijau muda cerah hingga putih di bagian dalam.' },
              { label: 'Cita Rasa & Tekstur', value: 'Rasa manis segar alami dengan tekstur renyah dan kadar air seimbang.' },
              { label: 'Kondisi Budidaya', value: 'Tumbuh sangat subur di bedengan tanah gembur beriklim sejuk dataran tinggi.' },
              { label: 'Pemanfaatan', value: 'Bahan aneka sayur sup, tumisan, lalapan segar, dan olahan kuliner sehari-hari.' }
            ]
          },
          {
            name: 'Kubis Ungu (Merah)',
            tagline: 'Kultivar kaya pigmen antosianin dengan warna ungu kemerahan mencolok',
            attributes: [
              { label: 'Karakteristik Krop', value: 'Daun berwarna ungu tua kemerahan pekat dengan lapisan krop yang sangat rapat dan kokoh.' },
              { label: 'Cita Rasa & Tekstur', value: 'Tekstur lebih padat renyah dengan sedikit rasa earthy manis khas kubis merah.' },
              { label: 'Kandungan Khusus', value: 'Kaya akan antioksidan antosianin dan vitamin C yang lebih tinggi dari kubis hijau.' },
              { label: 'Pemanfaatan', value: 'Bahan salad premium, coleslaw, garnish hidangan restoran, dan olahan acar.' }
            ]
          }
        ]
      },
      highlights: [
        'Tumbuh optimal di iklim dataran tinggi yang sejuk dan subur',
        'Krop padat, segar, dan bertekstur renyah',
        'Kaya akan vitamin C, vitamin K, dan antioksidan glukosinolat',
        'Komoditas hortikultura sayuran andalan pasar pangan lokal',
        'Serbaguna untuk aneka masakan sup, tumis, dan lalapan'
      ]
    },
    {
      slug: 'sawi-putih',
      title: 'Sawi Putih',
      subtitle: 'Sayuran daun renyah segar untuk aneka kuliner dan olahan',
      image: 'assets/images/produk-sawi putih.png',
      description: 'Sawi putih (Brassica rapa subsp. pekinensis) adalah sayuran daun berbentuk krop silindris memanjang dengan daun bertulang putih tebal dan helai hijau muda kekuningan. Di Desa Belok/Sidan, sawi putih dibudidayakan secara intensif karena memiliki masa panen relatif singkat dan permintaan pasar yang tinggi.',
      shortDescription: 'Sawi putih Desa Belok/Sidan memiliki krop padat, renyah, berair melimpah, dan berasa manis lembut, cocok untuk sayur kuah maupun olahan fermentasi.',
      nutritionItems: [
        {
          title: 'Hidrasi Alami & Rendah Kalori',
          description: 'Memiliki kandungan air hingga 95% dengan kalori sangat rendah, sangat baik untuk diet sehat.'
        },
        {
          title: 'Tinggi Vitamin A & C',
          description: 'Mendukung kesehatan mata, peremajaan kulit, dan memperkuat pertahanan imun tubuh.'
        },
        {
          title: 'Kandungan Asam Folat',
          description: 'Penting untuk pembentukan sel darah merah dan sangat baik dikonsumsi ibu hamil.'
        },
        {
          title: 'Kalsium & Kalium Nabati',
          description: 'Membantu menjaga kestabilan tekanan darah dan kesehatan sistem saraf serta otot.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya sawi putih dicatat berdasarkan luasan lahan aktif kelompok tani sayur.',
        distribution: 'Dibudidayakan di areal persawahan dan tegalan beriklim sejuk Desa Belok/Sidan.',
        soilClimate: 'Membutuhkan tanah lempung berpasir yang gembur, drainase lancar, dan ketersediaan air irigasi yang cukup.'
      },
      varietyComparison: {
        title: 'Sawi Putih Hibrida vs Sawi Putih Lokal',
        description: 'Perbandingan kultivar sawi putih berfokus pada ketahanan tanaman, kepadatan krop, dan bobot panen.',
        variants: [
          {
            name: 'Sawi Putih Hibrida',
            tagline: 'Kultivar unggul berbobot berat dengan krop silindris padat',
            attributes: [
              { label: 'Bentuk Krop', value: 'Krop silindris panjang, tersusun sangat rapat dan padat dengan bobot 1,5–2,5 kg per krop.' },
              { label: 'Ketahanan', value: 'Tahan terhadap penyakit busuk lunak bakteri dan cocok untuk transportasi jarak jauh.' },
              { label: 'Tekstur & Rasa', value: 'Batang daun putih tebal sangat renyah, berair banyak, dan manis alami.' },
              { label: 'Pemanfaatan', value: 'Pasokan pasar induk, supermarket, restoran, dan bahan kimchi.' }
            ]
          },
          {
            name: 'Sawi Putih Lokal',
            tagline: 'Kultivar tradisional dengan masa panen genjah dan daun lembut',
            attributes: [
              { label: 'Bentuk Krop', value: 'Krop berukuran sedang dengan susunan daun yang lebih renggang dan lembut.' },
              { label: 'Masa Panen', value: 'Umur panen lebih cepat sekitar 40–50 hari setelah tanam.' },
              { label: 'Tekstur & Rasa', value: 'Rasa manis gurih lembut yang cepat matang saat dimasak sayur kuah.' },
              { label: 'Pemanfaatan', value: 'Konsumsi rumah tangga petani dan pasar tradisional lokal.' }
            ]
          }
        ]
      },
      highlights: [
        'Krop silindris padat dengan batang daun tebal dan renyah',
        'Kandungan air tinggi memberikan kesegaran alami',
        'Kaya vitamin A, vitamin C, kalsium, dan asam folat',
        'Masa tanam produktif dengan permintaan pasar stabil',
        'Bahan favorit masakan capcay, sup bening, dan olahan tumis'
      ]
    },
    {
      slug: 'buncis',
      title: 'Buncis',
      subtitle: 'Polong polongan bernutrisi tinggi dan sumber protein nabati',
      image: 'assets/images/produk-buncis.png',
      description: 'Buncis (Phaseolus vulgaris) merupakan tanaman polong-polongan semusim yang dibudidayakan untuk dipanen polong mudanya. Di Desa Belok/Sidan, kondisi tanah yang gembur dan udara sejuk pegunungan menghasilkan polong buncis yang lurus, renyah, berwarna hijau segar, dan tanpa serat kasar.',
      shortDescription: 'Buncis Desa Belok/Sidan terkenal segar, manis renyah, dan kaya akan protein nabati, serat, serta zat besi untuk kesehatan keluarga.',
      nutritionItems: [
        {
          title: 'Sumber Protein Nabati',
          description: 'Mengandung protein nabati berkualitas yang mendukung regenerasi sel dan pemeliharaan massa otot.'
        },
        {
          title: 'Zat Besi & Asam Folat',
          description: 'Membantu pembentukan hemoglobin darah dan mencegah anemia bagi tubuh.'
        },
        {
          title: 'Serat Pangan Larut',
          description: 'Membantu menurunkan kadar kolesterol LDL dan menjaga kadar gula darah tetap stabil.'
        },
        {
          title: 'Silikon & Vitamin K',
          description: 'Kombinasi silikon nabati dan vitamin K mendukung penyerapan mineral untuk kepadatan tulang.'
        }
      ],
      farmInfo: {
        hectares: 'Terdapat 5,6 Hektar lahan pertanian kubis yang dikelola oleh kelompok tani sayur di Desa Belok/Sidan.',
        distribution: 'Tersebar di Banjar Bon, Sekarmukti, Lawak, Belok, Selantang, Sidan, dan Penikit.',
        soilClimate: 'Tumbuh subur pada tanah subur berdrainase baik dengan pH 5,5–6,5 dan suhu udara 18–24°C.'
      },
      varietyComparison: {
        title: 'Buncis Tegak vs Buncis Rambat',
        description: 'Buncis dibedakan berdasarkan pola pertumbuhan batangnya antara tipe tegak mandiri dan tipe merambat.',
        variants: [
          {
            name: 'Buncis Tegak (Bush Bean)',
            tagline: 'Tipe tanaman kompak tanpa lanjaran dengan panen serempak',
            attributes: [
              { label: 'Habitus Tanaman', value: 'Tumbuh pendek membentuk semak setinggi 30–50 cm tanpa memerlukan tiang lanjaran bambu.' },
              { label: 'Polong Buah', value: 'Polong berukuran sedang, renyah, dan siap panen serentak dalam waktu 45–50 hari.' },
              { label: 'Karakteristik Budidaya', value: 'Praktis dan hemat biaya tenaga kerja pembuatan lanjaran.' },
              { label: 'Pemanfaatan', value: 'Sayuran segar harian, tumis buncis bawang putih, dan sayur campur.' }
            ]
          },
          {
            name: 'Buncis Rambat (Pole Bean)',
            tagline: 'Tipe merambat dengan masa produktif panjang dan polong panjang lentur',
            attributes: [
              { label: 'Habitus Tanaman', value: 'Batang merambat mencapai 2–3 meter menggunakan tiang penyangga lanjaran bambu.' },
              { label: 'Polong Buah', value: 'Polong lebih panjang (15–20 cm), lurus, daging polong tebal dan tidak berserat.' },
              { label: 'Masa Panen', value: 'Dapat dipanen berkali-kali selama masa produktif 2–3 bulan.' },
              { label: 'Pemanfaatan', value: 'Komoditas pasar induk premium, katering, dan hidangan restoran.' }
            ]
          }
        ]
      },
      highlights: [
        'Polong hijau segar, renyah, manis, dan tanpa serat kasar',
        'Kaya protein nabati, zat besi, vitamin K, dan asam folat',
        'Mendukung kesehatan jantung dan kepadatan tulang',
        'Cocok ditanam secara tumpang sari di lahan pertanian dataran tinggi',
        'Sangat lezat ditumis, direbus sebagai lalapan, atau sup'
      ]
    },
    {
      slug: 'mentimun',
      title: 'Mentimun',
      subtitle: 'Buah sayur segar penyejuk kaya elektrolit dan antioksidan',
      image: 'assets/images/produk-timun jepang.png',
      description: 'Mentimun (Cucumis sativus) merupakan tanaman merambat semusim anggota suku labu-labuan (Cucurbitaceae). Buah mentimun yang dipanen muda memiliki daging buah berair banyak dengan rasa sejuk menyegarkan. Di Desa Belok/Sidan, petani membudidayakan mentimun lokal maupun varietas timun jepang (kyuri) yang bernilai jual tinggi.',
      shortDescription: 'Mentimun Desa Belok/Sidan memiliki rasa segar renyah dengan kandungan air melimpah, kaya elektrolit alami dan antioksidan untuk hidrasi tubuh.',
      nutritionItems: [
        {
          title: 'Kaya Cairan & Elektrolit',
          description: 'Mengandung 95% air serta kalium dan magnesium untuk rehidrasi tubuh setelah beraktivitas.'
        },
        {
          title: 'Antioksidan Flavonoid & Tanin',
          description: 'Membantu menangkal radikal bebas dan mengurangi risiko peradangan kronis pada sel tubuh.'
        },
        {
          title: 'Menyehatkan Kulit & Kolagen',
          description: 'Kandungan silika dan vitamin C membantu menjaga kekenyalan kulit dan memperkuat jaringan ikat.'
        },
        {
          title: 'Mendukung Detoksifikasi Alami',
          description: 'Membantu merangsang fungsi ginjal dalam membuang sisa metabolisme melalui urin (efek diuretik ringan).'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya mentimun dicatat berdasarkan pencatatan rotasi tanam petani hortikultura.',
        distribution: 'Ditanam pada bedengan sawah tadah hujan dan tegalan di Desa Belok/Sidan.',
        soilClimate: 'Membutuhkan tanah lempung gembur subur, sinar matahari penuh, dan pasokan air teratur.'
      },
      varietyComparison: {
        title: 'Timun Jepang (Kyuri) vs Timun Lokal',
        description: 'Perbandingan karakteristik timun jepang berkulit hijau gelap pekat dengan timun sayur lokal.',
        variants: [
          {
            name: 'Timun Jepang (Kyuri)',
            tagline: 'Kultivar premium berkulit hijau gelap pekat, renyah, dan minim biji',
            attributes: [
              { label: 'Bentuk & Kulit', value: 'Bentuk silindris panjang ramping, kulit hijau tua berpori halus tanpa duri mencolok.' },
              { label: 'Daging Buah & Biji', value: 'Daging buah sangat padat, renyah, kadar air teratur, dengan ruang biji sangat kecil.' },
              { label: 'Cita Rasa', value: 'Rasa manis segar murni tanpa rasa pahit sama sekali.' },
              { label: 'Pemanfaatan', value: 'Bahan sushi, salad segar hotel/restoran, dan hidangan dingin.' }
            ]
          },
          {
            name: 'Timun Sayur Lokal',
            tagline: 'Kultivar lokal berair melimpah dengan kulit hijau bergaris putih',
            attributes: [
              { label: 'Bentuk & Kulit', value: 'Bentuk silindris montok, kulit hijau terang dengan garis putih kekuningan memudar.' },
              { label: 'Daging Buah & Biji', value: 'Daging buah berair sangat banyak dengan aroma mentimun segar yang tajam.' },
              { label: 'Cita Rasa', value: 'Rasa segar menyejukkan yang sangat cocok dikonsumsi mentah.' },
              { label: 'Pemanfaatan', value: 'Lalapan sambal, acar mentah, rujak, dan jus mentimun penurun tensi.' }
            ]
          }
        ]
      },
      highlights: [
        'Kandungan air tinggi untuk hidrasi alami dan pemulihan stamina',
        'Tersedia varietas Timun Jepang (Kyuri) dan Timun Lokal',
        'Tekstur renyah, segar, dan tidak berasa pahit',
        'Kaya elektrolit kalium, magnesium, dan vitamin K',
        'Sangat populer sebagai lalapan, salad, jus segar, dan acar'
      ]
    },
    {
      slug: 'tomat',
      title: 'Tomat',
      subtitle: 'Buah hortikultura kaya likopen untuk kesehatan dan aneka bumbu masakan',
      image: 'assets/images/produk-tomat.png',
      description: 'Tomat (Solanum lycopersicum) adalah tumbuhan dari keluarga Solanaceae yang dibudidayakan untuk dipanen buahnya yang kaya sari dan berwarna merah cerah. Di kawasan dataran tinggi Desa Belok/Sidan yang berhawa sejuk, buah tomat berkembang dengan daging tebal, rasa manis-asam segar, dan kadar likopen antioksidan yang optimal.',
      shortDescription: 'Tomat Desa Belok/Sidan berbuah lebat, padat, merah merona, dan kaya antioksidan likopen serta vitamin C untuk kesehatan jantung dan imunitas.',
      nutritionItems: [
        {
          title: 'Tinggi Antioksidan Likopen',
          description: 'Likopen merupakan pigmen karotenoid merah yang sangat efektif melindungi kesehatan jantung dan prostat.'
        },
        {
          title: 'Kaya Vitamin C & Vitamin A',
          description: 'Mendukung kekebalan tubuh, menjaga kesehatan retina mata, dan mempercepat penyembuhan luka.'
        },
        {
          title: 'Kalium untuk Tekanan Darah',
          description: 'Membantu menyeimbangkan kadar natrium tubuh dan menjaga kestabilan tekanan darah arteri.'
        },
        {
          title: 'Asam Folat & Kolin',
          description: 'Mendukung fungsi neurologis, suasana hati, dan pembelahan sel yang sehat.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya tomat dicatat berdasarkan luasan kebun aktif kelompok tani.',
        distribution: 'Tersebar di lahan-lahan pertanian sayur dataran tinggi Desa Belok/Sidan.',
        soilClimate: 'Tumbuh optimal pada suhu 18–25°C dengan tanah gembur kaya bahan organik dan penyinaran matahari penuh.'
      },
      varietyComparison: {
        title: 'Tomat Buah (Sayur) vs Tomat Ceri',
        description: 'Perbandingan antara tomat buah berukuran besar untuk masakan dan tomat ceri manis untuk konsumsi segar.',
        variants: [
          {
            name: 'Tomat Buah / Sayur',
            tagline: 'Buah berukuran besar dengan daging tebal dan sari buah berlimpah',
            attributes: [
              { label: 'Ukuran & Bentuk', value: 'Buah bulat agak lonjong berukuran 80–150 gram dengan dinding buah tebal.' },
              { label: 'Cita Rasa', value: 'Perpaduan rasa asam segar dan manis dengan aroma tomat yang kuat.' },
              { label: 'Karakteristik Daging', value: 'Daging buah tebal dan kokoh sehingga tahan simpan dan pengiriman.' },
              { label: 'Pemanfaatan', value: 'Bahan utama sambal tomat, bumbu masakan, jus buah, dan saus.' }
            ]
          },
          {
            name: 'Tomat Ceri (Cherry Tomato)',
            tagline: 'Buah berukuran kecil bulat mungil dengan rasa manis legit',
            attributes: [
              { label: 'Ukuran & Bentuk', value: 'Buah bulat kecil berdiameter 2–3 cm dalam dompolan tandan buah yang lebat.' },
              { label: 'Cita Rasa', value: 'Rasa manis dominan dengan tingkat keasaman rendah dan kulit tipis renyah.' },
              { label: 'Karakteristik Daging', value: 'Sari buah manis meletup saat digigit segar.' },
              { label: 'Pemanfaatan', value: 'Salad segar premium, garnish hidangan hotel/kafe, dan camilan sehat.' }
            ]
          }
        ]
      },
      highlights: [
        'Warna merah merona alami dengan daging buah padat dan tebal',
        'Sumber antioksidan likopen dan vitamin C berkualitas tinggi',
        'Rasa manis-asam segar seimbang yang meningkatkan kelezatan masakan',
        'Dibudidayakan di dataran tinggi dengan metode pertanian terjaga',
        'Komoditas penting untuk bumbu dapur, sambal, dan minuman jus'
      ]
    },
    {
      slug: 'pakcoy',
      title: 'Pakcoy',
      subtitle: 'Sayuran daun hijau berbentuk sendok yang renyah dan gurih',
      image: 'assets/images/produk-pakcoy.png',
      description: 'Pakcoy atau sawi sendok (Brassica rapa subsp. chinensis) adalah jenis sayuran daun dari suku kubis-kubisan dengan tangkai daun lebar berdaging menyerupai sendok dan helaian daun hijau tua mengilap. Di Desa Belok/Sidan, pakcoy tumbuh sangat subur dengan tekstur tangkai yang renyah, manis, dan kaya akan kalsium serta antioksidan.',
      shortDescription: 'Pakcoy Desa Belok/Sidan dipanen segar dengan daun hijau tua mengilap dan tangkai renyah, kaya vitamin dan mineral nabati untuk hidangan sehat.',
      nutritionItems: [
        {
          title: 'Tinggi Kalsium & Magnesium',
          description: 'Menyediakan kalsium nabati yang mudah diserap tubuh untuk memperkuat tulang dan gigi.'
        },
        {
          title: 'Kaya Vitamin C & E',
          description: 'Kombinasi antioksidan vitamin C dan E membantu menjaga daya tahan tubuh dan menangkal penuaan sel.'
        },
        {
          title: 'Karotenoid Lutein & Zeaksantin',
          description: 'Pigmen pelindung mata dari radiasi cahaya dan pencegah degenerasi makula.'
        },
        {
          title: 'Serat Pangan Alami',
          description: 'Membantu menjaga kesehatan pencernaan, melancarkan metabolisme, dan mendukung berat badan ideal.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya pakcoy dicatat berdasarkan data kelompok tani sayuran daun.',
        distribution: 'Tersebar di areal bedengan sayuran dan kebun pekarangan Desa Belok/Sidan.',
        soilClimate: 'Membutuhkan tanah gembur berhumus tinggi dengan ketersediaan air yang cukup dan suhu sejuk.'
      },
      varietyComparison: {
        title: 'Pakcoy Hijau Standar vs Baby Pakcoy',
        description: 'Perbandingan antara pakcoy ukuran dewasa standar dan baby pakcoy yang dipanen pada usia muda.',
        variants: [
          {
            name: 'Pakcoy Hijau Standar',
            tagline: 'Kultivar daun berukuran besar dengan tangkai sendok kokoh dan tebal',
            attributes: [
              { label: 'Ukuran Tanaman', value: 'Tinggi tanaman mencapai 20–25 cm dengan tangkai daun lebar berdaging tebal.' },
              { label: 'Tekstur & Rasa', value: 'Tangkai sangat renyah, berair, dan berasa manis gurih saat ditumis.' },
              { label: 'Masa Panen', value: 'Dipanen pada umur 35–40 hari setelah tanam.' },
              { label: 'Pemanfaatan', value: 'Bahan tumisan daging/seafood, mi kuah, capcay, dan aneka masakan oriental.' }
            ]
          },
          {
            name: 'Baby Pakcoy',
            tagline: 'Kultivar mini bertekstur sangat lembut dan manis renyah',
            attributes: [
              { label: 'Ukuran Tanaman', value: 'Ukuran mungil kompak setinggi 10–15 cm yang disajikan utuh saat dimasak.' },
              { label: 'Tekstur & Rasa', value: 'Tekstur sangat empuk, lembut, tidak berserat, dan cita rasa manis segar.' },
              { label: 'Masa Panen', value: 'Dipanen dini pada umur 25–30 hari setelah tanam.' },
              { label: 'Pemanfaatan', value: 'Hidangan tumis bawang putih ala restoran, rebusan hotpot, dan sup premium.' }
            ]
          }
        ]
      },
      highlights: [
        'Tangkai daun tebal bertekstur renyah dan daun hijau segar mengilap',
        'Kaya kalsium nabati, vitamin C, vitamin E, dan lutein',
        'Masa tanam cepat dengan kesegaran terjamin dari kebun lokal',
        'Sangat mudah diolah menjadi aneka hidangan tumis dan sup',
        'Pilihan utama masyarakat untuk menu sayuran hijau harian'
      ]
    },
    {
      slug: 'terong',
      title: 'Terong',
      subtitle: 'Sayuran buah ungu kaya nasunin dan antioksidan polifenol',
      image: 'assets/images/produk-terong.png',
      description: 'Terong (Solanum melongena) adalah tumbuhan penghasil buah yang tergolong dalam keluarga Solanaceae. Buah terong memiliki kulit ungu mengilap yang indah dengan daging buah spons lembut yang menyerap bumbu dengan sempurna. Di Desa Belok/Sidan, terong dibudidayakan sebagai salah satu komoditas sayuran buah yang produktif.',
      shortDescription: 'Terong Desa Belok/Sidan memiliki kulit ungu berkilau, daging lembut bebas rasa pahit, dan kaya antioksidan nasunin untuk perlindungan sel saraf.',
      nutritionItems: [
        {
          title: 'Antioksidan Nasunin (Antosianin)',
          description: 'Nasunin pada kulit ungu terong adalah antioksidan kuat yang melindungi membran sel otak dari kerusakan radikal bebas.'
        },
        {
          title: 'Tinggi Serat Pangan',
          description: 'Membantu menurunkan penyerapan gula dalam darah dan memelihara kesehatan saluran cerna.'
        },
        {
          title: 'Kandungan Asam Klorogenat',
          description: 'Senyawa polifenol utama yang membantu menurunkan kadar kolesterol jahat (LDL).'
        },
        {
          title: 'Kaya Kalium & Mangan',
          description: 'Mendukung metabolisme karbohidrat dan menjaga fungsi normal sistem kardiovaskular.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya terong dicatat berdasarkan luasan kebun produktif petani desa.',
        distribution: 'Tersebar di lahan tegalan dan persawahan Desa Belok/Sidan.',
        soilClimate: 'Tumbuh subur pada tanah lempung berpasir kaya hara dengan drainase lancar dan sinar matahari cukup.'
      },
      varietyComparison: {
        title: 'Terong Ungu Panjang vs Terong Bulat Lalap',
        description: 'Perbandingan antara terong ungu berukuran panjang untuk masakan dan terong bulat renyah untuk lalapan.',
        variants: [
          {
            name: 'Terong Ungu Panjang',
            tagline: 'Kultivar paling populer dengan buah lurus panjang dan kulit ungu mengilap',
            attributes: [
              { label: 'Bentuk & Kulit', value: 'Buah silindris memanjang 20–30 cm dengan kulit ungu tua berkilau dan daging putih kehijauan.' },
              { label: 'Tekstur Daging', value: 'Daging buah empuk, lembut, bertekstur spons yang meresap bumbu masakan.' },
              { label: 'Cita Rasa', value: 'Rasa gurih manis lembut tanpa rasa pahit.' },
              { label: 'Pemanfaatan', value: 'Terong balado, terong bakar sambal matah, sayur lodeh, dan terong goreng krispi.' }
            ]
          },
          {
            name: 'Terong Bulat Lalap (Terong Telunjuk/Hijau)',
            tagline: 'Kultivar bulat kecil bertekstur renyah khusus lalapan segar',
            attributes: [
              { label: 'Bentuk & Kulit', value: 'Buah bulat kecil berdiameter 3–5 cm berwarna hijau bergaris putih atau ungu muda.' },
              { label: 'Tekstur Daging', value: 'Daging buah padat renyah dengan rasa manis segar.' },
              { label: 'Pemanfaatan Khusus', value: 'Dikonsumsi mentah sebagai lalapan segar bersama aneka sambal tradisional.' },
              { label: 'Kandungan', value: 'Kaya serat dan air yang menyegarkan mulut saat menikmati makanan berlemak.' }
            ]
          }
        ]
      },
      highlights: [
        'Kulit ungu berkilau kaya antioksidan nasunin pelindung sel otak',
        'Daging buah lembut dan empuk tanpa rasa pahit',
        'Membantu menjaga kadar kolesterol dan kesehatan jantung',
        'Daya serap bumbu yang sangat baik untuk aneka masakan Nusantara',
        'Dipanen segar langsung dari perkebunan petani Desa Belok/Sidan'
      ]
    },
    {
      slug: 'labu-siam',
      title: 'Labu Siam',
      subtitle: 'Sayuran buah renyah dengan kandungan air tinggi dan kalium',
      image: 'assets/images/produk-labu-siam.png',
      description: 'Labu siam (Sechium edule) atau jepang merupakan tumbuhan merambat suku Cucurbitaceae yang menghasilkan buah berdaging renyah dengan getah bening dan kandungan air melimpah. Di Desa Belok/Sidan, tanaman ini merambat subur pada para-para bambu di perkebunan warga, menghasilkan buah labu siam dan pucuk daun muda yang digemari pasar.',
      shortDescription: 'Labu siam Desa Belok/Sidan memiliki buah bertekstur renyah, segar, kaya kalium dan asam folat, serta pucuk daun muda yang lezat dimasak sayur.',
      nutritionItems: [
        {
          title: 'Kaya Kalium Penurun Tekanan Darah',
          description: 'Kalium tinggi membantu menstabilkan tekanan darah dan membuang kelebihan natrium dari tubuh.'
        },
        {
          title: 'Sangat Rendah Kalori & Lemak',
          description: 'Kandungan air tinggi dan nol lemak jenuh menjadikannya sayuran ideal untuk menjaga berat badan.'
        },
        {
          title: 'Tinggi Asam Folat (Vitamin B9)',
          description: 'Sangat baik untuk mendukung pembentukan DNA, regenerasi sel, dan kesehatan ibu hamil.'
        },
        {
          title: 'Antioksidan Myricetin',
          description: 'Senyawa flavonoid yang memiliki sifat anti-inflamasi dan pelindung sel dari stres oksidatif.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya labu siam dicatat berdasarkan luasan para-para perkebunan aktif.',
        distribution: 'Dibudidayakan pada sistem para-para bambu di tegalan dan perbukitan Desa Belok/Sidan.',
        soilClimate: 'Tumbuh sangat subur di iklim sejuk dataran tinggi dengan tanah lembap berdrainase baik.'
      },
      varietyComparison: {
        title: 'Buah Labu Siam vs Pucuk Daun Labu Siam',
        description: 'Dua bagian tanaman labu siam yang dimanfaatkan secara luas sebagai komoditas sayuran bernilai ekonomi.',
        variants: [
          {
            name: 'Buah Labu Siam',
            tagline: 'Buah berbentuk pir berwarna hijau muda dengan tekstur renyah segar',
            attributes: [
              { label: 'Karakteristik Fisik', value: 'Buah berbentuk lonjong pir beralur lembut, kulit hijau muda mulus tanpa duri.' },
              { label: 'Tekstur & Rasa', value: 'Daging buah padat renyah, berair banyak, berasa manis lembut yang menyegarkan.' },
              { label: 'Pemanfaatan', value: 'Bahan sayur lodeh, tumis labu siam ebi/cabai, lalapan rebus, dan sayur asem.' },
              { label: 'Ketahanan Simpan', value: 'Daya simpan lama hingga beberapa minggu pada suhu ruang.' }
            ]
          },
          {
            name: 'Pucuk Daun Labu Siam (Baby Labu)',
            tagline: 'Tunas pucuk daun muda yang sangat lembut, renyah, dan gurih',
            attributes: [
              { label: 'Karakteristik Fisik', value: 'Pucuk sulur dan daun muda berwarna hijau cerah berbulu halus yang lentur.' },
              { label: 'Tekstur & Rasa', value: 'Tekstur sangat lembut renyah dengan rasa gurih manis alami khas pucuk sayur.' },
              { label: 'Pemanfaatan', value: 'Tumisan bawang putih, plecing daun labu, dan lalapan rebus hangat.' },
              { label: 'Kandungan', value: 'Kaya zat besi, klorofil, dan serat hijau untuk pembersih pencernaan.' }
            ]
          }
        ]
      },
      highlights: [
        'Kandungan kalium tinggi membantu mengontrol tekanan darah',
        'Tekstur buah renyah berair dan pucuk daun muda yang lezat',
        'Sangat rendah kalori dan bebas lemak untuk pola hidup sehat',
        'Ditanam dengan sistem para-para tradisional yang higienis',
        'Bahan serbaguna untuk aneka olahan sayur kuah dan tumis'
      ]
    },
    {
      slug: 'labu-pumpkin',
      title: 'Labu Pumpkin',
      subtitle: 'Buah labu berdaging kuning tebal kaya beta karoten dan serat',
      image: 'assets/images/produk-labu-pumpkin.png',
      description: 'Labu pumpkin atau waluh (Cucurbita moschata) merupakan tanaman semusim menjalar yang menghasilkan buah berkulit keras dengan daging buah tebal berwarna kuning jingga keemasan. Di Desa Belok/Sidan, labu pumpkin tumbuh optimal menghasilkan buah berbobot berat dengan rasa manis pulen dan kandungan beta karoten alami yang sangat tinggi.',
      shortDescription: 'Labu pumpkin Desa Belok/Sidan berbuah besar dengan daging kuning jingga tebal, manis pulen, dan kaya provitamin A untuk kesehatan tubuh.',
      nutritionItems: [
        {
          title: 'Sangat Tinggi Beta Karoten (Vitamin A)',
          description: 'Pigmen oranye alami yang diubah tubuh menjadi vitamin A untuk memelihara ketajaman mata dan imunitas.'
        },
        {
          title: 'Serat Pangan Mengenyangkan',
          description: 'Memberikan rasa kenyang lebih lama, memperlambat penyerapan glukosa, dan melancarkan pencernaan.'
        },
        {
          title: 'Mineral Kalium & Seng',
          description: 'Mendukung fungsi kontraksi otot jantung dan memperkuat sistem pertahanan kekebalan tubuh.'
        },
        {
          title: 'Antioksidan Lutein & Zeaksantin',
          description: 'Melindungi sel tubuh dari efek buruk penuaan dini dan menjaga kesehatan kulit.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya labu pumpkin dicatat berdasarkan luasan tegalan dan lahan kebun petani.',
        distribution: 'Tersebar di kebun tegalan dan lahan terbuka Desa Belok/Sidan.',
        soilClimate: 'Membutuhkan tanah gembur kaya bahan organik, sinar matahari penuh, dan drainase air yang lancar.'
      },
      varietyComparison: {
        title: 'Labu Kuning Lokal (Waluh) vs Labu Madu (Butternut)',
        description: 'Perbandingan antara labu kuning bulat tradisional dan labu madu berbentuk botol.',
        variants: [
          {
            name: 'Labu Kuning Lokal (Waluh)',
            tagline: 'Kultivar tradisional berbentuk bulat pipih beralur dengan daging tebal pulen',
            attributes: [
              { label: 'Bentuk & Ukuran', value: 'Buah bulat pipih beralur berbobot 3–6 kg per buah dengan kulit cokelat jingga kekuningan.' },
              { label: 'Daging Buah & Tekstur', value: 'Daging buah tebal berwarna kuning jingga tua, bertekstur pulen lembut dan legit.' },
              { label: 'Pemanfaatan', value: 'Bahan kolak, kue tradisional Bali, sup labu, bubur sehat, dan olahan kukus.' },
              { label: 'Daya Simpan', value: 'Kulit keras memungkinkan penyimpanan hingga berbulan-bulan tanpa rusak.' }
            ]
          },
          {
            name: 'Labu Madu (Butternut Pumpkin)',
            tagline: 'Kultivar berbentuk botol pir dengan rasa manis pekat seperti mentega',
            attributes: [
              { label: 'Bentuk & Ukuran', value: 'Bentuk pir silindris berleher dengan kulit krem mulus dan rongga biji hanya di bagian bawah.' },
              { label: 'Daging Buah & Tekstur', value: 'Daging buah padat halus bebas serat kasar dengan cita rasa manis madu gurih (nutty).' },
              { label: 'Pemanfaatan', value: 'Creamy pumpkin soup, kue pastry, MPASI bayi, dan hidangan panggang restoran.' },
              { label: 'Kandungan Khusus', value: 'Kadar gula alami dan kepekatan beta karoten yang sangat tinggi.' }
            ]
          }
        ]
      },
      highlights: [
        'Daging buah kuning jingga tebal dengan cita rasa manis pulen',
        'Sumber terkaya beta karoten (provitamin A) dan serat alami',
        'Daya simpan buah sangat lama berkat kulit luar yang kokoh',
        'Bahan baku favorit aneka hidangan kolak, kue, dan sup sehat',
        'Dibudidayakan secara alami oleh para petani Desa Belok/Sidan'
      ]
    },
    {
      slug: 'pisang',
      title: 'Pisang',
      subtitle: 'Komoditas buah hortikultura 64.000 rumpun untuk pangan dan tradisi upacara Bali',
      image: 'assets/images/produk-pisang.png',
      description: 'Pisang (Musa spp.) merupakan salah satu komoditas hortikultura buah utama yang dibudidayakan secara luas di Desa Belok/Sidan dengan populasi mencapai 64.000 rumpun. Selain sebagai buah konsumsi segar keluarga dan sumber ekonomi harian, pisang memiliki peranan yang sangat sakral dalam tradisi adat dan persembahyangan umat Hindu di Bali sebagai sarana upakara banten.',
      shortDescription: 'Pisang di Desa Belok/Sidan dibudidayakan mencapai 64.000 rumpun, menghasilkan buah manis bernutrisi tinggi untuk konsumsi harian dan sarana utama upacara adat Bali.',
      nutritionItems: [
        {
          title: 'Sumber Kalium Sangat Tinggi',
          description: 'Kalium esensial untuk menjaga fungsi detak jantung normal, tekanan darah stabil, dan mencegah kram otot.'
        },
        {
          title: 'Karbohidrat Kompleks & Energi Instan',
          description: 'Kombinasi glukosa, fruktosa, dan serat menyediakan pasokan energi berkelanjutan bagi tubuh.'
        },
        {
          title: 'Vitamin B6 & Triptofan',
          description: 'Mendukung produksi neurotransmiter serotonin untuk memperbaiki suasana hati dan kualitas tidur.'
        },
        {
          title: 'Serat Pektin & Prebiotik',
          description: 'Membantu memelihara kesehatan sistem pencernaan dan menjadi makanan bagi bakteri baik usus.'
        }
      ],
      farmInfo: {
        hectares: 'Jumlah budidaya: 64.000 rumpun.',
        distribution: 'Ditanam di kebun tegalan, pekarangan rumah warga, dan pembatas lahan di seluruh wilayah Desa Belok/Sidan.',
        soilClimate: 'Tumbuh subur pada tanah lempung gembur yang kaya humus dan air dengan iklim tropis dataran sejuk.'
      },
      varietyComparison: {
        title: 'Pisang Konsumsi Segar vs Pisang Upakara (Saba/Kepok)',
        description: 'Perbandingan pemanfaatan varietas pisang meja konsumsi dan pisang khusus sarana upacara adat di Bali.',
        variants: [
          {
            name: 'Pisang Meja Konsumsi (Pisang Raja / Susu / Ambon)',
            tagline: 'Kultivar pisang meja dengan aroma harum manis dan daging lembut',
            attributes: [
              { label: 'Karakteristik Buah', value: 'Kulit kuning cerah mulus saat matang dengan daging buah lembut, manis legit, dan harum.' },
              { label: 'Pemanfaatan', value: 'Dikonsumsi langsung sebagai buah pencuci mulut, jus buah, dan bahan kue.' },
              { label: 'Cita Rasa', value: 'Rasa manis pekat dengan tekstur pulen lembut yang sangat disukai anak-anak hingga dewasa.' },
              { label: 'Pemasaran', value: 'Dipasarkan luas ke toko buah, pasar tradisional, dan perhotelan.' }
            ]
          },
          {
            name: 'Pisang Upakara (Pisang Saba / Kepok / Emas)',
            tagline: 'Kultivar esensial untuk kelengkapan sarana banten dan persembahyangan adat Bali',
            attributes: [
              { label: 'Karakteristik Buah', value: 'Buah berbentuk bersegi kokoh dengan tandan yang rapi dan tahan simpan lama.' },
              { label: 'Peran Adat & Budaya', value: 'Komponen wajib dalam pembuatan aneka banten sajen, canang, dan upacara keagamaan Hindu Bali.' },
              { label: 'Pemanfaatan Kuliner', value: 'Sangat lezat diolah menjadi pisang goreng, pisang rebus, kolak, dan keripik pisang.' },
              { label: 'Nilai Ekonomi', value: 'Permintaan melonjak tinggi menjelang hari raya Galungan, Kuningan, dan piodalan.' }
            ]
          }
        ]
      },
      highlights: [
        'Populasi budidaya mencapai 64.000 rumpun di seluruh desa',
        'Komoditas multiguna untuk pemenuhan gizi pangan dan sarana ritual upacara adat',
        'Sumber kalium, energi alami, dan vitamin B6 yang sangat baik',
        'Beragam varietas unggulan seperti Pisang Raja, Pisang Saba, Pisang Susu, dan Kepok',
        'Pasokan buah segar yang stabil sepanjang tahun'
      ]
    },
    {
      slug: 'vanili',
      title: 'Vanili',
      subtitle: 'Emas hijau perkebunan penghasil aroma vanilin alami bermutu tinggi',
      image: 'assets/images/produk-vanili.png',
      description: 'Vanili (Vanilla planifolia) merupakan tanaman anggrek penghasil polong vanili yang dijuluki sebagai "emas hijau" karena nilai ekonominya yang sangat tinggi di pasar internasional. Di Desa Belok/Sidan, ketinggian dan iklim mikro pegunungan yang sejuk menyediakan kondisi ideal untuk budidaya vanili berkualitas dengan kadar vanilin alami yang tinggi dan aroma harum yang memikat.',
      shortDescription: 'Vanili Desa Belok/Sidan adalah komoditas perkebunan bernilai tinggi dengan polong panjang, berminyak, dan beraroma harum vanilin alami pekat.',
      nutritionItems: [
        {
          title: 'Senyawa Vanilin Alami Murni',
          description: 'Vanilin alami merupakan antioksidan polifenol yang memberikan aroma manis menenangkan dan melindungi sel.'
        },
        {
          title: 'Efek Relaksasi & Aromaterapi',
          description: 'Aroma vanili alami terbukti membantu meredakan stres, kecemasan, dan meningkatkan suasana hati.'
        },
        {
          title: 'Sifat Antibakteri Alami',
          description: 'Minyak atsiri pada polong vanili memiliki aktivitas antibakteri yang melindungi dari mikroorganisme patogen.'
        },
        {
          title: 'Mendukung Kesehatan Pencernaan',
          description: 'Membantu meredakan mual dan mendukung fungsi pencernaan saat digunakan dalam sajian minuman hangat.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya vanili dicatat berdasarkan luasan kebun vanili intensif petani desa.',
        distribution: 'Tersebar di perkebunan ternaungi di wilayah dataran menengah dan tinggi Desa Belok/Sidan.',
        soilClimate: 'Membutuhkan iklim tropis sejuk dengan kelembapan 70–80%, pohon rambatan pelindung, dan tanah kaya humus dengan drainase sangat baik.'
      },
      varietyComparison: {
        title: 'Vanili Planifolia vs Vanili Tahitensis',
        description: 'Perbandingan dua spesies vanili komersial utama dengan profil aroma dan bentuk polong yang berbeda.',
        variants: [
          {
            name: 'Vanilla Planifolia (Bourbon Vanilla)',
            tagline: 'Spesies vanili terpopuler dunia dengan kadar vanilin tinggi dan aroma creamy klasik',
            attributes: [
              { label: 'Bentuk Polong', value: 'Polong ramping memanjang 15–22 cm, berwarna cokelat kehitaman mengilap dan lentur berminyak.' },
              { label: 'Kandungan Vanilin', value: 'Kadar vanilin alami tinggi (1,8–2,4%) menghasilkan aroma manis karamel pekat.' },
              { label: 'Budidaya di Belok/Sidan', value: 'Spesies utama yang dibudidayakan secara intensif oleh kelompok petani vanili desa.' },
              { label: 'Pemanfaatan', value: 'Ekstrak vanila premium, industri perhotelan, pastry kue internasional, dan pasar ekspor.' }
            ]
          },
          {
            name: 'Vanilla Tahitensis',
            tagline: 'Spesies vanili dengan profil aroma floral bunga dan buah yang unik',
            attributes: [
              { label: 'Bentuk Polong', value: 'Polong lebih pendek montok dengan kulit lebih tebal dan elastis.' },
              { label: 'Karakter Aroma', value: 'Aroma vanila dipadu dengan nuansa wangi bunga (floral) dan buah manis yang khas.' },
              { label: 'Kandungan Vanilin', value: 'Kadar vanilin lebih rendah namun kaya senyawa aromatik heliotropin dan anisalil alkohol.' },
              { label: 'Pemanfaatan', value: 'Industri parfum, aromaterapi mewah, minuman spesialti, dan kosmetik herbal.' }
            ]
          }
        ]
      },
      highlights: [
        'Komoditas perkebunan premium bernilai ekonomi tinggi untuk pasar ekspor',
        'Polong vanili panjang, berminyak, lentur, dan beraroma harum pekat',
        'Kandungan senyawa vanilin alami murni tanpa perisa sintetis',
        'Dikelola dengan pemeliharaan presisi dan penyerbukan bunga manual yang teliti',
        'Menjadi salah satu potensi kebanggaan hasil bumi perkebunan desa'
      ]
    },
    {
      slug: 'gula-aren',
      title: 'Gula Aren',
      subtitle: 'Pemanis alami tradisional dari sadapan nira murni pohon aren',
      image: 'assets/images/produk-gula aren.png',
      description: 'Gula aren khas Desa Belok/Sidan diproduksi secara tradisional dari sadapan nira segar pohon aren atau pohon nao (Arenga pinnata) yang tumbuh subur di lereng perbukitan desa. Nira murni dimasak perlahan di atas tungku kayu bakar hingga mengental membentuk gula aren alami dengan aroma karamel smoky yang khas dan indeks glikemik yang lebih ramah bagi tubuh.',
      shortDescription: 'Gula aren Desa Belok/Sidan diolah murni dari nira pohon aren (nao) tanpa bahan kimia, menghasilkan pemanis alami legit beraroma harum khas pedesaan.',
      nutritionItems: [
        {
          title: 'Indeks Glikemik Lebih Rendah',
          description: 'Memiliki indeks glikemik sekitar 35 (jauh lebih rendah dari gula pasir 65), tidak memicu lonjakan drastis gula darah.'
        },
        {
          title: 'Kaya Mineral Zat Besi & Kalsium',
          description: 'Mengandung zat besi untuk mencegah anemia serta kalsium dan fosfor untuk kekuatan tulang.'
        },
        {
          title: 'Mengandung Antioksidan Polifenol',
          description: 'Warna cokelat alami menyimpan senyawa antioksidan yang membantu melawan stres oksidatif sel.'
        },
        {
          title: 'Sumber Energi Berkelanjutan',
          description: 'Mengandung inulin (serat prebiotik) yang memperlambat penyerapan glukosa dan memelihara kesehatan usus.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya dan sebaran pohon nao dicatat berdasarkan populasi tegakan pohon produktif di desa.',
        distribution: 'Pohon nao tumbuh alami dan dibudidayakan di lereng-lereng perbukitan dan kebun warga Desa Belok/Sidan.',
        soilClimate: 'Tumbuh optimal di kawasan perbukitan dataran sejuk dengan kelembapan tanah yang baik dan aerasi optimal.'
      },
      varietyComparison: {
        title: 'Gula Aren Cetak Tradisional vs Gula Semut Aren',
        description: 'Dua bentuk olahan gula aren murni hasil produksi pengrajin nira Desa Belok/Sidan.',
        variants: [
          {
            name: 'Gula Aren Cetak (Batok/Bambu)',
            tagline: 'Bentuk olahan padat tradisional dicetak dalam batok kelapa atau bilah bambu',
            attributes: [
              { label: 'Bentuk & Warna', value: 'Bongkahan padat setengah bola atau silinder berwarna cokelat kemerahan pekat.' },
              { label: 'Cita Rasa & Aroma', value: 'Rasa manis legit pekat dengan aroma nira bakar tradisional yang kuat.' },
              { label: 'Proses Pembuatan', value: 'Nira kental dituang langsung ke dalam cetakan alami hingga membeku padat.' },
              { label: 'Pemanfaatan', value: 'Bahan kuah kolak, bumbu rujak Bali, kue tradisional, dan saus gula merah.' }
            ]
          },
          {
            name: 'Gula Semut Aren (Granulated Palm Sugar)',
            tagline: 'Bentuk serbuk kristal modern yang praktis larut dan tahan simpan lama',
            attributes: [
              { label: 'Bentuk & Tekstur', value: 'Serbuk butiran kristal halus berwarna cokelat keemasan yang kering dan higienis.' },
              { label: 'Karakteristik Penggunaan', value: 'Sangat mudah larut dalam air dingin maupun panas tanpa perlu diiris.' },
              { label: 'Pemanfaatan', value: 'Pemanis kopi spesialti, teh herbal, bahan bakery modern, dan komoditas oleh-oleh premium.' },
              { label: 'Daya Simpan', value: 'Kadar air rendah (< 2%) sehingga tahan disimpan hingga lebih dari satu tahun.' }
            ]
          }
        ]
      },
      highlights: [
        'Diolah murni dari sadapan nira segar pohon aren (nao) tanpa pengawet atau pemutih',
        'Indeks glikemik rendah dan kaya mineral alami (zat besi, kalium, kalsium)',
        'Cita rasa manis legit dengan aroma karamel smoky yang khas dan harum',
        'Mendukung perekonomian para pengrajin penderes nira tradisional desa',
        'Tersedia dalam bentuk cetak tradisional dan gula semut kristal praktis'
      ]
    },
    {
      slug: 'cengkeh',
      title: 'Cengkeh',
      subtitle: 'Rempah aromatik perkebunan dengan kandungan eugenol tinggi',
      image: 'assets/images/produk-cengkeh.png',
      description: 'Cengkeh (Syzygium aromaticum) adalah tanaman pohon rempah asli Nusantara dari keluarga Myrtaceae yang dipanen kuncup bunganya yang belum mekar dan dikeringkan. Di Desa Belok/Sidan, pohon cengkeh tumbuh subur di perbukitan dataran tinggi, menghasilkan kuncup cengkeh kering berwarna cokelat tua dengan kadar minyak atsiri eugenol yang tinggi dan aroma harum pedas yang khas.',
      shortDescription: 'Cengkeh Desa Belok/Sidan dipanen dari kuncup bunga pilihan dengan kandungan eugenol tinggi, beraroma harum tajam untuk rempah dan obat herbal.',
      nutritionItems: [
        {
          title: 'Kandungan Eugenol Alami Sangat Tinggi',
          description: 'Eugenol merupakan senyawa bioaktif utama cengkeh yang berfungsi sebagai antiseptik, anestetik, dan antibakteri kuat.'
        },
        {
          title: 'Antioksidan Sangat Kuat',
          description: 'Cengkeh menempati salah satu peringkat tertinggi dalam kapasitas antioksidan (skor ORAC tinggi) untuk melawan radikal bebas.'
        },
        {
          title: 'Kesehatan Gigi & Mulut',
          description: 'Minyak cengkeh telah digunakan berabad-abad untuk meredakan sakit gigi dan menjaga kesegaran napas.'
        },
        {
          title: 'Mendukung Kesehatan Saluran Pernapasan',
          description: 'Membantu mengencerkan dahak, melegakan tenggorokan, dan menghangatkan tubuh.'
        }
      ],
      farmInfo: {
        hectares: 'Terdapat 2,5 Hektar lahan perkebunan cengkeh yang dikelola oleh petani di wilayah Desa Belok/Sidan.',
        distribution: 'Tersebar Banjar Penikit.',
        soilClimate: 'Membutuhkan iklim tropis basah dengan tanah lempung berpasir subur, berdrainase lancar, dan ketinggian yang mendukung.'
      },
      varietyComparison: {
        title: 'Cengkeh Zanzibar vs Cengkeh Sikotok',
        description: 'Perbandingan dua kultivar pohon cengkeh unggulan yang banyak dibudidayakan oleh petani perkebunan.',
        variants: [
          {
            name: 'Cengkeh Zanzibar',
            tagline: 'Kultivar cengkeh paling unggul dengan produksi bunga lebat dan kadar minyak tinggi',
            attributes: [
              { label: 'Karakteristik Tanaman', value: 'Pohon berkanopi piramida dengan daun rimbun berwarna hijau tua mengilap dan tangkai kemerahan.' },
              { label: 'Kuncup Bunga', value: 'Bunga berukuran sedang, bergerombol padat, berwarna merah muda saat siap panen.' },
              { label: 'Kadar Minyak Atsiri', value: 'Kadar minyak atsiri eugenol sangat tinggi (18–22%) dengan aroma harum pedas tajam.' },
              { label: 'Pemanfaatan', value: 'Industri farmasi, minyak cengkeh, bumbu rempah dapur, dan bahan dupa wangi.' }
            ]
          },
          {
            name: 'Cengkeh Sikotok',
            tagline: 'Kultivar berpostur ramping dengan kuncup bunga berukuran besar',
            attributes: [
              { label: 'Karakteristik Tanaman', value: 'Tajuk pohon ramping dengan percabangan agak renggang dan pucuk daun berwarna hijau kekuningan.' },
              { label: 'Kuncup Bunga', value: 'Kuncup bunga berukuran lebih besar dan panjang dengan warna kuning kemerahan saat matang.' },
              { label: 'Karakteristik Pengeringan', value: 'Menghasilkan cengkeh kering berbobot mantap dan warna cokelat gelap.' },
              { label: 'Pemanfaatan', value: 'Bumbu rempah masakan tradisional, racikan jamu herbal, dan pengawet alami.' }
            ]
          }
        ]
      },
      highlights: [
        'Rempah legendaris bernilai ekonomi tinggi hasil perkebunan rakyat',
        'Kandungan senyawa eugenol tinggi dengan aroma harum pedas tajam',
        'Antioksidan sangat kuat untuk kesehatan dan daya tahan tubuh',
        'Bahan penting untuk bumbu kuliner, obat herbal, aromaterapi, dan tradisi',
        'Kuncup bunga dipetik manual dan dikeringkan secara alami di bawah sinar matahari'
      ]
    },
    {
      slug: 'kakao',
      title: 'Kakao',
      subtitle: 'Tanaman perkebunan penghasil biji cokelat berkualitas tinggi',
      image: 'assets/images/produk-kakao.png',
      description: 'Kakao (Theobroma cacao) adalah pohon perkebunan tropis yang menghasilkan buah dengan biji kakao di dalamnya sebagai bahan baku utama pembuatan cokelat dan mentega kakao. Di Desa Belok/Sidan, tanaman kakao dibudidayakan secara tumpang sari di bawah naungan pohon perkebunan lainnya, menghasilkan biji kakao berkualitas dengan fermentasi optimal.',
      shortDescription: 'Kakao Desa Belok/Sidan dibudidayakan di perkebunan rakyat subur, menghasilkan biji cokelat beraroma harum, kaya antioksidan flavonoid dan teobromin.',
      nutritionItems: [
        {
          title: 'Kaya Antioksidan Flavonoid (Epikatekin)',
          description: 'Flavonoid kakao membantu meningkatkan aliran darah ke otak dan jantung serta menurunkan tekanan darah.'
        },
        {
          title: 'Senyawa Teobromin Penenang Alami',
          description: 'Memberikan efek stimulasi lembut yang meningkatkan fokus, energi, dan suasana hati (mood booster).'
        },
        {
          title: 'Tinggi Mineral Magnesium & Zat Besi',
          description: 'Mendukung relaksasi otot, fungsi sistem saraf, dan pembentukan sel darah merah.'
        },
        {
          title: 'Lemak Sehat Lemak Kakao (Cocoa Butter)',
          description: 'Mengandung asam stearat dan asam oleat yang ramah bagi profil lipid jantung.'
        }
      ],
      farmInfo: {
        hectares: 'Terdapat 4,7 Hektar lahan perkebunan kakao yang dikelola oleh petani di wilayah Desa Belok/Sidan.',
        distribution: 'Tersebar di Banjar Sidan dan Penikit.',
        soilClimate: 'Membutuhkan tanah gembur berhumus tebal, drainase baik, dan naungan pohon peneduh di iklim dataran sejuk.'
      },
      varietyComparison: {
        title: 'Kakao Criollo vs Kakao Forastero',
        description: 'Perbandingan dua varietas kakao dunia yang merepresentasikan kualitas cita rasa halus dan ketahanan produksi.',
        variants: [
          {
            name: 'Kakao Criollo (Fine Flavor Cocoa)',
            tagline: 'Varietas kakao mulia dengan aroma kompleks dan cita rasa cokelat lembut',
            attributes: [
              { label: 'Karakteristik Buah', value: 'Kulit buah bergelombang kasar dengan warna merah atau kuning; biji berwarna putih krem di dalam.' },
              { label: 'Cita Rasa & Aroma', value: 'Aroma sangat harum, rasa cokelat lembut, tidak terlalu pahit, dengan nuansa fruity dan floral.' },
              { label: 'Nilai Pasar', value: 'Sangat diminati produsen cokelat artisan dan cokelat premium dunia.' },
              { label: 'Pemanfaatan', value: 'Cokelat batang gourmet, bubuk cokelat spesialti, dan produk confectionery mewah.' }
            ]
          },
          {
            name: 'Kakao Forastero (Bulk Cocoa)',
            tagline: 'Varietas kakao lindak dengan ketahanan tinggi dan rasa cokelat kuat',
            attributes: [
              { label: 'Karakteristik Buah', value: 'Kulit buah halus berbentuk bulat telur berwarna hijau kekuningan dengan biji ungu pekat.' },
              { label: 'Cita Rasa & Karakter', value: 'Cita rasa cokelat yang kuat, pekat, tegas, dengan tingkat keasaman dan pahit seimbang.' },
              { label: 'Produktivitas', value: 'Pohon sangat tangguh, tahan hama penyakit, dan memiliki produktivitas buah tinggi.' },
              { label: 'Pemanfaatan', value: 'Bahan baku utama industri cokelat olahan, mentega kakao, dan bubuk kakao murni.' }
            ]
          }
        ]
      },
      highlights: [
        'Bahan baku utama pembuatan cokelat murni dan bubuk kakao berkualitas',
        'Kaya antioksidan flavonoid, teobromin, dan mineral magnesium',
        'Mendukung kesehatan kardiovaskular dan peningkatan suasana hati',
        'Dibudidayakan secara tumpang sari ramah lingkungan di kebun rakyat',
        'Potensi perkebunan bernilai ekonomi berkelanjutan bagi petani desa'
      ]
    },
    {
      slug: 'kelapa',
      title: 'Kelapa',
      subtitle: 'Pohon kehidupan serbaguna penghasil minyak kelapa, banten upakara, dan kuliner',
      image: 'assets/images/produk-kelapa.png',
      description: 'Kelapa (Cocos nucifera) dijuluki sebagai "pohon kehidupan" (tree of life) karena setiap bagian tanamannya memiliki manfaat nyata bagi kehidupan manusia. Di Desa Belok/Sidan, kelapa memegang peranan krusial baik sebagai komoditas perkebunan bernilai ekonomi (minyak kelapa VCO, kelapa muda, kuliner) maupun sebagai sarana pokok yang tak tergantikan dalam upacara adat dan keagamaan Hindu Bali.',
      shortDescription: 'Kelapa di Desa Belok/Sidan mencakup varietas Kelapa Dalam dan Kelapa Genjah dengan pemanfaatan luas untuk bahan pangan, minyak VCO, dan sarana upacara adat.',
      nutritionItems: [
        {
          title: 'Asam Laurat & MCT (Medium Chain Triglycerides)',
          description: 'Minyak kelapa kaya asam laurat yang memiliki sifat antibakteri, antivirus, dan cepat diubah menjadi energi bersih.'
        },
        {
          title: 'Elektrolit Alami Air Kelapa',
          description: 'Air kelapa muda kaya kalium, natrium, kalsium, dan magnesium yang identik dengan cairan elektrolit tubuh.'
        },
        {
          title: 'Serat Pangan Daging Buah',
          description: 'Daging kelapa parut dan santan mengandung serat alami yang membantu menjaga kesehatan saluran pencernaan.'
        },
        {
          title: 'Mineral Mangan & Tembaga',
          description: 'Penting untuk kesehatan struktur tulang, metabolisme protein, dan pembentukan antioksidan endogen.'
        }
      ],
      farmInfo: {
        hectares: 'Terdapat 28,07 Hektar lahan perkebunan kelapa yang dikelola oleh petani di wilayah Desa Belok/Sidan.',
        distribution: 'Tersebar di Banjar Jempanang, Sekarmukti, Lawak, Belok, Selantang, Sidan, dan Penikit',
        soilClimate: 'Membutuhkan tanah subur dengan aerasi baik, penyinaran matahari penuh, dan pasokan air seimbang.'
      },
      varietyComparison: {
        title: 'Kelapa Dalam vs Kelapa Genjah',
        description: 'Kelapa di Desa Belok/Sidan terdiri atas dua varietas utama dengan karakteristik postur tanaman dan pemanfaatan yang saling melengkapi.',
        variants: [
          {
            name: 'Kelapa Dalam (Tall Coconut)',
            tagline: 'Pohon tinggi berumur panjang dengan produksi kopra dan minyak kelapa tinggi',
            attributes: [
              { label: 'Karakteristik Tanaman', value: 'Pohon berbatang tinggi kokoh (15–30 meter) dengan usia produktif mencapai puluhan tahun.' },
              { label: 'Karakteristik Buah', value: 'Buah berukuran relatif besar dengan daging buah tebal, keras, dan kadar minyak nabati tinggi.' },
              { label: 'Pemanfaatan', value: 'Bahan baku minyak kelapa tradisional/VCO, santan masakan, kopra, dan kayu bangunan.' },
              { label: 'Masa Berbuah', value: 'Mulai berbuah pada umur 6–8 tahun setelah tanam.' }
            ]
          },
          {
            name: 'Kelapa Genjah (Dwarf Coconut)',
            tagline: 'Pohon berpostur pendek/sedang yang cepat berbuah dan lebat',
            attributes: [
              { label: 'Karakteristik Tanaman', value: 'Pohon relatif pendek (3–5 meter) dan mulai berbuah cepat pada umur 3–4 tahun.' },
              { label: 'Karakteristik Buah', value: 'Buah lebat dalam jumlah banyak per tandan, kulit berwarna hijau, kuning (gading), atau jingga (bulan).' },
              { label: 'Peran Upakara Adat', value: 'Sarana mutlak dan utama dalam pembuatan banten sajen, daksina, dan upacara keagamaan di Bali.' },
              { label: 'Pemanfaatan', value: 'Minuman air kelapa muda segar penyejuk dahaga dan ritual keagamaan.' }
            ]
          }
        ]
      },
      highlights: [
        'Meliputi varietas Kelapa Dalam dan Kelapa Genjah yang saling melengkapi',
        'Pemanfaatan menyeluruh dari air kelapa, daging buah, batok, hingga sabut',
        'Bahan baku pembuatan minyak kelapa murni (VCO) dan kuliner khas Bali',
        'Komponen sakral dan wajib dalam sarana upacara adat dan keagamaan Hindu Bali',
        'Tanaman serbaguna yang menopang kehidupan dan tradisi masyarakat desa'
      ]
    },
    {
      slug: 'jahe',
      title: 'Jahe',
      subtitle: 'Rimpang biofarmaka unggulan penghangat tubuh dan peningkat imunitas',
      image: 'assets/images/produk-jahe.png',
      description: 'Jahe (Zingiber officinale) merupakan tanaman rimpang biofarmaka terpopuler dari suku Zingiberaceae. Rimpang jahe memiliki aroma harum pedas hangat yang berasal dari senyawa bioaktif gingerol dan shogaol. Di Desa Belok/Sidan, jahe dibudidayakan di kebun biofarmaka sebagai bahan baku minuman herbal penghangat, bumbu rempah kuliner, dan ramuan obat tradisional.',
      shortDescription: 'Jahe Desa Belok/Sidan berimpang tebal, padat, beraroma pedas hangat kuat, kaya gingerol untuk meningkatkan daya tahan tubuh dan kebugaran.',
      nutritionItems: [
        {
          title: 'Senyawa Gingerol & Shogaol',
          description: 'Senyawa bioaktif utama pemberi rasa pedas hangat yang memiliki aktivitas anti-inflamasi dan antioksidan kuat.'
        },
        {
          title: 'Pereda Mual & Masuk Angin',
          description: 'Sangat efektif meredakan mual, pusing perjalanan, perut kembung, dan rasa tidak nyaman pada pencernaan.'
        },
        {
          title: 'Pelancar Sirkulasi Darah & Penghangat',
          description: 'Membantu melebarkan pembuluh darah tepi, melancarkan peredaran darah, dan menghangatkan tubuh di udara dingin.'
        },
        {
          title: 'Pereda Nyeri Sendi & Otot',
          description: 'Sifat anti-inflamasinya membantu mengurangi nyeri otot setelah beraktivitas dan gejala radang sendi.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya jahe dicatat berdasarkan luasan kebun tanaman obat keluarga (TOGA) dan kelompok tani biofarmaka.',
        distribution: 'Tersebar di lahan kebun pekarangan dan tegalan gembur Desa Belok/Sidan.',
        soilClimate: 'Membutuhkan tanah gembur kaya humus dengan drainase baik agar rimpang tidak membusuk, serta curah hujan merata.'
      },
      varietyComparison: {
        title: 'Jahe Gajah (Badak) vs Jahe Merah',
        description: 'Perbandingan dua varietas jahe dengan karakteristik ukuran rimpang, tingkat kepedasan, dan khasiat obat.',
        variants: [
          {
            name: 'Jahe Gajah (Jahe Badak)',
            tagline: 'Rimpang berukuran besar gemuk dengan rasa pedas lembut dan sari berlimpah',
            attributes: [
              { label: 'Bentuk Rimpang', value: 'Rimpang sangat besar, gemuk menggembung, dengan ruas rimpang tebal berwarna kuning pucat.' },
              { label: 'Tingkat Kepedasan', value: 'Pedas lembut dengan aroma segar yang tidak terlalu menyengat.' },
              { label: 'Pemanfaatan', value: 'Bahan bumbu dapur harian, minuman wedang jahe segar, manisan jahe, dan kuliner masakan.' },
              { label: 'Karakteristik Sari', value: 'Kandungan air dan sari rimpang melimpah sehingga mudah diperas.' }
            ]
          },
          {
            name: 'Jahe Merah (Zingiber officinale var. rubrum)',
            tagline: 'Rimpang berkulit kemerahan dengan rasa pedas sangat tajam dan khasiat herbal tinggi',
            attributes: [
              { label: 'Bentuk Rimpang', value: 'Rimpang berukuran lebih kecil dengan kulit berwarna merah keunguan dan serat kuat.' },
              { label: 'Kandungan Gingerol', value: 'Kadar minyak atsiri dan gingerol paling tinggi di antara seluruh jenis jahe.' },
              { label: 'Tingkat Kepedasan', value: 'Rasa pedas sangat kuat, tajam, dan langsung menghangatkan tenggorokan.' },
              { label: 'Pemanfaatan', value: 'Bahan baku utama jamu tradisional, suplemen stamina herbal, dan pengobatan medis alami.' }
            ]
          }
        ]
      },
      highlights: [
        'Komoditas biofarmaka unggulan untuk kesehatan dan penghangat tubuh alami',
        'Kaya senyawa aktif gingerol dan shogaol berkhasiat anti-inflamasi',
        'Tersedia varietas Jahe Gajah yang berair melimpah dan Jahe Merah berkasiat tinggi',
        'Membantu meningkatkan daya tahan tubuh dan meredakan masuk angin',
        'Bahan utama aneka minuman herbal hangat dan bumbu rempah dapur'
      ]
    },
    {
      slug: 'umbi-umbian',
      title: 'Umbi-umbian',
      subtitle: 'Komoditas palawija sumber karbohidrat kompleks dan ketahanan pangan',
      image: 'assets/images/produk-umbi.png',
      description: 'Umbi-umbian (ubi jalar, singkong, dan talas) merupakan komoditas tanaman palawija penting yang dibudidayakan oleh petani Desa Belok/Sidan. Umbi-umbian menjadi sumber pangan karbohidrat kompleks kaya serat yang menopang ketahanan pangan lokal serta dapat diolah menjadi aneka kudapan tradisional bernilai gizi tinggi.',
      shortDescription: 'Umbi-umbian Desa Belok/Sidan kaya karbohidrat kompleks, serat sehat, dan antioksidan alami sebagai komoditas pangan palawija yang mengenyangkan.',
      nutritionItems: [
        {
          title: 'Karbohidrat Kompleks Pelepasan Lambat',
          description: 'Menyediakan energi stabil tanpa memicu lonjakan drastis gula darah, cocok untuk diet sehat.'
        },
        {
          title: 'Tinggi Serat & Prebiotik',
          description: 'Mendukung kesehatan saluran pencernaan dan menjadi nutrisi bagi bakteri menguntungkan usus.'
        },
        {
          title: 'Antioksidan Beta Karoten & Antosianin',
          description: 'Ubi jalar oranye kaya beta karoten dan ubi ungu kaya antosianin untuk perlindungan sel dari oksidasi.'
        },
        {
          title: 'Kaya Vitamin C & Vitamin B Kompleks',
          description: 'Mendukung metabolisme energi dan memelihara kesehatan sistem imun tubuh.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya umbi-umbian dicatat berdasarkan luasan tegalan palawija masyarakat.',
        distribution: 'Tersebar di lahan tegalan dan batas kebun masyarakat Desa Belok/Sidan.',
        soilClimate: 'Tumbuh subur pada tanah gembur berpasir yang remah sehingga umbi dapat berkembang leluasa dan berbobot besar.'
      },
      varietyComparison: {
        title: 'Ubi Jalar (Madu / Ungu) vs Singkong (Ubi Kayu)',
        description: 'Perbandingan dua jenis umbi palawija yang paling banyak dibudidayakan oleh petani desa.',
        variants: [
          {
            name: 'Ubi Jalar (Ipomoea batatas)',
            tagline: 'Umbi manis legit dengan variasi warna daging oranye (madu) dan ungu antioksidan',
            attributes: [
              { label: 'Karakteristik Umbi', value: 'Kulit halus tipis dengan daging umbi pulen manis berwarna kuning, oranye madu, atau ungu pekat.' },
              { label: 'Kandungan Khusus', value: 'Kaya akan vitamin A (beta karoten) dan antosianin yang sangat tinggi.' },
              { label: 'Cita Rasa', value: 'Rasa manis legit alami yang semakin manis saat dipanggang atau dikukus.' },
              { label: 'Pemanfaatan', value: 'Ubi rebus/kukus, ubi panggang madu, bahan kolak, dan olahan kue tradisional.' }
            ]
          },
          {
            name: 'Singkong / Ubi Kayu (Manihot esculenta)',
            tagline: 'Umbi bertepung tinggi yang empuk, renyah, dan mengenyangkan',
            attributes: [
              { label: 'Karakteristik Umbi', value: 'Umbi silindris panjang berkulit cokelat kasar dengan daging putih bersih atau kekuningan.' },
              { label: 'Kandungan Nutrisi', value: 'Sumber karbohidrat pati murni yang sangat mengenyangkan dan bebas gluten.' },
              { label: 'Tekstur Saat Dimasak', value: 'Tekstur merekah empuk saat direbus dan sangat renyah saat digoreng.' },
              { label: 'Pemanfaatan', value: 'Singkong goreng mekar, keripik singkong, tape singkong, dan bahan tepung tapioka.' }
            ]
          }
        ]
      },
      highlights: [
        'Sumber karbohidrat kompleks alami yang sehat dan mengenyangkan',
        'Kaya serat pangan, prebiotik, vitamin C, dan antioksidan warna alami',
        'Mudah dibudidayakan dengan daya tahan tinggi terhadap perubahan cuaca',
        'Bahan baku serbaguna untuk aneka kuliner tradisional dan camilan sehat',
        'Menopang pilar ketahanan pangan mandiri masyarakat Desa Belok/Sidan'
      ]
    },
    {
      slug: 'kacang-tanah',
      title: 'Kacang Tanah',
      subtitle: 'Tanaman palawija polong tanah kaya protein nabati dan lemak sehat',
      image: 'assets/images/produk-kacang-tanah.png',
      description: 'Kacang tanah (Arachis hypogaea) merupakan tanaman polong-polongan anggota suku Fabaceae yang memiliki keunikan pembuahan di mana tangkai bunga (ginofor) masuk ke dalam tanah untuk membesarkan polongnya. Di Desa Belok/Sidan, kacang tanah dibudidayakan sebagai tanaman palawija yang menyuburkan tanah karena bersimbiosis mengikat nitrogen udara.',
      shortDescription: 'Kacang tanah Desa Belok/Sidan berpolong padat dengan biji bernas, gurih manis, kaya protein nabati dan lemak tak jenuh untuk kesehatan jantung.',
      nutritionItems: [
        {
          title: 'Tinggi Protein Nabati Berkualitas',
          description: 'Menyediakan sekitar 25% protein nabati yang sangat baik untuk perbaikan jaringan dan pertumbuhan sel tubuh.'
        },
        {
          title: 'Kaya Asam Lemak Tak Jenuh',
          description: 'Mengandung asam oleat dan linoleat yang membantu menurunkan kolesterol jahat dan menjaga kesehatan jantung.'
        },
        {
          title: 'Antioksidan Resveratrol',
          description: 'Senyawa polifenol bioaktif yang membantu melindungi pembuluh darah dari inflamasi dan penuaan dini.'
        },
        {
          title: 'Kandungan Vitamin E & Niasin (B3)',
          description: 'Mendukung kesehatan kulit, fungsi kognitif otak, dan metabolisme konversi energi.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya kacang tanah dicatat berdasarkan luasan panen palawija musiman.',
        distribution: 'Ditanam pada lahan tegalan dan rotasi tanaman sawah di Desa Belok/Sidan.',
        soilClimate: 'Membutuhkan tanah gembur berpasir dan remah agar ginofor mudah menembus tanah, serta penyinaran matahari penuh.'
      },
      varietyComparison: {
        title: 'Kacang Tanah Biji Dua vs Kacang Tanah Biji Tiga/Empat',
        description: 'Perbandingan kultivar kacang tanah berdasarkan jumlah biji per polong dan tekstur kerenyahannya.',
        variants: [
          {
            name: 'Kacang Tanah Biji Dua (Kacang Garing)',
            tagline: 'Kultivar polong berisi dua biji berukuran besar dan gurih',
            attributes: [
              { label: 'Bentuk Polong', value: 'Polong berpinggang jelas berisi dua butir biji besar bernas berkulit ari merah muda.' },
              { label: 'Tekstur & Rasa', value: 'Rasa gurih manis berlemak dengan kerenyahan maksimal saat disangrai atau digoreng.' },
              { label: 'Pemanfaatan', value: 'Bahan kacang bawang, kacang oven, selai kacang (peanut butter), dan bumbu gado-gado.' },
              { label: 'Karakteristik', value: 'Ukuran biji seragam dan sangat disukai industri olahan kacang goreng.' }
            ]
          },
          {
            name: 'Kacang Tanah Biji Tiga/Empat (Kacang Lokal)',
            tagline: 'Kultivar polong panjang berisi 3–4 biji yang manis untuk kacang rebus',
            attributes: [
              { label: 'Bentuk Polong', value: 'Polong lebih panjang lurus berisi 3 hingga 4 butir biji berukuran sedang.' },
              { label: 'Tekstur & Rasa', value: 'Kadar gula alami lebih terasa manis empuk dan gurih saat direbus segar.' },
              { label: 'Pemanfaatan', value: 'Sangat favorit untuk kacang rebus kulit hangat, sayur asam, dan camilan pasar.' },
              { label: 'Masa Panen', value: 'Dipanen pada umur 90–100 hari saat polong telah mengeras sempurna.' }
            ]
          }
        ]
      },
      highlights: [
        'Sumber protein nabati tinggi dan lemak tak jenuh yang menyehatkan jantung',
        'Mengandung antioksidan resveratrol dan vitamin E untuk kebugaran tubuh',
        'Biji bernas, padat, renyah, dan berasa gurih manis alami',
        'Menyuburkan tanah pertanian melalui penambatan nitrogen alami dari udara',
        'Bahan serbaguna untuk aneka camilan kacang, bumbu sambal kacang, dan olahan pangan'
      ]
    },
    {
      slug: 'porang',
      title: 'Porang',
      subtitle: 'Komoditas umbi palawija bernilai ekspor tinggi penghasil glukomanan',
      image: 'assets/images/produk-porang.png',
      description: 'Porang atau iles-iles (Amorphophallus muelleri) adalah tanaman herba anggota famili Araceae penghasil umbi batang yang mengandung serat alami glukomanan berkadar tinggi. Di Desa Belok/Sidan, tanaman porang dibudidayakan secara tumpang sari di bawah naungan pohon perkebunan, menjadi komoditas komersial bernilai tinggi untuk industri pangan sehat dan ekspor.',
      shortDescription: 'Porang Desa Belok/Sidan dibudidayakan di bawah naungan kebun alami, menghasilkan umbi kaya glukomanan untuk bahan makanan sehat dan komoditas ekspor.',
      nutritionItems: [
        {
          title: 'Serat Larut Glukomanan Murni',
          description: 'Glukomanan adalah serat larut air dengan kemampuan mengembang hingga ratusan kali lipat, sangat mengenyangkan dan bebas kalori.'
        },
        {
          title: 'Menurunkan Kolesterol & Trigliserida',
          description: 'Membantu mengikat asam empedu dan lemak di usus sehingga menurunkan kadar kolesterol jahat (LDL).'
        },
        {
          title: 'Manajemen Gula Darah (Diabetes Friendly)',
          description: 'Memperlambat penyerapan karbohidrat dalam saluran cerna sehingga mencegah lonjakan glukosa darah.'
        },
        {
          title: 'Bahan Baku Shirataki & Konnyaku',
          description: 'Menjadi bahan dasar makanan sehat internasional seperti beras shirataki dan mi konjac yang bebas lemak dan nol kalori.'
        }
      ],
      farmInfo: {
        hectares: 'Data luas budidaya porang dicatat berdasarkan luasan kebun tumpang sari porang kelompok tani.',
        distribution: 'Dibudidayakan di bawah naungan pohon perkebunan (kopi, kakao, kelapa) di Desa Belok/Sidan.',
        soilClimate: 'Membutuhkan naungan 40–60%, tanah gembur kaya bahan organik dengan drainase lancar, dan iklim sejuk.'
      },
      varietyComparison: {
        title: 'Porang Budidaya (A. muelleri) vs Suweg / Iles-iles Liar',
        description: 'Perbedaan ciri fisik antara tanaman porang budidaya bernilai tinggi dengan tanaman kerabat dekatnya.',
        variants: [
          {
            name: 'Porang Budidaya (Amorphophallus muelleri)',
            tagline: 'Kultivar unggul berumbi kuning kaya glukomanan dengan katak (bubil) di ketiak daun',
            attributes: [
              { label: 'Ciri Daun & Katak', value: 'Memiliki katak/bubil (umbi udara) berwarna cokelat tua di setiap percabangan tulang daunnya.' },
              { label: 'Batang & Kulit', value: 'Batang hijau mulus bercak putih memanjang tanpa duri kasar.' },
              { label: 'Daging Umbi', value: 'Daging umbi berwarna kuning jingga cerah dengan serat glukomanan yang sangat kental dan padat.' },
              { label: 'Nilai Ekonomi', value: 'Permintaan ekspor sangat tinggi untuk industri tepung glukomanan dan makanan shirataki.' }
            ]
          },
          {
            name: 'Suweg / Iles-iles Liar (Amorphophallus paeoniifolius)',
            tagline: 'Spesies kerabat tanpa katak daun dengan umbi bertepung padat',
            attributes: [
              { label: 'Ciri Daun', value: 'Tidak memiliki umbi katak (bubil) pada percabangan tulang daunnya.' },
              { label: 'Batang', value: 'Batang bertekstur agak kasar dengan bintil-bintil kecil.' },
              { label: 'Daging Umbi', value: 'Daging umbi berwarna putih krem keunguan dengan kandungan pati tepung lebih dominan daripada glukomanan.' },
              { label: 'Pemanfaatan', value: 'Umbi kukus tradisional untuk konsumsi pangan lokal pedesaan.' }
            ]
          }
        ]
      },
      highlights: [
        'Komoditas perkebunan dan palawija bernilai ekspor tinggi',
        'Penghasil serat larut glukomanan murni dengan sejuta manfaat kesehatan',
        'Bahan baku utama industri pangan sehat shirataki, konjac, dan kosmetik',
        'Sangat cocok dibudidayakan secara tumpang sari di bawah naungan pohon',
        'Membuka peluang ekonomi baru yang menjanjikan bagi para petani desa'
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
