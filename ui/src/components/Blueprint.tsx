import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";

/**
 * Miniatur wireframe berbentuk komponen asli. Tiap elemen punya label; di jendela detail label
 * ditampilkan sebagai nomor di gambar plus daftar keterangan, di kartu cukup bentuknya.
 */
export type Node = {
  k: "r" | "c" | "g" | "t" | "b" | "o" | "i" | "f" | "d" | "x" | "k" | "p";
  l?: string;
  w?: number;
  n?: number;
  c?: Node[];
};

const box = (k: Node["k"]) => (...c: Node[]): Node => ({ k, c });
const leaf = (k: Node["k"]) => (l: string, w?: number): Node => ({ k, l, w });

export const R = box("r"); // baris
export const C = box("c"); // kolom
export const K = box("k"); // panel gelap
export const P = box("p"); // bingkai ponsel
export const G = (n: number, ...c: Node[]): Node => ({ k: "g", n, c }); // grid n kolom
export const Bx = (l: string, ...c: Node[]): Node => ({ k: "x", l, c }); // area berlabel
export const W = (w: number, node: Node): Node => ({ ...node, w }); // lebar relatif
export const T = leaf("t"); // teks
export const B = leaf("b"); // tombol utama
export const O = leaf("o"); // tombol sekunder
export const I = leaf("i"); // gambar atau video
export const F = leaf("f"); // kolom isian
export const D = leaf("d"); // chip, badge, ikon, avatar

const LABELED = new Set<Node["k"]>(["t", "b", "o", "i", "f", "d", "x"]);

/** Nomor urut tiap elemen berlabel (urutan baca atas ke bawah, kiri ke kanan). */
function numbering(root: Node) {
  const ids = new Map<Node, number>();
  const items: string[] = [];
  const walk = (n: Node) => {
    if (LABELED.has(n.k) && n.l) {
      items.push(n.l);
      ids.set(n, items.length);
    }
    n.c?.forEach(walk);
  };
  walk(root);
  return { ids, items };
}

/** Label unik, berurutan: untuk ringkasan "Berisi" di kartu. */
export const labelsOf = (root: Node) => [...new Set(numbering(root).items)];

const CROSS =
  "linear-gradient(to top right,transparent calc(50% - .5px),#d1d5db,transparent calc(50% + .5px)),linear-gradient(to bottom right,transparent calc(50% - .5px),#d1d5db,transparent calc(50% + .5px))";

const HEAD = /^(Judul|Kutipan besar|Angka besar|Teks berjalan)/;
const ROUND = /^(Avatar|Foto|Ikon|Titik|Kotak|Handle|Selesai|Belum|Dipilih|Lonceng|Profil|Tumpukan|Tanda|Beranda|Cari|Tambah|Pesan|\d)/;

type Ctx = { dark: boolean; big: boolean; ids: Map<Node, number>; phone?: boolean };

function Shape({ n, dark }: { n: Node; dark: boolean }) {
  const l = n.l ?? "";
  const bar = (cls: string) => <div className={`rounded-full ${cls}`} />;
  switch (n.k) {
    case "t":
      if (HEAD.test(l)) return <div className="space-y-1.5 py-0.5">{bar(`h-3.5 w-4/5 ${dark ? "bg-gray-100" : "bg-gray-800"}`)}{bar(`h-3.5 w-3/5 ${dark ? "bg-gray-100" : "bg-gray-800"}`)}</div>;
      if (l.length <= 14 || /^(Menu|Tautan|Baris|Data|Kolom)/.test(l)) return <div className="py-1">{bar(`h-2 w-3/5 ${dark ? "bg-gray-500" : "bg-gray-300"}`)}</div>;
      return <div className="space-y-1.5 py-0.5">{bar(`h-2 w-full ${dark ? "bg-gray-500" : "bg-gray-300"}`)}{bar(`h-2 w-2/3 ${dark ? "bg-gray-500" : "bg-gray-300"}`)}</div>;
    case "b":
      return <div className={`flex h-8 min-w-[56px] items-center justify-center rounded-lg px-3 ${dark ? "bg-white" : "bg-black"}`}>{bar(`h-1.5 w-1/2 ${dark ? "bg-gray-800" : "bg-white"}`)}</div>;
    case "o":
      return <div className={`flex h-8 min-w-[56px] items-center justify-center rounded-lg border px-3 ${dark ? "border-gray-400" : "border-gray-400 bg-white"}`}>{bar(`h-1.5 w-1/2 ${dark ? "bg-gray-300" : "bg-gray-400"}`)}</div>;
    case "f":
      return <div className={`flex h-8 items-center rounded-lg border px-2.5 ${dark ? "border-gray-500 bg-gray-800" : "border-gray-300 bg-white"}`}>{bar(`h-1.5 w-1/3 ${dark ? "bg-gray-500" : "bg-gray-300"}`)}</div>;
    case "d":
      return ROUND.test(l) ? (
        <div className={`h-6 w-6 rounded-full ${dark ? "bg-gray-500" : "bg-gray-300"}`} />
      ) : (
        <div className={`flex h-6 min-w-[56px] items-center justify-center rounded-full px-2.5 ${dark ? "bg-gray-600" : "bg-gray-200"}`}>{bar(`h-1.5 w-8 ${dark ? "bg-gray-300" : "bg-gray-400"}`)}</div>
      );
    case "i":
      return <div style={{ backgroundImage: CROSS }} className={`min-h-[88px] flex-1 rounded-lg border ${dark ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-gray-100"}`} />;
    default:
      return null;
  }
}

function View({ n, cx, inRow }: { n: Node; cx: Ctx; inRow: boolean }) {
  const { dark, big, ids } = cx;
  const grow = n.w ? { flex: `${n.w} 1 0%` } : undefined;
  const kids = (row: boolean, d = dark, phone = false) => n.c?.map((c, i) => <View key={i} n={c} cx={{ ...cx, dark: d, phone }} inRow={row} />);
  const num = ids.get(n);
  const badge = big && num ? (
    <span className="absolute -left-2 -top-2 z-10 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
      {num}
    </span>
  ) : null;
  // di dalam baris: wadah mengisi tinggi, tombol dan chip memakai lebar sendiri
  const rowStyle = (autoWidth: boolean): CSSProperties | undefined =>
    grow ?? (inRow ? (autoWidth ? { flex: "0 1 auto" } : { flex: "1 1 0%" }) : undefined);
  const stretch = inRow ? "self-stretch" : "";

  switch (n.k) {
    case "r": return <div style={rowStyle(false)} className={`flex min-w-0 items-center gap-2.5 ${stretch}`}>{kids(true)}</div>;
    case "c": return <div style={rowStyle(false)} className={`flex min-w-0 flex-col gap-2.5 ${stretch}`}>{kids(false)}</div>;
    case "g": return <div style={{ ...rowStyle(false), gridTemplateColumns: `repeat(${n.n},minmax(0,1fr))` }} className={`grid min-w-0 gap-2.5 ${stretch}`}>{kids(false)}</div>;
    case "x":
      return (
        <div style={rowStyle(false)} className={`relative flex min-w-0 flex-col gap-2.5 rounded-lg border border-dashed p-2.5 ${dark ? "border-gray-500" : "border-gray-400"} ${stretch}`}>
          {badge}
          {kids(false)}
        </div>
      );
    case "k": return <div style={cx.phone ? { flex: "1 1 0%" } : rowStyle(false)} className={`flex min-w-0 flex-col gap-2.5 rounded-lg bg-gray-900 p-3 ${stretch}`}>{kids(false, true)}</div>;
    case "p": return <div style={rowStyle(false)} className={`mx-auto flex w-[180px] min-h-[340px] min-w-0 flex-col gap-2.5 rounded-[22px] border-[3px] border-gray-800 bg-white p-3 ${stretch}`}>{kids(false, dark, true)}</div>;
    default: {
      const auto = n.k === "b" || n.k === "o" || n.k === "d";
      return (
        <div style={n.k === "i" && cx.phone ? { flex: "1 1 0%" } : rowStyle(auto)} className={`relative min-w-0 ${n.k === "i" ? "flex" : ""} ${n.k === "i" || n.k === "t" ? stretch : ""}`}>
          {badge}
          <Shape n={n} dark={dark} />
        </div>
      );
    }
  }
}

/** Daftar keterangan bernomor, pasangan dari badge angka pada gambar besar. */
export function BlueprintKey({ node }: { node: Node }) {
  const { items } = useMemo(() => numbering(node), [node]);
  return (
    <ol className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-xs text-gray-700 sm:grid-cols-2">
      {items.map((label, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-px flex h-[18px] min-w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-white">{i + 1}</span>
          <span className="leading-snug">{label}</span>
        </li>
      ))}
    </ol>
  );
}

export default function Blueprint({ node, big }: { node: Node; big?: boolean }) {
  const dw = node.k === "p" ? 230 : 400;
  const num = useMemo(() => numbering(node), [node]);
  const outer = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ s: 1, x: 0, h: 0, box: 0 });

  // Dirender pada lebar desain tetap, lalu diskalakan. Di kartu, halaman putih mengisi penuh
  // dan isinya dipusatkan; jika isinya lebih tinggi dari kartu, skala diturunkan.
  useLayoutEffect(() => {
    const o = outer.current;
    const c = content.current;
    if (!o || !c) return;
    const calc = () => {
      const nh = c.offsetHeight;
      const cw = o.clientWidth;
      if (big) {
        const s = Math.min(cw / dw, 1.7);
        setFit({ s, x: (cw - dw * s) / 2, h: nh * s, box: nh });
        return;
      }
      const ch = o.clientHeight;
      const sw = cw / dw;
      if (nh * sw <= ch) setFit({ s: sw, x: 0, h: 0, box: ch / sw });
      else {
        const s = ch / nh;
        setFit({ s, x: (cw - dw * s) / 2, h: 0, box: nh });
      }
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(o);
    return () => ro.disconnect();
  }, [dw, big, node]);

  return (
    <div
      ref={outer}
      style={big ? { height: fit.h } : undefined}
      className={big ? "relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white" : "absolute inset-0 overflow-hidden"}
    >
      <div
        style={{ width: dw, height: fit.box || undefined, transformOrigin: "top left", transform: `translateX(${fit.x}px) scale(${fit.s})` }}
        className="absolute left-0 top-0 flex items-center bg-white"
      >
        <div ref={content} className="w-full p-5">
          <View n={node} cx={{ dark: false, big: !!big, ids: num.ids }} inRow={false} />
        </div>
      </div>
    </div>
  );
}
