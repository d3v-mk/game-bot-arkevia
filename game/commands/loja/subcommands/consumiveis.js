/**
 * 🧪 Subcomando da loja: /loja consumiveis
 * 
 * Este módulo exibe todos os itens do tipo "consumíveis" disponíveis no mercado.
 * 
 * Funcionalidades:
 * - Carrega os itens da categoria 'consumiveis' via `carregarTodosItens()`
 * - Formata a lista com nome e preço dos itens
 * - Envia a mensagem com a lista para o jogador no WhatsApp
 * 
 * Este comando é acionado via `/loja consumiveis` e depende do serviço
 * `itemService.js` para obter os dados.
 */

const { carregarTodosItens } = require('../../../services/itemService');
const mensagens = require('../../../utils/mensagens');

module.exports = async (msg, args, sock) => {
  const jid = msg.key.remoteJid;
  const itens = await carregarTodosItens('consumiveis');

  const texto = mensagens.loja.gerarListaConsumiveis(itens);

  await sock.sendPresenceUpdate('composing', jid);
  await new Promise(r => setTimeout(r, 1000));
  return sock.sendMessage(jid, { text: texto, quoted: msg });
};
