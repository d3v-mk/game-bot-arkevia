

const habilidades_cavaleiro = [
  {
    id: 'golpe_escudo',
    nome: 'Golpe com Escudo',
    descricao: 'Dano moderado e chance de atordoar.',
    xpRequerido: 0,
    custoEnergia: 10,
  },
  {
    id: 'proteger_aliado',
    nome: 'Proteger Aliado',
    descricao: 'Recebe o dano no lugar de um aliado por 1 turno.',
    xpRequerido: 100,
    custoEnergia: 12,
  },
  {
    id: 'postura_defensiva',
    nome: 'Postura Defensiva',
    descricao: 'Reduz todo dano recebido pela equipe por 1 turno.',
    xpRequerido: 300,
    custoEnergia: 15,
  },
  {
    id: 'corte_heroico',
    nome: 'Corte Heroico',
    descricao: 'Ataque poderoso que ignora parte da defesa inimiga.',
    xpRequerido: 600,
    custoEnergia: 14,
  },
  {
    id: 'juramento_de_gloria',
    nome: 'Juramento de Glória',
    descricao: 'Aumenta ataque e defesa de todos os aliados por 2 turnos.',
    xpRequerido: 1000,
    custoEnergia: 20,
  },
];

module.exports = { habilidades_cavaleiro };