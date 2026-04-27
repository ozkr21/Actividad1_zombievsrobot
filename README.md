# 🧟‍♂️ Zombie vs Robot 🤖

Aplicación web con **Next.js (SSR)** y **Prisma** para simular batallas por turnos entre zombies y robots.

---

## 🚀 Tecnologías
- Next.js 14+ (App Router + SSR)
- TypeScript
- Prisma ORM + SQLite
- Tailwind CSS

---

## ⚔️ Lógica de batalla
1. **Orden**: Ataca primero el de mayor `speed`
2. **Daño**: `ataque - (defensa * 0.5)` (mínimo 1 de daño)
3. **Turnos**: Se atacan alternadamente hasta que un personaje llegue a `health ≤ 0`
4. **Registro**: Cada batalla se guarda en la base de datos

---

## ✅ Requerimientos cumplidos

| Requerimiento | Estado |
|---------------|--------|
| Crear personajes | ✅ |
| Listar personajes (SSR) | ✅ |
| Filtrar por tipo | ✅ |
| Seleccionar 2 combatientes | ✅ |
| Ejecutar combate | ✅ |
| Mostrar ganador | ✅ |
| Registrar batallas | ✅ |
| Mostrar historial | ✅ |
| Next.js SSR | ✅ |
| Prisma ORM | ✅ |

---

## 🖼️ Evidencias de funcionamiento

<img width="894" height="596" alt="image" src="https://github.com/user-attachments/assets/be30c8cd-5f16-41f7-ad59-78e7c59761fe" />

<img width="1009" height="481" alt="image" src="https://github.com/user-attachments/assets/dab76138-3b4a-4d2c-875c-6ca0f1568aac" />

<img width="747" height="613" alt="image" src="https://github.com/user-attachments/assets/adbb04d6-a791-4731-b017-235bdb828dac" />


### 1. Listado de personajes
![Listado](public/images/characters.png)

*Pantalla principal mostrando todos los personajes con sus atributos (vida, defensa, ataque, velocidad). Permite filtrar por tipo zombie/robot.*

---

### 2. Selección y simulación de batalla
![Batalla](public/images/battle.png)

*Selector de combatientes, botón "PELEAR" y resultado del combate con historial de turnos.*

---

### 3. Historial de batallas
![Historial](public/images/history.png)

*Registro de todas las batallas realizadas: combatientes, ganador y número de turnos.*

---

## 🛠️ Instalación rápida

```bash
git clone https://github.com/ozkr21/Actividad1_zombievsrobot.git
cd Actividad1_zombievsrobot
npm install
npx prisma generate
npx prisma db push
npm run dev
