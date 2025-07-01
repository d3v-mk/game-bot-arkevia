

const habilidades_guerreiro = [
  {
    id: 'golpe_furioso',
    nome: 'Golpe Furioso',
    descricao: 'Causa 150% do ataque em dano físico.',
    xpRequerido: 0,
    custoEnergia: 10,
  },
  {
    id: 'defesa_de_ferro',
    nome: 'Defesa de Ferro',
    descricao: 'Aumenta sua defesa em +10 por 3 turnos.',
    xpRequerido: 100,
    custoEnergia: 8,
  },
  {
    id: 'investida_brutal',
    nome: 'Investida Brutal',
    descricao: 'Ataca e empurra o inimigo, chance de atordoar.',
    xpRequerido: 300,
    custoEnergia: 15,
  },
  {
    id: 'resistencia_total',
    nome: 'Resistência Total',
    descricao: 'Reduz todo dano recebido em 20% por 2 turnos.',
    xpRequerido: 600,
    custoEnergia: 12,
  },
  {
    id: 'colera_do_guerreiro',
    nome: 'Cólera do Guerreiro',
    descricao: 'Aumenta seu ataque em 50% por 1 turno.',
    xpRequerido: 1000,
    custoEnergia: 18,
  },
];

module.exports = { habilidades_guerreiro };