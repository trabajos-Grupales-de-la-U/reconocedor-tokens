// src/components/Editor.tsx
import React from "react";
import type { Token } from "../core/tokenTypes";
import { TokenType } from "../core/tokenTypes";
import "../styles/editor.css";

interface EditorProps {
  tokens: Token[];
  errorHeader?: string | null;
  tailText?: string | null;
}

/** Mapa tipo -> clase CSS */
const cls: Record<TokenType, string> = {
  [TokenType.Reserved]: "keyword",      // azul
  [TokenType.Number]: "number",         // anaranjado
  [TokenType.Grouping]: "grouping",     // BLANCO  ← aquí el cambio
  [TokenType.Operator]: "operator",     // amarillo
  [TokenType.String]: "string",         // verde claro
  [TokenType.Identifier]: "identifier", // rosado
  [TokenType.Comment]: "comment",       // gris
  [TokenType.Whitespace]: "",
  [TokenType.Error]: "error-token",     // fondo rojo, texto blanco
};

const Editor: React.FC<EditorProps> = ({ tokens, errorHeader, tailText }) => {
  return (
    <pre className="ide-code-block">
      {errorHeader ? <span className="comment">{errorHeader}</span> : null}
      {tokens.map((t, i) => (
        <span key={i} className={cls[t.type] || ""}>
          {t.value}
        </span>
      ))}
      {tailText ? <span className="comment">{tailText}</span> : null}
    </pre>
  );
};

export default Editor;
