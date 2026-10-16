export interface DesignForm {
  name: string;
  summary: string;
  audience: string;
  type: string;
  platform: "Web" | "Mobile" | "Desktop";
  screens: string;
  style: string;
  primary: string;
  accent: string;
  headingFont: string;
  bodyFont: string;
  radius: number;
  density: "Lega" | "Standar" | "Padat";
  motion: "Minim" | "Standar" | "Ekspresif";
  variance: "Simetris" | "Seimbang" | "Asimetris";
  theme: "Light" | "Dark" | "Light + Dark";
  tool: string;
}

export const DEFAULT_FORM: DesignForm = {
  name: "",
  summary: "",
  audience: "",
  type: "Dashboard / SaaS",
  platform: "Web",
  screens: "Login\nDashboard\nDetail data\nPengaturan",
  style: "Minimalis monokrom",
  primary: "#0f172a",
  accent: "#10b981",
  headingFont: "Outfit",
  bodyFont: "Inter",
  radius: 12,
  density: "Standar",
  motion: "Minim",
  variance: "Seimbang",
  theme: "Light",
  tool: "Google Stitch",
};

export const OPTIONS = {
  type: ["Dashboard / SaaS", "Landing page", "E-commerce", "Aplikasi mobile", "Internal tool / Admin", "Portofolio"],
  style: ["Minimalis monokrom", "Editorial / majalah", "Playful / hangat", "Brutalist", "Korporat bersih"],
  font: ["Inter", "Outfit", "Plus Jakarta Sans", "DM Sans", "Manrope", "Space Grotesk", "Playfair Display"],
  radius: [0, 4, 8, 12, 16],
  tool: ["Google Stitch", "Figma", "v0 / AI coding agent"],
};

const DENSITY_GAP = { Lega: 24, Standar: 16, Padat: 8 } as const;

const lum = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Rasio kontras WCAG antara dua warna #rrggbb. */
export const contrast = (a: string, b: string) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** Teks hitam atau putih, mana yang kontrasnya lebih tinggi di atas `bg`. */
const onColor = (bg: string) => (contrast(bg, "#ffffff") >= contrast(bg, "#000000") ? "#ffffff" : "#000000");

const screenList = (f: DesignForm) =>
  f.screens.split("\n").map((s) => s.trim()).filter(Boolean);

const MOTION_RULE = {
  Minim: "Hanya state hover, focus, dan transisi 150-200ms. Tanpa animasi yang berjalan sendiri.",
  Standar: "Transisi 150-250ms plus satu animasi masuk per layar. Durasi dibedakan menurut jarak, dan exit lebih cepat dari enter.",
  Ekspresif: "Koreografi per bagian halaman, tiap gerak punya tujuan tertulis. Hanya animasikan transform dan opacity.",
} as const;

const VARIANCE_RULE = {
  Simetris: "Tata letak terpusat dan teratur; variasi antar section kecil.",
  Seimbang: "Campur section simetris dan asimetris; urutan section mengikuti isi produk.",
  Asimetris: "Komposisi berani; ukuran kartu mengikuti bobot isi, bukan dipaksa seragam.",
} as const;

// Ringkasan prioritas dari skill ui-ux-pro-max (aksesibilitas sampai navigasi).
const UX_RULES = `1. **Aksesibilitas (kritis):** kontras teks 4.5:1, fokus keyboard terlihat, alt text, aria-label pada tombol ikon, warna bukan satu-satunya penanda
2. **Sentuh & interaksi (kritis):** target minimal 44x44px, jarak antar target 8px+, umpan balik loading, jangan andalkan hover
3. **Performa:** gambar WebP/AVIF, lazy load, sisihkan ruang gambar (CLS < 0.1)
4. **Gaya:** satu keluarga ikon SVG (bukan emoji), satu gaya per tingkat hierarki
5. **Layout:** mobile-first, tanpa scroll horizontal, jangan nonaktifkan zoom
6. **Tipografi & warna:** body 16px (min 12px), line-height 1.5, token semantik, bukan hex mentah di komponen
7. **Animasi:** durasi sesuai konteks, hormati reduced-motion, jangan animasikan width/height
8. **Form:** label terlihat, error di dekat field, helper text, tampilkan opsi bertahap
9. **Navigasi:** tombol kembali dapat diprediksi, bottom nav maksimal 5, deep link`;

// Daftar tell dari skill antislop-ui; dekorasi wajib punya alasan tertulis.
const SLOP_RULES = `- Tanpa gradien biru-ungu default, orb blur, atau glow di mana-mana (glow dan glass maksimal 1-2 elemen)
- Tanpa emoji sebagai ikon atau hiasan teks; ikon harus relevan dengan isinya
- Tanpa pill badge di atas judul yang hanya mengulang judul, tanpa titik status dekoratif
- Tanpa strip warna di sisi kiri kartu kecuali menandai state nyata
- Tanpa kartu fitur seragam, bento grid tanpa alasan, atau 3 kolom harga dengan tengah disorot otomatis
- Tanpa data palsu: John Doe, angka karangan, feed aktivitas fiktif, logo "Trusted by" palsu
- Tanpa tombol, menu, atau link navigasi yang tidak berfungsi; yang belum jadi diberi label "Segera hadir"
- Empty, loading, dan error state menyebut penyebab dan langkah berikutnya, bukan "No data"
- Dekorasi (gradien, shadow, radius, badge) hanya dipakai bila alasannya bisa ditulis satu kalimat`;

const HANDOFF_CHECK = `- [ ] Kontras teks 4.5:1 di tema terang dan gelap (diuji terpisah)
- [ ] Target sentuh 44px, fokus keyboard terlihat, urutan tab sesuai visual
- [ ] Diuji di 375 / 768 / 1280px, tanpa scroll horizontal
- [ ] Dicek dengan reduced-motion aktif dan teks diperbesar
- [ ] Semua state ada: default, hover, focus, active, loading, disabled, error, kosong
- [ ] Semua tombol dan link berfungsi atau berlabel "Segera hadir"
- [ ] Semua warna, spacing, dan radius memakai token di atas`;

export function buildDesignMd(f: DesignForm): string {
  const name = f.name || "[Nama Produk]";
  const onPrimary = onColor(f.primary);
  const ratio = contrast(f.primary, onPrimary).toFixed(1);
  const dark = f.theme !== "Light";
  const gap = DENSITY_GAP[f.density];
  return `# DESIGN.md - ${name}

## 1. Konteks
- **Produk:** ${f.summary || "[isi deskripsi singkat]"}
- **Tipe / Platform:** ${f.type} / ${f.platform}
- **Pengguna utama:** ${f.audience || "[isi target pengguna]"}
- **Arah visual:** ${f.style}
- **Tema:** ${f.theme}

## 2. Color Tokens
| Token | Nilai | Catatan |
|-------|-------|---------|
| \`--color-primary\` | ${f.primary} | CTA utama, elemen aktif |
| \`--color-on-primary\` | ${onPrimary} | Teks di atas primary, kontras ${ratio}:1 |
| \`--color-accent\` | ${f.accent} | Dipakai hanya pada satu momen kunci per layar |
| \`--color-bg\` | ${dark ? "#0b0f14 (dark) / #fafafa (light)" : "#fafafa"} | Latar halaman |
| \`--color-surface\` | ${dark ? "#131920 (dark) / #ffffff (light)" : "#ffffff"} | Kartu, panel |
| \`--color-border\` | rgba(0,0,0,0.08) | Garis pemisah |
| \`--color-danger\` | #dc2626 | Error dan aksi destruktif |

Batas: maksimal 2-3 warna inti + 1 aksen. Jangan tambah warna baru tanpa memperbarui tabel ini.

## 3. Tipografi
- **Heading:** ${f.headingFont}, weight 700-800, tracking rapat
- **Body:** ${f.bodyFont}, 14-16px, line-height 1.5-1.6
- **Skala:** 12 / 14 / 16 / 20 / 24 / 36 px
- **Teks body tidak boleh di bawah 12px.**

## 4. Spacing, Radius, Elevasi
- **Grid:** kelipatan 8px (4 / 8 / 16 / 24 / 32 / 48)
- **Jarak antar komponen (kepadatan ${f.density}):** ${gap}px
- **Radius:** ${f.radius}px untuk kartu dan input; tombol ikut radius yang sama
- **Shadow:** hanya untuk elemen yang benar-benar melayang (dropdown, modal). Sisanya datar.

## 5. Komponen & State
Setiap elemen interaktif punya state: default, hover, focus-visible, active, loading, disabled.
- **Tombol:** 1 primary per layar, tinggi minimal 44px, label berupa kata kerja
- **Input:** label selalu terlihat, pesan error di bawah field, bukan hanya di atas form
- **Kartu:** isi menentukan ukuran; jangan seragamkan kartu yang bobotnya berbeda
- **Empty / loading / error:** sebutkan penyebab dan langkah berikutnya

## 6. Layar
${screenList(f).map((s, i) => `${i + 1}. ${s}`).join("\n") || "1. [isi daftar layar]"}

## 7. Gerak & Variasi Layout
- **Motion (${f.motion}):** ${MOTION_RULE[f.motion]}
- **Variasi (${f.variance}):** ${VARIANCE_RULE[f.variance]}
- Hormati \`prefers-reduced-motion\`

## 8. Aturan UX (urut prioritas)
${UX_RULES}

## 9. Anti-Slop (hindari tampilan generik AI)
${SLOP_RULES}

## 10. Cek Sebelum Serah Terima
${HANDOFF_CHECK}
`;
}

export type PromptKind = "wireframe" | "flow" | "hifi" | "component" | "review";

export const PROMPT_TABS: { id: PromptKind; label: string }[] = [
  { id: "wireframe", label: "Wireframe Lo-Fi" },
  { id: "flow", label: "User Flow" },
  { id: "hifi", label: "UI Hi-Fi" },
  { id: "component", label: "Komponen" },
  { id: "review", label: "Review UX" },
];

const TOOL_NOTE: Record<string, string> = {
  "Google Stitch": "Tempel ke kotak prompt Stitch (Standard Mode, pilih target sesuai platform). Lampirkan DESIGN.md di bawah prompt.",
  Figma: "Pakai di Figma Make / First Draft, atau sebagai brief untuk desainer. Bangun dengan Auto Layout dan Variables dari DESIGN.md.",
  "v0 / AI coding agent": "Tempel ke v0 atau agent (Claude Code, Cursor). Tempel juga DESIGN.md sebagai konteks.",
};

export function buildPrompt(kind: PromptKind, f: DesignForm): string {
  const name = f.name || "[Nama Produk]";
  const screens = screenList(f);
  const list = screens.map((s) => `- ${s}`).join("\n") || "- [isi daftar layar]";
  const head = `Produk: ${name} (${f.type}, ${f.platform})
Deskripsi: ${f.summary || "[isi deskripsi]"}
Pengguna: ${f.audience || "[isi target pengguna]"}
Layar:
${list}`;
  const tokens = `Gunakan token berikut: primary ${f.primary}, aksen ${f.accent}, font heading ${f.headingFont}, body ${f.bodyFont}, radius ${f.radius}px, grid 8px, kepadatan ${f.density}, tema ${f.theme}, motion ${f.motion}, variasi layout ${f.variance}. Gaya: ${f.style}.`;
  const rules = `\n\nAturan UX (urut prioritas):\n${UX_RULES}\n\nHindari tampilan generik AI:\n${SLOP_RULES}`;
  const body: Record<PromptKind, string> = {
    wireframe: `Buat wireframe Lo-Fi hitam-putih untuk setiap layar di atas. Tanpa warna, tanpa foto, teks placeholder jelas seperti "Judul layar" atau "Nama pengguna". Tunjukkan hierarki tata letak, navigasi, dan satu aksi utama per layar. Tandai area yang bisa kosong, loading, atau error.`,
    flow: `Petakan user flow dari pembukaan aplikasi sampai tujuan utama pengguna. Untuk tiap langkah tulis: layar, aksi pengguna, respons sistem, dan jalur gagal (error, data kosong, tanpa akses). Keluarkan sebagai daftar bernomor, lalu diagram Mermaid flowchart.`,
    hifi: `Buat desain Hi-Fi untuk semua layar di atas dari wireframe yang ada. ${tokens} Sertakan state default, hover, focus, loading, disabled, dan error. Teks harus nyata sesuai konteks produk, bukan lorem ipsum atau data karangan.${rules}`,
    component: `Buat library komponen: button, input, select, card, tabel, modal, toast, navigasi. ${tokens} Tiap komponen punya varian dan state lengkap, tinggi sentuh minimal 44px, label terlihat, dan nama layer yang rapi.${rules}`,
    review: `Review desain ${name} sebagai UX reviewer. ${tokens} Periksa terhadap aturan berikut:${rules}\n\nCek serah terima:\n${HANDOFF_CHECK}\n\nBeri daftar temuan berurutan dari yang paling parah, masing-masing dengan lokasi dan perbaikan konkret.`,
  };
  const skills = f.tool === "v0 / AI coding agent"
    ? "Jika tersedia, aktifkan skill ui-ux-pro-max dan antislop-ui sebelum mengerjakan.\n\n"
    : "";
  return `[${kind.toUpperCase()} PROMPT - ${f.tool}]\n${skills}${head}\n\n${body[kind]}\n\nCatatan penggunaan: ${TOOL_NOTE[f.tool]}`;
}

/** Simpan lewat dialog native PyWebView; fallback unduhan browser. */
export async function downloadFile(filename: string, content: string) {
  const api = (window as any).pywebview?.api;
  if (api?.save_file) {
    try {
      const res = await api.save_file(filename, content);
      if (res?.success) return;
    } catch (err) {
      console.error("save_file error:", err);
    }
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type: "text/markdown;charset=utf-8" }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
