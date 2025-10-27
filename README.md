# 🪙 Explorador de Criptografia Interativo  

Este projeto é uma aplicação web **acadêmica**, desenvolvida com **Vite + React + TypeScript**, que demonstra de forma **visual e interativa** a evolução dos métodos de criptografia clássica — da **Cifra de César** à **Cifra de Substituição**.

🔗 **Site ao Vivo:** [https://cifra-de-cesar-eta.vercel.app/](https://cifra-de-cesar-eta.vercel.app/)

---

## 🚀 Demonstração  

O coração do projeto é uma **“roda de cifra” interativa**, estilizada como uma **moeda de bronze**, que permite ao usuário visualizar o mapeamento entre o texto original e o texto cifrado.

> ⚠️ **IMPORTANTE:**  
> Substitua esta linha por um **GIF ou captura de tela** do seu projeto em ação.  
> Grave sua tela com programas como **LICEcap** ou **GIPHY Capture**.

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
| **React (Hooks)** — `useState`, `useMemo`, `useEffect` | <img src="https://raw.githubusercontent.com/github/explore/main/topics/react/react.png" alt="React" width="40"/> |
| **Vite** — ambiente de desenvolvimento rápido e moderno | <img src="https://raw.githubusercontent.com/github/explore/main/topics/vite/vite.png" alt="Vite" width="40"/> |
| **TypeScript (TSX)** — tipagem estática e segurança de código | <img src="https://raw.githubusercontent.com/github/explore/main/topics/typescript/typescript.png" alt="TypeScript" width="40"/> |
| **Lucide React** — ícones modernos e leves | <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/lucide.svg" alt="Lucide" width="40"/> |
| **CSS Puro** — estilização manual da moeda e responsividade | <img src="https://raw.githubusercontent.com/github/explore/main/topics/css/css.png" alt="CSS" width="40"/> |

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
