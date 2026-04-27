"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Character = { id: number; name: string; type: string };

export default function BattleForm({ characters }: { characters: Character[] }) {
  const router = useRouter();
  const [c1, setC1] = useState("");
  const [c2, setC2] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBattling, setIsBattling] = useState(false);
  const [fightGif, setFightGif] = useState("");
  const [error, setError] = useState("");

  const fightGifs = ["/pelea1.gif"]; // GIF de pelea

  const fight = async () => {
    if (!c1 || !c2 || c1 === c2) {
      setError("Selecciona dos personajes distintos");
      return;
    }
    setError("");
    setIsBattling(true);
    setFightGif(fightGifs[Math.floor(Math.random() * fightGifs.length)]);

    setTimeout(async () => {
      setLoading(true);
      const res = await fetch("/api/battles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character1Id: Number(c1), character2Id: Number(c2) }),
      });
      const data = await res.json();
      setLoading(false);
      setIsBattling(false);
      if (res.ok) router.push(`/battles/${data.battleId}`);
      else setError(data.error ?? "Error en la batalla");
    }, 5000);
  };

  if (isBattling) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">¡Batalla en curso!</h2>
        <img src={fightGif} alt="Pelea" className="w-64 h-64" />
        <p>Simulando combate...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        {[{ label: "Combatiente 1", val: c1, set: setC1 }, { label: "Combatiente 2", val: c2, set: setC2 }].map(
          ({ label, val, set }) => (
            <div key={label}>
              <label className="block text-sm font-medium mb-2">{label}</label>
              <select value={val} onChange={(e) => set(e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="">-- Seleccionar --</option>
                {characters.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.type === "zombie" ? "🧟" : "🤖"} {c.name}
                  </option>
                ))}
              </select>
            </div>
          )
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={fight} disabled={loading}
        className="bg-red-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-red-700 disabled:opacity-50">
        {loading ? "Simulando combate..." : "⚔️ ¡PELEAR!"}
      </button>
    </div>
  );
}