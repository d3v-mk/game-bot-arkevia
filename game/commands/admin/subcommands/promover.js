const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (msg, args, sock, executor) => {
  const jid = msg.key.remoteJid;
  const nomeAlvo = args.join(' ').trim();

  if (!nomeAlvo) {
    return sock.sendMessage(jid, {
      text: '❌ Você precisa informar o nome do jogador para promover!\nEx: */admin promover murilo*',
      quoted: msg,
    });
  }

  // Busca o jogador pelo nome (case insensitive)
  const jogador = await prisma.jogador.findFirst({
    where: {
      nome: {
        equals: nomeAlvo,
        mode: 'insensitive',
      },
    },
  });

  if (!jogador) {
    return sock.sendMessage(jid, {
      text: `❌ Nenhum jogador chamado *${nomeAlvo}* foi encontrado.`,
      quoted: msg,
    });
  }

  if (jogador.isAdmin) {
    return sock.sendMessage(jid, {
      text: `⚠️ O jogador *${jogador.nome}* já é admin.`,
      quoted: msg,
    });
  }

  // Promove a admin
  await prisma.jogador.update({
    where: { id: jogador.id },
    data: { isAdmin: true },
  });

  // Busca a conquista seed "Admin de Arkevia"
  const conquistaBase = await prisma.conquista.findFirst({
    where: { nome: 'Admin de Arkevia' },
  });

  if (conquistaBase) {
    // Verifica se o jogador já tem a conquista (relacionamento na ConquistaDoJogador)
    const temConquista = await prisma.conquistaDoJogador.findFirst({
      where: {
        jogadorId: jogador.id,
        conquistaId: conquistaBase.id,
      },
    });

    if (!temConquista) {
      // Registra que o jogador ganhou a conquista
      await prisma.conquistaDoJogador.create({
        data: {
          jogadorId: jogador.id,
          conquistaId: conquistaBase.id,
        },
      });
    }

    // Verifica se a conquista está ativa para o jogador
    const ativa = await prisma.conquistaAtiva.findFirst({
      where: {
        jogadorId: jogador.id,
        conquistaId: conquistaBase.id,
      },
    });

    if (!ativa) {
      // Ativa a conquista para aparecer no status
      try {
        await prisma.conquistaAtiva.create({
          data: {
            jogadorId: jogador.id,
            conquistaId: conquistaBase.id,
          },
        });
      } catch (e) {
        if (e.code !== 'P2002') throw e; // ignora se já está ativa (único)
      }
    }
  }

  return sock.sendMessage(jid, {
    text: `✅ *${jogador.nome}* foi promovido a admin e recebeu a conquista 👑 *Admin de Arkevia*!`,
    quoted: msg,
  });
};
