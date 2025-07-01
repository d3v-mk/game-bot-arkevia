/**
 * 🧙‍♂️ Carregador de Itens para o Seed do RPG
 *
 * Este módulo busca e importa automaticamente todos os arquivos `.js` dentro da pasta `seed/data/itens`
 * (ou subpastas, se especificado) e retorna um array com os objetos de item prontos para serem usados
 * nos scripts de seed do banco de dados (ex: `itensSeed.js`).
 *
 * ⚙️ Como funciona:
 * - Procura por arquivos `.js` na pasta `seed/data/itens/[subpasta]`
 * - Importa cada arquivo e extrai o primeiro objeto exportado
 * - Retorna um array com todos os itens carregados
 *
 * Exemplo de uso:
 *   const { carregarTodosItens } = require('./utils/carregarItens');
 *   const todosOsItens = await carregarTodosItens('consumiveis');
 */

const path = require('path');
const fs = require('fs').promises;

async function carregarTodosItens(subpasta = '') {
  const itensDir = path.resolve('seed/data/itens', subpasta);
  const arquivos = await fs.readdir(itensDir);
  const itens = [];

  for (const arquivo of arquivos) {
    if (!arquivo.endsWith('.js')) continue;

    const fullPath = path.join(itensDir, arquivo);
    try {
      const item = require(fullPath);
      const itemReal = Object.values(item)[0]; 
      itens.push(itemReal);
    } catch (err) {
      console.warn(`Erro ao importar ${arquivo}:`, err.message);
    }
  }

  return itens;
}

module.exports = { carregarTodosItens };
