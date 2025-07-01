## 🧠 01/07/2025 - Branch: `mk/refactor&feat/viagem+mensagens`

## 🔨 Refatorações

- Refatorado o `onMessage.js`:
  - Virou um handler e não cuida mais da função de transformar o nome do arquivo em comando isso agora é responsabilidade do `core/commandLoader.js`
  - Agora se chama `onMessageHandler.js`.
  - Comentários explicativos incluídos no próprio arquivo.

- Arquivos em `commands/` não viram mais comandos, agora as pastas que viram. Expliçoes no dentro do arquivo `commandLoader.js`

- Todos os textos de resposta do bot foram **extraídos para o diretório `utils/mensagens/`**:
  - Arquivos como `gerais.js`, `viagem.js`, `register.js`, `status.js`, `loja.js`.

- Modularização das validações de cadastro:
  - Funções como `sexoValido`, `classeValida`, `emailValido`, e arrays de referência foram movidos para `register/modules/validacoes.js`.

## 🏛 Estrutura 

### 📂 Nova pasta: middlewares/
  - Interceptadores que tratam mensagens antes ou depois dos comandos.
  - Úteis para confirmar ações, autenticar ou alterar fluxo.

### 📂 Nova pasta: utils/
  - Funções utilitárias genéricas, guarda todos os helpers
  - Evita duplicação de código e facilita manutenção.

### 📂 Nova pasta: core/
  - Infraestrutura base do sistema.
  - Lida com carregamento de comandos e outros mecanismos internos.

### 📂 Nova pasta: config/
  - Configurações globais e estados voláteis.

### 📂 Nova pasta: service/
  - Lógica de negócio: ações que afetam o jogo e interagem com o banco de dados.

## 📄 Arquivos Novos

### 📂 middlewares/
  - loader.js: carrega todos os middlewares da pasta automaticamente.
  - confirmarViagem.js: intercepta respostas "sim" ou "não" para comandos de viagem.

### 📂 utils/
  - normalizeText.js: remove acentos, símbolos e põe texto em minúsculas.
  - mensagens/
    - gerais.js: mensagens genéricas do bot.
    - viagem.js: mensagens do sistema de viagem.
    - register.js: mensagens do cadastro.
    - status.js: mensagens do comando de status.
    - loja.js: mensagens do sistema de loja.

### 📂 core/
  - commandLoader.js: carrega automaticamente os comandos disponíveis.

### 📂 config/
  - state.js: armazena dados temporários como confirmações e sessões ativas.

### 📂 service/
  - viagemService.js: calcula energia, tempo e inicia a viagem; lida com regras de deslocamento no mapa.
  - jogadorService.js: busca e atualiza dados do jogador; cuida de XP, energia, atributos, level, etc.
  - itemService.js: gerencia lógica de itens; busca por categoria, aplica efeitos, controla inventário.
  - destinoService.js: traz dados dos destinos disponíveis; descrição, requisitos, distância e recompensas.


## ✨ Novos Comandos

- **🧙 Comando `/register`**
  - Cadastro completo com múltiplas etapas:
    - Nome, email (opcional), sexo, classe.
    - Validação de email com domínios específicos.
    - Respostas guiadas e estado de conversa salvo com `state.js`.

- **🛒 Comando `/loja`**
  - Lista itens por tipo (ex: `/loja consumiveis`) direto do banco.
  - Mensagem criada com template visual e organizado em `utils/mensagens/loja.js`.
 
- **📜 Comando `/status`**
  - Mostra atributos do jogador como classe, XP, energia, atributos, etc.
  - Mensagem criada com template visual e organizado em `utils/mensagens/status.js`.

- **✈️ Comando `/viajar [destino]`**
  - Calcula tempo e energia com base em distância no mapa.
  - Mostra confirmação antes de iniciar viagem.
  - Usa middleware (`confirmarViagem.js`) para tratar confirmação do jogador.
  - Viagem registrada no estado do jogador.
  - Mostra descrição do destino ao chegar.
  - Mensagem criada com template visual e organizado em `utils/mensagens/viajar.js`.




---

## 29/06/25 02:23 am - mk/feat/sistemas-jogador-e-mundo

- Adicionei `level` ao modelo jogador no `schema.prisma` que será o level/nivel do jogador.
- Adicionei `sexo` e uma `enum` para `sexo` ao modelo jogador no `schema.prisma` para saber se o player é H/M.
- Novo modelo `Inventario` no `schema.prisma`.
- Novo modelo `Guilda` no `schema.prisma`.
- Novo modelo `Mapa` no `schema.prisma`.
- Adicionei `localizacaoAtual` no modelo `Jogador` e fiz a relação inversa no modelo `Mapa` no `schema.prisma`.
- Nova pasta `mapa/` dentro de `seed/data/` e adicionado 3 locais só pra ter uma ideia inicial.
- Novo arquivo `loadAllMapas.js` em `seed/utils/`.
- Novo arquivo `mapaSeed.js` em `seed/`.
- Movi o arquivo `localTest.js` para a pasta `scripts/` e deletei a pasta `tests` para manter a organização.
- Mudei o nome do arquivo de `localTest.js` para `local-bot.js`.
- Atualizei a tree no documento `PROJETO.md`.
- Atualizei o documento `JOGO.md` para listar os mapas.
- Atualizei o documento `README.md` na raiz do projeto.
- Fiz testes local com o banco: sem erros nos modelos, tudo migrando certinho e populando o banco devidamente.

---

## 28/06/25 17:40 pm - mk/refactor/habilidades-itens-estrutura

- Padronizei todos os arquivos em `/seed/data/habilidades/` para usar `module.exports = {…}` no final de cada arquivo (padrão CommonJS)
- Atualizei todos os arquivos em `/seed/data/habilidades/` para usar só `const` além de `export const` (padrão CommonJS)
- Padronizei todas as `const` para usar `camel_case` (ex: `habilidades_guerreiro`)
- Nova pasta `itens` em `seed/data`
- Todos os arquivos `.js` na pasta `itens` ja segue o padrão acima com `const`, `module.exports` e `camel_case`
- Novo `Model` no arquivo `schema.prisma` para cobrir os `itens`
- Novo arquivo na pasta `seed/` chamado de `itensSeed.js` para popular o banco com os `itens`
- Nova pasta `utils/` em `seed/` 
- Novo arquivo `loadAllItens.js` em `/seed/utils/`, esse arquivo é responsável por fazer o load de todos os `itens` em `itensSeed.js` para evitar encher `itensSeed.js` de imports e também evitar fazer uma `Array` enorme
- Movi o arquivo `seed.js` para a pasta `seed/utils/` para manter a organização
- Atualizei o `package.json` para usar o novo caminho do `seed.js`
- Atualizei o script `prisma-tools.js` para usar `require` seguindo o padrão do `CommonJS`
- Atualizei a tree no documento `PROJETO.md`
- Atualizei o documento `JOGO.md` para listar os itens disponíveis

---

## 28/06/25 12:50 pm - mk/refactor/modularizar-seeds

- Organização dos dados: Separei as habilidades em arquivos individuais dentro da pasta `seed/data/habilidades/` pra deixar o projeto mais modular e fácil de manter.

- Import/export ajeitado: Padronizei os imports dos arquivos `localTest.js`, `classesSeed.js` usando `require` (CommonJS) para evitar conflitos de módulo e problemas com ESModules, já que o projeto não está usando "type": "module".

- Comentários e estrutura: Atualizei os arquivos `PROJETO.md` e `CHANGELOG.md`

---

## 28/06/25 02:00 am - Leonel Miguins - Criação da base do jogo

* Criação da base do jogo ``game/arkevia-rpg.js``
* Remoção "type": "module" do ``package.json``. Eu converti em CommonJS ``handlers/onMessage.js``, utilizando `require()` para importar módulos e `__dirname` para resolver caminhos de arquivos.
* Criação da função/comando  ``/ping`` em ``commands`` para verificar se o bot está rodando os comandos.
* Adicionado a pasta ``/auth`` no arquivo ``.gitignore``.
* Atualização da tree do projeto no documento PROJETO.md

> _28/06/25 09:30 am - commit do mk na branch `leo`, `Criação da base do jogo`_

- Nova dependencia instalada "dotenv": "^17.0.0" para carregar o .env já que estamos usando CommonJS
- O arquivo `seed.js` agora usa require, seguindo o padrão do CommonJS
- Nova pasta tests na raiz com o arquivo localTest.js para fazer testes sem ter que rodar o bot
- Atualizei a tree do projeto no PROJETO.md
- Comentei o arquivo localTest.js com explicações, tudo bonitinho

---

## 27/06/25 22:40 pm - mk/feat/estrutura-inicial-banco-de-dados

* Organização de algumas pastas pra servir o banco
* Modelos no Prisma pra Jogador, Classes e Habilidades, tudo amarradinho e pronto pra usar.
* Modelo Jogador agora tem nome, número de WhatsApp, email, XP, energia, HP, moedas e referência pra classe.
* Classes e habilidades organizadinhas.
* Configuração do Prisma com Postgres pro banco funcionar redondo.
* Migrations criadas do zero, pra deixar tudo no esquema.
* Seed pra já ter as classes e skills no banco, sem precisar criar na mão.
* Atualização da tree do projeto no documento PROJETO.md
