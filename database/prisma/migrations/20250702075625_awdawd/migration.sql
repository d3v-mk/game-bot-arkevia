/*
  Warnings:

  - You are about to drop the `Conquista` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conquista" DROP CONSTRAINT "Conquista_jogadorId_fkey";

-- DropTable
DROP TABLE "Conquista";

-- CreateTable
CREATE TABLE "conquista" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "emoji" TEXT,
    "tipo" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "raridade" TEXT,
    "jogadorId" TEXT,

    CONSTRAINT "conquista_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "conquista" ADD CONSTRAINT "conquista_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "jogador"("id") ON DELETE SET NULL ON UPDATE CASCADE;
