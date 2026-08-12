import { 
  SplitSquareHorizontal, 
  SquareAsterisk, 
  LayoutList, 
  CreditCard, 
  Columns3, 
  MonitorPlay, 
  Rocket, 
  ImagePlay, 
  LayoutDashboard, 
  BarChart4, 
  Grid3x3,
  MessageSquareQuote,
  HelpCircle,
  PanelTop,
  PanelBottom,
  Mail,
  Code,
  Fingerprint
} from "lucide-react";

export type Category = "All" | "Auth" | "Pricing" | "Hero" | "Dashboards" | "Bento" | "Testimonials" | "FAQ" | "Nav Bars" | "Footer" | "Contact" | "Dev Tools";

export interface PromptItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  icon: any; // Lucide icon component
  promptText: string;
}

export const PROMPTS: PromptItem[] = [
  {
    id: "auth-1",
    title: "Split-screen Auth",
    description: "Form fields on one side, visual branding panel on the other.",
    category: "Auth",
    icon: SplitSquareHorizontal,
    promptText: "Create a modern split-screen authentication layout. The left side should contain a clean, minimalist login form (email, password, and social login buttons). The right side should be a full-height brand showcase featuring a soft gradient mesh background and a minimal product mockup. Ensure typography is sleek (e.g., Inter) and uses a monochromatic palette with one accent color."
  },
  {
    id: "auth-2",
    title: "Centered Floating Card",
    description: "A minimalist auth card floating on a blurred background.",
    category: "Auth",
    icon: SquareAsterisk,
    promptText: "Design a centered floating authentication card on a full-viewport subtly blurred, dynamic mesh gradient background. The card itself should have a glassmorphism effect (frosted glass, slight transparency, 1px white/gray border). Include a logo at the top, email and password inputs, a primary 'Sign In' button, and a muted 'Forgot password' link."
  },
  {
    id: "auth-3",
    title: "Minimal Stack",
    description: "No outer card, just cleanly stacked fields and typography.",
    category: "Auth",
    icon: LayoutList,
    promptText: "Generate an ultra-minimalist login page without any outer card containers. Stack the logo, a large elegant heading, the form inputs, and the CTA button directly on the clean white/dark background. Use ample whitespace, high-contrast typography, and understated input fields (e.g., just bottom borders or very light fill)."
  },
  {
    id: "pricing-1",
    title: "Classic 3-Tier Pricing",
    description: "Three side-by-side tier cards with a highlighted middle option.",
    category: "Pricing",
    icon: Columns3,
    promptText: "Create a 3-tier pricing section. Display three side-by-side cards (Starter, Pro, Enterprise). The middle 'Pro' card should be visually elevated using a distinct border (e.g., a glowing accent color), slightly larger scale, and a 'Most Popular' badge. Include price, billing cycle toggle (monthly/yearly), a list of features with checkmarks, and clear CTA buttons."
  },
  {
    id: "pricing-2",
    title: "Comparison Table",
    description: "Detailed feature breakdown across multiple plans.",
    category: "Pricing",
    icon: LayoutList,
    promptText: "Design a comprehensive pricing comparison table. The columns should represent the plans (Basic, Pro, Max) and the rows should represent specific features. Use checkmarks (✓) for included features and dashes (-) for excluded ones. Style the table with subtle alternating row colors, sticky headers, and highlight the recommended plan column."
  },
  {
    id: "hero-1",
    title: "Centered Typography Hero",
    description: "Big bold headline, subtitle, and primary/secondary CTAs.",
    category: "Hero",
    icon: Rocket,
    promptText: "Create a centered hero section with an oversized, bold, and high-contrast headline spanning maximum 3 lines. Below it, add a muted, legible sub-headline. Include a row of two CTA buttons: a primary solid button and a secondary outlined button. The background should be clean, possibly with a subtle radial glow behind the text."
  },
  {
    id: "hero-2",
    title: "Side-by-side Hero",
    description: "Text on the left, interactive mockup or video on the right.",
    category: "Hero",
    icon: ImagePlay,
    promptText: "Design a two-column hero section. The left column contains the headline, subtext, CTA, and social proof avatars. The right column showcases a beautifully stylized floating UI mockup or an isometric 3D graphic. Ensure a balanced visual weight between the dense text on the left and the airy visual on the right."
  },
  {
    id: "dashboard-1",
    title: "Sidebar + Metrics Layout",
    description: "Classic dashboard with left sidebar and top-level metric cards.",
    category: "Dashboards",
    icon: LayoutDashboard,
    promptText: "Create a SaaS dashboard layout featuring a sleek, dark-mode left sidebar for navigation and a light-mode main content area. The main area should have a top bar with a search input and user profile avatar. Below that, place a row of 4 summary metric cards (showing title, value, and a small trend sparkline), followed by a wider chart or data table section."
  },
  {
    id: "dashboard-2",
    title: "Analytics Focus",
    description: "Dashboard layout emphasizing charts and data visualization.",
    category: "Dashboards",
    icon: BarChart4,
    promptText: "Design an analytics-focused dashboard. Use a top navigation bar instead of a sidebar. The main layout should be a masonry grid of data visualization widgets: a large area chart, a donut chart, and a recent activity feed. Use a consistent color palette for data series and clean, card-based containers with subtle shadows."
  },
  {
    id: "bento-1",
    title: "Bento Box Features",
    description: "A trendy asymmetrical grid showcasing features visually.",
    category: "Bento",
    icon: Grid3x3,
    promptText: "Create a 'Bento Box' style features section. Use an asymmetrical CSS grid (e.g., 3 columns, some items spanning 2 columns or 2 rows). Each grid item is a rounded card with a soft background, containing a snappy title, short description, and a stylized UI snippet or abstract illustration demonstrating the feature. Keep the layout tight with uniform gaps."
  },
  {
    id: "testimonial-1",
    title: "Masonry Testimonials",
    description: "A staggered grid of customer reviews with avatars.",
    category: "Testimonials",
    icon: MessageSquareQuote,
    promptText: "Create a testimonials section featuring a masonry layout (staggered columns). Each review is a card containing a 5-star rating, a short quote in a readable serif or clean sans-serif font, and the customer's avatar, name, and role at the bottom. Use subtle background colors for the cards to create a visually interesting, varied grid."
  },
  {
    id: "faq-1",
    title: "Accordion FAQ",
    description: "Expandable list of questions and answers.",
    category: "FAQ",
    icon: HelpCircle,
    promptText: "Design a clean, minimalist FAQ section using an accordion layout. The questions should be bold and clearly visible, with a plus/chevron icon on the right. When expanded, the answer reveals smoothly with a slide-down animation. Add a subtle border between each item to keep the layout organized."
  },
  {
    id: "nav-1",
    title: "Floating Pill Navigation",
    description: "A modern, centered navigation bar that floats at the top.",
    category: "Nav Bars",
    icon: PanelTop,
    promptText: "Create a modern top navigation bar that floats slightly below the top of the viewport. It should be a pill-shaped container with a glassmorphism effect (backdrop-blur, translucent background). Left side: Logo. Middle: Navigation links with smooth hover states. Right side: Login and a primary 'Get Started' button."
  },
  {
    id: "footer-1",
    title: "Multi-column Mega Footer",
    description: "Large footer with newsletter signup and site links.",
    category: "Footer",
    icon: PanelBottom,
    promptText: "Design a comprehensive 'mega footer'. The top half features a large newsletter signup form (heading, input, submit button). The bottom half contains a 4-column grid: Company logo/bio in column 1, and links (Product, Resources, Legal) in columns 2-4. Use a dark background to strongly separate the footer from the rest of the page."
  },
  {
    id: "contact-1",
    title: "Split Contact Page",
    description: "Contact form next to company details and map.",
    category: "Contact",
    icon: Mail,
    promptText: "Create a contact page layout split into two columns. The left column contains a clean form (Name, Email, Subject, Message, Submit Button). The right column lists company contact details (Address, Phone, Email) styled nicely with icons, followed by a stylized, monochrome map snippet."
  },
  {
    id: "dev-1",
    title: "JSON Formatter Tool",
    description: "A split-screen developer tool layout for JSON formatting.",
    category: "Dev Tools",
    icon: Code,
    promptText: "Create a UI for a developer JSON Formatter tool. It should have a clean, light-mode minimalist header. The main area is split into two equal text editors (Input on the left, Output on the right). Include a central action bar floating between them with a 'Format' button and 'Copy' button. Use a monospace font for the text areas and a clean, high-contrast border for focus states."
  },
  {
    id: "dev-2",
    title: "Regex Tester Tool",
    description: "Input fields for pattern, flags, and a live testing area.",
    category: "Dev Tools",
    icon: Search,
    promptText: "Design a Regex Tester tool UI. The layout should have a top section with a sleek, monospace input field specifically for the regular expression pattern, and a smaller dropdown/input for regex flags (e.g., /g, /i). Below that, include a large textarea for the 'Test String'. Finally, add a 'Results' panel that shows the test string with highlighted matches in a distinct accent color."
  },
  {
    id: "dev-3",
    title: "Base64 Encoder/Decoder",
    description: "A utility layout with encode/decode toggle and input/output fields.",
    category: "Dev Tools",
    icon: Fingerprint,
    promptText: "Create a UI layout for a Base64 Encoder/Decoder tool. At the top, include a toggle switch or segmented control to swap between 'Encode' and 'Decode' modes. Below it, stack two large, clean textareas ('Input' and 'Output'). Add a prominent primary button floating between the two textareas to perform the action. Keep the design minimalist with soft shadows and rounded corners."
  }
];

export const CATEGORIES: Category[] = ["All", "Auth", "Pricing", "Hero", "Dashboards", "Bento", "Testimonials", "FAQ", "Nav Bars", "Footer", "Contact", "Dev Tools"];
