/**
 * 💾 Módulo responsável por salvar um novo jogador no banco de dados
 * 
 * Este script usa o Prisma Client para:
 * 
 * - Verificar se já existe um jogador com o mesmo número de WhatsApp (`numeroWpp`)
 * - Se não existir, cria um novo registro com os dados fornecidos
 * - Retorna:
 *    - `'existe'` se o jogador já estiver cadastrado
 *    - `'sucesso'` se o cadastro for concluído com sucesso
 * 
 * Este módulo é utilizado durante o processo de registro (/register)
 * para persistir o jogador na tabela `jogador` do banco de dados.
 */


require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { vilarejo_inicial } = require('../../../../seed/data/mapa/vilarejo_inicial');

async function salvarJogador({ nome, email, sexo, classeId, numeroWpp }) {
  const jaExiste = await prisma.jogador.findUnique({ where: { numeroWpp } });
  if (jaExiste) return 'existe';

  await prisma.jogador.create({
    data: { 
      nome,
      email,
      sexo,
      classeId,
      numeroWpp,
      localizacaoAtualId: vilarejo_inicial.id, // spawn no vilarejo inicial depois que cadastrar no /register
    }
  });

  return 'sucesso';
}

module.exports = { salvarJogador };
