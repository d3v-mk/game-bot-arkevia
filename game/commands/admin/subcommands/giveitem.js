const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const mensagens = require('../../../utils/mensagens');

module.exports = async (msg, args, sock, admin) => {
  const jid = msg.key.remoteJid;

  const nomeAlvo = args[0]?.toLowerCase();
  const quantidade = parseInt(args[args.length - 1]);
  const itemInput = args.slice(1, -1).join(' ').toLowerCase(); // junta tudo entre nome e qtd

  if (!nomeAlvo || !itemInput || isNaN(quantidade) || quantidade <= 0) {
    return sock.sendMessage(jid, {
      text: '❌ Uso incorreto!\nExemplo: /admin giveitem [jogador] [item] [qtd]',
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

  const item = await prisma.item.findFirst({
    where: {
      OR: [
        { id: itemInput },
        { nome: { equals: itemInput, mode: 'insensitive' } }
      ]
    }
  });

  if (!item) {
    return sock.sendMessage(jid, {
      text: `❌ Item "${itemInput}" não encontrado.`,
      quoted: msg,
    });
  }

  const inventarioExistente = await prisma.inventario.findFirst({
    where: {
      jogadorId: jogador.id,
      itemId: item.id
    }
  });

  if (inventarioExistente) {
    await prisma.inventario.update({
      where: { id: inventarioExistente.id },
      data: {
        quantidade: {
          increment: quantidade
        }
      }
    });
  } else {
    await prisma.inventario.create({
      data: {
        jogadorId: jogador.id,
        itemId: item.id,
        quantidade: quantidade
      }
    });
  }

  return sock.sendMessage(jid, {
    text: `✅ Item "${item.nome}" x${quantidade} adicionado para ${jogador.nome}.`,
    quoted: msg,
  });
};
