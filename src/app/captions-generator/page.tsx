"use client";
import { useState } from "react";

export default function CaptionsGenerator() {
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: description }),
      });
      const data = await res.json();
      if (data.captions) setOutput(data.captions);
      else setOutput(data.error || "Unknown error");
    } catch (err) {
      setOutput("Failed to generate captions.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Captions Generator</h1>
      <textarea
        className="w-full border rounded p-2 mb-4 min-h-[80px]"
        placeholder="Describe the video for captions..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleGenerate}
        disabled={loading || !description}
      >
        {loading ? "Generating..." : "Generate Captions"}
      </button>
      {output && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Generated Captions</h2>
          <div>{output}</div>
        </div>
      )}
    </div>
  );
} 