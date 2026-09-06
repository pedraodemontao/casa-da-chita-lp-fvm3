import { Secao, Manuscrita, TituloEditorial, Destaque, ListaItens, BotaoCta, FotoEmoldurada } from "@/app/components/marca";
import { OFERTA } from "../oferta.config";

export function FinalApp() {
  return (
    <Secao fundo="paper-claro" padding="compact" largura="large">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative">
          <FotoEmoldurada src="/fotos/jacira-segurando-varias-bolsas.jpg" alt="Jacira com várias bolsas bordadas em chita" aspect="4-5" corMoldura="creme" />
        </div>
        <div>
          <Manuscrita tamanho="lg" cor="vermelho-chita" className="mb-4">
            uma última coisa…
          </Manuscrita>
          <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mb-6">
            Imagina olhar pra bolsa na sua mão e dizer: <Destaque>fui eu que fiz.</Destaque>
          </TituloEditorial>
          <p className="mb-8 font-serif text-lg italic text-tinta-suave">
            Em um fim de semana isso pode ser real.
            <br />
            E depois, toda noite, eu fico no seu celular. Vem com a gente?
          </p>
          <ListaItens formato="inline" cor="vermelho-chita" items={["Acesso vitalício", `${OFERTA.garantiaDias} dias de garantia`, "Funciona no seu celular"]} className="mb-9" />
          <BotaoCta href="#oferta" pulse dataEvent="cta_scroll_oferta" className="cta-secundaria">
            Quero a Casa da Chita no meu celular
          </BotaoCta>
        </div>
      </div>
    </Secao>
  );
}
