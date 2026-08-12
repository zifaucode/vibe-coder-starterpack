import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function JsonFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError("")
    } catch (err: any) {
      setError(err.message || "Invalid JSON")
    }
  }

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError("")
    } catch (err: any) {
      setError(err.message || "Invalid JSON")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    // Optional: Show toast notification here
  }

  return (
    <div className="w-full max-w-5xl bg-white p-8 rounded-xl border shadow-sm flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-black">JSON Formatter</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Beautify, minify, and validate your JSON data.
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <Button onClick={handleFormat} variant="default" className="bg-black text-white hover:bg-black/80">
          Format
        </Button>
        <Button onClick={handleMinify} variant="outline" className="border-black text-black">
          Minify
        </Button>
        <div className="flex-1" />
        <Button onClick={handleCopy} variant="secondary">
          Copy Output
        </Button>
      </div>

      {error && (
        <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 h-[500px]">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono resize-none"
            placeholder='{"hello": "world"}'
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black">Output</label>
          <textarea
            value={output}
            readOnly
            className="flex-1 w-full rounded-md border border-input bg-black/5 px-3 py-2 text-sm shadow-sm focus-visible:outline-none font-mono resize-none"
            placeholder="Result will appear here..."
          />
        </div>
      </div>
    </div>
  )
}
