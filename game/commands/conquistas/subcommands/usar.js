const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (msg, args, sock, jogador) => {
  const jid = msg.key.remoteJid;
  const nomeBusca = args.join(' ').trim().toLowerCase();

  if (!nomeBusca) {
    return sock.sendMessage(jid, {
      text: `❌ Você precisa informar o nome da conquista que quer usar!\nEx: */conquistas usar Admin de Arkevia*`,
      quoted: msg,
    });
  }

  // Busca se o jogador tem essa conquista
  const conquistaDoJogador = await prisma.conquistaDoJogador.findFirst({
    where: {
      jogadorId: jogador.id,
      conquista: {
        nome: {
          contains: nomeBusca,
          mode: 'insensitive',
        },
      },
    },
    include: { conquista: true },
  });

  if (!conquistaDoJogador) {
    return sock.sendMessage(jid, {
      text: `😕 Você não possui uma conquista chamada "*${nomeBusca}*"`,
      quoted: msg,
    });
  }

  const conquista = conquistaDoJogador.conquista;

  // Verifica se já está ativa
  const jaAtiva = await prisma.conquistaAtiva.findFirst({
    where: {
      jogadorId: jogador.id,
      conquistaId: conquista.id,
      emUso: true,
    },
  });

  if (jaAtiva) {
    return sock.sendMessage(jid, {
      text: `✅ A conquista *${conquista.nome}* já está ativa no seu perfil.`,
      quoted: msg,
    });
  }

  // Busca conquistas ativas (emUso = true) do jogador
  const conquistasAtivasEmUso = await prisma.conquistaAtiva.findMany({
    where: {
      jogadorId: jogador.id,
      emUso: true,
    },
    orderBy: {
      ativadaEm: 'asc',
    },
  });

  // Se já tiver 3 ativadas, desativa a mais antiga
  if (conquistasAtivasEmUso.length >= 3) {
    await prisma.conquistaAtiva.update({
      where: { id: conquistasAtivasEmUso[0].id },
      data: { emUso: false },
    });
  }

  // Tenta achar registro da conquista ativa mesmo que desativada
  let conquistaAtiva = await prisma.conquistaAtiva.findFirst({
    where: {
      jogadorId: jogador.id,
      conquistaId: conquista.id,
    },
  });

  if (conquistaAtiva) {
    // Atualiza pra emUso = true e nova data de ativação
    await prisma.conquistaAtiva.update({
      where: { id: conquistaAtiva.id },
      data: { emUso: true, ativadaEm: new Date() },
    });
  } else {
    // Cria novo registro ativando a conquista
    await prisma.conquistaAtiva.create({
      data: {
        jogadorId: jogador.id,
        conquistaId: conquista.id,
        emUso: true,
        ativadaEm: new Date(),
      },
    });
  }

  return sock.sendMessage(jid, {
    text: `🏅 Conquista *${conquista.nome}* ${conquista.emoji || ''} agora está ativa no seu perfil!`,
    quoted: msg,
  });
};
