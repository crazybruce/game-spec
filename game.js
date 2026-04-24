const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const WORLD_WIDTH = 2600;
const GRAVITY = 0.65;

const keys = new Set();
window.addEventListener('keydown', (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
    e.preventDefault();
  }
  keys.add(e.key.toLowerCase());
});
window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));

const state = {
  scene: 'playing',
  cameraX: 0,
  attackCooldown: 0,
  message: '1869年，宝兴山谷。击退阻挠者，守护线索。',
};

const player = {
  x: 60,
  y: 0,
  w: 42,
  h: 64,
  vx: 0,
  vy: 0,
  hp: 6,
  onGround: false,
  facing: 1,
  inv: 0,
};

const platforms = [
  { x: 0, y: 470, w: 850, h: 70 },
  { x: 920, y: 420, w: 300, h: 120 },
  { x: 1260, y: 470, w: 380, h: 70 },
  { x: 1680, y: 430, w: 320, h: 110 },
  { x: 2020, y: 470, w: 580, h: 70 },
];

const enemies = [
  spawnEnemy(540, 420, '阻挠者'),
  spawnEnemy(1120, 370, '阻挠者'),
  spawnEnemy(1760, 380, '阻挠者'),
];

const boss = {
  x: 2320,
  y: 360,
  w: 120,
  h: 110,
  vx: -1.8,
  hp: 16,
  active: false,
  dead: false,
  name: '山谷头目',
};

let panda = null;

function spawnEnemy(x, y, name) {
  return {
    x,
    y,
    w: 46,
    h: 50,
    vx: Math.random() > 0.5 ? 1.2 : -1.2,
    hp: 3,
    alive: true,
    name,
    swing: 0,
  };
}

function resetGame() {
  player.x = 60;
  player.y = 300;
  player.vx = 0;
  player.vy = 0;
  player.hp = 6;
  player.inv = 0;
  state.scene = 'playing';
  state.cameraX = 0;
  state.attackCooldown = 0;
  state.message = '1869年，宝兴山谷。击退阻挠者，守护线索。';

  enemies.splice(0, enemies.length,
    spawnEnemy(540, 420, '阻挠者'),
    spawnEnemy(1120, 370, '阻挠者'),
    spawnEnemy(1760, 380, '阻挠者')
  );

  boss.x = 2320;
  boss.y = 360;
  boss.vx = -1.8;
  boss.hp = 16;
  boss.active = false;
  boss.dead = false;
  panda = null;
}

function rectsCollide(a, b) {
  return a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y;
}

function landOnPlatform(entity) {
  entity.onGround = false;
  for (const p of platforms) {
    const wasAbove = entity.y + entity.h <= p.y + Math.max(0, entity.vy);
    const overlapX = entity.x + entity.w > p.x && entity.x < p.x + p.w;
    if (overlapX && wasAbove && entity.y + entity.h + entity.vy >= p.y) {
      entity.y = p.y - entity.h;
      entity.vy = 0;
      entity.onGround = true;
      return;
    }
  }
}

function getAttackBox() {
  const reach = 42;
  return {
    x: player.facing > 0 ? player.x + player.w : player.x - reach,
    y: player.y + 12,
    w: reach,
    h: 36,
  };
}

function hitPlayer(dmg, srcX) {
  if (player.inv > 0 || state.scene !== 'playing') return;
  player.hp -= dmg;
  player.inv = 45;
  player.vx = srcX < player.x ? 3.4 : -3.4;
  player.vy = -5;

  if (player.hp <= 0) {
    state.scene = 'failed';
    state.message = '你倒下了。按 R 重启，继续守护这段自然史。';
  }
}

function activateBossIfNeeded() {
  if (!boss.active && player.x > 2060) {
    boss.active = true;
    state.message = '头目现身！击败他，才能见证真正的主角。';
  }
}

function update() {
  if (keys.has('r')) {
    resetGame();
    return;
  }

  if (state.scene !== 'playing') return;

  activateBossIfNeeded();

  const moveLeft = keys.has('a') || keys.has('arrowleft');
  const moveRight = keys.has('d') || keys.has('arrowright');
  const jump = keys.has('w') || keys.has('arrowup') || keys.has(' ');
  const attack = keys.has('j');

  if (moveLeft === moveRight) {
    player.vx *= 0.8;
  } else if (moveLeft) {
    player.vx = -3.8;
    player.facing = -1;
  } else if (moveRight) {
    player.vx = 3.8;
    player.facing = 1;
  }

  if (jump && player.onGround) {
    player.vy = -11.5;
    player.onGround = false;
  }

  player.vy += GRAVITY;
  player.x += player.vx;
  player.y += player.vy;

  if (player.x < 0) player.x = 0;
  if (player.x + player.w > WORLD_WIDTH) player.x = WORLD_WIDTH - player.w;

  landOnPlatform(player);

  if (player.y > canvas.height + 120) {
    player.hp = 0;
    state.scene = 'failed';
    state.message = '你坠入山谷。按 R 重新开始。';
  }

  if (player.inv > 0) player.inv -= 1;
  if (state.attackCooldown > 0) state.attackCooldown -= 1;

  if (attack && state.attackCooldown === 0) {
    state.attackCooldown = 18;
    const atk = getAttackBox();

    for (const enemy of enemies) {
      if (enemy.alive && rectsCollide(atk, enemy)) {
        enemy.hp -= 1;
        enemy.vx = player.facing * 2.6;
        if (enemy.hp <= 0) enemy.alive = false;
      }
    }

    if (boss.active && !boss.dead && rectsCollide(atk, boss)) {
      boss.hp -= 1;
      boss.vx = player.facing * 2.1;
      if (boss.hp <= 0) {
        boss.dead = true;
        state.scene = 'victory';
        state.message = '阻碍消散。阿尔芒·戴维终于得以科学记录大熊猫。';
        panda = {
          x: 2420,
          y: 338,
          w: 130,
          h: 132,
          timer: 0,
        };
      }
    }
  }

  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    enemy.swing += 0.03;
    enemy.x += enemy.vx;

    const minX = enemy.x < 1000 ? 440 : enemy.x < 1600 ? 1030 : 1685;
    const maxX = enemy.x < 1000 ? 820 : enemy.x < 1600 ? 1570 : 1980;
    if (enemy.x < minX || enemy.x > maxX) enemy.vx *= -1;

    if (rectsCollide(player, enemy)) {
      hitPlayer(1, enemy.x);
    }
  }

  if (boss.active && !boss.dead) {
    boss.x += boss.vx;
    if (boss.x < 2140 || boss.x > 2460) boss.vx *= -1;

    if (Math.random() < 0.03) {
      boss.vx += (player.x - boss.x) * 0.002;
    }

    if (rectsCollide(player, boss)) {
      hitPlayer(2, boss.x);
    }
  }

  if (panda) {
    panda.timer += 1;
  }

  state.cameraX = Math.max(0, Math.min(WORLD_WIDTH - canvas.width, player.x - canvas.width * 0.45));
}

function drawBackground() {
  const cx = state.cameraX;

  for (let i = 0; i < 14; i++) {
    const mx = i * 240 - (cx * 0.35) % 240;
    ctx.fillStyle = '#4c8f5a';
    ctx.beginPath();
    ctx.moveTo(mx, 360);
    ctx.lineTo(mx + 120, 190);
    ctx.lineTo(mx + 240, 360);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = '#396f45';
  ctx.fillRect(-cx, 470, WORLD_WIDTH, 70);

  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  for (let i = 0; i < 20; i++) {
    const bx = (i * 130 - (cx * 0.65) % 130);
    ctx.beginPath();
    ctx.moveTo(bx, 160 + (i % 5) * 6);
    ctx.lineTo(bx + 26, 280 + (i % 7) * 4);
    ctx.stroke();
  }
}

function drawPlatform(p) {
  ctx.fillStyle = '#734d2a';
  ctx.fillRect(p.x - state.cameraX, p.y, p.w, p.h);
  ctx.fillStyle = '#4f8f3b';
  ctx.fillRect(p.x - state.cameraX, p.y, p.w, 12);
}

function drawPlayer() {
  const blink = player.inv > 0 && Math.floor(player.inv / 4) % 2 === 0;
  if (blink) return;

  const x = player.x - state.cameraX;
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(x, player.y + 8, player.w, player.h - 8);
  ctx.fillStyle = '#f5d6c6';
  ctx.fillRect(x + 8, player.y, player.w - 16, 18);

  ctx.fillStyle = '#2b2b2b';
  if (player.facing > 0) {
    ctx.fillRect(x + player.w, player.y + 25, 14, 6);
  } else {
    ctx.fillRect(x - 14, player.y + 25, 14, 6);
  }
}

function drawEnemy(enemy) {
  const x = enemy.x - state.cameraX;
  ctx.fillStyle = '#6f2d2d';
  ctx.fillRect(x, enemy.y, enemy.w, enemy.h);
  ctx.fillStyle = '#f6e58d';
  ctx.fillRect(x + 10, enemy.y + 8, enemy.w - 20, 12);
}

function drawBoss() {
  if (!boss.active || boss.dead) return;
  const x = boss.x - state.cameraX;
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(x, boss.y, boss.w, boss.h);
  ctx.fillStyle = '#ecf0f1';
  ctx.fillRect(x + 16, boss.y + 16, boss.w - 32, 18);
  ctx.fillStyle = '#e67e22';
  ctx.fillRect(x + 30, boss.y + 52, 60, 20);
}

function drawPanda() {
  if (!panda) return;
  const x = panda.x - state.cameraX;
  const bounce = Math.sin(panda.timer * 0.08) * 4;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 15, panda.y + 20 + bounce, panda.w - 30, panda.h - 20);
  ctx.fillStyle = '#101010';
  ctx.fillRect(x, panda.y + 28 + bounce, 30, 36);
  ctx.fillRect(x + panda.w - 30, panda.y + 28 + bounce, 30, 36);
  ctx.fillRect(x + 24, panda.y + panda.h - 32 + bounce, 32, 24);
  ctx.fillRect(x + panda.w - 56, panda.y + panda.h - 32 + bounce, 32, 24);
  ctx.fillRect(x + 42, panda.y + 45 + bounce, 16, 12);
  ctx.fillRect(x + panda.w - 58, panda.y + 45 + bounce, 16, 12);
}

function drawHud() {
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(12, 10, 350, 74);
  ctx.fillStyle = '#ffffff';
  ctx.font = '18px sans-serif';
  ctx.fillText(`生命: ${Math.max(player.hp, 0)} / 6`, 24, 34);

  const foesLeft = enemies.filter((e) => e.alive).length;
  ctx.fillText(`阻挠者剩余: ${foesLeft}`, 24, 58);

  if (boss.active && !boss.dead) {
    ctx.fillText(`头目HP: ${boss.hp}`, 190, 58);
  }

  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(12, canvas.height - 72, canvas.width - 24, 60);
  ctx.fillStyle = '#f8f8f8';
  ctx.font = '20px sans-serif';
  ctx.fillText(state.message, 24, canvas.height - 34);

  if (state.scene === 'victory') {
    ctx.fillStyle = 'rgba(16, 64, 28, 0.72)';
    ctx.fillRect(180, 150, 600, 220);
    ctx.fillStyle = '#fff9c4';
    ctx.font = '30px sans-serif';
    ctx.fillText('关卡完成！', 390, 205);
    ctx.font = '22px sans-serif';
    ctx.fillText('1869·宝兴：大熊猫被首次科学记录', 245, 250);
    ctx.font = '18px sans-serif';
    ctx.fillText('按 R 可重新体验本关', 365, 295);
  }

  if (state.scene === 'failed') {
    ctx.fillStyle = 'rgba(90, 20, 20, 0.68)';
    ctx.fillRect(220, 170, 520, 170);
    ctx.fillStyle = '#ffe5e5';
    ctx.font = '30px sans-serif';
    ctx.fillText('挑战失败', 410, 230);
    ctx.font = '20px sans-serif';
    ctx.fillText('按 R 重新开始', 420, 275);
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  for (const p of platforms) drawPlatform(p);
  for (const enemy of enemies) if (enemy.alive) drawEnemy(enemy);
  drawBoss();
  drawPanda();
  drawPlayer();

  if (state.attackCooldown > 12) {
    const atk = getAttackBox();
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillRect(atk.x - state.cameraX, atk.y, atk.w, atk.h);
  }

  drawHud();
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

resetGame();
gameLoop();
