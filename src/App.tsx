import { useState } from "react";
import "./App.css";
import NivelUm from "./components/NivelUm";
import NivelDois from "./components/NivelDois"; // Certifique-se de que este arquivo exista
import NivelTres from "./components/NivelTres";
import {
  Home,
  Key,
  HardDrive,
  Shuffle,
  ArrowRight, // Ícone importado
} from "lucide-react";

// Definição dos tipos de visualização
type View = "inicio" | "nivel1" | "nivel2" | "nivel3";

/**
 * Componente da Página Inicial
 * Contém a explicação teórica e matemática do projeto.
 */
const PaginaInicial = () => (
  <div className="home-content">
    <h2>Explorando a Criptografia: Da Cifra Clássica à Substituição</h2>
    <p>
      Bem-vindo a este projeto interativo sobre criptografia. O objetivo é
      demonstrar visualmente a evolução dos métodos de cifragem, da simples
      transposição (Cifra de César) até a substituição monoalfabética.
    </p>

    {/* ================================================================ */}
    {/* ================== SEÇÃO DE CONTEXTO HISTÓRICO ================= */}
    {/* ================================================================ */}
    <h3>Contexto Histórico: A Cifra Original</h3>
    <p>
      A criptografia clássica começa com um dos nomes mais famosos da história:
      Júlio César.
    </p>

    <div className="home-image-container">
      <img
        src="/estatua.png"
        alt="Estátua de Júlio César"
        className="home-image"
      />
    </div>

    <p>
      Júlio César, o lendário general e ditador romano, utilizava um método
      simples, porém eficaz, para proteger suas comunicações militares. Esse
      método, hoje conhecido como <strong>Cifra de César</strong>, é um dos
      primeiros exemplos documentados de criptografia.
    </p>
    <p>
      A cifra era usada para enviar mensagens confidenciais aos seus generais.
      Se um mensageiro fosse interceptado pelo inimigo, a mensagem pareceria um
      amontoado de letras sem sentido, protegendo os planos de guerra romanos.
    </p>
    <p>
      O funcionamento era direto: César simplesmente substituía cada letra da
      sua mensagem por outra, avançando um número fixo de posições no alfabeto.
      Historicamente, ele usava um deslocamento (ou chave) de 3. Assim:
    </p>
    <p className="text-map">
      'A' <span>se tornava</span> 'D'
    </p>
    <p className="text-map">
      'B' <span>se tornava</span> 'E'
    </p>
    <p className="text-map">
      'C' <span>se tornava</span> 'F'
    </p>
    <p>...e assim por diante.</p>
    <p>
      Este projeto interativo explora a lógica matemática por trás dessa ideia
      simples e como ela evoluiu para métodos muito mais seguros.
    </p>
    {/* ================================================================ */}
    {/* ================================================================ */}

    <h3>Nível 1 & 2: A Matemática da Transposição (Aritmética Modular)</h3>
    <p>
      Os Níveis 1 e 2 demonstram o funcionamento matemático da Cifra de César, um
      método de <strong>Cifra de Transposição</strong>. Como vimos, a ideia é
      "deslocar" (transpor) cada caractere do alfabeto por um número fixo{" "}
      <code>k</code>, que é a chave de criptografia.
    </p>
    <p>
      A operação matemática central que permite esse "giro" no alfabeto é a{" "}
      <strong>aritmética modular</strong>. A fórmula para criptografar cada
      caractere é:
    </p>
    <code className="formula">C = (P + k) mod N</code>
    <p>
      Onde:
    </p>
    <ul>
      <li>
        <code>C</code> é o índice do caractere cifrado.
      </li>
      <li>
        <code>P</code> é o índice do caractere original (ex: A=0, B=1, ...).
      </li>
      <li>
        <code>k</code> é a chave (o número de posições a deslocar).
      </li>
      <li>
        <code>N</code> é o tamanho total do alfabeto.
      </li>
    </ul>
    <p>
      O operador <strong>módulo</strong> (<code>mod</code>) é o que faz o
      alfabeto "dar a volta". Por exemplo, se <code>N=26</code> (Nível 1) e
      você está em 'Z' (índice 25) e soma 1, o resultado{" "}
      <code>(25 + 1) mod 26 = 0</code>, que o leva de volta ao 'A'.
    </p>
    <p>
      A única diferença entre o Nível 1 (<code>N=26</code>) e o Nível 2 (
      <code>N=53</code>) é o tamanho do conjunto de caracteres, o que altera o
      valor do módulo <code>N</code>. A descriptografia é a operação inversa:
    </p>
    <code className="formula">P = (C - k) mod N</code>

    <h3>Nível 3: O Poder da Cifra de Substituição (Permutação)</h3>
    <p>
      O Nível 3 apresenta um salto em complexidade e segurança, usando uma
      <strong>Cifra de Substituição</strong>. Em vez de um simples deslocamento
      numérico (transposição), criamos um mapeamento um-para-um onde cada
      caractere do alfabeto original é mapeado para um caractere diferente em um
      alfabeto embaralhado.
    </p>
    <p>
      A matemática por trás disso é a <strong>permutação</strong>. A "chave" não
      é mais um único número <code>k</code>, mas sim o alfabeto inteiro
      embaralhado.
    </p>
    <p>
      A força desta cifra está no número de chaves possíveis. Para um alfabeto de
      tamanho <code>N</code>, o número de chaves (permutações) é{" "}
      <code>N!</code> (N-fatorial).
    </p>
    <ul>
      <li>
        <strong>
          Nível 1 (<code>N=26</code>):
        </strong>{" "}
        Apenas 25 chaves possíveis (facilmente quebrável por força bruta).
      </li>
      <li>
        <strong>
          Nível 3 (<code>N=53</code>):
        </strong>{" "}
        <code>53!</code> chaves possíveis. Este é um número com 69 dígitos
        (aproximadamente <code>1.4 x 10<sup>69</sup></code>), tornando a força
        bruta computacionalmente impossível.
      </li>
    </ul>
    <p>
      A descriptografia é feita consultando o mapeamento inverso: se a chave
      mapeia 'A'
      {/* Ícone de seta usado aqui */}
      <ArrowRight
        size={16}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          margin: "0 4px",
        }}
      />
      'Q', a descriptografia usa o mapa 'Q'
      {/* Ícone de seta usado aqui */}
      <ArrowRight
        size={16}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          margin: "0 4px",
        }}
      />
      'A'.
    </p>
  </div>
);

/**
 * Componente Principal da Aplicação
 */
export default function App() {
  const [activeView, setActiveView] = useState<View>("inicio");

  const renderView = () => {
    switch (activeView) {
      case "nivel1":
        return <NivelUm />;
      case "nivel2":
        // Certifique-se de que o componente NivelDois exista e seja importado
        return <NivelDois />;
      case "nivel3":
        return <NivelTres />;
      case "inicio":
      default:
        return <PaginaInicial />;
    }
  };

  return (
    // A classe .app já aplica o fundo escuro
    <div className="app">
      {/* Menu de Navegação */}
      <nav className="app-nav">
        <button
          className={`nav-button ${activeView === "inicio" ? "active" : ""}`}
          onClick={() => setActiveView("inicio")}
        >
          <Home size={16} />
          Início
        </button>
        <button
          className={`nav-button ${activeView === "nivel1" ? "active" : ""}`}
          onClick={() => setActiveView("nivel1")}
        >
          <Key size={16} />
          Nível 1 (A-Z)
        </button>
        <button
          className={`nav-button ${activeView === "nivel2" ? "active" : ""}`}
          onClick={() => setActiveView("nivel2")}
        >
          <HardDrive size={16} />
          Nível 2 (Ext)
        </button>
        <button
          className={`nav-button ${activeView === "nivel3" ? "active" : ""}`}
          onClick={() => setActiveView("nivel3")}
        >
          <Shuffle size={16} />
          Nível 3 (Subst)
        </button>
      </nav>

      {/* Conteúdo Principal */}
      <main className="content-area">{renderView()}</main>
    </div>
  );
}
