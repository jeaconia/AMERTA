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

export interface ProdukFarmInfo {
  hectares: string;
  distribution: string;
  soilClimate: string;
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
      title: 'Durian Musangking',
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
        hectares: 'Sekitar 80 hektar lahan perkebunan kopi arabika dikelola oleh kelompok tani di dataran tinggi Desa Belok/Sidan.',
        distribution: 'Perkebunan kopi tersebar di area lereng pegunungan Kecamatan Petang yang memiliki ketinggian dan kemiringan lahan ideal.',
        soilClimate: 'Tanah andosol yang subur serta iklim sejuk dengan suhu stabil dan curah hujan merata mendukung pertumbuhan biji kopi arabika berkualitas tinggi.'
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
      subtitle: 'Pesona alam yang menjadi kebanggaan desa',
      image: 'assets/images/produk-bunga-gemitir.png',
      description: 'Bunga Gemitir hadir sebagai produk alam yang menawan dan sering dijadikan simbol keindahan lingkungan Desa Belok/Sidan.',
      shortDescription: 'Bunga Gemitir (marigold) tumbuh subur di Desa Belok/Sidan dengan warna kuning-oranye yang cerah. Selain bernilai estetika tinggi, bunga ini juga digunakan dalam upacara adat dan memiliki potensi manfaat kesehatan.',
      nutritionItems: [
        {
          title: 'Sumber Antioksidan',
          description: 'Kandungan lutein dan zeaxanthin pada bunga gemitir berperan sebagai antioksidan alami.'
        },
        {
          title: 'Mendukung Kesehatan Mata',
          description: 'Senyawa karotenoid dilaporkan berpotensi membantu menjaga kesehatan mata.'
        },
        {
          title: 'Bersifat Anti-inflamasi',
          description: 'Ekstrak bunga gemitir secara tradisional digunakan untuk membantu meredakan peradangan ringan.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 15 hektar lahan budidaya bunga gemitir tersebar di pekarangan dan kebun warga Desa Belok/Sidan.',
        distribution: 'Penanaman terpusat di dusun-dusun dengan akses sinar matahari yang cukup sepanjang hari untuk mendukung pertumbuhan bunga.',
        soilClimate: 'Tanah gembur dengan drainase baik serta iklim sejuk dan cerah sangat mendukung pertumbuhan bunga gemitir yang optimal.'
      },
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
      shortDescription: 'Vanili Desa Belok/Sidan merupakan rempah bernilai ekonomi tinggi dengan aroma khas yang kuat setelah melalui proses fermentasi dan pengeringan tradisional. Dikenal sebagai salah satu rempah termahal di dunia.',
      nutritionItems: [
        {
          title: 'Sumber Antioksidan',
          description: 'Senyawa vanilin pada vanili memiliki sifat antioksidan yang membantu melindungi sel tubuh.'
        },
        {
          title: 'Bersifat Menenangkan',
          description: 'Aroma khas vanili secara tradisional dipercaya membantu menenangkan pikiran dan mengurangi stres.'
        },
        {
          title: 'Berpotensi Anti-inflamasi',
          description: 'Kandungan senyawa bioaktif dalam vanili berpotensi membantu meredakan peradangan ringan.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 20 hektar lahan budidaya vanili dikembangkan sebagai tanaman rambatan di kebun campuran warga.',
        distribution: 'Sebaran tanaman vanili banyak ditemukan di pekarangan dan kebun agroforestri Desa Belok/Sidan yang teduh.',
        soilClimate: 'Tanah subur dengan naungan pohon pelindung serta kelembapan udara tinggi dan suhu hangat mendukung pertumbuhan tanaman vanili.'
      },
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
      shortDescription: 'Alpukat Desa Belok/Sidan tumbuh subur di dataran tinggi, menghasilkan buah dengan daging lembut, warna hijau kekuningan, dan rasa creamy yang khas. Dipanen pada tingkat kematangan optimal untuk kualitas terbaik.',
      nutritionItems: [
        {
          title: 'Kaya Lemak Sehat',
          description: 'Kandungan lemak tak jenuh tunggal pada alpukat baik untuk kesehatan jantung.'
        },
        {
          title: 'Sumber Vitamin E',
          description: 'Vitamin E dan antioksidan lain membantu menjaga kesehatan kulit dan melawan radikal bebas.'
        },
        {
          title: 'Mendukung Pencernaan',
          description: 'Serat alami pada alpukat membantu melancarkan sistem pencernaan.'
        },
        {
          title: 'Sumber Kalium',
          description: 'Kandungan kalium membantu menjaga keseimbangan cairan tubuh dan tekanan darah.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 35 hektar lahan perkebunan alpukat dikelola oleh petani di dataran tinggi Desa Belok/Sidan.',
        distribution: 'Tanaman alpukat tersebar di kebun-kebun warga dan lahan perbukitan Kecamatan Petang dengan drainase yang baik.',
        soilClimate: 'Tanah subur berstruktur gembur serta iklim sejuk dengan curah hujan cukup mendukung pertumbuhan pohon alpukat yang produktif.'
      },
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
      shortDescription: 'Bayam Inggris (strawberry) Desa Belok/Sidan tumbuh di dataran tinggi yang sejuk, menghasilkan buah beri kecil berwarna merah cerah dengan rasa asam-manis yang segar.',
      nutritionItems: [
        {
          title: 'Sumber Vitamin C',
          description: 'Kandungan vitamin C yang tinggi membantu meningkatkan daya tahan tubuh.'
        },
        {
          title: 'Kaya Antioksidan',
          description: 'Antosianin dan polifenol berperan melindungi sel tubuh dari kerusakan akibat radikal bebas.'
        },
        {
          title: 'Mendukung Kesehatan Kulit',
          description: 'Kandungan antioksidan dan vitamin membantu menjaga kesehatan dan elastisitas kulit.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 10 hektar lahan budidaya bayam inggris dikembangkan di area dataran tinggi Desa Belok/Sidan.',
        distribution: 'Penanaman terpusat di dusun-dusun dengan suhu sejuk yang mendukung pembungaan dan pembuahan optimal.',
        soilClimate: 'Tanah gembur kaya humus serta iklim sejuk dengan suhu stabil mendukung pertumbuhan tanaman bayam inggris yang subur.'
      },
      highlights: [
        'Sumber vitamin C alami',
        'Baik untuk olahan minuman dan selai',
        'Diproduksi oleh petani lokal yang terampil'
      ]
    },
    {
      slug: 'cabai',
      title: 'Cabai',
      subtitle: 'Cabai segar dengan warna cerah dan rasa pedas khas',
      image: 'assets/images/produk-cabai.png',
      description: 'Cabai lokal Desa Belok/Sidan dipilih dari panen terbaik, memberikan rasa pedas segar untuk konsumsi sehari-hari dan bumbu masak tradisional.',
      shortDescription: 'Cabai Desa Belok/Sidan dipanen segar dengan warna merah cerah dan tingkat kepedasan yang khas, menjadi bumbu utama masakan sehari-hari masyarakat sekitar.',
      nutritionItems: [
        {
          title: 'Sumber Vitamin C',
          description: 'Cabai segar mengandung vitamin C yang tinggi untuk mendukung sistem imun tubuh.'
        },
        {
          title: 'Mengandung Capsaicin',
          description: 'Senyawa capsaicin berperan memberikan rasa pedas serta berpotensi membantu meningkatkan metabolisme.'
        },
        {
          title: 'Bersifat Antioksidan',
          description: 'Kandungan beta-karoten dan flavonoid membantu melawan radikal bebas dalam tubuh.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 25 hektar lahan pertanian cabai dikelola secara musiman oleh petani Desa Belok/Sidan.',
        distribution: 'Penanaman cabai tersebar di lahan terbuka dengan sinar matahari penuh di beberapa dusun Kecamatan Petang.',
        soilClimate: 'Tanah gembur dengan drainase baik serta iklim hangat dan curah hujan sedang mendukung produktivitas tanaman cabai.'
      },
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
      shortDescription: 'Gula Aren Desa Belok/Sidan diolah dari nira pohon aren melalui proses pemasakan tradisional, menghasilkan gula berwarna cokelat dengan aroma khas dan rasa manis alami.',
      nutritionItems: [
        {
          title: 'Indeks Glikemik Lebih Rendah',
          description: 'Gula aren memiliki indeks glikemik yang relatif lebih rendah dibanding gula pasir biasa.'
        },
        {
          title: 'Mengandung Mineral Alami',
          description: 'Kandungan zat besi, kalium, dan zinc mendukung fungsi tubuh secara umum.'
        },
        {
          title: 'Diproses Tanpa Bahan Kimia',
          description: 'Diolah secara tradisional tanpa bahan pemutih atau pengawet buatan.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 30 hektar area pohon aren tumbuh alami di kawasan perbukitan Desa Belok/Sidan.',
        distribution: 'Pohon aren tersebar di lahan-lahan konservasi dan tepi hutan yang dikelola turun-temurun oleh warga setempat.',
        soilClimate: 'Tanah lembap berbukit dengan naungan alami serta iklim tropis sejuk mendukung pertumbuhan pohon aren yang menghasilkan nira berkualitas.'
      },
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
      shortDescription: 'Jeruk Brastagi Desa Belok/Sidan tumbuh di dataran tinggi dengan kulit tebal, daging buah berair, serta rasa manis-kecut yang segar dan seimbang.',
      nutritionItems: [
        {
          title: 'Sumber Vitamin C Tinggi',
          description: 'Kandungan vitamin C membantu meningkatkan daya tahan tubuh dan kesehatan kulit.'
        },
        {
          title: 'Kaya Serat',
          description: 'Serat alami pada jeruk mendukung kesehatan sistem pencernaan.'
        },
        {
          title: 'Sumber Antioksidan',
          description: 'Flavonoid pada jeruk membantu melindungi tubuh dari radikal bebas.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 40 hektar lahan perkebunan jeruk brastagi dikembangkan di dataran tinggi Desa Belok/Sidan.',
        distribution: 'Perkebunan tersebar di lereng-lereng bukit dengan sirkulasi udara baik di Kecamatan Petang.',
        soilClimate: 'Tanah subur berdrainase baik serta iklim sejuk dengan suhu stabil mendukung pertumbuhan jeruk yang manis dan berair.'
      },
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
      shortDescription: 'Jeruk Siam Madu Desa Belok/Sidan memiliki rasa manis dominan dengan aroma harum yang khas, kulit tipis mudah dikupas, dan tekstur daging buah yang lembut berair.',
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
        hectares: 'Sekitar 38 hektar lahan perkebunan jeruk siam madu dikelola oleh petani setempat.',
        distribution: 'Sebaran tanaman terkonsentrasi di dusun-dusun dengan ketinggian sedang dan paparan sinar matahari yang cukup.',
        soilClimate: 'Tanah subur dengan pH seimbang serta iklim sejuk dan curah hujan merata mendukung rasa manis khas jeruk siam madu.'
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
        soilClimate: 'Tanah aluvial yang subur dengan pengairan sawah yang teratur serta iklim tropis mendukung dua hingga tiga kali masa tanam per tahun.'
      },
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
      shortDescription: 'Sawi Putih Desa Belok/Sidan tumbuh dengan daun renyah berwarna hijau muda hingga putih, bertekstur segar, dan banyak digunakan sebagai bahan masakan sehari-hari maupun sayuran fermentasi.',
      nutritionItems: [
        {
          title: 'Sumber Vitamin dan Mineral',
          description: 'Mengandung vitamin A, C, K, serta mineral penting yang mendukung kesehatan tubuh secara umum.'
        },
        {
          title: 'Kaya Serat',
          description: 'Serat alami pada sawi putih membantu melancarkan pencernaan dan menjaga kesehatan usus.'
        },
        {
          title: 'Sumber Protein dan Asam Amino',
          description: 'Kandungan protein dan asam amino berperan mendukung fungsi tubuh sehari-hari.'
        },
        {
          title: 'Rendah Kalori',
          description: 'Cocok untuk pola makan sehat karena kandungan kalorinya yang rendah namun bergizi.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 28 hektar lahan pertanian sawi putih dikelola oleh petani di dataran tinggi Desa Belok/Sidan.',
        distribution: 'Penanaman tersebar di beberapa dusun dengan suhu sejuk yang mendukung pertumbuhan daun yang renyah.',
        soilClimate: 'Tanah gembur kaya bahan organik serta iklim sejuk dengan kelembapan cukup mendukung pertumbuhan sawi putih yang optimal.'
      },
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
      shortDescription: 'Sayur Hortikultura Desa Belok/Sidan mencakup beragam jenis sayuran segar yang ditanam dengan standar kualitas terjaga, mulai dari sayuran daun hingga sayuran buah untuk kebutuhan konsumsi harian.',
      nutritionItems: [
        {
          title: 'Sumber Vitamin dan Mineral Beragam',
          description: 'Variasi sayuran menyediakan kombinasi vitamin dan mineral yang lengkap bagi tubuh.'
        },
        {
          title: 'Kaya Serat Alami',
          description: 'Kandungan serat mendukung kesehatan pencernaan dan rasa kenyang lebih lama.'
        },
        {
          title: 'Rendah Kalori dan Lemak',
          description: 'Cocok untuk mendukung pola makan sehat dan seimbang sehari-hari.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 60 hektar lahan hortikultura campuran dikelola oleh kelompok tani Desa Belok/Sidan.',
        distribution: 'Lahan tanam tersebar di berbagai dusun dengan pola tanam bergilir untuk menjaga kesuburan tanah.',
        soilClimate: 'Tanah subur dengan struktur gembur serta iklim sejuk dataran tinggi mendukung keragaman jenis sayuran yang tumbuh optimal.'
      },
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
      shortDescription: 'Timun Jepang Desa Belok/Sidan memiliki bentuk memanjang, kulit tipis, dan tekstur renyah dengan kadar air tinggi, menjadikannya pilihan segar untuk salad dan sajian sehat.',
      nutritionItems: [
        {
          title: 'Kadar Air Tinggi',
          description: 'Kandungan air yang tinggi membantu menjaga hidrasi tubuh.'
        },
        {
          title: 'Rendah Kalori',
          description: 'Cocok untuk menu diet karena kandungan kalorinya yang rendah.'
        },
        {
          title: 'Sumber Vitamin K',
          description: 'Kandungan vitamin K mendukung kesehatan tulang dan proses pembekuan darah.'
        }
      ],
      farmInfo: {
        hectares: 'Sekitar 18 hektar lahan budidaya timun jepang dikembangkan menggunakan sistem para-para (rambatan).',
        distribution: 'Penanaman tersebar di lahan terbuka dengan sinar matahari cukup di beberapa dusun Desa Belok/Sidan.',
        soilClimate: 'Tanah gembur dengan drainase baik serta iklim hangat dan penyiraman teratur mendukung pertumbuhan timun yang renyah dan segar.'
      },
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
