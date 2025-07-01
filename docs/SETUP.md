# 🚀 SETUP - Arkevia RPG WhatsApp

Passo a passo pra rodar o projeto localmente e todos os comandos úteis!

---

## 📦 Requisitos

- Node.js (v18+ recomendado)
- PostgreSQL (rodando localmente ou remoto)
- Um celular com Whatsapp
- Git pra clonar o repo

---

## 🛠️ Instalação

Clone o projeto e instale as dependências:

```bash
git clone https://github.com/LeonelMiguins/arkevia-rpg-whatsapp.git
cd arkevia-rpg-whatsapp
npm install
```

Crie um arquivo `.env` na raiz:

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/arkevia"
```

Rodar as migrations e gerar o client:

```bash
npx prisma migrate dev
npx prisma generate
```

Popular o banco com os dados iniciais:

```bash
npm run seed
```

Rodar o bot:

```bash
npm start
```

---

# 💻 Comandos úteis

Existe um script em `scripts/` para facilitar o uso do Prisma:

```bash
npm run prisma-tools
```

Existe um script em `scripts/` para testar o bot localmente:

```bash
node run local-bot
```