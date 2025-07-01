

const pergaminho_tp = {
  id: 'pergaminho_tp',
  nome: 'Pergaminho de Teletransporte',
  tipo: 'consumivel',
  descricao: 'Permite teletransportar para a cidade mais próxima.',
  atributos: {},
  efeitos: {
    teletransporte: true,
    usoUnico: true,
  },
  raridade: 'raro',  // Raridade do item, isso aqui é importante para drops em dungeons
  preco: 300,        // Ajusta o valor que quiser, será usado na loja
};

module.exports = { pergaminho_tp };
