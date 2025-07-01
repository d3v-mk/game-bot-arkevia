

const habilidades_mago = [
  {
    id: 'bola_de_fogo',
    nome: 'Bola de Fogo',
    descricao: 'Lança uma bola de fogo causando dano mágico.',
    xpRequerido: 0,
    custoEnergia: 12,
  },
  {
    id: 'escudo_arcano',
    nome: 'Escudo Arcano',
    descricao: 'Cria uma barreira que absorve dano mágico.',
    xpRequerido: 100,
    custoEnergia: 10,
  },
  {
    id: 'raio_concentrado',
    nome: 'Raio Concentrado',
    descricao: 'Ataca um único inimigo com alto dano mágico.',
    xpRequerido: 300,
    custoEnergia: 16,
  },
  {
    id: 'teleporte_rapido',
    nome: 'Teleporte Rápido',
    descricao: 'Evita qualquer ataque no próximo turno.',
    xpRequerido: 600,
    custoEnergia: 9,
  },
  {
    id: 'tempestade_eterna',
    nome: 'Tempestade Eterna',
    descricao: 'Chuva mágica que atinge todos os inimigos.',
    xpRequerido: 1000,
    custoEnergia: 25,
  },
];

module.exports = { habilidades_mago };