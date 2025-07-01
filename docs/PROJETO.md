## Organização e estrutura projeto:


```
Arkevia-rpg-whatsapp/
├── README.md                    ← Documentação geral do projeto  
├── database/                    ← Banco de dados e configurações Prisma  
│   ├── client.js                ← Cliente Prisma para consultas  
│   └── prisma/                  ← Configurações do Prisma  
│       ├── migrations/          ← Migrations do banco de dados  
│       └── schema.prisma        ← Schema Prisma (modelos e datasource)  
├── docs/                        ← Documentação detalhada do projeto  
|   ├── SETUP.md                 ← Como rodar o projeto
│   ├── JOGO.md                  ← Regras e mecânicas do jogo  
│   ├── PERSONAGEM.md            ← Detalhes sobre personagens e classes  
│   └── PROJETO.md               ← Planejamento e notas técnicas 
│   └── CHANGELOG.md             ← Anotações de alterações com datas
├── game/                        ← Lógica principal do jogo  
│   ├── arkevia-rpg.js           ← Arquivo principal da lógica do jogo  
│   ├── commands/                ← Comandos do jogo (interações dos jogadores)  
│   │   ├── admin/               ← Comandos administrativos  
|   |   ├── store/               ← aonde fica todos os comandos da loja do jogo /store
│   │   ├── auth/                ← Comandos de autenticação/login  
│   │   └── jogador/             ← Comandos do jogador  
│   ├── config/                  ← Configurações específicas do jogo  
|   ├── imgs/                    ← imagens usada no projeto
|       └── store/               ← imagens da loja /store
│   ├── functions/               ← Funções auxiliares da lógica do jogo  
│   ├── handlers/                ← Handlers de eventos e entradas  
│   │   └── onMessage.js         ← Manipulador principal de mensagens  
│   ├── services/                ← Serviços e regras de negócio  
│   └── sessions/                ← Gerenciamento de sessões dos jogadores  
├── htm/                         ← Arquivos estáticos/front-end (HTML, CSS, JS)  
├── package-lock.json            ← Lock das versões das dependências  
├── package.json                 ← Configuração do Node.js e dependências  
├── scripts/                     ← Scripts auxiliares para o projeto  
│   └── prisma-tools.js          ← Scripts específicos para Prisma  
├── tests/                       ← Pasta de testes
|   └── local-bot.js             ← Simula um bot localmente pra testes
└── seed/                        ← Scripts para popular banco com dados iniciais  
    ├── data/                    ← Dados estáticos
    |   └── habilidades/         ← Cada classe tem suas habilidades aqui, fácil de manter e importar
    |   └── itens/               ← Todos os itens do game
    |   └── mapa/                ← Todos os mapas do game
    ├── utils/                   ← Utilitarios das seeds
    ├── classesSeed.js           ← Seed para popular classes e habilidades  
    └── seed.js                  ← Script principal que chama os seeds  

```


## Sobre as BRANCHS:

###  2. Ramo Principal (main/master)

✅ Protegido contra push direto.

✅ Toda mudança só entra via Pull Request.

✅ Requer aprovação

### Estratégia de Branches

```bash

main              ← código estável (produção)
│
├── dev           ← onde todos trabalham juntos
│   ├── feature/nome-da-feature
│   ├── bugfix/ajuste-x
│   └── refactor/alguma-mudança
```