import { useState } from "react";
import {
  MessageSquare,
  KeyRound,
  RotateCcw,
  RotateCw,
  HelpCircle,
} from "lucide-react";
import "../App.css";

// Alfabeto base para a cifra
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function NivelUm() {
  // Estado para o deslocamento (shift) em graus acumulados
  const [shift, setShift] = useState(0);
  // Estado para o texto original
  const [text, setText] = useState("");

  // Calcula o "passo" de cada letra em graus
  const step = 360 / alphabet.length; // 13.84... graus

  // Função para aplicar a Cifra de César
  const encrypt = (input: string, shiftInDegrees: number) => {
    // Converte o deslocamento de graus para um índice (0-25)
    // Usamos Math.round para "travar" na letra mais próxima
    const offset = Math.round(shiftInDegrees / step);

    return input
      .toUpperCase()
      .split("")
      .map((char) => {
        // Ignora caracteres que não são letras
        if (!/[A-Z]/.test(char)) return char;

        const idx = alphabet.indexOf(char);
        // Aplica o offset com módulo para "dar a volta" no alfabeto
        const newIdx = (idx + offset + alphabet.length) % alphabet.length;
        return alphabet[newIdx];
      })
      .join("");
  };

  // Calcula o texto criptografado toda vez que o 'text' ou 'shift' mudar
  const encrypted = encrypt(text, shift);

  // Funções para os botões
  const rotateClockwise = () => {
    setShift((currentShift) => currentShift + step);
  };

  const rotateCounterClockwise = () => {
    setShift((currentShift) => currentShift - step);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Cifra de César Interativa</h1>
        <p className="explanation-text">
          Uma ferramenta visual para entender a Cifra de César. Gire o disco
          externo para definir a chave de criptografia.
        </p>
      </header>

      {/* Container principal da Cifra */}
      <div className="cipher-wheel">
        {/* Círculo externo (giratório) */}
        <div
          className="outer-circle"
          style={{ transform: `translate(-50%, -50%) rotate(${shift}deg)` }}
        >
          {alphabet.map((letter, i) => (
            <span
              key={i}
              className="letter"
              style={{
                // ATUALIZADO: Usando variável CSS
                transform: `rotate(${
                  step * i
                }deg) translate(var(--outer-radius)) rotate(-${step * i}deg)`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Círculo interno (fixo) */}
        <div className="inner-circle">
          {/* Imagem de César */}
          <img
            src="/cesar.png"
            alt="Júlio César"
            className="caesar-image"
          />

          {alphabet.map((letter, i) => (
            <span
              key={i}
              className="letter inner"
              style={{
                // ATUALIZADO: Usando variável CSS
                transform: `rotate(${
                  step * i
                }deg) translate(var(--inner-radius)) rotate(-${step * i}deg)`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Container para todos os controles e saídas */}
      <div className="controls-container">
        {/* Input do Texto */}
        <div className="input-group">
          <label htmlFor="text-input">
            <MessageSquare size={20} />
            Texto Original
          </label>
          <input
            id="text-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-input"
            placeholder="Digite sua mensagem..."
          />
        </div>

        {/* Botões de Rotação */}
        <div className="controls">
          <button onClick={rotateCounterClockwise} title="Girar Anti-horário">
            <RotateCcw size={18} />
          </button>
          <div className="shift-display">
            <HelpCircle size={16} />
            <span>
              Chave Atual:{" "}
              <strong>
                {Math.round(shift / step) % alphabet.length}
              </strong>
            </span>
          </div>
          <button onClick={rotateClockwise} title="Girar Horário">
            <RotateCw size={18} />
          </button>
        </div>

        {/* Saída do Texto Criptografado */}
        <div className="output-group">
          <label>
            <KeyRound size={20} />
            Texto Cifrado
          </label>
          <p className="output-text">{encrypted || "..."}</p>
        </div>
      </div>
    </div>
  );
}