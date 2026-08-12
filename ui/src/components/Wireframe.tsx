import React from 'react';

export default function Wireframe({ id }: { id: string }) {
  const renderWireframe = () => {
    switch (id) {
      case 'auth-1': // Split-screen Auth
        return (
          <div className="w-full h-full flex rounded-md overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="w-1/2 p-3 flex flex-col justify-center space-y-2 bg-white">
              <div className="w-8 h-2 bg-gray-200 rounded-full mb-2"></div>
              <div className="w-full h-3 bg-gray-100 rounded"></div>
              <div className="w-full h-3 bg-gray-100 rounded"></div>
              <div className="w-full h-4 bg-blue-500/20 rounded mt-1"></div>
            </div>
            <div className="w-1/2 bg-gray-100/80 flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        );
      case 'auth-2': // Centered Floating Card
        return (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-[80%] bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex flex-col items-center space-y-2">
              <div className="w-6 h-6 bg-gray-100 rounded-full mb-1"></div>
              <div className="w-full h-2 bg-gray-100 rounded"></div>
              <div className="w-full h-2 bg-gray-100 rounded"></div>
              <div className="w-full h-3 bg-black/10 rounded mt-1"></div>
            </div>
          </div>
        );
      case 'auth-3': // Minimal Stack
        return (
          <div className="w-full h-full bg-white flex flex-col items-center justify-center p-4 space-y-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
            <div className="w-16 h-2 bg-gray-200 rounded-full"></div>
            <div className="w-full h-px bg-gray-100"></div>
            <div className="w-full h-px bg-gray-100"></div>
            <div className="w-full h-6 bg-black/5 rounded"></div>
          </div>
        );
      case 'pricing-1': // Classic 3-Tier Pricing
        return (
          <div className="w-full h-full flex items-end justify-center gap-1.5 p-3 bg-gray-50">
            <div className="w-1/3 h-[60%] bg-white rounded-t-md border border-gray-200 p-1 flex flex-col items-center gap-1 shadow-sm">
              <div className="w-4 h-1 bg-gray-200 rounded-full mt-1"></div>
              <div className="w-6 h-2 bg-gray-100 rounded-full"></div>
            </div>
            <div className="w-1/3 h-[80%] bg-white rounded-t-md border-2 border-blue-500/30 p-1 flex flex-col items-center gap-1 shadow-md relative">
              <div className="absolute -top-1 w-4 h-1 bg-blue-500/40 rounded-full"></div>
              <div className="w-4 h-1 bg-gray-200 rounded-full mt-2"></div>
              <div className="w-6 h-2 bg-gray-100 rounded-full"></div>
              <div className="w-full h-2 bg-blue-500/10 rounded-full mt-auto mb-1"></div>
            </div>
            <div className="w-1/3 h-[60%] bg-white rounded-t-md border border-gray-200 p-1 flex flex-col items-center gap-1 shadow-sm">
              <div className="w-4 h-1 bg-gray-200 rounded-full mt-1"></div>
              <div className="w-6 h-2 bg-gray-100 rounded-full"></div>
            </div>
          </div>
        );
      case 'pricing-2': // Comparison Table
        return (
          <div className="w-full h-full bg-white p-3 flex flex-col gap-1.5 border border-gray-100 rounded-md">
            <div className="flex w-full gap-1 border-b border-gray-100 pb-1">
              <div className="w-1/2"></div>
              <div className="w-1/6 h-1 bg-gray-200 rounded"></div>
              <div className="w-1/6 h-1 bg-blue-300 rounded"></div>
              <div className="w-1/6 h-1 bg-gray-200 rounded"></div>
            </div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex w-full gap-1 items-center">
                <div className="w-1/2 h-1.5 bg-gray-100 rounded"></div>
                <div className="w-1/6 h-1.5 bg-gray-50 rounded"></div>
                <div className="w-1/6 h-1.5 bg-blue-50 rounded"></div>
                <div className="w-1/6 h-1.5 bg-gray-50 rounded"></div>
              </div>
            ))}
          </div>
        );
      case 'hero-1': // Centered Typography Hero
        return (
          <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center p-4 gap-2">
            <div className="w-[80%] h-4 bg-gray-200 rounded-full"></div>
            <div className="w-[60%] h-4 bg-gray-200 rounded-full"></div>
            <div className="w-[40%] h-2 bg-gray-100 rounded-full mt-1"></div>
            <div className="flex gap-2 mt-2">
              <div className="w-12 h-4 bg-black/10 rounded-full"></div>
              <div className="w-12 h-4 border border-gray-200 rounded-full"></div>
            </div>
          </div>
        );
      case 'hero-2': // Side-by-side Hero
        return (
          <div className="w-full h-full flex items-center p-3 bg-white gap-3">
            <div className="w-1/2 flex flex-col gap-2">
              <div className="w-full h-3 bg-gray-200 rounded-full"></div>
              <div className="w-[80%] h-3 bg-gray-200 rounded-full"></div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1"></div>
              <div className="w-[60%] h-1.5 bg-gray-100 rounded-full"></div>
              <div className="w-10 h-4 bg-black/10 rounded-sm mt-1"></div>
            </div>
            <div className="w-1/2 h-full bg-gray-100 rounded-md shadow-inner flex items-center justify-center overflow-hidden">
               <div className="w-10 h-10 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        );
      case 'dashboard-1': // Sidebar + Metrics
        return (
          <div className="w-full h-full flex bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
            <div className="w-1/4 h-full bg-gray-800 p-1.5 flex flex-col gap-1.5">
              <div className="w-full h-2 bg-gray-600 rounded"></div>
              <div className="w-[80%] h-1 bg-gray-700 rounded mt-2"></div>
              <div className="w-[80%] h-1 bg-gray-700 rounded"></div>
            </div>
            <div className="w-3/4 h-full p-2 flex flex-col gap-2">
              <div className="w-full h-2 bg-white rounded border border-gray-100"></div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex-1 h-6 bg-white rounded border border-gray-100"></div>
                ))}
              </div>
              <div className="w-full flex-1 bg-white rounded border border-gray-100"></div>
            </div>
          </div>
        );
      case 'dashboard-2': // Analytics Focus
        return (
          <div className="w-full h-full bg-gray-50 flex flex-col p-2 gap-2 border border-gray-200 rounded-md">
            <div className="w-full h-3 bg-white border border-gray-100 rounded"></div>
            <div className="flex-1 flex gap-2">
              <div className="w-2/3 flex flex-col gap-2">
                <div className="w-full h-12 bg-white border border-gray-100 rounded flex items-end p-1 gap-0.5">
                   {[4, 6, 3, 7, 5, 8, 4].map((h, i) => (
                     <div key={i} className="flex-1 bg-blue-100 rounded-t-sm" style={{ height: `${h}0%` }}></div>
                   ))}
                </div>
                <div className="w-full flex-1 bg-white border border-gray-100 rounded"></div>
              </div>
              <div className="w-1/3 bg-white border border-gray-100 rounded flex flex-col items-center justify-center p-1">
                <div className="w-8 h-8 border-4 border-blue-200 rounded-full border-t-blue-500"></div>
              </div>
            </div>
          </div>
        );
      case 'bento-1': // Bento Box
        return (
          <div className="w-full h-full p-2 grid grid-cols-3 gap-1.5 bg-gray-50 rounded-md">
            <div className="col-span-2 row-span-2 bg-white border border-gray-200 rounded-md shadow-sm"></div>
            <div className="col-span-1 row-span-1 bg-white border border-gray-200 rounded-md shadow-sm"></div>
            <div className="col-span-1 row-span-2 bg-white border border-gray-200 rounded-md shadow-sm"></div>
            <div className="col-span-1 row-span-1 bg-white border border-gray-200 rounded-md shadow-sm"></div>
            <div className="col-span-1 row-span-1 bg-white border border-gray-200 rounded-md shadow-sm"></div>
          </div>
        );
      case 'testimonial-1': // Masonry Testimonials
        return (
          <div className="w-full h-full p-2 flex gap-1.5 bg-gray-50 rounded-md overflow-hidden">
            <div className="w-1/2 flex flex-col gap-1.5 mt-2">
              <div className="w-full h-10 bg-white border border-gray-200 rounded shadow-sm"></div>
              <div className="w-full h-14 bg-white border border-gray-200 rounded shadow-sm"></div>
            </div>
            <div className="w-1/2 flex flex-col gap-1.5 -mt-2">
              <div className="w-full h-14 bg-white border border-gray-200 rounded shadow-sm"></div>
              <div className="w-full h-10 bg-white border border-gray-200 rounded shadow-sm"></div>
            </div>
          </div>
        );
      case 'nav-1': // Floating Pill Navigation
        return (
          <div className="w-full h-full bg-gray-100 p-2 flex justify-center">
            <div className="w-[90%] h-5 bg-white/80 backdrop-blur rounded-full border border-gray-200 shadow-sm flex items-center justify-between px-2 mt-2">
              <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
              <div className="flex gap-1">
                <div className="w-3 h-1 bg-gray-200 rounded-full"></div>
                <div className="w-3 h-1 bg-gray-200 rounded-full"></div>
                <div className="w-3 h-1 bg-gray-200 rounded-full"></div>
              </div>
              <div className="w-4 h-2 bg-black/10 rounded-full"></div>
            </div>
          </div>
        );
      case 'mobile-1': // Splash Screen
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
             <div className="w-16 h-28 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg border-4 border-gray-800 flex flex-col items-center justify-center p-1 relative shadow-lg">
                <div className="w-6 h-6 bg-white/80 rounded-full"></div>
                <div className="absolute bottom-4 w-6 h-1 bg-white/50 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-white rounded-full"></div>
                </div>
             </div>
          </div>
        );
      case 'mobile-2': // Bottom Navigation
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
             <div className="w-16 h-28 bg-white rounded-lg border-4 border-gray-800 flex flex-col relative shadow-lg overflow-hidden">
                <div className="flex-1 bg-gray-50 p-2 flex flex-col gap-2 items-center justify-center">
                   <div className="w-8 h-8 bg-gray-200 rounded-sm"></div>
                   <div className="w-10 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-6 bg-white border-t border-gray-200 flex items-center justify-around px-1">
                   <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                   <div className="w-2.5 h-2.5 bg-gray-300 rounded-sm"></div>
                   <div className="w-2.5 h-2.5 bg-gray-300 rounded-sm"></div>
                   <div className="w-2.5 h-2.5 bg-gray-300 rounded-sm"></div>
                </div>
             </div>
          </div>
        );
      case 'mobile-3': // Settings List
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
             <div className="w-16 h-28 bg-gray-100 rounded-lg border-4 border-gray-800 flex flex-col relative shadow-lg overflow-hidden">
                <div className="w-full h-4 bg-white border-b border-gray-200 flex items-center px-2">
                   <div className="w-6 h-1.5 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex-1 p-1.5 flex flex-col gap-1.5">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="w-full h-4 bg-white rounded-sm border border-gray-200 flex items-center justify-between px-1">
                       <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                          <div className="w-4 h-1 bg-gray-300 rounded-full"></div>
                       </div>
                       <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        );
      case 'mobile-4': // Hamburger Menu
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
             <div className="w-16 h-28 bg-gray-800 rounded-lg border-4 border-gray-800 flex relative shadow-lg overflow-hidden">
                <div className="w-[75%] h-full bg-white flex flex-col shadow-xl z-10">
                   <div className="h-8 bg-blue-50 p-1.5 flex flex-col gap-1 justify-end">
                     <div className="w-4 h-4 bg-blue-200 rounded-full"></div>
                     <div className="w-6 h-1 bg-blue-300 rounded-full"></div>
                   </div>
                   <div className="flex-1 flex flex-col gap-1.5 p-1.5 mt-1">
                     {[1, 2, 3, 4].map(i => (
                       <div key={i} className="flex items-center gap-1.5">
                         <div className="w-2 h-2 bg-gray-200 rounded-sm"></div>
                         <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
                       </div>
                     ))}
                   </div>
                </div>
                <div className="w-[25%] h-full bg-black/40"></div>
             </div>
          </div>
        );
      case 'mobile-5': // Snackbar
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
             <div className="w-16 h-28 bg-white rounded-lg border-4 border-gray-800 flex flex-col relative shadow-lg overflow-hidden">
                <div className="flex-1 bg-gray-50 p-2 flex flex-col gap-1">
                  <div className="w-10 h-10 bg-gray-200 rounded-sm mt-2 mx-auto"></div>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-6 bg-gray-800 rounded flex items-center justify-between px-1.5 shadow-lg">
                   <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
                   <div className="w-3 h-1 bg-blue-400 rounded-full"></div>
                </div>
             </div>
          </div>
        );
      case 'mobile-6': // Modal/Dialog
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
             <div className="w-16 h-28 bg-gray-800 rounded-lg border-4 border-gray-800 flex items-center justify-center relative shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="w-[85%] bg-white rounded-md flex flex-col items-center p-2 z-10 shadow-xl">
                   <div className="w-6 h-2 bg-black rounded-full mb-1.5"></div>
                   <div className="w-full h-1 bg-gray-300 rounded-full mb-1"></div>
                   <div className="w-8 h-1 bg-gray-300 rounded-full mb-2"></div>
                   <div className="w-full h-3 bg-red-500 rounded-sm mb-1"></div>
                   <div className="w-full h-3 bg-gray-100 rounded-sm"></div>
                </div>
             </div>
          </div>
        );
      case 'dev-1': // JSON Formatter
      case 'dev-2': // Regex Tester
      case 'dev-3': // Base64
        return (
          <div className="w-full h-full bg-gray-50 flex flex-col p-2 gap-1.5 rounded-md border border-gray-200">
             <div className="w-full h-3 bg-white border border-gray-100 rounded"></div>
             <div className="w-full flex-1 flex gap-1.5">
               <div className="flex-1 bg-white border border-gray-100 rounded p-1">
                 <div className="w-1/2 h-0.5 bg-gray-200 mb-0.5"></div>
                 <div className="w-1/3 h-0.5 bg-gray-200 mb-0.5 ml-1"></div>
                 <div className="w-2/3 h-0.5 bg-gray-200"></div>
               </div>
               <div className="flex-1 bg-white border border-gray-100 rounded p-1">
                 <div className="w-1/3 h-0.5 bg-gray-200 mb-0.5"></div>
                 <div className="w-1/2 h-0.5 bg-gray-200"></div>
               </div>
             </div>
          </div>
        );
      default:
        // Generic fallback wireframe
        return (
          <div className="w-full h-full bg-gray-100 p-2 flex flex-col gap-1 rounded-md border border-gray-200">
            <div className="w-full h-3 bg-gray-200 rounded-sm"></div>
            <div className="w-full flex-1 bg-white rounded-sm border border-gray-200 flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-100 rounded-sm"></div>
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
