const fs = require('fs');
const path = require('path');

function loadItensFromDir(dir) {
  let itens = [];

  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // Lê recursivamente as subpastas
      itens = itens.concat(loadItensFromDir(fullPath));
    } else if (file.isFile() && file.name.endsWith('.js')) {
      const itemModule = require(fullPath);

      // Cada arquivo pode exportar um objeto único ou vários itens
      if (Array.isArray(itemModule)) {
        itens = itens.concat(itemModule);
      } else if (typeof itemModule === 'object' && itemModule !== null) {
        // Pega todos os valores exportados no objeto (exportados via module.exports = { pote_vida, ... })
        itens = itens.concat(Object.values(itemModule));
      }
    }
  }

  return itens;
}

module.exports = loadItensFromDir;
