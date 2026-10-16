import { useState } from "react";
import {
  PenTool,
  Sparkles,
  Layout,
  CheckCircle2,
  MousePointerClick,
  Eye,
  Workflow,
} from "lucide-react";
import DesignGenerator from "../../components/DesignGenerator";
import ToolsGuide from "../../components/ToolsGuide";

export default function UiUxGuide() {
  const [activeTab, setActiveTab] = useState<"workflow" | "tools" | "generator" | "checklist">("workflow");

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Hero Header */}
      <div className="space-y-4 border-b border-gray-200 pb-6">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
          UI/UX Strategy & Design Workflow
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
          Alur kerja UI/UX sebelum menulis kode: riset pengguna, wireframe Lo-Fi, Figma atau Google Stitch, sampai DESIGN.md dan prompt siap pakai untuk AI agent.
        </p>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "workflow", label: "1. Alur Pre-Design (Wireframe dll)", icon: Workflow },
          { id: "tools", label: "2. Perkakas Figma & Google Stitch", icon: PenTool },
          { id: "generator", label: "3. Generator DESIGN.md & Prompt", icon: Layout },
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
                  desc: "Identifikasi siapa pengguna utama, apa masalah terbesar mereka (pain points), dan tujuan yang ingin dicapai.",
                },
                {
                  step: "02",
                  title: "User Flow & IA",
                  desc: "Petakan Information Architecture (IA) serta alur perjalanan pengguna (step-by-step user journey) dari Halaman Utama ke Goal.",
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

      {/* TAB 2: FIGMA & GOOGLE STITCH */}
      {(activeTab === "tools") && (
        <div className="animate-in fade-in duration-300">
          <ToolsGuide />
        </div>
      )}

      {/* TAB 3: GENERATOR DESIGN.md & PROMPT */}
      {(activeTab === "generator") && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">Generator DESIGN.md & Prompt Desain</h2>
                <p className="text-xs text-gray-500">
                  Isi brief sekali. Hasilnya DESIGN.md siap simpan dan lima prompt (wireframe, user flow, UI Hi-Fi, komponen, review) untuk Figma, Stitch, atau AI agent. Isian tersimpan otomatis.
                </p>
              </div>
            </div>
            <DesignGenerator />
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
