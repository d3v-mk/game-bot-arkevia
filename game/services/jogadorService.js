/**
 *
 * 🧍 Serviço responsável por lidar com os dados do jogador no banco.
 * Utiliza o Prisma para interagir com a tabela `jogador`.
 *
 * 🔎 Funções:
 *
 * - getJogadorPorJid(jid):
 *   🔹 Extrai o número do WhatsApp (antes do "@").
 *   🔹 Busca o jogador pelo número e inclui sua localização atual.
 *   🔸 Ideal para identificar o jogador a partir da mensagem recebida.
 *
 * - iniciarViagem(jogadorId):
 *   🧳 Marca o jogador como "viajando" (`viajando: true`).
 *   🔸 Usado logo após o início de uma viagem.
 *
 * - finalizarViagem(jogadorId):
 *   🏁 Marca o jogador como "parado" (`viajando: false`).
 *   🔸 Usado quando o jogador chega no destino e o tempo de viagem termina.
 *
 * - atualizarLocalizacaoEenergia(jogadorId, destinoId, novaEnergia):
 *   📍 Atualiza o local atual do jogador e sua energia.
 *   🔸 Usado no fim da viagem ou após algum evento que altere a energia e posição.
 *
 * ✅ Resultado:
 * - Serviço que centraliza operações críticas sobre o jogador.
 * - Deixa o código mais limpo, testável e desacoplado da lógica de banco direto.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getJogadorPorJid(jid) {
  const numero = jid.split('@')[0];
  return await prisma.jogador.findUnique({
    where: { numeroWpp: numero },
    include: { localizacaoAtual: true },
  });
}

async function iniciarViagem(jogadorId) {
  await prisma.jogador.update({ where: { id: jogadorId }, data: { viajando: true } });
}

async function finalizarViagem(jogadorId) {
  await prisma.jogador.update({ where: { id: jogadorId }, data: { viajando: false } });
}

async function atualizarLocalizacaoEenergia(jogadorId, destinoId, novaEnergia) {
  await prisma.jogador.update({
    where: { id: jogadorId },
    data: { localizacaoAtualId: destinoId, energia: novaEnergia },
  });
}

module.exports = {
  getJogadorPorJid,
  iniciarViagem,
  finalizarViagem,
  atualizarLocalizacaoEenergia,
};
