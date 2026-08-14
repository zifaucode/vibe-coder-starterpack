import { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import Dashboard from "./pages/Dashboard"
import Introduction from "./pages/Introduction"
import StackTech from "./pages/StackTech"
import Deploy from "./pages/Deploy"
import JsonFormatter from "./pages/Developer/JsonFormatter"
import RegexTester from "./pages/Developer/RegexTester"
import Base64Tool from "./pages/Developer/Base64Tool"
import ColorPicker from "./pages/Design/ColorPicker"
import MobileGlossary from "./pages/Design/MobileGlossary"
import PromptLibrary from "./pages/Resources/PromptLibrary"
import UiUxGuide from "./pages/Design/UiUxGuide"
import CommandPalette from "./components/CommandPalette"
import { LayoutDashboard, Pipette, Code, Boxes, Search, Fingerprint, Smartphone, BookOpen, Layers, Rocket, LayoutTemplate, Command } from "lucide-react"

export default function App() {
  const [appName, setAppName] = useState("VCS")
  const [activeTab, setActiveTab] = useState("introduction")
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  useEffect(() => {
    // Global Ctrl+K or Cmd+K listener
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsCommandPaletteOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)

    // Wait for pywebview to inject its API
    window.addEventListener("pywebviewready", () => {
      // @ts-ignore
      const api = window.pywebview?.api
      if (api) {
        api.get_system_info().then(() => {
          setAppName("VCS")
        })
      }
    })
    
    // @ts-ignore
    if (window.pywebview && window.pywebview.api && typeof window.pywebview.api.get_system_info === 'function') {
      // @ts-ignore
      window.pywebview.api.get_system_info().then(() => {
        setAppName("VCS")
      })
    }

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown)
    }
  }, [])

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />

      {/* Sidebar - Minimalist Black & White */}
      <aside className="w-[280px] border-r bg-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/vcs-logo.png" alt="VCS Logo" className="w-9 h-9 rounded-xl object-cover border border-black shadow-xs flex-shrink-0" />
            <h1 className="text-xl font-black text-black tracking-tight">{appName}</h1>
          </div>
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            title="Cari Modul (Ctrl + K)"
            className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-xl text-gray-700 transition-all cursor-pointer border border-gray-200"
          >
            <Command className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5">
          <Button 
            onClick={() => setActiveTab("dashboard")}
            variant={activeTab === "dashboard" ? "secondary" : "ghost"} 
            className={`justify-start font-medium h-10 px-3 ${activeTab === "dashboard" ? "bg-black text-white hover:bg-black/80" : "text-gray-600 hover:text-black hover:bg-gray-100"}`}
          >
            <LayoutDashboard className="mr-3 h-4 w-4" />
            Dashboard
          </Button>

          <div className="pt-6 pb-2 px-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Getting Started</p>
          </div>
          <Button 
            onClick={() => setActiveTab("introduction")}
            variant={activeTab === "introduction" ? "secondary" : "ghost"} 
            className={`justify-start font-medium h-10 px-3 ${activeTab === "introduction" ? "bg-black text-white hover:bg-black/80" : "text-gray-600 hover:text-black hover:bg-gray-100"}`}
          >
            <BookOpen className="mr-3 h-4 w-4" />
            Introduction
          </Button>
          <Button 
            onClick={() => setActiveTab("stacktech")}
            variant={activeTab === "stacktech" ? "secondary" : "ghost"} 
            className={`justify-start font-medium h-10 px-3 ${activeTab === "stacktech" ? "bg-black text-white hover:bg-black/80" : "text-gray-600 hover:text-black hover:bg-gray-100"}`}
          >
            <Layers className="mr-3 h-4 w-4" />
            StackTech
          </Button>
          <Button 
            onClick={() => setActiveTab("deploy")}
            variant={activeTab === "deploy" ? "secondary" : "ghost"} 
            className={`justify-start font-medium h-10 px-3 ${activeTab === "deploy" ? "bg-black text-white hover:bg-black/80" : "text-gray-600 hover:text-black hover:bg-gray-100"}`}
          >
            <Rocket className="mr-3 h-4 w-4" />
            Production / Deploy
          </Button>

          <div className="pt-6 pb-2 px-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Design</p>
          </div>
          <Button 
            onClick={() => setActiveTab("color-picker")}
            variant={activeTab === "color-picker" ? "secondary" : "ghost"} 
            className={`justify-start font-medium h-10 px-3 ${activeTab === "color-picker" ? "bg-black text-white hover:bg-black/80" : "text-gray-600 hover:text-black hover:bg-gray-100"}`}
          >
            <Pipette className="mr-3 h-4 w-4" />
            Color Picker
          </Button>
          <Button 
            onClick={() => setActiveTab("mobile-glossary")}
            variant={activeTab === "mobile-glossary" ? "secondary" : "ghost"} 
            className={`justify-start font-medium h-10 px-3 ${activeTab === "mobile-glossary" ? "bg-black text-white hover:bg-black/80" : "text-gray-600 hover:text-black hover:bg-gray-100"}`}
          >
            <Smartphone className="mr-3 h-4 w-4" />
            Mobile Glossary
          </Button>
          <Button 
            onClick={() => setActiveTab("prompt-library")}
            variant={activeTab === "prompt-library" ? "secondary" : "ghost"} 
            className={`justify-start font-medium h-10 px-3 ${activeTab === "prompt-library" ? "bg-black text-white hover:bg-black/80" : "text-gray-600 hover:text-black hover:bg-gray-100"}`}
          >
            <Boxes className="mr-3 h-4 w-4" />
            Web Components
          </Button>
          <Button 
            onClick={() => setActiveTab("ui-ux-guide")}
            variant={activeTab === "ui-ux-guide" ? "secondary" : "ghost"} 
            className={`justify-start font-medium h-10 px-3 ${activeTab === "ui-ux-guide" ? "bg-black text-white hover:bg-black/80" : "text-gray-600 hover:text-black hover:bg-gray-100"}`}
          >
            <LayoutTemplate className="mr-3 h-4 w-4" />
            UI/UX Guide
          </Button>

          <div className="pt-6 pb-2 px-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Developer</p>
          </div>
          <Button 
            onClick={() => setActiveTab("json-formatter")}
            variant={activeTab === "json-formatter" ? "secondary" : "ghost"} 
            className={`justify-start font-medium h-10 px-3 ${activeTab === "json-formatter" ? "bg-black text-white hover:bg-black/80" : "text-gray-600 hover:text-black hover:bg-gray-100"}`}
          >
            <Code className="mr-3 h-4 w-4" />
            JSON Formatter
          </Button>
          <Button 
            onClick={() => setActiveTab("regex-tester")}
            variant={activeTab === "regex-tester" ? "secondary" : "ghost"} 
            className={`justify-start font-medium h-10 px-3 ${activeTab === "regex-tester" ? "bg-black text-white hover:bg-black/80" : "text-gray-600 hover:text-black hover:bg-gray-100"}`}
          >
            <Search className="mr-3 h-4 w-4" />
            Regex Tester
          </Button>
          <Button 
            onClick={() => setActiveTab("base64-tool")}
            variant={activeTab === "base64-tool" ? "secondary" : "ghost"} 
            className={`justify-start font-medium h-10 px-3 ${activeTab === "base64-tool" ? "bg-black text-white hover:bg-black/80" : "text-gray-600 hover:text-black hover:bg-gray-100"}`}
          >
            <Fingerprint className="mr-3 h-4 w-4" />
            Base64 Tool
          </Button>
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-10 flex flex-col items-center justify-start bg-[#FAFAFA] overflow-y-auto">
        {activeTab === "dashboard" && (
          <Dashboard
            onNavigateTab={(tabId) => setActiveTab(tabId)}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
        )}
        {activeTab === "introduction" && <Introduction />}
        {activeTab === "stacktech" && <StackTech />}
        {activeTab === "deploy" && <Deploy />}
        {activeTab === "json-formatter" && <JsonFormatter />}
        {activeTab === "regex-tester" && <RegexTester />}
        {activeTab === "base64-tool" && <Base64Tool />}
        {activeTab === "color-picker" && <ColorPicker />}
        {activeTab === "mobile-glossary" && <MobileGlossary />}
        {activeTab === "prompt-library" && <PromptLibrary />}
        {activeTab === "ui-ux-guide" && <UiUxGuide />}
      </main>
    </div>
  )
}
