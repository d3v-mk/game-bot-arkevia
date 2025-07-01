

const habilidades_necromante = [
  {
    id: 'toque_mortal',
    nome: 'Toque Mortal',
    descricao: 'Dano sombrio contínuo.',
    xpRequerido: 0,
    custoEnergia: 10,
  },
  {
    id: 'levantar_morto',
    nome: 'Levantar Morto',
    descricao: 'Invoca um esqueleto aliado.',
    xpRequerido: 100,
    custoEnergia: 14,
  },
  {
    id: 'corrente_da_alma',
    nome: 'Corrente da Alma',
    descricao: 'Divide o dano recebido com aliado morto-vivo.',
    xpRequerido: 300,
    custoEnergia: 10,
  },
  {
    id: 'nuvem_maligna',
    nome: 'Nuvem Maligna',
    descricao: 'Envenena todos os inimigos por 2 turnos.',
    xpRequerido: 600,
    custoEnergia: 13,
  },
  {
    id: 'mestre_das_trevas',
    nome: 'Mestre das Trevas',
    descricao: 'Aumenta dano sombrio em 50% por 3 turnos.',
    xpRequerido: 1000,
    custoEnergia: 20,
  },
];

module.exports = { habilidades_necromante };