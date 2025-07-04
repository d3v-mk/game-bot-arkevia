const prisma = require('@lib/prisma');
const mensagens = require('@utils/mensagens');

module.exports = async (msg, args, sock) => {
  const jid = msg.key.remoteJid;

  // Só funciona no privado
  if (jid.endsWith('@g.us')) {
    return await sock.sendMessage(jid, {
      text: mensagens.gerais.apenasPrivado,
      quoted: msg,
    });
  }

  const numero = jid.split('@')[0];

  // Verifica se jogador está registrado
  const jogador = await prisma.jogador.findUnique({
    where: { numeroWpp: numero },
  });

  if (!jogador) {
    return await sock.sendMessage(jid, {
      text: mensagens.gerais.precisaRegistrar,
      quoted: msg,
    });
  }

  // Envia a lista de comandos
  await sock.sendMessage(jid, {
    text: mensagens.help.menu(),
    quoted: msg,
  });
};
