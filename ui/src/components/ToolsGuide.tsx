import { ArrowRight } from "lucide-react";

type Step = { title: string; detail: string };

const ROUTES = [
  {
    when: "Baru punya ide, belum ada gambaran layar",
    use: "Pakai Google Stitch",
    how: "Anda menulis deskripsi, Stitch menggambar layarnya. Paling cepat untuk pemula.",
  },
  {
    when: "Sudah punya sketsa, atau bekerja dengan desainer",
    use: "Pakai Figma",
    how: "Anda mengatur letak setiap elemen sendiri. Hasilnya paling rapi dan mudah diubah.",
  },
  {
    when: "Tidak mau menggambar sama sekali",
    use: "Lewati keduanya",
    how: "Tempel DESIGN.md dan prompt dari tab 3 langsung ke AI agent. Hasilnya langsung berupa kode.",
  },
];

const FLOW: Step[] = [
  { title: "Isi brief di tab 3", detail: "Hasil: file DESIGN.md dan lima prompt." },
  { title: "Buat layar di Stitch atau Figma", detail: "Hasil: gambar tiap layar aplikasi." },
  { title: "Periksa dengan tab 4", detail: "Hasil: layar yang sudah lolos checklist." },
  { title: "Serahkan ke AI agent", detail: "Hasil: kode aplikasi sesuai desain." },
];

const STITCH: Step[] = [
  { title: "Buka stitch.withgoogle.com", detail: "Masuk dengan akun Google. Tidak perlu memasang apa pun." },
  { title: "Pilih Standard Mode dan jenis layar (Web atau Mobile)", detail: "Hanya mode ini yang hasilnya bisa dipindah ke Figma dengan elemen yang bisa diedit." },
  { title: "Tempel prompt UI Hi-Fi dari tab 3", detail: "Atau unggah foto sketsa tangan, lalu tambahkan prompt sebagai penjelasan." },
  { title: "Tempel isi DESIGN.md di bawah prompt", detail: "Supaya warna dan font mengikuti pilihan Anda. Stitch kadang tetap menyimpang, jadi periksa hasilnya." },
  { title: "Ubah satu hal per prompt", detail: "Contoh: \"perbesar tombol utama\". Prompt yang memuat banyak perubahan sering menghasilkan layar yang berantakan." },
  { title: "Ekspor hasilnya", detail: "Salin ke Figma untuk dirapikan, atau ambil kodenya (HTML dan Tailwind) lalu berikan ke AI agent." },
];

const FIGMA: Step[] = [
  { title: "Buat file desain baru di figma.com", detail: "Akun gratis sudah cukup untuk mulai. Cek batas paket gratis di situs resminya." },
  { title: "Gambar kerangka dulu (wireframe)", detail: "Pakai kotak abu-abu dan teks kasar, tanpa warna. Tujuannya menentukan letak tombol dan menu." },
  { title: "Rapikan dengan Auto Layout", detail: "Pilih sekelompok elemen, tekan Shift + A. Elemen akan tersusun otomatis dan ikut menyesuaikan saat teksnya berubah." },
  { title: "Simpan warna dan ukuran sebagai Variables", detail: "Salin nilainya dari DESIGN.md. Ubah satu variabel, semua layar ikut berubah." },
  { title: "Jadikan elemen berulang sebagai Component", detail: "Contoh: tombol. Buat variasinya: biasa, saat disorot kursor, saat nonaktif, saat memuat." },
  { title: "Hubungkan antar layar (mode Prototype)", detail: "Klik alurnya sendiri dari layar pertama sampai tujuan. Jika macet atau membingungkan, perbaiki di sini." },
  { title: "Ekspor layar sebagai gambar PNG", detail: "Unggah ke AI agent bersama DESIGN.md dan prompt UI Hi-Fi dari tab 3." },
];

const TERMS: [string, string][] = [
  ["Wireframe", "Gambar kerangka layar tanpa warna. Seperti denah rumah sebelum dicat."],
  ["Hi-Fi", "Desain jadi, lengkap dengan warna, font, dan isi."],
  ["Auto Layout", "Fitur Figma yang menyusun elemen otomatis, mirip aturan susun di CSS."],
  ["Variables", "Tempat menyimpan warna, jarak, dan font agar dipakai berulang."],
  ["Component", "Elemen yang dibuat sekali lalu dipakai di banyak layar."],
  ["Prototype", "Layar yang bisa diklik berurutan untuk menguji alur."],
  ["AI agent", "Program AI yang menulis kode untuk Anda, misalnya Claude Code atau Cursor."],
];

function Steps({ steps, dark }: { steps: Step[]; dark?: boolean }) {
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-3">
          <span className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-[11px] font-bold ${dark ? "bg-white text-black" : "bg-black text-white"}`}>
            {i + 1}
          </span>
          <div className="space-y-0.5">
            <div className={`text-sm font-bold ${dark ? "text-white" : "text-black"}`}>{s.title}</div>
            <p className={`text-xs leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>{s.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ToolsGuide() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-10 shadow-xs">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">2</div>
        <div>
          <h2 className="text-2xl font-bold text-black">Membuat Desain dengan Figma atau Google Stitch</h2>
          <p className="text-xs text-gray-500">Pilih satu jalur, ikuti langkahnya dari atas ke bawah. Anda tidak perlu memakai keduanya.</p>
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="text-base font-bold text-black">Mulai dari mana?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ROUTES.map((r) => (
            <div key={r.use} className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
              <p className="text-xs text-gray-500">{r.when}</p>
              <div className="text-sm font-bold text-black">{r.use}</div>
              <p className="text-xs leading-relaxed text-gray-600">{r.how}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-bold text-black">Alur lengkap, dari ide sampai kode</h3>
        <ol className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {FLOW.map((s, i) => (
            <li key={s.title} className="relative rounded-xl border border-gray-200 p-4 space-y-1">
              <div className="text-[11px] font-mono font-bold text-gray-500">Langkah {i + 1}</div>
              <div className="text-sm font-bold text-black">{s.title}</div>
              <p className="text-xs text-gray-600">{s.detail}</p>
              {i < FLOW.length - 1 && (
                <ArrowRight aria-hidden="true" className="hidden md:block absolute -right-[11px] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white text-gray-400" />
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-black bg-black p-6 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-white">Jalur A: Google Stitch</h3>
            <p className="text-xs text-gray-400">AI yang menggambar layar dari teks atau sketsa. Cocok untuk pemula.</p>
          </div>
          <Steps steps={STITCH} dark />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-black">Jalur B: Figma</h3>
            <p className="text-xs text-gray-500">Aplikasi desain standar industri. Cocok jika ingin kendali penuh atas setiap elemen.</p>
          </div>
          <Steps steps={FIGMA} />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-bold text-black">Istilah yang sering muncul</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
          {TERMS.map(([term, desc]) => (
            <div key={term} className="flex gap-3 border-b border-gray-100 pb-3">
              <dt className="w-24 flex-shrink-0 font-bold text-black">{term}</dt>
              <dd className="text-gray-600 leading-relaxed">{desc}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-gray-500">
          Alternatif lain: Excalidraw untuk sketsa dan diagram alur, Penpot sebagai pengganti Figma yang open-source, v0 untuk membuat antarmuka langsung dari prompt.
        </p>
      </section>
    </div>
  );
}
