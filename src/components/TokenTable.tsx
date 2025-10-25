// src/components/TokenTable.tsx
import React from "react";
import type { Token } from "../core/tokenTypes";
import { TokenType } from "../core/tokenTypes";

interface TokenTableProps {
  tokens: Token[];
}

// Diccionario de traducción de tipos de token al español
const traduccion: Record<TokenType, string> = {
  [TokenType.Reserved]: "Palabra reservada",
  [TokenType.Number]: "Número / Constante",
  [TokenType.Grouping]: "Signo de agrupación",
  [TokenType.Operator]: "Operador / Comparador",
  [TokenType.String]: "Cadena de texto",
  [TokenType.Identifier]: "Identificador",
  [TokenType.Comment]: "Comentario",
  [TokenType.Whitespace]: "Espacio en blanco",
  [TokenType.Error]: "Error léxico",
};

const TokenTable: React.FC<TokenTableProps> = ({ tokens }) => {
  if (!tokens.length) return null;

  return (
    <div className="mt-8 w-full">
      <h2 className="text-lg font-semibold mb-2 text-center text-gray-100">
        Lista de tokens
      </h2>

      <table className="w-full text-sm text-left border border-gray-700">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-2 border border-gray-700 text-center">Línea</th>
            <th className="p-2 border border-gray-700 text-center">Columna</th>
            <th className="p-2 border border-gray-700 text-center">Tipo de token</th>
            <th className="p-2 border border-gray-700 text-center">Valor</th>
          </tr>
        </thead>

        <tbody>
          {tokens.map((t, index) => (
            <tr
              key={index}
              className="odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700"
            >
              <td className="p-2 border border-gray-700 text-center">{t.line}</td>
              <td className="p-2 border border-gray-700 text-center">{t.column}</td>

              {/* Traduce el tipo */}
              <td className="p-2 border border-gray-700 text-center">
                {traduccion[t.type] || t.type}
              </td>

              {/* Muestra el valor en monoespaciado */}
              <td className="p-2 border border-gray-700 font-mono text-left">
                {t.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenTable;
