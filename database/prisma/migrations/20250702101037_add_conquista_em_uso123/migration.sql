/*
  Warnings:

  - You are about to drop the column `jogadorId` on the `conquista` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "conquista" DROP CONSTRAINT "conquista_jogadorId_fkey";

-- DropForeignKey
ALTER TABLE "conquista_ativa" DROP CONSTRAINT "conquista_ativa_conquistaId_fkey";

-- DropForeignKey
ALTER TABLE "conquista_ativa" DROP CONSTRAINT "conquista_ativa_jogadorId_fkey";

-- AlterTable
ALTER TABLE "conquista" DROP COLUMN "jogadorId";

-- CreateTable
CREATE TABLE "conquista_do_jogador" (
    "id" TEXT NOT NULL,
    "jogadorId" TEXT NOT NULL,
    "conquistaId" INTEGER NOT NULL,
    "recebidaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conquista_do_jogador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conquista_do_jogador_jogadorId_conquistaId_key" ON "conquista_do_jogador"("jogadorId", "conquistaId");

-- AddForeignKey
ALTER TABLE "conquista_do_jogador" ADD CONSTRAINT "conquista_do_jogador_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "jogador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conquista_do_jogador" ADD CONSTRAINT "conquista_do_jogador_conquistaId_fkey" FOREIGN KEY ("conquistaId") REFERENCES "conquista"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conquista_ativa" ADD CONSTRAINT "conquista_ativa_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "jogador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conquista_ativa" ADD CONSTRAINT "conquista_ativa_conquistaId_fkey" FOREIGN KEY ("conquistaId") REFERENCES "conquista"("id") ON DELETE CASCADE ON UPDATE CASCADE;
