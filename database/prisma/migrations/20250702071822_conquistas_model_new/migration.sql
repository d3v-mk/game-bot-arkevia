-- CreateTable
CREATE TABLE "Conquista" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "emoji" TEXT,
    "tipo" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "raridade" TEXT,
    "jogadorId" TEXT,

    CONSTRAINT "Conquista_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conquista" ADD CONSTRAINT "Conquista_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "jogador"("id") ON DELETE SET NULL ON UPDATE CASCADE;
