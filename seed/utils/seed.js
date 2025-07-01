/**
 * 🌱 Script para rodar todos os arquivos de seed da pasta `seed/`
 * 
 * Esse arquivo automatiza a execução de todos os scripts de seed
 * encontrados na pasta `seed/` (exceto ele mesmo, seed.js).
 * 
 * Serve para popular o banco de dados com dados iniciais importantes
 * para o jogo, como mapas, organizações, gangs, configurações, etc.
 * 
 * Para adicionar novos seeds, basta colocar o arquivo `.js` na pasta `seed/`.
 * 
 * Para rodar todos os seeds em sequência, execute:
 *   node seed/seed.js
 * 
 * Esse script vai encontrar todos os arquivos `.js` da pasta `seed/` e rodá-los
 * automaticamente, facilitando o setup inicial do banco ou o reset dos dados.
 */


const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const seedDir = path.join(__dirname, '..'); // volta pra pasta seed/

function runSeed(file) {
  console.log(`🌱 Rodando seed: ${file}`);
  execSync(`node ${path.join(seedDir, file)}`, { stdio: 'inherit' });
}

function main() {
  const files = fs.readdirSync(seedDir).filter(f => f.endsWith('.js') && f !== 'seed.js');

  for (const file of files) {
    runSeed(file);
  }
}

main();
