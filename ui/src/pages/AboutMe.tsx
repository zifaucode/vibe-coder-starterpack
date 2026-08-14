import { Button } from "@/components/ui/button";
import {
  User,
  Heart,
  Sparkles,
  ExternalLink,
  Star,
  BookOpen,
  Terminal,
  Layers,
  Rocket,
  Bot,
  Cpu,
  Workflow,
  Zap,
} from "lucide-react";
import vcsLogo from "../assets/vcs-logo.png";

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function AboutMe() {
  const GITHUB_REPO_URL = "https://github.com/zifaucode/vibe-coder-starterpack";

  const openGithub = () => {
    window.open(GITHUB_REPO_URL, "_blank");
  };

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-10 space-y-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={vcsLogo}
              alt="VCS Logo"
              className="w-20 h-20 rounded-2xl object-cover border border-black shadow-md flex-shrink-0"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center rounded-full border border-black/10 bg-gray-100 px-3 py-0.5 text-xs font-semibold text-black gap-1.5">
                <Sparkles className="h-3 w-3 text-black" />
                <span>Created by zifaucode</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-black">
                Vibe Coder Starterpack
              </h1>
              <p className="text-xs md:text-sm text-gray-500 font-mono">
                Ekosistem & Dokumentasi AI-Assisted Development
              </p>
            </div>
          </div>

          <Button
            onClick={openGithub}
            className="bg-black hover:bg-gray-800 text-white font-bold text-xs px-5 py-3 rounded-xl gap-2 shadow-md cursor-pointer transition-all active:scale-95 border border-gray-800"
          >
            <GithubIcon className="h-4 w-4 fill-white" />
            <span>Kunjungi GitHub Repo</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </Button>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-5">
          <strong>Vibe Coder Starterpack (VCS)</strong> dikembangkan oleh <strong>zifaucode</strong> untuk mendukung alur kerja <em>Vibe Coding</em> dan <em>AI-Assisted Development</em>. VCS menyediakan blueprint dokumen arsitektur (PRD, SDD, DESIGN) untuk AI Agents, kalkulator efisiensi token prompt, panduan pemilihan tech stack, strategi deployment, serta perkakas developer dalam satu aplikasi desktop.
        </p>
      </div>

      {/* Author & Repository Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Author Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">Tentang Pembuat</h3>
                  <p className="text-xs text-gray-500 font-mono">@zifaucode</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-gray-100 text-black px-2 py-0.5 rounded border border-gray-200 font-bold">
                Creator & Maintainer
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              <strong>zifaucode</strong> berfokus pada alur kerja AI Agent, penyusunan arsitektur sistem, efisiensi prompt engineering, serta pembuatan antarmuka pengguna yang bersih, efisien, dan fungsional.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-mono">GitHub Profile</span>
            <a
              href="https://github.com/zifaucode"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-black underline flex items-center gap-1 hover:text-gray-700"
            >
              github.com/zifaucode
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Repository Details Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 text-black border border-gray-200 flex items-center justify-center font-bold">
                  <GithubIcon className="h-5 w-5 fill-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">Repository GitHub</h3>
                  <p className="text-xs text-gray-500 font-mono">Open Source Starterpack</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 rounded font-bold">
                MIT License
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                <span className="font-semibold text-black">Repository URL</span>
                <span className="font-mono text-[11px] text-gray-500 truncate max-w-[200px]">
                  zifaucode/vibe-coder-starterpack
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                <span className="font-semibold text-black">Lisensi Proyek</span>
                <span className="font-mono text-[11px] text-black font-bold">MIT Open Source</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-mono">Kontribusi & Star</span>
            <Button
              onClick={openGithub}
              variant="outline"
              size="sm"
              className="text-xs font-bold border-black text-black gap-1.5 cursor-pointer"
            >
              <Star className="h-3.5 w-3.5 fill-black" />
              <span>Give Star</span>
            </Button>
          </div>
        </div>
      </div>

      {/* AI & Vibe Coding Terminology Grid */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6 shadow-xs">
        <div className="space-y-1 border-b border-gray-100 pb-3">
          <h2 className="text-xl font-bold text-black flex items-center gap-2">
            <Bot className="h-5 w-5 text-black" />
            <span>Konsep Utama Vibe Coding & AI Agent</span>
          </h2>
          <p className="text-xs text-gray-500">
            Istilah dasar yang melandasi metode pengkodean berbasis kecerdasan buatan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <Cpu className="h-5 w-5 text-black" />
            <h3 className="text-xs font-bold text-black">AI Agent & LLM</h3>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Model bahasa besar yang berfungsi sebagai asisten pengkodean otonom untuk mengeksekusi instruksi developer.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <Workflow className="h-5 w-5 text-black" />
            <h3 className="text-xs font-bold text-black">Context Window</h3>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Batas kapasitas memori prompt AI. Dokumen PRD & SDD digunakan agar konteks kode tetap fokus dan terarah.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <Zap className="h-5 w-5 text-black" />
            <h3 className="text-xs font-bold text-black">Prompt Engineering</h3>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Teknik penyusunan instruksi yang terstruktur dan rinci agar AI Agent dapat menghasilkan kode yang valid.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <Bot className="h-5 w-5 text-black" />
            <h3 className="text-xs font-bold text-black">Human-AI Pairing</h3>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Pola kolaborasi di mana manusia bertindak sebagai pengarah arsitektur dan AI Agent sebagai pelaksana eksekusi.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Pillar Summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6 shadow-xs">
        <div className="space-y-1 border-b border-gray-100 pb-3">
          <h2 className="text-xl font-bold text-black">Pilar Fitur Vibe Coder Starterpack</h2>
          <p className="text-xs text-gray-500">
            Fasilitas utama yang disediakan dalam ekosistem VCS untuk pengembang software.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <BookOpen className="h-5 w-5 text-black" />
            <h3 className="text-xs font-bold text-black">Blueprint Document</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Standardized PRD.md, SDD.md & DESIGN.md template for AI Agents.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <Layers className="h-5 w-5 text-black" />
            <h3 className="text-xs font-bold text-black">Tech Stack Guide</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              SQL, NoSQL, Supabase, Next.js, FastAPI & Laravel architecture.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <Rocket className="h-5 w-5 text-black" />
            <h3 className="text-xs font-bold text-black">Deploy Strategy</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Beginner to Expert deployment from Vercel to VPS & Docker.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <Terminal className="h-5 w-5 text-black" />
            <h3 className="text-xs font-bold text-black">Developer Tools</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              JSON Formatter, Regex Tester, Base64 & Command Palette Ctrl+K.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-black text-white rounded-2xl p-6 border border-gray-800 text-center space-y-3 shadow-xl">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-gray-400">
          <span>Made with</span>
          <Heart className="h-3.5 w-3.5 text-white fill-white" />
          <span>by zifaucode for Vibe Coding Community</span>
        </div>
        <div className="text-sm font-bold text-white">
          Vibe Coder Starterpack • Open Source AI Ecosystem
        </div>
      </div>
    </div>
  );
}
