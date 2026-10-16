import { PROMPTS, CATEGORIES } from "../../lib/prompts";
import { GUIDE } from "../../lib/componentGuide";
import LibraryBrowser from "@/components/LibraryBrowser";
import {
  Rocket, PanelTop, ShieldCheck, LayoutList, CreditCard, LayoutDashboard, MessageSquareQuote,
  PanelBottom, ShoppingBag, Zap, Layers, Grid3x3, BarChart4, Sparkles, Sliders,
} from "lucide-react";

const ICONS = {
  "Hero Sections": Rocket,
  "Nav & Headers": PanelTop,
  "Auth & Forms": ShieldCheck,
  "Feature Grids": LayoutList,
  "Pricing & Plans": CreditCard,
  Dashboards: LayoutDashboard,
  Testimonials: MessageSquareQuote,
  Footers: PanelBottom,
  "E-Commerce": ShoppingBag,
  "Modals & Popups": Layers,
  "CTA & Banners": Zap,
  "Content & Blog": LayoutList,
  "Cards & Lists": Grid3x3,
  "Data & Tables": BarChart4,
  "Onboarding & States": Sparkles,
  "Settings & Profile": Sliders,
};

export default function PromptLibrary() {
  return (
    <LibraryBrowser
      title="Library Komponen Website"
      intro={`${PROMPTS.length} prompt komponen website beserta panduan pemakaiannya. Pilih komponen, baca panduan singkatnya, salin prompt, lalu tempel ke AI agent bersama DESIGN.md dari halaman UI/UX Guide.`}
      noun="komponen"
      searchHint="Cari komponen, misalnya Hero, Pricing, atau Auth"
      items={PROMPTS}
      categories={CATEGORIES}
      guide={GUIDE}
      icons={ICONS}
    />
  );
}
