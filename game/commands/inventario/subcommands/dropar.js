const { PrismaClient } = require('@prisma/client');
const mensagens = require('../../../utils/mensagens');
const prisma = new PrismaClient();

module.exports = async (msg, args, sock, jogador) => {
  const jid = msg.key.remoteJid;

  if (args.length < 2) {
    return sock.sendMessage(jid, {
      text: mensagens.inventario.invDroparUsoIncorreto,
      quoted: msg,
    });
  }

  const qtd = parseInt(args[args.length - 1]);
  if (isNaN(qtd) || qtd <= 0) {
    return sock.sendMessage(jid, {
      text: mensagens.inventario.invDroparQtdInvalida,
      quoted: msg,
    });
  }

  // Pega o nome do item juntando tudo menos o último argumento (quantidade)
  const nomeItem = args.slice(0, -1).join(' ').toLowerCase();

  // Busca o item pelo nome (case insensitive)
  const item = await prisma.item.findFirst({
    where: {
      nome: { equals: nomeItem, mode: 'insensitive' }
    }
  });

  if (!item) {
    return sock.sendMessage(jid, {
      text: mensagens.inventario.invDroparItemNaoEncontrado(nomeItem),
      quoted: msg,
    });
  }

  // Busca o inventário do jogador para esse item pelo item.id
  const inventario = await prisma.inventario.findFirst({
    where: { jogadorId: jogador.id, itemId: item.id }
  });

  if (!inventario) {
    return sock.sendMessage(jid, {
      text: mensagens.inventario.invDroparJogadorSemItem(item),
      quoted: msg,
    });
  }

  if (inventario.quantidade < qtd) {
    return sock.sendMessage(jid, {
      text: mensagens.inventario.invDroparQtdInsuficiente(inventario),
      quoted: msg,
    });
  }

  // Remove ou decrementa quantidade
  if (inventario.quantidade === qtd) {
    await prisma.inventario.delete({
      where: { id: inventario.id }
    });
  } else {
    await prisma.inventario.update({
      where: { id: inventario.id },
      data: { quantidade: inventario.quantidade - qtd }
    });
  }

  return sock.sendMessage(jid, {
    text: mensagens.inventario.invDroparSucesso(qtd, item),
    quoted: msg,
  });
};
