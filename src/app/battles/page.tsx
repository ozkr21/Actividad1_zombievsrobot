import { prisma } from "@/lib/prisma";
import BattleForm from "@/components/BattleForm";

export const dynamic = "force-dynamic";

export default async function BattlesPage() {
  const characters = await prisma.character.findMany({ orderBy: { name: "asc" } });

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">⚔️ Iniciar Batalla</h1>
      <BattleForm characters={characters} />
    </main>
  );
}