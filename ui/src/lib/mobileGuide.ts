import type { CategoryGuide } from "./componentGuide";

// Panduan per kategori pola mobile, diringkas dari pedoman sentuh, navigasi, form, dan animasi.
export const MOBILE_GUIDE: Record<string, CategoryGuide> = {
  Navigation: {
    about: "Cara pengguna berpindah antar layar di ponsel. Salah di sini membuat orang tersesat di seluruh aplikasi.",
    when: "Kerangka utama aplikasi: tab bawah, bar atas, drawer, dan transisi antar layar.",
    practice: [
      "Tab bawah maksimal 5 item, selalu ikon plus label, dan hanya untuk tujuan tingkat atas.",
      "Tombol kembali dapat diprediksi dan mengembalikan posisi gulir serta filter sebelumnya.",
      "Tandai lokasi saat ini dengan bentuk (ikon terisi, indikator), bukan warna saja.",
      "Jangan campur tab bawah, drawer, dan tab atas di tingkat hierarki yang sama.",
    ],
    a11y: [
      "Target sentuh minimal 44x44pt (iOS) atau 48x48dp (Android), jarak antar target 8px atau lebih.",
      "Urutan fokus pembaca layar mengikuti urutan visual; pindahkan fokus ke konten utama setelah ganti layar.",
      "Hormati area aman atas dan bawah, termasuk gestur kembali sistem.",
    ],
    avoid: [
      "Mengubah atau mereset tumpukan navigasi tanpa disadari pengguna.",
      "Drawer untuk aksi utama; tempatkan di tab bawah.",
      "Ikon tanpa teks pada navigasi utama.",
    ],
  },
  "Forms & Auth": {
    about: "Layar tempat pengguna mengisi data atau masuk. Keyboard yang menutupi isian adalah penyebab utama gagal selesai.",
    when: "Login, daftar, verifikasi kode, pengaturan, dan alur awal.",
    practice: [
      "Label selalu terlihat dan jenis keyboard sesuai isian (email, telepon, angka).",
      "Gunakan autofill dan izinkan paste serta pengelola kata sandi.",
      "Isian yang sedang fokus dan tombol utama tetap terlihat saat keyboard terbuka.",
      "Validasi saat selesai mengisi, dan tulis penyebab serta cara memperbaiki di bawah isian.",
      "Bagi formulir panjang menjadi langkah dengan indikator progres dan tombol kembali.",
    ],
    a11y: [
      "Tinggi isian minimal 44px.",
      "Error diumumkan lewat pembaca layar dan tidak hanya merah.",
      "Sediakan alternatif non-kognitif untuk login, misalnya biometrik atau tautan email.",
    ],
    avoid: [
      "Placeholder sebagai satu-satunya label.",
      "Meminta data yang sama dua kali dalam satu alur.",
      "Timer kode yang terlalu singkat tanpa tombol kirim ulang.",
    ],
  },
  "Feeds & Cards": {
    about: "Daftar dan kartu yang dipindai sambil menggulir. Kecepatan membaca dan stabilitas layout paling berpengaruh.",
    when: "Feed sosial, notifikasi, daftar pesan, galeri, dan kartu profil.",
    practice: [
      "Beri gambar rasio tetap supaya layout tidak melompat saat memuat.",
      "Gunakan skeleton yang meniru bentuk hasil akhir, dan state kosong yang menyebut langkah pertama.",
      "Daftar 50 item atau lebih sebaiknya divirtualisasi.",
      "Sediakan pull-to-refresh sebagai tambahan, bukan satu-satunya cara memperbarui.",
    ],
    a11y: [
      "Gestur geser punya alternatif tombol terlihat (menu aksi).",
      "Tombol aksi di kartu (suka, komentar) punya nama dan jumlah yang dibacakan.",
      "Hormati reduced-motion pada animasi kartu.",
    ],
    avoid: [
      "Geser horizontal pada konten utama yang berbenturan dengan gestur kembali.",
      "Avatar, nama, dan jumlah suka karangan pada daftar contoh.",
      "Memuat semua gambar sekaligus.",
    ],
  },
  "Modals & Sheets": {
    about: "Lapisan yang menumpang di atas layar: dialog, bottom sheet, dan popup sistem.",
    when: "Konfirmasi, pilihan singkat, filter, atau form pendek yang tidak perlu layar sendiri.",
    practice: [
      "Selalu ada tombol tutup yang terlihat; geser turun hanyalah tambahan.",
      "Aksi berbahaya memakai warna bahaya dengan ikon dan teks, dipisah dari aksi utama.",
      "Animasikan dari sumbernya (naik dari bawah, membesar dari tombol) agar konteks terjaga.",
      "Konfirmasi sebelum menutup sheet yang berisi perubahan belum tersimpan.",
    ],
    a11y: [
      "Fokus pindah ke dalam lapisan saat terbuka dan kembali ke pemicu saat ditutup.",
      "Scrim cukup gelap agar konten di belakang tidak mengganggu, dan tombol tetap 44px.",
      "Pakai komponen sistem (action sheet, dialog biometrik) bila ada.",
    ],
    avoid: [
      "Modal untuk alur navigasi utama.",
      "Sheet yang hanya bisa ditutup dengan gestur.",
      "Popup bertumpuk atau muncul saat aplikasi baru dibuka.",
    ],
  },
  "Feedback & Alerts": {
    about: "Cara aplikasi memberi tahu hasil tindakan dan keadaan sistem: berhasil, gagal, memuat, offline.",
    when: "Setelah aksi pengguna, saat data dimuat, atau saat sistem bermasalah.",
    practice: [
      "Beri umpan balik dalam sekitar 100ms setelah ketukan.",
      "Toast hilang sendiri dalam 3-5 detik, tidak mengambil fokus, dan menawarkan Undo untuk aksi destruktif.",
      "Pesan error menyebut penyebab dan langkah berikutnya, dengan tombol coba lagi.",
      "Tampilkan status offline dan jelaskan apa yang tetap bisa dipakai.",
    ],
    a11y: [
      "Umumkan lewat region aria-live atau role=alert, bukan hanya visual.",
      "Kontras warna status minimal 4.5:1 dan selalu dengan ikon dan teks.",
      "Hormati reduced-motion pada shimmer dan spinner.",
    ],
    avoid: [
      "Pesan umum seperti \"Terjadi kesalahan\" tanpa penyebab.",
      "Spinner satu layar penuh untuk muat yang singkat.",
      "Notifikasi berlebihan yang membuat pengguna mengabaikannya.",
    ],
  },
  "Commerce & Payments": {
    about: "Alur dari melihat produk sampai membayar. Setiap langkah ekstra mengurangi jumlah yang menyelesaikan pembelian.",
    when: "Katalog, detail produk, keranjang, dan pembayaran.",
    practice: [
      "Satu tombol utama per layar; di detail produk letakkan di bar yang menempel.",
      "Tampilkan semua biaya (ongkir, pajak) sebelum langkah terakhir.",
      "Stepper jumlah punya tombol 44px, dan hapus item menawarkan Undo.",
      "Angka harga memakai angka tabular dan format sesuai lokal.",
      "Cegah kirim ganda: tombol bayar dinonaktifkan dan menampilkan status memuat.",
    ],
    a11y: [
      "Pilihan varian dan metode bayar bisa dibaca pembaca layar (radio atau tombol dengan state).",
      "Status terpilih ditandai bentuk (centang, bingkai), bukan warna saja.",
      "Perubahan jumlah keranjang diumumkan tanpa memindahkan fokus.",
    ],
    avoid: [
      "Hitung mundur, stok terbatas, atau diskon palsu.",
      "Biaya yang baru muncul di langkah terakhir.",
      "Memaksa membuat akun sebelum membayar tanpa alasan.",
    ],
  },
  "Media & Content": {
    about: "Layar untuk memutar, membaca, dan menangkap konten: audio, video, artikel, kamera.",
    when: "Aplikasi musik, video, berita, belajar, dan dokumen.",
    practice: [
      "Kontrol pemutar muncul saat diketuk dan menghilang sendiri, dengan tombol utama terbesar.",
      "Jangan putar otomatis dengan suara; sediakan teks (caption) dan indikator buffering.",
      "Teks bacaan 16-18px dengan line-height sekitar 1.6 dan hormati ukuran huruf sistem.",
      "Jelaskan mengapa izin kamera atau mikrofon dibutuhkan sebelum memintanya.",
    ],
    a11y: [
      "Bilah progres bisa digeser lewat aksesibilitas, bukan hanya gestur.",
      "Kontrol media punya nama jelas dan target sentuh minimal 44px.",
      "Video menyediakan teks dan transkrip bila memungkinkan.",
    ],
    avoid: [
      "Putar otomatis dengan suara.",
      "Kontrol yang hanya bisa dioperasikan dengan dua ketukan atau gestur tersembunyi.",
      "Meminta izin saat aplikasi pertama dibuka tanpa konteks.",
    ],
  },
  "Maps & Location": {
    about: "Layar berbasis peta dan lokasi. Peta menarik perhatian tetapi sulit diakses, jadi selalu butuh pendamping berupa daftar.",
    when: "Mencari tempat, memilih alamat, dan melacak pesanan.",
    practice: [
      "Pasangkan peta dengan daftar atau kartu yang memuat informasi yang sama.",
      "Penanda punya keadaan jelas (biasa, terpilih) dan label teks.",
      "Alamat hasil pemilihan menampilkan status memuat dan bisa diedit manual.",
      "Minta izin lokasi dengan konteks, dan sediakan input manual bila ditolak.",
    ],
    a11y: [
      "Semua informasi di peta tersedia juga sebagai teks dan daftar.",
      "Tombol peta (lokasi saya, zoom) minimal 44px dan tidak menutupi kontrol sistem.",
      "Perkiraan waktu dan status memakai data nyata dengan teks, bukan hanya warna.",
    ],
    avoid: [
      "Peta sebagai satu-satunya cara memilih lokasi.",
      "Pin dan posisi kurir palsu pada contoh.",
      "Menutup tombol sistem atau area aman dengan kartu melayang.",
    ],
  },
  "Data & Insights": {
    about: "Layar yang merangkum angka dan jadwal agar pengguna cepat paham keadaan dan mengambil langkah.",
    when: "Aplikasi kesehatan, keuangan, produktivitas, dan jadwal.",
    practice: [
      "Mulai dari satu angka yang paling penting, lalu rincian pendukung.",
      "Grafik menjawab satu pertanyaan yang ditulis di judulnya, dengan ringkasan teks.",
      "Gunakan angka tabular, format lokal, dan satuan yang jelas.",
      "Strip tanggal atau pemilih periode punya tombol sebelumnya dan berikutnya, bukan hanya geser.",
    ],
    a11y: [
      "Berikan tabel atau ringkasan teks untuk grafik.",
      "Status (sesuai rencana, terlambat) ditulis sebagai teks, bukan hanya warna.",
      "Animasi progres menghormati reduced-motion.",
    ],
    avoid: [
      "Angka dan tren karangan pada contoh tanpa label placeholder.",
      "Grafik tanpa pertanyaan, hanya untuk mengisi layar.",
      "Terlalu banyak metrik setara di satu layar kecil.",
    ],
  },
};
