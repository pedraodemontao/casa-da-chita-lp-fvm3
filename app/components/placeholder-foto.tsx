type Props = {
 caminho: string;
 legenda?: string;
 aspect?: string; // ex.: "aspect-[4/5]", "aspect-square"
};

/**
 * Quadrado creme com borda dashed mostarda + texto indicando o caminho onde
 * a foto real deve ser salva. Usado enquanto o usuário ainda não subiu as
 * fotos. Trocar por <Image> assim que o arquivo existir.
 */
export default function PlaceholderFoto({
 caminho,
 legenda,
 aspect = "aspect-[4/5]",
}: Props) {
 return (
 <div
 className={`${aspect} bg-creme-claro border-2 border-dashed border-mostarda flex flex-col items-center justify-center p-6 text-center relative`}
 >
 <svg viewBox="0 0 100 100" className="w-12 h-12 mb-3 opacity-50">
 <circle cx="50" cy="50" r="7" fill="#E8A93B" />
 <ellipse cx="50" cy="22" rx="11" ry="18" fill="#C8232C" opacity="0.6" />
 <ellipse cx="50" cy="78" rx="11" ry="18" fill="#C8232C" opacity="0.6" />
 <ellipse cx="22" cy="50" rx="18" ry="11" fill="#E85A7A" opacity="0.6" />
 <ellipse cx="78" cy="50" rx="18" ry="11" fill="#E85A7A" opacity="0.6" />
 </svg>
 <p className="text-xs text-tinta-suave font-sans tracking-wider uppercase mb-2">
 Foto pendente
 </p>
 <code className="text-[10px] text-azul-royal/70 break-all">{caminho}</code>
 {legenda && (
 <p className="manuscrita text-lg text-vermelho-chita mt-3">
 {legenda}
 </p>
 )}
 </div>
 );
}
