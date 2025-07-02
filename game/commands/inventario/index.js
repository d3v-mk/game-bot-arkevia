const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');

const mensagens = require('../../utils/mensagens');

const subcommands = {};

// Carrega os subcomandos da pasta inventario/subcommands/
const subcommandsPath = path.resolve(__dirname, 'subcommands');
fs.readdirSync(subcommandsPath).forEach(file => {
  if (file.endsWith('.js')) {
    const nome = file.replace('.js', '').toLowerCase();
    subcommands[nome] = require(path.join(subcommandsPath, file));
  }
});

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
  const jogador = await prisma.jogador.findUnique({ where: { numeroWpp: numero } });

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

  // Buscar inventário do jogador com itens
  const inventario = await prisma.inventario.findMany({
    where: { jogadorId: jogador.id },
    include: { item: true }
  });

  if (inventario.length === 0) {
    return sock.sendMessage(jid, {
      text: mensagens.inventario.jogadorInventarioVazio,
      quoted: msg,
    });
  }

  // Separar itens por tipo
  const inventarioPorTipo = {
    consumivel: [],
    arma: [],
    equipamento: [],
  };

  inventario.forEach(({ item, quantidade }) => {
    const tipo = item.tipo.toLowerCase();

    if (inventarioPorTipo[tipo]) {
      inventarioPorTipo[tipo].push(`┕ ${item.nome} x${quantidade}`);
    }
  });

  // Transformar arrays em strings ou mensagem padrão caso vazio
  for (const tipo in inventarioPorTipo) {
    if (inventarioPorTipo[tipo].length === 0) {
      inventarioPorTipo[tipo] = '_Nenhum item_';
    } else {
      inventarioPorTipo[tipo] = inventarioPorTipo[tipo].join('\n');
    }
  }

  return sock.sendMessage(jid, {
    text: mensagens.inventario.verItensListaInventario(jogador, inventarioPorTipo),
    quoted: msg,
  });
};
