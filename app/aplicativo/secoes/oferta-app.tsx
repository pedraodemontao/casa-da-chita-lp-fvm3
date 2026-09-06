"use client";

import FadeInView from "@/app/components/animations/fade-in-view";
import { Secao, Eyebrow, TituloEditorial, Destaque, Manuscrita } from "@/app/components/marca";
import { BotaoCheckoutApp } from "../checkout-app";
import { OFERTA } from "../oferta.config";

export function OfertaApp() {
  const semLink = !OFERTA.checkoutUrl;
  return (
    <Secao id="oferta" fundo="paper" padding="nenhum" largura="full" className="py-16 md:py-28" innerClassName="max-w-3xl">
      <FadeInView>
        <div className="mb-8 text-center md:mb-10">
          <Eyebrow>A oferta</Eyebrow>
          <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
            A bolsa, os pontos e o aplicativo,
            <br />
            <Destaque>por um preço justo.</Destaque>
          </TituloEditorial>
        </div>
      </FadeInView>

      <FadeInView delay={0.1}>
        <div className="relative border-[3px] border-azul-royal bg-creme-claro p-6 md:p-12">
          {OFERTA.precoDepois && (
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-sm bg-mostarda px-5 py-2 text-xs uppercase tracking-[0.25em] text-azul-royal shadow-md">
              preço de lançamento
            </div>
          )}

          <ul className="mb-6 mt-4 space-y-3">
            {OFERTA.stack.map((s, i) => (
              <li key={i} className={`flex items-baseline justify-between gap-3 text-base ${s.novo ? "font-medium text-azul-royal" : "text-tinta-suave"}`}>
                <span className="flex gap-2">
                  <span className="text-vermelho-chita">✓</span>
                  <span>
                    {s.novo && (
                      <Manuscrita tamanho="sm" cor="vermelho-chita" className="mr-1 text-base">
                        novo ·
                      </Manuscrita>
                    )}
                    {s.item}
                  </span>
                </span>
                <span className="whitespace-nowrap font-sans tabular-nums">{s.valor}</span>
              </li>
            ))}
          </ul>

          <div className="costura my-6" />

          <div className="mb-2 flex justify-between text-base text-tinta">
            <span>Tudo isso, separado:</span>
            <span className="font-sans tabular-nums">R$ {OFERTA.valorAncorado}</span>
          </div>
          <div className="mb-8 flex justify-between text-base text-vermelho-chita">
            <span>Você paga:</span>
            <span className="font-sans tabular-nums">R$ {OFERTA.preco}</span>
          </div>

          <div className="text-center">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-tinta-suave">Pagamento único</p>
            <p className="flex items-baseline justify-center gap-2 whitespace-nowrap font-serif leading-none text-azul-royal">
              <span className="text-3xl md:text-5xl">{OFERTA.parcelas}×</span>
              <span className="text-5xl tabular-nums md:text-7xl">R$ {OFERTA.parcelaValor}</span>
            </p>
            <p className="mb-8 mt-2 text-base text-tinta-suave">
              ou <strong className="font-medium text-azul-royal">R$ {OFERTA.preco} à vista</strong>
              {OFERTA.precoDepois ? ` · depois do lançamento vai pra R$ ${OFERTA.precoDepois}` : ""}
            </p>

            <BotaoCheckoutApp className="w-full justify-center md:w-auto">Quero a Casa da Chita no meu celular</BotaoCheckoutApp>

            {semLink && (
              <p className="mt-4 text-sm text-vermelho-chita">
                Link do checkout ainda não configurado (NEXT_PUBLIC_CHECKOUT_URL_APP). Esta página está em pré-visualização.
              </p>
            )}

            <p className="mt-5 text-sm text-tinta-suave md:text-base">
              🔒 Compra segura · ♾️ Acesso vitalício · 🧵 {OFERTA.garantiaDias} dias de garantia · 💬 Falar com a gente responde uma pessoa
            </p>
          </div>
        </div>
      </FadeInView>

      <FadeInView delay={0.2}>
        <p className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-tinta-suave">
          <Manuscrita tamanho="sm" cor="vermelho-chita">★</Manuscrita>{" "}
          Menos que um cafezinho por semana, e a bolsa é sua pra sempre. Já é minha aluna do Faça Você Mesma? O aplicativo é seu de graça:{" "}
          <a href={`${OFERTA.appUrl}/login`} className="text-vermelho-chita underline decoration-dashed underline-offset-4">entra com o mesmo e-mail</a>.
        </p>
      </FadeInView>
    </Secao>
  );
}
