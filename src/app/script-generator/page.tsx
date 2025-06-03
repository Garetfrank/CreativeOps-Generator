"use client";
import { useState } from "react";
import Link from "next/link";

export default function ScriptGenerator() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.script) setOutput(data.script);
      else setOutput(data.error || "Unknown error");
    } catch (err) {
      setOutput("Failed to generate script.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow mt-8">
      <div className="mb-4">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Script Generator</h1>
      <textarea
        className="w-full border rounded p-2 mb-4 min-h-[100px]"
        placeholder="Describe your creative..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleGenerate}
        disabled={loading || !prompt}
      >
        {loading ? "Generating..." : "Generate Script"}
      </button>
      {output && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Generated Script</h2>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
} 