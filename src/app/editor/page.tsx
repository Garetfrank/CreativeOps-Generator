"use client";
import { useState } from "react";

export default function Editor() {
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Editor</h1>
      <textarea
        className="w-full border rounded p-2 mb-4 min-h-[120px]"
        placeholder="Edit your creative..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleSave}
        disabled={!content}
      >
        Save
      </button>
      {saved && (
        <div className="mt-4 text-green-600">Saved!</div>
      )}
    </div>
  );
} 