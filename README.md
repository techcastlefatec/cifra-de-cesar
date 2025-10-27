# 🪙 Explorador de Criptografia Interativo com base na Cifra de César

Este projeto é uma aplicação web **acadêmica**, desenvolvida com **Vite + React + TypeScript**, que demonstra de forma **visual e interativa** a evolução dos métodos de criptografia clássica — da **Cifra de César** à **Cifra de Substituição**.

🔗 **Site ao Vivo:** [https://cifra-de-cesar-eta.vercel.app/](https://cifra-de-cesar-eta.vercel.app/)

---

## 🎯 Conceitos Abordados  

O projeto busca **educar** sobre a diferença entre **cifras de transposição** e **cifras de substituição**.

### 🔸 Cifra de Transposição (Níveis 1 e 2)
- Mantém a ordem das letras, mas desloca suas posições por uma chave `k`.  
- **Matemática:**  
  \( C = (P + k) \mod N \)  
- **Exemplo:** Cifra de César.

### 🔸 Cifra de Substituição (Nível 3)
- Cada letra é mapeada para outra diferente, quebrando a relação posicional.  
- **Matemática:**  
  Permutação, onde a chave é um de \( N! \) alfabetos possíveis.

---

## ✨ Funcionalidades  

- 🔁 **Navegação por Níveis** — alternância entre métodos de criptografia.  
- 🧮 **Página Explicativa** — explica a matemática por trás das cifras.  
- 🌀 **Visualização Interativa** — roda animada mostrando deslocamentos e substituições.  
- ⚡ **Criptografia em Tempo Real** — o texto é cifrado conforme o usuário digita.  
- 🎲 **Geração de Chave Aleatória (Nível 3)** — cria alfabetos permutados.  
- 📜 **Gerenciamento de Chave** — exibe o mapeamento completo (`A → Q`, `B → X`, ...).  
- 📋 **Copiar para Área de Transferência** — chave e texto cifrado.  
- 🔓 **Descriptografia Manual** — permite reverter o texto cifrado usando uma chave válida.  

---

## 🛠️ Tecnologias Utilizadas  

| Tecnologia | Logo |
|-------------|------|
| **React (Hooks)** — `useState`, `useMemo`, `useEffect` | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" alt="React"/> |
| **Vite** — ambiente de desenvolvimento rápido e moderno | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="40" alt="Vite"/> |
| **TypeScript (TSX)** — tipagem estática e segurança de código | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" alt="TypeScript"/> |
| **Lucide React** — ícones modernos e leves | <img src="https://lucide.dev/logo.svg" width="40" alt="Lucide"/> |
| **CSS Puro** — estilização manual da moeda e responsividade | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" alt="CSS"/> |

---

## ⚙️ Estrutura dos Níveis  

### 🔑 Nível 1 — Cifra de César Clássica  
- **Alfabeto:** `A–Z`  
- **Tamanho (N):** 26  
- **Método:** Transposição simples  
- **Fórmula:** \( C = (P + k) \mod 26 \)

### 🔑 Nível 2 — Cifra de César Estendida  
- **Alfabeto:** `A–Z1234567890!*-/|+=@#$%()?.,<>`  
- **Tamanho (N):** 53  
- **Método:** Transposição ampliada  
- **Fórmula:** \( C = (P + k) \mod 53 \)

### 🔑 Nível 3 — Cifra de Substituição  
- **Alfabeto:** mesmo do Nível 2  
- **Método:** Substituição aleatória  
- **Força:** \( 53! \) combinações possíveis (impraticável por força bruta)

---

## 🔧 Como Executar Localmente  

```bash
# Clone o repositório
git clone https://URL-DO-SEU-REPOSITORIO-AQUI.git

# Entre na pasta
cd nome-da-pasta-do-projeto

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev

# Abra em seu navegador:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 🎓 Autores e Contexto Acadêmico  

📘 **Disciplina:** Matemática para Computação  
👨‍🏫 **Professor:** Fabrício  
🏫 **Instituição:** Fatec Jacareí  
💻 **Curso:** Desenvolvimento de Software Multiplataforma  

**Autores:**  
- Bruno Berval Moreira de Godoi  
- Suelen Souza Castro

