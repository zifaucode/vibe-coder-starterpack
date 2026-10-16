import type { ToolEntry } from "./toolsData";

export const SKILL_ENTRIES: ToolEntry[] = [
  {
    id: "skill-basics",
    name: "Dasar Skill dan Plugin Claude",
    tagline: "Apa bedanya, di mana disimpan, cara memakainya",
    summary: "Skill adalah folder berisi berkas SKILL.md: instruksi yang dibaca agent saat tugasnya cocok dengan deskripsi skill itu. Plugin adalah paket yang bisa berisi beberapa skill, perintah, hook, dan server MCP, dipasang dari marketplace.",
    bestFor: "Menanamkan cara kerja yang sama ke agent, misalnya standar desain atau aturan penulisan kode.",
    steps: [
      { title: "Lihat plugin yang tersedia", detail: "Di sesi Claude Code, buka pengelola plugin.", code: "/plugin" },
      { title: "Tambah marketplace dan pasang plugin", detail: "Ganti pemilik/repo dan nama sesuai sumber yang Anda percaya.", code: "/plugin marketplace add pemilik/repo\n/plugin install nama-plugin@nama-marketplace" },
      { title: "Panggil skill", detail: "Ketik garis miring diikuti nama skill, atau biarkan agent memilihnya sendiri lewat deskripsinya.", code: "/nama-plugin:nama-skill" },
      { title: "Buat skill sendiri", detail: "Simpan di folder pribadi (~/.claude/skills/nama/SKILL.md) atau di proyek (.claude/skills/nama/SKILL.md). Deskripsi menentukan kapan skill dipakai, jadi tulis dengan jelas.", code: "---\nname: ringkas-pr\ndescription: Ringkas perubahan git menjadi deskripsi pull request. Pakai saat diminta merangkum PR.\n---\n1. Jalankan git diff main...HEAD\n2. Tulis ringkasan satu paragraf dan daftar perubahan utama." },
    ],
    tips: [
      "Pasang plugin hanya dari sumber yang Anda percaya: skill dan hook bisa memengaruhi apa yang dijalankan agent.",
      "Satu skill, satu tujuan. Skill yang terlalu luas sulit dipicu dengan tepat.",
      "Skill di folder proyek ikut ter-commit dan bisa dipakai seluruh tim.",
    ],
    links: [{ label: "Dokumentasi Claude Code", url: "https://docs.claude.com/en/docs/claude-code/overview" }],
    tags: ["Skill", "Plugin", "Claude"],
  },
  {
    id: "ponytail",
    name: "ponytail",
    tagline: "Kode seminimal mungkin yang tetap bekerja",
    summary: "Memaksa agent mencari solusi paling sederhana lebih dulu: apakah perlu ada, sudah ada di kode, cukup pustaka standar, atau cukup satu baris. Cocok melawan kode yang berlebihan.",
    bestFor: "Menulis, memperbaiki, dan meninjau kode agar tidak membengkak.",
    steps: [
      { title: "Pakai untuk menulis kode", detail: "Panggil di awal permintaan koding.", code: "/ponytail:ponytail" },
      { title: "Tinjau kode yang ada", detail: "Cari yang bisa dihapus atau disederhanakan pada perubahan Anda, atau pada seluruh repo.", code: "/ponytail:ponytail-review\n/ponytail:ponytail-audit" },
      { title: "Atur tingkat ketat", detail: "Pilih lite, full, atau ultra sesuai seberapa keras Anda ingin dipaksa menyederhanakan.", code: "/ponytail lite" },
    ],
    tips: ["Mulai dari tingkat full. Gunakan lite jika Anda ingin tetap memutuskan sendiri."],
    links: [],
    tags: ["Skill", "Kode", "Review"],
  },
  {
    id: "antislop",
    name: "antislop",
    tagline: "Cegah tampilan dan tulisan generik buatan AI",
    summary: "Kumpulan aturan untuk menghindari pola yang membuat hasil AI mudah dikenali: gradien bawaan, kartu seragam, data palsu, dan kalimat berbunga. Terbagi menjadi skill untuk UI, tata letak mobile, tulisan, aksesibilitas, dan komentar kode.",
    bestFor: "Menjaga hasil UI dan teks tetap punya identitas dan jujur.",
    steps: [
      { title: "Muat aturan inti bersama skill yang relevan", detail: "Untuk pekerjaan UI pakai skill UI; untuk teks pakai skill copywriting.", code: "/antislop:antislop\n/antislop:antislop-ui\n/antislop:antislop-copywriting" },
      { title: "Bersihkan komentar kode", detail: "Hapus komentar generik tanpa mengubah kodenya.", code: "/antislop:antislop-code" },
      { title: "Cek untuk manusia", detail: "Kontras, keyboard, fokus, dan state.", code: "/antislop:antislop-human" },
    ],
    tips: ["Sertakan DESIGN.md agar aturan warna dan font punya sumber yang jelas, bukan tebakan agent."],
    links: [],
    tags: ["Skill", "UI", "Copywriting"],
  },
  {
    id: "ui-ux-pro-max",
    name: "ui-ux-pro-max",
    tagline: "Pedoman desain: gaya, warna, tipografi, aksesibilitas",
    summary: "Paket pedoman UI/UX dengan puluhan gaya, palet, pasangan font, dan aturan UX yang diurutkan menurut prioritas. Punya skill untuk sistem desain, styling dengan Tailwind dan shadcn, banner, merek, dan slide.",
    bestFor: "Membuat atau memeriksa halaman dan komponen agar konsisten dan mudah diakses.",
    steps: [
      { title: "Rancang atau tinjau antarmuka", code: "/ui-ux-pro-max:ui-ux-pro-max" },
      { title: "Susun token dan spesifikasi komponen", code: "/ui-ux-pro-max:design-system" },
      { title: "Implementasi dengan Tailwind dan shadcn", code: "/ui-ux-pro-max:ui-styling" },
      { title: "Banner dan aset kreatif", code: "/ui-ux-pro-max:banner-design" },
    ],
    tips: ["Gabungkan dengan antislop-ui: satu memberi arah desain, satu menjaga dari pola generik."],
    links: [],
    tags: ["Skill", "Desain", "Aksesibilitas"],
  },
];

export const MCP_ENTRIES: ToolEntry[] = [
  {
    id: "mcp-basics",
    name: "Dasar MCP dan cara memasangnya",
    tagline: "Menyambungkan agent ke alat dan data",
    summary: "MCP (Model Context Protocol) adalah standar terbuka agar agent bisa memakai alat luar: membaca berkas, mengendalikan browser, mencari dokumentasi, atau mengakses database. Satu server MCP menyediakan satu set alat.",
    bestFor: "Memberi agent kemampuan di luar membaca dan menulis kode.",
    steps: [
      { title: "Tambah server lokal (stdio)", detail: "Format: nama server, lalu perintah untuk menjalankannya setelah tanda --.", code: "claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem D:/proyek" },
      { title: "Tambah server jarak jauh (HTTP)", code: "claude mcp add --transport http nama https://alamat-server-mcp" },
      { title: "Tentukan cakupan", detail: "Cakupan proyek menyimpan konfigurasi di .mcp.json agar dibagikan ke tim; cakupan user hanya untuk Anda.", code: "claude mcp add --scope project nama -- perintah" },
      { title: "Periksa", detail: "Lihat daftar dari terminal, atau ketik /mcp di dalam sesi.", code: "claude mcp list" },
    ],
    tips: [
      "Server MCP menjalankan kode di komputer Anda. Pasang hanya dari sumber yang Anda percaya dan baca dulu apa yang dilakukannya.",
      "Jangan menaruh API key di .mcp.json yang di-commit; pakai variabel lingkungan.",
      "Pasang yang benar-benar dipakai. Setiap server menambah alat yang harus dipertimbangkan agent.",
    ],
    links: [
      { label: "Situs Model Context Protocol", url: "https://modelcontextprotocol.io" },
      { label: "MCP di Claude Code", url: "https://docs.claude.com/en/docs/claude-code/mcp" },
    ],
    tags: ["MCP", "Claude Code"],
  },
  {
    id: "mcp-popular",
    name: "Server MCP yang berguna untuk proyek web",
    tagline: "Contoh jenis server dan kapan dipakai",
    summary: "Beberapa jenis server yang sering membantu. Nama paket di bawah adalah contoh; periksa repositori resminya untuk versi dan opsi terbaru sebelum memasang.",
    bestFor: "Menguji tampilan di browser, mencari dokumentasi terbaru, dan mengakses berkas proyek secara terkontrol.",
    steps: [
      { title: "Berkas proyek", detail: "Memberi agent akses ke folder tertentu saja.", code: "claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem D:/proyek" },
      { title: "Otomasi browser", detail: "Agent membuka halaman, mengklik, dan memeriksa hasil untuk menguji UI.", code: "claude mcp add playwright -- npx @playwright/mcp@latest" },
      { title: "Dokumentasi pustaka", detail: "Menarik dokumentasi versi terbaru agar agent tidak memakai API yang sudah usang.", code: "claude mcp add context7 -- npx -y @upstash/context7-mcp" },
    ],
    tips: ["Batasi folder yang boleh diakses, dan jangan arahkan ke folder yang berisi berkas .env atau data asli."],
    links: [{ label: "Daftar server resmi", url: "https://github.com/modelcontextprotocol/servers" }],
    tags: ["MCP", "Browser", "Dokumentasi"],
  },
];
