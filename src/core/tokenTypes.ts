// src/core/tokenTypes.ts
export const TokenType = {
  Reserved: "Reserved",
  Number: "Number",
  Grouping: "Grouping",
  Operator: "Operator",
  String: "String",
  Identifier: "Identifier",
  Comment: "Comment",
  Whitespace: "Whitespace",   // ← NUEVO
  Error: "Error",
} as const;

export type TokenType = (typeof TokenType)[keyof typeof TokenType];

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}
