/**
 *
 * 🚪 Middleware que intercepta confirmações de viagem.
 *
 * 🔍 Como funciona:
 * - Verifica se o usuário digitou "sim" e está com uma confirmação de viagem pendente.
 * - Se sim, aciona o comando de viagem automaticamente (sem precisar digitar /viajar de novo).
 * - Ideal para criar interações mais naturais, tipo "Você deseja viajar para a Caverna? (sim/não)".
 *
 * ✅ Resultado:
 * - Fluxo de jogo mais imersivo e menos dependente de comandos explícitos.
 * - Facilita interações em etapas no universo do RPG.
 */

const { confirmacoesViagem } = require('../config/state');
const { normalizarTexto } = require('../utils/normalizeText');
const { getJogadorPorJid, iniciarViagem, finalizarViagem } = require('../services/jogadorService');
const { executarViagem } = require('../services/viagemService');
const { formatarTempoSegundos } = require('../commands/viajar/utils/tempo');
const mensagens = require('../utils/mensagens')

module.exports = async function confirmarViagem(msg, sock) {
  const texto = normalizarTexto(msg.body.trim());
  const userId = msg.key.remoteJid;

  if (!confirmacoesViagem.has(userId)) return null;

  if (texto === 'sim') {
    const { destino, custoEnergia, delaySegundos } = confirmacoesViagem.get(userId);

    const jogador = await getJogadorPorJid(userId);
    if (!jogador) {
      confirmacoesViagem.delete(userId);
      return sock.sendMessage(userId, { 
        text: mensagens.gerais.precisaRegistrar, 
        quoted: msg 
      });
    }

    if (jogador.viajando) {
      // Aqui cancela a confirmação pq o jogador já tá viajando
      confirmacoesViagem.delete(userId);
      return sock.sendMessage(userId, { 
        text: mensagens.viagem.jaEstaViajando, 
        quoted: msg 
      });
    }
    if (jogador.energia < custoEnergia) {
      confirmacoesViagem.delete(userId);
      return sock.sendMessage(userId, { 
        text: mensagens.viagem.viagemEnergiaInsuficiente(custoEnergia), 
        quoted: msg 
      });
    }

    confirmacoesViagem.delete(userId);
    await iniciarViagem(jogador.id);
    const tempoFormatado = formatarTempoSegundos(delaySegundos);

    await sock.sendMessage(userId, { 
      text: mensagens.viagem.viagemIniciada(destino, tempoFormatado),
      quoted: msg 
    });

    try {
      await new Promise(res => setTimeout(res, delaySegundos * 1000));
      const resultado = await executarViagem(userId, destino.id);
      await finalizarViagem(jogador.id);

      if (resultado.sucesso) {
        return sock.sendMessage(userId, {
          text: mensagens.viagem.viagemChegouDestino(resultado),
          quoted: msg,
        });
      } else {
        return sock.sendMessage(userId, { text: resultado.erro, quoted: msg });
      }
    } catch (error) {
      await finalizarViagem(jogador.id);
      return sock.sendMessage(userId, { 
        text: mensagens.viagem.erroViagem, 
        quoted: msg 
      });
    }
  }

  if (texto === 'nao' || texto === 'não') {
    confirmacoesViagem.delete(userId);
    return sock.sendMessage(userId, { 
      text: mensagens.viagem.viagemCancelada, 
      quoted: msg 
    });
  }

  // Qualquer outro texto: ignora
  return null;
};
