// salvar-mapa.js
require('module-alias/register');

const fs = require('fs');
const path = require('path');
const { gerarMapaComPonto } = require('@commands/mapa'); // ajuste o path se precisar

async function gerarESalvar() {
  const coordenada = { x: 800, y: 300 }; // exemplo de ponto no meio
  const buffer = await gerarMapaComPonto(coordenada);

  const outputPath = path.resolve(__dirname, 'tmp', 'mapa_teste.jpg');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buffer);

  console.log(`Imagem salva em: ${outputPath}`);
}

gerarESalvar();
