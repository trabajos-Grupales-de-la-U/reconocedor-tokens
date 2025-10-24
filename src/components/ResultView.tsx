// src/components/ResultView.tsx
import React from "react";

interface ResultViewProps {
  result?: string;
  error?: string;
}

const ResultView: React.FC<ResultViewProps> = ({ result, error }) => {
  if (!result && !error) return null;

  return (
    <div className="text-center my-4">
      {error ? (
        <p className="text-red-500 font-semibold">{error}</p>
      ) : (
        <p className="text-green-400 font-semibold">{result}</p>
      )}
    </div>
  );
};

export default ResultView;
