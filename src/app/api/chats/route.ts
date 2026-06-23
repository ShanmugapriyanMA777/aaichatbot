import { db } from "@/db";
import { chats, messages } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const userId = "00000000-0000-0000-0000-000000000000"; // Mock user for now
  const userChats = await db.query.chats.findMany({
    where: eq(chats.userId, userId),
    orderBy: [desc(chats.updatedAt)],
  });
  return NextResponse.json(userChats);
}

export async function POST(req: NextRequest) {
  const userId = "00000000-0000-0000-0000-000000000000"; // Mock user
  const { title, model } = await req.json();
  
  const [newChat] = await db.insert(chats).values({
    userId,
    title: title || "New Conversation",
    model,
  }).returning();

  return NextResponse.json(newChat);
}