"use client";
import { useState } from "react";

export default function Storage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    // Placeholder for upload logic
    setTimeout(() => {
      setUploaded((prev) => [...prev, file.name]);
      setFile(null);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Storage & Retrieval</h1>
      <input
        type="file"
        className="mb-4"
        onChange={e => setFile(e.target.files?.[0] || null)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleUpload}
        disabled={loading || !file}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {uploaded.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Uploaded Files</h2>
          <ul>
            {uploaded.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 