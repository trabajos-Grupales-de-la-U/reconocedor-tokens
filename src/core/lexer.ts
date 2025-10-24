// src/core/lexer.ts
import type { Token } from "./tokenTypes";
import { TokenType } from "./tokenTypes";
import { pythonLanguage } from "../config/languages/python";

/*
  Analizador léxico:
  - Recorre el texto línea por línea y carácter por carácter.
  - Emite tokens en el orden en que aparecen, incluyendo espacios y saltos de línea.
  - Se detiene en el primer error: agrega un token Error y guarda el mensaje.
*/

export class Lexer {
  private source: string;
  private tokens: Token[] = [];
  private line = 1;
  private column = 1;
  public errorMessage: string | null = null;

  constructor(source: string) {
    this.source = source;
  }

  // Ejecuta el análisis y devuelve los tokens generados
  public analyze(): Token[] {
    const lines = this.source.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      this.line = i + 1;
      const lineText = lines[i];
      const ok = this.tokenizeLine(lineText);
      if (!ok) break;
      if (i < lines.length - 1) {
        this.addToken(TokenType.Whitespace, "\n");
        this.column = 1;
      }
    }

    return this.tokens;
  }

  // Devuelve true si terminó sin error en esta línea, false si hubo error
  private tokenizeLine(line: string): boolean {
    let position = 0;

        // --- Regla adicional (conveniencia): línea parece definición de función pero no empieza con 'def' ---
    {
      // Coincide líneas del estilo: <algo> nombre( ... ):
      // Si ese <algo> NO es 'def', entonces consideramos error léxico (en este proyecto).
      const defLike = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s+[A-Za-z_][A-Za-z0-9_]*\s*\(.*\)\s*:\s*$/.exec(line);
      if (defLike && defLike[1] !== "def") {
        const wrong = defLike[1];
        this.addToken(TokenType.Error, wrong);
        this.errorMessage = `Error léxico en línea ${this.line}, columna ${this.column}: se esperaba 'def' al inicio de una definición de función (encontrado '${wrong}').`;
        return false;
      }
    }


    while (position < line.length) {
      const substring = line.slice(position);

      // Espacios y tabs
      const spaceMatch = /^\s+/.exec(substring);
      if (spaceMatch) {
        const text = spaceMatch[0];
        this.addToken(TokenType.Whitespace, text);
        position += text.length;
        this.column += text.length;
        continue;
      }

      // Comentario de una línea (# ...)
      const commentPattern = new RegExp(`^${pythonLanguage.comment.single}`);
      const commentMatch = commentPattern.exec(substring);
      if (commentMatch) {
        this.addToken(TokenType.Comment, commentMatch[0]);
        return true; // el resto de la línea es comentario
      }

      // Cadenas simples "..." y '...'
      {
        let matched = false;
        for (const pattern of pythonLanguage.string.patterns) {
          const re = new RegExp(`^${pattern}`);
          const m = re.exec(substring);
          if (m) {
            this.addToken(TokenType.String, m[0]);
            position += m[0].length;
            this.column += m[0].length;
            matched = true;
            break;
          }
        }
        if (matched) continue;
      }

      // Palabras reservadas
      {
        const re = new RegExp(`^\\b(${pythonLanguage.reservedWords.join("|")})\\b`);
        const m = re.exec(substring);
        if (m) {
          this.addToken(TokenType.Reserved, m[0]);
          position += m[0].length;
          this.column += m[0].length;
          continue;
        }
      }

      // Números
      {
        const re = new RegExp(`^${pythonLanguage.number.pattern}`);
        const m = re.exec(substring);
        if (m) {
          this.addToken(TokenType.Number, m[0]);
          position += m[0].length;
          this.column += m[0].length;
          continue;
        }
      }

      // Operadores
      {
        const re = new RegExp(`^(${pythonLanguage.operators.join("|")})`);
        const m = re.exec(substring);
        if (m) {
          this.addToken(TokenType.Operator, m[0]);
          position += m[0].length;
          this.column += m[0].length;
          continue;
        }
      }

      // Agrupadores
      {
        const re = new RegExp(`^(${pythonLanguage.grouping.join("|")})`);
        const m = re.exec(substring);
        if (m) {
          this.addToken(TokenType.Grouping, m[0]);
          position += m[0].length;
          this.column += m[0].length;
          continue;
        }
      }

      // Identificadores
      {
        const re = new RegExp(`^${pythonLanguage.identifier.pattern}`);
        const m = re.exec(substring);
        if (m) {
          this.addToken(TokenType.Identifier, m[0]);
          position += m[0].length;
          this.column += m[0].length;
          continue;
        }
      }

      // Nada coincidió: error
      const invalidChar = substring[0];
      this.addToken(TokenType.Error, invalidChar);
      this.errorMessage = `Error léxico en línea ${this.line}, columna ${this.column}: carácter no válido "${invalidChar}"`;
      return false;
    }

    return true;
  }

  private addToken(type: TokenType, value: string): void {
    this.tokens.push({
      type,
      value,
      line: this.line,
      column: this.column,
    });
  }

  // ✅ Nuevo método público: permite acceder a los tokens desde afuera
  public getTokens(): Token[] {
    return this.tokens;
  }
}
