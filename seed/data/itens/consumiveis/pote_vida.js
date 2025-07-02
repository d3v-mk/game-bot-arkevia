

const pote_vida = {
  id: 'pote_vida',
  nome: 'Pote de Vida',
  tipo: 'consumivel',
  descricao: 'Recupera 50 pontos de vida instantaneamente.',
  atributos: {},
  efeitos: {
    recuperarHp: 10, 
  },
  raridade: 'comum',  // Raridade do item, isso aqui é importante para drops em dungeons
  preco: 100,        // Ajusta o valor que quiser, será usado na loja
};

module.exports = { pote_vida };
