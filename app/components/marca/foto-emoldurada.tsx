import Image from "next/image";

/**
 * Foto com proporção fixa e moldura dashed interna — assinatura visual da marca.
 * Use pra retratos da Jacira, fotos do ateliê, fotos de bolsas em uso.
 *
 * @example
 * <FotoEmoldurada
 *   src="/fotos/jacira-loja.jpg"
 *   alt="Jacira na loja segurando uma bolsa"
 *   aspect="4-5"
 *   prioridade
 * />
 */

type Aspect = "1-1" | "3-4" | "4-5" | "16-9";
type CorMoldura = "creme" | "azul-royal" | "mostarda";

const aspectClass: Record<Aspect, string> = {
  "1-1": "aspect-square",
  "3-4": "aspect-[3/4]",
  "4-5": "aspect-[4/5]",
  "16-9": "aspect-video",
};

const molduraClass: Record<CorMoldura, string> = {
  creme: "border-creme/70",
  "azul-royal": "border-azul-royal/40",
  mostarda: "border-mostarda/60",
};

type Props = {
  src: string;
  alt: string;
  aspect?: Aspect;
  corMoldura?: CorMoldura;
  prioridade?: boolean;
  /** Tamanhos responsivos pro Next/Image. Default: 100vw mobile, 50vw desktop. */
  sizes?: string;
  className?: string;
};

export function FotoEmoldurada({
  src,
  alt,
  aspect = "4-5",
  corMoldura = "creme",
  prioridade = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
}: Props) {
  return (
    <div className={`${aspectClass[aspect]} relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={prioridade}
        className="object-cover"
        sizes={sizes}
      />
      <div
        className={`absolute inset-2 border-2 border-dashed ${molduraClass[corMoldura]} pointer-events-none`}
        aria-hidden
      />
    </div>
  );
}
