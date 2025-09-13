import React, { useState } from "react";
import parseFile from "../Services/parser";
import Analizer from "../Services/Analizer";
import keywords from "./KeyWords.json";
import Report from "../Services/Report";

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [report, setReport] = useState<any | null>(null); // guarda resultados
  const [error, setError] = useState<string | null>(null); // guarda mensaje error
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
        setError("Error al extraer el texto: " + error.message);
      }
      );

  };

  const createDownloadReport = () => {
    Report(report)
  }


  // elimina entradas con valor 0
  const filterEmpty = (data: Record<string, number>) => {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value > 0)
    );
  };

  return (
    <div className="flex flex-row items-start w-full max-w-4xl mx-auto gap-8">
      <form
        onSubmit={handleSubmit}
        className="bg-trasparent p-8 rounded-2xl shadow-lg text-white border border-blue-700 min-w-[320px] flex-1"
      >
        <h2 className="text-xl font-bold text-center font-light" style={{ fontFamily: 'Passero One, sans-serif' }}>Subir documento</h2>

        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
          className="bg-transparent border border-gray-300 p-2 rounded-md w-full"
        />

        {file && (
          <p className="text-slate-500 mt-2">Archivo: {file.name}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 border-none cursor-pointer hover:bg-blue-700" style={{ fontFamily: 'Passero One, sans-serif' }}
        >
          Analizar
        </button>

        <div className="mt-4">
          {report && (
            <button 
              onClick={createDownloadReport} 
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Download report
            </button>
          )}
        </div>

      </form>

      {report && (
        <div className="bg-trasparent p-8 rounded-2xl shadow-lg text-white border border-blue-700 min-w-[320px] flex-[1.5]">
          <h2 className="text-xl font-bold mb-4 text-center" style={{fontFamily: 'Passero One, sans-serif'}}>Reporte de análisis</h2>

          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-semibold font-thin" style={{ fontFamily: 'Passero One, sans-serif' }}>Palabras reservadas:</h3>
              <pre className="bg-transparent border border-violet-700 p-2 rounded-md text-sm overflow-auto text-indigo-100">

                {JSON.stringify(filterEmpty(report.reserved), null, 2)}

              </pre>
            </div>

            <div>
              <h3 className="font-semibold font-thin" style={{ fontFamily: 'Passero One, sans-serif' }}>Operadores:</h3>
              <pre className="bg-transparent border border-violet-700 p-2 rounded-md text-sm overflow-auto text-indigo-100">

                {JSON.stringify(filterEmpty(report.operators), null, 2)}

              </pre>
            </div>

            <div>
              <h3 className="font-semibold font-thin" style={{ fontFamily: 'Passero One, sans-serif' }}>Delimitadores:</h3>
              <pre className="bg-transparent border border-violet-700 p-2 rounded-md text-sm overflow-auto text-indigo-100">

                {JSON.stringify(filterEmpty(report.delimiters), null, 2)}

              </pre>
            </div>

            <div>
              <h3 className="font-semibold font-thin" style={{ fontFamily: 'Passero One, sans-serif' }}>Variables:</h3>
              <pre className="bg-transparent border border-violet-700 p-2 rounded-md text-sm overflow-auto text-indigo-100">

                {JSON.stringify(filterEmpty(report.variables), null, 2)}

              </pre>
            </div>
          </div>
        </div>
      )}

      <button onClick={createDownloadReport} >Downdload report</button>

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg border border-blue-700 max-w-md text-center">
            <h2 className="text-lg font-bold mb-4">Ocurrió un error</h2>
            <p className="mb-6">{error}</p>
            <button
              onClick={() => setError(null)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}


    </div>
  );
};

export default UploadFile;
