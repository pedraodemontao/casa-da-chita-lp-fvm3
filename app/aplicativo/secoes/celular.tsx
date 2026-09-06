/**
 * Mockup de celular desenhado em CSS com a tela REAL do app (mesma copy e paleta do frontend).
 * Sem imagem gerada: é a interface, não uma ilustração.
 */
type Tela = "inicio" | "cores" | "pergunta";

function TelaInicio() {
  return (
    <div className="space-y-3">
      <p className="font-serif text-[22px] leading-tight text-azul-royal">Oi, Márcia! 🌸</p>
      <p className="text-[12px] text-tinta-suave leading-snug">Continue de onde parou. Sua bolsa te espera.</p>
      <div className="bg-azul-royal text-creme p-3 rounded-[3px]">
        <p className="text-[9px] uppercase tracking-[0.2em] opacity-80">Continuar</p>
        <p className="font-serif text-[17px] leading-tight mt-1">Faça Você Mesma 3.0</p>
        <p className="text-[11px] opacity-90">Montagem da Bolsa · 45 min</p>
        <span className="inline-block mt-2 bg-vermelho-chita text-creme text-[11px] px-3 py-1.5 rounded-[3px]">▶ Continuar aula</span>
      </div>
      <div className="bg-creme-claro border border-creme-escuro p-3 rounded-[3px]">
        <p className="text-[9px] uppercase tracking-[0.2em] text-tinta-suave">Travou na cor?</p>
        <p className="font-serif text-[16px] text-azul-royal leading-tight mt-1">Cores da Chita</p>
        <p className="text-[11px] text-tinta-suave leading-snug">Manda a foto da sua chita que eu te mostro a linha que combina.</p>
      </div>
      <div className="bg-creme-claro border border-creme-escuro p-3 rounded-[3px]">
        <p className="text-[9px] uppercase tracking-[0.2em] text-tinta-suave">Bordadinho da semana</p>
        <p className="font-serif text-[16px] text-azul-royal leading-tight mt-1">Ponto caseado</p>
        <p className="text-[11px] text-tinta-suave">Serve pra prender a chita e contornar.</p>
      </div>
    </div>
  );
}

function TelaCores() {
  const linhas = [
    { cod: "Anchor 46", nome: "vermelho", hex: "#CC1E15", papel: "Fundo" },
    { cod: "Anchor 139", nome: "azul royal", hex: "#323C7F", papel: "Estampa" },
    { cod: "Anchor 290", nome: "amarelo", hex: "#E2D030", papel: "Estampa" },
    { cod: "Anchor 245", nome: "verde folha", hex: "#98A636", papel: "Realce" },
  ];
  return (
    <div className="space-y-3">
      <p className="font-serif text-[20px] leading-tight text-azul-royal">Cores da Chita</p>
      <div className="relative h-24 rounded-[3px] overflow-hidden border border-creme-escuro" style={{ backgroundImage: "url(/fotos/bordado-close-flor-vermelha.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
      <p className="text-[12px] text-tinta leading-snug">Olha só o que combina com a sua chita:</p>
      <div className="grid grid-cols-4 gap-2">
        {linhas.map((l) => (
          <div key={l.cod} className="text-center">
            <div className="h-9 rounded-[3px] border border-black/10" style={{ background: l.hex }} />
            <p className="text-[9px] font-medium leading-tight mt-1">{l.cod}</p>
            <p className="text-[8px] text-tinta-suave leading-tight">{l.papel}</p>
          </div>
        ))}
      </div>
      <div className="border-l-[3px] border-vermelho-chita bg-creme-claro p-2.5">
        <p className="text-[9px] uppercase tracking-[0.2em] text-tinta-suave">Por quê</p>
        <p className="text-[11px] leading-snug">A cor que puxa a flor pra frente é o vermelho: usa a Anchor 46 no contorno. Pra realçar, um detalhe em verde folha faz a peça acordar. Poucos pontos, muitas cores.</p>
      </div>
    </div>
  );
}

function TelaPergunta() {
  return (
    <div className="space-y-3">
      <p className="font-serif text-[20px] leading-tight text-azul-royal">Pergunta pra Jacira</p>
      <div className="bg-creme-claro border border-creme-escuro p-2.5 rounded-[3px] text-[11px] text-tinta-suave">Você perguntou: “como faço o nó francês sem embolar?”</div>
      <div className="border-l-[3px] border-vermelho-chita bg-creme-claro p-3">
        <p className="text-[12px] leading-snug">Não tem mistério. Enrola a linha duas vezes na agulha, segura o fio esticado com o polegar e entra a agulha bem juntinho de onde saiu. O segredo é não soltar a linha antes de a agulha passar.</p>
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-tinta-suave">Onde eu falo disso</p>
      <div className="space-y-1.5">
        {[
          ["12min40", "Miolos e nós · Biblioteca de Pontos"],
          ["48min05", "Chitando no linho · aula 3"],
        ].map(([t, a]) => (
          <div key={t} className="flex items-center gap-2 bg-creme-claro border border-creme-escuro p-2 rounded-[3px]">
            <span className="text-vermelho-chita text-[11px] font-medium">▶ {t}</span>
            <span className="text-[10px] text-tinta-suave truncate">{a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Celular({ tela = "inicio", className = "" }: { tela?: Tela; className?: string }) {
  return (
    <div className={`relative mx-auto w-[248px] ${className}`} aria-label={`Tela do aplicativo: ${tela}`}>
      <div className="rounded-[34px] bg-tinta p-2.5 shadow-[0_18px_40px_rgba(50,60,127,0.28)]">
        <div className="rounded-[26px] bg-creme overflow-hidden">
          <div className="h-6 flex items-center justify-center">
            <div className="h-1.5 w-16 rounded-full bg-tinta/80" />
          </div>
          <div className="px-3.5 pb-5 pt-1 min-h-[440px]">
            {tela === "inicio" && <TelaInicio />}
            {tela === "cores" && <TelaCores />}
            {tela === "pergunta" && <TelaPergunta />}
          </div>
          <div className="flex justify-around border-t border-creme-escuro bg-creme-claro py-2 text-[9px] text-tinta-suave">
            <span>Início</span>
            <span>Os pontos</span>
            <span className="text-vermelho-chita">Cores</span>
            <span>Ateliê</span>
          </div>
        </div>
      </div>
    </div>
  );
}
