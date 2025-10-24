// src/components/FileUploader.tsx
import React, { useRef } from "react";

interface FileUploaderProps {
  onFileSelect?: (content: string, name?: string) => void;
  onTestSelect?: (name: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  onTestSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (onFileSelect) onFileSelect(content, file.name);
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    // limpia el input manualmente si fuera necesario
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const testFiles = [
    "test1_valido.txt",
    "test2_valido.txt",
    "test3_valido.txt",
    "test4_invalido.txt",
    "test5_invalido.txt",
    "test6_invalido.txt",
  ];

  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <p className="font-semibold">Selecciona un archivo de entrada (.txt)</p>
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        className="bg-gray-800 text-gray-100 p-2 rounded-md cursor-pointer"
      />

      <p className="mt-4 text-sm text-gray-400">
        o selecciona un test de ejemplo:
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {testFiles.map((file) => (
          <button
            key={file}
            onClick={() => {
              handleReset();
              onTestSelect?.(file);
            }}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition"
          >
            {file}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
