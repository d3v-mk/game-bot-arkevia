const { getJogadorPorJid } = require('../../services/jogadorService');
const { buscarDestinoPorNome, calcularDistancia } = require('../../services/destinoService');
const { calcularCustoEnergia } = require('../../services/viagemService');
const { confirmacoesViagem } = require('../../config/state');
const mensagens = require('../../utils/mensagens');

module.exports = async (msg, args, sock) => {
  const jid = msg.key.remoteJid;
  const destinoNome = args.join(' ');

  if (!destinoNome) {
    return sock.sendMessage(jid, { 
      text: mensagens.viagem.informarDestino, 
      quoted: msg 
    });
  }

  const destino = await buscarDestinoPorNome(destinoNome);
  if (!destino) {
    return sock.sendMessage(jid, { 
      text: mensagens.viagem.destinoInvalido(destinoNome), 
      quoted: msg 
    });
  }

  const jogador = await getJogadorPorJid(jid);
  if (!jogador) {
    return sock.sendMessage(jid, { 
      text: mensagens.gerais.precisaRegistrar, 
      quoted: msg 
    });
  }

  const pAtual = jogador.localizacaoAtual?.coordenada ?? { x: 0, y: 0 };
  const distancia = calcularDistancia(pAtual, destino.coordenada ?? { x: 0, y: 0 });
  const delaySegundos = Math.ceil(distancia * 10);
  const custoEnergia = calcularCustoEnergia(jogador, destino);

  const dadosViagem = { destino, custoEnergia, delaySegundos };
  confirmacoesViagem.set(jid, dadosViagem);

  return sock.sendMessage(jid, {
    text: mensagens.viagem.custoDestino(dadosViagem),
    quoted: msg,
  });
};
