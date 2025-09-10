import React, { useState } from "react";
import parseFile from "../Services/parser";

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);

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
            // aca vamos a colocar la funcion para analizar el texto 
        }
        ).catch((error) => {
            console.error("Error al extraer el texto:", error);
        }
    );
    
  };

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
    </div>
  );
};

export default UploadFile;
