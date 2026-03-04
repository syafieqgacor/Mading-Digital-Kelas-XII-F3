# 🌙 Mading Digital Ramadhan 1447 H
### *Spirituality · Solidarity · Synergy in Action*
**Kelas XII F3 · SMAN 1 Sampit**

---

## 📁 Struktur Folder

```
mading-ramadhan/
├── index.html                  ← Halaman Utama
├── pages/
│   ├── artikel.html            ← Artikel Utama & Pendukung
│   ├── opini.html              ← Opini Siswa
│   ├── infografis-karya.html   ← Infografis, Data, Karya Siswa
│   └── inspirasi.html          ← Quotes, Tips, Doa, Sastra, Kuis
├── assets/
│   ├── css/
│   │   └── style.css           ← Semua styling (shared)
│   └── js/
│       └── main.js             ← Semua script (shared)
├── images/
│   └── infografis.jpg          ← (taruh gambar infografis di sini)
├── foto-tim/
│   └── nama.jpg                ← (foto anggota tim)
└── README.md
```

---

## 🚀 Deploy ke Cloudflare Pages

### Langkah 1 — Push ke GitHub
```bash
git init
git add .
git commit -m "🌙 Initial commit — Mading Digital Ramadhan"
git remote add origin https://github.com/USERNAME/mading-ramadhan.git
git push -u origin main
```

### Langkah 2 — Connect ke Cloudflare Pages
1. Login ke [pages.cloudflare.com](https://pages.cloudflare.com)
2. Klik **Create a project** → **Connect to Git**
3. Pilih repo `mading-ramadhan`
4. **Framework preset**: None (static HTML)
5. **Build command**: *(kosongkan)*
6. **Build output directory**: `/` (root)
7. Klik **Save and Deploy** ✅

Setiap push ke `main` akan otomatis deploy ulang!

---

## 🖼️ Cara Mengganti Foto

### Foto Poster Karya Siswa
Di file `pages/infografis-karya.html`, cari komentar `<!-- SWAP -->` lalu ganti:
```html
<!-- Sebelum -->
<div class="poster-ph">...</div>

<!-- Sesudah -->
<img class="poster-img" src="../images/poster-1.jpg" alt="Poster Ramadhan 1">
```

### Foto Tim
Taruh foto di folder `foto-tim/` dengan nama yang sesuai, contoh:
- `foto-tim/zia.jpg`
- `foto-tim/caca.jpg`
- dst.

---

## 🎵 Audio
Musik Ramadhan dari YouTube diputar via tombol 🎵 di pojok kanan bawah.
Klik untuk play/pause. Volume otomatis 35%.

---

*Ramadhan 1447 H · Maret 2026*
