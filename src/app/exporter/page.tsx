"use client";
import { useState } from "react";

const aspectRatios = [
  { label: "Horizontal (16:9)", value: "16:9" },
  { label: "Vertical (9:16)", value: "9:16" },
  { label: "Square (1:1)", value: "1:1" },
  { label: "1080x1080", value: "1080x1080" },
];
const formats = ["mp4", "mov", "webm"];

export default function Exporter() {
  const [ratio, setRatio] = useState(aspectRatios[0].value);
  const [format, setFormat] = useState(formats[0]);
  const [greenscreen, setGreenscreen] = useState(false);
  const [avatar, setAvatar] = useState(true);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    // Placeholder for export logic
    setTimeout(() => {
      setOutput(`Exported as ${format}, ratio ${ratio}, greenscreen: ${greenscreen}, avatar: ${avatar}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Multi-Output Exporter</h1>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Aspect Ratio</label>
        <select
          className="w-full border rounded p-2"
          value={ratio}
          onChange={e => setRatio(e.target.value)}
        >
          {aspectRatios.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Format</label>
        <select
          className="w-full border rounded p-2"
          value={format}
          onChange={e => setFormat(e.target.value)}
        >
          {formats.map(opt => (
            <option key={opt} value={opt}>{opt.toUpperCase()}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center mb-4 gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={greenscreen} onChange={e => setGreenscreen(e.target.checked)} />
          Greenscreen
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={avatar} onChange={e => setAvatar(e.target.checked)} />
          Include Avatar
        </label>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleExport}
        disabled={loading}
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