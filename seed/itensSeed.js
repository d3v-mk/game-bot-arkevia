const path = require('path');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
dotenv.config();

const prisma = new PrismaClient();
const loadItensFromDir = require('./utils/loadAllItens.js');

const itens = loadItensFromDir(path.join(__dirname, 'data/itens'));

async function main() {
  for (const item of itens) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        nome: item.nome,
        tipo: item.tipo,
        descricao: item.descricao,
        raridade: item.raridade,
        atributos: item.atributos,
        efeitos: item.efeitos || {},
      },
    });
    console.log(`🧱 Item ${item.nome} seedado!`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅ Seed dos itens finalizado.');
  })
  .catch(async (e) => {
    console.error('❌ Erro na seed dos itens:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
