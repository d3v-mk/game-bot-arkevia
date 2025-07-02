/*
  Warnings:

  - The `jogadorId` column on the `Conquista` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_MembrosDaGuilda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `jogador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `jogador` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `B` on the `_MembrosDaGuilda` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `liderId` on the `guilda` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `jogadorId` on the `inventario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

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
ALTER TABLE "Conquista" DROP COLUMN "jogadorId",
ADD COLUMN     "jogadorId" INTEGER;

-- AlterTable
ALTER TABLE "_MembrosDaGuilda" DROP CONSTRAINT "_MembrosDaGuilda_AB_pkey",
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_MembrosDaGuilda_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "guilda" DROP COLUMN "liderId",
ADD COLUMN     "liderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inventario" DROP COLUMN "jogadorId",
ADD COLUMN     "jogadorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "jogador" DROP CONSTRAINT "jogador_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "jogador_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "_MembrosDaGuilda_B_index" ON "_MembrosDaGuilda"("B");

-- AddForeignKey
ALTER TABLE "Conquista" ADD CONSTRAINT "Conquista_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "jogador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guilda" ADD CONSTRAINT "guilda_liderId_fkey" FOREIGN KEY ("liderId") REFERENCES "jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembrosDaGuilda" ADD CONSTRAINT "_MembrosDaGuilda_B_fkey" FOREIGN KEY ("B") REFERENCES "jogador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
