import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // garantiza SSR real

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const type = (await searchParams)?.type;

  const characters = await prisma.character.findMany({
    where: type ? { type } : undefined,
    orderBy: { id: "desc" },
  });

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mr-90">⚔️ Zombies vs Robots Oscar Uribe</h1>
        <div className="flex gap-3">
          <Link href="/characters/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Personaje
          </Link>
          <Link href="/battles" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            ⚔️ Batalla
          </Link>
          <Link href="/history" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            📜 Historial
          </Link>
        </div>
      </div>

      {/* Filtro por tipo */}
      <div className="flex gap-3 mb-6">
        <Link href="/" className={`px-3 py-1 rounded border ${!type ? "bg-black text-white" : ""}`}>Todos</Link>
        <Link href="/?type=zombie" className={`px-3 py-1 rounded border ${type === "zombie" ? "bg-green-700 text-white" : ""}`}>🧟 Zombies</Link>
        <Link href="/?type=robot" className={`px-3 py-1 rounded border ${type === "robot" ? "bg-blue-700 text-white" : ""}`}>🤖 Robots</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {characters.map((c) => (
          <div key={c.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-blue-600">{c.name}</h2>
              <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${c.type === "zombie" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                {c.type === "zombie" ? "🧟" : "🤖"} {c.type}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-3 text-sm text-gray-600">
              <span>❤️ Vida: <strong>{c.health}</strong></span>
              <span>⚔️ Ataque: <strong>{c.attack}</strong></span>
              <span>🛡️ Defensa: <strong>{c.defense}</strong></span>
              <span>💨 Velocidad: <strong>{c.speed}</strong></span>
            </div>
          </div>
        ))}
        {characters.length === 0 && (
          <p className="text-gray-400 col-span-2 text-center py-10">No hay personajes. ¡Crea uno!</p>
        )}
      </div>
    </main>
  );
}