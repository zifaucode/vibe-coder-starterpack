import { useState } from "react";
import { Check, Copy, ExternalLink, Wrench } from "lucide-react";
import { TOOL_SECTIONS, type ToolKind, type ToolStep } from "../../lib/toolsData";

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative mt-2">
      <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-gray-800 bg-gray-950 p-3 pr-20 font-mono text-[11px] leading-relaxed text-gray-100">{code}</pre>
      <button
        onClick={copy}
        aria-label="Salin"
        className="absolute right-2 top-2 inline-flex cursor-pointer items-center gap-1 rounded-md bg-gray-800 px-2 py-1 text-[11px] font-semibold text-gray-200 hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-white"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copied ? "Tersalin" : "Salin"}
      </button>
    </div>
  );
}

function Steps({ steps }: { steps: ToolStep[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-3">
          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-black text-[11px] font-bold text-white">{i + 1}</span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-black">{s.title}</div>
            {s.detail && <p className="mt-0.5 text-xs leading-relaxed text-gray-600">{s.detail}</p>}
            {s.code && <CodeBlock code={s.code} />}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ToolsPage({ kind }: { kind: ToolKind }) {
  const section = TOOL_SECTIONS[kind];
  const [selectedId, setSelectedId] = useState(section.entries[0]?.id);
  const entry = section.entries.find((e) => e.id === selectedId) ?? section.entries[0];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 pb-16 animate-in fade-in duration-500">
      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-black">{section.title}</h1>
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{section.intro}</p>
      </div>

      {!entry ? (
        <div className="space-y-3 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <Wrench className="mx-auto h-8 w-8 text-gray-400" />
          <h2 className="text-lg font-bold text-black">Belum ada entri</h2>
          <p className="mx-auto max-w-md text-sm text-gray-500">
            Bagian ini siap diisi. Tambahkan alat di berkas lib/toolsData.ts, atau kirim nama alat dan tautannya agar ditambahkan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <nav aria-label={section.title} className="space-y-2 lg:col-span-1">
            {section.entries.map((e) => {
              const active = e.id === entry.id;
              return (
                <button
                  key={e.id}
                  onClick={() => setSelectedId(e.id)}
                  aria-current={active ? "true" : undefined}
                  className={`w-full cursor-pointer rounded-xl border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-black ${
                    active ? "border-black bg-black text-white" : "border-gray-200 bg-white text-black hover:border-black"
                  }`}
                >
                  <div className="text-sm font-bold">{e.name}</div>
                  <div className={`mt-0.5 text-xs leading-snug ${active ? "text-gray-300" : "text-gray-500"}`}>{e.tagline}</div>
                </button>
              );
            })}
          </nav>

          <article className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs md:p-8 lg:col-span-3">
            <header className="space-y-2 border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-bold text-black">{entry.name}</h2>
              <p className="text-sm leading-relaxed text-gray-600">{entry.summary}</p>
              <p className="text-xs text-gray-700">
                <span className="font-bold">Cocok untuk:</span> {entry.bestFor}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {entry.tags.map((t) => (
                  <span key={t} className="rounded border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500">#{t}</span>
                ))}
              </div>
            </header>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-black">Cara memakai</h3>
              <Steps steps={entry.steps} />
            </section>

            {entry.tips.length > 0 && (
              <section className="space-y-2">
                <h3 className="text-base font-bold text-black">Tips</h3>
                <ul className="list-disc space-y-1 pl-5 text-xs leading-relaxed text-gray-700 marker:text-gray-400">
                  {entry.tips.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </section>
            )}

            {entry.links.length > 0 && (
              <section className="space-y-2 border-t border-gray-100 pt-4">
                <h3 className="text-base font-bold text-black">Tautan resmi</h3>
                <ul className="space-y-1">
                  {entry.links.map((l) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-black underline underline-offset-2 hover:text-gray-600">
                        {l.label}
                        <ExternalLink aria-hidden="true" className="h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </div>
      )}
    </div>
  );
}
