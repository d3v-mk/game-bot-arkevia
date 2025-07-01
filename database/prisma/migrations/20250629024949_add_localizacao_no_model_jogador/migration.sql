-- AlterTable
ALTER TABLE "jogador" ADD COLUMN     "localizacaoAtualId" TEXT;

-- AddForeignKey
ALTER TABLE "jogador" ADD CONSTRAINT "jogador_localizacaoAtualId_fkey" FOREIGN KEY ("localizacaoAtualId") REFERENCES "mapa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
