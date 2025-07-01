

const habilidades_paladino = [
  {
    id: 'golpe_sagrado',
    nome: 'Golpe Sagrado',
    descricao: 'Dano extra contra criaturas das trevas.',
    xpRequerido: 0,
    custoEnergia: 10,
  },
  {
    id: 'cura_divina',
    nome: 'Cura Divina',
    descricao: 'Cura a si mesmo ou um aliado.',
    xpRequerido: 100,
    custoEnergia: 12,
  },
  {
    id: 'escudo_da_fe',
    nome: 'Escudo da Fé',
    descricao: 'Reduz 50% do dano recebido por 1 turno.',
    xpRequerido: 300,
    custoEnergia: 10,
  },
  {
    id: 'golpe_da_luz',
    nome: 'Golpe da Luz',
    descricao: 'Ataque mágico de luz.',
    xpRequerido: 600,
    custoEnergia: 13,
  },
  {
    id: 'bencao_final',
    nome: 'Bênção Final',
    descricao: 'Revive um aliado ou cura totalmente.',
    xpRequerido: 1000,
    custoEnergia: 20,
  },
];

module.exports = { habilidades_paladino };