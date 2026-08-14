import { useState } from "react";
import {
  Palette,
  PenTool,
  Sparkles,
  Layout,
  CheckCircle2,
  Zap,
  MousePointerClick,
  Copy,
  Check,
  Eye,
  Workflow,
  Wand2,
  FileCode2,
} from "lucide-react";

export default function UiUxGuide() {
  const [activeTab, setActiveTab] = useState<"workflow" | "tools" | "wireframe" | "checklist">("workflow");
  const [wireframeView, setWireframeView] = useState<"lofi" | "hifi">("lofi");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Hero Header */}
      <div className="space-y-4 border-b border-gray-200 pb-6">
        <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-3.5 py-1 text-xs font-semibold text-black shadow-xs gap-2">
          <Palette className="h-3.5 w-3.5 text-black" />
          <span>Panduan Perancangan Antarmuka & UX</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
          UI/UX Strategy & Design Workflow
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
          Panduan komprehensif alur kerja UI/UX sebelum penulisan kode — dari riset pengguna, wireframing (Lo-Fi), penggunaan **Figma** & **Google Stitch**, hingga konversi ke **Design System** produksi (Hi-Fi).
        </p>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "workflow", label: "1. Alur Pre-Design (Wireframe dll)", icon: Workflow },
          { id: "tools", label: "2. Perkakas Figma & Google Stitch", icon: PenTool },
          { id: "wireframe", label: "3. Simulasi Lo-Fi vs Hi-Fi Code", icon: Layout },
          { id: "checklist", label: "4. Aturan Emas UI/UX", icon: CheckCircle2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

      {/* TAB 1: ALUR PRE-DESIGN WORKFLOW */}
      {(activeTab === "workflow") && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Tahapan Wajib Sebelum Membuat UI/UX (Pre-Design)
                </h2>
                <p className="text-xs text-gray-500">
                  Langkah sistematis agar tampilan antarmuka memiliki alur intuitif dan bebas dari bongkar-pasang kode di tengah jalan.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: "01",
                  title: "User Research & Persona",
                  desc: "Identifikasi siapa pengguna utama, apa masalah terbesar mereka (*pain points*), dan tujuan yang ingin dicapai.",
                },
                {
                  step: "02",
                  title: "User Flow & IA",
                  desc: "Petakan Information Architecture (IA) serta alur perjalanan pengguna (*step-by-step user journey*) dari Halaman Utama ke Goal.",
                },
                {
                  step: "03",
                  title: "Lo-Fi Wireframing",
                  desc: "Buat sketsa kasar hitam-putih di kertas/Figma tanpa warna atau fon mewah untuk merancang posisi tata letak komponen.",
                },
                {
                  step: "04",
                  title: "Design System & Tokens",
                  desc: "Tentukan aturan warna (HEX/HSL monokrom), skala tipografi (Inter/Outfit), spacing grid 8pt, dan sudut komponen.",
                },
                {
                  step: "05",
                  title: "Hi-Fi Prototype",
                  desc: "Gabungkan Wireframe dengan Design System dan mikro-interaksi sebelum diserahkan ke AI Agent / Developer.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col justify-between space-y-3 hover:border-black transition-all"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold bg-black text-white px-2 py-0.5 rounded">
                      Fase {item.step}
                    </span>
                    <h3 className="text-sm font-bold text-black">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Deep-Dive Card: Mengapa Wireframe Lo-Fi Sangat Penting? */}
            <div className="bg-gray-900 text-white rounded-2xl p-6 border border-gray-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                <Sparkles className="h-5 w-5 text-gray-300" />
                <h3 className="text-base font-bold text-white">
                  Mengapa Wireframing (Lo-Fi) Harus Didahulukan?
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-2">
                  <div className="font-bold text-white text-sm">1. Memangkas Biaya Revisi 90%</div>
                  <p className="text-gray-400 leading-relaxed">
                    Mengubah posisi layout pada sketsa wireframe hanya membutuhkan hitungan detik, dibanding merombak ratusan baris kode React / CSS.
                  </p>
                </div>
                <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-2">
                  <div className="font-bold text-white text-sm">2. Fokus Pada Alur & Usability</div>
                  <p className="text-gray-400 leading-relaxed">
                    Tanpa gangguan warna atau gambar dekoratif, Anda dan tim dapat berfokus murni pada kemudahan navigasi pengguna.
                  </p>
                </div>
                <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-2">
                  <div className="font-bold text-white text-sm">3. Bahan Prompting AI Terbaik</div>
                  <p className="text-gray-400 leading-relaxed">
                    Gambar wireframe Lo-Fi dapat diunggah langsung ke AI (Antigravity / Gemini / Claude) untuk menghasilkan komponen UI presisi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PERKAKAS FIGMA & GOOGLE STITCH */}
      {(activeTab === "tools") && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Panduan Perkakas UI/UX Modern (Figma & Google Stitch)
                </h2>
                <p className="text-xs text-gray-500">
                  Perpaduan antara software desain vektor standar industri dan AI layout generator untuk mempercepat alur kerja.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FIGMA TOOL GUIDE */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
                        <PenTool className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-black">Figma</h3>
                        <p className="text-[11px] text-gray-500">Industry Standard UI/UX Tool</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-gray-100 text-black px-2 py-0.5 rounded border border-gray-200 font-bold">
                      Vector & Prototype
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    Figma adalah perkakas berbasis cloud utama untuk membuat Wireframe, Design System, Auto-Layout reaktif, dan Interactive Prototype.
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-700">
                    <div className="font-bold text-black">Fitur & Teknik Wajib di Figma:</div>
                    <ul className="space-y-1.5 font-mono text-[11px] text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                        <span><strong>Auto-Layout (Shift + A):</strong> Membuat kontainer otomatis seperti Flexbox di CSS.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                        <span><strong>Component & Variants:</strong> Mengelompokkan state tombol (Default, Hover, Active, Disabled).</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                        <span><strong>Design Variables:</strong> Menyimpan token warna HEX/HSL dan skala font.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs text-gray-700 space-y-1">
                  <div className="font-bold text-black">Output ke Vibe Coding:</div>
                  <p className="text-[11px] text-gray-500">
                    Salin spesifikasi inspect CSS Figma atau dokumentasikan dalam berkas <code className="bg-white border px-1 rounded font-mono">DESIGN.md</code>.
                  </p>
                </div>
              </div>

              {/* GOOGLE STITCH & AI DESIGN TOOLS */}
              <div className="bg-black text-white rounded-2xl border border-gray-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-gray-800 text-white flex items-center justify-center border border-gray-700">
                        <Wand2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Google Stitch & AI Layout</h3>
                        <p className="text-[11px] text-gray-400">AI-Powered UI Generator</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-gray-800 text-gray-200 border border-gray-700 px-2 py-0.5 rounded font-bold">
                      Wireframe-to-Code AI
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    Google Stitch dan AI Layout Generator mengubah sketsa Wireframe kasar (atau deskripsi prompt) secara instan menjadi tata letak UI siap pakai.
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gray-800 text-xs text-gray-300">
                    <div className="font-bold text-white">Alur Kerja dengan AI Stitch:</div>
                    <ul className="space-y-1.5 font-mono text-[11px] text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-white flex-shrink-0" />
                        <span><strong>1. Upload Wireframe:</strong> Masukkan gambar sketsa tangan / Figma Lo-Fi.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-white flex-shrink-0" />
                        <span><strong>2. Generasi Layout:</strong> AI Stitch menghasilkan struktur komponen HTML/Tailwind.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-white flex-shrink-0" />
                        <span><strong>3. Feed to Agent:</strong> Berikan output ke Antigravity / Agent untuk dijadikan React code.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-950 p-3 rounded-xl border border-gray-800 text-xs text-gray-300 space-y-1">
                  <div className="font-bold text-white">Keunggulan Vibe Coding:</div>
                  <p className="text-[11px] text-gray-400">
                    Memotong waktu pembuatan komponen dari jam menjadi hitungan detik tanpa mengorbankan kualitas arsitektur.
                  </p>
                </div>
              </div>
            </div>

            {/* Alternatif Tool UI/UX Lainnya */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-black flex items-center gap-2">
                <FileCode2 className="h-4 w-4 text-black" />
                Perkakas Pendukung UI/UX Lainnya
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1.5">
                  <div className="font-bold text-black">Excalidraw</div>
                  <p className="text-gray-600 leading-relaxed">
                    Papan tulis digital tanpa batas untuk membuat diagram alur (*User Flow*) dan wireframe sketsa tangan super cepat.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1.5">
                  <div className="font-bold text-black">Penpot</div>
                  <p className="text-gray-600 leading-relaxed">
                    Alternatif Figma serba open-source berbasis standar web native (SVG & Flexbox) tanpa ketergantungan lisensi.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1.5">
                  <div className="font-bold text-black">Framer / V0</div>
                  <p className="text-gray-600 leading-relaxed">
                    Perkakas publikasi web langsung dan UI prompt generator untuk prototipe interaktif tingkat tinggi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SIMULASI WIREFRAME (LO-FI VS HI-FI) */}
      {(activeTab === "wireframe") && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">
                    Simulasi Konversi: Lo-Fi Wireframe → Hi-Fi Code
                  </h2>
                  <p className="text-xs text-gray-500">
                    Bandingkan bagaimana sketsa kasar (Lo-Fi) diubah menjadi komponen produksi (Hi-Fi) yang bersih.
                  </p>
                </div>
              </div>

              {/* View Switcher Pills */}
              <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                <button
                  onClick={() => setWireframeView("lofi")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    wireframeView === "lofi"
                      ? "bg-black text-white shadow-xs"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  Lo-Fi Wireframe
                </button>
                <button
                  onClick={() => setWireframeView("hifi")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    wireframeView === "hifi"
                      ? "bg-black text-white shadow-xs"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  Hi-Fi Production UI
                </button>
              </div>
            </div>

            {/* Simulated Canvas */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 space-y-6">
              {wireframeView === "lofi" ? (
                /* LO-FI WIREFRAME VIEW */
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-gray-200 text-black px-2 py-0.5 rounded font-bold">
                      Tampilan Sketsa Lo-Fi (Tanpa Warna & Font Dekoratif)
                    </span>
                  </div>

                  <div className="bg-white border-2 border-dashed border-gray-400 p-6 rounded-xl space-y-4 font-mono text-xs">
                    {/* Header Wireframe */}
                    <div className="border-b border-dashed border-gray-300 pb-3 flex justify-between items-center">
                      <div className="w-20 h-4 bg-gray-300 rounded"></div>
                      <div className="flex gap-2">
                        <div className="w-12 h-3 bg-gray-200 rounded"></div>
                        <div className="w-12 h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>

                    {/* Hero Section Wireframe */}
                    <div className="space-y-3 py-4 text-center flex flex-col items-center">
                      <div className="w-48 h-6 bg-gray-300 rounded"></div>
                      <div className="w-64 h-3 bg-gray-200 rounded"></div>
                      <div className="w-24 h-8 bg-gray-800 rounded mt-2"></div>
                    </div>

                    {/* Feature Cards Wireframe */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="border border-dashed border-gray-300 p-3 rounded space-y-2">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <div className="w-20 h-3 bg-gray-300 rounded"></div>
                        <div className="w-full h-2 bg-gray-200 rounded"></div>
                      </div>
                      <div className="border border-dashed border-gray-300 p-3 rounded space-y-2">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <div className="w-20 h-3 bg-gray-300 rounded"></div>
                        <div className="w-full h-2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* HI-FI PRODUCTION UI VIEW */
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded font-bold">
                      Tampilan Hi-Fi Production (Monochrome Minimalist UI)
                    </span>
                  </div>

                  <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-6 shadow-sm">
                    {/* Header Hi-Fi */}
                    <div className="border-b border-gray-100 pb-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
                          V
                        </div>
                        <span className="font-bold text-sm text-black">VibeCoder</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
                        <span className="hover:text-black cursor-pointer">Fitur</span>
                        <span className="hover:text-black cursor-pointer">Dokumentasi</span>
                      </div>
                    </div>

                    {/* Hero Section Hi-Fi */}
                    <div className="space-y-3 text-center py-2 flex flex-col items-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-[11px] font-semibold text-black">
                        <Sparkles className="h-3 w-3 text-black" />
                        <span>v2.0 Clean Edition</span>
                      </div>
                      <h3 className="text-2xl font-black text-black">Build Fast With Confidence</h3>
                      <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                        Arsitektur antarmuka monokrom paling bersih untuk efisiensi eksekusi Vibe Coding.
                      </p>
                      <button className="bg-black hover:bg-gray-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95">
                        Mulai Sekarang →
                      </button>
                    </div>

                    {/* Feature Cards Hi-Fi */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="border border-gray-200 p-4 rounded-xl space-y-2 bg-gray-50/50 hover:border-black transition-all">
                        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                          <Zap className="h-4 w-4" />
                        </div>
                        <div className="font-bold text-xs text-black">Performa Kilat</div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">Optimasi bundle tanpa beban framework berlebih.</p>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-xl space-y-2 bg-gray-50/50 hover:border-black transition-all">
                        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                          <MousePointerClick className="h-4 w-4" />
                        </div>
                        <div className="font-bold text-xs text-black">Mikro-Interaksi</div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">Umpan balik visual reaktif pada setiap interaksi tombol.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Code Snippet Generator for UI */}
            <div className="bg-gray-900 text-white rounded-xl border border-gray-800 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="text-xs font-bold text-gray-200">Prompt AI: Minta AI Mengonversi Lo-Fi Wireframe ke Code</span>
                <button
                  onClick={() => handleCopy("prompt-ui", `[PROMPT CONVERT WIREFRAME TO CODE]
Tolong konversikan struktur Wireframe berikut menjadi komponen React + Tailwind CSS dengan aturan:
1. Skema Warna: Strict monochrome (Hitam #000, Putih #FFF, Gray-50/100/200/800/900).
2. Gunakan Lucide React Icons (tanpa emoji).
3. Terapkan spacing grid 8pt (p-4, p-6, gap-4, rounded-xl/2xl).
4. Pastikan memiliki hover effect (transition-all, active:scale-95).`)}
                  className="text-[11px] font-mono text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === "prompt-ui" ? <Check className="h-3 w-3 text-white" /> : <Copy className="h-3 w-3" />}
                  <span>Copy Prompt</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-gray-200 bg-gray-950 p-3 rounded-lg overflow-x-auto leading-relaxed border border-gray-800">
{`"Konversikan Wireframe ini menjadi komponen React + Tailwind CSS:
- Gunakan gaya monokrom minimalis (Hitam & Putih).
- Pasang Lucide Icons & mikro-interaksi hover.
- Sertakan feedback state (Hover, Active, Loading, Disabled)."`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CHECKLIST ATURAN EMAS UI/UX */}
      {(activeTab === "checklist") && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Checklist Aturan Emas UI/UX Vibe Coding
                </h2>
                <p className="text-xs text-gray-500">
                  Prinsip perancangan antarmuka yang wajib dipatuhi agar aplikasi terasa profesional dan instingtif.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <Eye className="h-4 w-4 text-black" />
                  1. Visual Hierarchy & Spacing Grid
                </h3>
                <div className="space-y-2 text-xs text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
                    <span><strong>Skala Tipografi Jelas:</strong> Gunakan kontras tebal (Font Black/Bold 800) untuk Heading dan ukuran 14px regular untuk body.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
                    <span><strong>8pt Grid System:</strong> Terapkan spacing kelipatan 8px (`p-2`, `p-4`, `p-6`, `gap-4`) untuk konsistensi di seluruh halaman.</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <MousePointerClick className="h-4 w-4 text-black" />
                  2. Feedback State Complete
                </h3>
                <div className="space-y-2 text-xs text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
                    <span><strong>5 Mandatory States:</strong> Setiap elemen interaktif wajib memiliki state Default, Hover, Active, Loading, dan Disabled.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
                    <span><strong>Mikro-Interaksi Smooth:</strong> Terapkan `transition-all duration-200` agar pergerakan hover terasa alami dan tidak kaku.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
