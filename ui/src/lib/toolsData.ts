import { SKILL_ENTRIES, MCP_ENTRIES } from "./toolsDataExtra";

export type ToolKind = "ide" | "agent" | "skill" | "mcp" | "other";

export interface ToolStep {
  title: string;
  detail?: string;
  /** perintah atau konfigurasi yang bisa disalin */
  code?: string;
}

export interface ToolEntry {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  bestFor: string;
  steps: ToolStep[];
  tips: string[];
  links: { label: string; url: string }[];
  tags: string[];
}

export interface ToolSection {
  title: string;
  intro: string;
  entries: ToolEntry[];
}

// Untuk menambah alat: tambahkan satu objek ToolEntry ke array `entries` pada bagian yang sesuai.
export const TOOL_SECTIONS: Record<ToolKind, ToolSection> = {
  ide: {
    title: "IDE & Editor",
    intro: "Tempat Anda menulis dan menjalankan kode bersama AI. Pilih satu sebagai tempat kerja utama.",
    entries: [
      {
        id: "zed",
        name: "Zed",
        tagline: "Editor cepat dengan panel agent bawaan",
        summary: "Editor kode modern yang ringan. Punya Agent Panel untuk mengobrol dan mengedit kode dengan AI, bisa menyambung ke server MCP, dan bisa menjalankan agent eksternal lewat Agent Client Protocol (ACP).",
        bestFor: "Pengguna yang ingin editor cepat dan ringan, dengan kendali penuh atas model dan izin agent.",
        steps: [
          { title: "Pasang Zed", detail: "Unduh dari situs resmi zed.dev, lalu buka folder proyek Anda." },
          { title: "Buka pengaturan agent", detail: "Buka Command Palette, jalankan perintah berikut. Di sini Anda memilih penyedia model, agent eksternal, dan server MCP.", code: "agent: open settings" },
          { title: "Sambungkan model", detail: "Masukkan API key penyedia model atau masuk dengan akun yang didukung. Simpan kunci di pengaturan, jangan di berkas proyek." },
          { title: "Tambah server MCP (opsional)", detail: "Buka berkas pengaturan lalu tambahkan server di bagian context_servers. Format bisa berbeda antar versi, jadi cocokkan dengan dokumentasi Zed.", code: '{\n  "context_servers": {\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "D:/proyek"]\n    }\n  }\n}' },
          { title: "Pakai agent eksternal (opsional)", detail: "Di pengaturan agent, tambahkan agent seperti Claude Code lewat ACP. Dukungan MCP tergantung implementasi agent-nya." },
        ],
        tips: [
          "Matikan izin otomatis agar setiap perubahan file dan pemanggilan alat MCP butuh persetujuan Anda: agent.always_allow_tool_actions bernilai false.",
          "Mulai dengan satu server MCP saja, lalu tambah jika memang dipakai.",
        ],
        links: [
          { label: "Situs resmi Zed", url: "https://zed.dev" },
          { label: "Dokumentasi AI di Zed", url: "https://zed.dev/docs/ai" },
        ],
        tags: ["Editor", "ACP", "MCP"],
      },
      {
        id: "antigravity",
        name: "Antigravity",
        tagline: "IDE berbasis agent dari Google",
        summary: "Platform pengembangan yang menempatkan agent di tengah. Punya Editor View seperti IDE biasa dan Agent Manager untuk menjalankan beberapa agent paralel di workspace berbeda, lalu meninjau hasilnya sebelum disetujui. Integrasi browser lewat ekstensi Chrome memungkinkan agent membuka halaman, mengklik, dan merekam hasil uji.",
        bestFor: "Tugas yang bisa dibagi ke beberapa agent, dan pekerjaan yang perlu diuji langsung di browser.",
        steps: [
          { title: "Unduh dan pasang", detail: "Ambil installer dari situs resmi Antigravity, lalu ikuti wizard pemasangan untuk Windows atau macOS." },
          { title: "Masuk dan atur mode", detail: "Masuk dengan akun Google, lalu pilih mode kerja pada layar konfigurasi pertama. Mulailah dengan mode yang meminta persetujuan Anda." },
          { title: "Buka proyek di Editor View", detail: "Buka folder proyek. Editor View punya sidebar agent, perintah inline, dan penyelesaian kode." },
          { title: "Jalankan agent di Agent Manager", detail: "Buat tugas, beri konteks (DESIGN.md dan prompt dari halaman UI/UX Guide), lalu pantau progresnya." },
          { title: "Tinjau artefak", detail: "Periksa rencana, perubahan kode, dan tangkapan layar sebelum menyetujui. Jangan menyetujui tanpa membaca." },
          { title: "Pasang ekstensi Chrome (opsional)", detail: "Diperlukan agar agent bisa menguji halaman web secara langsung." },
        ],
        tips: [
          "Beri tugas yang kecil dan terukur; satu agent satu tujuan.",
          "Selalu sertakan DESIGN.md agar hasil UI konsisten dengan desain Anda.",
        ],
        links: [{ label: "Panduan pemasangan (Codecademy)", url: "https://www.codecademy.com/article/how-to-set-up-and-use-google-antigravity" }],
        tags: ["IDE", "Agent Manager", "Google"],
      },
    ],
  },
  agent: {
    title: "Agent",
    intro: "Asisten AI yang membaca proyek Anda, menulis kode, dan menjalankan perintah. Biasanya bekerja dari terminal atau panel di IDE.",
    entries: [
      {
        id: "claude-code",
        name: "Claude Code",
        tagline: "Agent koding dari Anthropic untuk terminal dan IDE",
        summary: "Agent yang bekerja langsung di folder proyek: membaca file, mengedit, menjalankan perintah, dan memakai skill, plugin, serta server MCP. Aturan proyek ditulis di berkas CLAUDE.md.",
        bestFor: "Pekerjaan koding sehari-hari yang butuh agent dengan izin yang bisa Anda atur.",
        steps: [
          { title: "Pasang", detail: "Butuh Node.js. Cara lain tersedia di dokumentasi resmi.", code: "npm install -g @anthropic-ai/claude-code" },
          { title: "Jalankan di folder proyek", detail: "Saat pertama dijalankan, ikuti langkah masuk (login).", code: "cd D:\\proyek\nclaude" },
          { title: "Buat CLAUDE.md", detail: "Agent merangkum proyek Anda ke berkas aturan yang dibaca setiap sesi.", code: "/init" },
          { title: "Gunakan mode rencana", detail: "Tekan Shift + Tab untuk berganti mode, lalu minta rencana sebelum agent mengubah file." },
          { title: "Tambah kemampuan", detail: "Pasang plugin dan skill (menu Plugin & Skill) dan server MCP (menu MCP Server)." },
        ],
        tips: [
          "Satu permintaan, satu tugas. Pecah tugas besar menjadi langkah kecil.",
          "Tulis aturan tetap di CLAUDE.md, misalnya gaya kode dan larangan membaca berkas .env.",
          "Tinjau setiap perubahan sebelum menyetujui, terutama perintah yang menghapus atau mengirim data.",
        ],
        links: [{ label: "Dokumentasi Claude Code", url: "https://docs.claude.com/en/docs/claude-code/overview" }],
        tags: ["CLI", "Anthropic", "MCP", "Skill"],
      },
    ],
  },
  skill: { title: "Plugin & Skill", intro: "Paket kemampuan tambahan untuk agent: panduan kerja, aturan desain, dan perintah khusus.", entries: SKILL_ENTRIES },
  mcp: { title: "MCP Server", intro: "Model Context Protocol: cara standar agar agent tersambung ke alat dan data seperti berkas, browser, dan database.", entries: MCP_ENTRIES },
  other: { title: "Alat Lainnya", intro: "Alat pendukung lain yang berguna untuk proyek ini.", entries: [] },
};
