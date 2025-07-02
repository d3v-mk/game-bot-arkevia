const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const mensagens = require('../../../utils/mensagens');

module.exports = async (msg, args, sock, admin) => {
  const jid = msg.key.remoteJid;

  const nomeAlvo = args[0]?.toLowerCase();
  const nomeConquista = args.slice(1).join(' ').toLowerCase();

  if (!nomeAlvo || !nomeConquista) {
    return sock.sendMessage(jid, {
      text: mensagens.admin.adminUsoIncorretoDarConquista,
      quoted: msg,
    });
  }

  // Busca jogador específico
  const jogador = await prisma.jogador.findFirst({
    where: { nome: { equals: nomeAlvo, mode: 'insensitive' } },
  });

  if (!jogador) {
    return sock.sendMessage(jid, {
      text: mensagens.gerais.jogadorNaoEncontrado(nomeAlvo),
      quoted: msg,
    });
  }

  if (nomeConquista === 'all') {
    // Dá todas as conquistas para esse jogador
    const conquistas = await prisma.conquista.findMany();

    if (conquistas.length === 0) {
      return sock.sendMessage(jid, {
        text: '❌ Não há conquistas cadastradas para distribuir.',
        quoted: msg,
      });
    }

    let totalDistribuidos = 0;
    for (const conquista of conquistas) {
      const jaTem = await prisma.conquistaDoJogador.findFirst({
        where: {
          jogadorId: jogador.id,
          conquistaId: conquista.id,
        },
      });
      if (!jaTem) {
        await prisma.conquistaDoJogador.create({
          data: {
            jogadorId: jogador.id,
            conquistaId: conquista.id,
          },
        });

        // Ativa conquista (ignora duplicata)
        await prisma.conquistaAtiva.create({
          data: {
            jogadorId: jogador.id,
            conquistaId: conquista.id,
          },
        }).catch(e => {
          if (e.code !== 'P2002') throw e;
        });

        totalDistribuidos++;
      }
    }

    return sock.sendMessage(jid, {
      text: `🎉 Todas as conquistas foram dadas para *${jogador.nome}*!\nTotal: ${totalDistribuidos}`,
      quoted: msg,
    });
  }

  // Se não for 'all', busca conquista específica
  const conquista = await prisma.conquista.findFirst({
    where: { nome: { equals: nomeConquista, mode: 'insensitive' } },
  });

  if (!conquista) {
    return sock.sendMessage(jid, {
      text: mensagens.admin.conquistaNaoEncontrada(nomeConquista),
      quoted: msg,
    });
  }

  // Verifica se já tem essa conquista
  const jaTem = await prisma.conquistaDoJogador.findFirst({
    where: {
      jogadorId: jogador.id,
      conquistaId: conquista.id,
    },
  });

  if (jaTem) {
    return sock.sendMessage(jid, {
      text: mensagens.admin.jogadorJaTemConquista(jogador.nome, conquista.nome),
      quoted: msg,
    });
  }

  // Dá a conquista pro jogador
  await prisma.conquistaDoJogador.create({
    data: {
      jogadorId: jogador.id,
      conquistaId: conquista.id,
    },
  });

  // Ativa conquista automaticamente (ignora duplicata)
  await prisma.conquistaAtiva.create({
    data: {
      jogadorId: jogador.id,
      conquistaId: conquista.id,
    },
  }).catch(e => {
    if (e.code !== 'P2002') throw e;
  });

  return sock.sendMessage(jid, {
    text: mensagens.admin.sucessoDarConquista(jogador.nome, conquista.nome),
    quoted: msg,
  });
};
