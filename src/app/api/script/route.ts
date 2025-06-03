import { NextRequest, NextResponse } from "next/server";
import { callOpenAI } from "../utils/ai";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    const script = await callOpenAI(prompt);
    return NextResponse.json({ script });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
} 