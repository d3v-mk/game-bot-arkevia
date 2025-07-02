const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');

const mensagens = require('../../utils/mensagens');

const subcommands = {};

// Carrega os subcomandos da pasta conquistas/subcommands/
const subcommandsPath = path.resolve(__dirname, 'subcommands');
if (fs.existsSync(subcommandsPath)) {
  fs.readdirSync(subcommandsPath).forEach(file => {
    if (file.endsWith('.js')) {
      const nome = file.replace('.js', '').toLowerCase();
      subcommands[nome] = require(path.join(subcommandsPath, file));
    }
  });
}

module.exports = async (msg, args, sock) => {
  const jid = msg.key.remoteJid;

  // Bloqueia uso em grupo
  if (jid.endsWith('@g.us')) {
    return await sock.sendMessage(jid, {
      text: mensagens.gerais.apenasPrivado,
      quoted: msg,
    });
  }

  const numero = jid.split('@')[0];
  const jogador = await prisma.jogador.findUnique({
    where: { numeroWpp: numero },
  });

  if (!jogador) {
    return await sock.sendMessage(jid, {
      text: mensagens.gerais.precisaRegistrar,
      quoted: msg,
    });
  }

  const subcmd = args[0]?.toLowerCase();
  if (subcommands[subcmd]) {
    return subcommands[subcmd](msg, args.slice(1), sock, jogador);
  }

  // Buscar conquistas ativas do jogador
  const conquistasAtivas = await prisma.conquistaAtiva.findMany({
    where: { jogadorId: jogador.id },
    include: { conquista: true },
    orderBy: { ativadaEm: 'desc' },
  });

  if (conquistasAtivas.length === 0) {
    return sock.sendMessage(jid, {
      text: `😢 Você ainda não conquistou nada em Arkevia...\n\n*Derrote inimigos, explore mapas e evolua para desbloquear conquistas!*`,
      quoted: msg,
    });
  }

  // Montar mensagem com as conquistas
  let mensagem = `🏆 *Suas Conquistas em Arkevia:*\n\n`;

  conquistasAtivas.forEach(({ conquista }) => {
    const emoji = conquista.emoji ? `${conquista.emoji} ` : '';
    const raridade = conquista.raridade ? `_${conquista.raridade}_` : '';
    mensagem += `${emoji}*${conquista.nome}*\n${conquista.descricao}\n${raridade}\n\n`;
  });

  return sock.sendMessage(jid, {
    text: mensagem.trim(),
    quoted: msg,
  });
};
