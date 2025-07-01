const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const P = require('pino');
const qrcode = require('qrcode-terminal');

// imports
const onMessage = require('./handlers/onMessage');

async function startSock() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth');

  const sock = makeWASocket({
    logger: P({ level: 'silent' }),
    auth: state
  });

  sock.ev.on('creds.update', saveCreds);

// integração do onMessage: Prefixo para comandos = / 
sock.ev.on('messages.upsert', async ({ messages }) => {
  const msg = messages[0];
  if (!msg.message) return;
  if (!msg.key.remoteJid || msg.key.fromMe) return;

  const mensagem = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
  if (!mensagem) return;

  // Cria um wrapper para msg com método reply simplificado @IsaStwart
  const wrappedMsg = {
    body: mensagem,
    reply: async (text) => {
      await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    },
    key: msg.key,
    sender: msg.key.participant || msg.key.remoteJid,
    raw: msg
  };

  // estou passando o sock para onMessage para que comandos possam usar sock.sendMessage() @IsaStwart
  await onMessage(wrappedMsg, sock);
});

  
  sock.ev.on('connection.update', (update) => {
    const { connection, qr, lastDisconnect } = update;

    if (qr) {
      console.log('Escaneie o QR code abaixo para logar no WhatsApp:\n');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut);
      console.log('❌ Conexão encerrada.', shouldReconnect ? 'Tentando reconectar...' : 'Você foi deslogado.');
      if (shouldReconnect) startSock();
    }

    if (connection === 'open') {
      console.log('Rodando o Arkevia Rpg!');
    }
  });
}

startSock();
