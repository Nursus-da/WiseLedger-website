# WiseLedger

Proyek ini berfokus pada pengembangan web application manajemen keuangan berbasis metode Kakeibo yang ditujukan untuk UMKM dan generasi muda. Sistem akan dirancang untuk membantu pengguna dalam melakukan perencanaan keuangan awal bulan, pencatatan transaksi harian, serta refleksi keuangan berkala secara terstruktur.

## Struktur file

- `config/` - Folder konfigurasi.
- `controllers/` - Folder kontroler.
- `middlewares/` - Folder middleware.
- `migrations/` - Folder migrasi.
- `models/` - Folder model.
- `public/` - Folder file statis.
- `src/` - Folder sumber sebelum ke `public/`.
- `views/` - Folder tampilan.
- `app.js` - server.



## Menjalankan

1. `npm install`
2. `Buat database dengan nama wiseledgar_db di mysql`
3. `buka file config/config.json`
4. `isi username, password, database, host, dan dialect dengan data yang sesuai`
5. `lakukan konfigurasi denga menggunakan perintah 'npx sequelize-cli db:migrate'`
6. `jalankan perintah 'npm run dev:all`
3. Buka `http://localhost:3000`

