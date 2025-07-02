const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const mensagens = require('../../../utils/mensagens');

module.exports = async (msg, args, sock, jogador) => {
  const jid = msg.key.remoteJid;
  const itemNome = args.join(' ').toLowerCase();

  if (!itemNome) {
    return sock.sendMessage(jid, {
      text: '❌ Uso incorreto!\nExemplo: /inventario equipar espada de ferro',
      quoted: msg,
    });
  }

  const item = await prisma.item.findFirst({
    where: { nome: { equals: itemNome, mode: 'insensitive' } },
  });

  if (!item || item.tipo !== 'equipamento') {
    return sock.sendMessage(jid, {
      text: `❌ O item "${itemNome}" não é um equipamento válido.`,
      quoted: msg,
    });
  }

  const inv = await prisma.inventario.findFirst({
    where: { jogadorId: jogador.id, itemId: item.id },
  });

  if (!inv) {
    return sock.sendMessage(jid, {
      text: `❌ Você não tem o item "${item.nome}".`,
      quoted: msg,
    });
  }

  // Desequipa outros do mesmo tipo (se necessário - exemplo genérico)
  const equipados = await prisma.inventario.findMany({
    where: {
      jogadorId: jogador.id,
      equipado: true,
      item: { tipo: item.tipo }
    },
    include: { item: true }
  });

  for (const equipado of equipados) {
    await prisma.inventario.update({
      where: { id: equipado.id },
      data: { equipado: false }
    });
  }

  // Equipa o item
  await prisma.inventario.update({
    where: { id: inv.id },
    data: { equipado: true }
  });

  return sock.sendMessage(jid, {
    text: `🛡️ Você equipou "${item.nome}".`,
    quoted: msg,
  });
};
