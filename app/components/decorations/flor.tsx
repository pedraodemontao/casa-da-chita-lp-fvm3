// Flor decorativa SVG inspirada na estampa de chita real.
// Variantes: simples (cantos), grande (destaque), animada (bordando-se).

type Props = {
 size?: number;
 variant?: "simples" | "grande";
 className?: string;
 animate?: boolean; // bordar-se ao aparecer
};

export function FlorChita({
 size = 80,
 variant = "simples",
 className = "",
 animate = false,
}: Props) {
 const animClass = animate ? "flor-bordando" : "";

 if (variant === "grande") {
 return (
 <svg
 viewBox="0 0 120 120"
 width={size}
 height={size}
 className={`${animClass} ${className}`}
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 >
 {/* miolo */}
 <circle cx="60" cy="60" r="10" fill="#E8A93B" stroke="#9E1A22" strokeWidth="1.5" />
 {/* pétalas vermelhas verticais */}
 <ellipse cx="60" cy="22" rx="14" ry="22" fill="#C8232C" stroke="#9E1A22" />
 <ellipse cx="60" cy="98" rx="14" ry="22" fill="#C8232C" stroke="#9E1A22" />
 {/* pétalas rosa horizontais */}
 <ellipse cx="22" cy="60" rx="22" ry="14" fill="#E85A7A" stroke="#9E1A22" />
 <ellipse cx="98" cy="60" rx="22" ry="14" fill="#E85A7A" stroke="#9E1A22" />
 {/* folhas verdes diagonais */}
 <ellipse cx="32" cy="32" rx="16" ry="11" fill="#2E7D32" stroke="#1B5E20" transform="rotate(45 32 32)" />
 <ellipse cx="88" cy="32" rx="16" ry="11" fill="#2E7D32" stroke="#1B5E20" transform="rotate(-45 88 32)" />
 <ellipse cx="32" cy="88" rx="16" ry="11" fill="#1B5E20" stroke="#1B5E20" transform="rotate(-45 32 88)" />
 <ellipse cx="88" cy="88" rx="16" ry="11" fill="#1B5E20" stroke="#1B5E20" transform="rotate(45 88 88)" />
 {/* pontilhado decorativo central */}
 <circle cx="60" cy="60" r="3" fill="#1F3A8A" />
 </svg>
 );
 }

 return (
 <svg
 viewBox="0 0 100 100"
 width={size}
 height={size}
 className={`${animClass} ${className}`}
 >
 <circle cx="50" cy="50" r="7" fill="#E8A93B" />
 <ellipse cx="50" cy="22" rx="11" ry="18" fill="#C8232C" />
 <ellipse cx="50" cy="78" rx="11" ry="18" fill="#C8232C" />
 <ellipse cx="22" cy="50" rx="18" ry="11" fill="#E85A7A" />
 <ellipse cx="78" cy="50" rx="18" ry="11" fill="#E85A7A" />
 <ellipse cx="30" cy="30" rx="13" ry="9" fill="#2E7D32" transform="rotate(45 30 30)" />
 <ellipse cx="70" cy="30" rx="13" ry="9" fill="#2E7D32" transform="rotate(-45 70 30)" />
 <ellipse cx="30" cy="70" rx="13" ry="9" fill="#1B5E20" transform="rotate(-45 30 70)" />
 <ellipse cx="70" cy="70" rx="13" ry="9" fill="#1B5E20" transform="rotate(45 70 70)" />
 </svg>
 );
}

// Agulha SVG custom (substitui Lucide / emoji 🪡)
export function Agulha({ size = 32, className = "" }: { size?: number; className?: string }) {
 return (
 <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
 <circle cx="6" cy="6" r="3" />
 <line x1="9" y1="9" x2="26" y2="26" strokeLinecap="round" />
 <line x1="6" y1="6" x2="4" y2="4" strokeLinecap="round" />
 </svg>
 );
}

// Bastidor SVG (aro de bordado)
export function Bastidor({ size = 32, className = "" }: { size?: number; className?: string }) {
 return (
 <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
 <circle cx="16" cy="17" r="11" />
 <circle cx="16" cy="17" r="13" strokeDasharray="2 2" opacity="0.4" />
 <rect x="14" y="2" width="4" height="6" rx="1" fill="currentColor" />
 </svg>
 );
}

// Novelo de linha
export function Novelo({ size = 32, className = "" }: { size?: number; className?: string }) {
 return (
 <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
 <ellipse cx="16" cy="18" rx="11" ry="9" />
 <path d="M 7 14 Q 16 8, 25 14" strokeLinecap="round" />
 <path d="M 7 18 Q 16 12, 25 18" strokeLinecap="round" />
 <path d="M 7 22 Q 16 16, 25 22" strokeLinecap="round" />
 <line x1="20" y1="25" x2="28" y2="30" strokeLinecap="round" />
 </svg>
 );
}

// Coração bordado (referência ao Coração Bordado da Jacira)
export function CoracaoBordado({ size = 32, className = "" }: { size?: number; className?: string }) {
 return (
 <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
 <path
 d="M 16 27 C 16 27, 4 18, 4 11 C 4 7, 7 4, 11 4 C 13 4, 15 5, 16 7 C 17 5, 19 4, 21 4 C 25 4, 28 7, 28 11 C 28 18, 16 27, 16 27 Z"
 strokeDasharray="2 1.5"
 />
 </svg>
 );
}
