import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear personajes de ejemplo
  await prisma.character.createMany({
    data: [
      { name: "Zombie Guerrero", type: "zombie", health: 100, attack: 20, defense: 10, speed: 5 },
      { name: "Robot Destructor", type: "robot", health: 120, attack: 25, defense: 15, speed: 10 },
      { name: "Zombie Veloz", type: "zombie", health: 80, attack: 15, defense: 5, speed: 15 },
      { name: "Robot Defensivo", type: "robot", health: 150, attack: 10, defense: 25, speed: 5 },
    ],
  });

  console.log("Datos sembrados exitosamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });