/*
  Warnings:

  - The values [outro] on the enum `Sexo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Sexo_new" AS ENUM ('masculino', 'feminino');
ALTER TABLE "jogador" ALTER COLUMN "sexo" TYPE "Sexo_new" USING ("sexo"::text::"Sexo_new");
ALTER TYPE "Sexo" RENAME TO "Sexo_old";
ALTER TYPE "Sexo_new" RENAME TO "Sexo";
DROP TYPE "Sexo_old";
COMMIT;

-- AlterTable
ALTER TABLE "jogador" ADD COLUMN     "viajando" BOOLEAN NOT NULL DEFAULT false;
