import { NextRequest, NextResponse } from "next/server";
import { Boss } from "../utils/boss";

declare global {
  // eslint-disable-next-line no-var
  var __boss: Boss | undefined;
}

const boss = global.__boss || (global.__boss = new Boss());

export async function GET() {
  // Report status
  return NextResponse.json(boss.reportStatus());
}

export async function POST(req: NextRequest) {
  const { action, description, assignedTo, recommendation } = await req.json();
  if (action === "assign") {
    if (!description || !assignedTo) {
      return NextResponse.json({ error: "Missing description or assignedTo" }, { status: 400 });
    }
    const id = boss.assignTask(description, assignedTo);
    return NextResponse.json({ id });
  }
  if (action === "recommend") {
    if (!recommendation) {
      return NextResponse.json({ error: "Missing recommendation" }, { status: 400 });
    }
    boss.logRecommendation(recommendation);
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
} 