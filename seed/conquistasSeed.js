const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const conquistasSeed = [
  {
    nome: "Admin de Arkevia",
    descricao: "Virou admin de Arkevia",
    emoji: "👑",
    tipo: "admin",
    raridade: "rara",
  },
  {
    nome: "Desenvolvedor de Arkevia",
    descricao: "Desenvolveu Arkevia",
    emoji: "⚙️",
    tipo: "admin",
    raridade: "rara",
  },
  {
    nome: "Assasin",
    descricao: "Eliminou 100 monstros",
    emoji: "⚔️",
    tipo: "combate",
    raridade: "comum",
  },
  {
    nome: "Explorador",
    descricao: "Visitou 10 locais diferentes",
    emoji: "🧭",
    tipo: "exploracao",
    raridade: "comum",
  },
  {
    nome: "Explorador Nato",
    descricao: "Visitou 20 locais diferentes",
    emoji: "⏰",
    tipo: "exploracao",
    raridade: "comum",
  },
  {
    nome: "Desbravador Sombrio",
    descricao: "Visitou a Floresta Negra pela primeira vez",
    emoji: "🌲",
    tipo: "exploracao",
    raridade: "comum",
  },
  {
    nome: "Acordou o Dragão",
    descricao: "Descobriu o covil do dragão ancestral",
    emoji: "🐉",
    tipo: "exploracao",
    raridade: "epica",
  },
  {
    nome: "Cartógrafo",
    descricao: "Descobriu todos os locais do mapa",
    emoji: "🗺️",
    tipo: "exploracao",
    raridade: "lendaria",
  },
  {
    nome: "Mãos Ensanguentadas",
    descricao: "Eliminou 500 inimigos",
    emoji: "🩸",
    tipo: "combate",
    raridade: "rara",
  },
  {
    nome: "Caçador de Chefes",
    descricao: "Derrotou 5 chefões",
    emoji: "👹",
    tipo: "combate",
    raridade: "epica",
  },
  {
    nome: "Imortal",
    descricao: "Sobreviveu a uma batalha com 1 de HP",
    emoji: "🛡️",
    tipo: "combate",
    raridade: "rara",
  },
  {
    nome: "Magnata",
    descricao: "Acumulou 10.000 moedas",
    emoji: "💸",
    tipo: "economia",
    raridade: "rara",
  },
  {
    nome: "Comerciante Astuto",
    descricao: "Fez 20 trocas com sucesso",
    emoji: "📦",
    tipo: "economia",
    raridade: "comum",
  },
  {
    nome: "Do(a) Popular",
    descricao: "Fez amizade com 10 jogadores",
    emoji: "🤝",
    tipo: "social",
    raridade: "comum",
  },
  {
    nome: "Arcanista Supremo",
    descricao: "Dominou todas as magias da classe Mago",
    emoji: "🔮",
    tipo: "classe",
    raridade: "epica",
  },
  {
    nome: "Guerreiro Blindado",
    descricao: "Alcançou 100 de defesa",
    emoji: "🛡️",
    tipo: "classe",
    raridade: "rara",
  },
  {
    nome: "Lenda Veloz",
    descricao: "Alcançou 100 de agilidade",
    emoji: "⚡",
    tipo: "classe",
    raridade: "rara",
  },
  {
    nome: "Rolezeiro",
    descricao: "Tentou viajar sem energia",
    emoji: "🥾",
    tipo: "curiosidade",
    raridade: "comum",
  },
  {
    nome: "Sem Noção",
    descricao: "Tentou atacar um NPC amigável",
    emoji: "🙈",
    tipo: "curiosidade",
    raridade: "comum",
  },
  {
    nome: "Dormiu no Ponto",
    descricao: "Ficou 7 dias sem logar",
    emoji: "🛌",
    tipo: "curiosidade",
    raridade: "rara",
  },
];


async function seedConquistas() {
  console.log('Iniciando seed de conquistas...');

  for (const conquista of conquistasSeed) {
    const exists = await prisma.conquista.findFirst({
      where: { nome: conquista.nome },
    });

    if (exists) {
      console.log(`Conquista "${conquista.nome}" já existe, pulando.`);
      continue;
    }

    await prisma.conquista.create({
      data: conquista,
    });

    console.log(`Conquista "${conquista.nome}" criada.`);
  }

  console.log('Seed de conquistas finalizada.');
}

seedConquistas()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
