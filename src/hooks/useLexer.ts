// src/hooks/useLexer.ts
import { useState } from "react";
import { Lexer } from "../core/lexer";
import type { Token } from "../core/tokenTypes";

export function useLexer() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const analyzeSource = (source: string) => {
    const lexer = new Lexer(source);
    lexer.analyze();
    setTokens(lexer.getTokens());
    if (lexer.errorMessage) {
      setError(lexer.errorMessage);
      setIsValid(false);
    } else {
      setError(null);
      setIsValid(true);
    }
  };

  const reset = () => {
    setTokens([]);
    setError(null);
    setIsValid(null);
  };

  return { tokens, error, isValid, analyzeSource, reset };
}
