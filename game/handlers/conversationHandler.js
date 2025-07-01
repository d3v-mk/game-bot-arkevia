/**
 * conversationHandler.js
 *
 * 🎯 Responsável por gerenciar estados de conversas com usuários.
 *
 * 🧠 Como funciona:
 * - Verifica se o usuário está em um "estado de conversa" ativo (ex: cadastro em andamento).
 * - Se estiver, chama o handler correspondente salvo no `estadosDeConversa`.
 * - Esse fluxo permite criar interações em etapas (como formulários ou escolhas sequenciais).
 *
 * ✅ Resultado:
 * - Permite que comandos como `/register` funcionem em várias etapas, sem precisar digitar tudo em uma mensagem.
 */

const { estadosDeConversa } = require('../config/state');

async function handleConversationState(msg, args, sock) {
  const userId = msg.key.remoteJid;
  if (estadosDeConversa.has(userId)) {
    const estado = estadosDeConversa.get(userId);
    if (typeof estado.handler === 'function') {
      return estado.handler(msg, args, sock, estado);
    }
  }
  return null;
}

module.exports = handleConversationState;
