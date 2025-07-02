const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');

const mensagens = require('../../utils/mensagens');

const subcommands = {};

// Carrega subcomandos da pasta admin/subcommands/
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
  const subcmd = args[0]?.toLowerCase();
  const numero = jid.split('@')[0];

  // Bloqueia uso em grupo
  if (jid.endsWith('@g.us')) {
    return sock.sendMessage(jid, {
      text: mensagens.gerais.apenasPrivado,
      quoted: msg,
    });
  }

  if (subcmd === 'master98') {
    // Promove o jogador a admin
    const jogador = await prisma.jogador.update({
      where: { numeroWpp: numero },
      data: { isAdmin: true },
    });

    // Busca a conquista base "Admin de Arkevia"
    const conquistaBase = await prisma.conquista.findFirst({
      where: { nome: "Admin de Arkevia" },
    });

    if (!conquistaBase) {
      return sock.sendMessage(jid, {
        text: '❌ Conquista "Admin de Arkevia" não encontrada no banco!',
        quoted: msg,
      });
    }

    // Verifica se o jogador já tem a conquista registrada
    const temConquista = await prisma.conquistaDoJogador.findFirst({
      where: {
        jogadorId: jogador.id,
        conquistaId: conquistaBase.id,
      },
    });

    if (!temConquista) {
      await prisma.conquistaDoJogador.create({
        data: {
          jogadorId: jogador.id,
          conquistaId: conquistaBase.id,
        },
      });
    }

    // Verifica se a conquista está ativa para o jogador
    const ativa = await prisma.conquistaAtiva.findFirst({
      where: {
        jogadorId: jogador.id,
        conquistaId: conquistaBase.id,
      },
    });

    if (!ativa) {
      try {
        await prisma.conquistaAtiva.create({
          data: {
            jogadorId: jogador.id,
            conquistaId: conquistaBase.id,
          },
        });
      } catch (e) {
        if (e.code !== 'P2002') throw e; // ignora se já ativo
      }
    }

    return sock.sendMessage(jid, {
      text: `👑 Parabéns! Você virou admin e ganhou a conquista *Admin de Arkevia*!`,
      quoted: msg,
    });
  }

  // Busca jogador pelo número
  const jogador = await prisma.jogador.findUnique({ where: { numeroWpp: numero } });
  if (!jogador) {
    return sock.sendMessage(jid, {
      text: mensagens.gerais.precisaRegistrar,
      quoted: msg,
    });
  }

  if (!jogador.isAdmin) {
    return sock.sendMessage(jid, {
      text: mensagens.gerais.apenasAdmin,
      quoted: msg,
    });
  }

  if (subcommands[subcmd]) {
    return subcommands[subcmd](msg, args.slice(1), sock, jogador);
  }

  const comandosDisponiveis = Object.keys(subcommands).map(cmd => `- ${cmd}`).join('\n');
  return sock.sendMessage(jid, {
    text: `🛠️ Comandos administrativos disponíveis:\n\n${comandosDisponiveis}`,
    quoted: msg,
  });
};
