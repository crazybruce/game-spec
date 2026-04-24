const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

<<<<<<< ours
const WORLD_WIDTH = 2600;
const GRAVITY = 0.65;

const keys = new Set();
=======
const WORLD_WIDTH = 3200;
const GRAVITY = 0.48;
const MAX_FALL = 15;

const keys = new Set();
let justPressedJump = false;

>>>>>>> theirs
window.addEventListener('keydown', (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
    e.preventDefault();
  }
<<<<<<< ours
  keys.add(e.key.toLowerCase());
=======

  const key = e.key.toLowerCase();
  if ((key === 'w' || key === 'arrowup' || key === ' ') && !keys.has(key)) {
    justPressedJump = true;
  }

  keys.add(key);
>>>>>>> theirs
});
window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));

const state = {
  scene: 'playing',
  cameraX: 0,
<<<<<<< ours
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
=======
  message: '1869年，宝兴山谷。护送戴维穿过险境，寻找关键证据。',
  shotCooldown: 0,
  shake: 0,
  particles: [],
};

const player = {
  x: 80,
  y: 260,
  w: 42,
  h: 66,
  vx: 0,
  vy: 0,
  hp: 7,
  onGround: false,
  facing: 1,
  inv: 0,
  jumpHoldTimer: 0,
  coyoteTimer: 0,
  jumpBufferTimer: 0,
};

const platforms = [
  { x: 0, y: 470, w: 700, h: 70 },
  { x: 760, y: 430, w: 360, h: 110 },
  { x: 1160, y: 470, w: 320, h: 70 },
  { x: 1520, y: 420, w: 340, h: 120 },
  { x: 1900, y: 470, w: 430, h: 70 },
  { x: 2380, y: 430, w: 360, h: 110 },
  { x: 2780, y: 470, w: 460, h: 70 },
];

const enemies = [
  spawnEnemy(500, 420, 3),
  spawnEnemy(980, 380, 3),
  spawnEnemy(1690, 370, 4),
  spawnEnemy(2100, 420, 4),
  spawnEnemy(2460, 380, 5),
];

const boss = {
  x: 2910,
  y: 346,
  w: 140,
  h: 124,
  vx: -1.7,
  hp: 28,
  active: false,
  dead: false,
>>>>>>> theirs
};

let panda = null;

<<<<<<< ours
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
=======
function spawnEnemy(x, y, hp = 3) {
  return {
    x,
    y,
    w: 48,
    h: 54,
    vx: Math.random() > 0.5 ? 1.3 : -1.3,
    hp,
    alive: true,
    roamLeft: x - 170,
    roamRight: x + 170,
  };
}

function createParticle(x, y, color, vx = 0, vy = -1, life = 25, size = 3) {
  state.particles.push({ x, y, color, vx, vy, life, size });
}

function resetGame() {
  player.x = 80;
  player.y = 250;
  player.vx = 0;
  player.vy = 0;
  player.hp = 7;
  player.inv = 0;
  player.jumpHoldTimer = 0;
  player.coyoteTimer = 0;
  player.jumpBufferTimer = 0;

  state.scene = 'playing';
  state.cameraX = 0;
  state.message = '1869年，宝兴山谷。护送戴维穿过险境，寻找关键证据。';
  state.shotCooldown = 0;
  state.shake = 0;
  state.particles.length = 0;

  enemies.splice(0, enemies.length,
    spawnEnemy(500, 420, 3),
    spawnEnemy(980, 380, 3),
    spawnEnemy(1690, 370, 4),
    spawnEnemy(2100, 420, 4),
    spawnEnemy(2460, 380, 5),
  );

  boss.x = 2910;
  boss.y = 346;
  boss.vx = -1.7;
  boss.hp = 28;
>>>>>>> theirs
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

<<<<<<< ours
function landOnPlatform(entity) {
  entity.onGround = false;
=======
function getGroundY(entity) {
  let landed = false;
>>>>>>> theirs
  for (const p of platforms) {
    const wasAbove = entity.y + entity.h <= p.y + Math.max(0, entity.vy);
    const overlapX = entity.x + entity.w > p.x && entity.x < p.x + p.w;
    if (overlapX && wasAbove && entity.y + entity.h + entity.vy >= p.y) {
      entity.y = p.y - entity.h;
      entity.vy = 0;
<<<<<<< ours
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
=======
      landed = true;
      break;
    }
  }
  entity.onGround = landed;
>>>>>>> theirs
}

function hitPlayer(dmg, srcX) {
  if (player.inv > 0 || state.scene !== 'playing') return;
<<<<<<< ours
  player.hp -= dmg;
  player.inv = 45;
  player.vx = srcX < player.x ? 3.4 : -3.4;
  player.vy = -5;

  if (player.hp <= 0) {
    state.scene = 'failed';
    state.message = '你倒下了。按 R 重启，继续守护这段自然史。';
=======

  player.hp -= dmg;
  player.inv = 48;
  player.vx = srcX < player.x ? 4.2 : -4.2;
  player.vy = -7;
  state.shake = 8;

  for (let i = 0; i < 12; i++) {
    createParticle(player.x + player.w / 2, player.y + player.h / 2, '#ff9f7f', (Math.random() - 0.5) * 4, -Math.random() * 2, 20, 3);
  }

  if (player.hp <= 0) {
    state.scene = 'failed';
    state.message = '戴维被击退了。按 R 重开，再试一次。';
>>>>>>> theirs
  }
}

function activateBossIfNeeded() {
<<<<<<< ours
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
=======
  if (!boss.active && player.x > 2670) {
    boss.active = true;
    state.message = '山谷头目出现！击败他，戴维才能见到大熊猫。';
  }
}

function jumpPressed() {
  return keys.has('w') || keys.has('arrowup') || keys.has(' ');
}

function shootPressed() {
  return keys.has('j');
}

function canJumpNow() {
  return player.onGround || player.coyoteTimer > 0;
}

function processJumpPhysics() {
  const pressed = jumpPressed();

  if (justPressedJump) {
    player.jumpBufferTimer = 9;
    justPressedJump = false;
  } else if (player.jumpBufferTimer > 0) {
    player.jumpBufferTimer -= 1;
  }

  if (player.onGround) {
    player.coyoteTimer = 7;
  } else if (player.coyoteTimer > 0) {
    player.coyoteTimer -= 1;
  }

  if (player.jumpBufferTimer > 0 && canJumpNow()) {
    player.vy = -10.8;
    player.onGround = false;
    player.coyoteTimer = 0;
    player.jumpBufferTimer = 0;
    player.jumpHoldTimer = 9;
    createParticle(player.x + player.w / 2, player.y + player.h, '#f6f4cf', 0, -1.5, 15, 2);
  }

  if (!pressed) {
    player.jumpHoldTimer = 0;
  }

  // 可变跳高：按住跳跃键，短时间内减小重力，模拟马里奥手感
  let gravityScale = 1;
  if (player.vy < 0 && player.jumpHoldTimer > 0 && pressed) {
    gravityScale = 0.52;
    player.jumpHoldTimer -= 1;
  } else if (player.vy > 0) {
    gravityScale = 1.35; // 下落更快，响应更利落
  }

  player.vy += GRAVITY * gravityScale;
  player.vy = Math.min(player.vy, MAX_FALL);
}

function processMovePhysics() {
  const left = keys.has('a') || keys.has('arrowleft');
  const right = keys.has('d') || keys.has('arrowright');

  const accel = player.onGround ? 0.85 : 0.5;
  const maxSpeed = player.onGround ? 4.8 : 4.5;
  const friction = player.onGround ? 0.78 : 0.92;

  if (left === right) {
    player.vx *= friction;
    if (Math.abs(player.vx) < 0.08) player.vx = 0;
  } else if (left) {
    player.vx -= accel;
    if (player.vx < -maxSpeed) player.vx = -maxSpeed;
    player.facing = -1;
  } else {
    player.vx += accel;
    if (player.vx > maxSpeed) player.vx = maxSpeed;
    player.facing = 1;
  }
}

function lineHitEntity(x1, y1, x2, y2, entity) {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

  if (entity.x > maxX || entity.x + entity.w < minX || entity.y > maxY || entity.y + entity.h < minY) {
    return false;
  }

  return true;
}

function shootRifle() {
  if (state.shotCooldown > 0) return;
  state.shotCooldown = 16;

  const muzzleX = player.facing > 0 ? player.x + player.w + 2 : player.x - 2;
  const muzzleY = player.y + 28;
  const range = 260;
  const endX = muzzleX + player.facing * range;

  state.shake = 4;
  for (let i = 0; i < 7; i++) {
    createParticle(muzzleX, muzzleY, '#ffeaa7', player.facing * (1 + Math.random() * 2), (Math.random() - 0.5) * 1.4, 10, 2);
  }

  let hit = false;

  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    if (lineHitEntity(muzzleX, muzzleY, endX, muzzleY, enemy)) {
      enemy.hp -= 2;
      enemy.vx += player.facing * 3.5;
      hit = true;
      for (let i = 0; i < 6; i++) {
        createParticle(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, '#ffb199', (Math.random() - 0.5) * 2.4, -Math.random() * 1.2, 14, 2);
      }
      if (enemy.hp <= 0) enemy.alive = false;
      break;
    }
  }

  if (!hit && boss.active && !boss.dead && lineHitEntity(muzzleX, muzzleY, endX, muzzleY, boss)) {
    boss.hp -= 2;
    boss.vx += player.facing * 1.8;
    hit = true;
    for (let i = 0; i < 8; i++) {
      createParticle(boss.x + 30 + Math.random() * 70, boss.y + 30 + Math.random() * 60, '#ffd0a8', (Math.random() - 0.5) * 3, (Math.random() - 0.7) * 2, 18, 3);
    }

    if (boss.hp <= 0) {
      boss.dead = true;
      state.scene = 'victory';
      state.message = '头目被击退！戴维完成记录，大熊猫现身。';
      panda = { x: 2950, y: 340, w: 160, h: 130, timer: 0 };
      state.shake = 16;
    }
  }

  if (!hit) {
    createParticle(endX, muzzleY, '#ffffff', 0, 0, 8, 2);
  }
}

function updateEnemies() {
  for (const enemy of enemies) {
    if (!enemy.alive) continue;

    enemy.x += enemy.vx;
    if (enemy.x < enemy.roamLeft || enemy.x > enemy.roamRight) enemy.vx *= -1;

    if (Math.random() < 0.02) {
      enemy.vx += (player.x - enemy.x) * 0.004;
      enemy.vx = Math.max(-2.4, Math.min(2.4, enemy.vx));
    }
>>>>>>> theirs

    if (rectsCollide(player, enemy)) {
      hitPlayer(1, enemy.x);
    }
  }
<<<<<<< ours

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
=======
}

function updateBoss() {
  if (!boss.active || boss.dead) return;

  boss.x += boss.vx;
  if (boss.x < 2750 || boss.x > 3040) boss.vx *= -1;

  if (Math.random() < 0.04) {
    boss.vx += (player.x - boss.x) * 0.0028;
    boss.vx = Math.max(-2.8, Math.min(2.8, boss.vx));
  }

  if (rectsCollide(player, boss)) {
    hitPlayer(2, boss.x);
  }
}

function updateParticles() {
  for (let i = state.particles.length - 1; i >= 0; i--) {
    const p = state.particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.04;
    p.life -= 1;
    if (p.life <= 0) state.particles.splice(i, 1);
  }
}

function update() {
  if (keys.has('r')) {
    resetGame();
    return;
  }

  if (state.scene !== 'playing') {
    if (panda) panda.timer += 1;
    updateParticles();
    return;
  }

  activateBossIfNeeded();
  processMovePhysics();
  processJumpPhysics();

  player.x += player.vx;
  player.y += player.vy;

  if (player.x < 0) player.x = 0;
  if (player.x + player.w > WORLD_WIDTH) player.x = WORLD_WIDTH - player.w;

  getGroundY(player);

  if (player.y > canvas.height + 160) {
    player.hp = 0;
    state.scene = 'failed';
    state.message = '你坠入山谷。按 R 重新开始。';
  }

  if (player.inv > 0) player.inv -= 1;
  if (state.shotCooldown > 0) state.shotCooldown -= 1;
  if (state.shake > 0) state.shake -= 1;

  if (shootPressed()) {
    shootRifle();
  }

  updateEnemies();
  updateBoss();
  updateParticles();

  if (panda) panda.timer += 1;
>>>>>>> theirs

  state.cameraX = Math.max(0, Math.min(WORLD_WIDTH - canvas.width, player.x - canvas.width * 0.45));
}

<<<<<<< ours
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
=======
function drawMountains(cx) {
  for (let layer = 0; layer < 3; layer++) {
    const parallax = 0.16 + layer * 0.14;
    const baseY = 320 - layer * 55;
    const width = 260 - layer * 20;
    const offset = (cx * parallax) % width;

    for (let i = -1; i < 18; i++) {
      const x = i * width - offset;
      const peak = 115 + (i % 3) * 20 + layer * 8;
      ctx.fillStyle = layer === 0 ? '#5f9f74' : layer === 1 ? '#4b8b62' : '#3f7555';
      ctx.beginPath();
      ctx.moveTo(x, baseY);
      ctx.lineTo(x + width * 0.5, peak);
      ctx.lineTo(x + width, baseY);
      ctx.closePath();
      ctx.fill();
    }
  }
}

function drawClouds(cx) {
  for (let i = 0; i < 10; i++) {
    const speed = 0.08 + (i % 3) * 0.03;
    const x = (i * 260 - (cx * speed) % 280);
    const y = 70 + (i % 4) * 32;
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.arc(x + 24, y - 6, 18, 0, Math.PI * 2);
    ctx.arc(x + 48, y + 2, 20, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBamboo(cx) {
  for (let i = 0; i < 22; i++) {
    const x = i * 155 - (cx * 0.65) % 155;
    const h = 90 + (i % 5) * 18;
    ctx.fillStyle = '#3f8f48';
    ctx.fillRect(x, 470 - h, 9, h);
    ctx.fillStyle = '#8fd18c';
    ctx.fillRect(x + 3, 470 - h, 2, h);

    ctx.fillStyle = '#4aa85a';
    ctx.beginPath();
    ctx.moveTo(x + 9, 420 - (i % 4) * 10);
    ctx.lineTo(x + 30, 410 - (i % 4) * 8);
    ctx.lineTo(x + 14, 432 - (i % 4) * 9);
    ctx.closePath();
    ctx.fill();
  }
}

function drawBackground() {
  const cx = state.cameraX;

  drawClouds(cx);
  drawMountains(cx);

  ctx.fillStyle = '#4d8f4f';
  ctx.fillRect(-cx, 470, WORLD_WIDTH, 70);
  drawBamboo(cx);
}

function drawPlatform(p) {
  const x = p.x - state.cameraX;
  const gradient = ctx.createLinearGradient(0, p.y, 0, p.y + p.h);
  gradient.addColorStop(0, '#8e6136');
  gradient.addColorStop(1, '#573721');
  ctx.fillStyle = gradient;
  ctx.fillRect(x, p.y, p.w, p.h);

  ctx.fillStyle = '#4f9a45';
  ctx.fillRect(x, p.y, p.w, 12);

  for (let i = 0; i < p.w; i += 26) {
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(x + i, p.y + 16, 3, p.h - 16);
  }
>>>>>>> theirs
}

function drawPlayer() {
  const blink = player.inv > 0 && Math.floor(player.inv / 4) % 2 === 0;
  if (blink) return;

  const x = player.x - state.cameraX;
<<<<<<< ours
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(x, player.y + 8, player.w, player.h - 8);
  ctx.fillStyle = '#f5d6c6';
  ctx.fillRect(x + 8, player.y, player.w - 16, 18);

  ctx.fillStyle = '#2b2b2b';
  if (player.facing > 0) {
    ctx.fillRect(x + player.w, player.y + 25, 14, 6);
  } else {
    ctx.fillRect(x - 14, player.y + 25, 14, 6);
=======
  const y = player.y;

  // 帽子和衣服
  ctx.fillStyle = '#8d1f1f';
  ctx.fillRect(x + 6, y + 2, 30, 12);
  ctx.fillStyle = '#d94838';
  ctx.fillRect(x + 3, y + 16, 36, 40);

  // 脸
  ctx.fillStyle = '#f2d2bc';
  ctx.fillRect(x + 11, y + 14, 20, 15);
  ctx.fillStyle = '#272727';
  ctx.fillRect(x + 15, y + 19, 3, 3);
  ctx.fillRect(x + 24, y + 19, 3, 3);

  // 腿
  ctx.fillStyle = '#4b2e1e';
  ctx.fillRect(x + 8, y + 56, 11, 10);
  ctx.fillRect(x + 23, y + 56, 11, 10);

  // 猎枪（明显加长）
  const rifleY = y + 30;
  if (player.facing > 0) {
    ctx.fillStyle = '#4f4f4f';
    ctx.fillRect(x + player.w - 1, rifleY, 35, 4);
    ctx.fillStyle = '#7b5a3a';
    ctx.fillRect(x + player.w - 8, rifleY + 3, 16, 4);
  } else {
    ctx.fillStyle = '#4f4f4f';
    ctx.fillRect(x - 35, rifleY, 35, 4);
    ctx.fillStyle = '#7b5a3a';
    ctx.fillRect(x - 8, rifleY + 3, 16, 4);
>>>>>>> theirs
  }
}

function drawEnemy(enemy) {
  const x = enemy.x - state.cameraX;
<<<<<<< ours
  ctx.fillStyle = '#6f2d2d';
  ctx.fillRect(x, enemy.y, enemy.w, enemy.h);
  ctx.fillStyle = '#f6e58d';
  ctx.fillRect(x + 10, enemy.y + 8, enemy.w - 20, 12);
=======
  const y = enemy.y;

  ctx.fillStyle = '#5a2a2a';
  ctx.fillRect(x, y + 8, enemy.w, enemy.h - 8);
  ctx.fillStyle = '#f2c185';
  ctx.fillRect(x + 10, y, enemy.w - 20, 16);
  ctx.fillStyle = '#2c2c2c';
  ctx.fillRect(x + 8, y + enemy.h - 8, 12, 8);
  ctx.fillRect(x + enemy.w - 20, y + enemy.h - 8, 12, 8);
>>>>>>> theirs
}

function drawBoss() {
  if (!boss.active || boss.dead) return;
<<<<<<< ours
  const x = boss.x - state.cameraX;
  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(x, boss.y, boss.w, boss.h);
  ctx.fillStyle = '#ecf0f1';
  ctx.fillRect(x + 16, boss.y + 16, boss.w - 32, 18);
  ctx.fillStyle = '#e67e22';
  ctx.fillRect(x + 30, boss.y + 52, 60, 20);
=======

  const x = boss.x - state.cameraX;
  const y = boss.y;

  ctx.fillStyle = '#2a3244';
  ctx.fillRect(x, y + 16, boss.w, boss.h - 16);
  ctx.fillStyle = '#e6e6e6';
  ctx.fillRect(x + 18, y, boss.w - 36, 22);
  ctx.fillStyle = '#b5651d';
  ctx.fillRect(x + 30, y + 54, 76, 24);

  ctx.fillStyle = '#111';
  ctx.fillRect(x + 26, y + 28, 8, 8);
  ctx.fillRect(x + boss.w - 34, y + 28, 8, 8);
>>>>>>> theirs
}

function drawPanda() {
  if (!panda) return;
  const x = panda.x - state.cameraX;
<<<<<<< ours
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
=======
  const y = panda.y + Math.sin(panda.timer * 0.08) * 4;

  ctx.fillStyle = '#fff';
  ctx.fillRect(x + 18, y + 20, panda.w - 36, panda.h - 22);
  ctx.fillStyle = '#141414';
  ctx.fillRect(x, y + 24, 34, 38);
  ctx.fillRect(x + panda.w - 34, y + 24, 34, 38);
  ctx.fillRect(x + 30, y + panda.h - 32, 32, 24);
  ctx.fillRect(x + panda.w - 62, y + panda.h - 32, 32, 24);
  ctx.fillRect(x + 48, y + 52, 16, 12);
  ctx.fillRect(x + panda.w - 64, y + 52, 16, 12);

  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(x + 30, y + 26, panda.w - 60, 16);
}

function drawShotLine() {
  if (state.shotCooldown < 13) return;
  const muzzleX = player.facing > 0 ? player.x + player.w + 2 : player.x - 2;
  const muzzleY = player.y + 28;
  const endX = muzzleX + player.facing * 260;

  ctx.strokeStyle = 'rgba(255,252,220,0.9)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(muzzleX - state.cameraX, muzzleY);
  ctx.lineTo(endX - state.cameraX, muzzleY);
  ctx.stroke();
}

function drawParticles() {
  for (const p of state.particles) {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - state.cameraX, p.y, p.size, p.size);
  }
}

function drawHud() {
  ctx.fillStyle = 'rgba(0,0,0,0.46)';
  ctx.fillRect(12, 10, 420, 86);
  ctx.fillStyle = '#ffffff';
  ctx.font = '18px sans-serif';
  ctx.fillText(`生命: ${Math.max(player.hp, 0)} / 7`, 24, 35);
  ctx.fillText(`敌人剩余: ${enemies.filter((e) => e.alive).length}`, 24, 62);

  if (boss.active && !boss.dead) {
    ctx.fillText(`头目HP: ${boss.hp}`, 200, 62);
>>>>>>> theirs
  }

  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(12, canvas.height - 72, canvas.width - 24, 60);
  ctx.fillStyle = '#f8f8f8';
  ctx.font = '20px sans-serif';
  ctx.fillText(state.message, 24, canvas.height - 34);

  if (state.scene === 'victory') {
    ctx.fillStyle = 'rgba(16, 64, 28, 0.72)';
<<<<<<< ours
    ctx.fillRect(180, 150, 600, 220);
    ctx.fillStyle = '#fff9c4';
    ctx.font = '30px sans-serif';
    ctx.fillText('关卡完成！', 390, 205);
    ctx.font = '22px sans-serif';
    ctx.fillText('1869·宝兴：大熊猫被首次科学记录', 245, 250);
    ctx.font = '18px sans-serif';
    ctx.fillText('按 R 可重新体验本关', 365, 295);
=======
    ctx.fillRect(170, 140, 620, 240);
    ctx.fillStyle = '#fff9c4';
    ctx.font = '34px sans-serif';
    ctx.fillText('关卡完成！', 380, 205);
    ctx.font = '22px sans-serif';
    ctx.fillText('1869 · 宝兴：大熊猫被首次科学记录', 235, 252);
    ctx.font = '18px sans-serif';
    ctx.fillText('按 R 可重新体验本关', 365, 298);
>>>>>>> theirs
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
<<<<<<< ours
  ctx.clearRect(0, 0, canvas.width, canvas.height);
=======
  const shakeX = state.shake > 0 ? (Math.random() - 0.5) * state.shake : 0;
  const shakeY = state.shake > 0 ? (Math.random() - 0.5) * state.shake : 0;

  ctx.save();
  ctx.translate(shakeX, shakeY);

  ctx.clearRect(-10, -10, canvas.width + 20, canvas.height + 20);
>>>>>>> theirs
  drawBackground();

  for (const p of platforms) drawPlatform(p);
  for (const enemy of enemies) if (enemy.alive) drawEnemy(enemy);
  drawBoss();
  drawPanda();
  drawPlayer();
<<<<<<< ours

  if (state.attackCooldown > 12) {
    const atk = getAttackBox();
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillRect(atk.x - state.cameraX, atk.y, atk.w, atk.h);
  }

  drawHud();
=======
  drawShotLine();
  drawParticles();
  drawHud();

  ctx.restore();
>>>>>>> theirs
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

resetGame();
gameLoop();
