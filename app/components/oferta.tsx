"use client";

import FadeInView from "./animations/fade-in-view";
import Countdown24h from "./countdown-24h";
import { goToCheckout } from "./botao-compra";
import {
  Secao,
  Eyebrow,
  TituloEditorial,
  Destaque,
  Manuscrita,
  BotaoCta,
} from "./marca";

export default function Oferta() {
  // Preço de venda: R$ 127 (12× R$ 13,13 no cartão)
  const precoAtual = 127.00;
  const parcela = "13,13";

  const handleCheckout = () => goToCheckout(precoAtual);

  const stack = [
     { item: "Curso Faça Você Mesma 3.0", valor: "R$ 197" },
     { item: "Bônus #1: 35 Pontos Essenciais (biblioteca catalogada)", valor: "R$ 67" },
     { item: "Bônus #2: Encontro Ao Vivo de Boas-Vindas com a Jacira", valor: "R$ 47", destaque: true },
     { item: "Bônus #3: Kit Imprimível da Bordadeira (PDF)", valor: "R$ 37", destaque: true },
     { item: "Bônus #4: Grupo Exclusivo de Alunas", valor: "R$ 27" },
    { item: "Bônus #6: Lista de Fornecedores Testados", valor: "R$ 7" },
  ];

  return (
    <Secao
      id="oferta"
      fundo="paper"
      padding="nenhum"
      largura="full"
      className="py-16 md:py-28"
      innerClassName="max-w-3xl"
    >
        <FadeInView>
          <div className="text-center mb-8 md:mb-10">
            <Eyebrow>A oferta</Eyebrow>
            <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
              Tudo isso por um preço{" "}
              <Destaque>justo.</Destaque>
            </TituloEditorial>
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="bg-creme-claro border-[3px] border-azul-royal p-6 md:p-12 relative">
            {/* Selo OFF — centralizado no topo */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-mostarda text-azul-royal px-5 py-2 text-xs tracking-[0.25em] uppercase rounded-sm shadow-md">
              68% OFF · 24h
            </div>


            {/* Countdown no topo do card */}
            <div className="text-center mt-6 mb-8">
              <Countdown24h />
            </div>

            <ul className="space-y-3 mb-6">
              {stack.map((s, i) => (
                <li
                  key={i}
                  className={`flex justify-between items-baseline gap-3 text-sm md:text-base ${
                    s.destaque
                      ? "text-azul-royal font-medium"
                      : "text-tinta-suave"
                  }`}
                >
                  <span className="flex gap-2">
                    <span className="text-vermelho-chita">✓</span>
                    <span>
                      {s.destaque && (
                        <Manuscrita tamanho="sm" cor="vermelho-chita" className="mr-1 text-base">
                          novo ·
                        </Manuscrita>
                      )}
                      {s.item}
                    </span>
                  </span>
                  <span className="font-sans tabular-nums whitespace-nowrap">
                    {s.valor}
                  </span>
                </li>
              ))}
            </ul>

            <div className="costura my-6" />

            <div className="flex justify-between text-tinta mb-2 text-sm md:text-base">
              <span>Valor real:</span>
              <span className="font-sans tabular-nums">R$ 399</span>
            </div>
            <div className="flex justify-between text-vermelho-chita mb-8 text-sm md:text-base">
              <span>Você economiza:</span>
              <span className="font-sans tabular-nums">R$ 272</span>
            </div>

            <div className="text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-tinta-suave mb-2">
                Hoje você investe
              </p>
              <p className="font-sans text-tinta-suave text-base md:text-lg mb-1">
                de <span className="line-through tabular-nums">R$ 399</span> por
              </p>
              <p className="font-serif text-azul-royal leading-none flex items-baseline justify-center gap-2 whitespace-nowrap">
                <span className="text-3xl md:text-5xl">12×</span>
                <span className="text-5xl md:text-7xl tabular-nums">R$ {parcela}</span>
              </p>
              <p className="text-tinta-suave mt-2 mb-8 text-sm md:text-base">
                ou <strong className="text-azul-royal font-medium">R$ 127 à vista</strong>
              </p>

              <BotaoCta
                onClick={handleCheckout}
                pulse
                className="w-full md:w-auto justify-center"
              >
                Quero fazer minha primeira bolsa
              </BotaoCta>

              <p className="mt-5 text-xs md:text-sm text-tinta-suave">
                🔒 Compra segura · ♾️ Acesso vitalício · 🧵 14 dias de garantia
              </p>
            </div>

          </div>
        </FadeInView>

        {/* Nota dos bônus condicionais */}
        <FadeInView delay={0.2}>
          <p className="text-center mt-8 text-sm text-tinta-suave max-w-xl mx-auto leading-relaxed">
            <Manuscrita tamanho="sm" cor="vermelho-chita">★</Manuscrita>{" "}
            O <strong className="text-azul-royal font-normal">Encontro Ao Vivo comigo</strong> e o{" "}
            <strong className="text-azul-royal font-normal">Kit Imprimível</strong> são bônus desta rodada.
            Depois do encontro, eles saem. Se vier, vem agora.
          </p>
        </FadeInView>
    </Secao>
  );
}
