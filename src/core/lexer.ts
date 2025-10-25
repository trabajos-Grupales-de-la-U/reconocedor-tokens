// src/core/lexer.ts
import type { Token } from "./tokenTypes";
import { TokenType } from "./tokenTypes";
import { pythonLanguage } from "../config/languages/python";

/**
 * Analizador léxico:
 * - Lee carácter por carácter todo el texto fuente.
 * - Se detiene completamente al primer error.
 * - tokens[] contiene solo lo válido hasta el error.
 * - errorHeader y tailText se usan solo para pintar el resto en gris.
 */
export class Lexer {
  private source: string;
  private tokens: Token[] = [];
  private line = 1;
  private column = 1;

  public errorMessage: string | null = null;
  public errorHeader: string | null = null;
  public tailText: string | null = null;

  private hasError = false;

  constructor(source: string) {
    this.source = source;
  }

  public analyze(): Token[] {
    this.tokens = [];
    this.errorMessage = null;
    this.errorHeader = null;
    this.tailText = null;
    this.hasError = false;

    const lines = this.source.split(/\r?\n/);
    let absOffset = 0;

    for (let i = 0; i < lines.length; i++) {
      if (this.hasError) break;

      this.line = i + 1;
      this.column = 1;
      this.tokenizeLine(lines[i], absOffset);

      if (!this.hasError && i < lines.length - 1) {
        this.addToken(TokenType.Whitespace, "\n");
      }

      absOffset += lines[i].length + 1;
    }

    return this.tokens;
  }

  private tokenizeLine(line: string, baseOffset: number): void {
    let position = 0;

    // Caso especial: parece "def" pero está mal escrito (definr)
    const defLike = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s+[A-Za-z_][A-Za-z0-9_]*\s*\(.*\)\s*:\s*$/.exec(line);
    if (defLike && defLike[1] !== "def") {
      const wrong = defLike[1];
      this.addToken(TokenType.Error, wrong);
      const afterAbs = baseOffset + line.indexOf(wrong) + wrong.length;
      const friendly = "palabra no reconocida";
      const full = `Error léxico en línea ${this.line}, columna 1: se esperaba 'def' al inicio de una definición de función (encontrado '${wrong}').`;
      this.setFatal(afterAbs, friendly, full);
      return;
    }

    while (position < line.length && !this.hasError) {
      const rest = line.slice(position);

      // Espacios
      const sp = /^\s+/.exec(rest);
      if (sp) {
        this.addToken(TokenType.Whitespace, sp[0]);
        position += sp[0].length;
        this.column += sp[0].length;
        continue;
      }

      // Comentarios #
      const cm = /^#.*$/.exec(rest);
      if (cm) {
        this.addToken(TokenType.Comment, cm[0]);
        break;
      }

      // Cadenas válidas
      let matched = false;
      for (const p of pythonLanguage.string.patterns) {
        const re = new RegExp(`^${p}`);
        const m = re.exec(rest);
        if (m) {
          this.addToken(TokenType.String, m[0]);
          position += m[0].length;
          this.column += m[0].length;
          matched = true;
          break;
        }
      }
      if (matched) continue;

      // Comillas sin cerrar
      if (/^["']/.test(rest)) {
        this.addToken(TokenType.Error, rest[0]);
        const afterAbs = baseOffset + position + 1;
        const friendly = "comillas sin cerrar";
        const full = `Error léxico en línea ${this.line}, columna ${this.column}: comillas sin cerrar`;
        this.setFatal(afterAbs, friendly, full);
        return;
      }

      // Palabras reservadas
      const rv = new RegExp(`^\\b(${pythonLanguage.reservedWords.join("|")})\\b`).exec(rest);
      if (rv) {
        this.addToken(TokenType.Reserved, rv[0]);
        position += rv[0].length;
        this.column += rv[0].length;
        continue;
      }

      // Números
      const nm = new RegExp(`^${pythonLanguage.number.pattern}`).exec(rest);
      if (nm) {
        this.addToken(TokenType.Number, nm[0]);
        position += nm[0].length;
        this.column += nm[0].length;
        continue;
      }

      // Operadores
      const op = new RegExp(`^(${pythonLanguage.operators.join("|")})`).exec(rest);
      if (op) {
        this.addToken(TokenType.Operator, op[0]);
        position += op[0].length;
        this.column += op[0].length;
        continue;
      }

      // Agrupadores
      const gp = new RegExp(`^(${pythonLanguage.grouping.join("|")})`).exec(rest);
      if (gp) {
        this.addToken(TokenType.Grouping, gp[0]);
        position += gp[0].length;
        this.column += gp[0].length;
        continue;
      }

      // Identificadores
      const id = new RegExp(`^${pythonLanguage.identifier.pattern}`).exec(rest);
      if (id) {
        this.addToken(TokenType.Identifier, id[0]);
        position += id[0].length;
        this.column += id[0].length;
        continue;
      }

      // Si nada coincide → carácter inválido
      const bad = rest[0];
      this.addToken(TokenType.Error, bad);

      const afterAbs = baseOffset + position + 1;
      const friendly = "símbolo no válido";
      const full = `Error léxico en línea ${this.line}, columna ${this.column}: carácter no válido "${bad}"`;
      this.setFatal(afterAbs, friendly, full);
      return;
    }
  }

  /**
   * Registra el error y guarda los textos auxiliares
   * sin agregar tokens duplicados.
   */
private setFatal(afterAbs: number, friendly: string, fullMessage: string): void {
  this.hasError = true;

  // Guarda los textos para el renderizado
  this.errorMessage = fullMessage;
  this.errorHeader = `# Error: ${friendly}\n`;
  this.tailText = this.source.slice(afterAbs + 1) || null;


  // ⚠️ Elimina cualquier token tipo Comment duplicado del array
  this.tokens = this.tokens.filter(t => !t.value.startsWith("# Error:"));
}


  private addToken(type: TokenType, value: string): void {
    this.tokens.push({ type, value, line: this.line, column: this.column });
  }

  public getTokens(): Token[] {
    return this.tokens;
  }
}
