export default function Wireframe({ id }: { id: string }) {
  const renderWireframe = () => {
    switch (id) {
      // ==========================================
      // WEB COMPONENTS WIREFRAMES
      // ==========================================
      case 'hero-1':
        return (
          <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center p-3 gap-2 rounded-md">
            <div className="w-[80%] h-3 bg-gray-300 rounded-full"></div>
            <div className="w-[60%] h-3 bg-gray-300 rounded-full"></div>
            <div className="w-[40%] h-2 bg-gray-200 rounded-full mt-1"></div>
            <div className="flex gap-2 mt-2 items-center">
              <div className="flex -space-x-1">
                <div className="w-3 h-3 rounded-full bg-gray-400 border border-white"></div>
                <div className="w-3 h-3 rounded-full bg-gray-600 border border-white"></div>
                <div className="w-3 h-3 rounded-full bg-gray-800 border border-white"></div>
              </div>
              <div className="w-12 h-3.5 bg-black rounded-full"></div>
              <div className="w-12 h-3.5 border border-gray-300 rounded-full bg-white"></div>
            </div>
          </div>
        );
      case 'hero-2':
        return (
          <div className="w-full h-full flex items-center p-3 bg-white gap-3 rounded-md border border-gray-100">
            <div className="w-1/2 flex flex-col gap-2">
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-full h-3 bg-gray-800 rounded-full"></div>
              <div className="w-[80%] h-3 bg-gray-800 rounded-full"></div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1"></div>
              <div className="w-10 h-3.5 bg-black rounded-sm mt-1"></div>
            </div>
            <div className="w-1/2 h-[85%] bg-gray-900 rounded-md p-1.5 shadow-md flex flex-col gap-1 border border-gray-700">
              <div className="w-full h-2 bg-gray-700 rounded flex justify-between px-1 items-center">
                <div className="w-2 h-1 bg-gray-500 rounded"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              </div>
              <div className="w-full flex-1 bg-gray-800 rounded p-1 flex gap-1">
                <div className="w-1/3 bg-gray-700 rounded"></div>
                <div className="w-2/3 bg-gray-700/50 rounded"></div>
              </div>
            </div>
          </div>
        );
      case 'hero-3':
        return (
          <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center p-2 gap-2 rounded-md">
            <div className="w-[70%] h-3 bg-gray-300 rounded-full"></div>
            <div className="w-full max-w-[70%] h-[50%] bg-gray-900 rounded-lg shadow-md flex items-center justify-center relative overflow-hidden">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center border border-white/40">
                <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-white ml-0.5"></div>
              </div>
            </div>
          </div>
        );
      case 'hero-4':
        return (
          <div className="w-full h-full flex items-center p-3 bg-gray-900 text-white gap-2 rounded-md">
            <div className="w-1/2 flex flex-col gap-1.5">
              <div className="w-full h-2 bg-gray-600 rounded"></div>
              <div className="w-2/3 h-1.5 bg-gray-700 rounded"></div>
              <div className="w-full h-3 bg-gray-800 rounded border border-gray-700 mt-1 flex items-center px-1 text-[6px] font-mono text-gray-300">$ pnpm add...</div>
            </div>
            <div className="w-1/2 h-[90%] bg-black rounded border border-gray-800 p-1 flex flex-col gap-1">
              <div className="w-full h-2 bg-gray-800 rounded flex gap-1 px-1 items-center">
                <div className="w-2 h-1 bg-gray-500 rounded"></div>
                <div className="w-2 h-1 bg-gray-600 rounded"></div>
              </div>
              <div className="w-full flex-1 bg-gray-900 rounded p-1 font-mono text-[5px] text-gray-400">export default...</div>
            </div>
          </div>
        );
      case 'nav-1':
        return (
          <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-50 p-2 flex justify-center">
            <div className="w-[92%] h-6 bg-white/80 backdrop-blur rounded-full border border-gray-200 shadow-sm flex items-center justify-between px-2 mt-1">
              <div className="w-4 h-2 bg-black rounded-full"></div>
              <div className="flex gap-1.5">
                <div className="w-4 h-1 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-1 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-1 bg-gray-300 rounded-full"></div>
              </div>
              <div className="w-6 h-3 bg-black rounded-full"></div>
            </div>
          </div>
        );
      case 'nav-2':
        return (
          <div className="w-full h-full bg-white p-2 flex flex-col gap-1 border border-gray-100 rounded-md">
            <div className="w-full h-4 border-b border-gray-100 flex items-center justify-between px-1">
              <div className="w-4 h-2 bg-gray-800 rounded"></div>
              <div className="flex gap-2">
                <div className="w-6 h-1 bg-black rounded"></div>
                <div className="w-6 h-1 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="w-full flex-1 bg-gray-50 rounded border border-gray-100 p-1 grid grid-cols-3 gap-1">
              <div className="bg-white p-1 rounded border border-gray-100 flex flex-col gap-1">
                <div className="w-3 h-1 bg-gray-400 rounded"></div>
                <div className="w-full h-1 bg-gray-100 rounded"></div>
              </div>
              <div className="bg-white p-1 rounded border border-gray-100 flex flex-col gap-1">
                <div className="w-3 h-1 bg-gray-400 rounded"></div>
                <div className="w-full h-1 bg-gray-100 rounded"></div>
              </div>
              <div className="bg-white p-1 rounded border border-gray-100 flex flex-col gap-1">
                <div className="w-3 h-1 bg-gray-400 rounded"></div>
                <div className="w-full h-1 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
        );
      case 'nav-3':
        return (
          <div className="w-full h-full bg-gray-900 p-2 flex items-center justify-between border-b border-gray-800 rounded-md">
            <div className="w-4 h-2 bg-white rounded"></div>
            <div className="w-1/2 h-5 bg-gray-800 rounded border border-gray-700 flex items-center justify-between px-2">
              <div className="w-12 h-1 bg-gray-500 rounded"></div>
              <div className="w-5 h-2 bg-gray-700 rounded text-[6px] text-gray-400 flex items-center justify-center">⌘K</div>
            </div>
            <div className="w-4 h-4 rounded-full bg-gray-700"></div>
          </div>
        );
      case 'nav-4':
        return (
          <div className="w-full h-full bg-gray-50 flex flex-col p-1 gap-1 rounded-md border border-gray-100">
            <div className="w-full h-3 bg-black text-white text-[6px] rounded flex items-center justify-center font-semibold">
              v2.0 Released →
            </div>
            <div className="w-full h-5 bg-white rounded border border-gray-200 flex items-center justify-between px-2">
              <div className="w-4 h-2 bg-gray-800 rounded"></div>
              <div className="w-8 h-2 bg-black rounded-full"></div>
            </div>
          </div>
        );
      case 'auth-1':
        return (
          <div className="w-full h-full flex rounded-md overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="w-1/2 p-3 flex flex-col justify-center space-y-2 bg-white">
              <div className="w-8 h-2 bg-black rounded-full mb-1"></div>
              <div className="w-full h-2.5 bg-gray-100 rounded"></div>
              <div className="w-full h-2.5 bg-gray-100 rounded"></div>
              <div className="w-full h-4 bg-black text-white rounded mt-1"></div>
            </div>
            <div className="w-1/2 bg-black p-2 flex flex-col justify-end text-white">
              <div className="w-full h-2 bg-white/40 rounded mb-1"></div>
              <div className="w-2/3 h-1.5 bg-white/30 rounded"></div>
            </div>
          </div>
        );
      case 'auth-2':
        return (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center p-3 rounded-md">
            <div className="w-[80%] bg-white rounded-lg shadow-sm border border-gray-200 p-2.5 flex flex-col items-center space-y-1.5">
              <div className="w-5 h-5 bg-black rounded-full"></div>
              <div className="w-full h-2 bg-gray-200 rounded"></div>
              <div className="w-full h-2 bg-gray-200 rounded"></div>
              <div className="w-full h-3 bg-black rounded mt-1"></div>
            </div>
          </div>
        );
      case 'auth-3':
        return (
          <div className="w-full h-full bg-white flex flex-col items-center justify-center p-3 gap-1.5 border border-gray-100 rounded-md">
            <div className="flex w-full justify-between items-center px-4 mb-1">
              <div className="w-3 h-3 rounded-full bg-black"></div>
              <div className="w-8 h-1 bg-gray-200 rounded"></div>
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            </div>
            <div className="w-[80%] h-2 bg-gray-100 rounded"></div>
            <div className="w-[80%] h-2 bg-gray-100 rounded"></div>
            <div className="w-[80%] h-3 bg-black rounded mt-1"></div>
          </div>
        );
      case 'auth-4':
        return (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center p-3 rounded-md">
            <div className="w-[85%] bg-white rounded-lg p-2.5 shadow-sm border border-gray-200 flex flex-col items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">✉️</div>
              <div className="w-full h-2.5 bg-gray-100 rounded"></div>
              <div className="w-full h-3.5 bg-black text-white rounded text-[7px] flex items-center justify-center font-bold">Send Magic Link</div>
            </div>
          </div>
        );
      case 'bento-1':
        return (
          <div className="w-full h-full p-2 grid grid-cols-3 gap-1 bg-gray-50 rounded-md">
            <div className="col-span-2 row-span-2 bg-white border border-gray-200 rounded p-1.5 flex flex-col justify-between">
              <div className="w-8 h-1.5 bg-gray-300 rounded"></div>
              <div className="w-full h-6 bg-gray-100 rounded flex items-end p-0.5 gap-0.5">
                <div className="w-1/4 h-[40%] bg-gray-300 rounded-t"></div>
                <div className="w-1/4 h-[80%] bg-gray-400 rounded-t"></div>
                <div className="w-1/4 h-[60%] bg-gray-500 rounded-t"></div>
                <div className="w-1/4 h-[100%] bg-black rounded-t"></div>
              </div>
            </div>
            <div className="col-span-1 row-span-1 bg-white border border-gray-200 rounded p-1">
              <div className="w-4 h-4 rounded-full bg-gray-100 mb-1"></div>
              <div className="w-full h-1 bg-gray-200 rounded"></div>
            </div>
            <div className="col-span-1 row-span-2 bg-gray-900 rounded p-1 flex flex-col gap-1">
              <div className="w-6 h-1 bg-gray-400 rounded"></div>
              <div className="w-full h-1 bg-gray-700 rounded"></div>
            </div>
          </div>
        );
      case 'bento-2':
        return (
          <div className="w-full h-full bg-white p-2 flex flex-col gap-1.5 border border-gray-100 rounded-md">
            <div className="flex gap-1 border-b pb-1">
              <div className="w-8 h-2 bg-black rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex-1 bg-gray-50 rounded border p-1.5 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded shadow-xs border border-gray-200"></div>
            </div>
          </div>
        );
      case 'bento-3':
        return (
          <div className="w-full h-full bg-gray-50 p-2 flex flex-col gap-1 rounded-md">
            <div className="flex gap-1 items-center bg-white p-1 rounded border border-gray-200">
              <div className="w-1/2 flex flex-col gap-0.5">
                <div className="w-full h-1.5 bg-gray-800 rounded"></div>
                <div className="w-2/3 h-1 bg-gray-400 rounded"></div>
              </div>
              <div className="w-1/2 h-5 bg-gray-100 rounded"></div>
            </div>
            <div className="flex gap-1 items-center bg-white p-1 rounded border border-gray-200">
              <div className="w-1/2 h-5 bg-gray-100 rounded"></div>
              <div className="w-1/2 flex flex-col gap-0.5">
                <div className="w-full h-1.5 bg-gray-800 rounded"></div>
                <div className="w-2/3 h-1 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
        );
      case 'bento-4':
        return (
          <div className="w-full h-full bg-gray-950 p-2 grid grid-cols-3 gap-1 rounded-md">
            <div className="bg-gray-900 border border-gray-800 rounded p-1 flex flex-col justify-between">
              <div className="w-3 h-3 rounded-full bg-gray-700"></div>
              <div className="w-full h-1 bg-gray-700 rounded"></div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded p-1 flex flex-col justify-between">
              <div className="w-3 h-3 rounded-full bg-gray-700"></div>
              <div className="w-full h-1 bg-gray-700 rounded"></div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded p-1 flex flex-col justify-between">
              <div className="w-3 h-3 rounded-full bg-gray-700"></div>
              <div className="w-full h-1 bg-gray-700 rounded"></div>
            </div>
          </div>
        );
      case 'pricing-1':
        return (
          <div className="w-full h-full flex items-end justify-center gap-1 p-2 bg-gray-50 rounded-md">
            <div className="w-1/3 h-[70%] bg-white rounded border border-gray-200 p-1 flex flex-col items-center gap-1 shadow-sm">
              <div className="w-4 h-1 bg-gray-300 rounded"></div>
              <div className="w-6 h-2 bg-gray-100 rounded"></div>
            </div>
            <div className="w-1/3 h-[90%] bg-gray-900 text-white rounded p-1 flex flex-col items-center gap-1 shadow-md relative border border-black">
              <div className="w-4 h-1 bg-gray-400 rounded mt-1"></div>
              <div className="w-6 h-2 bg-gray-700 rounded"></div>
              <div className="w-full h-2 bg-black border border-gray-700 rounded mt-auto mb-0.5"></div>
            </div>
            <div className="w-1/3 h-[70%] bg-white rounded border border-gray-200 p-1 flex flex-col items-center gap-1 shadow-sm">
              <div className="w-4 h-1 bg-gray-300 rounded"></div>
              <div className="w-6 h-2 bg-gray-100 rounded"></div>
            </div>
          </div>
        );
      case 'pricing-2':
        return (
          <div className="w-full h-full bg-white p-2 flex flex-col gap-1 border border-gray-100 rounded-md">
            <div className="flex w-full gap-1 border-b pb-1">
              <div className="w-1/2"></div>
              <div className="w-1/4 h-1.5 bg-gray-300 rounded"></div>
              <div className="w-1/4 h-1.5 bg-black rounded"></div>
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="flex w-full gap-1 items-center">
                <div className="w-1/2 h-1 bg-gray-200 rounded"></div>
                <div className="w-1/4 h-1 bg-gray-100 rounded"></div>
                <div className="w-1/4 h-1 bg-black rounded"></div>
              </div>
            ))}
          </div>
        );
      case 'pricing-3':
        return (
          <div className="w-full h-full bg-gray-50 p-2 flex flex-col items-center justify-center gap-2 rounded-md">
            <div className="w-3/4 h-2 bg-gray-200 rounded-full relative flex items-center">
              <div className="w-4 h-4 bg-black rounded-full shadow-md absolute left-1/2 -translate-x-1/2"></div>
            </div>
            <div className="w-1/2 h-4 bg-white rounded border border-gray-200 flex items-center justify-center font-bold text-[8px]">$49/mo</div>
          </div>
        );
      case 'pricing-4':
        return (
          <div className="w-full h-full bg-gray-900 text-white p-2 rounded-md flex flex-col justify-between border border-gray-800">
            <div className="flex justify-between items-center">
              <div className="w-12 h-2 bg-gray-700 rounded"></div>
              <div className="w-6 h-2 bg-gray-600 rounded-full"></div>
            </div>
            <div className="w-full h-3 bg-white text-black rounded text-[6px] font-bold flex items-center justify-center">Contact Sales</div>
          </div>
        );
      case 'dashboard-1':
        return (
          <div className="w-full h-full flex bg-gray-900 border border-gray-800 rounded-md overflow-hidden p-0.5 gap-0.5">
            <div className="w-1/4 h-full bg-gray-800 p-1 flex flex-col gap-1">
              <div className="w-full h-2 bg-gray-600 rounded"></div>
              <div className="w-full h-1 bg-gray-700 rounded mt-1"></div>
              <div className="w-full h-1 bg-gray-700 rounded"></div>
            </div>
            <div className="w-3/4 h-full p-1 flex flex-col gap-1 bg-gray-950">
              <div className="flex gap-1">
                <div className="flex-1 h-4 bg-gray-800 rounded"></div>
                <div className="flex-1 h-4 bg-gray-800 rounded"></div>
              </div>
              <div className="w-full flex-1 bg-gray-900 rounded border border-gray-800"></div>
            </div>
          </div>
        );
      case 'dashboard-2':
        return (
          <div className="w-full h-full bg-gray-900 p-1.5 flex flex-col gap-1 rounded-md border border-gray-800">
            <div className="w-full h-3 bg-gray-800 rounded border border-gray-700"></div>
            <div className="flex-1 flex gap-1">
              <div className="w-2/3 bg-gray-800 rounded flex items-end p-1 gap-0.5">
                {[3, 5, 2, 7, 4, 8].map((h, i) => (
                  <div key={i} className="flex-1 bg-gray-400 rounded-t" style={{ height: `${h}0%` }}></div>
                ))}
              </div>
              <div className="w-1/3 bg-gray-800 rounded flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-gray-400 border-t-transparent"></div>
              </div>
            </div>
          </div>
        );
      case 'dashboard-3':
        return (
          <div className="w-full h-full bg-gray-100 p-1.5 flex gap-1 rounded-md">
            {[1, 2, 3].map(col => (
              <div key={col} className="flex-1 bg-gray-200/60 rounded p-1 flex flex-col gap-1">
                <div className="w-8 h-1 bg-gray-400 rounded mb-0.5"></div>
                <div className="w-full h-5 bg-white rounded border border-gray-200"></div>
                <div className="w-full h-5 bg-white rounded border border-gray-200"></div>
              </div>
            ))}
          </div>
        );
      case 'testimonial-1':
        return (
          <div className="w-full h-full bg-gray-50 p-2 flex gap-1 rounded-md overflow-hidden">
            <div className="w-1/2 flex flex-col gap-1">
              <div className="w-full h-8 bg-white border border-gray-200 rounded p-1"></div>
              <div className="w-full h-10 bg-white border border-gray-200 rounded p-1"></div>
            </div>
            <div className="w-1/2 flex flex-col gap-1 mt-2">
              <div className="w-full h-10 bg-white border border-gray-200 rounded p-1"></div>
              <div className="w-full h-8 bg-white border border-gray-200 rounded p-1"></div>
            </div>
          </div>
        );
      case 'testimonial-2':
        return (
          <div className="w-full h-full bg-white p-2 flex flex-col gap-1.5 border border-gray-100 rounded-md justify-between">
            <div className="flex justify-around items-center border-b pb-1">
              <div className="w-4 h-1.5 bg-gray-300 rounded"></div>
              <div className="w-4 h-1.5 bg-gray-300 rounded"></div>
              <div className="w-4 h-1.5 bg-gray-300 rounded"></div>
            </div>
            <div className="w-full flex-1 bg-gray-900 text-white rounded p-1.5 flex flex-col justify-between">
              <div className="w-10 h-2 bg-gray-400 rounded"></div>
              <div className="w-full h-1 bg-gray-700 rounded"></div>
            </div>
          </div>
        );
      case 'testimonial-3':
        return (
          <div className="w-full h-full bg-gray-50 p-1.5 flex gap-1 rounded-md overflow-hidden">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1/3 h-full bg-gray-900 rounded p-1 flex flex-col justify-between relative">
                <div className="w-3 h-3 rounded-full bg-white/30 flex items-center justify-center text-[5px] text-white">▶</div>
                <div className="w-full h-1 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        );
      case 'footer-1':
        return (
          <div className="w-full h-full bg-gray-900 text-white p-2 flex flex-col justify-between rounded-md border border-gray-800">
            <div className="w-full h-4 bg-gray-800 rounded border border-gray-700 flex items-center justify-between px-2">
              <div className="w-10 h-1 bg-gray-500 rounded"></div>
              <div className="w-4 h-2 bg-black border border-gray-600 rounded"></div>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-4 bg-gray-800/50 rounded"></div>
              ))}
            </div>
          </div>
        );
      case 'footer-2':
        return (
          <div className="w-full h-full bg-white p-2 flex items-end justify-between border-t border-gray-200 rounded-md">
            <div className="w-8 h-1.5 bg-gray-400 rounded"></div>
            <div className="flex gap-1">
              <div className="w-4 h-1 bg-gray-300 rounded"></div>
              <div className="w-4 h-1 bg-gray-300 rounded"></div>
            </div>
          </div>
        );
      case 'footer-3':
        return (
          <div className="w-full h-full bg-black text-white p-2 flex flex-col justify-between rounded-md">
            <div className="w-full h-5 bg-gray-900 border border-gray-800 rounded p-1 flex justify-between items-center">
              <div className="w-8 h-1 bg-gray-600 rounded"></div>
              <div className="w-4 h-2 bg-white text-black rounded"></div>
            </div>
            <div className="w-full h-1 bg-gray-800 rounded"></div>
          </div>
        );
      case 'ecommerce-1':
        return (
          <div className="w-full h-full bg-gray-50 p-1.5 grid grid-cols-2 gap-1 rounded-md">
            {[1, 2].map(i => (
              <div key={i} className="bg-white rounded border border-gray-200 p-1 flex flex-col gap-1 shadow-xs">
                <div className="w-full h-8 bg-gray-100 rounded flex items-center justify-center">
                  <div className="w-4 h-4 rounded bg-gray-300"></div>
                </div>
                <div className="w-full h-1 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-1 bg-black rounded"></div>
              </div>
            ))}
          </div>
        );
      case 'ecommerce-2':
        return (
          <div className="w-full h-full bg-gray-800/80 p-2 flex justify-end rounded-md relative overflow-hidden">
            <div className="w-[60%] h-full bg-white rounded-l p-1.5 flex flex-col justify-between shadow-xl">
              <div className="w-full h-2 bg-gray-800 rounded"></div>
              <div className="flex-1 my-1 bg-gray-50 rounded p-1 flex flex-col gap-1">
                <div className="w-full h-3 bg-white border rounded"></div>
              </div>
              <div className="w-full h-3 bg-black text-white text-[6px] font-bold rounded flex items-center justify-center">Checkout</div>
            </div>
          </div>
        );
      case 'ecommerce-3':
        return (
          <div className="w-full h-full bg-white p-2 flex gap-2 border border-gray-100 rounded-md">
            <div className="w-1/2 h-full bg-gray-100 rounded"></div>
            <div className="w-1/2 flex flex-col gap-1 justify-between">
              <div className="w-full h-2 bg-gray-800 rounded"></div>
              <div className="w-1/2 h-2 bg-black rounded"></div>
              <div className="w-full h-3 bg-black text-white rounded text-[6px] flex items-center justify-center font-bold">Add to Bag</div>
            </div>
          </div>
        );
      case 'modal-1':
        return (
          <div className="w-full h-full bg-gray-800/80 p-3 flex items-center justify-center rounded-md relative overflow-hidden">
            <div className="w-[85%] bg-white rounded-lg p-2.5 shadow-xl flex flex-col items-center gap-1 border border-gray-100 z-10">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold text-black">🎁</div>
              <div className="w-full h-2 bg-gray-800 rounded"></div>
              <div className="w-full h-2 bg-gray-200 rounded"></div>
              <div className="w-full h-3 bg-black text-white rounded text-[8px] flex items-center justify-center font-bold mt-1">Subscribe</div>
            </div>
          </div>
        );
      case 'modal-2':
        return (
          <div className="w-full h-full bg-gray-900/80 p-3 flex items-center justify-center rounded-md relative overflow-hidden">
            <div className="w-[85%] bg-white rounded-lg p-2 shadow-xl flex flex-col items-center gap-1 border border-gray-200 z-10">
              <div className="w-5 h-5 rounded-full bg-gray-100 text-black font-bold text-[8px] flex items-center justify-center">⚠️</div>
              <div className="w-full h-2 bg-gray-800 rounded"></div>
              <div className="w-full h-3 bg-black text-white rounded text-[7px] flex items-center justify-center font-bold">Delete Workspace</div>
            </div>
          </div>
        );
      case 'modal-3':
        return (
          <div className="w-full h-full bg-gray-100 p-2 flex flex-col justify-end rounded-md">
            <div className="w-full h-6 bg-white/90 backdrop-blur rounded border border-gray-200 shadow-sm p-1 flex items-center justify-between">
              <div className="w-12 h-1 bg-gray-600 rounded"></div>
              <div className="w-6 h-2 font-bold text-[6px] bg-black text-white rounded flex items-center justify-center">Accept</div>
            </div>
          </div>
        );
      case 'cta-1':
        return (
          <div className="w-full h-full p-2 bg-gray-50 rounded-md flex items-center justify-center">
            <div className="w-full h-[85%] bg-black rounded-lg p-3 flex flex-col items-center justify-center text-white gap-1.5 shadow-md border border-gray-800">
              <div className="w-3/4 h-2.5 bg-white rounded-full"></div>
              <div className="w-1/2 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-14 h-3 bg-white text-black font-bold rounded-full mt-1 flex items-center justify-center text-[6px]">Action</div>
            </div>
          </div>
        );
      case 'cta-2':
        return (
          <div className="w-full h-full bg-black text-white p-2 rounded-md flex flex-col items-center justify-center gap-1 border border-gray-800 relative overflow-hidden">
            <div className="w-full h-2 bg-gray-800 rounded text-[5px] text-gray-400 flex items-center justify-center font-mono">BUILD • SHIP • SCALE</div>
            <div className="w-14 h-3 bg-white text-black rounded text-[6px] font-bold flex items-center justify-center mt-1">Get Started</div>
          </div>
        );

      // ==========================================
      // MOBILE UI PATTERNS (mobile-1 to mobile-22)
      // ==========================================
      case 'mobile-1':
        return (
          <div className="w-16 h-28 bg-black rounded-lg border-2 border-gray-800 flex flex-col items-center justify-center p-1 relative shadow-md">
            <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-xs">
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            <div className="w-8 h-1 bg-white/50 rounded-full mt-2"></div>
            <div className="absolute bottom-3 w-6 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-white rounded-full"></div>
            </div>
          </div>
        );
      case 'mobile-2':
        return (
          <div className="w-16 h-28 bg-white rounded-lg border-2 border-gray-800 flex flex-col relative shadow-md overflow-hidden">
            <div className="flex-1 bg-gray-50 p-1 flex flex-col gap-1 items-center justify-center">
              <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
              <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
            </div>
            <div className="h-5 bg-white border-t border-gray-200 flex items-center justify-around px-0.5">
              <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-xs"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-xs"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-xs"></div>
            </div>
          </div>
        );
      case 'mobile-3':
        return (
          <div className="w-16 h-28 bg-gray-100 rounded-lg border-2 border-gray-800 flex flex-col relative shadow-md overflow-hidden">
            <div className="w-full h-3 bg-white border-b border-gray-200 flex items-center px-1">
              <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
            </div>
            <div className="flex-1 p-1 flex flex-col gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-full h-4 bg-white rounded border border-gray-200 flex items-center justify-between px-1">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    <div className="w-4 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="w-1.5 h-1 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'mobile-4':
        return (
          <div className="w-16 h-28 bg-gray-800 rounded-lg border-2 border-gray-800 flex relative shadow-md overflow-hidden">
            <div className="w-[75%] h-full bg-white flex flex-col shadow-xl z-10">
              <div className="h-7 bg-gray-100 p-1 flex flex-col gap-0.5 justify-end border-b">
                <div className="w-3.5 h-3.5 bg-black rounded-full"></div>
                <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
              </div>
              <div className="flex-1 flex flex-col gap-1 p-1 mt-0.5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-xs"></div>
                    <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[25%] h-full bg-black/40"></div>
          </div>
        );
      case 'mobile-5':
        return (
          <div className="w-16 h-28 bg-white rounded-lg border-2 border-gray-800 flex flex-col relative shadow-md overflow-hidden">
            <div className="flex-1 bg-gray-50 p-1 flex flex-col gap-1">
              <div className="w-8 h-8 bg-gray-200 rounded-xs mt-1 mx-auto"></div>
            </div>
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[90%] h-5 bg-gray-900 rounded flex items-center justify-between px-1 shadow-lg">
              <div className="w-5 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-2.5 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        );
      case 'mobile-6':
        return (
          <div className="w-16 h-28 bg-gray-900 rounded-lg border-2 border-gray-800 flex items-center justify-center relative shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="w-[85%] bg-white rounded flex flex-col items-center p-1.5 z-10 shadow-xl border border-gray-100">
              <div className="w-4 h-1.5 bg-black rounded-full mb-1"></div>
              <div className="w-full h-1 bg-gray-300 rounded-full mb-0.5"></div>
              <div className="w-6 h-1 bg-gray-300 rounded-full mb-1.5"></div>
              <div className="w-full h-2.5 bg-black text-white rounded-xs mb-0.5 flex items-center justify-center text-[5px]">Action</div>
              <div className="w-full h-2.5 bg-gray-100 rounded-xs"></div>
            </div>
          </div>
        );
      case 'mobile-7':
        return (
          <div className="w-16 h-28 bg-gray-800 rounded-lg border-2 border-gray-800 flex flex-col justify-end relative shadow-md overflow-hidden">
            <div className="w-full h-[65%] bg-white rounded-t-lg p-1 flex flex-col gap-1 items-center shadow-2xl">
              <div className="w-4 h-0.5 bg-gray-300 rounded-full mb-0.5"></div>
              <div className="w-10 h-1.5 bg-gray-800 rounded-full"></div>
              <div className="w-full h-1 bg-gray-200 rounded-full"></div>
              <div className="w-full h-1 bg-gray-200 rounded-full"></div>
              <div className="w-full h-3 bg-black rounded mt-auto"></div>
            </div>
          </div>
        );
      case 'mobile-8':
        return (
          <div className="w-16 h-28 bg-white rounded-lg border-2 border-gray-800 flex flex-col relative shadow-md overflow-hidden p-1 gap-1">
            <div className="w-full h-3 bg-gray-100 rounded-xs"></div>
            <div className="w-full h-6 bg-gray-50 rounded-xs"></div>
            <div className="w-full h-6 bg-gray-50 rounded-xs"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-black rounded-full shadow-lg flex items-center justify-center text-white text-[8px] font-bold">
              +
            </div>
          </div>
        );
      case 'mobile-9':
        return (
          <div className="w-16 h-28 bg-white rounded-lg border-2 border-gray-800 flex flex-col relative shadow-md overflow-hidden p-1 gap-1">
            <div className="flex gap-1 justify-between border-b border-gray-100 pb-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-3.5 h-3.5 rounded-full p-[1px] bg-gray-300 flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-full border border-white"></div>
                </div>
              ))}
            </div>
            <div className="flex-1 bg-gray-50 rounded p-1 flex flex-col gap-1">
              <div className="w-full h-3 bg-gray-200 rounded-xs"></div>
              <div className="w-full flex-1 bg-gray-200 rounded-xs"></div>
            </div>
          </div>
        );
      case 'mobile-10':
        return (
          <div className="w-16 h-28 bg-white rounded-lg border-2 border-gray-800 flex flex-col items-center justify-center p-1.5 gap-1.5 shadow-md">
            <div className="w-8 h-1.5 bg-gray-800 rounded-full"></div>
            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex gap-0.5 mt-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-2.5 h-3 border border-gray-400 rounded-xs flex items-center justify-center text-[6px] font-mono">
                  •
                </div>
              ))}
            </div>
            <div className="w-full h-2 bg-black rounded mt-1"></div>
          </div>
        );
      case 'mobile-11':
        return (
          <div className="w-16 h-28 bg-gray-100 rounded-lg border-2 border-gray-800 flex items-center justify-center p-1 relative shadow-md overflow-hidden">
            <div className="absolute w-[70%] h-[75%] bg-gray-200 rounded-lg shadow scale-90 translate-y-1"></div>
            <div className="w-[80%] h-[80%] bg-white rounded-lg shadow-md border border-gray-200 p-1 flex flex-col justify-between z-10">
              <div className="w-full h-10 bg-gray-800 rounded"></div>
              <div className="w-full h-1 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        );
      case 'mobile-12':
        return (
          <div className="w-16 h-28 bg-gray-50 rounded-lg border-2 border-gray-800 flex flex-col relative shadow-md overflow-hidden p-1 justify-between gap-1">
            <div className="flex flex-col gap-1">
              <div className="self-start w-8 h-3 bg-gray-200 rounded-r-md rounded-tl-md"></div>
              <div className="self-end w-9 h-3 bg-black text-white rounded-l-md rounded-tr-md"></div>
            </div>
            <div className="w-full h-3 bg-white border border-gray-200 rounded-full flex items-center px-1 justify-between">
              <div className="w-5 h-0.5 bg-gray-300 rounded"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
            </div>
          </div>
        );
      case 'mobile-13':
        return (
          <div className="w-16 h-28 bg-white rounded-lg border-2 border-gray-800 flex flex-col relative shadow-md overflow-hidden p-1 gap-1">
            <div className="w-full h-3 bg-gray-100 border border-gray-200 rounded-full flex items-center px-1 gap-0.5">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-6 h-0.5 bg-gray-300 rounded"></div>
            </div>
            <div className="flex gap-0.5">
              <div className="w-4 h-1.5 bg-black rounded-full"></div>
              <div className="w-4 h-1.5 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        );
      case 'mobile-14':
        return (
          <div className="w-16 h-28 bg-white rounded-lg border-2 border-gray-800 flex flex-col items-center justify-between p-1.5 shadow-md">
            <div className="w-8 h-8 bg-gray-100 rounded-full mt-1 flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </div>
            <div className="w-10 h-1 bg-gray-800 rounded-full"></div>
            <div className="flex gap-0.5">
              <div className="w-1.5 h-0.5 bg-black rounded-full"></div>
              <div className="w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        );
      case 'mobile-15':
        return (
          <div className="w-16 h-28 bg-white rounded-lg border-2 border-gray-800 flex flex-col relative shadow-md overflow-hidden">
            <div className="w-full h-8 bg-black"></div>
            <div className="px-1 flex justify-between items-end -mt-3">
              <div className="w-5 h-5 bg-white border-2 border-white rounded-full bg-gray-300 shadow-sm"></div>
              <div className="w-5 h-2 bg-black rounded-full"></div>
            </div>
            <div className="p-1 flex flex-col gap-1">
              <div className="w-6 h-1 bg-gray-800 rounded"></div>
              <div className="w-8 h-0.5 bg-gray-400 rounded"></div>
            </div>
          </div>
        );
      case 'mobile-16':
        return (
          <div className="w-16 h-28 bg-white rounded-lg border-2 border-gray-800 flex flex-col p-1 gap-1 shadow-md">
            <div className="w-full h-3 bg-gray-100 rounded-md p-0.5 flex items-center">
              <div className="w-1/2 h-full bg-white shadow-xs rounded text-[6px] font-bold flex items-center justify-center text-black">Tab 1</div>
              <div className="w-1/2 h-full rounded text-[6px] flex items-center justify-center text-gray-400">Tab 2</div>
            </div>
            <div className="flex-1 bg-gray-50 rounded p-1 flex flex-col gap-1">
              <div className="w-full h-2 bg-gray-200 rounded-xs"></div>
              <div className="w-3/4 h-2 bg-gray-200 rounded-xs"></div>
            </div>
          </div>
        );
      case 'mobile-17':
        return (
          <div className="w-16 h-28 bg-white rounded-lg border-2 border-gray-800 flex flex-col p-1 gap-1.5 shadow-md">
            <div className="w-full h-6 bg-gray-100 rounded flex items-center p-1 gap-1 animate-pulse">
              <div className="w-4 h-4 rounded bg-gray-200"></div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="w-full h-1 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-1 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="w-full h-10 bg-gray-100 rounded animate-pulse p-1 flex flex-col justify-between">
              <div className="w-full h-1 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-1 bg-gray-200 rounded"></div>
            </div>
          </div>
        );
      case 'mobile-18':
        return (
          <div className="w-16 h-28 bg-white rounded-lg border-2 border-gray-800 flex flex-col p-1 gap-1 shadow-md">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-full h-5 bg-gray-50 rounded border border-gray-200 p-0.5 flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <div className="w-full h-0.5 bg-gray-800 rounded"></div>
                  <div className="w-2/3 h-0.5 bg-gray-400 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'mobile-19':
        return (
          <div className="w-16 h-28 bg-gray-50 rounded-lg border-2 border-gray-800 flex flex-col items-center p-1 gap-1 shadow-md relative overflow-hidden">
            <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin my-0.5"></div>
            <div className="w-full h-5 bg-white rounded shadow-xs p-1 flex flex-col gap-0.5">
              <div className="w-full h-1 bg-gray-300 rounded"></div>
            </div>
            <div className="w-full h-5 bg-white rounded shadow-xs p-1 flex flex-col gap-0.5">
              <div className="w-full h-1 bg-gray-300 rounded"></div>
            </div>
          </div>
        );
      case 'mobile-20':
        return (
          <div className="w-16 h-28 bg-gray-900 rounded-lg border-2 border-gray-800 flex flex-col justify-end shadow-md overflow-hidden">
            <div className="w-full h-[70%] bg-white rounded-t-lg p-1 flex flex-col gap-1 items-center shadow-xl">
              <div className="w-3 h-0.5 bg-gray-300 rounded-full mb-0.5"></div>
              <div className="w-10 h-2 bg-black rounded flex items-center justify-center text-[5px] text-white font-bold">Pay</div>
              <div className="w-full h-2 bg-gray-100 rounded flex justify-between items-center px-1 text-[5px]">
                <span>Total</span>
                <span className="font-bold">$49.00</span>
              </div>
              <div className="w-full h-3 bg-black text-white rounded text-[6px] flex items-center justify-center font-bold mt-auto">Confirm</div>
            </div>
          </div>
        );
      case 'mobile-21':
        return (
          <div className="w-16 h-28 bg-gray-950 rounded-lg border-2 border-gray-800 flex flex-col items-center justify-between p-1.5 shadow-md text-white">
            <div className="w-8 h-1 bg-gray-800 rounded-full mt-1"></div>
            <div className="flex items-center gap-0.5 h-6">
              <div className="w-0.5 h-3 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-0.5 h-5 bg-gray-200 rounded-full animate-bounce delay-75"></div>
              <div className="w-0.5 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              <div className="w-0.5 h-4 bg-gray-300 rounded-full animate-bounce"></div>
            </div>
            <div className="w-6 h-1 bg-gray-700 rounded-full mb-1"></div>
          </div>
        );
      case 'mobile-22':
        return (
          <div className="w-16 h-28 bg-gray-900 rounded-lg border-2 border-gray-800 flex items-center justify-center p-1 relative shadow-md">
            <div className="w-[85%] bg-white rounded-lg p-1.5 flex flex-col items-center gap-1 border border-gray-200 shadow-xl">
              <div className="w-5 h-5 rounded border border-gray-800 flex items-center justify-center text-[8px]">👤</div>
              <div className="w-8 h-1 bg-black rounded-full"></div>
              <div className="w-10 h-0.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-gray-50 p-2 flex flex-col gap-1.5 rounded-md border border-gray-200 items-center justify-center">
            <div className="w-12 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-full max-w-[80%] h-8 bg-white border border-gray-200 rounded flex items-center justify-center p-1">
              <div className="w-full h-full bg-gray-100 rounded"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {renderWireframe()}
    </div>
  );
}
