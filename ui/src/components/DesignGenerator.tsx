import { useEffect, useState } from "react";
import { Check, Copy, Download, RotateCcw } from "lucide-react";
import {
  DEFAULT_FORM,
  OPTIONS,
  PROMPT_TABS,
  buildDesignMd,
  buildPrompt,
  contrast,
  downloadFile,
  type DesignForm,
  type PromptKind,
} from "../lib/designKit";

const STORAGE_KEY = "vcs-design-form";
const field = "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-black focus-visible:outline-2 focus-visible:outline-black";

const load = (): DesignForm => {
  try {
    return { ...DEFAULT_FORM, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return DEFAULT_FORM;
  }
};

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-[11px] font-bold text-gray-700">{text}</span>
      {children}
    </label>
  );
}

export default function DesignGenerator() {
  const [form, setForm] = useState<DesignForm>(load);
  const [output, setOutput] = useState<"design" | PromptKind>("design");
  const [copied, setCopied] = useState(false);

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(form)), [form]);

  const set = <K extends keyof DesignForm>(k: K, v: DesignForm[K]) => setForm((p) => ({ ...p, [k]: v }));
  const text = output === "design" ? buildDesignMd(form) : buildPrompt(output, form);
  const ratio = contrast(form.primary, "#ffffff").toFixed(1);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const select = (k: keyof DesignForm, opts: (string | number)[]) => (
    <select className={field} value={form[k] as string | number} onChange={(e) => set(k, (typeof opts[0] === "number" ? +e.target.value : e.target.value) as never)}>
      {opts.map((o) => <option key={o} value={o}>{typeof o === "number" ? `${o}px` : o}</option>)}
    </select>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-black">Brief Proyek</h3>
          <button
            onClick={() => setForm(DEFAULT_FORM)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-black cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
        <Label text="Nama produk">
          <input className={field} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Nama produk Anda" />
        </Label>
        <Label text="Apa yang dilakukan produk ini?">
          <textarea className={field} rows={2} value={form.summary} onChange={(e) => set("summary", e.target.value)} placeholder="Satu kalimat: untuk apa, untuk siapa" />
        </Label>
        <Label text="Target pengguna">
          <input className={field} value={form.audience} onChange={(e) => set("audience", e.target.value)} placeholder="Contoh: admin gudang usia 25-45" />
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <Label text="Tipe produk">{select("type", OPTIONS.type)}</Label>
          <Label text="Platform">{select("platform", ["Web", "Mobile", "Desktop"])}</Label>
        </div>
        <Label text="Daftar layar (satu per baris)">
          <textarea className={field} rows={4} value={form.screens} onChange={(e) => set("screens", e.target.value)} />
        </Label>
        <Label text="Gaya visual">{select("style", OPTIONS.style)}</Label>
        <div className="grid grid-cols-2 gap-3">
          <Label text={`Warna utama (kontras vs putih ${ratio}:1)`}>
            <input type="color" className="h-9 w-full rounded-xl border border-gray-200 bg-white p-1 cursor-pointer" value={form.primary} onChange={(e) => set("primary", e.target.value)} />
          </Label>
          <Label text="Warna aksen">
            <input type="color" className="h-9 w-full rounded-xl border border-gray-200 bg-white p-1 cursor-pointer" value={form.accent} onChange={(e) => set("accent", e.target.value)} />
          </Label>
          <Label text="Font heading">{select("headingFont", OPTIONS.font)}</Label>
          <Label text="Font body">{select("bodyFont", OPTIONS.font)}</Label>
          <Label text="Radius">{select("radius", OPTIONS.radius)}</Label>
          <Label text="Kepadatan">{select("density", ["Lega", "Standar", "Padat"])}</Label>
          <Label text="Motion">{select("motion", ["Minim", "Standar", "Ekspresif"])}</Label>
          <Label text="Variasi layout">{select("variance", ["Simetris", "Seimbang", "Asimetris"])}</Label>
          <Label text="Tema">{select("theme", ["Light", "Dark", "Light + Dark"])}</Label>
          <Label text="Tool target">{select("tool", OPTIONS.tool)}</Label>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-3 min-w-0">
        <div role="tablist" className="flex flex-wrap gap-1.5">
          {[{ id: "design", label: "DESIGN.md" }, ...PROMPT_TABS].map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={output === t.id}
              onClick={() => setOutput(t.id as "design" | PromptKind)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                output === t.id ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:text-black"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <pre className="max-h-[560px] overflow-auto whitespace-pre-wrap rounded-xl border border-gray-800 bg-gray-950 p-4 text-[11px] leading-relaxed font-mono text-gray-200">
          {text}
        </pre>
        <div className="flex gap-2">
          <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white hover:bg-gray-800 active:scale-95 transition-all cursor-pointer">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Tersalin" : "Salin"}
          </button>
          {output === "design" && (
            <button onClick={() => downloadFile("DESIGN.md", text)} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-black hover:bg-gray-100 active:scale-95 transition-all cursor-pointer">
              <Download className="h-3.5 w-3.5" /> Simpan DESIGN.md
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
