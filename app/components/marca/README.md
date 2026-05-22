# Biblioteca de componentes — Marca Casa da Chita

Componentes-base que padronizam blocos repetidos em LPs, e-mails e outras superfícies da marca.

> **Princípio:** todo bloco que aparece **3+ vezes** em produção vira componente aqui. Não criamos abstrações preventivas.

**Fonte de verdade dos tokens:** [`docs/tokens.json`](../../../../../docs/tokens.json)
**Estilos base:** [`app/globals.css`](../../globals.css)

---

## Inventário

| Componente | O que faz | Onde usar |
|---|---|---|
| `<Secao>` | Wrapper `<section>` com fundo + padding + container max-w | Toda seção de página |
| `<Eyebrow>` | Texto pequeno em uppercase com tracking — fica acima de títulos | "A virada", "A garantia" |
| `<TituloEditorial>` | H1/H2/H3 em DM Serif Display com tamanhos e cores semânticas | Headlines de seção |
| `<Destaque>` | Trecho italic vermelho dentro de título | "...da primeira bolsa." |
| `<Manuscrita>` | Span em Allura pra bordões afetivos | "Olá, querida ✿" |
| `<BotaoCta>` | Botão primário/ghost com pulse opcional + setinha | CTAs (link ou button) |
| `<Selo>` | Etiqueta envelhecida mostarda com furos laterais | Sobreposições em foto |
| `<FotoEmoldurada>` | Foto em proporção fixa com moldura dashed interna | Retratos, ateliê, bolsas |
| `<BordaTracejada>` | Borda dashed absolute dentro de container relativo | Cards coloridos |
| `<ListaItens>` | Lista com ícone (check, flor, x, ponto) | Inclusos, antes/depois |

---

## Como usar

### Importar tudo daqui
```tsx
import {
  Secao,
  Eyebrow,
  TituloEditorial,
  Destaque,
  Manuscrita,
  BotaoCta,
  ListaItens,
} from "@/app/components/marca";
```

### Exemplo — Seção típica (eyebrow + título + parágrafo + CTA)

```tsx
<Secao fundo="paper" padding="default" largura="wide">
  <div className="text-center mb-16">
    <Eyebrow>A virada</Eyebrow>
    <TituloEditorial as="h2" tamanho="lg" className="mt-3">
      De quem nunca pegou uma agulha
      <br />
      a quem bordou a <Destaque>primeira bolsa</Destaque>.
    </TituloEditorial>
  </div>

  <p className="text-lg text-tinta-suave leading-relaxed mb-8 max-w-2xl mx-auto">
    Em 7 dias, com a Jacira te guiando do risco até o acabamento.
  </p>

  <ListaItens
    formato="inline"
    items={["Acesso imediato", "14 dias de garantia", "+1.000 alunas"]}
  />

  <BotaoCta href="#oferta" pulse>
    Quero fazer minha primeira bolsa
  </BotaoCta>
</Secao>
```

### Exemplo — Hero com foto + selo

```tsx
<Secao fundo="paper" padding="generous" largura="wide">
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <Manuscrita tamanho="md" cor="vermelho-chita">Olá, querida ✿</Manuscrita>
      <TituloEditorial as="h1" tamanho="xl" leading="tight" className="mt-2 mb-6">
        Em 7 dias, sua primeira bolsa bordada.
        <br />
        <Destaque>Mesmo que você nunca tenha pegado uma agulha.</Destaque>
      </TituloEditorial>
      <BotaoCta href="#oferta" pulse>
        Quero fazer a minha primeira bolsa
      </BotaoCta>
    </div>

    <div className="relative">
      <FotoEmoldurada
        src="/fotos/jacira-loja.jpg"
        alt="Jacira na loja segurando uma bolsa"
        aspect="4-5"
        prioridade
      />
      <div className="absolute -bottom-5 -left-6 z-10">
        <Selo>feito à mão, ensinado com afeto</Selo>
      </div>
    </div>
  </div>
</Secao>
```

### Exemplo — Card colorido com borda interna

```tsx
<div className="relative bg-azul-royal text-creme p-10">
  <TituloEditorial as="h3" tamanho="sm" cor="creme">
    Como você sai em 7 dias
  </TituloEditorial>
  <ListaItens
    icone="flor"
    cor="mostarda"
    items={[
      "Você risca o desenho com confiança.",
      "Sua bolsa fica pronta com forro, alça e acabamento.",
    ]}
  />
  <BordaTracejada cor="creme" inset={2} />
</div>
```

---

## Convenções

### Naming
- Componentes em **PascalCase**, arquivos em **kebab-case**
- Props em **camelCase**, sempre em **português** (sai do padrão "global" justamente pra colar na voz da marca)
- Variantes nomeadas pelo significado (`"azul-royal"`, `"vermelho-chita"`) — NÃO `primary`/`secondary` genérico

### O que NÃO fazer aqui
- ❌ Não importar `framer-motion` direto nos componentes-base. Anime no pai.
- ❌ Não criar componente com 1 ocorrência. Espera virar padrão.
- ❌ Não hardcode HEX. Use classes Tailwind dos tokens (`bg-azul-royal`, `text-mostarda`).
- ❌ Não use `rounded-2xl`/`3xl`. Radius da marca é PEQUENO (3-4px).

### Quando criar componente novo aqui
1. Bloco já aparece em **3+ lugares** na LP/criativo/email
2. Tem identidade visual da marca (não é genérico tipo Toast/Tooltip)
3. Consome só tokens já existentes em `docs/tokens.json`

Pra `Toast`, `Modal`, `Dialog` genéricos — use shadcn/ui se vier a ser necessário (hoje a LP não precisa).

---

## Próximos componentes (backlog)

Avaliar quando houver justificativa real:

- `<Aspa>` — blockquote com aspas decorativas + borda esquerda mostarda (hoje só em `jacira.tsx`, espera 2ª ocorrência)
- `<CardDepoimento>` — card de prova social (hoje em `provas-sociais.tsx`, depende de quantos formatos)
- `<DivisorCostura>` — já existe em `decorations/divisor.tsx`, considerar mover pra cá quando padronizar variantes
- `<CtaWhatsApp>` — link estilizado pro WhatsApp da Jacira (hoje em `final-cta.tsx`)
