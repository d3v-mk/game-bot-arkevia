const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const mensagens = require('../../../utils/mensagens');

module.exports = async (msg, args, sock, jogador) => {
  const jid = msg.key.remoteJid;
  const itemNome = args.join(' ').toLowerCase();

  if (!itemNome) {
    return sock.sendMessage(jid, {
      text: '❌ Uso incorreto!\nExemplo: /inventario usar pote de vida',
      quoted: msg,
    });
  }

  const item = await prisma.item.findFirst({
    where: { nome: { equals: itemNome, mode: 'insensitive' } },
  });

  if (!item || item.tipo !== 'consumivel') {
    return sock.sendMessage(jid, {
      text: `❌ O item "${itemNome}" não existe ou não é um item usável.`,
      quoted: msg,
    });
  }

  const inv = await prisma.inventario.findFirst({
    where: { jogadorId: jogador.id, itemId: item.id },
  });

  if (!inv || inv.quantidade <= 0) {
    return sock.sendMessage(jid, {
      text: `❌ Você não tem o item "${item.nome}" no inventário.`,
      quoted: msg,
    });
  }

  // Aplica efeitos (curar HP, restaurar mana, etc)
  let efeitoTexto = '';

  // Faz parse da string de efeitos (caso esteja salva como JSON no banco)
  let efeitos = {};
  try {
    efeitos = typeof item.efeitos === 'string' ? JSON.parse(item.efeitos) : item.efeitos;
  } catch (e) {
    efeitos = {};
  }

  if (efeitos.recuperarHp) {
    const cura = efeitos.recuperarHp;
    const novoHP = Math.min(jogador.hpAtual + cura, jogador.hpMaximo);

    await prisma.jogador.update({
      where: { id: jogador.id },
      data: { hpAtual: novoHP }
    });

    efeitoTexto += `🩸 Você recuperou ${cura} de HP! Agora está com ${novoHP}/${jogador.hpMaximo}.\n`;
  }

  // Adicione outros efeitos aqui se quiser: efeitos.recuperarMana, efeitos.buff, etc

  // Atualiza inventário
  if (inv.quantidade === 1) {
    await prisma.inventario.delete({ where: { id: inv.id } });
  } else {
    await prisma.inventario.update({
      where: { id: inv.id },
      data: { quantidade: inv.quantidade - 1 }
    });
  }

  return sock.sendMessage(jid, {
    text: `✅ Você usou o item "${item.nome}".\n${efeitoTexto || 'Nenhum efeito aplicado.'}`,
    quoted: msg,
  });
};
