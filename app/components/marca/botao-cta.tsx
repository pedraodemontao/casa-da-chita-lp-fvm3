"use client";

import { type ReactNode, type MouseEventHandler } from "react";

/**
 * Botão de CTA principal da Casa da Chita.
 * Usa as classes `.cta-primary` ou `.cta-ghost` definidas em globals.css.
 *
 * - variant="primary"  → vermelho-chita com bottom-shadow (efeito papel pressionado)
 * - variant="ghost"    → outline azul-royal sobre fundo claro
 * - pulse              → adiciona animação `cta-pulse-soft`
 * - Aceita `href` (renderiza <a>) ou `onClick` (renderiza <button>)
 * - Setinha `→` no fim opcional via `seta`
 *
 * @example
 * <BotaoCta href="#oferta" pulse>Quero fazer minha primeira bolsa</BotaoCta>
 * <BotaoCta onClick={handleCheckout}>Garantir minha vaga</BotaoCta>
 * <BotaoCta variant="ghost" href="#duvidas">Saber mais</BotaoCta>
 */

type Variant = "primary" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  pulse?: boolean;
  /** Adiciona seta "→" no fim (default true). */
  seta?: boolean;
  className?: string;
};

type AnchorProps = CommonProps & {
  href: string;
  onClick?: never;
  target?: string;
  rel?: string;
};

type ButtonProps = CommonProps & {
  href?: never;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
};

type Props = AnchorProps | ButtonProps;

export function BotaoCta(props: Props) {
  const { children, variant = "primary", pulse, seta = true, className = "" } = props;

  const baseClass = variant === "primary" ? "cta-primary" : "cta-ghost";
  const pulseClass = pulse ? "cta-pulse-soft" : "";
  const finalClass = `${baseClass} ${pulseClass} ${className}`.trim();

  const conteudo = (
    <>
      {children}
      {seta && <span aria-hidden>→</span>}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={finalClass}
      >
        {conteudo}
      </a>
    );
  }

  return (
    <button
      type={"type" in props ? props.type ?? "button" : "button"}
      onClick={"onClick" in props ? props.onClick : undefined}
      className={finalClass}
    >
      {conteudo}
    </button>
  );
}
