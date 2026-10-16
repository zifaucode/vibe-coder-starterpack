import { MOBILE_PATTERNS, MOBILE_CATEGORIES } from "../../lib/mobilePatterns";
import { MOBILE_GUIDE } from "../../lib/mobileGuide";
import LibraryBrowser from "@/components/LibraryBrowser";
import { PanelBottom, ShieldCheck, LayoutList, Layers, Bell, ShoppingBag, Play, MapPin, BarChart4 } from "lucide-react";

const ICONS = {
  Navigation: PanelBottom,
  "Forms & Auth": ShieldCheck,
  "Feeds & Cards": LayoutList,
  "Modals & Sheets": Layers,
  "Feedback & Alerts": Bell,
  "Commerce & Payments": ShoppingBag,
  "Media & Content": Play,
  "Maps & Location": MapPin,
  "Data & Insights": BarChart4,
};

export default function MobileGlossary() {
  return (
    <LibraryBrowser
      title="Mobile Design Glossary"
      intro={`${MOBILE_PATTERNS.length} pola antarmuka mobile beserta panduannya, supaya aplikasi Anda terasa intuitif dan native di iOS dan Android. Pilih pola, baca panduannya, lalu salin prompt untuk AI agent.`}
      noun="pola"
      searchHint="Cari pola, misalnya Bottom Sheet, OTP, Chat, atau Peta"
      items={MOBILE_PATTERNS}
      categories={MOBILE_CATEGORIES}
      guide={MOBILE_GUIDE}
      icons={ICONS}
    />
  );
}
