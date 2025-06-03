"use client";
import { useState } from "react";
import Link from "next/link";

const steps = [
  "Script",
  "Images/Props",
  "Video",
  "Review & Export"
];

export default function CreativeJourney() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c2b] to-[#232946] flex flex-col items-center p-8">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-white drop-shadow">Creative Journey</h1>
          <Link href="/project-board" className="px-4 py-2 rounded bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600">Go to Project Board</Link>
        </div>
        {/* Stepper */}
        <div className="flex justify-between mb-12">
          {steps.map((step, idx) => (
            <div key={step} className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 transition-all duration-300 border-2 ${idx === current ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white scale-110 shadow-xl border-blue-400' : 'bg-[#232946] text-gray-400 border-gray-700'}`}>{idx+1}</div>
              <span className={`text-xs font-medium ${idx === current ? 'text-blue-300' : 'text-gray-500'}`}>{step}</span>
              {idx < steps.length - 1 && <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 opacity-60" />}
            </div>
          ))}
        </div>
        {/* Step Content Placeholder */}
        <div className="bg-[#232946] rounded-xl shadow-2xl p-8 min-h-[300px] flex flex-col items-center justify-center border border-blue-900/30">
          <p className="text-lg text-blue-100">Step {current+1}: {steps[current]}</p>
          <div className="flex gap-4 mt-8">
            {current > 0 && (
              <button className="px-4 py-2 rounded bg-gray-700 text-gray-200 hover:bg-gray-600" onClick={() => setCurrent(current-1)}>Back</button>
            )}
            {current < steps.length-1 && (
              <button className="px-4 py-2 rounded bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600" onClick={() => setCurrent(current+1)}>Next</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 