"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type BoardColumns = {
  Backlog: string[];
  "In Progress": string[];
  Review: string[];
  Done: string[];
};

function parseBoard(md: string): BoardColumns {
  const columns: BoardColumns = { Backlog: [], "In Progress": [], Review: [], Done: [] };
  let current: keyof BoardColumns | null = null;
  md.split("\n").forEach(line => {
    if (line.startsWith("## ")) {
      const col = line.replace("## ", "").trim() as keyof BoardColumns;
      if (columns[col] !== undefined) current = col;
    } else if (line.startsWith("- ") && current) {
      columns[current].push(line.replace("- ", "").trim());
    }
  });
  return columns;
}

export default function ProjectBoard() {
  const [columns, setColumns] = useState<BoardColumns | null>(null);

  useEffect(() => {
    fetch("/project_board.md")
      .then((res) => res.text())
      .then((md) => setColumns(parseBoard(md)));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c2b] to-[#232946] flex flex-col items-center p-8">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white drop-shadow">Project Board</h1>
          <Link href="/creative-journey" className="px-4 py-2 rounded bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600">Go to Creative Journey</Link>
        </div>
        {columns ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Object.entries(columns).map(([col, tasks]) => (
              <div key={col} className="bg-[#232946] rounded-xl shadow-xl p-4 border border-blue-900/30 flex flex-col">
                <h2 className="text-xl font-bold text-blue-200 mb-4 text-center">{col}</h2>
                {(tasks as string[]).length ? (tasks as string[]).map((task: string, i: number) => (
                  <div key={i} className="bg-[#2d325a] text-blue-100 rounded p-3 mb-3 shadow-sm text-base text-center">{task}</div>
                )) : <div className="text-blue-400 text-center">No tasks</div>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-blue-200">Loading project board...</div>
        )}
      </div>
    </div>
  );
} 