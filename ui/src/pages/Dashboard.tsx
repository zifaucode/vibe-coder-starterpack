import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [pythonStatus, setPythonStatus] = useState("Menghubungkan ke Python...")
  
  useEffect(() => {
    // Wait for pywebview to inject its API
    window.addEventListener("pywebviewready", () => {
      // @ts-ignore
      const api = window.pywebview.api
      if (api) {
        api.get_system_info().then((info: any) => {
          setPythonStatus(info.message)
        })
      }
    })
    
    // Fallback if already ready
    // @ts-ignore
    if (window.pywebview && window.pywebview.api && typeof window.pywebview.api.get_system_info === 'function') {
      // @ts-ignore
      window.pywebview.api.get_system_info().then((info: any) => {
        setPythonStatus(info.message)
      })
    }
  }, [])

  const testLog = () => {
    // @ts-ignore
    if (window.pywebview && window.pywebview.api) {
      // @ts-ignore
      window.pywebview.api.log_message("Tombol di React ditekan!")
    } else {
      console.log("Tombol di React ditekan! (Tapi tidak ada Python di background)")
    }
  }

  return (
    <div className="max-w-2xl text-center space-y-6 bg-white p-12 rounded-xl border shadow-sm">
      <h2 className="text-3xl font-semibold tracking-tight text-black">
        Selamat Datang di Vibe Coder
      </h2>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Antarmuka ini dibangun menggunakan React dan Tailwind CSS dengan konsep minimalis hitam-putih. 
        Tanpa efek kaku dan kotak-kotak, semua tersaji elegan dan siap melayani 33 utilities Anda.
      </p>
      
      <div className="pt-4 border-t flex flex-col items-center gap-4">
        <span className="inline-flex items-center rounded-md bg-black/5 px-2 py-1 text-xs font-medium text-black ring-1 ring-inset ring-black/10">
          Status Backend: {pythonStatus}
        </span>
        <Button onClick={testLog} variant="outline" className="border-black text-black">
          Test Komunikasi ke Python
        </Button>
      </div>
    </div>
  )
}
