import { useState } from "react";
import {
  Layers,
  Server,
  Database,
  Globe,
  CheckCircle2,
  Sparkles,
  Code2,
  Palette,
  Cpu,
  Terminal,
  Zap,
} from "lucide-react";

export default function StackTech() {
  const [activeCategory, setActiveCategory] = useState<"all" | "frontend" | "backend" | "database">("all");

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Hero Header */}
      <div className="space-y-4 border-b border-gray-200 pb-6">
        <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-3.5 py-1 text-xs font-semibold text-black shadow-xs gap-2">
          <Layers className="h-3.5 w-3.5 text-black" />
          <span>Panduan Tech Stack Vibe Coding</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
          Pilihan Tech Stack & Database System
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
          Panduan komprehensif memilih ekosistem Frontend, Framework Backend, serta sistem basis data (SQL, NoSQL, Supabase/BaaS) yang paling optimal untuk proyek Anda.
        </p>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "Semua Tech Stack", icon: Layers },
          { id: "frontend", label: "1. Frontend Ecosystem", icon: Globe },
          { id: "backend", label: "2. Backend Technologies", icon: Server },
          { id: "database", label: "3. Database & BaaS Systems", icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-black text-white shadow-xs"
                  : "bg-white border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. FRONTEND SECTION */}
      {(activeCategory === "all" || activeCategory === "frontend") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
            <Globe className="h-5 w-5 text-black" />
            <h2 className="text-2xl font-bold text-black">1. Frontend Ecosystem</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* React / Vite / Next.js */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 text-black flex items-center justify-center">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-gray-100 text-black border border-gray-200 px-2 py-0.5 rounded">
                    Industry Standard
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black">React & Next.js / Vite</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ekosistem terpopuler untuk SPA (*Single Page Application*) dan SSR (*Server Side Rendering*). Memiliki komunitas raksasa dan dukungan TypeScript terbaik untuk Vibe Coding.
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Kelebihan Utama:</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                    <span>Dukungan UI Component (Shadcn UI, Radix)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                    <span>AI sangat mahir menulis React/TSX</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Vue.js / Nuxt / Svelte */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 text-black flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-gray-100 text-black border border-gray-200 px-2 py-0.5 rounded">
                    Lightweight & Fast
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black">Vue.js & Nuxt / Svelte</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dikenal dengan kurva belajar yang sangat ramah pemula, sintaks reaktif yang intuitif, serta performa kompilasi yang teramat cepat.
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Kelebihan Utama:</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                    <span>Sintaks single-file component sederhana</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                    <span>Ukuran bundle awal sangat minim</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Vanilla JS & Tailwind */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 text-black flex items-center justify-center">
                    <Palette className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-gray-100 text-black border border-gray-200 px-2 py-0.5 rounded">
                    Pure & Flexible
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black">Vanilla JS & Tailwind CSS</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Pondasi dasar web modern tanpa overhead framework kompleks. Cocok untuk landing page berkecepatan tinggi atau perkakas internal ringan.
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Kelebihan Utama:</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                    <span>Zero build step overhead</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                    <span>Kontrol penuh atas manipulasi DOM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. BACKEND SECTION */}
      {(activeCategory === "all" || activeCategory === "backend") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
            <Server className="h-5 w-5 text-black" />
            <h2 className="text-2xl font-bold text-black">2. Backend Technologies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Node.js */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 text-black flex items-center justify-center">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-gray-100 text-black border border-gray-200 px-2 py-0.5 rounded">
                    Fullstack JS
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black">Node.js (Express / Fastify)</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Runtime JavaScript/TypeScript universal yang memungkinkan Anda menggunakan 1 bahasa (JS/TS) di Frontend maupun Backend.
                </p>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-[11px] font-mono text-gray-700">
                Ideal untuk: REST API, Realtime WebSockets, Microservices.
              </div>
            </div>

            {/* Python */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 text-black flex items-center justify-center">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-gray-100 text-black border border-gray-200 px-2 py-0.5 rounded">
                    AI & Data Ready
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black">Python (FastAPI / Django)</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Pilihan utama saat membangun backend yang terintegrasi dengan model AI/LLM, Machine Learning, skrip otomatisasi, dan olah data.
                </p>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-[11px] font-mono text-gray-700">
                Ideal untuk: AI Agents, Data Pipelines, High-speed Async API.
              </div>
            </div>

            {/* PHP Laravel */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 text-black flex items-center justify-center">
                    <Server className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-gray-100 text-black border border-gray-200 px-2 py-0.5 rounded">
                    Batteries Included
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black">PHP (Laravel Framework)</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Framework paling produktif dengan fitur bawaan lengkap (Eloquent ORM, Authentication, Horizon Queue, & Database Migration).
                </p>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-[11px] font-mono text-gray-700">
                Ideal untuk: Enterprise Web App, SaaS MVP cepat, E-Commerce.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. DATABASE & BAAS SYSTEMS SECTION */}
      {(activeCategory === "all" || activeCategory === "database") && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
            <Database className="h-5 w-5 text-black" />
            <h2 className="text-2xl font-bold text-black">3. Database Systems & Backend-as-a-Service (BaaS)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Relational SQL */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 text-black flex items-center justify-center font-mono font-bold text-xs">
                    SQL
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-gray-100 text-black border border-gray-200 px-2 py-0.5 rounded">
                    ACID Compliant
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black">Relational SQL</h3>
                <p className="text-xs font-semibold text-black">PostgreSQL, MySQL, SQLite</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Basis data terstruktur menggunakan tabel, relasi antar tabel (Foreign Keys), dan skema ketat. Menjamin integritas data transaksi keuangan.
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1 text-xs">
                <div className="font-bold text-black">Kapan digunakan?</div>
                <p className="text-[11px] text-gray-500">Saat data memiliki hubungan erat (misal: User -&gt; Orders -&gt; Payment).</p>
              </div>
            </div>

            {/* NoSQL */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 text-black flex items-center justify-center font-mono font-bold text-xs">
                    NoSQL
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-gray-100 text-black border border-gray-200 px-2 py-0.5 rounded">
                    Flexible Schema
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black">NoSQL Document & Key-Value</h3>
                <p className="text-xs font-semibold text-black">MongoDB, Redis, Cassandra</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Menyimpan data tanpa relasi kaku dalam format dokumen BSON/JSON atau Key-Value in-memory. Memungkinkan prototyping super cepat.
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1 text-xs">
                <div className="font-bold text-black">Kapan digunakan?</div>
                <p className="text-[11px] text-gray-500">Data cepat berubah, caching sistem (Redis), pesan chat, & log aplikasi.</p>
              </div>
            </div>

            {/* Modern Cloud BaaS (Supabase & Firebase) */}
            <div className="bg-black text-white rounded-2xl border border-gray-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gray-800 text-white border border-gray-700 flex items-center justify-center font-bold text-sm">
                    <Zap className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-gray-800 text-gray-200 border border-gray-700 px-2 py-0.5 rounded">
                    Modern BaaS
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">Supabase & Firebase</h3>
                <p className="text-xs font-semibold text-gray-300">Backend-as-a-Service Cloud</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Layanan Backend Cloud tanpa perlu membangun server manual dari nol. Menyediakan Database, Authentication, Storage, & Realtime API bawaan.
                </p>
              </div>
              <div className="bg-gray-950 p-3 rounded-xl border border-gray-800 space-y-1 text-xs text-gray-300 font-mono">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  <span>Supabase: Postgres + Auth + Realtime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  <span>Firebase: NoSQL + Auth + Cloud Functions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table SQL vs NoSQL vs Supabase */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-lg font-bold text-black flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-black" />
              Matriks Perbandingan Database Sistem
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-black font-bold">
                    <th className="p-3">Kategori</th>
                    <th className="p-3">SQL (PostgreSQL / MySQL)</th>
                    <th className="p-3">NoSQL (MongoDB)</th>
                    <th className="p-3">Supabase (BaaS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono text-[11px] text-gray-700">
                  <tr>
                    <td className="p-3 font-bold text-black font-sans">Struktur Data</td>
                    <td className="p-3">Tabel, Baris, Kolom (Ketat)</td>
                    <td className="p-3">Dokumen JSON (Bebas)</td>
                    <td className="p-3">Postgres Relational + API auto-gen</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-black font-sans">Kurva Belajar</td>
                    <td className="p-3 font-semibold text-black">Sedang (Perlu Schema Query)</td>
                    <td className="p-3 font-semibold text-black">Mudah & Cepat</td>
                    <td className="p-3 font-semibold text-black">Sangat Mudah (Instant SDK)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-black font-sans">Autentikasi & File Storage</td>
                    <td className="p-3">Buat Sendiri di Backend</td>
                    <td className="p-3">Buat Sendiri di Backend</td>
                    <td className="p-3 font-bold text-black">Terintegrasi Langsung (Built-in)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-black font-sans">Cocok Untuk</td>
                    <td className="p-3">Aplikasi Finansial, ERP, E-Commerce</td>
                    <td className="p-3">Catalog, Content Management, Chat</td>
                    <td className="p-3 font-bold text-black">SaaS MVP, Mobile Apps, Vibe Coding</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
