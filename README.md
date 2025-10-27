rador de Criptografia Interativo

Este projeto é uma aplicação web acadêmica, desenvolvida com Vite + React + TSX, que demonstra de forma visual e interativa a evolução dos métodos de criptografia clássica, desde a Cifra de César até a Cifra de Substituição.

Site ao Vivo: https://cifra-de-cesar-eta.vercel.app/

🚀 Demonstração

O coração do projeto é uma "roda de cifra" interativa, estilizada como uma moeda de bronze, que permite ao usuário visualizar o mapeamento entre o texto original e o texto cifrado.

$$\!\!\! IMPORTANTE \!\!\!$$

Substitua esta linha por um GIF ou uma captura de tela do seu projeto em ação. Grave sua tela usando um programa como LICEcap, GIPHY Capture ou similar.

🎯 Conceitos Abordados

O objetivo principal é educar sobre a diferença fundamental entre cifras de transposição e substituição.

Cifra de Transposição (Níveis 1 e 2): A Cifra de César. A ordem das letras é mantida, mas sua posição é "deslocada" por uma chave $k$.

Matemática: Aritmética Modular, onde $C = (P + k) \mod N$.

Cifra de Substituição (Nível 3): Cada letra é mapeada para uma letra diferente, quebrando a relação posicional.

Matemática: Permutação, onde a chave é um de $N!$ (N-fatorial) alfabetos embaralhados possíveis.

✨ Funcionalidades

Navegação por Níveis: O menu principal permite alternar entre os diferentes métodos de criptografia.

Página Inicial Explicativa: Um texto detalhado explicando a matemática por trás de cada cifra.

Visualização Interativa: Uma "roda de cifra" que gira para demonstrar o deslocamento (Níveis 1 e 2) ou exibe o mapeamento aleatório (Nível 3).

Criptografia em Tempo Real: O texto é cifrado instantaneamente à medida que o usuário digita.

Geração de Chave (Nível 3): Um botão "Embaralhar" cria uma nova chave de substituição (um alfabeto permutado) de forma aleatória.

Gerenciamento de Chave (Nível 3):

Visualização do mapeamento completo (A -> Q, B -> X, ...).

Exibição da chave como uma string única.

Funcionalidade de "Copiar para Área de Transferência" para a chave e para o texto cifrado.

Descriptografia Manual (Nível 3): O usuário pode colar um texto cifrado e uma chave válida para reverter o processo.

🛠️ Tecnologias Utilizadas

React (com Hooks): useState, useMemo e useEffect para gerenciar o estado da interface, os textos e as chaves. 

Vite: Ambiente de desenvolvimento frontend moderno e ultrarrápido. 

TypeScript (TSX): Para adicionar tipagem estática e robustez ao código. 

Lucide React: Biblioteca de ícones leve e moderna. 

CSS: Estilização pura (sem frameworks) para criar o visual de "moeda de bronze" e garantir a responsividade. 

⚙️ Estrutura dos Níveis

O projeto é dividido em três níveis para demonstrar a progressão da complexidade:

🔑 Nível 1: Cifra de César Clássica

Alfabeto: ABCDEFGHIJKLMNOPQRSTUVWXYZ

Tamanho (N): 26

Método: Transposição (deslocamento com botões).

Matemática: $C = (P + k) \mod 26$

🔑 Nível 2: Cifra de César Estendida

Alfabeto: ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!*-/|+=@#$%()?.,<>

Tamanho (N): 53

Método: Transposição (igual ao Nível 1, mas com um conjunto maior).

Matemática: $C = (P + k) \mod 53$

🔑 Nível 3: Cifra de Substituição

Alfabeto: O mesmo alfabeto estendido do Nível 2.

Tamanho (N): 53

Método: Substituição (mapeamento 1-para-1 aleatório).

Chave: O alfabeto inteiro embaralhado.

Força: $53!$ (fatorial de 53) chaves possíveis, tornando a força bruta impossível.

🔧 Como Executar Localmente

Para rodar este projeto em sua máquina, siga os passos abaixo:

Clone o repositório:

git clone [https://URL-DO-SEU-REPOSITORIO-AQUI.git](https://URL-DO-SEU-REPOSITORIO-AQUI.git)
cd nome-da-pasta-do-projeto



Instale as dependências:

npm install



Execute o servidor de desenvolvimento:

npm run dev



Abra em seu navegador:

Acesse http://localhost:5173 (ou a porta indicada pelo Vite).

🎓 Autores e Contexto Acadêmico

Este projeto foi desenvolvido como parte da avaliação da disciplina de Matemática para Computação, sob orientação do Prof. Fabrício.

Instituição: Fatec Jacareí

Curso: Desenvolvimento de Software Multiplataforma

Autores:

Bruno Berval Moreira de Godoi

Suelen Souza Castro
