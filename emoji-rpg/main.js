const player = {
  level: 1,
  maxHealth: 10,
  health: 10,
  attack: 2,
  defense: 1,
  gold: 0,
};

const enemies = [
  { emoji: "👹", health: 5, attack: 1 },
  { emoji: "👺", health: 8, attack: 2 },
  { emoji: "👻", health: 12, attack: 3 },
  { emoji: "🧟", health: 18, attack: 4 },
  { emoji: "🐉", health: 25, attack: 6 },
];

let currentEnemy = null;

const playerLevelEl = document.getElementById("player-level");
const playerHealthEl = document.getElementById("player-health");
const playerAttackEl = document.getElementById("player-attack");
const playerDefenseEl = document.getElementById("player-defense");
const playerGoldEl = document.getElementById("player-gold");

const enemyEmojiEl = document.getElementById("enemy-emoji");
const enemyHealthEl = document.getElementById("enemy-health");

const gameLogEl = document.getElementById("game-log");
const attackBtn = document.getElementById("attack-btn");
const healBtn = document.getElementById("heal-btn");

function log(message) {
  const p = document.createElement("p");
  p.textContent = message;
  gameLogEl.appendChild(p);
  gameLogEl.scrollTop = gameLogEl.scrollHeight;
}

function updateUI() {
  playerLevelEl.textContent = player.level;
  playerHealthEl.textContent = player.health;
  playerAttackEl.textContent = player.attack;
  playerDefenseEl.textContent = player.defense;
  playerGoldEl.textContent = player.gold;

  if (currentEnemy) {
    enemyEmojiEl.textContent = currentEnemy.emoji;
    enemyHealthEl.textContent = currentEnemy.health;
  } else {
    enemyEmojiEl.textContent = "❓";
    enemyHealthEl.textContent = "-";
  }
}

function spawnEnemy() {
  const enemyIndex = Math.min(player.level - 1, enemies.length - 1);
  const baseEnemy = enemies[enemyIndex];
  currentEnemy = {
    emoji: baseEnemy.emoji,
    health: baseEnemy.health + player.level * 2,
    attack: baseEnemy.attack + Math.floor(player.level / 2),
  };
  log(`Um ${currentEnemy.emoji} selvagem aparece!`);
  updateUI();
}

function playerAttack() {
  if (!currentEnemy) {
  log("Nenhum inimigo para atacar.");
    return;
  }
  const damage = Math.max(player.attack - 0, 1);
  currentEnemy.health -= damage;
  log(`Você ataca ${currentEnemy.emoji} causando ${damage} de dano.`);
  if (currentEnemy.health <= 0) {
  log(`Você derrotou ${currentEnemy.emoji}!`);
    player.gold += player.level * 5;
    levelUp();
    spawnEnemy();
  } else {
    enemyAttack();
  }
  updateUI();
}

function enemyAttack() {
  const damage = Math.max(currentEnemy.attack - player.defense, 1);
  player.health -= damage;
  log(`${currentEnemy.emoji} ataca você causando ${damage} de dano.`);
  if (player.health <= 0) {
  log("Você foi derrotado! Fim de jogo.");
    attackBtn.disabled = true;
    healBtn.disabled = true;
  }
  updateUI();
}

function heal() {
  if (player.gold < 5) {
  log("Ouro insuficiente para curar. Você precisa de 5 de ouro.");
    return;
  }
  player.gold -= 5;
  const healAmount = Math.min(player.maxHealth - player.health, 10);
  player.health += healAmount;
  log(`Você se curou em ${healAmount} de vida.`);
  enemyAttack();
  updateUI();
}

function levelUp() {
  player.level++;
  player.maxHealth += 5;
  player.health = player.maxHealth;
  player.attack += 2;
  player.defense += 1;
  log("Você subiu de nível! Atributos aumentados.");
}

function startGame() {
  log("Bem-vindo ao Emoji RPG! Derrote inimigos e suba de nível.");
  spawnEnemy();
  updateUI();
}

attackBtn.addEventListener("click", playerAttack);
healBtn.addEventListener("click", heal);

startGame();
