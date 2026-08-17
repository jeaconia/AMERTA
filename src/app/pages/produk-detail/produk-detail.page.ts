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
      varietyComparison: {
        title: 'Durian Musang King vs Durian Montong',
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
            name: 'Durian Montong',
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
        hectares: 'Sekitar 80 hektar lahan perkebunan kopi arabika dikelola oleh kelompok tani di dataran tinggi Desa Belok/Sidan.',
        distribution: 'Perkebunan kopi tersebar di area lereng pegunungan Kecamatan Petang yang memiliki ketinggian dan kemiringan lahan ideal.',
        soilClimate: 'Tanah andosol yang subur serta iklim sejuk dengan suhu stabil dan curah hujan merata mendukung pertumbuhan biji kopi arabika berkualitas tinggi.'
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
      varietyComparison: {
        title: 'Gemitir Kuning vs Gemitir Oranye',
        description: 'Kedua warna gemitir ini sama-sama populer, namun memiliki perbedaan pada bentuk kelopak, aroma, dan kegunaannya.',
        variants: [
          {
            name: 'Gemitir Kuning',
            attributes: [
              { label: 'Aroma', value: 'Lebih lembut dan segar' },
              { label: 'Bentuk & Tekstur', value: 'Kelopak rapat dan bulat sempurna' },
              { label: 'Warna', value: 'Kuning cerah keemasan' },
              { label: 'Kegunaan', value: 'Umum dipakai untuk canang dan dekorasi sehari-hari' }
            ]
          },
          {
            name: 'Gemitir Oranye',
            attributes: [
              { label: 'Aroma', value: 'Lebih kuat dan khas' },
              { label: 'Bentuk & Tekstur', value: 'Kelopak lebih besar dan agak mekar terbuka' },
              { label: 'Warna', value: 'Oranye pekat kemerahan' },
              { label: 'Kegunaan', value: 'Sering dipakai pada upacara adat karena warnanya mencolok' }
            ]
          }
        ]
      },
      highlights: [
        'Menonjolkan identitas budaya dan alam desa',
        'Memiliki nilai estetika yang tinggi',
        'Dapat dikembangkan sebagai produk wisata dan kerajinan'
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
      varietyComparison: {
        title: 'Alpukat Mentega vs Alpukat Ijo Panjang',
        description: 'Dua varietas alpukat lokal populer ini punya perbedaan pada tekstur daging, rasa, dan bentuk buahnya.',
        variants: [
          {
            name: 'Alpukat Mentega',
            attributes: [
              { label: 'Rasa', value: 'Creamy legit, sedikit manis seperti mentega' },
              { label: 'Bentuk & Tekstur', value: 'Daging tebal, lembut, dan halus seperti mentega' },
              { label: 'Warna', value: 'Kulit hijau tua, daging kuning mentega' },
              { label: 'Bentuk Buah', value: 'Bulat lonjong dengan biji kecil' }
            ]
          },
          {
            name: 'Alpukat Ijo Panjang',
            attributes: [
              { label: 'Rasa', value: 'Lebih ringan dan sedikit berair' },
              { label: 'Bentuk & Tekstur', value: 'Daging lebih padat dan sedikit berserat' },
              { label: 'Warna', value: 'Kulit hijau muda mengkilap, daging hijau kekuningan' },
              { label: 'Bentuk Buah', value: 'Lonjong memanjang dengan biji lebih besar' }
            ]
          }
        ]
      },
      highlights: [
        'Kaya vitamin dan lemak sehat',
        'Cocok untuk jus, salad, dan paté',
        'Produk buah lokal dengan permintaan tinggi'
      ]
    },

    {
      slug: 'cabai-besar',
      title: 'Cabai Besar',
      subtitle: 'Cabai besar dengan warna cerah dan rasa pedas sedang',
      image: 'assets/images/produk-cabai besar.png',
      description: 'Cabai besar lokal Desa Belok/Sidan memiliki buah lebih besar dengan rasa pedas sedang, cocok untuk berbagai olahan masakan.',
      shortDescription: 'Cabai Besar dipanen segar dengan ukuran buah lebih besar dan kulit lebih tebal, sering dipakai sebagai bahan sambal matang dan olahan sayur.',
      nutritionItems: [
        { title: 'Sumber Vitamin C', description: 'Cabai segar mengandung vitamin C yang tinggi untuk mendukung sistem imun tubuh.' },
        { title: 'Mengandung Capsaicin', description: 'Senyawa capsaicin berperan memberikan rasa pedas serta berpotensi membantu meningkatkan metabolisme.' },
        { title: 'Bersifat Antioksidan', description: 'Kandungan beta-karoten dan flavonoid membantu melawan radikal bebas dalam tubuh.' }
      ],
      farmInfo: {
        hectares: 'Sekitar 25 hektar lahan pertanian cabai dikelola secara musiman oleh petani Desa Belok/Sidan.',
        distribution: 'Penanaman cabai tersebar di lahan terbuka dengan sinar matahari penuh di beberapa dusun Kecamatan Petang.',
        soilClimate: 'Tanah gembur dengan drainase baik serta iklim hangat dan curah hujan sedang mendukung produktivitas tanaman cabai.'
      },
      varietyComparison: {
        title: 'Cabai Besar vs Cabai Keriting',
        description: 'Perbandingan antara cabai besar dan cabai keriting dari segi bentuk, tekstur, dan kegunaan.',
        variants: [
          { name: 'Cabai Besar', attributes: [ { label: 'Rasa', value: 'Pedas sedang' }, { label: 'Bentuk & Tekstur', value: 'Buah lebih besar dengan kulit lebih tebal' }, { label: 'Warna', value: 'Merah cerah' }, { label: 'Kegunaan', value: 'Cocok untuk sambal matang, olahan tumis' } ] },
          { name: 'Cabai Keriting', attributes: [ { label: 'Rasa', value: 'Pedas sedang dengan aroma lebih kuat' }, { label: 'Bentuk & Tekstur', value: 'Lebih panjang dan bergelombang, kulit lebih tebal' }, { label: 'Warna', value: 'Merah cerah mengilap' }, { label: 'Kegunaan', value: 'Umum untuk bumbu dasar masakan dan sambal goreng' } ] }
        ]
      },
      highlights: [ 'Dipanen secara selektif', 'Aroma pedas tajam dan segar', 'Komoditas penting untuk pasar lokal' ]
    },
    {
      slug: 'cabai-rawit',
      title: 'Cabai Rawit',
      subtitle: 'Cabai kecil dengan tingkat kepedasan tinggi',
      image: 'assets/images/produk-cabai rawit.png',
      description: 'Cabai rawit dikenal karena tingkat kepedasannya yang tinggi dan sering dipakai sebagai bahan utama sambal tradisional.',
      shortDescription: 'Cabai Rawit dipanen segar, berukuran kecil namun sangat pedas, sering digunakan sebagai penambah cita rasa pedas pada sambal dan masakan lokal.',
      nutritionItems: [
        { title: 'Sumber Vitamin C', description: 'Cabai segar mengandung vitamin C yang tinggi untuk mendukung sistem imun tubuh.' },
        { title: 'Mengandung Capsaicin', description: 'Senyawa capsaicin berperan memberikan rasa pedas serta berpotensi membantu meningkatkan metabolisme.' },
        { title: 'Bersifat Antioksidan', description: 'Kandungan beta-karoten dan flavonoid membantu melawan radikal bebas dalam tubuh.' }
      ],
      farmInfo: {
        hectares: 'Sekitar 25 hektar lahan pertanian cabai dikelola secara musiman oleh petani Desa Belok/Sidan.',
        distribution: 'Penanaman cabai tersebar di lahan terbuka dengan sinar matahari penuh di beberapa dusun Kecamatan Petang.',
        soilClimate: 'Tanah gembur dengan drainase baik serta iklim hangat dan curah hujan sedang mendukung produktivitas tanaman cabai.'
      },
      varietyComparison: {
        title: 'Cabai Rawit vs Cabai Keriting',
        description: 'Dua jenis cabai yang paling banyak dicari ini punya perbedaan mencolok dari segi tingkat kepedasan, bentuk, dan kegunaannya di dapur.',
        variants: [
          { name: 'Cabai Rawit', attributes: [ { label: 'Rasa', value: 'Sangat pedas dan tajam' }, { label: 'Bentuk & Tekstur', value: 'Ukuran kecil, memanjang lurus, kulit tipis' }, { label: 'Warna', value: 'Hijau saat muda, merah menyala saat matang' }, { label: 'Kegunaan', value: 'Cocok untuk sambal dan bumbu pedas' } ] },
          { name: 'Cabai Keriting', attributes: [ { label: 'Rasa', value: 'Pedas sedang dengan aroma lebih kuat' }, { label: 'Bentuk & Tekstur', value: 'Lebih panjang dan bergelombang, kulit lebih tebal' }, { label: 'Warna', value: 'Merah cerah mengilap' }, { label: 'Kegunaan', value: 'Umum untuk bumbu dasar masakan dan sambal goreng' } ] }
        ]
      },
      highlights: [ 'Dipanen secara selektif', 'Aroma pedas tajam dan segar', 'Komoditas penting untuk pasar lokal' ]
    },
    

    {
      slug: 'jeruk-siam-madu',
      title: 'Jeruk Siam',
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
        soilClimate: 'Tanah aluvial yang subur dengan pengairan sawah yang teratur serta iklim tropis mendukung dua hingga tiga kali masa tanam per tahun.'
      },
      varietyComparison: {
        title: 'Beras Putih Pulen vs Beras Merah',
        description: 'Dua jenis beras hasil panen padi desa ini berbeda dari segi rasa, tekstur, dan kandungan gizinya.',
        variants: [
          {
            name: 'Beras Putih Pulen',
            attributes: [
              { label: 'Rasa', value: 'Pulen dan gurih netral, cocok untuk nasi sehari-hari' },
              { label: 'Bentuk & Tekstur', value: 'Butiran putih bersih, tekstur lembut saat matang' },
              { label: 'Warna', value: 'Putih bersih' },
              { label: 'Kandungan', value: 'Karbohidrat tinggi dengan indeks glikemik sedang-tinggi' }
            ]
          },
          {
            name: 'Beras Merah',
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
        title: 'Lemon vs Jeruk Siam',
        description: 'Perbandingan sederhana antara lemon dan jeruk siam.',
        variants: [
          { name: 'Lemon', attributes: [ { label: 'Rasa', value: 'Asam segar' }, { label: 'Ciri Khas', value: 'Kulit lebih tipis, aroma tajam' } ] },
          { name: 'Jeruk Siam', attributes: [ { label: 'Rasa', value: 'Manis lembut' }, { label: 'Ciri Khas', value: 'Aroma harum, cocok dimakan langsung' } ] }
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
