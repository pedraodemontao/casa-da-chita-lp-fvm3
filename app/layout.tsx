import type { Metadata } from "next";
import { DM_Serif_Display, Inter, Allura } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Microsoft Clarity — heatmaps + session replay
const CLARITY_PROJECT_ID = "wtejljm2z9";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
  display: "swap",
});

const SITE_URL = "https://casa-da-chita.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Faça Você Mesma 3.0 — Curso de Bolsas Bordadas em Chita | Casa da Chita",
  description:
    "Em 7 dias, sua primeira bolsa bordada — mesmo que você nunca tenha pegado uma agulha. Com a Jacira, da Casa da Chita.",
  openGraph: {
    title: "Faça Você Mesma 3.0 — Bolsa bordada em 7 dias",
    description:
      "Mesmo que você nunca tenha pegado uma agulha. Curso completo com a Jacira + Encontro Ao Vivo + 14 dias de garantia.",
    url: SITE_URL,
    siteName: "Casa da Chita",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og/og-image.png",
        width: 1080,
        height: 1080,
        alt: "Faça Você Mesma 3.0 — Curso de bolsas bordadas em chita com a Jacira, da Casa da Chita",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faça Você Mesma 3.0 — Bolsa bordada em 7 dias",
    description:
      "Mesmo que você nunca tenha pegado uma agulha. Com a Jacira, da Casa da Chita.",
    images: ["/og/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSerif.variable} ${inter.variable} ${allura.variable}`}
      // Extensões de navegador (LanguageTool, Grammarly, etc.) injetam
      // atributos no <html> antes do React hidratar. Esse flag silencia
      // só os atributos do próprio <html> — nada dentro dele é afetado.
      suppressHydrationWarning
    >
      <head />
      {/* Meta Pixel: NÃO carregado aqui. O GTM (container GTM-5PHRGX22, via
          track.casadachita.com) é o dono do Pixel + eventos. Carregar o pixel
          manual aqui duplicava o PageView. */}

      {/* Microsoft Clarity — heatmaps + session replay */}
      <Script
        id="ms-clarity"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
`,
        }}
      />

      {/* Utmify — captura e persiste UTMs por toda a sessão */}
      <Script
        id="utmify"
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        strategy="afterInteractive"
        data-utmify-prevent-xcod-sck=""
        data-utmify-prevent-subids=""
        async
        defer
      />
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
