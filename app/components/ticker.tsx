// Ticker rolante no topo da página — mistura termos comerciais + experiência do produto.
export default function Ticker() {
  const items = [
    "Bordado à mão",
    "Acesso vitalício",
    "Chita de Ouro Preto",
    "14 dias de garantia",
    "Passo a passo com a Jacira",
    "+1.000 alunas",
    "Do risco ao acabamento",
    "Encontro ao vivo com a Jacira",
    "Sua primeira bolsa em 7 noites",
    "Feito com linha e amor",
  ];
  const all = [...items, ...items, ...items];

  return (
    <div className="bg-azul-royal text-creme overflow-hidden border-b-2 border-mostarda/40">
      <div className="ticker-track flex whitespace-nowrap py-3">
        {all.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm tracking-[0.25em] uppercase font-sans"
          >
            <span className="text-mostarda mr-3">❀</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
