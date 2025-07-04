/**
 *
 * 🧩 Carregador automático de middlewares.
 *
 * 🔍 O que ele faz:
 * - Lê todos os arquivos `.js` dentro da pasta `middlewares/`, exceto este `loader.js`.
 * - Faz um `require()` automático de cada middleware encontrado.
 * - Exporta todos eles como um array, pronto pra ser usado no `onMessageHandler.js`.
 *
 * ✅ Resultado:
 * - Você só precisa criar um novo arquivo `.js` aqui dentro (ex: `bloqueioPorDebito.js`)
 *   e ele será carregado automaticamente, sem precisar importar manualmente.
 *
 * ⚠️ Requisitos:
 * - Cada middleware deve exportar uma função `(msg, sock) => ...`
 * - Se quiser usar middlewares assíncronos, use `async` e retorne `null` quando não interceptar.
 */

const fs = require('fs');
const path = require('path');

const dir = __dirname;

const arquivos = fs
  .readdirSync(dir)
  .filter(f => f !== 'loader.js' && f.endsWith('.js'));

module.exports = arquivos.map(file => require(path.join(dir, file)));
