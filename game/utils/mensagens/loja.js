module.exports = {
  falasMercador: [
    '🛒 *Mercador diz:* _Bem-vindo à loja, aventureiro!_',
    '🧓 *Mercador diz:* _Os melhores preços de Arkevia, aproveite!_',
    '📦 *Mercador diz:* _Novidades chegando em breve!_',
  ],

  gerarCaptionLoja: (jogador) => `
    ╠══𖠁𖥤 *MERCADO DE ARKEVIA*
    👤 Aventureiro: *${jogador.nome}*            
    💰 Ouro: *${jogador.moedas} moedas* 
    ╠══𖠁𖥤 *COMANDOS:*    
    ⚔️ */loja armas* — Lista armas 
    🧪 */loja consumiveis* — Lista os itens consumiveis
    ╠══𖠁𖥤
   `,

   gerarListaConsumiveis: (itens) => {
    if (!itens.length) return 'Nenhum item disponível.';

    const lista = itens.map((item, i) =>
      `↳ ${i + 1}. ${item.nome} - ${item.preco} moedas`
    ).join('\n');

    return `╠══𖠁𖥤 *CONSUMÍVEIS:*\n\n${lista}\n\n╠══𖠁𖥤`;
   },
};
