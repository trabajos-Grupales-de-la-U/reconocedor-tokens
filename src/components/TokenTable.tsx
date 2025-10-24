// src/components/TokenTable.tsx
import React from "react";
import type { Token } from "../core/tokenTypes";

interface TokenTableProps {
  tokens: Token[];
}

const TokenTable: React.FC<TokenTableProps> = ({ tokens }) => {
  if (!tokens.length) return null;

  return (
    <div className="mt-8 w-full">
      <h2 className="text-lg font-semibold mb-2 text-center">Lista de tokens</h2>
      <table className="w-full text-sm text-left border border-gray-700">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-2 border border-gray-700">Línea</th>
            <th className="p-2 border border-gray-700">Columna</th>
            <th className="p-2 border border-gray-700">Tipo</th>
            <th className="p-2 border border-gray-700">Valor</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((t, index) => (
            <tr
              key={index}
              className="odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700"
            >
              <td className="p-2 border border-gray-700">{t.line}</td>
              <td className="p-2 border border-gray-700">{t.column}</td>
              <td className="p-2 border border-gray-700">{t.type}</td>
              <td className="p-2 border border-gray-700 font-mono">{t.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenTable;
