module.exports = {

    adminUsoIncorretoSetXp: 
    `❌ Uso incorreto!\nExemplo: /admin setxp nome 100`,

    adminUsoIncorretoSetLevel:
    `❌ Uso incorreto!\nExemplo: /admin setlevel nome 10`,

    adminUsoIncorretoSetEnergia:
    `❌ Uso incorreto!\nExemplo: /admin setenergia mk 50`,

    adminXpJogadorAtualizado: (jogador, novoXp) =>
    `✅ XP de ${jogador.nome} atualizado para ${novoXp}.`,

    adminLevelJogadorAtualizado: (jogador, novoLevel) =>
    `📈 O jogador ${jogador.nome} agora está no nível ${novoLevel}.`,

    adminEnergiaJogadorAtualizado: (jogador, novaEnergia) =>
    `🔋 Energia de ${jogador.nome} atualizada para ${novaEnergia}.`,
    
};