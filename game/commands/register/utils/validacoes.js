/**
 * ✅ Módulo de validações do processo de registro de jogador
 * 
 * Importa os dados de referência do arquivo `perguntas.js` e fornece
 * funções utilitárias para validar as respostas do jogador durante o cadastro:
 * 
 * - `emailValido(email)`: valida o formato geral do email e se o domínio é permitido
 * - `sexoValido(sexo)`: verifica se o sexo informado está entre os aceitos
 * - `classeValida(classe)`: checa se a classe escolhida existe no jogo
 * 
 * Este módulo é usado no fluxo de `/register` para garantir que o jogador
 * não insira dados inválidos ou fora do padrão definido.
 */


const { enumSexo, classesValidas, dominiosPermitidos } = require('./perguntas');

function emailValido(email) {
  const regexGeral = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexGeral.test(email)) return false;
  const dominio = email.split('@')[1].toLowerCase();
  return dominiosPermitidos.includes(dominio);
}

function sexoValido(sexo) {
  return enumSexo.includes(sexo.toLowerCase());
}

function classeValida(classe) {
  return classesValidas.includes(classe.toLowerCase());
}

module.exports = {
  emailValido,
  sexoValido,
  classeValida
};
