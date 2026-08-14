import { useState } from "react";
import { PROMPTS, CATEGORIES, type Category, type PromptItem } from "../../lib/prompts";
import { Button } from "@/components/ui/button";
import { Copy, Check, Sparkles, Search, Layers, X, Code2, ArrowUpRight } from "lucide-react";
import Wireframe from "@/components/Wireframe";

export default function PromptLibrary() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);

  // Filter logic based on Category and Search Query
  const filteredPrompts = PROMPTS.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || (
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.promptText.toLowerCase().includes(query) ||
      p.tags.some(tag => tag.toLowerCase().includes(query))
    );
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: string, text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryCount = (category: Category) => {
    if (category === "All") return PROMPTS.length;
    return PROMPTS.filter(p => p.category === category).length;
  };

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Header section */}
      <div className="space-y-4">
        <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black shadow-xs">
          <Sparkles className="mr-2 h-3.5 w-3.5 text-black" />
          <span>{PROMPTS.length} Komponen Website & Prompt Ready</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-black">
          Library Komponen Website
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
          Koleksi blueprint dan prompt komponen website modern siap pakai. Pilih struktur komponen, salin prompt-nya, lalu gunakan di AI atau vibe coder favorit Anda.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pt-2 border-t border-gray-200">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari komponen (e.g. Hero, Glassmorphism, Pricing, Auth)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all shadow-xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-1"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills Count */}
        <div className="text-xs font-semibold text-gray-500">
          Menampilkan <span className="text-black font-bold">{filteredPrompts.length}</span> dari {PROMPTS.length} komponen
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const count = getCategoryCount(category);
          if (count === 0 && category !== "All") return null;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${filterActiveStyle(activeCategory === category)}`}
            >
              <span>{category}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeCategory === category ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Components */}
      {filteredPrompts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center space-y-3">
          <Layers className="mx-auto h-8 w-8 text-gray-400" />
          <h3 className="text-lg font-bold text-black">Komponen tidak ditemukan</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Tidak ada komponen yang cocok dengan "{searchQuery}". Coba cari kata kunci lain.
          </p>
          <Button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} variant="outline" className="mt-2 text-xs">
            Reset Filter
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredPrompts.map((prompt) => {
            const isCopied = copiedId === prompt.id;
            const IconComponent = prompt.icon;
            
            return (
              <div 
                key={prompt.id} 
                onClick={() => setSelectedPrompt(prompt)}
                className="group relative flex flex-col bg-white rounded-2xl border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-black/20 cursor-pointer"
              >
                {/* Abstract Visual Header (Wireframe) */}
                <div className="h-44 w-full rounded-xl bg-gray-50 border border-gray-100 mb-4 flex items-center justify-center relative overflow-hidden p-2 transition-colors duration-300 group-hover:bg-gray-100/60">
                  <Wireframe id={prompt.id} />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white p-1.5 rounded-lg">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {prompt.category}
                    </span>
                    <div className="flex items-center text-gray-400">
                      <IconComponent className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-black mb-1 tracking-tight group-hover:text-black/80 transition-colors">
                    {prompt.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {prompt.description}
                  </p>

                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                    {prompt.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action */}
                  <div className="pt-3 border-t border-gray-100 flex gap-2">
                    <Button 
                      onClick={(e) => handleCopy(prompt.id, prompt.promptText, e)}
                      variant={isCopied ? "default" : "outline"}
                      className={`flex-1 text-xs justify-center transition-all h-9 ${isCopied ? "bg-black text-white" : "border-gray-200 text-black hover:bg-gray-50"}`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="mr-1.5 h-3.5 w-3.5" />
                          Tersalin!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                          Copy Prompt
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Prompt Detail Modal */}
      {selectedPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black text-white">
                    {selectedPrompt.category}
                  </span>
                  {selectedPrompt.tags.map(t => (
                    <span key={t} className="text-[10px] text-gray-500 font-medium">#{t}</span>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-black">{selectedPrompt.title}</h2>
                <p className="text-xs text-gray-500">{selectedPrompt.description}</p>
              </div>
              <button 
                onClick={() => setSelectedPrompt(null)}
                className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content - Code/Prompt Preview */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-white">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="h-4 w-4 text-black" />
                  Prompt Blueprint (Siap Pakai untuk AI)
                </label>
                <span className="text-[11px] text-gray-400">Bahasa: Inggris (Standar AI Prompting)</span>
              </div>

              <div className="bg-gray-950 text-gray-100 p-4 rounded-xl font-mono text-xs leading-relaxed border border-gray-800 shadow-inner relative group">
                {selectedPrompt.promptText}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
              <Button onClick={() => setSelectedPrompt(null)} variant="ghost" className="text-xs text-gray-600">
                Tutup
              </Button>
              <Button 
                onClick={() => handleCopy(selectedPrompt.id, selectedPrompt.promptText)}
                className="bg-black text-white hover:bg-black/90 text-xs px-5 shadow-sm"
              >
                {copiedId === selectedPrompt.id ? (
                  <><Check className="mr-2 h-4 w-4" /> Tersalin ke Clipboard!</>
                ) : (
                  <><Copy className="mr-2 h-4 w-4" /> Salin Full Prompt</>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function filterActiveStyle(isActive: boolean) {
  return isActive
    ? "bg-black text-white shadow-sm"
    : "bg-white text-gray-600 border border-gray-200 hover:border-black hover:text-black hover:bg-gray-50";
}
