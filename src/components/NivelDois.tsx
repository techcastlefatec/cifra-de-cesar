import { useState } from "react";
import {
  MessageSquare,
  KeyRound,
  Lock,
  RotateCcw,
  RotateCw,
  HelpCircle,
  Copy, // 1. Importado
  Check, // 2. Importado (para feedback)
  LockOpen, // 3. Importado (para descriptografar)
} from "lucide-react";
import "../App.css";

// Alfabeto base para a cifra (N=53)
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!*-/|+=@#$%()?.,<>".split("");
const ALPHABET_LENGTH = alphabet.length; // 53

export default function NivelDois() {
  // --- ESTADOS DE CRIPTOGRAFIA ---
  const [shift, setShift] = useState(0);
  const [text, setText] = useState("");

  // --- ESTADOS DE DESCRIPTOGRAFIA (NOVOS) ---
  const [decryptText, setDecryptText] = useState("");
  const [decryptKey, setDecryptKey] = useState("1"); // Chave de 1 a 52

  // --- ESTADO DE UI (NOVO) ---
  const [copySuccess, setCopySuccess] = useState(false);

  // Calcula o "passo" de cada letra em graus
  const step = 360 / ALPHABET_LENGTH;

  // --- LÓGICA DE CRIPTOGRAFIA (CORRIGIDA) ---
  const encrypt = (input: string, shiftInDegrees: number) => {
    const offset = Math.round(shiftInDegrees / step);

    return input
      // .toUpperCase() // REMOVIDO: O alfabeto agora inclui símbolos
      .split("")
      .map((char) => {
        const idx = alphabet.indexOf(char);
        if (idx === -1) return char; // Mantém caracteres não mapeados (ex: espaço)
        const newIdx = (idx + offset + ALPHABET_LENGTH) % ALPHABET_LENGTH;
        return alphabet[newIdx];
      })
      .join("");
  };

  // --- LÓGICA DE DESCRIPTOGRAFIA (NOVA) ---
  const decrypt = (input: string, key: number) => {
    const offset = key;
    return input
      // .toUpperCase() // REMOVIDO
      .split("")
      .map((char) => {
        const idx = alphabet.indexOf(char);
        if (idx === -1) return char;
        const newIdx = (idx - offset + ALPHABET_LENGTH) % ALPHABET_LENGTH;
        return alphabet[newIdx];
      })
      .join("");
  };

  // Calcula o texto criptografado (derivado)
  const encrypted = encrypt(text, shift);

  // Calcula o texto descriptografado (derivado)
  const decrypted = decrypt(decryptText, parseInt(decryptKey, 10));

  // --- FUNÇÕES DE CONTROLE ---
  const rotateClockwise = () => {
    setShift((currentShift) => currentShift + step);
  };

  const rotateCounterClockwise = () => {
    setShift((currentShift) => currentShift - step);
  };

  // Função para o botão de copiar (NOVA)
  const handleCopy = () => {
    if (encrypted && encrypted !== "...") {
      navigator.clipboard
        .writeText(encrypted)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000); // Reset após 2s
        })
        .catch((err) => console.error("Falha ao copiar: ", err));
    }
  };

  // Gera as 52 opções de chave (1 a 52)
  const keyOptions = Array.from({ length: ALPHABET_LENGTH - 1 }, (_, i) => {
    const key = i + 1;
    return (
      <option key={key} value={key}>
        P - {key}
      </option>
    );
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Nível 2: Cifra de César Estendida</h1>
        <p className="explanation-text">
          O método é o mesmo, mas o desafio é maior. Agora, o alfabeto inclui
          números e símbolos (N=53). A fórmula da{" "}
          <strong>transposição</strong> ainda se aplica, mas o módulo mudou:{" "}
          <code>C = (P + k) mod 53</code>.
        </p>
      </header>

      {/* Container principal da Cifra (Sem alterações) */}
      <div className="cipher-wheel">
        <div
          className="outer-circle"
          style={{ transform: `translate(-50%, -50%) rotate(${shift}deg)` }}
        >
          {alphabet.map((letter, i) => (
            <span
              key={i}
              className="letter"
              style={{
                transform: `rotate(${step * i}deg) translate(var(--outer-radius)) rotate(-${
                  step * i
                }deg)`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="inner-circle">
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
                transform: `rotate(${step * i}deg) translate(var(--inner-radius)) rotate(-${
                  step * i
                }deg)`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Container de Criptografia */}
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
            placeholder="Digite sua mensagem (símbolos são permitidos)..."
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
                {Math.round(shift / step) % ALPHABET_LENGTH}
              </strong>
            </span>
          </div>
          <button onClick={rotateClockwise} title="Girar Horário">
            <RotateCw size={18} />
          </button>
        </div>

        {/* Saída do Texto Criptografado (MODIFICADO) */}
        <div className="output-group">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <label>
              <Lock size={20} />
              Texto Cifrado
            </label>
            <button
              onClick={handleCopy}
              title="Copiar texto cifrado"
              style={{
                background: "transparent",
                border: "none",
                color: copySuccess ? "#4CAF50" : "#d9ae7b",
                cursor: "pointer",
                padding: "0 5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {copySuccess ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <p className="output-text">{encrypted || "..."}</p>
        </div>
      </div>

      {/* --- NOVO CONTAINER DE DESCRIPTOGRAFIA --- */}
      <div className="controls-container">
        {/* 1. Texto para Descriptografar */}
        <div className="input-group">
          <label htmlFor="decrypt-input">
            <MessageSquare size={20} />
            Texto para Descriptografar
          </label>
          <input
            id="decrypt-input"
            type="text"
            value={decryptText}
            onChange={(e) => setDecryptText(e.target.value)}
            className="text-input"
            placeholder="Digite o texto cifrado..."
          />
        </div>

        {/* 2. Selecionar a Chave */}
        <div className="input-group">
          <label htmlFor="key-select">
            <KeyRound size={20} />
            Selecionar a Chave
          </label>
          <select
            id="key-select"
            value={decryptKey}
            onChange={(e) => setDecryptKey(e.target.value)}
            className="text-input" // Reutiliza a classe do input!
          >
            {keyOptions}
          </select>
        </div>

        {/* 3. Texto Descriptografado */}
        <div className="output-group">
          <label>
            <LockOpen size={20} />
            Texto Descriptografado
          </label>
          <p className="output-text">{decrypted || "..."}</p>
        </div>
      </div>
    </div>
  );
}