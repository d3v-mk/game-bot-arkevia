/**
 * 🛒 Comando principal da loja (/loja)
 * 
 * Este módulo gerencia o acesso ao sistema de loja do jogo. Ao ser executado:
 * 
 * - Impede o uso em grupos (apenas no privado)
 * - Verifica se o jogador já está registrado (via número do WhatsApp)
 * - Se o jogador existir:
 *    - Caso tenha um subcomando válido (`/loja armas`, `/loja consumiveis` etc),
 *      redireciona para o módulo correspondente da pasta `subcommands/`
 *    - Caso contrário, exibe o menu principal da loja com informações do jogador
 * 
 * A imagem e a mensagem do mercador são exibidas de forma dinâmica.
 * 
 * subcommands são carregados automaticamente de `./subcommands/*.js`.
 * 
 * Exemplo de uso:
 *  - `/loja` → mostra o menu da loja
 *  - `/loja consumiveis` → executa `subcommands/consumiveis.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');

const mensagens = require('../../utils/mensagens');

const subcommands = {};

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

  if (subcommands[subcmd]) {
    return subcommands[subcmd](msg, args.slice(1), sock);
  }

  const falaAleatoria = mensagens.loja.falasMercador[Math.floor(Math.random() * mensagens.loja.falasMercador.length)];
  const caption = mensagens.loja.gerarCaptionLoja(jogador);

  await sock.sendPresenceUpdate('composing', jid);
  await new Promise(r => setTimeout(r, 1000));
  await sock.sendMessage(jid, { text: falaAleatoria });
  await new Promise(r => setTimeout(r, 1200));
  return sock.sendMessage(jid, {
    image: { url: 'game/imgs/store/store.jpg' },
    caption
  });
};
