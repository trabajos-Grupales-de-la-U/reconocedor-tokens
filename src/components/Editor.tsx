// src/components/Editor.tsx
import React from "react";
import type { Token } from "../core/tokenTypes";
import { TokenType } from "../core/tokenTypes";
import "../styles/editor.css"; // importa los estilos del IDE

interface EditorProps {
  tokens: Token[];
}

/**
 * Mapea tipo de token -> clase CSS (definidas en editor.css)
 * Si prefieres seguir usando Tailwind en lugar de las clases de editor.css,
 * cambia los valores por clases Tailwind (p. ej. "text-green-400").
 */
const classByType: Record<TokenType, string> = {
  [TokenType.Reserved]: "keyword",
  [TokenType.Number]: "number",
  [TokenType.Grouping]: "operator",
  [TokenType.Operator]: "operator",
  [TokenType.String]: "string",
  [TokenType.Identifier]: "identifier",
  [TokenType.Comment]: "comment",
  [TokenType.Whitespace]: "", // el espacio/salto no necesita color
  [TokenType.Error]: "error-token",
};

const Editor: React.FC<EditorProps> = ({ tokens }) => {
  return (
    // <pre> preserva los \n tal cual; además aplicamos la clase de aspecto IDE
    <pre className="ide-code-block">
      {tokens.map((t, i) => {
        const cls = classByType[t.type] || "";

        // No hagas nada raro con los \n; <pre> los respeta y se verán las líneas
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
