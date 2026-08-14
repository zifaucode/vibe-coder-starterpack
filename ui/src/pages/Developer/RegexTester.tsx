import { useState } from "react";
import { Search } from "lucide-react";

export default function RegexTester() {
  const [regex, setRegex] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const getHighlightedText = () => {
    if (!regex || !testString) return testString;
    try {
      const re = new RegExp(regex, flags);
      const parts = testString.split(re);
      const matches = testString.match(re) || [];
      
      return parts.reduce((arr, part, i) => {
        arr.push(<span key={`part-${i}`}>{part}</span>);
        if (i < matches.length) {
          arr.push(
            <span key={`match-${i}`} className="bg-black text-white rounded-sm px-1 font-mono">
              {matches[i]}
            </span>
          );
        }
        return arr;
      }, [] as React.ReactNode[]);
    } catch (e) {
      return <span className="text-black font-mono font-bold">Invalid Regular Expression</span>;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-black">Regex Tester</h1>
        <p className="text-muted-foreground text-sm">
          Test your regular expressions in real-time against custom strings.
        </p>
      </div>

      <div className="bg-white rounded-xl border p-6 space-y-6 shadow-sm">
        {/* Regex Input Area */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-black flex items-center">
            <Search className="w-4 h-4 mr-2" />
            Regular Expression
          </label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center border rounded-md px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-black/20 focus-within:border-black transition-all">
              <span className="text-gray-400 font-mono text-lg mr-2">/</span>
              <input
                type="text"
                value={regex}
                onChange={(e) => setRegex(e.target.value)}
                placeholder="([A-Z])\w+"
                className="flex-1 bg-transparent border-none outline-none font-mono py-3"
              />
              <span className="text-gray-400 font-mono text-lg ml-2">/</span>
            </div>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="g"
              className="w-16 border rounded-md px-3 font-mono text-center bg-gray-50 outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
            />
          </div>
        </div>

        {/* Test String Area */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-black flex items-center">
            Test String
          </label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test your regex against..."
            className="w-full h-32 border rounded-md p-3 font-mono text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all resize-y"
          />
        </div>

        {/* Results Area */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-black flex items-center">
            Results
          </label>
          <div className="w-full min-h-32 border rounded-md p-3 font-mono text-sm bg-gray-50 whitespace-pre-wrap break-words">
            {testString === "" ? (
              <span className="text-gray-400 italic">Results will appear here...</span>
            ) : (
              getHighlightedText()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
