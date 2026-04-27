import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { simulateBattle } from "@/lib/battle";

export async function POST(req: NextRequest) {
  const { character1Id, character2Id } = await req.json();

  if (!character1Id || !character2Id || character1Id === character2Id) {
    return NextResponse.json({ error: "Selecciona dos personajes distintos" }, { status: 400 });
  }

  const [c1, c2] = await Promise.all([
    prisma.character.findUnique({ where: { id: Number(character1Id) } }),
    prisma.character.findUnique({ where: { id: Number(character2Id) } }),
  ]);

  if (!c1 || !c2) {
    return NextResponse.json({ error: "Personaje no encontrado" }, { status: 404 });
  }

  const result = simulateBattle(c1, c2);

  const battle = await prisma.battle.create({
    data: {
      character1Id: c1.id,
      character2Id: c2.id,
      winnerId: result.winnerId,
      turns: result.turns,
    },
  });

  return NextResponse.json({ battleId: battle.id, ...result }, { status: 201 });
}