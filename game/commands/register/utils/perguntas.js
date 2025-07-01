/**
 * 🔐 Módulo de validação e suporte ao registro de jogadores
 *
 * Este arquivo define as perguntas feitas durante o processo de cadastro,
 * além de conter as validações permitidas, como:
 * 
 * - `enumSexo`: gêneros válidos para o jogador
 * - `classesValidas`: classes disponíveis no RPG (tipo mago, guerreiro, etc)
 * - `dominiosPermitidos`: domínios de email confiáveis
 *
 * Esse módulo é usado para guiar o fluxo do comando `/register`,
 * garantindo que os dados inseridos sejam coerentes e seguros.
 */


const perguntas = [
  'Digite o nome do personagem:',
  'Digite seu email.\nSe não quiser cadastrar, responda "não".\n_Se não cadastrar um email e perder seu número de telefone sua conta será perdida_',
  'Qual seu sexo? (masculino / feminino)',
  'Qual sua classe? (guerreiro, mago, arqueiro, paladino, ladino, necromante)',
];

const enumSexo = ['masculino', 'feminino'];
const classesValidas = ['guerreiro', 'mago', 'arqueiro', 'paladino', 'ladino', 'necromante'];
const dominiosPermitidos = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];

module.exports = {
  perguntas,
  enumSexo,
  classesValidas,
  dominiosPermitidos
};
