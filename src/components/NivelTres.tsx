import React, { useState, useMemo } from "react";
import {
  MessageSquare,
  KeyRound,
  Shuffle,
  Lock,
  Unlock,
  ChevronsDown,
  Copy,
  Check,
} from "lucide-react";
import "../App.css"; // Importa os estilos base (moeda, fundo)
import "./NivelTres.css"; // Importa os estilos específicos deste nível

// O alfabeto base, fixo (53 caracteres)
const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!*-/|+=@#$%()?.,<>".split("");

// Função para embaralhar um array (Fisher-Yates)
const getShuffledArray = (arr: string[]) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export default function NivelTres() {
  // --- Estados ---
  const [shuffledAlphabet, setShuffledAlphabet] = useState(() =>
    getShuffledArray(alphabet)
  );
  const [text, setText] = useState("");
  const [textToDecrypt, setTextToDecrypt] = useState("");
  const [decryptionKey, setDecryptionKey] = useState("");
  const [rotation, setRotation] = useState(0);

  // Estados de feedback de cópia
  const [isKeyCopied, setIsKeyCopied] = useState(false);
  const [isEncryptedCopied, setIsEncryptedCopied] = useState(false);

  // --- Constantes Derivadas ---
  const step = 360 / alphabet.length;
  const keyString = shuffledAlphabet.join("");

  // --- Handlers ---
  const handleShuffle = () => {
    setShuffledAlphabet(getShuffledArray(alphabet));
    setRotation((r) => r + 1080);
  };

  // --- Lógica de Cópia (Reutilizável) ---
  const fallbackCopy = (
    text: string,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {
      console.error("Fallback copy failed", err);
    }
    document.body.removeChild(textArea);
  };

  const copyToClipboard = (
    text: string,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setter(true);
          setTimeout(() => setter(false), 2000); // Feedback por 2s
        })
        .catch(() => {
          fallbackCopy(text, setter); // Tenta o fallback
        });
    } else {
      fallbackCopy(text, setter); // Usa o fallback
    }
  };

  // Handlers específicos para cada botão de cópia
  const handleCopyKey = () => {
    copyToClipboard(keyString, setIsKeyCopied);
  };

  const handleCopyEncrypted = () => {
    copyToClipboard(encrypted, setIsEncryptedCopied);
  };

  // --- Lógica Cripto (Memoizada) ---
  const encrypted = useMemo(() => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => {
        const idx = alphabet.indexOf(char);
        return idx !== -1 ? shuffledAlphabet[idx] : char;
      })
      .join("");
  }, [text, shuffledAlphabet]);

  const decrypted = useMemo(() => {
    // SÓ descriptografa se a chave for válida
    if (decryptionKey.length !== alphabet.length) {
      return textToDecrypt ? "..." : ""; // Chave inválida ou vazia
    }
    const keyToUse = decryptionKey.split("");
    return textToDecrypt
      .toUpperCase()
      .split("")
      .map((char) => {
        const idx = keyToUse.indexOf(char); // Procura na chave
        return idx !== -1 ? alphabet[idx] : char; // Retorna do original
      })
      .join("");
  }, [textToDecrypt, decryptionKey]);

  // --- Renderização ---
  return (
    <div className="app">
      <header className="app-header">
        <h1>Nível 3: Cifra de Substituição</h1>
        <p className="explanation-text">
          Em vez de apenas "girar", uma cifra de substituição mapeia cada
          caractere para outro, aleatoriamente.
        </p>
      </header>

      {/* Cifra Visual */}
      <div className="cipher-wheel nivel-tres">
        <div
          className="outer-circle"
          style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
        >
          {shuffledAlphabet.map((letter, i) => (
            <span
              key={i}
              className="letter"
              style={{
                transform: `rotate(${
                  step * i
                }deg) translate(var(--outer-radius)) rotate(-${step * i}deg)`,
                fontSize: alphabet.length > 40 ? "11px" : "16px",
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
                transform: `rotate(${
                  step * i
                }deg) translate(var(--inner-radius)) rotate(-${step * i}deg)`,
                fontSize: alphabet.length > 40 ? "11px" : "16px",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Container de Controles */}
      <div className="controls-container nivel-tres">
        {/* Controles Globais da Chave */}
          <button className="shuffle-button" onClick={handleShuffle}>
            <Shuffle size={18} />
            Embaralhar Chave 
          </button>
        <div className="key-display-container">
          <label>
            <KeyRound size={20} />
            Mapeamento da Chave Atual (N=53)
          </label>
          <div className="key-display-box">
            {alphabet.map((originalChar, index) => (
              <div key={index} className="key-map-item">
                <span>{originalChar}</span>
                <ChevronsDown size={14} />
                <span>{shuffledAlphabet[index]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- BOX 1: CRIPTOGRAFAR --- */}
        <div className="crypto-box">
          <h3>
            <Lock size={20} /> Criptografar
          </h3>
          <div className="output-group">
            <label>Chave Atual (String)</label>
            <div className="key-string-wrapper">
              <p className="output-text key-string">{keyString}</p>
              <button
                onClick={handleCopyKey}
                className="copy-button"
                title="Copiar Chave"
              >
                {isKeyCopied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
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
              placeholder="Digite para criptografar..."
            />
          </div>
          <div className="output-group">
            <label>Texto Cifrado</label>
            <div className="key-string-wrapper">
              <p className="output-text">{encrypted || "..."}</p>
              <button
                onClick={handleCopyEncrypted}
                className="copy-button"
                title="Copiar Texto Cifrado"
              >
                {isEncryptedCopied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- BOX 2: DESCRIPTOGRAFAR --- */}
        <div className="crypto-box">
          <h3>
            <Unlock size={20} /> Descriptografar
          </h3>
          <div className="input-group">
            <label htmlFor="decrypt-input">
              Texto para Descriptografar
            </label>
            <input
              id="decrypt-input"
              type="text"
              value={textToDecrypt}
              onChange={(e) => setTextToDecrypt(e.target.value)}
              className="text-input"
              placeholder="Cole o texto cifrado..."
            />
          </div>
          <div className="input-group">
            <label htmlFor="key-input">
              <KeyRound size={20} />
              Inserir Chave
            </label>
            <input
              id="key-input"
              type="text"
              value={decryptionKey}
              onChange={(e) => setDecryptionKey(e.target.value)}
              className="text-input"
              placeholder={`Cole a chave de ${alphabet.length} caracteres...`}
            />
          </div>
          <div className="output-group">
            <label>
              <MessageSquare size={20} />
              Texto Decifrado
            </label>
            <p className="output-text">{decrypted || "..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
