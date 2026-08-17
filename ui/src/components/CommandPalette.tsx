import { useState, useEffect, useRef } from "react";
import {
  Search,
  BookOpen,
  Layers,
  Rocket,
  Pipette,
  Smartphone,
  Boxes,
  LayoutTemplate,
  Code,
  Fingerprint,
  User,
  Command,
  ArrowRight,
  ShieldCheck,
  X,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: "Getting Started" | "Design" | "Developer";
  description: string;
  keywords: string[];
  icon: any;
}

const COMMAND_ITEMS: CommandItem[] = [
  {
    id: "introduction",
    title: "Introduction & Vibe Coding 101",
    category: "Getting Started",
    description: "Template PRD.md, SDD.md, DESIGN.md, Kalkulator Token AI, & Panduan Anti-Slop",
    keywords: ["prd", "sdd", "design.md", "token", "ai slop", "blueprint", "template", "intro"],
    icon: BookOpen,
  },
  {
    id: "introduction",
    title: "Anti-Slop AI Rules & Skills (Miqdad Badjuber)",
    category: "Getting Started",
    description: "Panduan aturan Anti-Slop AI (Copywriting & UI) dan instruksi pasang manual CLI",
    keywords: ["anti slop", "antislop", "copywriting", "ui", "miqdad badjuber", "skill", "manual install"],
    icon: ShieldCheck,
  },
  {
    id: "stacktech",
    title: "StackTech & Database System",
    category: "Getting Started",
    description: "Panduan Frontend (React/Vue), Backend (Node/Python/Laravel), & DB (Postgres/Supabase)",
    keywords: ["tech stack", "database", "sql", "nosql", "supabase", "react", "next.js", "laravel", "python", "fastapi"],
    icon: Layers,
  },
  {
    id: "deploy",
    title: "Production & Deploy Strategy",
    category: "Getting Started",
    description: "Tingkat Beginner (Vercel/GitHub Pages), Intermediate (Railway), hingga Expert (VPS/Docker/CI-CD)",
    keywords: ["deploy", "vercel", "github pages", "vps", "docker", "nginx", "ci cd", "production", "server"],
    icon: Rocket,
  },
  {
    id: "color-picker",
    title: "Color Picker & Palette Generator",
    category: "Design",
    description: "Tool pemilih warna HSL/HEX/RGB & perancangan design tokens",
    keywords: ["color", "palette", "hsl", "hex", "rgb", "warna", "picker"],
    icon: Pipette,
  },
  {
    id: "mobile-glossary",
    title: "Mobile UI Component Glossary",
    category: "Design",
    description: "Katalog visual komponen mobile (Bottom Sheet, FAB, Toast, Accordion)",
    keywords: ["mobile", "glossary", "bottom sheet", "fab", "toast", "accordion", "component"],
    icon: Smartphone,
  },
  {
    id: "prompt-library",
    title: "Web Components Library",
    category: "Design",
    description: "Library komponen web (Hero, Navigation, Bento Grid, Pricing Table)",
    keywords: ["web components", "hero", "navigation", "bento grid", "pricing", "library"],
    icon: Boxes,
  },
  {
    id: "ui-ux-guide",
    title: "UI/UX Strategy & Workflow",
    category: "Design",
    description: "Alur Pre-design, Wireframing Lo-Fi vs Hi-Fi, Figma, & Google Stitch AI",
    keywords: ["ui", "ux", "wireframe", "figma", "google stitch", "lofi", "hifi", "prototype"],
    icon: LayoutTemplate,
  },
  {
    id: "json-formatter",
    title: "JSON Formatter & Validator",
    category: "Developer",
    description: "Format, rapikan, dan validasi struktur data JSON secara realtime",
    keywords: ["json", "formatter", "validator", "minify", "developer", "tool"],
    icon: Code,
  },
  {
    id: "regex-tester",
    title: "Regex Tester & Highlighting",
    category: "Developer",
    description: "Uji ekspresi reguler (Regular Expression) secara langsung dengan tes string",
    keywords: ["regex", "regular expression", "tester", "pattern", "developer"],
    icon: Search,
  },
  {
    id: "base64-tool",
    title: "Base64 Encoder & Decoder",
    category: "Developer",
    description: "Enkripsi dan dekripsi teks atau berkas ke format string Base64",
    keywords: ["base64", "encoder", "decoder", "encryption", "hash", "developer"],
    icon: Fingerprint,
  },
  {
    id: "about-me",
    title: "About Me & Author (zifaucode)",
    category: "Developer",
    description: "Informasi pembuat zifaucode dan repository GitHub vibe-coder-starterpack",
    keywords: ["about", "author", "zifaucode", "github", "repo", "creator", "tentang"],
    icon: User,
  },
];

export default function CommandPalette({ isOpen, onClose, onSelectTab }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter items based on query
  const filteredItems = COMMAND_ITEMS.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  // Handle keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        onSelectTab(filteredItems[selectedIndex].id);
        onClose();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white text-black w-full max-w-2xl rounded-2xl border border-gray-300 shadow-2xl overflow-hidden space-y-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-gray-200 bg-gray-50/50">
          <Search className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ketik modul, fitur, atau tekan Ctrl + K..."
            className="w-full py-4 text-sm font-medium bg-transparent border-none outline-none text-black placeholder:text-gray-400"
          />
          <div className="flex items-center gap-1.5 ml-2">
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono font-bold bg-white text-gray-700 px-2 py-1 rounded border border-gray-200 shadow-2xs">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded-lg transition-all text-gray-500 hover:text-black cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-500 space-y-1">
              <Command className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <p className="font-bold text-gray-800">Tidak ada modul yang cocok dengan "{query}"</p>
              <p>Coba cari kata kunci seperti: <em>PRD, Vercel, Figma, JSON, Regex</em></p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-black text-white shadow-xs"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? "bg-gray-800 text-white border border-gray-700"
                          : "bg-gray-100 border border-gray-200 text-black"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate">{item.title}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                            isSelected
                              ? "bg-gray-800 text-gray-200 border-gray-700"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] truncate ${
                          isSelected ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 flex-shrink-0 ${
                      isSelected ? "text-white" : "text-gray-400"
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-gray-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Pilih</span>
            <span>↵ Buka Modul</span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="h-3 w-3 text-black" />
            <span className="font-bold text-black">Vibe Coder Command Palette</span>
          </div>
        </div>
      </div>
    </div>
  );
}
