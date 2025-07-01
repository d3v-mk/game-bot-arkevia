

const vilarejo_inicial = {
  id: 'vilarejo_inicial',
  nome: 'Vilarejo Inicial',
  tipo: 'cidade',
  descricao: 'Um vilarejo pacato onde os aventureiros começam sua jornada.',
  conexoes: {
    norte: 'floresta_sombria',
    leste: 'caverna_esquecida'
  },
  npcs: ['ferreiro', 'curandeira', 'taverneiro'],
  inimigos: [],
  coordenada: { x: 0, y: 0 },      // coordenada para ajudar no cálculo de viagens e tempo no /viajar
  criadoEm: new Date(),           
};

module.exports = { vilarejo_inicial };
