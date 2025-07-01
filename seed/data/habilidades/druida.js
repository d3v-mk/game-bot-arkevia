

const habilidades_druida = [
  {
    id: 'espinhos_terra',
    nome: 'Espinhos da Terra',
    descricao: 'Lança espinhos do chão para causar dano.',
    xpRequerido: 0,
    custoEnergia: 9,
  },
  {
    id: 'cura_natural',
    nome: 'Cura Natural',
    descricao: 'Regenera vida ao longo de 3 turnos.',
    xpRequerido: 100,
    custoEnergia: 11,
  },
  {
    id: 'forma_urso',
    nome: 'Forma de Urso',
    descricao: 'Aumenta força e defesa temporariamente.',
    xpRequerido: 300,
    custoEnergia: 15,
  },
  {
    id: 'raizes_paralisantes',
    nome: 'Raízes Paralisantes',
    descricao: 'Prende o inimigo impedindo de agir.',
    xpRequerido: 600,
    custoEnergia: 13,
  },
  {
    id: 'ciclo_da_vida',
    nome: 'Ciclo da Vida',
    descricao: 'Cura aliados e envenena inimigos ao mesmo tempo.',
    xpRequerido: 1000,
    custoEnergia: 20,
  },
];

module.exports = { habilidades_druida };