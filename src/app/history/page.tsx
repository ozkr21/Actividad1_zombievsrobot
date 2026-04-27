import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function History() {
  const battles = await prisma.battle.findMany({
    include: { character1: true, character2: true, winner: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📜 Historial de Batallas</h1>
        <Link href="/" className="text-blue-600 hover:underline">← Inicio</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Combatiente 1</th>
              <th className="p-3 border">Combatiente 2</th>
              <th className="p-3 border">Ganador 🏆</th>
              <th className="p-3 border">Turnos</th>
              <th className="p-3 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {battles.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-3 border text-gray-400">{b.id}</td>
                <td className="p-3 border">{b.character1.name}</td>
                <td className="p-3 border">{b.character2.name}</td>
                <td className="p-3 border font-semibold text-yellow-700">{b.winner.name}</td>
                <td className="p-3 border text-center">{b.turns}</td>
                <td className="p-3 border text-gray-400">{new Date(b.createdAt).toLocaleDateString("es-CO")}</td>
              </tr>
            ))}
            {battles.length === 0 && (
              <tr><td colSpan={6} className="p-6 text-center text-gray-400">Sin batallas registradas aún</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}