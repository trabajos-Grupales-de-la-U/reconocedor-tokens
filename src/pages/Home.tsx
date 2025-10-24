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
  const [fileName, setFileName] = useState<string | null>(null);

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

  // Limpiar análisis
  const clearAnalysis = () => {
    setTokens([]);
    setError(null);
    setFileName(null);
  };

  // Mensaje de resultado
  const resultMessage =
    !error && tokens.length > 0
      ? "El archivo es válido: sin errores léxicos"
      : undefined;

  return (
    <main className="w-full max-w-5xl bg-gray-900 rounded-lg shadow-lg p-8 flex flex-col items-center text-center space-y-6 mx-4 animate-fadeIn">
      <h1 className="text-2xl font-bold">Coloreador Léxico – Proyecto II</h1>

      <FileUploader
        onFileSelect={handleFileSelect}
        onTestSelect={handleTestSelect}
      />

      {fileName && (
        <p className="text-sm text-gray-400">
          Archivo analizado:{" "}
          <span className="text-blue-400 font-medium">{fileName}</span>
        </p>
      )}

      <button
        onClick={clearAnalysis}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-md transition"
      >
        Limpiar análisis
      </button>

      <ResultView error={error || undefined} result={resultMessage} />

      {tokens.length > 0 && (
        <div className="w-full flex flex-col items-center space-y-4">
          <h2 className="text-lg font-semibold mt-4">Código coloreado</h2>
          <Editor tokens={tokens} />
          <TokenTable tokens={tokens} />
        </div>
      )}
    </main>
  );
};

export default Home;
