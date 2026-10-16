import { B, Bx, C, D, F, G, I, K, O, P, R, T, W, type Node } from "../components/Blueprint";
import type { LibItem } from "../components/LibraryBrowser";
import { MORE_MOBILE } from "./mobilePatternsMore";

export type MobileCategory =
  | "All"
  | "Navigation"
  | "Forms & Auth"
  | "Feeds & Cards"
  | "Modals & Sheets"
  | "Feedback & Alerts"
  | "Commerce & Payments"
  | "Media & Content"
  | "Maps & Location"
  | "Data & Insights";

type Base = Omit<LibItem, "bp" | "use" | "icon">;

const BASE: Base[] = [
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

// Kerangka berlabel untuk pola bawaan, dicari lewat id.
const BP: Record<string, Node> = {
  "mobile-1": P(K(D("Logo di tengah"), T("Nama aplikasi"), T("Bar memuat"))),
  "mobile-2": P(I("Konten layar"), R(D("Beranda (aktif)"), D("Cari"), D("Notifikasi"), D("Profil"))),
  "mobile-3": P(T("Judul Pengaturan"), Bx("Grup Akun", R(D("Ikon"), W(3, T("Nama pengaturan")), D("Panah"))), Bx("Grup Notifikasi", R(D("Ikon"), W(3, T("Nama pengaturan")), D("Saklar")))),
  "mobile-4": P(R(W(4, Bx("Drawer (80% layar)", R(D("Avatar"), T("Nama + email")), T("Menu"), T("Menu"), T("Menu"))), W(1, I("Latar gelap")))),
  "mobile-5": P(I("Konten layar"), Bx("Snackbar (mengambang di atas nav)", R(W(3, T("Pesan singkat")), O("UNDO"))), R(D("Beranda"), D("Cari"), D("Profil"))),
  "mobile-6": P(I("Layar digelapkan"), Bx("Dialog di tengah", T("Judul tebal"), T("Teks penjelas"), B("Aksi berbahaya (merah)"), O("Batal"))),
  "mobile-7": P(I("Layar digelapkan"), Bx("Bottom sheet (sekitar 60% tinggi)", D("Handle geser"), T("Judul"), T("Opsi: Bagikan"), T("Opsi: Salin tautan"), B("Aksi utama"))),
  "mobile-8": P(I("Konten layar"), C(D("Tombol mini 3"), D("Tombol mini 2"), D("Tombol mini 1")), D("Tombol + utama (kanan bawah)")),
  "mobile-9": P(R(D("Cerita Anda +"), D("Cerita 2"), D("Cerita 3")), I("Feed di bawahnya")),
  "mobile-10": P(T("Judul: masukkan kode"), T("Email atau nomor tujuan"), R(F("0"), F("0"), F("0"), F("0")), T("Kirim ulang dalam 0:45"), I("Keypad angka")),
  "mobile-11": P(I("Kartu profil besar + teks di bawahnya"), R(D("Lewati"), D("Suka super"), D("Suka"))),
  "mobile-12": P(R(D("Avatar"), T("Nama + status online")), C(T("Gelembung masuk"), T("Gelembung keluar"), T("Gelembung masuk")), R(D("Lampiran"), W(3, F("Ketik pesan")), D("Mikrofon"))),
  "mobile-13": P(R(W(3, F("Cari...")), D("Hapus")), R(D("Terbaru"), D("Populer"), D("Terdekat")), I("Hasil pencarian")),
  "mobile-14": P(I("Ilustrasi (60% atas)"), T("Judul"), T("Subjudul"), R(D("Titik halaman aktif"), D("Titik 2"), D("Titik 3")), B("Lanjut")),
  "mobile-15": P(I("Gambar sampul"), R(D("Avatar menimpa sampul"), T("Nama + centang")), T("Bio singkat"), B("Ikuti"), G(3, T("Postingan"), T("Pengikut"), T("Mengikuti"))),
  "mobile-16": P(Bx("Kontrol segmen", R(D("Ringkasan (aktif)"), D("Aktivitas"), D("Pengaturan"))), I("Konten sesuai segmen")),
  "mobile-17": P(R(D("Avatar abu"), T("Judul abu")), I("Blok gambar abu"), T("Baris teks abu"), T("Baris teks abu")),
  "mobile-18": P(T("Judul: Notifikasi"), R(D("Titik belum dibaca"), D("Ikon"), W(3, T("Judul + isi + waktu"))), R(D("Ikon"), W(3, T("Judul + isi + waktu")))),
  "mobile-19": P(D("Spinner + Memperbarui..."), T("Daftar feed"), T("Daftar feed"), T("Daftar feed")),
  "mobile-20": P(I("Layar digelapkan"), Bx("Sheet pembayaran", B("Tombol Apple Pay"), T("Ringkasan: subtotal, ongkir, total"), R(D("Kartu"), T("Alamat")), B("Bayar (konfirmasi dua kali)"))),
  "mobile-21": P(D("Gelombang suara animasi"), T("Status: Mendengarkan..."), T("Transkrip ucapan"), D("Tombol mikrofon")),
  "mobile-22": P(I("Layar digelapkan"), Bx("Popup sistem (kaca buram)", D("Ikon Face ID"), T("Pindai wajah untuk konfirmasi"), O("Batal / Pakai kode sandi"))),
};

export const MOBILE_PATTERNS: LibItem[] = [...BASE.map((p) => ({ ...p, bp: BP[p.id] })), ...MORE_MOBILE];

export const MOBILE_CATEGORIES: MobileCategory[] = [
  "All",
  "Navigation",
  "Forms & Auth",
  "Feeds & Cards",
  "Modals & Sheets",
  "Feedback & Alerts",
  "Commerce & Payments",
  "Media & Content",
  "Maps & Location",
  "Data & Insights",
];
