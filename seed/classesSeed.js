// import usando require padrão CommonJS
const { habilidades_guerreiro } = require('./data/habilidades/guerreiro.js');
const { habilidades_mago } = require('./data/habilidades/mago.js');
const { habilidades_arqueiro } = require('./data/habilidades/arqueiro.js');
const { habilidades_paladino } = require('./data/habilidades/paladino.js');
const { habilidades_ladino } = require('./data/habilidades/ladino.js');
const { habilidades_necromante } = require('./data/habilidades/necromante.js');
const { habilidades_monge } = require('./data/habilidades/monge.js');
const { habilidades_druida } = require('./data/habilidades/druida.js');
const { habilidades_cavaleiro } = require('./data/habilidades/cavaleiro.js');
const { habilidades_elementista } = require('./data/habilidades/elementista.js');

const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

const classes = [
  {
    id: 'guerreiro',
    nome: 'Guerreiro',
    descricao: 'Especialista em combate corpo a corpo com força bruta.',
    habilidades: habilidades_guerreiro,
  },
  {
    id: 'mago',
    nome: 'Mago',
    descricao: 'Manipulador de energias arcanas, especialista em dano mágico.',
    habilidades: habilidades_mago,
  },
  {
    id: 'arqueiro',
    nome: 'Arqueiro',
    descricao: 'Especialista em ataques à distância e precisão mortal.',
    habilidades: habilidades_arqueiro,
  },
  {
    id: 'paladino',
    nome: 'Paladino',
    descricao: 'Guerreiro sagrado, equilíbrio entre ataque e cura.',
    habilidades: habilidades_paladino,
  },
  {
    id: 'ladino',
    nome: 'Ladino',
    descricao: 'Mestre da furtividade, velocidade e dano crítico.',
    habilidades: habilidades_ladino
  },
  {
    id: 'necromante',
    nome: 'Necromante',
    descricao: 'Controlador de mortos-vivos e magia sombria.',
    habilidades: habilidades_necromante,
  },
  {
    id: 'monge',
    nome: 'Monge',
    descricao: 'Lutador disciplinado que usa o corpo como arma.',
    habilidades: habilidades_monge,

  },
  {
    id: 'druida',
    nome: 'Druida',
    descricao: 'Guardião da natureza, domina magias de cura e veneno.',
    habilidades: habilidades_druida,
  },
  {
    id: 'cavaleiro',
    nome: 'Cavaleiro',
    descricao: 'Protetor com armadura pesada e lealdade inabalável.',
    habilidades: habilidades_cavaleiro,
  },
  {
    id: 'elementalista',
    nome: 'Elementalista',
    descricao: 'Dobrador dos elementos: fogo, gelo, raio e terra.',
    habilidades: habilidades_elementista
  },
];


async function main() {
  for (const classe of classes) {
    await prisma.classes.upsert({
      where: { id: classe.id },
      update: {},
      create: {
        id: classe.id,
        nome: classe.nome,
        descricao: classe.descricao,
        habilidades: {
          create: classe.habilidades.map(h => ({
            id: h.id,
            nome: h.nome,
            descricao: h.descricao,
            xpRequerido: h.xpRequerido,
            custoEnergia: h.custoEnergia,
          })),
        },
      },
    });
    console.log(`🌟 Classe ${classe.nome} seedada!`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅ Seed das classes finalizado.');
  })
  .catch(async (e) => {
    console.error('❌ Erro na seed das classes:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
