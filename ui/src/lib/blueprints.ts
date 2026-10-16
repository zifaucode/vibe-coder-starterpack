import { B, Bx, C, D, F, G, I, K, O, R, T, W, type Node } from "../components/Blueprint";

const feat = () => C(D("Ikon"), T("Judul fitur"), T("Poin singkat"));
const quote = (len: string) => C(T("Bintang"), T(len), R(D("Avatar"), T("Nama")));

// Kerangka berlabel untuk komponen bawaan di prompts.ts, dicari lewat id.
export const BLUEPRINTS: Record<string, Node> = {
  "hero-1": C(T("Judul besar (maks. 3 baris)"), T("Subjudul singkat"), R(D("Tumpukan avatar"), B("Tombol utama"), O("Tombol sekunder"))),
  "hero-2": R(C(D("Label kategori"), T("Judul"), T("Poin manfaat + centang"), R(F("Email"), B("Daftar"))), I("Pratinjau aplikasi (mockup)")),
  "hero-3": C(T("Judul di tengah"), I("Thumbnail video + tombol Play"), R(T("Metrik 1"), T("Metrik 2"), T("Metrik 3"))),
  "hero-4": R(C(T("Judul"), T("Subjudul"), F("Perintah instal (terminal)")), K(R(D("React"), D("Vue"), D("Svelte")), T("Cuplikan kode"))),

  "nav-1": Bx("Navbar mengambang (bentuk pill, 16px dari atas)", R(D("Logo"), W(3, R(T("Menu"), T("Menu"), T("Menu"))), B("Aksi"))),
  "nav-2": C(R(D("Logo"), T("Produk"), T("Solusi"), T("Harga"), B("Aksi")), Bx("Mega menu (terbuka saat Produk dipilih)", G(3, C(T("Fitur + ikon")), C(T("Solusi")), I("Artikel + gambar")))),
  "nav-3": R(D("Logo"), W(2, F("Cari dokumen...   Ctrl+K")), D("Lonceng"), D("Profil")),
  "nav-4": C(D("Banner pengumuman (bisa ditutup)"), R(D("Logo"), T("Menu"), T("Menu"), O("Masuk"), B("Daftar"))),

  "auth-1": R(Bx("Kiri: form", T("Judul"), R(O("Google"), O("GitHub")), F("Email"), F("Kata sandi + ikon mata"), B("Masuk")), I("Kanan: gradien + kutipan pengguna")),
  "auth-2": Bx("Kartu login di tengah layar (latar kaca)", R(D("Masuk"), D("Daftar")), F("Email"), F("Kata sandi"), T("Ingat saya (kotak centang)"), B("Masuk")),
  "auth-3": C(R(D("1 Akun"), D("2 Workspace"), D("3 Undangan")), Bx("Isian langkah aktif", F("Isian"), F("Isian")), R(O("Kembali"), B("Lanjut"))),
  "auth-4": C(T("Judul"), F("Email"), B("Kirim tautan masuk"), T("atau"), R(O("Google"), O("GitHub"))),

  "bento-1": R(C(I("1. Widget grafik (lebar)"), R(I("3. Terminal"), I("4. Rating"))), I("2. Kartu tinggi + ikon")),
  "bento-2": C(R(D("Analitik"), D("Otomasi"), D("Keamanan"), D("Integrasi")), R(C(T("Judul fitur"), T("Penjelasan")), I("Pratinjau aplikasi untuk tab aktif"))),
  "bento-3": C(R(C(T("Teks"), O("Pelajari lebih lanjut")), I("Screenshot")), R(I("Screenshot"), C(T("Teks"), O("Pelajari lebih lanjut"))), R(C(T("Teks"), O("Pelajari lebih lanjut")), I("Video"))),
  "bento-4": G(3, feat(), feat(), feat()),

  "pricing-1": C(R(D("Bulanan"), D("Tahunan (hemat 20%)")), G(3, Bx("Starter", T("Harga"), T("Fitur"), O("Pilih")), Bx("Pro (disorot)", D("Badge"), T("Harga"), T("Fitur lengkap"), B("Pilih")), Bx("Enterprise", T("Harga"), T("Fitur"), O("Hubungi")))),
  "pricing-2": Bx("Tabel perbandingan", R(T("Fitur"), T("Paket A"), T("Paket B"), T("Paket C")), T("Grup: Batas pemakaian"), R(T("Baris fitur"), D("Ya"), D("Ya"), D("Tidak")), T("Grup: Keamanan"), R(T("Baris fitur"), D("Tidak"), D("Ya"), D("Ya"))),
  "pricing-3": C(T("Judul"), Bx("Slider pengguna aktif per bulan (1 rb sampai 1 jt)", F("geser ----o----")), R(T("Harga dihitung langsung"), T("Rincian batas yang termasuk")), O("Hubungi sales (muncul di batas maksimum)")),
  "pricing-4": K(R(W(2, C(T("Judul + jaminan SLA"), T("Account manager khusus"), T("SSO / SAML"))), B("Hubungi sales (buka form)"))),

  "dashboard-1": R(K(T("Sidebar"), T("Menu"), T("Menu"), T("Menu")), W(4, C(G(4, T("Pendapatan"), T("Pengguna aktif"), T("Konversi"), T("Bounce rate")), Bx("Tabel transaksi terbaru", T("Baris"), T("Baris"), T("Baris"))))),
  "dashboard-2": C(R(F("Rentang tanggal"), O("Filter"), O("Filter")), R(W(2, I("Grafik garis: tren pendapatan")), I("Donat: sumber trafik")), Bx("Log aktivitas", T("Entri"), T("Entri"))),
  "dashboard-3": C(R(D("Anggota tim"), D("Filter"), D("Filter")), G(3, Bx("To Do", T("Kartu tugas"), T("Kartu tugas")), Bx("In Progress", T("Kartu tugas")), Bx("Done", T("Kartu tugas")))),

  "testimonial-1": G(3, quote("Kutipan panjang"), quote("Kutipan pendek"), quote("Kutipan sedang")),
  "testimonial-2": C(R(D("Logo"), D("Logo"), D("Logo"), D("Logo (bergulir)")), R(Bx("Studi kasus", T("Hasil utama (angka)"), T("Kutipan")), I("Video + tombol Play"))),
  "testimonial-3": C(G(4, I("Video potret + nama + logo"), I("Video potret"), I("Video potret"), I("Video potret")), T("Geser ke samping untuk melihat lainnya")),

  "footer-1": C(Bx("Newsletter", R(F("Email"), B("Langganan"))), G(4, T("Produk"), T("Perusahaan"), T("Sumber daya"), T("Legal")), R(D("Ikon sosial"), D("Status sistem"))),
  "footer-2": R(C(D("Logo"), T("Hak cipta")), W(2, R(T("Tautan"), T("Tautan"), T("Tautan"))), R(D("Sosial"), O("Pilih wilayah"))),
  "footer-3": K(R(W(2, F("Email (besar)")), B("Kirim")), G(5, T("Kolom"), T("Kolom"), T("Kolom"), T("Kolom"), T("Kolom")), R(D("Ikon sosial"), O("Bahasa / mata uang"))),

  "ecommerce-1": G(4, C(I("Foto (berganti saat hover)"), T("Nama, harga, bintang"), B("Tambah cepat (muncul saat hover)")), C(I("Foto"), D("Label diskon"), T("Nama, harga")), C(I("Foto"), T("Nama, harga")), C(I("Foto"), T("Nama, harga"))),
  "ecommerce-2": R(I("Halaman di belakang (digelapkan)"), Bx("Laci keranjang (masuk dari kanan)", T("Jumlah item"), T("Item + stepper jumlah"), T("Item + stepper jumlah"), F("Kode promo"), T("Subtotal"), B("Lanjut ke checkout"))),
  "ecommerce-3": R(C(I("Foto utama"), R(I("Foto mini 1"), I("Foto mini 2"), I("Foto mini 3"), I("Foto mini 4"))), C(T("Nama produk"), T("Rating"), T("Harga"), R(D("Pilihan warna 1"), D("Pilihan warna 2")), R(O("Ukuran S"), O("Ukuran M"), O("Ukuran L")), B("Tambah ke tas"))),

  "modal-1": C(I("Halaman di belakang (digelapkan)"), Bx("Modal", I("Ilustrasi"), T("Judul penawaran"), F("Email"), B("Kirim"), O("Tidak, terima kasih"))),
  "modal-2": Bx("Dialog konfirmasi hapus", D("Ikon peringatan"), T("Pesan peringatan yang jelas"), F("Ketik DELETE untuk konfirmasi"), R(O("Batal"), B("Hapus (merah)"))),
  "modal-3": C(I("Konten halaman"), Bx("Banner menempel di dasar layar", R(D("Ikon cookie"), W(3, T("Pemberitahuan privasi singkat")), O("Atur preferensi"), B("Terima semua")))),

  "cta-1": K(C(T("Judul"), T("Subjudul"), D("Tumpukan avatar"), B("Tombol CTA (dengan glow)"))),
  "cta-2": C(T("Teks berjalan di latar: BUILD FASTER, SHIP FASTER"), Bx("Kartu di tengah", T("Judul kontras tinggi"), T("Subteks"), B("Tombol utama"))),
};
