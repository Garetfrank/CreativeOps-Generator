"use client";
import { useState } from "react";
import Link from "next/link";

export default function PropGenerator() {
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput([]);
    try {
      const res = await fetch("/api/prop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (data.images && data.images.length > 0) setOutput(data.images);
      else if (data.note) setOutput([data.note]);
      else setOutput([data.error || "Unknown error"]);
    } catch (err) {
      setOutput(["Failed to generate image."]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow mt-8">
      <div className="mb-4">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Prop + Image Generator</h1>
      <textarea
        className="w-full border rounded p-2 mb-4 min-h-[80px]"
        placeholder="Describe props or images needed..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleGenerate}
        disabled={loading || !description}
      >
        {loading ? "Generating..." : "Generate Props/Images"}
      </button>
      {output.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Generated Props/Images</h2>
          <ul>
            {output.map((item, idx) => (
              item.startsWith("http") ? (
                <li key={idx}><img src={item} alt="Generated" className="w-32 h-32 object-cover rounded mb-2" /></li>
              ) : (
                <li key={idx}>{item}</li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 