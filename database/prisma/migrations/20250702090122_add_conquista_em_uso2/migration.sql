/*
  Warnings:

  - You are about to drop the column `conquistaEmUsoId` on the `jogador` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "jogador" DROP CONSTRAINT "jogador_conquistaEmUsoId_fkey";

-- DropIndex
DROP INDEX "jogador_conquistaEmUsoId_key";

-- AlterTable
ALTER TABLE "jogador" DROP COLUMN "conquistaEmUsoId";

-- CreateTable
CREATE TABLE "conquista_ativa" (
    "id" TEXT NOT NULL,
    "jogadorId" TEXT NOT NULL,
    "conquistaId" INTEGER NOT NULL,
    "ativadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conquista_ativa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conquista_ativa_jogadorId_conquistaId_key" ON "conquista_ativa"("jogadorId", "conquistaId");

-- AddForeignKey
ALTER TABLE "conquista_ativa" ADD CONSTRAINT "conquista_ativa_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conquista_ativa" ADD CONSTRAINT "conquista_ativa_conquistaId_fkey" FOREIGN KEY ("conquistaId") REFERENCES "conquista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
