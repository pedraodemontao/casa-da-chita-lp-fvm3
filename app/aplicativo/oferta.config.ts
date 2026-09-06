/**
 * Parâmetros da oferta "Casa da Chita no seu celular" — o Pedro mexe SÓ aqui.
 * Fonte: Novos Funis/app/12-oferta-app.md (números com ⚠️ são propostas; confirmar antes do ar).
 */
type StackItem = { item: string; valor: string; novo?: boolean };

export const OFERTA = {
  nomeCampanha: "Casa da Chita no seu celular",
  /** Preço à vista em reais. ⚠️ proposta: 147 (alternativas 97 / 197). */
  preco: 147,
  /** Parcelas no cartão (Hotmart calcula o valor real; aqui é só o que a LP mostra). */
  parcelas: 12,
  parcelaValor: "14,90",
  /** Preço "depois do lançamento" — só aparece se for verdade. null = não mostra. ⚠️ */
  precoDepois: 197 as number | null,
  /** Valor ancorado do stack (soma da tabela abaixo). */
  valorAncorado: 850,
  /** Garantia incondicional em dias. ⚠️ 15 (Hotmart permite 7/15/30). */
  garantiaDias: 15,
  /** Link do checkout na Hotmart (produto novo). Vazio = botão rola pra oferta e mostra aviso. */
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL_APP || "",
  /** Onde a aluna entra depois de comprar (e onde a aluna antiga entra de graça). */
  appUrl: "https://aulas.casadachita.com",
  whatsapp: "https://wa.me/5531973039899",
  stack: [
    { item: "Faça Você Mesma 3.0 — sua primeira bolsa, do molde à ferragem (+ Bolsa Eternizada)", valor: "R$ 197" },
    { item: "Os pontos: 35 Pontos Essenciais + Desafio 25 Pontos em 7 dias", valor: "R$ 147" },
    { item: "Cores da Chita — a foto da sua chita vira a linha certa, com o porquê", valor: "R$ 97", novo: true },
    { item: "Meu próximo bordado + Mostra pra mim + Pergunta pra Jacira", valor: "R$ 147", novo: true },
    { item: "Buscar nas aulas — 48 h de acervo, 21 h de lives, tudo por minuto", valor: "R$ 97", novo: true },
    { item: "Meu ateliê — diário da peça, certificado com nome, galeria da turma, lembrete", valor: "R$ 67", novo: true },
    { item: "Onde comprar — os fornecedores da Casa da Chita", valor: "R$ 97" },
  ] as StackItem[],
};
