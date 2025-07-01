
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');

const mensagens = require('../../utils/mensagens');

const subcommands = {};

// Carrega subcomandos da pasta admin/subcommands/
const subcommandsPath = path.resolve(__dirname, 'subcommands');
fs.readdirSync(subcommandsPath).forEach(file => {
  if (file.endsWith('.js')) {
    const nome = file.replace('.js', '').toLowerCase();
    subcommands[nome] = require(path.join(subcommandsPath, file));
  }
});

module.exports = async (msg, args, sock) => {
  const jid = msg.key.remoteJid;
  const subcmd = args[0]?.toLowerCase();
  const numero = jid.split('@')[0];

  // Bloqueia uso em grupo
  if (jid.endsWith('@g.us')) {
    return sock.sendMessage(jid, {
      text: mensagens.gerais.apenasPrivado,
      quoted: msg,
    });
  }

  // Verifica jogador no banco
  const jogador = await prisma.jogador.findUnique({ where: { numeroWpp: numero } });
  if (!jogador) {
    return sock.sendMessage(jid, {
      text: mensagens.gerais.precisaRegistrar,
      quoted: msg,
    });
  }

  // Verifica se é admin
  if (!jogador.isAdmin) {
    return sock.sendMessage(jid, {
      text: mensagens.gerais.apenasAdmin,
      quoted: msg,
    });
  }

  // Executa subcomando
  if (subcommands[subcmd]) {
    return subcommands[subcmd](msg, args.slice(1), sock, jogador);
  }

  // Fallback: mensagem de ajuda/admin inválido
  const comandosDisponiveis = Object.keys(subcommands).map(cmd => `- ${cmd}`).join('\n');
  return sock.sendMessage(jid, {
    text: `🛠️ Comandos administrativos disponíveis:\n\n${comandosDisponiveis}`,
    quoted: msg,
  });

};
