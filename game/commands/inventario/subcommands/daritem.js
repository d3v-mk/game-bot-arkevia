const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const mensagens = require('../../../utils/mensagens');

module.exports = async (msg, args, sock, jogador) => {
  const jid = msg.key.remoteJid;

  const nomeAlvo = args[0]?.toLowerCase();
  const nomeItem = args.slice(1, -1).join(' ').toLowerCase();
  const quantidade = parseInt(args[args.length - 1]);

  if (!nomeAlvo || !nomeItem || isNaN(quantidade) || quantidade <= 0) {
    return sock.sendMessage(jid, {
      text: mensagens.inventario.invDarItemUsoIncorreto,
      quoted: msg,
    });
  }

  // Jogador destinatário
  const destinatario = await prisma.jogador.findFirst({
    where: { nome: { equals: nomeAlvo, mode: 'insensitive' } }
  });

  if (!destinatario) {
    return sock.sendMessage(jid, {
      text: mensagens.gerais.jogadorNaoEncontrado(nomeAlvo),
      quoted: msg,
    });
  }

  // Verifica se estão no mesmo local
  if (destinatario.localizacaoAtualId !== jogador.localizacaoAtualId) {
    return sock.sendMessage(jid, {
      text: mensagens.inventario.invDarItemJogadorNaoEstaNoMesmoLocal(destinatario),
      quoted: msg,
    });
  }

  // Verifica se o item existe no inventário do jogador
  const item = await prisma.item.findFirst({
    where: { nome: { equals: nomeItem, mode: 'insensitive' } }
  });

  if (!item) {
    return sock.sendMessage(jid, {
      text: mensagens.inventario.invDarItemNaoEncontrado(nomeItem),
      quoted: msg,
    });
  }

  const inventarioOrigem = await prisma.inventario.findFirst({
    where: { jogadorId: jogador.id, itemId: item.id }
  });

  if (!inventarioOrigem || inventarioOrigem.quantidade < quantidade) {
    return sock.sendMessage(jid, {
      text: mensagens.inventario.invDarItemQtdInsuficiente(item),
      quoted: msg,
    });
  }

  // Remove do jogador origem
  if (inventarioOrigem.quantidade === quantidade) {
    await prisma.inventario.delete({ where: { id: inventarioOrigem.id } });
  } else {
    await prisma.inventario.update({
      where: { id: inventarioOrigem.id },
      data: { quantidade: { decrement: quantidade } }
    });
  }

  // Adiciona ao jogador destino
  const inventarioDestino = await prisma.inventario.findFirst({
    where: { jogadorId: destinatario.id, itemId: item.id }
  });

  if (inventarioDestino) {
    await prisma.inventario.update({
      where: { id: inventarioDestino.id },
      data: { quantidade: { increment: quantidade } }
    });
  } else {
    await prisma.inventario.create({
      data: {
        jogadorId: destinatario.id,
        itemId: item.id,
        quantidade
      }
    });
  }

  return sock.sendMessage(jid, {
    text: mensagens.inventario.invDarItemSucesso(quantidade, item, destinatario),
    quoted: msg,
  });
};
