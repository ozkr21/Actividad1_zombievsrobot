"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const defaults = { name: "", type: "zombie", health: 100, attack: 30, defense: 20, speed: 10 };

export default function NewCharacter() {
  const router = useRouter();
  const [form, setForm] = useState(defaults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) router.push("/");
    else setError("Error al crear personaje");
  };

  const fields = [
    { name: "health", label: "❤️ Vida" },
    { name: "attack", label: "⚔️ Ataque" },
    { name: "defense", label: "🛡️ Defensa" },
    { name: "speed", label: "💨 Velocidad" },
  ];

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Nuevo Personaje</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input name="name" value={form.name} onChange={handle}
            className="w-full border rounded px-3 py-2" placeholder="Ej: Z-X200" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tipo</label>
          <select name="type" value={form.type} onChange={handle} className="w-full border rounded px-3 py-2">
            <option value="zombie">🧟 Zombie</option>
            <option value="robot">🤖 Robot</option>
          </select>
        </div>
        {fields.map((f) => (
          <div key={f.name}>
            <label className="block text-sm font-medium mb-1">{f.label}</label>
            <input type="number" name={f.name} value={(form as any)[f.name]} onChange={handle}
              className="w-full border rounded px-3 py-2" min={1} />
          </div>
        ))}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={submit} disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Creando..." : "Crear Personaje"}
        </button>
      </div>
    </main>
  );
}