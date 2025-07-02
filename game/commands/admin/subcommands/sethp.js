const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const mensagens = require('../../../utils/mensagens');

module.exports = async (msg, args, sock, admin) => {
  const jid = msg.key.remoteJid;

  const nomeAlvo = args[0]?.toLowerCase();
  const novoHP = parseInt(args[1]);

  if (!nomeAlvo || isNaN(novoHP) || novoHP < 0) {
    return sock.sendMessage(jid, {
      text: '❌ Uso incorreto!\nExemplo: /admin sethp mk 200',
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
      text: `❌ Nenhum jogador encontrado com o nome "${nomeAlvo}".`,
      quoted: msg,
    });
  }

  await prisma.jogador.update({
    where: { id: jogador.id },
    data: { hpAtual: novoHP }
  });

  return sock.sendMessage(jid, {
    text: `❤️ HP de ${jogador.nome} atualizado para ${novoHP}.`,
    quoted: msg,
  });
};
