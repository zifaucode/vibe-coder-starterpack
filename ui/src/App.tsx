import { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import Dashboard from "./pages/Dashboard"
import JsonFormatter from "./pages/Developer/JsonFormatter"
import RegexTester from "./pages/Developer/RegexTester"
import Base64Tool from "./pages/Developer/Base64Tool"
import ColorPicker from "./pages/Design/ColorPicker"
import MobileGlossary from "./pages/Design/MobileGlossary"
import PromptLibrary from "./pages/Resources/PromptLibrary"
import { LayoutDashboard, Pipette, Code, Library, Search, Fingerprint, Smartphone } from "lucide-react"

export default function App() {
  const [appName, setAppName] = useState("VCS")
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    // Wait for pywebview to inject its API
    window.addEventListener("pywebviewready", () => {
      // @ts-ignore
      const api = window.pywebview.api
      if (api) {
        api.get_system_info().then((info: any) => {
          // Keep it short as requested
          setAppName("VCS")
        })
      }
    })
    
    // @ts-ignore
    if (window.pywebview && window.pywebview.api && typeof window.pywebview.api.get_system_info === 'function') {
      // @ts-ignore
      window.pywebview.api.get_system_info().then((info: any) => {
        setAppName("VCS")
      })
    }
  }, [])

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar - Minimalist Black & White */}
      <aside className="w-[280px] border-r bg-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-black tracking-tight">{appName}</h1>
          <p className="text-xs text-muted-foreground mt-1">Starterpack</p>
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

          <div className="pt-6 pb-2 px-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Resources</p>
          </div>
          <Button 
            onClick={() => setActiveTab("prompt-library")}
            variant={activeTab === "prompt-library" ? "secondary" : "ghost"} 
            className={`justify-start font-medium h-10 px-3 ${activeTab === "prompt-library" ? "bg-black text-white hover:bg-black/80" : "text-gray-600 hover:text-black hover:bg-gray-100"}`}
          >
            <Library className="mr-3 h-4 w-4" />
            Prompt Library
          </Button>
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-10 flex flex-col items-center justify-start bg-[#FAFAFA] overflow-y-auto">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "json-formatter" && <JsonFormatter />}
        {activeTab === "regex-tester" && <RegexTester />}
        {activeTab === "base64-tool" && <Base64Tool />}
        {activeTab === "color-picker" && <ColorPicker />}
        {activeTab === "mobile-glossary" && <MobileGlossary />}
        {activeTab === "prompt-library" && <PromptLibrary />}
      </main>
    </div>
  )
}
