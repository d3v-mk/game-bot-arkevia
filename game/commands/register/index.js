/**
 * 📝 Fluxo de cadastro de jogador no bot de RPG (comando /register)
 * 
 * Este módulo gerencia passo a passo o processo de registro de novos jogadores
 * via WhatsApp, salvando os dados no banco com validações em cada etapa.
 * 
 * O fluxo é armazenado no `estadosDeConversa` e guiado pelas perguntas:
 * 
 * Passos do fluxo:
 *  0. Solicita nome do personagem
 *  1. Pede o email (opcional com "não")
 *  2. Valida o sexo (masculino / feminino)
 *  3. Valida a classe e salva o jogador no banco (com Prisma)
 * 
 * Validações incluem:
 *  - Formato e domínio de email
 *  - Valores permitidos para sexo e classe
 * 
 * Ao final, remove o estado de conversa e envia uma mensagem de boas-vindas
 * ou erro, dependendo do resultado da tentativa de cadastro.
 * 
 * Este módulo deve ser chamado diretamente pelo comando `/register` que é o NOME DA PASTA PAI.
 */

const { perguntas } = require('./utils/perguntas');
const { emailValido, sexoValido, classeValida } = require('./utils/validacoes');
const { salvarJogador } = require('./utils/salvarJogador');
const { estadosDeConversa } = require('../../config/state');
const mensagens = require('../../utils/mensagens');

async function tratarFluxoRegister(msg, args, sock, estado) {
  const jid = msg.key.remoteJid;
  const resposta = msg.body.trim();
  const respostaLower = resposta.toLowerCase();

  switch (estado.passo) {
    case 0:
      estado.respostas.nome = resposta;
      estado.passo++;
      await sock.sendMessage(jid, { text: perguntas[1], quoted: msg });
      break;

    case 1:
      if (respostaLower !== 'não' && respostaLower !== 'nao' && !emailValido(resposta)) {
        return await sock.sendMessage(jid, {
          text: mensagens.register.emailInvalido,
          quoted: msg
        });
      }
      estado.respostas.email = ['nao', 'não'].includes(respostaLower) ? null : resposta;
      estado.passo++;
      await sock.sendMessage(jid, { text: perguntas[2], quoted: msg });
      break;

    case 2:
      if (!sexoValido(respostaLower)) {
        return await sock.sendMessage(jid, {
          text: mensagens.register.sexoInvalido,
          quoted: msg
        });
      }
      estado.respostas.sexo = respostaLower;
      estado.passo++;
      await sock.sendMessage(jid, { text: perguntas[3], quoted: msg });
      break;

    case 3:
      if (!classeValida(respostaLower)) {
        return await sock.sendMessage(jid, {
          text: mensagens.register.classeInvalida,
          quoted: msg
        });
      }

      estado.respostas.classeId = respostaLower;
      const numero = jid.split('@')[0];

      try {
        const resultado = await salvarJogador({
          ...estado.respostas,
          numeroWpp: numero
        });

        const texto = resultado === 'existe'
          ? mensagens.gerais.jaRegistrado
          : mensagens.register.sucesso;

        await sock.sendMessage(jid, {
          text: texto,
          quoted: msg
        });

      } catch (e) {
        console.error('[ERRO REGISTER]', e);
        await sock.sendMessage(jid, {
          text: mensagens.register.erro,
          quoted: msg
        });
      }

      estadosDeConversa.delete(jid);
      break;
  }
}

module.exports = async function iniciarCadastro(msg, args, sock) {
  const jid = msg.key.remoteJid;

  if (jid.endsWith('@g.us')) {
    return await sock.sendMessage(jid, {
      text: mensagens.gerais.apenasPrivado,
      quoted: msg
    });
  }

  estadosDeConversa.set(jid, {
    fluxo: 'register',
    passo: 0,
    respostas: {},
    handler: tratarFluxoRegister
  });

  await sock.sendMessage(jid, {
    text: perguntas[0],
    quoted: msg
  });
};
