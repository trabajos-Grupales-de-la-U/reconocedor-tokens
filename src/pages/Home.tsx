// src/pages/Home.tsx
import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import ResultView from "../components/ResultView";
import Editor from "../components/Editor";
import TokenTable from "../components/TokenTable";
import { Lexer } from "../core/lexer";
import type { Token } from "../core/tokenTypes";

const Home: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploaderKey, setUploaderKey] = useState<number>(0); // 🔑 clave para forzar reinicio de FileUploader

  // Procesar archivo cargado o test seleccionado
  const handleFileSelect = (content: string, name?: string) => {
    try {
      const lexer = new Lexer(content);
      lexer.analyze();
      const analyzedTokens = lexer.getTokens();

      setTokens(analyzedTokens);
      setError(lexer.errorMessage);
      if (name) setFileName(name);
    } catch (err: any) {
      setError(err.message || "Error léxico desconocido.");
      setTokens([]);
      if (name) setFileName(name);
    }
  };

  // Cargar test de ejemplo
  const handleTestSelect = async (file: string) => {
    try {
      const response = await fetch(`/tests/${file}`);
      const text = await response.text();
      handleFileSelect(text, file);
    } catch {
      setError(`No se pudo cargar el archivo ${file}`);
    }
  };

  // Limpiar análisis (reinicia todo)
  const clearAnalysis = () => {
    setTokens([]);
    setError(null);
    setResultMessage(null);
    setFileName(null);
    setUploaderKey((prev) => prev + 1); // 🔁 fuerza nuevo render del FileUploader

    // También limpia el input file del DOM si existe
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) input.value = "";
  };

  // Mensaje de resultado dinámico
  const computedResultMessage =
    tokens.length === 0
      ? undefined
      : !error
      ? "El archivo es válido: sin errores léxicos"
      : undefined;

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-6 bg-gray-900 text-white rounded-lg shadow-lg text-center space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold">Coloreador Léxico – Proyecto II</h1>

      {/* Subida de archivos */}
      <FileUploader
        key={uploaderKey} // 🔑 clave para reiniciar correctamente al limpiar
        onFileSelect={handleFileSelect}
        onTestSelect={handleTestSelect}
      />

      {/* Mostrar nombre del archivo analizado */}
      {fileName && (
        <p className="text-sm text-gray-400">
          Archivo analizado:{" "}
          <span className="text-blue-400 font-medium">{fileName}</span>
        </p>
      )}

      {/* Botón para limpiar todo */}
      <button
        onClick={clearAnalysis}
        className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-md transition"
      >
        Limpiar análisis
      </button>

      {/* Mensaje de resultado */}
      <ResultView error={error || undefined} result={computedResultMessage} />

      {/* Vista del código coloreado y tabla */}
      {tokens.length > 0 && (
        <div className="w-full flex flex-col items-center space-y-6">
          <h2 className="text-lg font-semibold mt-4">Código coloreado</h2>
          <Editor tokens={tokens} />
          <TokenTable tokens={tokens} />
        </div>
      )}
    </main>
  );
};

export default Home;
