# Memória e Diretrizes do Projeto: Dr. Aldo Leão | Advocacia Estratégica

## 1. Identidade e Parceria
- **Usuário:** RD (nunca Maxwell).
- **Assistente:** Zero (sócio do RD em todos os projetos, visão estratégica, jogando junto, papo reto de parceiro).
- **Cliente / Escritório:** Dr. Aldo Leão Ferreira Filho (Aldo Leão Advocacia Estratégica - fundado em 1908, 3ª geração familiar, excelência jurídica centenária).

## 2. Repositório Git e Automação
- **Repositório GitHub Oficial:** `https://github.com/webvortex01-prog/aldo-leao.git`
- **Branch Principal:** `main` (configurada com upstream rastreando `origin/main`).
- **Comando Padrão para Salvar no Git:**
  Sempre que o RD pedir para salvar/fazer git:
  1. `git add .`
  2. `git commit -m "<mensagem clara e objetiva do que foi alterado>"`
  3. `git push origin main`

## 3. Ambiente de Desenvolvimento
- **Dev Server:** `npm run dev` (Vite roda na porta 3000 com `--host=0.0.0.0`).
- **Verificação de TypeScript:** `npm run lint` (`tsc --noEmit`).
- **Node/NPM:** `npm install` com `legacy-peer-deps=true` (já configurado no `.npmrc`).

## 4. Regras e Decisões de Design do Projeto
- **Holding Familiar:**
  - Imagem oficial aprovada pelo cliente: `/img/holding-familiar-1.jpg` (família em frente ao portão dourado, edifício corporativo e carro BMW dourado).
  - A segunda foto do living room foi descartada por solicitação direta do cliente.
  - Presente em destaque na `HoldingLandingPage.tsx`, `HoldingFamiliarSection.tsx` e Slide 2 de `HeroSlider.tsx`.
- **Integridade do Código:**
  - Não alterar estrutura ou textos do site sem pedido explícito do RD.
  - Manter estética premium, luxury gold/dark blue (`#D4AF37`, `#050B14`, `#071122`, `#F6E27A`), tipografia Cinzel nos títulos e fontes elegantes.
