module.exports = {

    verItensListaInventario: (jogador, inventarioPorTipo) => `
        ╔══════ 𖠁 *ɪɴᴠᴇɴᴛᴀʀɪᴏ* 𖠁 ═════╗

        🎒 Inventário de *${jogador.nome}*

        ╠═════ 𖥤 *ᴄᴏɴsᴜᴍɪᴠᴇɪs* 𖥤 ═════╣
        ${inventarioPorTipo.consumivel}

        ╠═══════ 𖥤 *ᴀʀᴍᴀs* 𖥤 ═══════╣
        ${inventarioPorTipo.arma}

        ╠═════ 𖥤 *ᴇǫᴜɪᴘᴀᴍᴇɴᴛᴏs* 𖥤 ════╣
        ${inventarioPorTipo.equipamento}

        ╚═══════════════════════╝
    `,


    jogadorInventarioVazio:
    `❌ Seu inventário está vazio`,
    
    invDroparUsoIncorreto:
    `❌ Uso incorreto!\nExemplo: /inventario dropar [item] [quantidade]`,

    invDarItemUsoIncorreto:
    `❌ Uso incorreto!\nExemplo: /inventario daritem [jogador] [item] [quantidade]`,

    invDroparQtdInvalida:
    `❌ Quantidade inválida.`,

    invDarItemJogadorNaoEstaNoMesmoLocal: (destinatario) =>
    `❌ Jogador "${destinatario.nome}" não está no mesmo local que você.`,

    invDarItemNaoEncontrado: (nomeItem) =>
    `❌ Item "${nomeItem}" não encontrado.`,

    invDarItemQtdInsuficiente: (item) =>
    `❌ Você não tem quantidade suficiente do item "${item.nome}`,

    invDarItemSucesso: (quantidade, item, destinatario) =>
    `🎁 Você deu ${quantidade}x ${item.nome} para ${destinatario.nome}.`,

    invDroparItemNaoEncontrado: (nomeItem) =>
    `❌ Item "${nomeItem}" não encontrado`,
    
    invDroparJogadorSemItem: (item) =>
    `❌ Você não tem o item "${item.nome}" no inventário.`,

    invDroparQtdInsuficiente: (inventario) =>
    `❌ Quantidade insuficiente. Você tem apenas ${inventario.quantidade} desse item.`,

    invDroparSucesso: (qtd, item) =>
    `✅ Você dropou ${qtd}x do item "${item.nome}`,
};