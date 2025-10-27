import React, { useState, useRef } from "react";
import "../App.css";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function NivelUm() {
  const [shift, setShift] = useState(0); // em graus acumulados
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const lastAngle = useRef(0);
  const accumulatedShift = useRef(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const step = 360 / alphabet.length;

  // Função para aplicar cifra de césar
  const encrypt = (input: string, shift: number) => {
    const offset = Math.round(shift / step);
    return input
      .toUpperCase()
      .split("")
      .map((char) => {
        if (!/[A-Z]/.test(char)) return char;
        const idx = alphabet.indexOf(char);
        return alphabet[(idx + offset + alphabet.length) % alphabet.length];
      })
      .join("");
  };

  const encrypted = encrypt(text, shift);

  // Calcula ângulo do mouse em relação ao centro
  const getAngle = (e: MouseEvent | TouchEvent) => {
    if (!wheelRef.current) return 0;
    const rect = wheelRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const dx = clientX - cx;
    const dy = clientY - cy;

    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    lastAngle.current = getAngle(e.nativeEvent);
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const currentAngle = getAngle(e);
    const delta = currentAngle - lastAngle.current;
    lastAngle.current = currentAngle;
    setShift(accumulatedShift.current + delta);
  };

  const handleEnd = () => {
    setIsDragging(false);
    accumulatedShift.current = shift;
  };

  // Eventos globais quando arrastando
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchend", handleEnd);
    } else {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  return (
    <div className="app">
      <div className="cipher-wheel">
        {/* Círculo externo arrastável */}
        <div
          ref={wheelRef}
          className={`outer-circle ${isDragging ? "dragging" : ""}`}
          style={{ transform: `translate(-50%, -50%) rotate(${shift}deg)` }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          {alphabet.map((letter, i) => (
            <span
              key={i}
              className="letter"
              style={{
                transform: `rotate(${step * i}deg) translate(150px) rotate(-${
                  step * i
                }deg)`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Círculo interno fixo */}
        <div className="inner-circle">
          {alphabet.map((letter, i) => (
            <span
              key={i}
              className="letter inner"
              style={{
                transform: `rotate(${step * i}deg) translate(90px) rotate(-${
                  step * i
                }deg)`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input-text"
          placeholder="Digite seu texto..."
        />

        {/* Botões de fallback */}
        <div className="controls">
          <button onClick={() => setShift((s) => s + step)}>↻ Girar Horário</button>
          <button onClick={() => setShift((s) => s - step)}>↺ Girar Anti-horário</button>
        </div>
      </div>

      {/* Saída */}
      <div className="output">
        <h3>Texto Criptografado:</h3>
        <p>{encrypted}</p>
      </div>
    </div>
  );
}