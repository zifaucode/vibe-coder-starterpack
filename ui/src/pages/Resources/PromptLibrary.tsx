import { useState } from "react";
import { PROMPTS, CATEGORIES, type Category } from "../../lib/prompts";
import { Button } from "@/components/ui/button";
import { Copy, Check, Sparkles } from "lucide-react";
import Wireframe from "@/components/Wireframe";

export default function PromptLibrary() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPrompts = activeCategory === "All" 
    ? PROMPTS 
    : PROMPTS.filter(p => p.category === activeCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header section */}
      <div className="space-y-3">
        <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-black">
          <Sparkles className="mr-2 h-3.5 w-3.5" />
          <span>{PROMPTS.length} Prompts Available</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-black">
          UI Prompt Library
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A curated collection of layout prompts for vibe coders. Pick a structure, copy the prompt, and paste it into your AI tool to generate beautiful UI.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-4 border-t">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category
                ? "bg-black text-white shadow-md scale-105"
                : "bg-white text-gray-600 border hover:border-black hover:text-black hover:bg-gray-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {filteredPrompts.map(prompt => {
          const isCopied = copiedId === prompt.id;
          
          return (
            <div 
              key={prompt.id} 
              className="group relative flex flex-col bg-white rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-black/20"
            >
              {/* Abstract Visual Header (Wireframe) */}
              <div className="h-40 w-full rounded-xl bg-gray-50 border border-gray-100 mb-5 flex items-center justify-center relative overflow-hidden p-3 transition-colors duration-300 group-hover:bg-gray-100/50">
                <Wireframe id={prompt.id} />
              </div>
              
              {/* Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {prompt.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black mb-2 tracking-tight">{prompt.title}</h3>
                <p className="text-sm text-gray-500 italic mb-6 leading-relaxed">
                  {prompt.description}
                </p>
                
                {/* Action */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Button 
                    onClick={() => handleCopy(prompt.id, prompt.promptText)}
                    variant={isCopied ? "default" : "outline"}
                    className={`w-full justify-center transition-all ${isCopied ? "bg-black text-white" : "border-gray-200 text-black hover:bg-gray-50"}`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4 text-gray-400" />
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
    </div>
  );
}
