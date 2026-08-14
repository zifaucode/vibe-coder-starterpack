import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Search, Smartphone, X, Layers, ArrowUpRight, Code2 } from "lucide-react";
import Wireframe from "@/components/Wireframe";

export type MobileCategory = 
  | "All" 
  | "Navigation" 
  | "Forms & Auth" 
  | "Feeds & Cards" 
  | "Modals & Sheets" 
  | "Feedback & Alerts";

export interface MobilePattern {
  id: string;
  title: string;
  description: string;
  category: MobileCategory;
  tags: string[];
  promptText: string;
}

export const MOBILE_PATTERNS: MobilePattern[] = [
  {
    id: "mobile-1",
    title: "Mobile Splash Screen",
    description: "App opening screen with branding gradient, animated logo, and loader.",
    category: "Navigation",
    tags: ["Splash", "Onboarding", "Branding"],
    promptText: "Design a mobile app splash screen. Center the app logo prominently. Use a vibrant gradient background or a high-quality blurred image. At the bottom, place a subtle, elegant loading spinner or progress bar. Ensure the overall feel is welcoming and fluid, setting the tone for the application."
  },
  {
    id: "mobile-2",
    title: "Bottom Navigation Bar",
    description: "Standard 4 or 5 tab bottom navigation bar with active pill indicator.",
    category: "Navigation",
    tags: ["BottomNav", "Tabs", "Navigation"],
    promptText: "Create a mobile bottom navigation bar with 4 distinct tabs (Home, Search, Notifications, Profile). The active tab should be highlighted with a solid icon and a subtle background pill or indicator dot, while inactive tabs use outlined icons in a muted gray color. The bar should have a slight top shadow to separate it from the main content area."
  },
  {
    id: "mobile-3",
    title: "Mobile Settings & Preferences",
    description: "Grouped list items for app preferences with toggles and chevrons.",
    category: "Forms & Auth",
    tags: ["Settings", "List", "Toggles"],
    promptText: "Design a mobile Settings page. Use a grouped list layout where related settings (Account, Notifications, Privacy) are clustered together in rounded cards. Each list item should have an icon on the left, setting name in center, and UI control on right (chevron or toggle switch). Keep background slightly off-white."
  },
  {
    id: "mobile-4",
    title: "Hamburger Drawer Menu",
    description: "Hidden side navigation drawer with user avatar header and links.",
    category: "Navigation",
    tags: ["Drawer", "Hamburger", "Menu"],
    promptText: "Create a mobile side drawer (hamburger menu) layout. The drawer should slide in from the left covering 80% of the screen. Include a user profile header with avatar and email, followed by a vertical list of navigation links with icons. Ensure remaining 20% shows a dark semi-transparent overlay."
  },
  {
    id: "mobile-5",
    title: "Snackbar / Toast Alert",
    description: "Temporary lightweight feedback message hovering above bottom navigation.",
    category: "Feedback & Alerts",
    tags: ["Snackbar", "Toast", "Alert"],
    promptText: "Design a mobile UI showing a 'Snackbar' toast notification. The snackbar should hover slightly above the bottom of the screen (or above bottom nav). It should be a dark, pill-shaped container containing a short success message on the left and an 'UNDO' action button in an accent color on the right."
  },
  {
    id: "mobile-6",
    title: "Confirmation Modal Dialog",
    description: "Centered popup overlay that interrupts the user for a critical action.",
    category: "Modals & Sheets",
    tags: ["Modal", "Dialog", "Confirmation"],
    promptText: "Create a mobile confirmation dialog modal. The modal should be centered on the screen over a dark overlay. It should have rounded corners, a bold title (e.g., 'Delete Account?'), a short descriptive text, and two full-width buttons stacked vertically: a primary destructive button (red) and a secondary cancel button (gray/ghost)."
  },
  {
    id: "mobile-7",
    title: "Bottom Sheet Modal",
    description: "Drag-handle bottom sheet sliding up over current view for quick actions.",
    category: "Modals & Sheets",
    tags: ["BottomSheet", "Drawer", "Interactive"],
    promptText: "Design a mobile Bottom Sheet UI component. It slides up from the bottom occupying ~60% of viewport height. Features a top centered pill drag handle bar, title header, scrollable options list (Share, Copy Link, Bookmark), and a primary CTA button at bottom."
  },
  {
    id: "mobile-8",
    title: "Floating Action Button (FAB)",
    description: "Elevated circular action button with expandable speed-dial options.",
    category: "Navigation",
    tags: ["FAB", "Button", "QuickAction"],
    promptText: "Build a mobile Floating Action Button (FAB) layout. A floating circular button positioned at bottom-right (24px offset). Tapping expands 3 mini speed-dial sub-buttons vertically upward with smooth rotation animation on the main '+' icon."
  },
  {
    id: "mobile-9",
    title: "Story Circles Header Bar",
    description: "Horizontal story avatar scrollbar with gradient unread ring borders.",
    category: "Feeds & Cards",
    tags: ["Stories", "Avatars", "Social"],
    promptText: "Create a mobile social story bar. Top horizontal scroll view displaying circular user avatars. Active/unread stories feature a vibrant gradient border ring (Instagram style). First circle is 'Your Story' with a plus overlay badge."
  },
  {
    id: "mobile-10",
    title: "OTP / Passcode Pin Screen",
    description: "Keypad input screen with 4 to 6 digit code boxes and countdown timer.",
    category: "Forms & Auth",
    tags: ["OTP", "Auth", "PinCode"],
    promptText: "Design a mobile 4-digit OTP verification screen. Includes prominent headline 'Enter Verification Code', email/phone reference, 4 individual square digit input boxes with active focus border glow, 'Resend Code in 0:45', and a numeric keypad layout."
  },
  {
    id: "mobile-11",
    title: "Swipeable Card Stack",
    description: "Stack of interactive cards supporting left/right swipe gestures.",
    category: "Feeds & Cards",
    tags: ["Swipe", "TinderStyle", "Cards"],
    promptText: "Create a mobile swipeable card stack interface (Tinder style). A centered high-res profile/item card with rounded corners, overlay gradient text at bottom, and 3 action control buttons below (Pass ✖, Super Like ⭐️, Like ❤️)."
  },
  {
    id: "mobile-12",
    title: "Mobile Chat & Messaging",
    description: "Real-time chat bubble conversation view with bottom message input bar.",
    category: "Feeds & Cards",
    tags: ["Chat", "Messages", "Social"],
    promptText: "Design a mobile chat messaging UI. Top bar: recipient avatar, name, and online status indicator. Main chat area: incoming gray speech bubbles on left, outgoing blue bubbles on right with timestamps. Bottom: rounded text input with attachment icon and mic button."
  },
  {
    id: "mobile-13",
    title: "Mobile Search & Filter Bar",
    description: "Sticky top search input with horizontal filter pill tags.",
    category: "Navigation",
    tags: ["Search", "Filters", "Header"],
    promptText: "Build a mobile search header component. Features top search input field with magnifying glass icon and clear button, followed by a horizontal scrollable row of filter chips ('Recent', 'Popular', 'Nearby', 'Rating 4.5+')."
  },
  {
    id: "mobile-14",
    title: "Onboarding Carousel View",
    description: "Multi-screen introduction onboarding swipe view with page dot indicators.",
    category: "Forms & Auth",
    tags: ["Onboarding", "Carousel", "Slider"],
    promptText: "Create a 3-step mobile onboarding screen. Top 60%: vibrant vector illustration or 3D graphic. Bottom 40%: bold headline ('Manage Tasks Seamlessly'), descriptive subtitle, pagination dot indicators, and a 'Next' / 'Get Started' button."
  },
  {
    id: "mobile-15",
    title: "User Profile Header Card",
    description: "Profile view with cover image, overlapping avatar, bio, and stats counter.",
    category: "Feeds & Cards",
    tags: ["Profile", "Header", "Stats"],
    promptText: "Design a mobile user profile header. Top cover image banner with an overlapping circular avatar. Below avatar: display name, verified checkmark badge, short bio, follow CTA button, and a 3-column stats bar (Posts, Followers, Following)."
  },
  {
    id: "mobile-16",
    title: "Segmented Control Switch",
    description: "iOS-style segmented tab toggle bar for switching sub-views.",
    category: "Navigation",
    tags: ["SegmentedControl", "Toggle", "iOS"],
    promptText: "Design a mobile Segmented Control component. Rounded pill container with soft background. Features 2-3 segment options ('Overview', 'Activity', 'Settings'). Active segment highlights with white card elevation shadow and smooth sliding animation."
  },
  {
    id: "mobile-17",
    title: "Skeleton Loading Screen",
    description: "Shimmering placeholder bones for mobile content cards during data fetch.",
    category: "Feedback & Alerts",
    tags: ["Skeleton", "Loading", "Shimmer"],
    promptText: "Create a mobile skeleton loading state. Use pulsing/shimmering light gray rounded placeholder blocks for avatars, headline bars, text lines, and image containers to maintain layout structure before data loads."
  },
  {
    id: "mobile-18",
    title: "Mobile Notification Feed",
    description: "Push notification list items with category icons and timestamps.",
    category: "Feeds & Cards",
    tags: ["Notifications", "Feed", "Alerts"],
    promptText: "Design a mobile notification center UI. Vertical list of notification cards. Unread notifications have a subtle blue highlight background and unread dot. Include category icon, sender avatar, title, body snippet, and timestamp."
  },
  {
    id: "mobile-19",
    title: "Pull-To-Refresh Layout",
    description: "Top pull gesture indicator with animated refresh spinner.",
    category: "Feeds & Cards",
    tags: ["PullToRefresh", "Gesture", "Loading"],
    promptText: "Create a Pull-to-Refresh mobile UI pattern. Top header shows pulled-down pull arrow turning into an animated circular spinner with a 'Refreshing content...' status text above the main feed list."
  },
  {
    id: "mobile-20",
    title: "Mobile Express Checkout Sheet",
    description: "Express Apple Pay / Credit Card payment bottom sheet with total summary.",
    category: "Forms & Auth",
    tags: ["Payment", "Checkout", "ApplePay"],
    promptText: "Design an Express Mobile Payment Bottom Sheet. Includes Apple Pay black button trigger, order summary breakdown (Subtotal, Shipping, Total), selected card icon, address snippet, and 'Pay $49.00' double-click confirmation step."
  },
  {
    id: "mobile-21",
    title: "Voice Assistant Sound Wave",
    description: "Waveform sound visualizer bottom sheet for voice input audio recorder.",
    category: "Forms & Auth",
    tags: ["Voice", "Audio", "AI"],
    promptText: "Build a mobile voice assistant prompt modal. Centered glowing sound wave equalizer animation (animated bars), text status 'Listening...', recognized speech transcript preview text, and a mic tap button to finish recording."
  },
  {
    id: "mobile-22",
    title: "Biometric FaceID / TouchID Popup",
    description: "System native popup for FaceID / Fingerprint authentication.",
    category: "Modals & Sheets",
    tags: ["FaceID", "Biometrics", "Security"],
    promptText: "Create a native Mobile Biometric Authentication overlay. Frosted glass popup dialog with FaceID / TouchID icon, message ('Scan Face to Confirm Login'), and 'Cancel / Use Passcode' fallback button at bottom."
  }
];

export const MOBILE_CATEGORIES: MobileCategory[] = [
  "All",
  "Navigation",
  "Forms & Auth",
  "Feeds & Cards",
  "Modals & Sheets",
  "Feedback & Alerts"
];

export default function MobileGlossary() {
  const [activeCategory, setActiveCategory] = useState<MobileCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<MobilePattern | null>(null);

  const filteredPatterns = MOBILE_PATTERNS.filter((pattern) => {
    const matchesCategory = activeCategory === "All" || pattern.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || (
      pattern.title.toLowerCase().includes(query) ||
      pattern.description.toLowerCase().includes(query) ||
      pattern.promptText.toLowerCase().includes(query) ||
      pattern.tags.some(t => t.toLowerCase().includes(query))
    );
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: string, text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryCount = (category: MobileCategory) => {
    if (category === "All") return MOBILE_PATTERNS.length;
    return MOBILE_PATTERNS.filter(p => p.category === category).length;
  };

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Header section */}
      <div className="space-y-3">
        <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black shadow-xs">
          <Smartphone className="mr-2 h-3.5 w-3.5 text-black" />
          <span>{MOBILE_PATTERNS.length} Pattern Mobile UI Ready</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-black">
          Mobile Design Glossary
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
          Glosarium visual pola antarmuka (UI) mobile modern untuk menjaga desain aplikasi Anda tetap intuitif, responsif, dan terasa native di iOS & Android.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pt-2 border-t border-gray-200">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pola mobile UI (e.g. BottomNav, Drawer, OTP, Chat, FaceID)..."
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

        {/* Counter badge */}
        <div className="text-xs font-semibold text-gray-500">
          Menampilkan <span className="text-black font-bold">{filteredPatterns.length}</span> dari {MOBILE_PATTERNS.length} pattern
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {MOBILE_CATEGORIES.map((category) => {
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

      {/* Grid of Patterns */}
      {filteredPatterns.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center space-y-3">
          <Layers className="mx-auto h-8 w-8 text-gray-400" />
          <h3 className="text-lg font-bold text-black">Pattern tidak ditemukan</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Tidak ada pattern mobile UI yang cocok dengan "{searchQuery}". Coba kata kunci lain.
          </p>
          <Button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} variant="outline" className="mt-2 text-xs">
            Reset Filter
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredPatterns.map((pattern) => {
            const isCopied = copiedId === pattern.id;
            return (
              <div 
                key={pattern.id} 
                onClick={() => setSelectedPattern(pattern)}
                className="group relative flex flex-col bg-white rounded-2xl border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-black/20 cursor-pointer"
              >
                {/* Abstract Visual Header (Wireframe Phone Mockup) */}
                <div className="h-44 w-full rounded-xl bg-gray-50 border border-gray-100 mb-4 flex items-center justify-center relative overflow-hidden p-2 transition-colors duration-300 group-hover:bg-gray-100/60">
                  <Wireframe id={pattern.id} />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white p-1.5 rounded-lg">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {pattern.category}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      MOBILE UI
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-black mb-1 tracking-tight group-hover:text-black/80 transition-colors">
                    {pattern.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {pattern.description}
                  </p>

                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                    {pattern.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action */}
                  <div className="pt-3 border-t border-gray-100 flex gap-2">
                    <Button 
                      onClick={(e) => handleCopy(pattern.id, pattern.promptText, e)}
                      variant={isCopied ? "default" : "outline"}
                      className={`flex-1 text-xs justify-center transition-all h-9 ${isCopied ? 'bg-black text-white' : 'border-gray-200 text-black hover:bg-gray-50'}`}
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

      {/* Pattern Detail Modal */}
      {selectedPattern && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black text-white">
                    {selectedPattern.category}
                  </span>
                  {selectedPattern.tags.map(t => (
                    <span key={t} className="text-[10px] text-gray-500 font-medium">#{t}</span>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-black">{selectedPattern.title}</h2>
                <p className="text-xs text-gray-500">{selectedPattern.description}</p>
              </div>
              <button 
                onClick={() => setSelectedPattern(null)}
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
                  Mobile UI Prompt Blueprint (Siap Pakai untuk AI)
                </label>
                <span className="text-[11px] text-gray-400">Standar Prompting Mobile</span>
              </div>

              <div className="bg-gray-950 text-gray-100 p-4 rounded-xl font-mono text-xs leading-relaxed border border-gray-800 shadow-inner relative group">
                {selectedPattern.promptText}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
              <Button onClick={() => setSelectedPattern(null)} variant="ghost" className="text-xs text-gray-600">
                Tutup
              </Button>
              <Button 
                onClick={() => handleCopy(selectedPattern.id, selectedPattern.promptText)}
                className="bg-black text-white hover:bg-black/90 text-xs px-5 shadow-sm"
              >
                {copiedId === selectedPattern.id ? (
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
