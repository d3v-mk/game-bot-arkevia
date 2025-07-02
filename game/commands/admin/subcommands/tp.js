const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const mensagens = require('../../../utils/mensagens');

module.exports = async (msg, args, sock, admin) => {
  const jid = msg.key.remoteJid;

  const nomeAlvo = args[0]?.toLowerCase();
  const destino = args.slice(1).join(' ').toLowerCase();

  if (!nomeAlvo || !destino) {
    return sock.sendMessage(jid, {
      text: mensagens.admin.adminTpUsoIncorreto,
      quoted: msg,
    });
  }

  // Buscar jogador pelo nome
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

  // Verifica se o destino existe no banco
  const local = await prisma.mapa.findFirst({
    where: {
      nome: { equals: destino, mode: 'insensitive' }
    }
  });

  if (!local) {
    return sock.sendMessage(jid, {
      text: mensagens.admin.adminTpLocalNaoEncontado(destino),
      quoted: msg,
    });
  }

  // Atualiza localização do jogador
  await prisma.jogador.update({
    where: { id: jogador.id },
    data: {
      localizacaoAtualId: local.id,
      viajando: false
    }
  });


  return sock.sendMessage(jid, {
    text: mensagens.admin.adminTpJogadorTeleportado(jogador, local),
    quoted: msg,
  });
};
