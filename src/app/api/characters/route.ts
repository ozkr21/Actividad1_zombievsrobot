import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, type, health, attack, defense, speed } = body;

  if (!name || !type || !health || !attack || !defense || !speed) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const character = await prisma.character.create({
    data: {
      name,
      type,
      health: Number(health),
      attack: Number(attack),
      defense: Number(defense),
      speed: Number(speed),
    },
  });

  return NextResponse.json(character, { status: 201 });
}