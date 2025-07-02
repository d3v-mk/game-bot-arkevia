const { PrismaClient } = require('@prisma/client');
const mensagens = require('../../utils/mensagens');
const prisma = new PrismaClient();

module.exports = async (msg, args, sock) => {
  const jid = msg.key.remoteJid;

  if (jid.endsWith('@g.us')) {
    return await sock.sendMessage(jid, {
      text: mensagens.gerais.apenasPrivado,
      quoted: msg,
    });
  }

  const numero = jid.split('@')[0];

  const jogador = await prisma.jogador.findUnique({
    where: { numeroWpp: numero },
    include: {
      classe: true,
      localizacaoAtual: true,
      conquistasAtivas: {
        include: {
          conquista: true,
        },
      },
    },
  });

  if (!jogador) {
    return await sock.sendMessage(jid, {
      text: mensagens.gerais.precisaRegistrar,
      quoted: msg,
    });
  }

  await sock.sendMessage(jid, {
    text: mensagens.status.MensagemStatus(jogador),
    quoted: msg,
  });
};
