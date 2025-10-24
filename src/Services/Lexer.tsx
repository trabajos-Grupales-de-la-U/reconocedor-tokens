interface Token {
    type: String; 
    value: String;
}

// Nodos para construir el Árbol de Sintaxis Abstracta (AST)
interface Node {
    type: string;
    children?: Node[];
}

interface ProgramNode extends Node {
    type: 'PROGRAMA';
    name: string;
}

interface AsignacionNode extends Node {
    type: 'ASIGNACION';
    variable: Token; // El token identificador
    expresion: Node; // La expresión a asignar (ej. un número o una suma)
}

interface ExpresionNode extends Node {
    type: 'LITERAL' | 'BINARIA' | 'VARIABLE';
    value: Token | Node;
    // ... más campos según el tipo de expresión
}
interface CondicionalesExpression extends Node {
    type: 'SI_ENTONCES_SINO';
    condicion: Node;
    thenBody: Node[]; // Bloque de código si es verdadero
    elseBody?: Node[]; // Bloque de código si es falso (opcional)
}

class Parser {
    private tokens: Token[];
    private current = 0; // Puntero al token actual

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    // --- MÉTODOS DE UTILIDAD ---

    // 1. Devuelve el token actual sin avanzar el puntero
    private peek() {
        return this.tokens[this.current];
    }

    // 2. Consume el token actual y avanza el puntero
    private advance() {
        const token = this.peek();
        this.current++;
        return token;
    }

    // 3. Verifica si el token actual coincide con un tipo esperado y lo consume
    private consume(expectedType: string, errorMessage: string) {
        const token = this.peek();
        if (token && token.type === expectedType) {
            return this.advance();
        }
        // Si no coincide, ¡es un error de sintaxis!
        throw new Error(`Error de Sintaxis: ${errorMessage}. Encontrado: ${token ? token.value : 'EOF'}`);
    }

    // --- REGLAS GRAMATICALES (Funciones de Análisis) ---

    // Regla 1: Inicia el análisis de todo el programa
    public parse(): ProgramNode {
        this.consume('PALABRA_RESERVADA', 'Se esperaba "Algoritmo" o "Proceso" al inicio.');
        const nameToken = this.consume('IDENTIFICADOR', 'Se esperaba el nombre del algoritmo.');
        
        // El cuerpo del programa es una secuencia de instrucciones
        const instructions = this.parseInstructionList();
        
        this.consume('FIN_ALGORITMO', 'Se esperaba "FinAlgoritmo" o "FinProceso" al final.');
        
        return {
            type: 'PROGRAMA',
            name: nameToken.value,
            children: instructions
        } as ProgramNode;
    }

    // Regla 2: Analiza una lista de instrucciones (un bucle principal)
    private parseInstructionList(): Node[] {
        const instructions: Node[] = [];
        // Itera hasta que encuentre una palabra de cierre (FinSi, FinMientras, FinAlgoritmo)
        while (this.peek().type !== 'FIN_ALGORITMO' && this.peek().type !== 'FIN_SI') { 
            instructions.push(this.parseInstruction());
            // Nota: Aquí el punto y coma se consume dentro de parseAsignacion, etc.
        }
        return instructions;
    }
    
    // Regla 3: Decide qué tipo de instrucción es la actual (por el primer token)
    private parseInstruction(): Node {
        const currentToken = this.peek();
        
        switch (currentToken.type) {
            case 'IDENTIFICADOR':
                // Si el token es un ID y el siguiente es '<-', debe ser una ASIGNACIÓN
                if (this.tokens[this.current + 1].type === 'ASIGNACION') {
                    return this.parseAsignacion();
                }
                // ...otros casos para llamadas a funciones...
                break;
            case 'PALABRA_RESERVADA_SI':
                return this.parseSiEntoncesSino(); // Regla para Si-Entonces
            // ...otros casos para Escribir, Leer, Mientras, etc.
        }
        throw new Error(`Error de Sintaxis: Instrucción no reconocida: ${currentToken.value}`);
    }

    // Regla 4: Analiza la Asignación (Tu ejemplo: IDENTIFICADOR <- EXPRESION ;)
    private parseAsignacion(): AsignacionNode {
        const variableToken = this.consume('IDENTIFICADOR', 'Se esperaba una variable para la asignación.');
        this.consume('ASIGNACION', 'Se esperaba el operador de asignación (<-).');
        
        // La parte derecha de la asignación es una expresión (la más compleja de analizar)
        const expressionNode = this.parseExpression(); 
        
        this.consume('FIN_INSTRUCCION', 'Se esperaba punto y coma (;) al final de la instrucción.');

        return {
            type: 'ASIGNACION',
            variable: variableToken,
            expresion: expressionNode
        } as AsignacionNode;
    }
    
    // Regla 5: Analiza una expresión (aquí iría la lógica de operadores matemáticos)
    private parseExpression(): ExpresionNode {
        // En un parser simple, solo verifica si es un número (LITERAL) o una variable (IDENTIFICADOR)
        const token = this.peek();
        
        if (token.type === 'NUMERO' || token.type === 'CARACTER') {
            return { type: 'LITERAL', value: this.advance() } as ExpresionNode;
        } else if (token.type === 'IDENTIFICADOR') {
            return { type: 'VARIABLE', value: this.advance() } as ExpresionNode;
        }
        
        throw new Error(`Error de Sintaxis: Se esperaba una expresión válida. Encontrado: ${token.value}`);
    }
    
private parseSiEntoncesSino(): CondicionalesExpression {
    // 1. Consumir 'Si'
    const siToken = this.consume('PALABRA_RESERVADA_SI', 'Se esperaba el comienzo de una condición "Si".');

    // 2. Analizar la Condición (ej: x > 5)
    const conditionNode = this.parseExpression();

    // 3. Consumir 'Entonces'
    this.consume('PALABRA_RESERVADA_ENTONCES', 'Se esperaba la palabra "Entonces".');

    // 4. Analizar el Cuerpo (acciones) si la condición es verdadera (Then Body)
    const thenBody = this.parseInstructionList();
    
    // Inicializar el cuerpo 'Sino' como vacío
    let elseBody: Node[] | undefined = undefined;

    // 5. Verificar si existe la rama 'Sino' (Es opcional)
    if (this.peek().type === 'PALABRA_RESERVADA_SINO') {
        this.advance(); // Consumir 'Sino'
        
        // Analizar el Cuerpo (acciones) si la condición es falsa (Else Body)
        elseBody = this.parseInstructionList();
    }

    // 6. Consumir el cierre 'FinSi'
    this.consume('PALABRA_RESERVADA_FINSI', 'Se esperaba "FinSi" para cerrar la estructura condicional.');

    // 7. Retornar el nodo AST completo
    return {
        type: 'SI_ENTONCES_SINO',
        condicion: conditionNode,
        thenBody: thenBody,
        elseBody: elseBody
    } as CondicionalesExpression;
}
    // ... Necesitarías más funciones para parseSiEntoncesSino(), parseMientras(), etc.
}