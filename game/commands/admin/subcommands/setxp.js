const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const mensagens = require('../../../utils/mensagens');

module.exports = async (msg, args, sock, admin) => {
  const jid = msg.key.remoteJid;

  const nomeAlvo = args[0]?.toLowerCase();
  const novoXp = parseInt(args[1]);

  if (!nomeAlvo || isNaN(novoXp)) {
    return sock.sendMessage(jid, {
      text: mensagens.admin.adminUsoIncorretoSetXp,
      quoted: msg,
    });
  }

  const jogador = await prisma.jogador.findFirst({
    where: {
      nome: { equals: nomeAlvo, mode: 'insensitive' }
    }
  });

  if (!jogador) {
    return sock.sendMessage(jid, {
      text: mensagens.gerais.jogadorNaoEncontrado(nomeAlvo),
      quoted: msg,
    });
  }

  await prisma.jogador.update({
    where: { id: jogador.id },
    data: { xp: novoXp }
  });

  return sock.sendMessage(jid, {
    text: mensagens.admin.adminXpJogadorAtualizado(jogador, novoXp),
    quoted: msg,
  });
};
