import { useState } from "react";
import {
  BookOpen,
  FileText,
  Cpu,
  Bot,
  ShieldCheck,
  Globe,
  Calculator,
  CheckCircle2,
  ArrowRight,
  Layers,
  Code2,
  Lock,
  Gauge,
  AlertTriangle,
  XCircle,
  FileWarning,
  Download,
  Copy,
  Check,
} from "lucide-react";

export default function Introduction() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const TEMPLATES = {
    prd: `# Product Requirements Document (PRD)

## 1. Visi Produk & Ringkasan Masalah
- **Visi Produk:** [Tuliskan deskripsi 1-2 kalimat tentang produk yang ingin dibangun]
- **Masalah Utama:** [Apa masalah terbesar pengguna yang diselesaikan aplikasi ini?]
- **Target Pengguna:** [Siapa pengguna utama produk ini?]

## 2. Core User Stories & Checklist Fitur (v1.0)
- [ ] **Auth & User Management:** User dapat sign up, login, dan mengelola profil.
- [ ] **Main Feature 1:** [Deskripsi fitur utama 1]
- [ ] **Main Feature 2:** [Deskripsi fitur utama 2]
- [ ] **Dashboard & Analytics:** User dapat melihat rangkuman aktivitas.

## 3. Scope Boundaries (Out of Scope v1.0)
- [ ] Integrasi Payment Gateway Pihak Ketiga (Fase 2)
- [ ] Fitur Push Notification Native (Fase 2)

## 4. Non-Functional Requirements (NFR)
- **Kecepatan Load:** Halaman memuat kurang dari 1.5 detik.
- **Keamanan:** Password di-hash (Bcrypt), API key tersimpan di .env.
- **Responsif:** Berjalan sempurna di layar Mobile (375px) dan Desktop (1920px).
`,
    sdd: `# System Design Document (SDD)

## 1. Tech Stack & Architecture
- **Frontend Framework:** React 19 + TypeScript + Vite
- **Styling:** Vanilla CSS / Tailwind CSS (v4)
- **State Management:** React Context API / Zustand
- **Backend / Database:** Node.js (Express/Fastify) atau Laravel / PostgreSQL / SQLite

## 2. Directory Structure Conventions
\`\`\`
src/
├── components/    # Reusable UI components (Maksimal < 200 baris per file)
├── pages/         # View components untuk routing
├── lib/           # Utility functions & API clients
├── hooks/         # Custom React hooks
└── types/         # TypeScript type & interface definitions
\`\`\`

## 3. API Contracts & Data Schema
### Data Model (Interface)
\`\`\`typescript
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface ResourceItem {
  id: string;
  userId: string;
  title: string;
  status: 'draft' | 'published';
  createdAt: string;
}
\`\`\`

### API Endpoints
- \`GET /api/v1/resources\` -> Mengembalikan daftar \`ResourceItem[]\`
- \`POST /api/v1/resources\` -> Body: \`{ title: string }\`

## 4. Coding & Error Handling Rules
- File kode TIDAK BOLEH melebihi **300 baris** untuk menjaga efisiensi token AI.
- Selalu bungkus pemanggilan async dalam \`try-catch\` dengan umpan balik UI yang jelas.
`,
    design: `# Design System & Guidelines (DESIGN.md)

## 1. Palette Warna & Design Tokens
- **Primary Accent:** \`hsl(222, 47%, 11%)\` (#0f172a - Dark Slate)
- **Secondary Accent:** \`hsl(142, 71%, 45%)\` (#10b981 - Emerald Green)
- **Background:** \`hsl(0, 0%, 98%)\` (#f8fafc - Pearl White)
- **Card Surface:** \`hsl(0, 0%, 100%)\` (#ffffff) dengan Border \`rgba(0, 0, 0, 0.08)\`

## 2. Tipografi & Hirarki Text
- **Font Family:** \`Inter\`, \`Outfit\`, \`system-ui, sans-serif\`
- **Heading 1:** 36px / Bold (800) / Tracking Tight
- **Heading 2:** 24px / Semi-bold (700)
- **Body Text:** 14px / Regular (400) / Line-height 1.6

## 3. Aturan UI/UX & Mikro-Interaksi
- **Buttons:** Berikan efek hover smooth (\`transition: all 0.2s ease\`), feedback status aktif.
- **Card Containers:** Sudut membulat (\`border-radius: 16px\` / \`rounded-2xl\`), bayangan tipis (\`shadow-xs\`).
- **Mobile First & Responsif:** Gunakan CSS Grid/Flexbox dengan break-point standar.
`
  };

  const handleDownload = async (filename: string, content: string) => {
    // 1. Try PyWebView Native File Save Dialog if available in desktop app
    const pywebview = (window as any).pywebview;
    if (pywebview && pywebview.api && pywebview.api.save_file) {
      try {
        const res = await pywebview.api.save_file(filename, content);
        if (res && res.success) {
          return;
        }
      } catch (err) {
        console.error("PyWebView save_file error:", err);
      }
    }

    // 2. Fallback for standard browser mode (Blob download)
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/markdown;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadAll = async () => {
    await handleDownload("PRD.md", TEMPLATES.prd);
    await handleDownload("SDD.md", TEMPLATES.sdd);
    await handleDownload("DESIGN.md", TEMPLATES.design);
  };

  // Token Calculator State
  const [sampleText, setSampleText] = useState<string>(
    "function calculateSum(a: number, b: number): number {\n  return a + b;\n}",
  );
  const [fileLines, setFileLines] = useState<number>(300);

  // Token calculation estimates
  const textLength = sampleText.length;
  const estimatedTextTokens = Math.ceil(textLength / 3.8);
  const estimatedFileTokens = Math.round(fileLines * 6.5);

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Hero Header */}
      <div className="space-y-4 border-b border-gray-200 pb-6">
        <div className="inline-flex items-center rounded-md border border-black/10 bg-white px-3.5 py-1 text-xs font-semibold text-black shadow-xs gap-2">
          <BookOpen className="h-3.5 w-3.5 text-black" />
          <span>Panduan Alur Kerja Vibe Coding</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
          Pengetahuan Dasar Vibe Coder
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
          Langkah terstruktur menyusun berkas blueprint (PRD, SDD, DESIGN), menghitung konsumsi token AI, mengelola agent orchestrator, dan melakukan pengujian otomatis.
        </p>
      </div>

      {/* Step Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200">
        {[
          {
            id: 1,
            title: "Step 1: Dokumentasi",
            icon: FileText,
            label: "PRD, SDD & DESIGN",
          },
          {
            id: 2,
            title: "Step 2: Token AI",
            icon: Cpu,
            label: "Hitung & Efisiensi Token",
          },
          {
            id: 3,
            title: "Step 3: AI Agent",
            icon: Bot,
            label: "Skill & Orchestration",
          },
          {
            id: 4,
            title: "Step 4: Quality & Testing",
            icon: ShieldCheck,
            label: "Audit, Stress & QA Bot",
          },
          {
            id: 5,
            title: "Step 5: Master Workflow",
            icon: CheckCircle2,
            label: "Checklist Workflow",
          },
        ].map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex flex-col items-start p-3 rounded-xl transition-all text-left space-y-1.5 cursor-pointer ${
                isActive
                  ? "bg-white text-black shadow-xs font-semibold"
                  : "text-gray-500 hover:text-black hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                  {step.title}
                </span>
                <Icon
                  className={`h-4 w-4 ${isActive ? "text-black" : "text-gray-400"}`}
                />
              </div>
              <span className="text-xs font-bold line-clamp-1">
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* STEP 1: DOKUMENTASI ESENSIAL */}
      {activeStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Dokumentasi Arsitektur Vibe Coding
                </h2>
                <p className="text-xs text-gray-500">
                  Tiga dokumen acuan utama sebelum meminta AI menulis kode aplikasi.
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Meminta AI langsung menulis kode tanpa dokumen blueprint berisiko menghasilkan struktur data acak dan fitur yang tidak sesuai kebutuhan. Gunakan berkas markdown (
              <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">
                PRD.md
              </code>
              ,{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">
                SDD.md
              </code>
              ,{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">
                DESIGN.md
              </code>
              ) sebagai instruksi acuan utama bagi AI Agent.
            </p>

            {/* Global Download Action Banner */}
            <div className="bg-black text-white p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm border border-gray-800">
              <div className="space-y-0.5 text-center md:text-left">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Template Standar Vibe Coding</span>
                <h4 className="text-sm font-bold text-white">Unduh Blueprint Lengkap (PRD.md, SDD.md, DESIGN.md)</h4>
              </div>
              <button
                onClick={handleDownloadAll}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-black font-bold text-xs px-4 py-2 rounded-lg transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <Download className="h-4 w-4 text-black" />
                <span>Download Bundle (3 File .md)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* PRD.md */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 flex flex-col justify-between hover:border-black transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-black border border-gray-200 flex items-center justify-center font-mono font-bold text-xs">
                      PRD
                    </div>
                    <span className="text-[10px] font-mono bg-gray-100 text-black px-2 py-0.5 rounded border border-gray-200 font-semibold">
                      Standard Template
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-black">PRD.md</h3>
                  <p className="text-xs font-semibold text-black">
                    Product Requirements Document
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Mendefinisikan tujuan produk, latar belakang masalah, target pengguna, dan daftar fitur utama (user stories).
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 text-[11px] font-mono text-gray-700 space-y-1">
                    <div className="text-gray-400"># Focus Areas:</div>
                    <div>- User Goal & Flow</div>
                    <div>- Core Feature Checklist</div>
                    <div>- Non-functional Specs</div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleDownload("PRD.md", TEMPLATES.prd)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-all cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => handleCopy("prd", TEMPLATES.prd)}
                      className="inline-flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-semibold p-2 rounded-lg transition-all cursor-pointer"
                      title="Copy Template Markdown"
                    >
                      {copiedKey === "prd" ? (
                        <Check className="h-3.5 w-3.5 text-black" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* SDD.md */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 flex flex-col justify-between hover:border-black transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-black border border-gray-200 flex items-center justify-center font-mono font-bold text-xs">
                      SDD
                    </div>
                    <span className="text-[10px] font-mono bg-gray-100 text-black px-2 py-0.5 rounded border border-gray-200 font-semibold">
                      Standard Template
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-black">SDD.md</h3>
                  <p className="text-xs font-semibold text-black">
                    System Design Document
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Mendefinisikan aspek teknis sistem, arsitektur basis data, spesifikasi API contract, struktur folder, dan pilihan tech stack.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 text-[11px] font-mono text-gray-700 space-y-1">
                    <div className="text-gray-400"># Focus Areas:</div>
                    <div>- DB Schema & API Contracts</div>
                    <div>- Directory Modular Rules</div>
                    <div>- State & Error Handler</div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleDownload("SDD.md", TEMPLATES.sdd)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-all cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => handleCopy("sdd", TEMPLATES.sdd)}
                      className="inline-flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-semibold p-2 rounded-lg transition-all cursor-pointer"
                      title="Copy Template Markdown"
                    >
                      {copiedKey === "sdd" ? (
                        <Check className="h-3.5 w-3.5 text-black" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* DESIGN.md */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 flex flex-col justify-between hover:border-black transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-black border border-gray-200 flex items-center justify-center font-mono font-bold text-xs">
                      DSG
                    </div>
                    <span className="text-[10px] font-mono bg-gray-100 text-black px-2 py-0.5 rounded border border-gray-200 font-semibold">
                      Standard Template
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-black">DESIGN.md</h3>
                  <p className="text-xs font-semibold text-black">
                    Design System & Guidelines
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Mendefinisikan tampilan dan pengalaman pengguna. Berisi token warna (HSL/HEX), tipografi, spacing, dan aturan responsif layout.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 text-[11px] font-mono text-gray-700 space-y-1">
                    <div className="text-gray-400"># Focus Areas:</div>
                    <div>- Color Tokens & Palette</div>
                    <div>- Typography Hierarchy</div>
                    <div>- Responsive Layout Rules</div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleDownload("DESIGN.md", TEMPLATES.design)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-all cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => handleCopy("design", TEMPLATES.design)}
                      className="inline-flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-semibold p-2 rounded-lg transition-all cursor-pointer"
                      title="Copy Template Markdown"
                    >
                      {copiedKey === "design" ? (
                        <Check className="h-3.5 w-3.5 text-black" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Advice Callout */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-bold text-black">
                  Catatan Penting:
                </span>
                <p className="text-gray-700 leading-relaxed">
                  Selalu instruksikan AI Anda:{" "}
                  <code className="bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded font-mono font-bold text-black">
                    "Baca PRD.md dan SDD.md terlebih dahulu sebelum menulis kode apapun."
                  </code>{" "}
                  Langkah ini mencegah kesalahan struktur data dan inkonsistensi API.
                </p>
              </div>
            </div>

            {/* AI Slop & Kesalahan Pemula Section */}
            <div className="border-t border-gray-100 pt-6 space-y-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-black" />
                <h3 className="text-xl font-bold text-black">
                  Resiko Kode Tanpa Perencanaan & Kesalahan Umum
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Apa itu AI Slop? */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-black font-bold text-sm">
                      <FileWarning className="h-4 w-4 text-black" />
                      <span>Definisi AI Slop dalam Kode</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      <strong>AI Slop</strong> mengacu pada kode yang membengkak, berantakan, dan sulit dirawat karena dihasilkan AI tanpa dokumen perencanaan yang jelas.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200 text-xs text-black space-y-1.5 mt-2">
                    <div className="font-semibold text-black">Penyebab AI Slop:</div>
                    <p className="text-[11px] leading-relaxed text-gray-600">
                      Tanpa dokumen PRD dan SDD, AI menebak struktur data dan menambahkan fungsi yang tidak diperlukan.
                    </p>
                  </div>
                </div>

                {/* 5 Kesalahan Programmer */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-black font-bold text-sm border-b border-gray-200 pb-2">
                    <FileWarning className="h-4 w-4 text-black" />
                    <span>5 Kesalahan Umum Pengkodean Berbasis AI</span>
                  </div>
                  <div className="space-y-2 text-xs text-gray-800">
                    <div className="flex items-start gap-2">
                      <XCircle className="h-3.5 w-3.5 text-black flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>1. Tanpa Blueprint:</strong> Meminta AI membangun aplikasi tanpa PRD dan SDD.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="h-3.5 w-3.5 text-black flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>2. Menyalin Tanpa Verifikasi:</strong> Menerima hasil kode AI tanpa memeriksa alur logika atau log kesalahan.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="h-3.5 w-3.5 text-black flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>3. Prompt Terlalu Luas:</strong> Meminta AI menyelesaikan seluruh modul dalam satu prompt alih-alih membaginya per fungsi.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="h-3.5 w-3.5 text-black flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>4. Konteks Berlebihan:</strong> Memasukkan terlalu banyak berkas ke memori AI sekaligus hingga menurunkan akurasi.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="h-3.5 w-3.5 text-black flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>5. Tanpa Pengujian Otomatis:</strong> Tidak menjalankan perintah build atau pengujian unit secara berkala.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: METRIK TOKEN AI & KALKULATOR */}
      {activeStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Perhitungan Token AI
                </h2>
                <p className="text-xs text-gray-500">
                  Estimasi pemrosesan teks oleh model bahasa dan penghematan kapasitas konteks.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-black flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-black" />
                  Pengertian Token AI
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Token adalah unit teks yang diproses oleh model AI untuk memahami dan menghasilkan kode program:
                </p>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-black flex-shrink-0" />
                    <span>
                      <strong>1 Token</strong> ≈ 3.5 - 4 karakter teks atau kode.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-black flex-shrink-0" />
                    <span>
                      <strong>100 Token</strong> ≈ 75 kata.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-black flex-shrink-0" />
                    <span>
                      <strong>1 Berkas Kode (300 baris)</strong> ≈ 1.800 - 2.500 Token.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Context Window Explanation */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3">
                <h3 className="text-sm font-bold text-black flex items-center gap-2">
                  <Layers className="h-4 w-4 text-black" />
                  Kapasitas Context Window
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Context Window menentukan batas memori aktif AI. Memasukkan berkas besar secara tidak terstruktur dapat mengurangi kecermatan penalaran AI.
                </p>
                <div className="bg-white rounded-lg p-3 border border-gray-200 space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-500">Model AI</span>
                    <span className="font-bold text-black">Batas Konteks</span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-1 border-t">
                    <span>Gemini 1.5 Pro</span>
                    <span className="text-black font-bold">
                      2,000,000 Token
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span>Claude 3.5 Sonnet</span>
                    <span className="text-black font-bold">
                      200,000 Token
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Token Estimator Widget */}
            <div className="bg-gray-900 text-white rounded-2xl p-6 border border-gray-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-gray-300" />
                  <h3 className="text-base font-bold text-white">
                    Kalkulator Token Kode
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-gray-800 text-gray-200 border border-gray-700 px-2 py-0.5 rounded">
                  Estimasi Realtime
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input snippet */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300">
                    Uji Potongan Kode:
                  </label>
                  <textarea
                    value={sampleText}
                    onChange={(e) => setSampleText(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs font-mono text-gray-200 focus:outline-none focus:border-gray-500 transition-all"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Karakter: {textLength}</span>
                    <span className="text-white font-bold">
                      Estimasi: ~{estimatedTextTokens} token
                    </span>
                  </div>
                </div>

                {/* Input File size lines */}
                <div className="space-y-4 bg-gray-950 p-4 rounded-xl border border-gray-800 flex flex-col justify-between">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300">
                      Hitung Ukuran Berkas Kode (Jumlah Baris):
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={2000}
                      step={50}
                      value={fileLines}
                      onChange={(e) => setFileLines(Number(e.target.value))}
                      className="w-full accent-white cursor-pointer"
                    />
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">
                        Ukuran: {fileLines} baris
                      </span>
                      <span className="text-white font-bold">
                        ~{estimatedFileTokens} token
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg text-xs text-gray-300 leading-relaxed">
                    Berkas dengan <strong>{fileLines} baris</strong> menggunakan sekitar <strong>{estimatedFileTokens} token</strong> per instruksi. Bagi berkas jika melebihi 400 baris.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: SKILL SYSTEM & ORCHESTRATOR AGENT */}
      {activeStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Sistem Skill & Agent Orchestrator
                </h2>
                <p className="text-xs text-gray-500">
                  Struktur spesialisasi AI Agent untuk pengerjaan tugas kompleks.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skill Concept */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-black">
                  Pengertian AI Skill
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Skill adalah berkas instruksi khusus (
                  <code className="bg-white border px-1 rounded font-mono font-semibold text-black">
                    SKILL.md
                  </code>
                  ) yang mendefinisikan peran spesialisasi AI beserta aturan kerja yang harus dipatuhi.
                </p>
                <div className="bg-white rounded-xl p-3 border border-gray-200 space-y-2 text-xs">
                  <div className="font-bold text-gray-800">
                    Contoh Skill Terdaftar:
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    <span className="bg-gray-100 text-black px-2 py-0.5 rounded border border-gray-200">
                      antislop-copywriting
                    </span>
                    <span className="bg-gray-100 text-black px-2 py-0.5 rounded border border-gray-200">
                      antislop-ui
                    </span>
                    <span className="bg-gray-100 text-black px-2 py-0.5 rounded border border-gray-200">
                      laravel-expert
                    </span>
                  </div>
                </div>
              </div>

              {/* Orchestrator Concept */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-black">
                  Pengertian Agent Orchestrator
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Agent Orchestrator bertugas menyusun dokumen perencanaan (Planning Mode), membagi tugas menjadi tahapan kecil, dan memanggil sub-agent spesialis sesuai kebutuhan.
                </p>
                <div className="bg-white rounded-xl p-3 border border-gray-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-black">
                    <span>Instruksi User</span>
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                    <span>Orchestrator</span>
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                    <span>Sub-Agents</span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Orchestrator menjaga kesesuaian arsitektur proyek selama proses pengembangan.
                  </p>
                </div>
              </div>
            </div>

            {/* Anti-Hallucination & Planning Technique Section */}
            <div className="border-t border-gray-100 pt-6 space-y-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-black" />
                <h3 className="text-xl font-bold text-black">
                  Aturan Eksekusi AI Anti-Halusinasi
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 4 Pilar Eksekusi Anti-Halusinasi */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3">
                  <h4 className="text-sm font-bold text-black flex items-center gap-2">
                    <Layers className="h-4 w-4 text-black" />
                    4 Aturan Utama Mencegah Halusinasi Kode
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>1. Wajibkan Planning Mode:</strong> Buat dokumen <code className="bg-white px-1 border border-gray-200 rounded font-mono text-[10px] text-black">implementation_plan.md</code> sebelum mengubah kode.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>2. Eksekusi Bertahap:</strong> Perintahkan AI menyelesaikan 1 tugas pada satu waktu lalu minta verifikasi.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>3. Verifikasi Empiris:</strong> Jalankan perintah build atau pengujian (<code className="bg-white px-1 border border-gray-200 rounded font-mono text-[10px] text-black">tsc</code> / <code className="bg-white px-1 border border-gray-200 rounded font-mono text-[10px] text-black">pnpm test</code>) setelah pengeditan.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>4. Tanpa Asumsi Schema:</strong> Periksa definisi variabel dan skema asli di dalam berkas sumber sebelum menulis fungsi pendukung.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Prompt Template Siap Pakai */}
                <div className="bg-gray-900 text-white rounded-xl border border-gray-800 p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="text-xs font-bold text-gray-200">Template Prompt Planning Mode</span>
                    <button
                      onClick={() => handleCopy("prompt-plan", `[PROMPT PLANNING MODE]
Sebelum menulis atau mengedit kode apapun:
1. Baca PRD.md dan SDD.md proyek ini.
2. Inspeksi file yang relevan terlebih dahulu.
3. Buat dokumen implementation_plan.md yang terbagi dalam Fase 1, Fase 2, dst. Setiap fase harus memiliki checklist task atomic.
4. Minta persetujuan saya sebelum mengeksekusi Fase 1.`)}
                      className="text-[11px] font-mono text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "prompt-plan" ? <Check className="h-3 w-3 text-white" /> : <Copy className="h-3 w-3" />}
                      <span>Copy Prompt</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-gray-200 bg-gray-950 p-3 rounded-lg overflow-x-auto leading-relaxed border border-gray-800">
{`"Sebelum menulis kode:
1. Baca PRD.md & SDD.md.
2. Buat implementation_plan.md per fase & per task.
3. Kerjakan Task 1.1 terlebih dahulu.
4. Jalankan 'npx tsc' untuk memverifikasi.
5. Tunggu konfirmasi sebelum lanjut ke Task 1.2."`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Integration of Anti-Slop AI Skills & Manual Installation Guide */}
            <div className="border-t border-gray-200 pt-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-black text-white p-5 rounded-2xl">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-gray-800 text-gray-200 px-2.5 py-0.5 rounded border border-gray-700">
                    <ShieldCheck className="h-3.5 w-3.5 text-white" />
                    <span>Skill Integration</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Anti-Slop AI Rules & Skills
                  </h3>
                  <p className="text-xs text-gray-300">
                    Karya <strong className="text-white">Miqdad Badjuber</strong> — Repositori Resmi:{" "}
                    <a
                      href="https://github.com/miqdadbadjuber/anti-slop"
                      target="_blank"
                      rel="noreferrer"
                      className="underline font-mono text-white hover:text-gray-300"
                    >
                      github.com/miqdadbadjuber/anti-slop
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="bg-gray-800 border border-gray-700 px-3 py-1 rounded-lg text-gray-200">
                    antislop-copywriting
                  </span>
                  <span className="bg-gray-800 border border-gray-700 px-3 py-1 rounded-lg text-gray-200">
                    antislop-ui
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual Anti-Slop Overview */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3">
                  <h4 className="text-sm font-bold text-black flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-black" />
                    Prinsip Utama Anti-Slop AI
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-black min-w-[100px]">1. Tanpa Buzzword:</span>
                      <span>Hindari istilah klise ("unlock", "elevate", "cutting-edge", "seamless", "next-level").</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-black min-w-[100px]">2. Kalimat Lugas:</span>
                      <span>Gunakan kalimat langsung tanpa frasa tambahan yang tidak informatif.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-black min-w-[100px]">3. Antarmuka Bersih:</span>
                      <span>Tanpa gradien berlebih, efek glow neon, atau pola pill-shape seragam.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-black min-w-[100px]">4. Kontras Tinggi:</span>
                      <span>Gunakan skema warna hitam-putih shadcn UI dengan garis batas yang jelas.</span>
                    </li>
                  </ul>
                </div>

                {/* Manual Installation Guide */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <h4 className="text-sm font-bold text-black">
                      Panduan Instalasi Manual Skill
                    </h4>
                    <span className="text-[10px] font-mono bg-gray-100 text-black px-2 py-0.5 rounded border border-gray-200 font-bold">
                      CLI & IDE Guide
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-black">A. Antigravity IDE / AGY CLI (Global):</span>
                      <div className="bg-gray-900 text-white rounded-lg p-2.5 font-mono text-[11px] flex justify-between items-center">
                        <code className="text-gray-200">cp -r skill/* ~/.gemini/config/skills/</code>
                        <button
                          onClick={() => handleCopy("install-global", "mkdir -p ~/.gemini/config/skills && cp -r skill/* ~/.gemini/config/skills/")}
                          className="p-1 hover:bg-gray-800 rounded text-gray-300 cursor-pointer"
                          title="Copy command"
                        >
                          {copiedKey === "install-global" ? <Check className="h-3.5 w-3.5 text-white" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-black">B. Workspace Antigravity (.agents):</span>
                      <div className="bg-gray-900 text-white rounded-lg p-2.5 font-mono text-[11px] flex justify-between items-center">
                        <code className="text-gray-200">cp -r skill/* .agents/skills/</code>
                        <button
                          onClick={() => handleCopy("install-workspace", "mkdir -p .agents/skills && cp -r skill/* .agents/skills/")}
                          className="p-1 hover:bg-gray-800 rounded text-gray-300 cursor-pointer"
                          title="Copy command"
                        >
                          {copiedKey === "install-workspace" ? <Check className="h-3.5 w-3.5 text-white" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1 border-t border-gray-100">
                      <span className="font-bold text-black">C. Repositori GitHub Original:</span>
                      <div className="bg-gray-900 text-white rounded-lg p-2.5 font-mono text-[11px] flex justify-between items-center">
                        <code className="text-gray-200">git clone https://github.com/miqdadbadjuber/anti-slop.git</code>
                        <button
                          onClick={() => handleCopy("install-git", "git clone https://github.com/miqdadbadjuber/anti-slop.git")}
                          className="p-1 hover:bg-gray-800 rounded text-gray-300 cursor-pointer"
                          title="Copy command"
                        >
                          {copiedKey === "install-git" ? <Check className="h-3.5 w-3.5 text-white" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: QUALITY, SECURITY & TESTING BOT */}
      {activeStep === 4 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Pengujian Kualitas & Keamanan
                </h2>
                <p className="text-xs text-gray-500">
                  Prosedur pengujian mutu sebelum merilis aplikasi ke produksi.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Security Audit */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 text-black flex items-center justify-center">
                  <Lock className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-black">
                  1. Security Audit
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Pemeriksaan celah keamanan berdasarkan standar OWASP untuk mencegah SQL Injection, XSS, dan kebocoran kredensial.
                </p>
              </div>

              {/* Stress Test */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 text-black flex items-center justify-center">
                  <Gauge className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-black">
                  2. Stress Test
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Pengujian beban server untuk mengukur latensi (ms), throughput (RPS), dan pemakaian memori saat diakses secara bersamaan.
                </p>
              </div>

              {/* Browser QA Agent */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 text-black flex items-center justify-center">
                  <Globe className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-black">
                  3. Automated QA Browser Bot
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Pengujian antarmuka menggunakan subagent browser untuk memverifikasi fungsionalitas elemen dan merekam alur penggunaan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: MASTER WORKFLOW */}
      {activeStep === 5 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">
                5
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Checklist Alur Kerja Vibe Coding
                </h2>
                <p className="text-xs text-gray-500">
                  Tahapan pelaksanaan dari tahap perencanaan hingga produksi.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  step: "Fase 1: Dokumen Blueprint",
                  desc: "Susun PRD.md, SDD.md, dan DESIGN.md pada direktori proyek.",
                },
                {
                  step: "Fase 2: Planning Mode",
                  desc: "Instruksikan AI Orchestrator membuat implementation_plan.md sebelum mengubah kode.",
                },
                {
                  step: "Fase 3: Eksekusi Modular",
                  desc: "Jaga ukuran berkas kode (< 300 baris) agar pemrosesan token tetap efisien.",
                },
                {
                  step: "Fase 4: Verifikasi & QA",
                  desc: "Jalankan pengujian build dan tes otomatis untuk memverifikasi fungsi antarmuka.",
                },
                {
                  step: "Fase 5: Audit & Build Produksi",
                  desc: "Lakukan pemeriksaan keamanan dan pengujian beban sebelum mengompilasi aplikasi.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-white hover:border-black/30 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-black">
                      {item.step}
                    </h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
