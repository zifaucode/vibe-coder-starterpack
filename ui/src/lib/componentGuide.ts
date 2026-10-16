import type { Category } from "./prompts";

export interface CategoryGuide {
  about: string;
  when: string;
  practice: string[];
  a11y: string[];
  avoid: string[];
}

// Rujukan per kategori, diringkas dari pedoman UX (aksesibilitas, form, navigasi, layout) dan daftar pola generik AI.
export const GUIDE: Record<Exclude<Category, "All">, CategoryGuide> = {
  "Hero Sections": {
    about: "Bagian pertama yang dilihat pengunjung. Tugasnya menjawab tiga hal dalam beberapa detik: produk ini apa, untuk siapa, dan apa langkah berikutnya.",
    when: "Di bagian paling atas landing page atau halaman produk.",
    practice: [
      "Satu tombol utama per layar. Tombol kedua dibuat lebih tenang.",
      "Judul maksimal 2-3 baris, langsung menyebut manfaat nyata.",
      "Beri ruang tetap untuk gambar atau video (width/height atau aspect-ratio) agar layout tidak melompat.",
      "Di ponsel, tampilkan isi inti dulu dan sembunyikan yang sekunder.",
    ],
    a11y: [
      "Teks di atas gambar atau gradien tetap 4.5:1 kontrasnya.",
      "Video yang berputar sendiri harus bisa dijeda, dan berhenti jika pengguna memilih reduced-motion.",
      "Gambar bermakna diberi alt text.",
    ],
    avoid: [
      "Angka dan klaim karangan (\"10k+ developer\"). Pakai data nyata atau hapus.",
      "Pill badge di atas judul yang hanya mengulang judul.",
      "Orb blur dan gradien biru-ungu sebagai satu-satunya identitas.",
    ],
  },
  "Nav & Headers": {
    about: "Peta situs. Pengguna memakainya untuk tahu sedang di mana dan bisa ke mana.",
    when: "Di semua halaman, dengan posisi yang sama.",
    practice: [
      "Tandai halaman aktif dengan jelas (warna, ketebalan, atau garis).",
      "Pisahkan navigasi utama dari navigasi sekunder. Jangan campur tab, sidebar, dan menu bawah di tingkat yang sama.",
      "Navigasi tetap di tempat yang sama di semua halaman.",
      "Tombol dengan ikon saja butuh teks atau label; ikon + teks lebih mudah ditemukan.",
      "Layar lebar (di atas 1024px) cocok memakai sidebar; layar kecil memakai menu atas atau bawah (maks. 5 item).",
    ],
    a11y: [
      "Urutan tab mengikuti urutan visual; sediakan tautan \"lompat ke konten utama\".",
      "Header yang menempel tidak boleh menutupi elemen yang sedang difokus keyboard.",
      "Beri ruang atas pada isi halaman setinggi header yang fixed.",
    ],
    avoid: [
      "Menu yang menuju halaman yang belum ada. Beri label \"Segera hadir\" atau hapus.",
      "Efek kaca (blur) pada navbar, kartu, dan sidebar sekaligus. Cukup satu atau dua elemen.",
      "Mega menu yang hanya terbuka lewat hover; sediakan klik dan keyboard.",
    ],
  },
  "Auth & Forms": {
    about: "Tempat pengguna memberi data atau masuk. Hambatan terkecil di sini langsung memengaruhi jumlah yang berhasil menyelesaikannya.",
    when: "Login, daftar, kontak, checkout, dan pengaturan.",
    practice: [
      "Label selalu terlihat, bukan hanya placeholder.",
      "Pesan error di bawah field yang bermasalah, menyebut penyebab dan cara memperbaiki.",
      "Validasi saat pengguna selesai mengisi (blur), bukan setiap ketukan tombol.",
      "Pakai jenis input yang tepat (email, tel, number) supaya keyboard ponsel sesuai.",
      "Tombol kirim menampilkan status memuat dan dinonaktifkan selama proses berjalan.",
    ],
    a11y: [
      "Hubungkan error dengan field lewat aria-describedby dan umumkan ke pembaca layar.",
      "Izinkan pengelola kata sandi dan paste. Sediakan tombol tampilkan/sembunyikan sandi.",
      "Setelah submit gagal dengan banyak error, arahkan fokus ke ringkasan error yang menautkan tiap field.",
    ],
    avoid: [
      "Mengisi contoh dengan data palsu (John Doe). Pakai placeholder yang menjelaskan isi, misalnya \"Nama lengkap\".",
      "Pesan umum \"Input tidak valid\".",
      "Form panjang tanpa penyimpanan draf atau indikator langkah.",
    ],
  },
  "Feature Grids": {
    about: "Daftar kemampuan produk. Berguna jika tiap fitur punya bobot dan isi yang berbeda.",
    when: "Setelah hero, untuk menjelaskan apa saja yang bisa dilakukan produk.",
    practice: [
      "Fitur utama diberi ruang lebih besar. Fitur pendukung cukup berupa daftar.",
      "Judul fitur berupa hasil bagi pengguna, bukan nama teknologi.",
      "Grid 1 kolom di ponsel, 2 di tablet, 3 atau lebih di desktop.",
      "Gunakan ukuran jarak kelipatan 8px agar ritmenya konsisten.",
    ],
    a11y: [
      "Ikon dekoratif di samping teks disembunyikan dari pembaca layar (aria-hidden).",
      "Urutan heading berurutan (h2 lalu h3), tanpa melompati tingkat.",
    ],
    avoid: [
      "Kartu seragam dengan ikon yang sama bentuknya untuk semua fitur.",
      "Bento grid yang isinya semua berukuran sama.",
      "Ikon generik (bintang, kilat, robot) yang tidak berhubungan dengan fiturnya.",
    ],
  },
  "Pricing & Plans": {
    about: "Membantu pengunjung memilih paket dan membayar tanpa ragu.",
    when: "Produk yang punya lebih dari satu tingkat harga.",
    practice: [
      "Pakai jumlah paket yang benar-benar ada. Tidak harus tiga.",
      "Sorot paket yang memang ingin Anda arahkan, dan tulis alasannya. Jika tidak ada, jangan sorot apa pun.",
      "Gunakan angka tabular (lebar sama) agar harga rata di tabel.",
      "Tampilkan apa yang termasuk di tiap paket dengan bahasa yang sama antar paket.",
      "Satu tombol utama per paket, dengan label berupa kata kerja.",
    ],
    a11y: [
      "Perbedaan paket tidak boleh hanya lewat warna; tambahkan teks atau ikon.",
      "Tabel perbandingan memakai markup tabel yang benar, bukan susunan div.",
    ],
    avoid: [
      "Label \"Paling Populer\" otomatis pada paket tengah tanpa data.",
      "Harga, diskon, atau hitung mundur palsu.",
      "Biaya tersembunyi yang baru muncul di langkah terakhir.",
    ],
  },
  Dashboards: {
    about: "Layar kerja untuk memantau data dan mengambil keputusan.",
    when: "Setelah masuk, untuk admin, analitik, atau operasional.",
    practice: [
      "Mulai dari satu keputusan yang diambil pengguna di layar ini, lalu susun hierarki di sekitarnya.",
      "Pilih jenis grafik menurut data: tren pakai garis, perbandingan pakai batang, bagian dari total pakai donat (maks. 5 kategori).",
      "Tulis pertanyaan yang dijawab grafik pada judulnya (\"Job gagal per jam, 24 jam terakhir\").",
      "Sediakan state kosong, memuat (skeleton), dan error dengan tombol coba lagi.",
      "Pakai angka tabular dan format angka sesuai lokal (titik/koma, mata uang).",
    ],
    a11y: [
      "Grafik butuh alternatif tabel atau ringkasan teks untuk pembaca layar.",
      "Jangan hanya mengandalkan merah-hijau; tambah pola, bentuk, atau label langsung.",
      "Tooltip bisa dijangkau keyboard, tidak hanya hover.",
      "Garis dan batang punya kontras minimal 3:1 terhadap latar.",
    ],
    avoid: [
      "Kartu angka karangan dengan panah naik hijau tanpa periode pembanding.",
      "Feed aktivitas dengan nama dan waktu fiktif.",
      "Grafik tanpa pertanyaan, hanya untuk mengisi ruang kosong.",
    ],
  },
  Testimonials: {
    about: "Bukti dari pengguna nyata bahwa produk berhasil dipakai.",
    when: "Setelah penjelasan fitur, sebelum ajakan bertindak.",
    practice: [
      "Pakai kutipan asli dengan nama, peran, dan izin pengutipannya.",
      "Pilih kutipan yang menyebut hasil spesifik, bukan pujian umum.",
      "Jika carousel dipakai, sediakan tombol jeda dan berhenti saat fokus.",
    ],
    a11y: [
      "Carousel otomatis harus bisa dijeda dan tidak berputar jika reduced-motion aktif.",
      "Foto orang diberi alt text atau ditandai dekoratif jika nama sudah tertulis.",
    ],
    avoid: [
      "Testimoni, nama, dan logo perusahaan karangan.",
      "Baris \"Dipercaya oleh ribuan tim\" tanpa satu pun nama yang bisa diperiksa.",
      "Jika belum ada pengguna nyata, lewati bagian ini.",
    ],
  },
  Footers: {
    about: "Penutup halaman yang memuat tautan sekunder dan informasi hukum.",
    when: "Di dasar setiap halaman.",
    practice: [
      "Susun tautan menurut yang benar-benar ada. Satu kolom pendek lebih baik daripada empat kolom setengah kosong.",
      "Sertakan Syarat Layanan dan Kebijakan Privasi jika situs meminta data atau pembayaran.",
      "Letakkan bantuan atau kontak di posisi yang konsisten antar halaman.",
    ],
    a11y: [
      "Tautan punya teks yang jelas, bukan \"klik di sini\".",
      "Target klik minimal 24x24px (web), dengan jarak yang cukup di ponsel.",
    ],
    avoid: [
      "Kolom Product / Company / Resources / Legal yang diisi tautan mati.",
      "Teks hak cipta atau tahun yang tidak diperbarui.",
    ],
  },
  "E-Commerce": {
    about: "Alur dari melihat produk sampai membayar. Setiap gesekan mengurangi pembelian.",
    when: "Daftar produk, detail produk, keranjang, dan checkout.",
    practice: [
      "Pakai angka tabular untuk harga dan kuantitas.",
      "Tampilkan stok, ongkos kirim, dan total sebelum langkah terakhir.",
      "Berikan umpan balik setelah tombol \"Tambah ke keranjang\" (perubahan jumlah di ikon keranjang, pesan singkat).",
      "Konfirmasi sebelum menghapus item, dan sediakan undo jika memungkinkan.",
      "Isi data sekali saja; gunakan ulang data yang sudah diberikan di langkah berikutnya.",
    ],
    a11y: [
      "Perubahan jumlah keranjang diumumkan lewat region aria-live tanpa memindahkan fokus.",
      "Pemilih ukuran dan warna bisa dioperasikan keyboard dan tidak hanya mengandalkan warna.",
    ],
    avoid: [
      "Hitung mundur dan label \"tinggal 2\" palsu.",
      "Gambar produk tanpa dimensi tetap, sehingga halaman melompat saat gambar dimuat.",
    ],
  },
  "Modals & Popups": {
    about: "Lapisan yang mengambil alih perhatian untuk konfirmasi, form singkat, atau info penting.",
    when: "Hanya jika keputusan harus diambil sekarang. Bukan untuk alur navigasi utama.",
    practice: [
      "Selalu sediakan cara menutup yang jelas (tombol tutup, Esc, klik di luar).",
      "Konfirmasi sebelum menutup modal yang berisi perubahan belum tersimpan.",
      "Aksi destruktif memakai warna bahaya dan dipisah dari aksi utama.",
      "Animasikan dari sumbernya (skala + pudar) agar pengguna paham asalnya.",
      "Toast hilang sendiri dalam 3-5 detik dan tidak merebut fokus.",
    ],
    a11y: [
      "Fokus pindah ke dalam modal saat terbuka, terkurung di dalamnya, lalu kembali ke pemicu saat ditutup.",
      "Pakai role=\"dialog\", aria-modal, dan judul yang terhubung.",
      "Latar belakang di-blur hanya untuk menandai latar yang ditinggalkan, bukan dekorasi.",
    ],
    avoid: [
      "Popup yang muncul saat halaman baru dibuka atau menumpuk beberapa kali.",
      "Modal sebagai satu-satunya jalan di alur navigasi utama.",
      "Banner cookie yang menutupi tombol penting.",
    ],
  },
  "CTA & Banners": {
    about: "Ajakan bertindak yang menutup satu bagian halaman atau mengumumkan satu hal.",
    when: "Di akhir penjelasan, atau untuk pengumuman yang benar-benar baru.",
    practice: [
      "Label tombol menyebut tindakan nyata (\"Buat akun gratis\"), bukan \"Mulai sekarang\" yang generik.",
      "Satu tindakan utama per bagian.",
      "Banner pengumuman bisa ditutup dan tidak kembali setelah ditutup.",
    ],
    a11y: [
      "Banner yang menempel tidak menutupi fokus keyboard.",
      "Tombol dan tautan terlihat berbeda secara fungsi (tombol untuk aksi, tautan untuk pindah halaman).",
    ],
    avoid: [
      "Panah di semua tombol sebagai hiasan.",
      "Kata kosong seperti \"revolusioner\" atau \"tanpa batas\".",
      "Menaruh urgensi palsu (\"Hanya hari ini!\") tanpa batas waktu yang nyata.",
    ],
  },
  "Content & Blog": {
    about: "Halaman yang isinya dibaca: artikel, dokumentasi, changelog, FAQ. Kenyamanan membaca lebih penting daripada hiasan.",
    when: "Blog, pusat bantuan, dokumentasi, dan halaman informasi.",
    practice: [
      "Lebar teks 65-75 karakter per baris, body 16px ke atas, line-height 1.5-1.75.",
      "Hierarki heading berurutan (h1, h2, h3) dan daftar isi untuk teks panjang.",
      "Judul pendek diberi pemenggalan seimbang; URL dan teks panjang dibiarkan membungkus, bukan dipotong.",
      "Blok kode punya tombol salin dan bisa digulir ke samping tanpa memecah halaman.",
    ],
    a11y: [
      "Tautan punya teks yang bermakna dan terlihat berbeda dari teks biasa.",
      "Akordeon memakai tombol dengan aria-expanded, bukan div yang diklik.",
      "Gambar sampul yang dekoratif diberi alt kosong.",
    ],
    avoid: [
      "Paragraf selebar layar penuh di monitor besar.",
      "Tanggal, penulis, atau angka rilis karangan.",
      "Menyembunyikan jawaban penting di balik beberapa lapis akordeon.",
    ],
  },
  "Cards & Lists": {
    about: "Pola dasar untuk menampilkan banyak item sejenis: kartu, baris daftar, linimasa.",
    when: "Daftar orang, artikel, pesan, riwayat, atau metrik.",
    practice: [
      "Pilih kartu jika item punya gambar dan bobot sendiri; pilih baris daftar jika dipindai cepat.",
      "Seluruh kartu satu tautan dengan fokus yang terlihat, bukan beberapa tautan kecil di dalamnya.",
      "Menu aksi hanya berisi aksi yang ada.",
      "Siapkan state memuat (skeleton), kosong, dan error.",
    ],
    a11y: [
      "Status tidak hanya lewat warna; tambahkan teks atau ikon.",
      "Daftar memakai markup list yang benar agar jumlahnya diumumkan.",
      "Target klik minimal 24x24px, dan 44px untuk sentuh.",
    ],
    avoid: [
      "Kartu seragam untuk isi yang bobotnya jelas berbeda.",
      "Panah naik hijau tanpa periode pembanding yang jelas.",
      "Nama, foto, dan angka fiktif pada daftar contoh.",
    ],
  },
  "Data & Tables": {
    about: "Tampilan data terstruktur dan cara pengguna mencari, menyaring, mengurutkan, dan bertindak atasnya.",
    when: "Aplikasi admin, laporan, inventaris, dan daftar transaksi.",
    practice: [
      "Letakkan kolom yang menentukan keputusan paling awal; angka rata kanan dengan angka tabular.",
      "Kolom yang bisa diurutkan memakai aria-sort; filter aktif tampil sebagai chip yang bisa dihapus.",
      "Aksi massal muncul hanya saat ada baris terpilih; aksi destruktif minta konfirmasi dan menyediakan undo.",
      "Di ponsel, ubah baris menjadi kartu berlabel, bukan tabel yang digulir ke samping.",
      "Simpan halaman, filter, dan urutan di URL agar tombol kembali berfungsi.",
    ],
    a11y: [
      "Gunakan elemen table, th, dan scope yang benar.",
      "Checkbox pilih-semua mendukung state indeterminate.",
      "Jumlah hasil diumumkan lewat aria-live saat filter berubah.",
    ],
    avoid: [
      "Kolom Name, Status, Date, Actions yang dipakai di semua tabel tanpa melihat datanya.",
      "Menu tiga titik di setiap baris yang isinya tidak berfungsi.",
      "Baris palsu agar tabel tampak penuh.",
    ],
  },
  "Onboarding & States": {
    about: "Layar untuk keadaan di luar jalur ideal: kosong, memuat, error, dan langkah awal pengguna baru.",
    when: "Pertama kali dipakai, data belum ada, permintaan gagal, atau halaman tidak ditemukan.",
    practice: [
      "State kosong menyebut penyebab dan memberi satu aksi yang mengisinya.",
      "Skeleton meniru bentuk hasil akhir; tampilkan hanya jika memuat lebih dari sekitar 200ms.",
      "Pesan error menyebut penyebab dan cara memperbaiki, dengan tombol coba lagi.",
      "Pembeda keadaan: baru pertama kali, hasil filter kosong, dan tanpa izin masing-masing punya teks sendiri.",
    ],
    a11y: [
      "Pesan error memakai role=alert; area yang sedang memuat memakai aria-busy.",
      "Animasi shimmer berhenti saat reduced-motion aktif.",
      "Error tidak hanya merah; tambahkan ikon dan teks.",
    ],
    avoid: [
      "Tulisan \"No data available\" tanpa penjelasan dan langkah berikutnya.",
      "Spinner satu halaman penuh untuk muat yang singkat.",
      "Pesan error yang menyalahkan pengguna atau berisi kode internal.",
    ],
  },
  "Settings & Profile": {
    about: "Tempat pengguna mengatur akun, preferensi, dan data mereka.",
    when: "Halaman pengaturan, profil, notifikasi, dan penagihan.",
    practice: [
      "Kelompokkan isian terkait (fieldset dan legend) dan beri teks bantuan tetap di bawah isian yang rumit.",
      "Simpan per bagian dan deteksi perubahan yang belum tersimpan sebelum pengguna pergi.",
      "Pisahkan aksi berbahaya di zona tersendiri, dengan penjelasan apa yang hilang dan konfirmasi ketik nama.",
      "Tawarkan ekspor data sebelum penghapusan.",
    ],
    a11y: [
      "Saklar memakai role=switch dengan aria-checked dan label.",
      "Unggah file punya alternatif keyboard selain drag and drop.",
      "Pesan sukses dan error tidak mencuri fokus.",
    ],
    avoid: [
      "Tombol hapus akun menempel di samping tombol simpan.",
      "Pengaturan yang berubah tanpa umpan balik apa pun.",
      "Menyembunyikan pengaturan privasi di tiga tingkat menu.",
    ],
  },
};
