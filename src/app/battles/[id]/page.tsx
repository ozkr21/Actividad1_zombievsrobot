import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BattleResult({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const battle = await prisma.battle.findUnique({
    where: { id: Number(resolvedParams.id) },
    include: { character1: true, character2: true, winner: true },
  });

  if (!battle) return notFound();

  const loser = battle.winner.id === battle.character1.id ? battle.character2 : battle.character1;

  return (
    <main className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-2">Resultado de la Batalla</h1>
      <p className="text-gray-500 mb-8">Duración: {battle.turns} turnos</p>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="border-4 border-yellow-400 rounded-xl p-6 bg-yellow-50">
          <div className="text-4xl mb-2">🏆</div>
          <h2 className="text-xl font-bold text-yellow-700">GANADOR</h2>
          <p className="text-2xl font-semibold mt-1">{battle.winner.name}</p>
          <span className="text-sm text-gray-500">{battle.winner.type === "zombie" ? "🧟 Zombie" : "🤖 Robot"}</span>
        </div>
        <div className="border rounded-xl p-6 bg-gray-50 opacity-70">
          <div className="text-4xl mb-2">💀</div>
          <h2 className="text-xl font-bold text-gray-500">DERROTADO</h2>
          <p className="text-2xl font-semibold mt-1">{loser.name}</p>
          <span className="text-sm text-gray-500">{loser.type === "zombie" ? "🧟 Zombie" : "🤖 Robot"}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/battles" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
          ⚔️ Nueva Batalla
        </Link>
        <Link href="/history" className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">
          📜 Ver Historial
        </Link>
      </div>
    </main>
  );
}