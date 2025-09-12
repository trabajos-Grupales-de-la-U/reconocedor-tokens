// aca vamos a tener la logica del conteo
const Analizer = (texto: string, tokens: string[]) => {
    const conteo: Record<string, number> = {}

    for ( const token of tokens ) {
        if(/^[a-zA-Z]+$/.test(token)){ // extraemos solo las palabras
            const regex = new RegExp(`\\b${token}\\b`, "gi"); // realizamos el regex de la palabra clave
            conteo[token] = (texto.match(regex) || []).length; // realizamos el conteo
        } else {
            const regex = RegExp(`\\${token}`, "g");
            conteo[token] = (texto.match(regex) || []).length
        }
    }

    return conteo

}

export default Analizer
