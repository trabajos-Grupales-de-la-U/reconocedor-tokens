import React, { useState } from "react";
import parseFile from "../Services/parser";
import Analizer from "../Services/Analizer";
import keywords from "./KeyWords.json";
import Report from "../Services/Report";

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [report, setReport] = useState<any | null>(null); // guarda resultados
  const keyWoords = keywords

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      alert("Por favor selecciona un archivo.");
      return;
    }

    console.log("Archivo seleccionado:", file.name);
    parseFile(file)
      .then((text) => {
        console.log("Texto extraído:", text);
        // aca vamos a colocar la funcion para analizar el text 
        const conteo = Analizer(text, keyWoords.ReservedWords)
        const conteoOperators = Analizer(text, keyWoords.Operators)
        const conteoDelimiters = Analizer(text, keyWoords.Delimiters)

        const palabras = text.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || []
        const palabrasFiltradas = palabras.filter((value) => !keyWoords.ReservedWords.includes(value))
        const conteoVariables = Analizer(text, palabrasFiltradas)


        // Guarda en el estado report
        setReport({
          reserved: conteo,
          operators: conteoOperators,
          delimiters: conteoDelimiters,
          variables: conteoVariables,
        });

      }
      ).catch((error) => {
        console.error("Error al extraer el texto:", error);
      }
      );

  };

  const createDownloadReport = () => {
    Report(report)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4"
      >
        <h2 className="text-xl font-bold">Subir documento</h2>

        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
          className="border p-2 rounded-md"
        />

        {file && (
          <p className="text-gray-700">Archivo: {file.name}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Analizar
        </button>
      </form>

        {report && (
        <div className="bg-white p-6 rounded-2xl shadow-md w-1/2">
          <h2 className="text-xl font-bold mb-4">Reporte de análisis</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Palabras reservadas:</h3>
              <pre className="bg-gray-100 p-2 rounded-md text-sm overflow-auto">
                {JSON.stringify(report.reserved, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">Operadores:</h3>
              <pre className="bg-gray-100 p-2 rounded-md text-sm overflow-auto">
                {JSON.stringify(report.operators, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">Delimitadores:</h3>
              <pre className="bg-gray-100 p-2 rounded-md text-sm overflow-auto">
                {JSON.stringify(report.delimiters, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">Variables:</h3>
              <pre className="bg-gray-100 p-2 rounded-md text-sm overflow-auto">
                {JSON.stringify(report.variables, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      <button onClick={createDownloadReport} >Downdload report</button>
    </div>
  );
};

export default UploadFile;
