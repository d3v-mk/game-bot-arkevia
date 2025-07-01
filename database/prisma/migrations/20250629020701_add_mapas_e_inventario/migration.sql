-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('masculino', 'feminino', 'outro');

-- AlterTable
ALTER TABLE "jogador" ADD COLUMN     "agilidade" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "defesa" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "forca" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "inteligencia" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "mana" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "sexo" "Sexo",
ADD COLUMN     "sorte" INTEGER NOT NULL DEFAULT 5;

-- CreateTable
CREATE TABLE "inventario" (
    "id" TEXT NOT NULL,
    "jogadorId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "equipado" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guilda" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "liderId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guilda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mapa" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "conexoes" JSONB,
    "npcs" JSONB,
    "inimigos" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mapa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MembrosDaGuilda" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MembrosDaGuilda_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MembrosDaGuilda_B_index" ON "_MembrosDaGuilda"("B");

-- AddForeignKey
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guilda" ADD CONSTRAINT "guilda_liderId_fkey" FOREIGN KEY ("liderId") REFERENCES "jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembrosDaGuilda" ADD CONSTRAINT "_MembrosDaGuilda_A_fkey" FOREIGN KEY ("A") REFERENCES "guilda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembrosDaGuilda" ADD CONSTRAINT "_MembrosDaGuilda_B_fkey" FOREIGN KEY ("B") REFERENCES "jogador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
