import { useState, useEffect } from 'react';
import { Monitor, AlertTriangle, CheckCircle } from 'lucide-react';

export default function App() {
  const [supportsP3, setSupportsP3] = useState(false);

  useEffect(() => {
    // Check if the browser and display support the P3 color gamut
    if (window.matchMedia && window.matchMedia('(color-gamut: p3)').matches) {
      setSupportsP3(true);
    }
  }, []);

  const colorPairs = [
    {
      name: 'Pure Red',
      srgb: 'rgb(255, 0, 0)',
      p3: 'color(display-p3 1 0 0)',
      description: 'P3 Red pushes further into the visible spectrum, looking almost incredibly bright compared to standard red.'
    },
    {
      name: 'Pure Green',
      srgb: 'rgb(0, 255, 0)',
      p3: 'color(display-p3 0 1 0)',
      description: 'P3 Green is much more saturated. Standard sRGB struggles to represent rich, natural greens accurately.'
    },
    {
      name: 'Pure Blue',
      srgb: 'rgb(0, 0, 255)',
      p3: 'color(display-p3 0 0 1)',
      description: 'The difference in blue is often more subtle, but P3 provides a deeper, richer tone.'
    },
    {
      name: 'Vibrant Orange',
      srgb: 'rgb(255, 128, 0)',
      p3: 'color(display-p3 1 0.5 0)',
      description: 'Mixed colors like orange and cyan benefit greatly from the extended P3 gamut.'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white flex items-center justify-center gap-3">
            <Monitor className="w-10 h-10 text-blue-400" />
            Display P3 vs sRGB
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            This tool generates colors using CSS level 4 color functions. It forces your browser to render standard sRGB next to wide-gamut Display P3 colors.
          </p>
        </div>

        {/* Support Banner */}
        <div className={`p-4 rounded-xl flex items-center gap-4 ${supportsP3 ? 'bg-emerald-900/30 border border-emerald-800' : 'bg-amber-900/30 border border-amber-800'}`}>
          {supportsP3 ? (
            <CheckCircle className="w-8 h-8 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0" />
          )}
          <div>
            <h3 className={`font-semibold text-lg ${supportsP3 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {supportsP3 ? 'Your browser and display support P3!' : 'P3 Gamut not detected'}
            </h3>
            <p className="text-sm text-neutral-300">
              {supportsP3
                ? 'If your Mac is set to the "Display P3" color profile, you will see a difference below. The right side should look more vibrant.'
                : 'Your current screen or browser does not seem to support wide-gamut colors. Make sure you are on a compatible device and your Mac color profile is set to "Display P3".'}
            </p>
          </div>
        </div>

        {/* Color Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colorPairs.map((pair, index) => (
            <div key={index} className="bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 shadow-xl">

              <div className="flex h-48 w-full">
                {/* sRGB Side */}
                <div
                  className="w-1/2 flex items-center justify-center relative group"
                  style={{ backgroundColor: pair.srgb }}
                >
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="font-mono text-xs text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                       {pair.srgb}
                     </span>
                  </div>
                </div>

                {/* P3 Side */}
                <div
                  className="w-1/2 flex items-center justify-center relative group"
                  style={{ backgroundColor: pair.p3 }}
                >
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="font-mono text-xs text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                       {pair.p3}
                     </span>
                  </div>
                </div>
              </div>

              {/* Labels & Description */}
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-neutral-400 uppercase tracking-wider">sRGB</span>
                  <h2 className="text-xl font-bold text-white">{pair.name}</h2>
                  <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">Display P3</span>
                </div>
                <p className="text-sm text-neutral-400 text-center">
                  {pair.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="text-center p-6 text-sm text-neutral-500">
          <p>If both sides look exactly the same, your display is currently operating in the sRGB gamut.</p>
        </div>

      </div>
    </div>
  );
}
