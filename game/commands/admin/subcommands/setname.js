const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mensagens = require('../../../utils/mensagens')

module.exports = async (msg, args, sock, admin) => {
  const jid = msg.key.remoteJid;

  const nomeAlvo = args[0]?.toLowerCase();
  const novoNome = args[1];

  if (!nomeAlvo || !novoNome) {
    return sock.sendMessage(jid, {
      text: mensagens.admin.adminUsoIncorretoSetName,
      quoted: msg,
    });
  }

  if (novoNome.length < 6 || novoNome.length > 10) {
    return sock.sendMessage(jid, {
      text: mensagens.admin.adminSetNameCaracteresIncorretos,
      quoted: msg,
    });
  }

  // Checar se já existe jogador com o novo nome
  const existente = await prisma.jogador.findFirst({
    where: {
      nome: { equals: novoNome, mode: 'insensitive' }
    }
  });

  if (existente) {
    return sock.sendMessage(jid, {
      text: mensagens.admin.adminSetNameExistente(novoNome),
      quoted: msg,
    });
  }

  // Buscar o jogador com nome alvo
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

  // Atualizar nome
  await prisma.jogador.update({
    where: { id: jogador.id },
    data: { nome: novoNome }
  });

  return sock.sendMessage(jid, {
    text: mensagens.admin.adminSetNameAtualizado(nomeAlvo, novoNome),
    quoted: msg,
  });
};
