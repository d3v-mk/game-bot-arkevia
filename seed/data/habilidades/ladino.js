

const habilidades_ladino = [
  {
    id: 'golpe_rapido',
    nome: 'Golpe Rápido',
    descricao: 'Ataca primeiro neste turno.',
    xpRequerido: 0,
    custoEnergia: 8,
  },
  {
    id: 'invisibilidade',
    nome: 'Invisibilidade',
    descricao: 'Fica invisível por 1 turno.',
    xpRequerido: 100,
    custoEnergia: 10,
  },
  {
    id: 'ataque_sombra',
    nome: 'Ataque das Sombras',
    descricao: 'Dano dobrado ao sair da invisibilidade.',
    xpRequerido: 300,
    custoEnergia: 12,
  },
  {
    id: 'roubo',
    nome: 'Roubo',
    descricao: 'Rouba moedas ou item do inimigo.',
    xpRequerido: 600,
    custoEnergia: 7,
  },
  {
    id: 'critico_certeiro',
    nome: 'Crítico Certeiro',
    descricao: 'Próximo ataque tem 100% de chance de crítico.',
    xpRequerido: 1000,
    custoEnergia: 15,
  },
];

module.exports = { habilidades_ladino };