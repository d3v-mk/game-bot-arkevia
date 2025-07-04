/**
 * 🗺️ Comando principal do mapa (/mapa)
 *
 * Gera o mapa global com a posição atual do jogador marcada com um ponto vermelho.
 * 
 * - Impede uso em grupos
 * - Verifica se o jogador está registrado
 * - Usa a coordenada da localizacaoAtual para desenhar no mapa
 * - Envia a imagem com o ponto marcado (100% em memória, formato JPEG)
 */

const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const prisma = require('@lib/prisma');
const mensagens = require('@utils/mensagens');

let imagemBaseCache = null;

async function gerarMapaComPonto(coordenada) {
  if (!imagemBaseCache) {
    const mapaPath = path.resolve(__dirname, '../../imgs/mapa/mapa_global.png');
    imagemBaseCache = await loadImage(mapaPath);
  }

  const canvas = createCanvas(imagemBaseCache.width, imagemBaseCache.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(imagemBaseCache, 0, 0);

  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(coordenada.x, coordenada.y, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  return canvas.toBuffer('image/jpeg', { quality: 0.85 });
}

// Exporta como handler principal do comando
module.exports = async (msg, args, sock) => {
  const jid = msg.key.remoteJid;

  if (jid.endsWith('@g.us')) {
    return sock.sendMessage(jid, {
      text: mensagens.gerais.apenasPrivado,
      quoted: msg,
    });
  }

  const numero = jid.split('@')[0];
  const jogador = await prisma.jogador.findUnique({
    where: { numeroWpp: numero },
    include: { localizacaoAtual: true },
  });

  if (!jogador) {
    return sock.sendMessage(jid, {
      text: mensagens.gerais.precisaRegistrar,
      quoted: msg,
    });
  }

  const local = jogador.localizacaoAtual;

  if (!local || !local.coordenada) {
    return sock.sendMessage(jid, {
      text: '📍 Não foi possível localizar sua posição no mapa!',
      quoted: msg,
    });
  }

  const buffer = await gerarMapaComPonto(local.coordenada);

  await sock.sendPresenceUpdate('composing', jid);

  return sock.sendMessage(jid, {
    image: {
      buffer,
      mimetype: 'image/jpeg',
    },
    caption: `🗺️ Você está em: *${local.nome}*\n\n${local.descricao || 'Sem descrição.'}`,
  });
};

// Exporta também pra uso externo (debug, testes, script etc)
module.exports.gerarMapaComPonto = gerarMapaComPonto;
