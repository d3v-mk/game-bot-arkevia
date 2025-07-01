

const caverna_esquecida = {
  id: 'caverna_esquecida',
  nome: 'Caverna Esquecida',
  tipo: 'dungeon',
  descricao: 'Uma caverna escura repleta de segredos e perigos.',
  conexoes: {
    oeste: 'vilarejo_inicial'
  },
  npcs: [],                           
  inimigos: ['morcego_gigante', 'esqueleto'], 
  coordenada: { x: 3, y: 5 },         // coordenada para ajudar no cálculo de viagens e tempo no /viajar
  criadoEm: new Date(),              
};

module.exports = { caverna_esquecida };
