import { NextRequest, NextResponse } from "next/server";
import { generateCaptions } from "../utils/captionsai";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Missing text" }, { status: 400 });
    const captions = await generateCaptions(text);
    return NextResponse.json({ captions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
} 