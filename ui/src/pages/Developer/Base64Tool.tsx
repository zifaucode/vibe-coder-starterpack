import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Copy, ArrowDown, ArrowUp } from "lucide-react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleProcess = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setOutput("Error: Invalid Base64 string");
    }
  };

  const handleSwap = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-black">Base64 Encoder/Decoder</h1>
        <p className="text-muted-foreground text-sm">
          Easily convert strings to and from Base64 encoding.
        </p>
      </div>

      <div className="bg-white rounded-xl border p-6 shadow-sm flex flex-col gap-4">
        {/* Header Controls */}
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setMode("encode")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                mode === "encode" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                mode === "decode" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
              }`}
            >
              Decode
            </button>
          </div>
          
          <Button variant="ghost" size="sm" onClick={handleSwap} className="text-gray-500 hover:text-black">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Swap
          </Button>
        </div>

        {/* Input Area */}
        <div className="space-y-2 mt-2">
          <label className="text-sm font-semibold text-black flex items-center justify-between">
            <span>Input ({mode === "encode" ? "Text" : "Base64"})</span>
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            className="w-full h-32 border rounded-md p-3 font-mono text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all resize-y"
          />
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <Button onClick={handleProcess} className="rounded-full shadow-md px-6 bg-black text-white hover:bg-black/80">
            {mode === "encode" ? <ArrowDown className="w-4 h-4 mr-2" /> : <ArrowUp className="w-4 h-4 mr-2" />}
            {mode === "encode" ? "Encode" : "Decode"}
          </Button>
        </div>

        {/* Output Area */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-black flex items-center justify-between">
            <span>Output ({mode === "encode" ? "Base64" : "Text"})</span>
            <button 
              onClick={() => navigator.clipboard.writeText(output)}
              className="text-gray-400 hover:text-black flex items-center text-xs"
            >
              <Copy className="w-3 h-3 mr-1" /> Copy
            </button>
          </label>
          <textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            className="w-full h-32 border border-gray-200 rounded-md p-3 font-mono text-sm bg-white outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
}
