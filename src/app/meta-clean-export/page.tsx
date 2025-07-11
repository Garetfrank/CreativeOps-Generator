"use client";
import { useState } from "react";

export default function MetaCleanExport() {
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    // Placeholder for API call
    setTimeout(() => {
      setOutput(`Exported for: ${description}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Meta Clean Export</h1>
      <textarea
        className="w-full border rounded p-2 mb-4 min-h-[80px]"
        placeholder="Describe export requirements..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleExport}
        disabled={loading || !description}
      >
        {loading ? "Exporting..." : "Export"}
      </button>
      {output && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Export Result</h2>
          <div>{output}</div>
        </div>
      )}
    </div>
  );
} 