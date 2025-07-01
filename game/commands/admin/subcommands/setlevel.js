const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const mensagens = require('../../../utils/mensagens');

module.exports = async (msg, args, sock, admin) => {
  const jid = msg.key.remoteJid;

  const nomeAlvo = args[0]?.toLowerCase();
  const novoLevel = parseInt(args[1]);

  if (!nomeAlvo || isNaN(novoLevel) || novoLevel < 1) {
    return sock.sendMessage(jid, {
      text: mensagens.admin.adminUsoIncorretoSetLevel,
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
    data: { level: novoLevel }
  });

  return sock.sendMessage(jid, {
    text: mensagens.admin.adminLevelJogadorAtualizado(jogador, novoLevel),
    quoted: msg,
  });
};
