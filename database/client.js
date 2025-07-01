/**
 * 📦 Instância global do Prisma Client
 * 
 * Esse arquivo cria e exporta uma única instância do `PrismaClient`,
 * que é usada pra interagir com o banco de dados de forma segura e tipada.
 * 
 * Usar uma instância centralizada evita problemas de múltiplas conexões
 * (especialmente em ambientes como serverless, ou com hot reload em dev).
 * 
 * Como usar em outros arquivos:
 * `import prisma from './caminho/do/arquivo'`
 * 
 * Exemplo:
 * const users = await prisma.user.findMany();
 */

import { PrismaClient } from '@prisma/client';

// Cria uma instância do Prisma Client para executar queries no banco
const prisma = new PrismaClient();

// Exporta a instância para ser reutilizada em todo o projeto
export default prisma;