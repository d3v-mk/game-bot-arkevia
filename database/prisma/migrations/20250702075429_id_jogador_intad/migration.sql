/*
  Warnings:

  - The primary key for the `_MembrosDaGuilda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `jogador` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Conquista" DROP CONSTRAINT "Conquista_jogadorId_fkey";

-- DropForeignKey
ALTER TABLE "_MembrosDaGuilda" DROP CONSTRAINT "_MembrosDaGuilda_B_fkey";

-- DropForeignKey
ALTER TABLE "guilda" DROP CONSTRAINT "guilda_liderId_fkey";

-- DropForeignKey
ALTER TABLE "inventario" DROP CONSTRAINT "inventario_jogadorId_fkey";

-- AlterTable
ALTER TABLE "Conquista" ALTER COLUMN "jogadorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_MembrosDaGuilda" DROP CONSTRAINT "_MembrosDaGuilda_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_MembrosDaGuilda_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "guilda" ALTER COLUMN "liderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "inventario" ALTER COLUMN "jogadorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "jogador" DROP CONSTRAINT "jogador_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "jogador_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "jogador_id_seq";

-- AddForeignKey
ALTER TABLE "Conquista" ADD CONSTRAINT "Conquista_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "jogador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guilda" ADD CONSTRAINT "guilda_liderId_fkey" FOREIGN KEY ("liderId") REFERENCES "jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembrosDaGuilda" ADD CONSTRAINT "_MembrosDaGuilda_B_fkey" FOREIGN KEY ("B") REFERENCES "jogador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
