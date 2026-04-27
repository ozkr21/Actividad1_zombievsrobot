-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Battle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "character1Id" INTEGER NOT NULL,
    "character2Id" INTEGER NOT NULL,
    "winnerId" INTEGER NOT NULL,
    "turns" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Battle_character1Id_fkey" FOREIGN KEY ("character1Id") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Battle_character2Id_fkey" FOREIGN KEY ("character2Id") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Battle_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
