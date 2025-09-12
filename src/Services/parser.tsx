import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
    ).toString();

const parseFile = async (file: File): Promise<string> => {


    if (file.type === "application/pdf") {
        // aca colocamos la logica para extraer el texto del pdf
            // extraer texto del pdf
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer}).promise

            let textContent = "";

            for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();

            const strings = content.items.map((item: any) => item.str);
            textContent += strings.join(" ") + "\n";
        }

        return textContent;

        

    } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        // Extraer texto de DOCX 
        const arrayBuffer = await file.arrayBuffer();
        const { value } = await mammoth.extractRawText({ arrayBuffer });
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
