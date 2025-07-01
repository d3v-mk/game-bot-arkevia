/**
 * 🔤 normalizarTexto.js
 *
 * Helper utilitário para "normalizar" strings de entrada do usuário em todo o código
 *
 * 📌 O que ela faz:
 * - Remove acentos e caracteres especiais usando `normalize('NFD')`.
 * - Converte tudo para minúsculo com `.toLowerCase()`.
 *
 * 🧠 Por que usar?
 * - Facilita comparações entre comandos e argumentos digitados pelo usuário.
 * - Garante que `/Register`, `/REGISTER`, `/registér`, etc., sejam todos tratados como `/register`.
 *
 * ✅ Ideal para:
 * - Comandos de texto
 * - Nome de lugares, itens, classes, etc.
 * - Qualquer entrada textual que precise de consistência
 */

function normalizarTexto(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

module.exports = { normalizarTexto };
