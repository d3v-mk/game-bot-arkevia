

const pote_mana = {
  id: 'pote_mana',
  nome: 'Pote de Mana',
  tipo: 'consumivel',
  descricao: 'Recupera 40 pontos de mana instantaneamente.',
  atributos: {},
  efeitos: {
    recuperarMana: 40,
  },
  raridade: 'comum',  // Raridade do item, isso aqui é importante para drops em dungeons
  preco: 100,         // Ajusta o valor que quiser, será usado na loja
};

module.exports = { pote_mana };