import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import Wireframe from "@/components/Wireframe";

export default function MobileGlossary() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const patterns = [
    {
      id: "mobile-1",
      title: "Mobile Splash Screen",
      description: "App opening screen with branding and loader.",
      promptText: "Design a mobile app splash screen. Center the app logo prominently. Use a vibrant gradient background or a high-quality blurred image. At the bottom, place a subtle, elegant loading spinner or progress bar. Ensure the overall feel is welcoming and fluid, setting the tone for the application."
    },
    {
      id: "mobile-2",
      title: "Bottom Navigation",
      description: "Standard 4-tab bottom navigation bar for mobile apps.",
      promptText: "Create a mobile bottom navigation bar with 4 distinct tabs (e.g., Home, Search, Notifications, Profile). The active tab should be highlighted with a solid icon and a subtle background pill or indicator dot, while inactive tabs use outlined icons in a muted gray color. The bar should have a slight top shadow to separate it from the main content area."
    },
    {
      id: "mobile-3",
      title: "Mobile Settings List",
      description: "Grouped list items for app preferences.",
      promptText: "Design a mobile Settings page. Use a grouped list layout where related settings (e.g., Account, Notifications, Privacy) are clustered together in rounded cards. Each list item should have an icon on the left, the setting name in the center, and a UI control on the right (like a chevron for navigation, or a toggle switch). Keep the background color slightly off-white to make the white cards pop."
    },
    {
      id: "mobile-4",
      title: "Hamburger Menu",
      description: "Hidden side drawer for secondary navigation.",
      promptText: "Create a mobile side drawer (hamburger menu) layout. The drawer should slide in from the left covering 80% of the screen. Include a user profile header with avatar and email, followed by a vertical list of navigation links with icons. Ensure the remaining 20% of the screen shows a dark semi-transparent overlay to indicate it can be tapped to close."
    },
    {
      id: "mobile-5",
      title: "Snackbar",
      description: "Temporary, lightweight feedback messages at the bottom.",
      promptText: "Design a mobile UI showing a 'Snackbar' toast notification. The snackbar should hover slightly above the bottom of the screen (or above the bottom nav). It should be a dark, pill-shaped container containing a short success message on the left and an 'UNDO' action button in an accent color on the right."
    },
    {
      id: "mobile-6",
      title: "Modal / Dialog",
      description: "Overlay that interrupts the user for a critical action.",
      promptText: "Create a mobile confirmation dialog modal. The modal should be centered on the screen over a dark overlay. It should have rounded corners, a bold title (e.g., 'Delete Account?'), a short descriptive text, and two full-width buttons stacked vertically at the bottom: a primary destructive button (red) and a secondary cancel button (gray/ghost)."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-black">
          Mobile Design Glossary
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          An interactive visual glossary of essential mobile UI patterns to keep your app designs native and fluid.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {patterns.map((pattern) => {
          const isCopied = copiedId === pattern.id;
          return (
            <div 
              key={pattern.id} 
              className="group relative flex flex-col bg-white rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-black/20"
            >
              {/* Abstract Visual Header (Wireframe) */}
              <div className="h-40 w-full rounded-xl bg-gray-50 border border-gray-100 mb-5 flex items-center justify-center relative overflow-hidden p-3 transition-colors duration-300 group-hover:bg-gray-100/50">
                <Wireframe id={pattern.id} />
              </div>
              
              {/* Content */}
              <div className="flex-1 flex flex-col">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">MOBILE UI</p>
                <h3 className="text-lg font-bold text-black mb-2 tracking-tight leading-tight">{pattern.title}</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed italic">
                  {pattern.description}
                </p>
                
                <div className="mt-auto">
                  <Button 
                    onClick={() => handleCopy(pattern.id, pattern.promptText)}
                    variant={isCopied ? "default" : "outline"}
                    className={`w-full transition-all duration-300 ${isCopied ? 'bg-black text-white hover:bg-black' : 'border-gray-200 text-black hover:bg-gray-50'}`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
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
