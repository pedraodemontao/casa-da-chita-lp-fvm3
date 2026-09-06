import { OFERTA } from "../oferta.config";

export function TickerApp() {
  const items = [
    "Bordado à mão",
    "Funciona no seu celular",
    "Acesso vitalício",
    `${OFERTA.garantiaDias} dias de garantia`,
    "Poucos pontos, muitas cores",
    "A Jacira no seu bolso",
    "Sua primeira bolsa em um fim de semana",
    "Chita de Ouro Preto",
    "Feito com linha e amor",
  ];
  const all = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-b-2 border-mostarda/40 bg-azul-royal text-creme">
      <div className="ticker-track flex whitespace-nowrap py-3">
        {all.map((item, i) => (
          <span key={i} className="mx-8 font-sans text-sm uppercase tracking-[0.25em]">
            <span className="mr-3 text-mostarda">❀</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
