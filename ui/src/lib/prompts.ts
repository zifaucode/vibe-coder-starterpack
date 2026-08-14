import { 
  SplitSquareHorizontal, 
  SquareAsterisk, 
  LayoutList, 
  Columns3, 
  Rocket, 
  ImagePlay, 
  LayoutDashboard, 
  BarChart4, 
  Grid3x3,
  MessageSquareQuote,
  PanelTop,
  PanelBottom,
  Mail,
  Search,
  ShoppingBag,
  Zap,
  Layers,
  Bell,
  Sliders,
  Users,
  ShieldCheck,
  CreditCard,
  Sparkles,
  Terminal,
  Kanban,
  Cookie
} from "lucide-react";

export type Category = 
  | "All" 
  | "Hero Sections" 
  | "Nav & Headers" 
  | "Auth & Forms" 
  | "Feature Grids" 
  | "Pricing & Plans" 
  | "Dashboards" 
  | "Testimonials" 
  | "Footers" 
  | "E-Commerce" 
  | "Modals & Popups" 
  | "CTA & Banners";

export interface PromptItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  icon: any;
  promptText: string;
}

export const PROMPTS: PromptItem[] = [
  // HERO SECTIONS
  {
    id: "hero-1",
    title: "Centered Minimalist Hero",
    description: "Big bold typography headline, subtitle, avatar stack, and dual CTA buttons.",
    category: "Hero Sections",
    tags: ["Hero", "Typography", "Minimal"],
    icon: Rocket,
    promptText: "Create a centered hero section with an oversized, high-contrast bold headline (max 3 lines). Add a muted subtitle, a live user avatar stack with 'Joined by 10k+ developers' badge, and dual CTA buttons (solid black primary + glass secondary with icon). Background should feature a subtle radial grid overlay."
  },
  {
    id: "hero-2",
    title: "Split Hero + App Mockup",
    description: "Two-column layout with copy on left and floating glassmorphism dashboard frame on right.",
    category: "Hero Sections",
    tags: ["Hero", "2-Column", "SaaS"],
    icon: ImagePlay,
    promptText: "Build a split-screen SaaS hero section. Left side: category badge pill, gradient text headline, bullet points with checkmarks, and email input signup form. Right side: floating tilted 3D dark-mode app preview mockup with subtle drop shadow and ambient neon background glow."
  },
  {
    id: "hero-3",
    title: "Video Trigger Hero",
    description: "Headline layout with video thumbnail popup trigger and live metrics ticker.",
    category: "Hero Sections",
    tags: ["Hero", "Video", "Interactive"],
    icon: Rocket,
    promptText: "Design a modern hero section featuring a centered headline and a prominent video thumbnail card with a glowing Play button overlay. Include a bottom marquee bar with dynamic metrics (e.g. 99.9% Uptime, 50M+ API requests, 4.9 Star Rating)."
  },
  {
    id: "hero-4",
    title: "Interactive Code Preview Hero",
    description: "Hero section with live code switcher (React, Vue, Svelte) and instant terminal copy.",
    category: "Hero Sections",
    tags: ["Hero", "Code", "Developer"],
    icon: Terminal,
    promptText: "Build a developer-focused hero section. Left side contains catchy developer title, subtext, and quick terminal install command line (`pnpm add vibe-coder`). Right side displays an interactive code editor preview box with language switcher tabs (React, Vue, Svelte)."
  },

  // NAV & HEADERS
  {
    id: "nav-1",
    title: "Floating Glassmorphism Navbar",
    description: "Translucent pill-shaped navigation bar floating at the top of the viewport.",
    category: "Nav & Headers",
    tags: ["Nav", "Glassmorphism", "Sticky"],
    icon: PanelTop,
    promptText: "Create a floating pill navbar positioned 16px from the top. Use backdrop-blur-md, soft white border, and 80% opacity fill. Include brand logo on left, centered hover-animated navigation items, and a compact 'Get Started' action button on the right."
  },
  {
    id: "nav-2",
    title: "Mega Menu Header",
    description: "Rich header with multi-column dropdown mega menu for products & resources.",
    category: "Nav & Headers",
    tags: ["Nav", "Dropdown", "MegaMenu"],
    icon: Layers,
    promptText: "Design a desktop mega menu header. Clicking or hovering 'Products' reveals a wide 3-column dropdown: Column 1 for Core Features with icons & descriptions, Column 2 for Solutions, and Column 3 for Featured Blog Posts with image thumbnails."
  },
  {
    id: "nav-3",
    title: "Command Palette Header",
    description: "Minimal header featuring an interactive search bar with Ctrl+K shortcut key pill.",
    category: "Nav & Headers",
    tags: ["Nav", "Search", "Cmd+K"],
    icon: Search,
    promptText: "Build a developer-focused top header. Include logo on left, a quick-search trigger bar in the center styled like a command palette trigger (`Search docs... [Ctrl+K]`), notification bell icon, and user profile dropdown menu on the right."
  },
  {
    id: "nav-4",
    title: "Header with Top Announcement Banner",
    description: "Top dismissible promotional banner pill above a clean sticky header bar.",
    category: "Nav & Headers",
    tags: ["Nav", "Banner", "Promo"],
    icon: Bell,
    promptText: "Create a website header with a top dismissible notification banner. The top bar is a black pill banner reading '🚀 v2.0 is out! Read the announcement →'. Below it sits a clean 100% width sticky header with logo, navigation links, and action buttons."
  },

  // AUTH & FORMS
  {
    id: "auth-1",
    title: "Split-Screen Auth Panel",
    description: "Login form on one side, dynamic mesh gradient branding display on the other.",
    category: "Auth & Forms",
    tags: ["Auth", "Split", "Form"],
    icon: SplitSquareHorizontal,
    promptText: "Create a split-screen authentication layout. Left half: minimalist login form with Google/GitHub OAuth buttons, email & password inputs with toggle visibility icon. Right half: vibrant mesh gradient container displaying customer quote testimonial."
  },
  {
    id: "auth-2",
    title: "Glassmorphism Auth Card",
    description: "Centered login/register card floating over blurred ambient backdrop.",
    category: "Auth & Forms",
    tags: ["Auth", "Card", "Glassmorphism"],
    icon: SquareAsterisk,
    promptText: "Design a floating glassmorphism login card centered on screen. Features frosted background (`backdrop-blur-xl`), subtle border, tab switcher between 'Sign In' and 'Create Account', input validation states, and a remember me checkbox."
  },
  {
    id: "auth-3",
    title: "Multi-Step Wizard Form",
    description: "Step-by-step wizard form with progress bar and step indicators.",
    category: "Auth & Forms",
    tags: ["Form", "Wizard", "Multi-Step"],
    icon: LayoutList,
    promptText: "Build a multi-step onboarding wizard (Step 1: Account Info, Step 2: Workspace Setup, Step 3: Team Invites). Include a top step progress bar with animated active states, back/next navigation controls, and validation summary."
  },
  {
    id: "auth-4",
    title: "Passwordless Magic Link Auth",
    description: "Email-only login form with instant magic link sending feedback animation.",
    category: "Auth & Forms",
    tags: ["Auth", "MagicLink", "Minimal"],
    icon: Mail,
    promptText: "Design a passwordless magic link login interface. Single prominent email input field, 'Send Magic Link' button, and social OAuth options below. After submission, smoothly transition to a 'Check Your Inbox' success state with animated email icon."
  },

  // FEATURE GRIDS & BENTO
  {
    id: "bento-1",
    title: "Interactive Bento Box Grid",
    description: "Asymmetrical 3x3 grid featuring live micro-widgets, code snippets, and animations.",
    category: "Feature Grids",
    tags: ["Bento", "Grid", "Modern"],
    icon: Grid3x3,
    promptText: "Design a Bento Grid feature section with 5 items of varying spans. Item 1 (wide): live interactive graph widget. Item 2 (tall): vertical feature card with icon. Item 3: mini terminal code preview. Item 4: customer rating counter. Use subtle borders and hover lift effects."
  },
  {
    id: "bento-2",
    title: "Tabbed Feature Showcase",
    description: "Interactive tab navigation switching between full-width feature screenshots.",
    category: "Feature Grids",
    tags: ["Feature", "Tabs", "Showcase"],
    icon: Layers,
    promptText: "Create a tabbed feature showcase section. Top row: 4 category tabs ('Analytics', 'Automation', 'Security', 'Integrations'). Clicking a tab smoothly transitions the main view to display feature copy alongside a high-res app preview screen."
  },
  {
    id: "bento-3",
    title: "Alternating Feature Rows",
    description: "Zig-zag layout featuring copy on one side and interactive visual mockups on the other.",
    category: "Feature Grids",
    tags: ["Feature", "Rows", "2-Column"],
    icon: LayoutList,
    promptText: "Build a 3-row alternating feature section. Row 1: text left, screenshot right. Row 2: screenshot left, text right. Row 3: text left, video preview right. Include highlighted key benefit tags and 'Learn more →' links on each row."
  },
  {
    id: "bento-4",
    title: "3D Glassmorphism Cards Grid",
    description: "Grid of feature cards with 3D tilt effects, ambient glow borders, and badges.",
    category: "Feature Grids",
    tags: ["Feature", "3D", "Glassmorphism"],
    icon: Sparkles,
    promptText: "Build a 3-column feature card grid featuring 3D glassmorphism hover tilt effects. Cards have dark translucent backgrounds, subtle gradient border highlights, colorful icon badges, and short punchy feature bullet points."
  },

  // PRICING & PLANS
  {
    id: "pricing-1",
    title: "3-Tier SaaS Pricing Cards",
    description: "Hobby, Pro, and Enterprise cards with monthly/yearly discount toggle.",
    category: "Pricing & Plans",
    tags: ["Pricing", "Cards", "SaaS"],
    icon: Columns3,
    promptText: "Create a 3-tier pricing section (Starter, Pro, Enterprise). Include a top Monthly/Yearly toggle switch with a 'Save 20%' badge. Highlight the middle 'Pro' card with a solid black border, 'Most Popular' badge pill, and expanded feature check list."
  },
  {
    id: "pricing-2",
    title: "Feature Comparison Matrix",
    description: "Detailed feature breakdown table with sticky plan headers and checkmarks.",
    category: "Pricing & Plans",
    tags: ["Pricing", "Table", "Matrix"],
    icon: LayoutList,
    promptText: "Design a comprehensive pricing feature comparison table. Sticky header row with plan titles and prices. Rows grouped by category (e.g. Usage Limits, Security, Support) with checkmark icons for supported features and dashes for excluded ones."
  },
  {
    id: "pricing-3",
    title: "Slider Calculator Pricing",
    description: "Interactive slider component calculating estimated price based on monthly active users.",
    category: "Pricing & Plans",
    tags: ["Pricing", "Interactive", "Slider"],
    icon: Sliders,
    promptText: "Build a usage-based pricing calculator. Features a range slider for selecting Monthly Active Users (1k to 1M). Displays live dynamic price calculation, breakdown of included limits, and a custom enterprise contact CTA if slider hits max."
  },
  {
    id: "pricing-4",
    title: "Enterprise Custom Quote Card",
    description: "Dedicated enterprise tier card with custom SLA requirements contact form.",
    category: "Pricing & Plans",
    tags: ["Pricing", "Enterprise", "Contact"],
    icon: CreditCard,
    promptText: "Create a high-converting Enterprise Pricing Card section. Large horizontal card with dark theme: displays custom SLA guarantees, dedicated account manager badge, SSO/SAML support, and a 'Contact Sales' direct modal form button."
  },

  // DASHBOARDS
  {
    id: "dashboard-1",
    title: "Sidebar + Summary Metrics",
    description: "Classic SaaS admin panel with collapsible sidebar, KPI cards, and data table.",
    category: "Dashboards",
    tags: ["Dashboard", "Sidebar", "KPI"],
    icon: LayoutDashboard,
    promptText: "Create a full dashboard layout. Dark collapsible left sidebar with navigation icons. Main workspace: top stats bar (Revenue, Active Users, Conversions, Bounce Rate) with mini sparklines, followed by a recent transactions data table."
  },
  {
    id: "dashboard-2",
    title: "Analytics Grid Focus",
    description: "Data-heavy analytics dashboard with revenue charts, donut charts, and activity feeds.",
    category: "Dashboards",
    tags: ["Dashboard", "Analytics", "Charts"],
    icon: BarChart4,
    promptText: "Design a data analytics dashboard layout. Top row: date range picker and filter dropdowns. Main body: 2/3 area for line revenue trend chart, 1/3 area for traffic sources donut chart, and bottom section for live audit log activity feed."
  },
  {
    id: "dashboard-3",
    title: "Kanban Task Board Workspace",
    description: "Interactive Kanban board with drag-and-drop task columns (To Do, In Progress, Done).",
    category: "Dashboards",
    tags: ["Dashboard", "Kanban", "Tasks"],
    icon: Kanban,
    promptText: "Design a Kanban project management dashboard UI. Top workspace header with team avatar members and filter pills. Main board divided into 3 columns (To Do, In Progress, Done). Cards feature priority color pills, task title, tags, and assigned user avatars."
  },

  // TESTIMONIALS
  {
    id: "testimonial-1",
    title: "Masonry Reviews Grid",
    description: "Staggered multi-column customer review cards with star ratings and avatar badges.",
    category: "Testimonials",
    tags: ["Testimonial", "Masonry", "SocialProof"],
    icon: MessageSquareQuote,
    promptText: "Create a staggered masonry grid of customer testimonial cards. Each card includes 5 star icons, quote body in readable typography, customer avatar, name, handle, and verified purchaser checkmark badge."
  },
  {
    id: "testimonial-2",
    title: "Logo Marquee + Featured Story",
    description: "Infinite logo ticker banner paired with a highlighted customer success story card.",
    category: "Testimonials",
    tags: ["Testimonial", "Marquee", "Logos"],
    icon: Users,
    promptText: "Design a social proof section. Top: infinite scrolling logo marquee of top tech companies. Bottom: featured case study card with company metric result ('+340% Conversion Rate') and video testimonial player button."
  },
  {
    id: "testimonial-3",
    title: "Interactive Customer Video Reel",
    description: "Horizontal reel of customer video reviews with play modal triggers.",
    category: "Testimonials",
    tags: ["Testimonial", "Video", "Reel"],
    icon: MessageSquareQuote,
    promptText: "Build a customer video testimonial section. Horizontal scroll view of portrait video thumbnail cards (TikTok/Reel format). Each card displays customer photo overlay, company logo, short snippet quote, and Play video button."
  },

  // FOOTERS
  {
    id: "footer-1",
    title: "Multi-Column Mega Footer",
    description: "Complete footer with newsletter subscription form, link columns, and system status indicator.",
    category: "Footers",
    tags: ["Footer", "MegaFooter", "Newsletter"],
    icon: PanelBottom,
    promptText: "Create a multi-column mega footer. Top half: newsletter subscription box with instant feedback. Bottom half: 4 link columns (Product, Company, Resources, Legal), social icon bar, and green 'All Systems Operational' status badge."
  },
  {
    id: "footer-2",
    title: "Minimalist Single-Row Footer",
    description: "Clean bottom bar with brand copyright, minimal nav links, and theme toggle.",
    category: "Footers",
    tags: ["Footer", "Minimal", "Simple"],
    icon: PanelBottom,
    promptText: "Build a minimalist single-row footer. Includes company logo and copyright info on the left, horizontal inline links in the middle, and social icon buttons + region selector dropdown on the right."
  },
  {
    id: "footer-3",
    title: "Dark Theme Newsletter Footer",
    description: "Dark mode footer featuring newsletter input, social icons grid, and language picker.",
    category: "Footers",
    tags: ["Footer", "DarkMode", "Newsletter"],
    icon: PanelBottom,
    promptText: "Design a sleek dark-mode footer. Large email newsletter signup input with glowing submit button, 5 link columns with subtle hover text animations, social media icon grid, and language/currency selector dropdown."
  },

  // E-COMMERCE
  {
    id: "ecommerce-1",
    title: "Product Grid with Quick Add",
    description: "Clean e-commerce product card grid with hover image swap, price, and Quick Add CTA.",
    category: "E-Commerce",
    tags: ["E-Commerce", "ProductCard", "Shop"],
    icon: ShoppingBag,
    promptText: "Design a 4-column product grid for an e-commerce shop. Each card features image hover swap effect, sale tag pill ('20% OFF'), product title, price, rating stars, and a sliding 'Quick Add to Cart' button on hover."
  },
  {
    id: "ecommerce-2",
    title: "Shopping Cart Drawer",
    description: "Slide-over side drawer showing selected cart items, promo input, and checkout button.",
    category: "E-Commerce",
    tags: ["E-Commerce", "Cart", "Drawer"],
    icon: ShoppingBag,
    promptText: "Build an e-commerce slide-over cart drawer. Features header with item count, scrollable list of cart items with quantity stepper, promo code input field, subtotal breakdown, and primary 'Proceed to Checkout' button."
  },
  {
    id: "ecommerce-3",
    title: "Product Detail Page (PDP)",
    description: "Product detail view with multi-image gallery thumbnail picker, variant selector, and reviews.",
    category: "E-Commerce",
    tags: ["E-Commerce", "PDP", "Gallery"],
    icon: ShoppingBag,
    promptText: "Create an e-commerce Product Detail Page (PDP) layout. Left 50%: main image preview with 4 thumbnail selector cards. Right 50%: product title, star rating counter, price, color variant pills, size selector buttons, and 'Add to Bag' CTA."
  },

  // MODALS & POPUPS
  {
    id: "modal-1",
    title: "Exit-Intent Newsletter Modal",
    description: "Attention-grabbing modal popup with promo code reward for email subscription.",
    category: "Modals & Popups",
    tags: ["Modal", "Popup", "Newsletter"],
    icon: Mail,
    promptText: "Design an exit-intent newsletter modal popup. Backdrop overlay darkens screen. Modal contains high-impact illustration, headline ('Get 15% Off Your First Order'), email input field, submit button, and a muted 'No thanks' dismiss button."
  },
  {
    id: "modal-2",
    title: "Destructive Action Dialog",
    description: "Confirmation alert dialog for critical user actions with double verification.",
    category: "Modals & Popups",
    tags: ["Modal", "Dialog", "Alert"],
    icon: ShieldCheck,
    promptText: "Create a destructive action confirmation modal (e.g. Delete Workspace). Features red alert icon, clear warning message, text input requiring typing 'DELETE' to confirm, cancel button, and red primary confirm button."
  },
  {
    id: "modal-3",
    title: "Cookie Consent Banner",
    description: "Bottom sticky privacy cookie preferences bar with Customize and Accept All buttons.",
    category: "Modals & Popups",
    tags: ["Cookie", "Privacy", "Banner"],
    icon: Cookie,
    promptText: "Design a GDPR Cookie Consent banner. Sticky bar anchored at bottom of screen with frosted glass background. Features cookie icon, concise privacy notice, 'Customize Preferences' text link, and primary 'Accept All Cookies' button."
  },

  // CTA & BANNERS
  {
    id: "cta-1",
    title: "Gradient Glow CTA Card",
    description: "Full-width call-to-action banner with glowing background, headline, and primary action.",
    category: "CTA & Banners",
    tags: ["CTA", "Banner", "Glow"],
    icon: Zap,
    promptText: "Build a full-width CTA section. Rounded container with dark background and vibrant purple/blue radial glow. Centered headline 'Ready to scale your app?', subtitle, avatar stack of active users, and glowing CTA button."
  },
  {
    id: "cta-2",
    title: "Infinite Marquee Headline CTA",
    description: "High-impact CTA banner featuring an infinite scrolling text marquee background.",
    category: "CTA & Banners",
    tags: ["CTA", "Marquee", "Banner"],
    icon: Zap,
    promptText: "Create a high-energy CTA section. Features a giant scrolling text marquee ('BUILD FASTER • SHIP FASTER • SCALE FASTER') as backdrop. Centered overlay card holds a high-contrast headline, subtext, and primary action button."
  }
];

export const CATEGORIES: Category[] = [
  "All", 
  "Hero Sections", 
  "Nav & Headers", 
  "Auth & Forms", 
  "Feature Grids", 
  "Pricing & Plans", 
  "Dashboards", 
  "Testimonials", 
  "Footers", 
  "E-Commerce", 
  "Modals & Popups", 
  "CTA & Banners"
];
