import React from 'react';

interface AdSlotProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
}

export default function AdSlot({ adSlot, adFormat = "auto", fullWidthResponsive = true }: AdSlotProps) {
  return (
    <div className="w-full my-8 bg-black/10 rounded-xl overflow-hidden glass min-h-[100px] flex items-center justify-center border border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        {/* Placeholder for Development - En Producción, Next/Script llenará este bloque */}
        <div className="text-slate-500 font-mono text-sm opacity-50 flex items-center gap-2 z-10">
            [AdSense Unit ID: {adSlot}]
        </div>
        <ins 
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-8338467922774671"
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        />
    </div>
  );
}
