import React from "react";
import type { Token } from "../core/tokenTypes";
import { TokenType } from "../core/tokenTypes";
import "../styles/editor.css";

interface EditorProps {
  tokens: Token[];
  errorHeader?: string | null; // "# Error: …\n"
  tailText?: string | null;    // resto del archivo (gris)
}

/** Mapa tipo -> clase CSS (editor.css) */
const cls: Record<TokenType, string> = {
  [TokenType.Reserved]: "keyword",
  [TokenType.Number]: "number",
  [TokenType.Grouping]: "operator",
  [TokenType.Operator]: "operator",
  [TokenType.String]: "string",
  [TokenType.Identifier]: "identifier",
  [TokenType.Comment]: "comment",
  [TokenType.Whitespace]: "",
  [TokenType.Error]: "error-token",
};

const Editor: React.FC<EditorProps> = ({ tokens, errorHeader, tailText }) => {
  return (
    <pre className="ide-code-block">
      {/* Encabezado gris si hay error */}
      {errorHeader ? <span className="comment">{errorHeader}</span> : null}

      {/* Tokens reales (hasta el primer Error) */}
      {tokens.map((t, i) => (
        <span key={i} className={cls[t.type] || ""}>
          {t.value}
        </span>
      ))}

      {/* Cola en gris después del error */}
      {tailText ? <span className="comment">{tailText}</span> : null}
    </pre>
  );
};

export default Editor;
