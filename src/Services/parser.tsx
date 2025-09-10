import mammoth from "mammoth";

const parseFile = async (file: File): Promise<string> => {


    if (file.type === "application/pdf") {
        // aca colocamos la logica para extraer el texto del pdf 
        throw new Error("Lectura de PDF aún no implementada");

    } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        // Extraer texto de DOCX 
        const arrayBuffer = await file.arrayBuffer();
        const { value } = await mammoth.extractRawText({ buffer: arrayBuffer });
        return value;

    } else if (file.type === "text/plain") {
        // Extraer texto de TXT
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error("Error al leer el archivo"));
            reader.readAsText(file);
        });

    } else {
        throw new Error("Tipo de archivo no soportado");
    }
};

export default parseFile;
