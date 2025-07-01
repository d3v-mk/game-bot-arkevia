

const habilidades_arqueiro = [
  {
    id: 'flecha_precisa',
    nome: 'Flecha Precisa',
    descricao: 'Ataque certeiro com chance de crítico aumentada.',
    xpRequerido: 0,
    custoEnergia: 9,
  },
  {
    id: 'chuva_de_flechas',
    nome: 'Chuva de Flechas',
    descricao: 'Ataca todos os inimigos próximos.',
    xpRequerido: 100,
    custoEnergia: 14,
  },
  {
    id: 'flecha_envenenada',
    nome: 'Flecha Envenenada',
    descricao: 'Dano contínuo por veneno.',
    xpRequerido: 300,
    custoEnergia: 11,
  },
  {
    id: 'visao_de_aguila',
    nome: 'Visão de Águia',
    descricao: 'Aumenta esquiva e crítico por 3 turnos.',
    xpRequerido: 600,
    custoEnergia: 10,
  },
  {
    id: 'tiro_mortal',
    nome: 'Tiro Mortal',
    descricao: 'Disparo com dano massivo. Chance de eliminar instantaneamente alvos fracos.',
    xpRequerido: 1000,
    custoEnergia: 20,
  },
];

module.exports = { habilidades_arqueiro };