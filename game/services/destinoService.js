/**
 *
 * 🌍 Serviço responsável por interações com a tabela `mapa` (destinos do mundo).
 *
 * 🔎 Funções:
 *
 * - buscarDestinoPorNome(nome):
 *   🔹 Busca um destino pelo nome (case insensitive).
 *   🔹 Retorna id, nome, descrição, tipo e coordenadas (ideal pra comandos tipo /viajar).
 *
 * - buscarDestinoPorId(id):
 *   🔹 Busca um destino exato pelo ID (quando já se tem o destino definido).
 *   🔹 Mesmo retorno da busca por nome.
 *
 * - calcularDistancia(p1, p2):
 *   📐 Calcula a distância euclidiana entre dois pontos `{ x, y }`.
 *   🔹 Usado para determinar tempo de viagem, alcance de habilidades, etc.
 *
 * ✅ Resultado:
 * - Esse service centraliza toda a lógica de "destino", facilitando testes, manutenção
 *   e evitando repetir queries soltas no código.
 */


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function buscarDestinoPorNome(nome) {
  return await prisma.mapa.findFirst({
    where: { nome: { equals: nome, mode: 'insensitive' } },
    select: { id: true, nome: true, descricao: true, tipo: true, coordenada: true }
  });
}

async function buscarDestinoPorId(id) {
  return await prisma.mapa.findUnique({
    where: { id },
    select: { id: true, nome: true, descricao: true, tipo: true, coordenada: true }
  });
}

function calcularDistancia(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

module.exports = {
  buscarDestinoPorNome,
  buscarDestinoPorId,
  calcularDistancia,
};
