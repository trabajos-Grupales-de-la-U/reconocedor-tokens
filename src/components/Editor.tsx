// src/components/Editor.tsx
import React from "react";
import type { Token } from "../core/tokenTypes";
import { TokenType } from "../core/tokenTypes";
import "../styles/editor.css";

interface EditorProps {
  tokens: Token[];
}

const classByType: Record<TokenType, string> = {
  [TokenType.Reserved]: "text-blue-400", // 🔵 Palabras reservadas
  [TokenType.Number]: "text-orange-400", // 🟠 Números y constantes
  [TokenType.Grouping]: "text-white", // ⚪ Agrupadores
  [TokenType.Operator]: "text-yellow-400", // 🟡 Operadores lógicos/comparación
  [TokenType.String]: "text-green-300", // 💚 Cadenas
  [TokenType.Identifier]: "text-pink-400", // 🌸 Variables / Identificadores
  [TokenType.Comment]: "text-gray-400 italic", // ⚫ Comentarios
  [TokenType.Whitespace]: "", // sin color
  [TokenType.Error]: "bg-red-600 text-white px-1 rounded", // 🔴 Errores
};

const Editor: React.FC<EditorProps> = ({ tokens }) => {
  return (
    <pre
      className="
        bg-[#1e1e1e] 
        text-white 
        font-mono 
        text-sm 
        p-4 
        rounded-lg 
        shadow-lg 
        w-full 
        max-w-3xl 
        text-left 
        overflow-x-auto 
        leading-6 
        border 
        border-gray-700 
        whitespace-pre-wrap 
        break-words
      "
    >
      {tokens.map((t, i) => {
        const cls = classByType[t.type] || "";
        return (
          <span key={i} className={cls}>
            {t.value}
          </span>
        );
      })}
    </pre>
  );
};

export default Editor;
