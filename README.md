# KSPM UNIPI Website

Website portofolio organisasi **KSPM (Kelompok Studi Pasar Modal)** Universitas Insan Pembangunan Indonesia.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: MongoDB (via Mongoose)
- **Auth**: NextAuth.js
- **Animasi**: Framer Motion
- **Editor**: React Quill (rich text)
- **Upload**: Cloudinary (dengan fallback lokal)

---

## Setup Awal

### 1. Install Node.js
Download dari https://nodejs.org (versi 18 atau lebih baru)

### 2. Clone & Install Dependencies
```bash
git clone <url-repo>
cd kspm-website
npm install
```

### 3. Setup Environment Variables
```bash
copy .env.local.example .env.local
# Lalu edit .env.local dengan nilai yang sesuai
```

### 4. Konfigurasi MongoDB

**Opsi A — MongoDB Atlas (Rekomendasi, Gratis):**
1. Daftar di https://cloud.mongodb.com
2. Buat cluster gratis (M0)
3. Klik **Connect → Drivers** dan copy connection string
4. Ganti `<username>:<password>` dengan kredensial yang dibuat
5. Masukkan ke `MONGODB_URI` di `.env.local`

**Opsi B — MongoDB Lokal:**
```
MONGODB_URI=mongodb://localhost:27017/kspm-website
```

### 5. Konfigurasi Cloudinary (Opsional)
1. Daftar di https://cloudinary.com
2. Buka **Dashboard** → copy Cloud Name, API Key, API Secret
3. Isi di `.env.local`:
```
CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
```
> Jika tidak dikonfigurasi, gambar akan disimpan lokal di `/public/uploads/`

### 6. Jalankan Development Server
```bash
npm run dev
```
Buka http://localhost:3000

---

## Struktur Halaman

| URL | Keterangan |
|-----|-----------|
| `/` | Beranda |
| `/tentang` | Tentang Kami |
| `/pengurus` | Struktur Kepengurusan |
| `/program-kerja` | Program Kerja |
| `/artikel` | Daftar Artikel |
| `/artikel/[slug]` | Detail Artikel |
| `/galeri` | Galeri Foto |
| `/kontak` | Kontak |
| `/admin/login` | Login Admin |
| `/admin/dashboard` | Dashboard CMS |
| `/admin/pengurus` | Kelola Pengurus |
| `/admin/program-kerja` | Kelola Program Kerja |
| `/admin/artikel` | Kelola Artikel |
| `/admin/galeri` | Kelola Galeri |
| `/admin/testimoni` | Kelola Testimoni |
| `/admin/tentang` | Edit Tentang Kami |

---

## Login Admin

Default credentials (ubah di `.env.local`):
- **Email**: `admin@kspm-unipi.ac.id`
- **Password**: `Admin@KSPM2024`

> ⚠️ **PENTING**: Segera ganti password setelah setup pertama!

---

## Build Production

```bash
npm run build
npm start
```

---

## Deploy ke Vercel (Rekomendasi)

1. Push kode ke GitHub
2. Import project di https://vercel.com
3. Tambahkan semua environment variables dari `.env.local`
4. Deploy!
