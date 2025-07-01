module.exports = {

  MensagemStatus: (jogador) => `

    📜 *STATUS DE ${jogador.nome.toUpperCase()}*

    🧪 Classe: *${jogador.classe?.nome}*
    🎖️ Level: *${jogador.level}* | XP: *${jogador.xp}*
    💰 Moedas: *${jogador.moedas}*

    ❤️ HP: *${jogador.hpAtual}/${jogador.hpMaximo}*
    🔋 Mana: *${jogador.mana}* | ⚡ Energia: *${jogador.energia}*

    💪 Força: *${jogador.forca}*
    🛡️ Defesa: *${jogador.defesa}*
    🏃 Agilidade: *${jogador.agilidade}*
    🧠 Inteligência: *${jogador.inteligencia}*
    🍀 Sorte: *${jogador.sorte}*

    📅 Criado em: *${new Date(jogador.criadoEm).toLocaleDateString()}*
    
   `

};
