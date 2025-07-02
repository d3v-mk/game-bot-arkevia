

module.exports = {

  MensagemStatus: (jogador) => `
    ╔═════ 𖠁 Sᴛᴀᴛᴜs ᴅᴇ ${jogador.nome}* 𖠁 ═════╗

    🎖️ *Level:* ${jogador.level}
    🔰 *Classe:* ${jogador.classe.nome}
    ✨ *XP:* ${jogador.xp}
    ⚡️ *Energia:* ${jogador.energia}
    ❤️ *HP:* ${jogador.hpAtual}/${jogador.hpMaximo}
    💰 *Moedas:* ${jogador.moedas}
    📍 *Localização:* ${jogador.localizacaoAtual.nome}

    ╠══════ 𖥤 Aᴛʀɪʙᴜᴛᴏs 𖥤 ══════╣
    💪 *Força:* ${jogador.forca} 
    🛡️ *Defesa:* ${jogador.defesa}
    🏃 *Agilidade:* ${jogador.agilidade}
    🧠 *Inteligência:* ${jogador.inteligencia}
    🍀 *Sorte:* ${jogador.sorte}

    ╠══════ 🏆 Cᴏɴǫᴜɪsᴛᴀs ═══════╣
    ${
      jogador.conquistasAtivas?.filter(ca => ca.emUso).length > 0
        ? jogador.conquistasAtivas
            .filter(ca => ca.emUso)
            .slice(0, 3)
            .map(ca => `🏅 ${ca.conquista.nome} ${ca.conquista.emoji || ''}`)
            .join('\n')
        : '_Nenhuma conquista ativa_'
    }
    ╚════════════════════════╝
  `,

};
