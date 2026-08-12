import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pipette, Copy } from "lucide-react"

// Types for EyeDropper API since it's not standard in all TS DOM libs yet
declare global {
  interface Window {
    EyeDropper: any;
  }
}

export default function ColorPicker() {
  const [hexColor, setHexColor] = useState("#000000")
  const [error, setError] = useState("")

  // Utility to convert HEX to RGB
  const hexToRgb = (hex: string) => {
    let r = 0, g = 0, b = 0
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16)
      g = parseInt(hex[2] + hex[2], 16)
      b = parseInt(hex[3] + hex[3], 16)
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16)
      g = parseInt(hex.substring(3, 5), 16)
      b = parseInt(hex.substring(5, 7), 16)
    }
    return `rgb(${r}, ${g}, ${b})`
  }

  // Utility to convert HEX to HSL
  const hexToHsl = (hex: string) => {
    let r = 0, g = 0, b = 0
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16) / 255
      g = parseInt(hex[2] + hex[2], 16) / 255
      b = parseInt(hex[3] + hex[3], 16) / 255
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16) / 255
      g = parseInt(hex.substring(3, 5), 16) / 255
      b = parseInt(hex.substring(5, 7), 16) / 255
    }

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  }

  const handlePickColor = async () => {
    if (!window.EyeDropper) {
      setError("EyeDropper API is not supported in this environment.")
      return
    }
    try {
      const eyeDropper = new window.EyeDropper()
      const result = await eyeDropper.open()
      setHexColor(result.sRGBHex)
      setError("")
    } catch (e: any) {
      // User canceled the picker
      if (e.name !== 'AbortError') {
        setError(e.message)
      }
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-xl border shadow-sm flex flex-col gap-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-black">Color Picker</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Gunakan pena untuk mengambil warna dari layar Anda.
          </p>
        </div>
        <Button 
          onClick={handlePickColor} 
          className="bg-black text-white hover:bg-black/80 gap-2 px-6"
        >
          <Pipette className="w-4 h-4" />
          Pilih Warna
        </Button>
      </div>

      {error && (
        <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex gap-8 items-start pt-4">
        {/* Color Preview Block */}
        <div 
          className="w-32 h-32 rounded-xl border-2 border-black/10 shadow-inner flex-shrink-0"
          style={{ backgroundColor: hexColor }}
        />

        {/* Color Values */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">HEX</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={hexColor.toUpperCase()} 
                readOnly 
                className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm font-mono focus-visible:outline-none"
              />
              <Button onClick={() => handleCopy(hexColor)} variant="outline" size="icon" className="h-9 w-9 flex-shrink-0">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">RGB</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={hexToRgb(hexColor)} 
                readOnly 
                className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm font-mono focus-visible:outline-none"
              />
              <Button onClick={() => handleCopy(hexToRgb(hexColor))} variant="outline" size="icon" className="h-9 w-9 flex-shrink-0">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">HSL</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={hexToHsl(hexColor)} 
                readOnly 
                className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm font-mono focus-visible:outline-none"
              />
              <Button onClick={() => handleCopy(hexToHsl(hexColor))} variant="outline" size="icon" className="h-9 w-9 flex-shrink-0">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
