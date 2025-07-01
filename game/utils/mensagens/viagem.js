const { formatarTempoSegundos } = require('../../commands/viajar/utils/tempo');

module.exports = {
    destinoInvalido: (destinoNome) => 
     `❌ Destino "${destinoNome}" inválido ou não encontrado.`,

    informarDestino: 
     `❌ Você precisa informar o destino! Exemplo: /viajar floresta sombria`,

    custoDestino: ({ destino, custoEnergia, delaySegundos }) =>
     `⚠️ Viajar para *${destino.nome}* custa *${custoEnergia}* de energia e vai levar *${formatarTempoSegundos(delaySegundos)}*.\n
     Responda *sim* para confirmar ou *não* para cancelar.\n
     Não poderá ser cancelado após confirmar!`,

    jaEstaViajando: 
     `⏳ Você já está em uma viagem! Aguarde terminar antes.`,

    viagemEnergiaInsuficiente: (custoEnergia) =>
     `❌ Energia insuficiente. Você precisa de ${custoEnergia}.`,

    viagemIniciada: (destino, tempo) =>
     `🚀 Viagem iniciada para *${destino.nome}*! Vai levar ${tempo}...`,

    viagemChegouDestino: ({ destino, energiaRestante }) =>
     `✅ Chegou em *${destino.nome}*.\n${destino.descricao}\nEnergia restante: ${energiaRestante}`,

    erroViagem:
     `❌ Erro durante a viagem.`,

    viagemCancelada:
     `❌ Viagem cancelada.`,
}