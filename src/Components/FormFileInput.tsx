//aca va a ir el formulario para pedir el archivo a analizar
import React, { useState } from "react";

interface Props {
    onFileLoad: (fileContent: string) => void;
}

const FormFileInput: React.FC<Props> = ({ onFileLoad }: Props) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [fileName, setFileName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [fileContent, setFileContent] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        processFile(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        processFile(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const processFile = (file: File | undefined) => {
        if (!file) return;
        if (!(file.name.endsWith('.txt') || file.name.endsWith('.alg'))) return;
        setIsLoading(true);
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            setFileContent(text);
            setIsLoading(false);
        };
        reader.onerror = () => {
            setIsLoading(false);
            setFileName("");
            setFileContent("");
        };
    
        reader.readAsText(file);
    };

        return (
            <div className="relative min-h-screen w-full flex items-center justify-center bg-[url('/src/assets/fondoR.webp')] bg-cover bg-center" >
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
                </div>
                <div className="absolute top-0 left-0 right-0 flex flex-col items-center mt-12">
                    <h1 className="text-8xl font-bold text-center text-violet-300 drop-shadow-lg" style={{fontFamily: '"Slackey", sans-serif'}} >Reconocedor</h1>
                    <h2 className="text-5xl font-bold text-center text-violet-200 mt-2 drop-shadow-lg" style={{fontFamily: '"Slackey", sans-serif'}}>Tokens y Lexemas </h2>
                </div>
                <div className="flex flex-col items-center justify-center w-full max-w-xl p-8 rounded-2xl text-white shadow-lg border border-blue-700 bg-gray-900/80 z-10 mt-32">
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`w-full h-64 flex flex-col justify-center items-center p-8 text-center rounded-xl cursor-pointer transition border-2 ${isDragOver ? "border-blue-400 bg-blue-900/30" : "border-gray-600 bg-gray-900/50"}`}
                    >
                        <input
                            type="file"
                            accept=".txt,.alg"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-input"
                        />
                        <label
                            htmlFor="file-input"
                            className="flex flex-col items-center justify-center space-y-2 cursor-pointer w-full h-full"
                        >
                            {isLoading ? (
                                <span className="text-blue-400 animate-pulse">Cargando archivo...</span>
                            ) : fileName ? (
                                <>
                                    <span className="text-green-400">Archivo seleccionado:</span>
                                    <span className="text-sm text-gray-300">{fileName}</span>
                                    <button
                                        className="mt-4 px-6 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-thin shadow-md transition" style={{fontFamily: '"Passero One", sans-serif'}}
                                    >
                                        Analizar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="text-blue-400 font-medium text-lg">
                                        Arrastra tu archivo aquí
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        o haz clic para seleccionarlo (.txt, .alg)
                                    </span>
                                </>
                            )}
                        </label>
                    </div>
                    {fileName && !isLoading && (
                        <button
                            className="mt-6 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-thin shadow-md transition" style={{fontFamily: '"Passero One", sans-serif'}}
                            onClick={() => { setFileName(""); setFileContent(""); }}
                        >
                            Limpiar selección
                        </button>
                    )}
                </div>
            </div>
        );
};

export default FormFileInput;
