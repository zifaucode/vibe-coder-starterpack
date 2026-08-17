import {
  BookOpen,
  Layers,
  Rocket,
  Pipette,
  Smartphone,
  Boxes,
  LayoutTemplate,
  Code,
  Search,
  Fingerprint,
  Command,
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";

interface DashboardProps {
  onNavigateTab: (tabId: string) => void;
  onOpenCommandPalette: () => void;
}

export default function Dashboard({ onNavigateTab, onOpenCommandPalette }: DashboardProps) {
  const MODULE_CATEGORIES = [
    {
      title: "1. Getting Started & AI Rules",
      description: "Pondasi arsitektur, pilihan tech stack, strategi rilis & aturan Anti-Slop AI",
      items: [
        {
          id: "introduction",
          title: "Introduction & Blueprint",
          desc: "PRD.md, SDD.md, DESIGN.md, Kalkulator Token AI & Panduan Anti-Halusinasi",
          icon: BookOpen,
        },
        {
          id: "introduction",
          title: "Anti-Slop AI & Instalasi Manual",
          desc: "Aturan Anti-Slop (Copywriting & UI) oleh Miqdad Badjuber & panduan pasang manual",
          icon: ShieldCheck,
        },
        {
          id: "stacktech",
          title: "StackTech & Database System",
          desc: "Panduan ekosistem Frontend, Backend Framework & Relational SQL vs NoSQL vs Supabase",
          icon: Layers,
        },
        {
          id: "deploy",
          title: "Production & Deploy Strategy",
          desc: "Panduan rilis dari Vercel/GitHub Pages hingga VPS Linux, Docker & CI/CD Pipeline",
          icon: Rocket,
        },
      ],
    },
    {
      title: "2. Design & UI/UX Strategy",
      description: "Perkakas perancangan antarmuka, komponen web/mobile, & strategi Figma",
      items: [
        {
          id: "color-picker",
          title: "Color Picker & Tokens",
          desc: "Pemilih warna HSL/HEX/RGB & penata token warna sistem monokrom",
          icon: Pipette,
        },
        {
          id: "mobile-glossary",
          title: "Mobile Component Glossary",
          desc: "Katalog visual komponen mobile (Bottom Sheet, FAB, Toast, Accordion)",
          icon: Smartphone,
        },
        {
          id: "prompt-library",
          title: "Web Components Library",
          desc: "Katalog komponen web (Hero, Navigation, Bento Grid, Pricing Table)",
          icon: Boxes,
        },
        {
          id: "ui-ux-guide",
          title: "UI/UX Strategy & Workflow",
          desc: "Alur kerja Pre-Design, Wireframing Lo-Fi vs Hi-Fi, Figma, & Google Stitch AI",
          icon: LayoutTemplate,
        },
      ],
    },
    {
      title: "3. Developer Utilities",
      description: "Perkakas pembantu otomatisasi, validasi data, & pengujian ekspresi",
      items: [
        {
          id: "json-formatter",
          title: "JSON Formatter & Validator",
          desc: "Format, rapikan, dan validasi struktur data JSON secara realtime",
          icon: Code,
        },
        {
          id: "regex-tester",
          title: "Regex Tester & Highlighting",
          desc: "Penguji ekspresi reguler (Regular Expression) dengan pemetaan match",
          icon: Search,
        },
        {
          id: "base64-tool",
          title: "Base64 Encoder / Decoder",
          desc: "Enkripsi dan dekripsi teks atau berkas ke format string Base64",
          icon: Fingerprint,
        },
        ],
    },
  ];

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header Control Center */}
      <div className="space-y-4 border-b border-gray-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center rounded-md border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black shadow-xs gap-2">
              <LayoutDashboard className="h-3.5 w-3.5 text-black" />
              <span>VCS Navigation Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
              Vibe Coder Dashboard
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
              Navigasi terpusat seluruh modul starterpack. Gunakan Command Palette (<kbd className="font-mono bg-gray-100 border border-gray-300 text-black px-1.5 py-0.5 rounded text-xs">Ctrl + K</kbd>) untuk akses cepat.
            </p>
          </div>

          {/* Command Palette Trigger Button */}
          <button
            onClick={onOpenCommandPalette}
            className="inline-flex items-center justify-between gap-4 bg-black hover:bg-gray-800 text-white p-3.5 rounded-xl shadow-xs transition-all cursor-pointer group border border-gray-800 min-w-[240px]"
          >
            <div className="flex items-center gap-2.5">
              <Command className="h-4 w-4 text-white" />
              <span className="text-xs font-bold">Cari Modul & Pintasan</span>
            </div>
            <kbd className="text-[10px] font-mono font-bold bg-gray-800 text-gray-200 px-2 py-1 rounded border border-gray-700">
              Ctrl + K
            </kbd>
          </button>
        </div>
      </div>

      {/* Categorized Module Cards List */}
      <div className="space-y-8">
        {MODULE_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="space-y-4">
            <div className="space-y-1 border-b border-gray-200 pb-2">
              <h2 className="text-xl font-bold text-black">{cat.title}</h2>
              <p className="text-xs text-gray-500">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`${item.id}-${itemIdx}`}
                    onClick={() => onNavigateTab(item.id)}
                    className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-xs hover:border-black transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                          <Icon className="h-5 w-5" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-black group-hover:underline">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-400">
                      <span>Buka Modul</span>
                      <span className="font-bold text-black">Buka</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Keyboard Shortcuts Cheat Sheet */}
      <div className="bg-black text-white rounded-2xl p-6 border border-gray-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <Command className="h-5 w-5 text-white" />
            <h3 className="text-base font-bold text-white">Pintasan Navigasi Keyboard</h3>
          </div>
          <span className="text-[10px] font-mono bg-gray-800 text-gray-200 border border-gray-700 px-2 py-0.5 rounded font-bold">
            Shortcut System
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-gray-300">
          <div className="bg-gray-950 p-3 rounded-xl border border-gray-800 flex items-center justify-between">
            <span>Buka Search Command</span>
            <kbd className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-700 text-[10px] font-bold">Ctrl + K</kbd>
          </div>
          <div className="bg-gray-950 p-3 rounded-xl border border-gray-800 flex items-center justify-between">
            <span>Tutup Modal / Search</span>
            <kbd className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-700 text-[10px] font-bold">ESC</kbd>
          </div>
          <div className="bg-gray-950 p-3 rounded-xl border border-gray-800 flex items-center justify-between">
            <span>Pilih Modul</span>
            <kbd className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-700 text-[10px] font-bold">↑ ↓ + Enter</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
