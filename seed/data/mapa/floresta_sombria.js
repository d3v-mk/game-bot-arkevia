

const floresta_sombria = {
  id: 'floresta_sombria',
  nome: 'Floresta Sombria',
  tipo: 'floresta',
  descricao: 'Uma floresta densa cheia de criaturas à espreita.',
  conexoes: {
    sul: 'vilarejo_inicial',
    leste: 'pântano_nebuloso'
  },
  npcs: [],
  inimigos: ['lobo', 'aranha_venenosa', 'goblin'],
  coordenada: { x: 150, y: 100 },     // coordenada para ajudar no cálculo de viagens e tempo no /viajar
  criadoEm: new Date(),
};

module.exports = { floresta_sombria };
