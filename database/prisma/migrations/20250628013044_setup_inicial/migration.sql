-- CreateTable
CREATE TABLE "jogador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "numeroWpp" TEXT NOT NULL,
    "email" TEXT,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "energia" INTEGER NOT NULL DEFAULT 100,
    "classeId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jogador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habilidades" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "xpRequerido" INTEGER NOT NULL,
    "custoEnergia" INTEGER NOT NULL,
    "classeId" TEXT NOT NULL,

    CONSTRAINT "habilidades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jogador_numeroWpp_key" ON "jogador"("numeroWpp");

-- CreateIndex
CREATE UNIQUE INDEX "jogador_email_key" ON "jogador"("email");

-- AddForeignKey
ALTER TABLE "jogador" ADD CONSTRAINT "jogador_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habilidades" ADD CONSTRAINT "habilidades_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
