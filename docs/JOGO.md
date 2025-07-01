# Comandos:

## !create — Criar personagem

🔒 Validações:
❗ Checar se o comando foi enviado em chat privado.

📛 Verificar se o jogador já possui conta (por número ou email).

🛠️ Fluxo:
Perguntar: “Qual o seu nome, guerreiro?”

(Opcional) Perguntar: “Quer cadastrar seu email? (pode pular com pular)"

Criar personagem no banco de dados com atributos padrão:

## !home - 

🔒 Validações:
❗ Checar se o comando foi enviado em chat privado.

* é um comando de tipo menu que mostra todas as ações disponiveis em home:
(aqui tambem o usuario podera apagar sua conta !delete acount)

## !status — Ver status do personagem

🔒 Validações:
Checar se o usuário tem conta.

checa se o usuario não esta respondendo a mensagem de outro jogador ou mecionando com @
(nesse caso o status exibido e o do jogador alvo)

🛠️ Retornar uma ficha formatada:

````
🧍 Nome: Leo
🏅 Nível: 1 | XP: 0/100
❤️ HP: 100/100 | ⚡ Energia: 100/100
🪙 Moedas: 0

🔪 Arma: Espada Matadora de Dragões
🛡️ Elmo: Elmo Sagrado
````

🎒 Digite !inventario para gerenciar seu equipamento.

## !treinar — Treinar atributos (gastar energia por XP)
🔒 Validações:
Conta existente

O menu com varios tipos de treinamento, para atributos especificos:
Exemplo:

!treno treino_com_espadas

🛠️ Lógica:
Gasta 20 energia
Ganha 10 XP

!precisa ter um limite de uso (exemplo, diario)


## !store — Loja de itens, armas e poções

🛠️ Exibe itens, armas, disponíveis:


````
╠══𖠁𖥤 *MERCADO DE ARKEVIA*

 👤 Aventureiro: *ISABELLA*            
 💰 Ouro: *3750 moedas* 

╠══𖠁𖥤 *COMANDOS:*    
                                      
 ⚔️ */store arma list*
 ↳ _"Espadas, machados e arcos forjados nas chamas de Eldorath"_

 🧪 */store porcao list*
 ↳ _"Poções místicas preparadas pela bruxa do bosque"_

 🎁 */store item list*
 ↳  _"Relíquias e bugigangas do mercado negro de Ark’Tar"_

 ↳ 🚪 */store exit*
 
╠══𖠁𖥤

````
### Sub-comandos de /store

* /store armas list
* /store porcoes list
* /store item list
* /buy armas ``id``
* /buy porcao ``id``
* /buy item ``id``
* /vender armas ``id``
* /vender porcoes ``id``
* /vender item ``id``

### Comandos relacionadas:

* /inventario


## !missões — Lista de missões disponíveis

🛠️ Retorno:

📜 Missões Atuais:

1. Derrotar 3 Slimes (Recompensa: 15 XP, 10 moedas)
2. Levar a carta ao Ferreiro (Recompensa: 1 Poção de Vida)

Essas missões teram duração de tempo, ou seja, até terminar o jogador não podera entrar em outra missão.

Use: !aceitar 1

## !quest — Lista de quest disponíveis

### qual a diferença das quests pras missões?

As quest são muito mais bem trabalhadas e com  foco e narrativa mais extensa e historia mais envolvente.

é o unico lugar onde você pode adiquirir armas raras ou uma habilidade fora da sua arvore de habilidade.


🛠️ Retorno:

📜 Missões Atuais:

1. Jornada ao reino proibido

Use: !aceitar 1

## 🎒 Inventário de Leo:

1. Poção de Vida x2
2. Elmo Sagrado (não equipado)
3. Espada Matadora de Dragões (equipada)

Comandos:
!usar 1 | !equipar 2 | !desequipar espada
!evoluir item


## !clã - Sistema de clãs (guildas)

No criação de personagem, o jogador poderá escolher entre 3 clãs pré-definidos

vantage dos buffs (pequenos), bonus de acordo com desempenho do clã

!cla members - mostra a lista com todos os jogadores no clã

!cla info - todas as informações do cla

!cla top - rank com os jogadores (ranqueados por xp) do clã

!cla power - Poder total do clã (a soma de todos as conquistas de todos os membros)


# Mecanicas:


## Dano Base (atacar):

Dano = ATK - (DEF / 2)

## Ação: Defender

Quando o jogador escolhe defender em seu turno, ele sacrifica o ataque para ganhar um bônus defensivo temporário:

📌 Efeito:

``Durante 1 turno, a DEF do jogador é dobrada.``

✅ Fórmula com defesa ativa:


````js
DanoRecebido = ATKinimigo - (DEFjogador * 2) / 2

````

Que simplifica para:

````js
DanoRecebido = ATKinimigo - DEFjogador
````

Ou seja, ao se defender, todo o valor da sua defesa é aplicado direto contra o ataque.


* Defender consome 0 energia (padrão)

* Não pode esquivar enquanto defende 

* Não acumula com outros bônus de defesa

## Fórmula de Miss (Esquiva):

Antes de aplicar o dano, rola chance de esquiva:

````js

Math.random() * 100 < agilidadeDoAlvo / 2

````

### Exemplo completo de combate:

| Leo (ATK: 20, DEF: 10, AGI: 12)
| Inimigo (ATK: 18, DEF: 8, AGI: 9)



Leo ataca primeiro (AGI 12 > 9)

Verifica esquiva do inimigo → 9 / 2 = 4.5% ``(não esquivou)``

Calcula dano:

20 - (8 / 2) = 16 de dano

Verifica crítico: 12 / 3 = 4% de chance (não deu crítico)

Inimigo leva 16 de dano.

# Possivel menu na batalha:


``Informações do jogador / inimigo``


* !atacar 
* !defender 
* !use hab1, hab2, hab3
* !use item/porção


# Lista de Debuffs Comuns

Envenenado	Perde X de HP por turno.	3 turnos

Sangrando	Perde HP por turno (mais fraco que veneno).	2 turnos

Atordoado	Perde o turno (não pode atacar ou defender).	1 turno

Enfraquecido	Reduz ATK em 30%.	2 turnos

Lentidão	Reduz AGI em 50%, pode perder a vez.	2 turnos

Maldição Sombria	Não pode ser curado enquanto durar.	3 turnos

Silenciado	Não pode usar habilidades.	2 turnos

Cegueira	50% de chance de errar o ataque.	2 turnos

# Itens do jogo

```bash

# seed/data/itens/globais/
pergaminho_tp.js    ← pergaminho que da TP pelo mapa
pote_mana.js        ← pote de mana
pote_vida.js		← pode de vida

# seed/data/itens/guerreiro/
...

# seed/data/itens/mago/
...

# seed/data/itens/arqueiro/
...

# seed/data/itens/cavaleiro/
...

# seed/data/itens/druida/
...

# seed/data/itens/elementista/
...

# seed/data/itens/ladino/
...

# seed/data/itens/monge/
...

# seed/data/itens/necromante/
...

# seed/data/itens/paladino/
...

```

---

# Mapas do jogo

```bash

# seed/data/mapa/
caverna_esquecida.js ← mapa inicial para ter uma ideia
floresta_sombria.js  ← mapa inicial para ter uma ideia
vilarejo_inicial.js  ← mapa inicial para ter uma ideia

```


