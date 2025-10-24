interface Token {
    type: String;
    value: String;
}

const regexTypoToken = [
    { type: 'PALABRA_RESERVADA', regex: /^(Algoritmo|FinAlgoritmo|Si|Entonces|FinSi|Mientras|Hacer|FinMientras)\b/i },
    { type: 'ASIGNACION', regex: /^<-/ },
    { type: 'FIN_INSTRUCCION', regex: /^;/ },
    { type: 'NUMERO', regex: /^\d+(\.\d+)?/ }, 
    { type: 'IDENTIFICADOR', regex: /^[a-zA-Z_][a-zA-Z0-9_]*/ }, // Variables
    { type: 'ESPACIO', regex: /^\s+/ },
    //{ type: 'OPERADORES', regex: /(<-|<=|>=|<>|==|\*|\/|\+|\-|=|!|&|\|)/ },
]

// aca vamos a tener la logica para reconocer los tokens
const Analizer = (texto: string) => {
    const tokens: Token[] = [];
    let position = 0;
    
    while(position < texto.length){
        let matched = false; 
        let substring = texto.substring(position);

        for (const patron of regexTypoToken) {
            const match = substring.match(patron.regex);

            if (match) {
                const value = match[0];
                
                // 2. Si el patrón es un espacio, solo avanza sin crear token
                if (patron.type !== 'ESPACIO') {
                    tokens.push({
                        type: patron.type,
                        value: value
                    });
                }
                
                // 3. Avanza el puntero
                position += value.length;
                matched = true;
                break; // Pasa a analizar el resto del texto
            }
        }

        if(!matched){
            throw new Error(`Error Léxico: Carácter no reconocido en la posición ${position}: ${texto[position]}`)
        }

    }
    return tokens;
}

export default Analizer