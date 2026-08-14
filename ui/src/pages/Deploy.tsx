import { useState } from "react";
import {
  Rocket,
  Globe,
  Server,
  Container,
  CheckCircle2,
  Zap,
  Copy,
  Check,
  GitBranch,
  Cloud,
} from "lucide-react";

export default function Deploy() {
  const [activeLevel, setActiveLevel] = useState<"all" | "beginner" | "intermediate" | "expert">("all");
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
          <Rocket className="h-3.5 w-3.5 text-black" />
          <span>Panduan Rilis Aplikasi Ke Produksi</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
          Production & Deploy Strategy
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
          Panduan langkah-demi-langkah mendepoloy aplikasi dari tingkat **Beginner** (Vercel, GitHub Pages) hingga **Expert** (VPS Linux, Docker, & CI/CD Pipeline).
        </p>
      </div>

      {/* Level Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "Semua Tingkat Deploy", icon: Rocket },
          { id: "beginner", label: "Beginner (Vercel / GitHub Pages)", icon: Globe },
          { id: "intermediate", label: "Intermediate (Railway / Fly.io)", icon: Cloud },
          { id: "expert", label: "Expert (VPS / Docker / CI/CD)", icon: Server },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeLevel === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveLevel(tab.id as any)}
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

      {/* 1. BEGINNER LEVEL */}
      {(activeLevel === "all" || activeLevel === "beginner") && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="text-2xl font-bold text-black">Tingkat 1: Beginner (Zero-Config Serverless)</h2>
            </div>
            <span className="text-xs font-mono font-bold bg-gray-100 text-black px-3 py-1 rounded-full border border-gray-200">
              Rekomendasi Pemula & Vibe Coding
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vercel */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-black" />
                    <h3 className="text-lg font-bold text-black">Vercel</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 rounded font-bold">
                    One-Click Deploy
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Platform penyedia hosting serverless terbaik untuk React, Next.js, dan Vite. Terhubung langsung ke repositori GitHub dengan pemicu deployment otomatis saat commit (`git push`).
                </p>
                <div className="space-y-1.5 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <div className="font-bold text-black">Fitur Utama:</div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black" />
                    <span>SSL HTTPS Gratis & Domain `.vercel.app` otomatis</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black" />
                    <span>Preview Deployment URL untuk setiap pull request</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t text-xs font-mono text-gray-500">
                Cara Pakai: Hubungkan akun GitHub di vercel.com &gt; Select Repositori &gt; Klik Deploy.
              </div>
            </div>

            {/* GitHub Pages */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-black" />
                    <h3 className="text-lg font-bold text-black">GitHub Pages</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-gray-100 text-black px-2 py-0.5 rounded font-bold border border-gray-200">
                    100% Free Static Hosting
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Layanan hosting langsung dari GitHub untuk situs statis (HTML/CSS/JS) atau Single Page Application (Vite SPA) tanpa biaya sepeser pun.
                </p>
                <div className="space-y-1.5 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <div className="font-bold text-black">Fitur Utama:</div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black" />
                    <span>Gratis selamanya dengan domain `username.github.io/repo`</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black" />
                    <span>Integrasi penuh dengan GitHub Actions</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t text-xs font-mono text-gray-500">
                Cara Pakai: Repo Settings &gt; Pages &gt; Build and deployment Source &gt; GitHub Actions / Main Branch.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. INTERMEDIATE LEVEL */}
      {(activeLevel === "all" || activeLevel === "intermediate") && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h2 className="text-2xl font-bold text-black">Tingkat 2: Intermediate (Containerized Cloud PaaS)</h2>
            </div>
            <span className="text-xs font-mono font-bold bg-gray-100 text-black px-3 py-1 rounded-full border border-gray-200">
              Fullstack & Backend Service
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Railway / Fly.io */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-black">Railway & Fly.io</h3>
                  <span className="text-[10px] font-mono bg-gray-100 text-black px-2 py-0.5 rounded font-bold border border-gray-200">
                    Fullstack Container
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Mendukung deployment backend kompleks (Node.js, Express, Python FastAPI, Laravel) beserta database PostgreSQL & Redis hanya dengan menyertakan `Dockerfile`.
                </p>
              </div>

              <div className="bg-gray-950 text-white p-3 rounded-xl font-mono text-[11px] space-y-1 border border-gray-800">
                <div className="text-gray-400"># Contoh Dockerfile Ringkas:</div>
                <div className="text-gray-200">FROM node:20-alpine</div>
                <div className="text-gray-200">WORKDIR /app</div>
                <div className="text-gray-200">COPY package*.json ./ && RUN npm install</div>
                <div className="text-gray-200">CMD ["npm", "start"]</div>
              </div>
            </div>

            {/* Render / Netlify */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-black">Render & Netlify</h3>
                  <span className="text-[10px] font-mono bg-gray-100 text-black px-2 py-0.5 rounded font-bold border border-gray-200">
                    Managed Cloud Services
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Pilihan pengganti Heroku yang menggratiskan web service backend & database managed PostgreSQL selama uji coba prototyping aplikasi.
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs text-gray-600 leading-relaxed">
                Cocok jika Anda membutuhkan REST API server yang terpisah dari frontend statis.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. EXPERT LEVEL */}
      {(activeLevel === "all" || activeLevel === "expert") && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h2 className="text-2xl font-bold text-black">Tingkat 3: Expert (VPS, Docker Compose & CI/CD)</h2>
            </div>
            <span className="text-xs font-mono font-bold bg-gray-100 text-black px-3 py-1 rounded-full border border-gray-200">
              Enterprise Self-Hosted Infrastructure
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* VPS Linux & Nginx */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-black" />
                    <h3 className="text-lg font-bold text-black">1. VPS Linux & Nginx Reverse Proxy</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 rounded font-bold">
                    Full Root Control
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Menyewa server Virtual Private Server (DigitalOcean, Hetzner, AWS EC2) dengan OS Ubuntu Linux. Memberikan performa maksimal dan biaya bulanan tetap.
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-black">
                    <span>Langkah Set-Up VPS Utama:</span>
                    <button
                      onClick={() => handleCopy("vps-setup", `sudo apt update && sudo apt upgrade -y
sudo apt install nginx ufw -y
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo certbot --nginx -d domainanda.com`)}
                      className="text-[10px] font-mono bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-0.5 rounded border border-gray-200 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "vps-setup" ? <Check className="h-3 w-3 text-black" /> : <Copy className="h-3 w-3" />}
                      <span>Copy Commands</span>
                    </button>
                  </div>
                  <pre className="text-[10px] font-mono bg-gray-950 text-gray-200 p-3 rounded-xl overflow-x-auto leading-relaxed border border-gray-800">
{`# 1. Update & Install Nginx Web Server
sudo apt update && sudo apt install nginx -y

# 2. Amankan Firewall Server (UFW)
sudo ufw allow 'Nginx Full' && sudo ufw enable

# 3. Pasang SSL HTTPS Gratis (Certbot Let's Encrypt)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d domainanda.com`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Docker & Docker Compose */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs hover:border-black transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Container className="h-5 w-5 text-black" />
                    <h3 className="text-lg font-bold text-black">2. Docker & Docker Compose</h3>
                  </div>
                  <span className="text-[10px] font-mono bg-gray-100 text-black px-2 py-0.5 rounded font-bold border border-gray-200">
                    Multi-Container Stack
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Mengisolasi Frontend, Backend API, PostgreSQL Database, dan Caching Redis ke dalam container terpisah menggunakan satu berkas `docker-compose.yml`.
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-black">
                    <span>Contoh `docker-compose.yml`:</span>
                    <button
                      onClick={() => handleCopy("docker-compose", `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb`)}
                      className="text-[10px] font-mono bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-0.5 rounded border border-gray-200 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "docker-compose" ? <Check className="h-3 w-3 text-black" /> : <Copy className="h-3 w-3" />}
                      <span>Copy Yaml</span>
                    </button>
                  </div>
                  <pre className="text-[10px] font-mono bg-gray-950 text-gray-200 p-3 rounded-xl overflow-x-auto leading-relaxed border border-gray-800">
{`version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* CI/CD GitHub Actions Workflow */}
          <div className="bg-black text-white rounded-2xl border border-gray-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-white" />
                <h3 className="text-base font-bold text-white">3. Automasi CI/CD Pipeline (GitHub Actions)</h3>
              </div>
              <span className="text-[10px] font-mono bg-gray-800 text-gray-200 border border-gray-700 px-2 py-0.5 rounded font-bold">
                Automated Deployment
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Dengan CI/CD, setiap kali Anda melakukan push kode ke branch `main`, GitHub akan secara otomatis menjalankan unit test, membendung error build, dan melakukan ssh deployment otomatis ke VPS tanpa campur tangan manual.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
