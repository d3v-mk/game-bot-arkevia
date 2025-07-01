const fs = require('fs');
const path = require('path');

const mapasDir = path.join(__dirname, '../data/mapa');

function loadAllMapas() {
  const mapas = [];

  const arquivos = fs.readdirSync(mapasDir);

  arquivos.forEach(file => {
    if (file.endsWith('.js')) {
      const mapaModule = require(path.join(mapasDir, file));
      // Cada arquivo exporta um objeto com o nome do mapa
      // Ex: { vilarejo_inicial: {...} }
      const mapaObj = Object.values(mapaModule)[0];
      mapas.push(mapaObj);
    }
  });

  return mapas;
}

module.exports = { loadAllMapas };
