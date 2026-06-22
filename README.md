# Desa Belok/Sidan — Website

Website profil Desa Belok/Sidan, Kecamatan Petang, Kabupaten Badung, Provinsi Bali. Dibangun menggunakan Angular dengan Server-Side Rendering (SSR).

## Prasyarat

Sebelum mulai, pastikan sudah terinstall:

- **Node.js** versi `^22.22.3`, `^24.15.0`, atau `>=26`
  Cek versi yang terpasang dengan:
  ```bash
  node -v
  ```
  Kalau versi belum sesuai, update melalui [nodejs.org](https://nodejs.org) atau pakai `nvm`.
- **npm** (sudah otomatis terpasang bersama Node.js)

## Instalasi

1. Extract/clone project ini, lalu masuk ke foldernya:
   ```bash
   cd desa-belok-sidan
   ```

2. Install seluruh dependency:
   ```bash
   npm install
   ```

## Menjalankan di Lokal (Mode Development)

Untuk development sehari-hari (auto-reload saat ada perubahan kode):

```bash
npm start
```

Lalu buka browser ke:

```
http://localhost:4200
```

## Menjalankan Versi Production (dengan SSR)

Kalau ingin menjalankan persis seperti di server production (termasuk Server-Side Rendering):

1. Build project:
   ```bash
   npm run build
   ```

2. Jalankan server hasil build:
   ```bash
   npm run serve:ssr:desa-belok-sidan
   ```

3. Buka browser ke:
   ```
   http://localhost:4000
   ```

## Halaman yang Tersedia

| Route    | Halaman                                         |
|----------|--------------------------------------------------|
| `/`      | Beranda — profil desa, sejarah, produk unggulan  |
| `/peta`  | Peta wilayah & komoditas per Banjar Dinas         |

## Struktur Folder Singkat

```
src/
├── app/
│   ├── pages/                  # Halaman dengan route sendiri
│   │   ├── beranda/             # Halaman utama ("/")
│   │   └── peta/                # Halaman peta wilayah ("/peta")
│   ├── shared/components/      # Komponen reusable (navbar, hero, footer, dll.)
│   ├── app.routes.ts           # Daftar routing
│   └── app.component.ts        # Shell utama aplikasi
├── assets/images/              # Gambar (logo, produk, peta, dll.)
└── styles.css                  # Variabel desain global (warna, font, spacing)
```

## Catatan

- Jika terdapat error terkait `node_modules` atau dependency saat `npm install`, coba hapus folder `node_modules` dan file `package-lock.json`, lalu jalankan ulang `npm install`.
- Pastikan semua gambar yang dirujuk komponen sudah tersedia di `src/assets/images/`, terutama jika menambah komponen atau data baru.