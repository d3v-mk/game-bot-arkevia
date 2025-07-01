require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { loadAllMapas } = require('./utils/loadAllMapas');

async function seedMapa() {
  const mapas = loadAllMapas();

  for (const mapa of mapas) {
    await prisma.mapa.upsert({
      where: { id: mapa.id },
      update: {},
      create: mapa,
    });
  }
  console.log('🌍 Mapas inseridos no banco com sucesso!');
}

seedMapa()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
