// Divisor com linha tracejada (costura) — limpo, sem flor
export function DivisorCostura() {
 return (
 <div className="w-full py-10 flex items-center justify-center gap-6">
 <div className="flex-1 max-w-xs h-0 border-t-2 border-dashed border-mostarda opacity-50" />
 <span className="text-mostarda text-2xl select-none" aria-hidden="true">·</span>
 <div className="flex-1 max-w-xs h-0 border-t-2 border-dashed border-mostarda opacity-50" />
 </div>
 );
}
