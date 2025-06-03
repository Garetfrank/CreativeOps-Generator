"use client";
import { useState } from "react";

export default function VideoCreator() {
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (data.video) setOutput(`<video src='${data.video}' controls class='w-full'></video>`);
      else if (data.note) setOutput(data.note);
      else setOutput(data.error || "Unknown error");
    } catch (err) {
      setOutput("Failed to generate video.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Video Creator</h1>
      <textarea
        className="w-full border rounded p-2 mb-4 min-h-[80px]"
        placeholder="Describe the video..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleGenerate}
        disabled={loading || !description}
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>
      {output && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Generated Video</h2>
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      )}
    </div>
  );
} 