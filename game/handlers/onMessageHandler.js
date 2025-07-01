/**
 * 🔥 onMessageHandler.js - Cérebro que escuta e decide o que fazer com cada mensagem
 * 
 * Este arquivo é o controlador principal que recebe todas as mensagens que chegam no bot.
 * Ele é responsável por:
 * 
 * 1. 🛡️ Aplicar middlewares globais:
 *    - Verifica spam, autenticação, bloqueios, etc., antes de qualquer coisa.
 * 
 * 2. 🧠 Gerenciar estados de conversas:
 *    - Ideal para comandos com múltiplas etapas, como o /register.
 *    - Usa `conversationHandler` para controlar "em que parte da conversa" o usuário está.
 * 
 * 3. 🚦 Roteamento de comandos:
 *    - Com base na mensagem (ex: "/loja consumiveis"), identifica qual comando foi chamado.
 *    - Suporta comandos compostos, tipo /loja consumiveis.
 *    - Remove o trecho do comando da lista de argumentos (`args`) pra facilitar o uso.
 * 
 * 4. 📛 Responde mensagens inválidas:
 *    - Se começar com `/` e não for um comando conhecido, responde com "comando desconhecido".
 * 
 * 5. 🙈 Ignora mensagens normais:
 *    - Se não for comando, middleware ou conversa ativa, apenas ignora.
 * 
 * Em resumo: este é o "roteador-chefe" do bot. Toda mensagem passa por aqui antes de qualquer resposta.
 */



const path = require('path');
const carregarComandos = require('../core/commandLoader');
const middlewares = require('../middlewares/loader');
const { normalizarTexto } = require('../utils/normalizeText');
const handleConversationState = require('./conversationHandler');
const mensagens = require('../utils/mensagens');

const commandsDir = path.resolve(__dirname, '../commands');
const commands = carregarComandos(commandsDir);

async function onMessage(msg, sock) {
  for (const middleware of middlewares) {
    const resultado = await middleware(msg, sock);
    if (resultado) return resultado;
  }

  const texto = msg.body.trim();
  const [cmdRaw, ...argsRaw] = texto.split(' ');

  const cmd = normalizarTexto(cmdRaw);
  const args = argsRaw.map(normalizarTexto);
  const argsOriginais = argsRaw;

  // Trata estados da conversa (fluxos tipo /register)
  const estadoResult = await handleConversationState(msg, args, sock);
  if (estadoResult) return estadoResult;

  // Roteia o comando
  let comando = null;
  for (let i = args.length; i >= 0; i--) {
    const tentativa = [cmd, ...args.slice(0, i)].join(' ');
    comando = commands[normalizarTexto(tentativa)];
    if (comando) {
      args.splice(0, i);
      break;
    }
  }

  if (comando) {
    return comando(msg, args, sock, argsOriginais);
  }

  if (cmd.startsWith('/')) {
    return msg.reply(mensagens.gerais.comandoDesconhecido);
  }

  // Mensagem normal, ignora
}

module.exports = onMessage;
