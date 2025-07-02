/*
  Warnings:

  - A unique constraint covering the columns `[conquistaEmUsoId]` on the table `jogador` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "jogador" ADD COLUMN     "conquistaEmUsoId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "jogador_conquistaEmUsoId_key" ON "jogador"("conquistaEmUsoId");

-- AddForeignKey
ALTER TABLE "jogador" ADD CONSTRAINT "jogador_conquistaEmUsoId_fkey" FOREIGN KEY ("conquistaEmUsoId") REFERENCES "conquista"("id") ON DELETE SET NULL ON UPDATE CASCADE;
