import type { Metadata } from "next";
import type { ReactNode } from "react";
import { OFERTA } from "./oferta.config";

// LP de venda — "Casa da Chita no seu celular" (FVM 3.0 + 35 Pontos + aplicativo).
// Fonte de verdade da oferta: Novos Funis/app/12-oferta-app.md. Parâmetros em ./oferta.config.ts.
export const metadata: Metadata = {
  title: `${OFERTA.nomeCampanha} — sua primeira bolsa de chita e a Jacira no seu bolso | Casa da Chita`,
  description:
    "Sua primeira bolsa de chita em um fim de semana, os 35 pontos um por um e um aplicativo que te diz a cor, o ponto e o que bordar depois. Não tem mistério. Agora tem aplicativo.",
  openGraph: {
    title: `${OFERTA.nomeCampanha} — Casa da Chita`,
    description: "A aula da bolsa, os pontos e a Jacira no seu celular pra você nunca travar sozinha. Pagamento único, acesso vitalício.",
    type: "website",
    locale: "pt_BR",
    siteName: "Casa da Chita",
    images: [{ url: "/og/og-aplicativo.png", width: 1200, height: 630, alt: "Casa da Chita no seu celular" }],
  },
  robots: { index: true, follow: true },
};

export default function AplicativoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
