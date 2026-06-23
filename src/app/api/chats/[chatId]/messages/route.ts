import { db } from "@/db";
import { messages } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, asc } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const { chatId } = await params;
  const chatMessages = await db.query.messages.findMany({
    where: eq(messages.chatId, chatId),
    orderBy: [asc(messages.createdAt)],
  });
  return NextResponse.json(chatMessages);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const { chatId } = await params;
  const { role, content } = await req.json();
  
  const [newMessage] = await db.insert(messages).values({
    chatId,
    role,
    content,
  }).returning();

  return NextResponse.json(newMessage);
}