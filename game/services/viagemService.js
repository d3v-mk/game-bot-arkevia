/**
 *
 * ✈️ Serviço que cuida da lógica de viagem dos jogadores.
 * Usa os services de `destino` e `jogador` para calcular rotas,
 * custos de energia e realizar a movimentação no mapa.
 *
 * 🔧 Funções:
 *
 * - calcularCustoEnergia(jogador, destino):
 *   📐 Calcula o custo da viagem com base na distância entre
 *   a localização atual do jogador e o destino.
 *   🔹 Usa um multiplicador para ajustar o custo final.
 *   🔹 Tem limites mínimo (5) e máximo (100).
 *   🔸 Caso não tenha coordenadas, retorna custo fixo (20).
 *
 * - executarViagem(jid, destinoId):
 *   🧭 Responsável por executar a viagem de fato.
 *   1. Busca o jogador pelo JID.
 *   2. Busca o destino pelo ID.
 *   3. Calcula custo de energia.
 *   4. Verifica se o jogador tem energia suficiente.
 *   5. Atualiza a localização e energia do jogador.
 *   🔹 Retorna sucesso ou erro com detalhes.
 *
 * ✅ Esse módulo encapsula toda a lógica de movimentação de players pelo mapa,
 * deixando os comandos mais limpos e o código mais modular.
 */

const { buscarDestinoPorId, calcularDistancia } = require('./destinoService');
const {
  getJogadorPorJid,
  atualizarLocalizacaoEenergia,
  iniciarViagem,
  finalizarViagem,
} = require('./jogadorService');

/**
 * Retorna o custo de energia com base na distância entre localizações.
 */
function calcularCustoEnergia(jogador, destino) {
  if (!jogador.localizacaoAtual || !jogador.localizacaoAtual.coordenada) return 20;

  const pAtual = {
    x: jogador.localizacaoAtual.coordenada.x ?? 0,
    y: jogador.localizacaoAtual.coordenada.y ?? 0,
  };
  const pDestino = {
    x: destino.coordenada?.x ?? 0,
    y: destino.coordenada?.y ?? 0,
  };

  const distancia = calcularDistancia(pAtual, pDestino);
  const custoBase = 5;   // mínimo
  const custoMax = 100;   // máximo
  const multiplicador = 3; // ajuste pra menos ou mais

  const custo = Math.ceil(distancia * multiplicador);
  return Math.min(Math.max(custo, custoBase), custoMax);
}


async function executarViagem(jid, destinoId) {
  const jogador = await getJogadorPorJid(jid);
  if (!jogador) {
    return { sucesso: false, erro: 'JOGADOR_NAO_ENCONTRADO' };
  }

  const destino = await buscarDestinoPorId(destinoId);
  if (!destino) {
    return { sucesso: false, erro: 'DESTINO_INVALIDO' };
  }

  const custoEnergia = calcularCustoEnergia(jogador, destino);
  if (jogador.energia < custoEnergia) {
    return {
      sucesso: false,
      erro: 'ENERGIA_INSUFICIENTE',
      custoNecessario: custoEnergia,
      destino,
    };
  }

  await atualizarLocalizacaoEenergia(jogador.id, destino.id, jogador.energia - custoEnergia);

  return {
    sucesso: true,
    destino,
    energiaRestante: jogador.energia - custoEnergia,
  };
}

module.exports = {
  calcularCustoEnergia,
  executarViagem,
  iniciarViagem,
  finalizarViagem,
};
