var pidBlockly;
document.getElementById("runGame").onclick = function () {
  try {
    reset();

    // A cada execução de um bloco, chama highlightBlock(idDoBloco)
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');

    let code = Blockly.JavaScript.workspaceToCode(workspace);

    // https://neil.fraser.name/software/JS-Interpreter/docs.html
    var initFunc = function (interpreter, scope) {
      let blockHighlightWrapper = function (id) {
        return workspace.highlightBlock(id);
      };
      interpreter.setProperty(
        scope,
        'moveUp',
        interpreter.createNativeFunction(moveUp)
      );
      interpreter.setProperty(
        scope,
        'moveDown',
        interpreter.createNativeFunction(moveDown)
      );
      interpreter.setProperty(
        scope,
        'moveLeft',
        interpreter.createNativeFunction(moveLeft)
      );
      interpreter.setProperty(
        scope,
        'moveRight',
        interpreter.createNativeFunction(moveRight)
      );
      interpreter.setProperty(
        scope,
        'toggleSwitch',
        interpreter.createNativeFunction(toggleSwitch)
      );
      interpreter.setProperty(
        scope,
        'highlightBlock',
        interpreter.createNativeFunction(blockHighlightWrapper)
      );
    };

    let interpreter = new Interpreter(code, initFunc);

    function nextStep() {
      if (interpreter.step())
        pidBlockly = window.setTimeout(nextStep, 140);
    }

    nextStep();
  }
  catch (e) {
    console.log(e);
  }
};

let level = [
  [8, 4, 8, 8, 8, 8, 8, 8, 4],
  [8, 8, 4, 8, 8, 8, 4, 8, 4],
  [8, 8, 8, 8, 4, 8, 8, 8, 4],
  [8, 8, 8, 8, 8, 4, 8, 8, 4],
  [8, 8, 8, 4, 8, 8, 8, 8, 4],
  [4, 8, 8, 8, 4, 8, 8, 4, 4],
  [8, 8, 8, 8, 8, 8, 8, 8, 4],
  [4, 8, 8, 8, 8, 8, 4, 4, 4]
];

const MAP_ROWS = level.length;
const MAP_COLS = level[0].length;

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

const MAP_WIDTH = TILE_WIDTH * MAP_COLS;
const MAP_HEIGHT = TILE_HEIGHT * MAP_ROWS;

var player;
var coinsCollected;
var collectedArchivementCoin = false;
var direction;
var isMoving = false;
var isSliding = false;
var destinationX;
var destinationY;
const PLAYER_SPAWN_POINT = { x: 1 * 32 - 16, y: 1 * 32 - 16 };
const PLAYER_END_POINT = { x: 8 * 32 - 16, y: 5 * 32 - 16 };
const PLAYER_SPEED = 120;
const PLAYER_DIRECTION = { UP: 1, DOWN: 2, LEFT: 3, RIGHT: 4 };

var coins;
var archivementCoin;
const ARCHIVEMENT_COIN_POS = { x: 5 * 32 - 16, y: 5 * 32 - 16 };
const COINS_POS = [
  { x: 4 * 32 - 16, y: 2 * 32 - 16 },
  { x: 3 * 32 - 16, y: 3 * 32 - 16 },
  { x: 8 * 32 - 16, y: 3 * 32 - 16 },
  { x: 7 * 32 - 16, y: 4 * 32 - 16 },
  { x: 2 * 32 - 16, y: 5 * 32 - 16 },
  { x: 7 * 32 - 16, y: 6 * 32 - 16 },
  { x: 6 * 32 - 16, y: 8 * 32 - 16 }
];
const COINS_NEEDED_TO_TOGGLE_SWITCH = 5;
const COINS_NEEDED_TO_WIN = 4;

var destination;

var wallSwitch;
var wallSwitchState = false;
const WALL_SWITCH_POS = { x: 3 * 32 - 16, y: 1 * 32 - 16 };
const WALL_SWITCH_TOGGLEABLE_POS = { x: 4 * 32 - 16, y: 1 * 32 - 16 };

var activableWalls;
const ACTIVABLE_WALLS_POS = [
  { x: 5 * 32 - 16, y: 4 * 32 - 16 },
  { x: 6 * 32 - 16, y: 5 * 32 - 16 }
];

var config = {
  type: Phaser.AUTO,
  width: MAP_WIDTH,
  height: MAP_HEIGHT,
  parent: "game",
  physics: {
    default: "arcade",
    gravity: { y: 0 },
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function setHelperText(text) {
  document.getElementById('helper-text').innerHTML = text;
}

function isPlayerAtPoint(point) {
  return player.x === point.x && player.y === point.y;
}

function isPlayerAtXY(xPos, yPos) {
  return player.x === xPos && player.y === yPos;
}

function hasPlayerWon() {
  return coinsCollected >= COINS_NEEDED_TO_WIN && isPlayerAtPoint(PLAYER_END_POINT);
}

function win() {
  player.anims.play('celebrate', true);

  setHelperText(
    "Parabéns!<br>"
    + ((collectedArchivementCoin) ? "Você desbloqueou uma conquista!<br>" : "")
    + "<hr>"
    + "<button class=\"helperButton\""
    +          "onclick=\"window.location.href='/desafios/basico/6'\">"
    +   "Próximo desafio"
    + "</button>"
  );
}

function spawnCoins() {
  let coinNumber = 0;
  coins.children.iterate(function (child) {
    child.x = COINS_POS[coinNumber].x;
    child.y = COINS_POS[coinNumber].y;
    child.enableBody(true, child.x, child.y, true, true);
    coinNumber++;
  });
}

function activateWalls() {
  let activableWallNumber = 0;
  activableWalls.children.iterate(function (child) {
    child.x = ACTIVABLE_WALLS_POS[activableWallNumber].x;
    child.y = ACTIVABLE_WALLS_POS[activableWallNumber].y;
    child.enableBody(true, child.x, child.y, true, true);
    activableWallNumber++;
  });
}

function deactivateWalls() {
  let activableWallNumber = 0;
  activableWalls.children.iterate(function (child) {
    child.x = ACTIVABLE_WALLS_POS[activableWallNumber].x;
    child.y = ACTIVABLE_WALLS_POS[activableWallNumber].y;
    child.disableBody(true, true);
    activableWallNumber++;
  });
}

function reset(msg = undefined) {
  window.clearTimeout(pidBlockly);

  player.setVelocity(0, 0);
  player.x = PLAYER_SPAWN_POINT.x;
  player.y = PLAYER_SPAWN_POINT.y;
  player.anims.play('turn', true);

  spawnCoins();
  collectedArchivementCoin = false;
  archivementCoin.enableBody(true, archivementCoin.x, archivementCoin.y, true, true);
  archivementCoin.anims.play('rotatered', true);
  coins.playAnimation('rotate', true);
  coinsCollected = 0;

  activateWalls();
  wallSwitch.anims.play('switchoff', true);
  wallSwitchState = false;

  if (msg !== undefined)
    alert(msg);
}

function onPlayerCollideWithCoin(player, coin) {
  coin.disableBody(true, true);
  coinsCollected++;

  if (coinsCollected === COINS_POS.length) {
    wallSwitch.anims.play('switchoff', true);
    deactivateWalls();
    wallSwitchState = false;
  }
}

function onPlayerCollideWithLayer(player, layer) {
  player.anims.play('turn', true);
  player.setVelocity(0, 0);
  if (hasPlayerWon())
    win();
}

function onPlayerCollideWithActivableWall(player, activableWall) {
  player.anims.play('turn', true);
  player.setVelocity(0, 0);
}

function onPlayerCollideWithWallSwitch(player, wallSwitch) {
  player.anims.play('turn', true);
  player.setVelocity(0, 0);
}

function onPlayerCollideWithArchivementCoin(player, archivementCoin) {
  archivementCoin.disableBody(true, true);
  collectedArchivementCoin = true;
}

function toggleSwitch() {
  if ((isPlayerAtPoint(WALL_SWITCH_TOGGLEABLE_POS)) && (coinsCollected >= COINS_NEEDED_TO_TOGGLE_SWITCH)) {
    player.anims.play('left', true);

    if (wallSwitchState) {
      wallSwitch.anims.play('switchoff', true);
      activateWalls();
      wallSwitchState = false;
    }
    else {
      wallSwitch.anims.play('switchon', true);
      deactivateWalls();
      wallSwitchState = true;
    }
  }
  else {
    reset();
    alert('Você precisa estar ao próximo a alavanca para puxá-la e ter no mínimo 5 moedas.');
  }
}

function moveUp() {
  let playerXPosInLevelMatrix = ((player.x + 16) / 32) - 1;
  let playerYPosInLevelMatrix = ((player.y + 16) / 32) - 1;

  if (level[playerYPosInLevelMatrix - 1][playerXPosInLevelMatrix] === 4) {
    reset('Você não pode ser mover para uma parede.');
  }
  else {
    destinationX = player.x;
    destinationY = player.y - TILE_HEIGHT;
    isMoving = true;

    player.setVelocityY(-PLAYER_SPEED);
    player.anims.play('up', true);

    direction = PLAYER_DIRECTION.UP;
  }
}

function moveDown() {
  let playerXPosInLevelMatrix = ((player.x + 16) / 32) - 1;
  let playerYPosInLevelMatrix = ((player.y + 16) / 32) - 1;

  if (level[playerYPosInLevelMatrix + 1][playerXPosInLevelMatrix] === 4) {
    reset('Você não pode ser mover para uma parede.');
  }
  else {
    destinationX = player.x;
    destinationY = player.y + TILE_HEIGHT;
    isMoving = true;

    player.setVelocityY(PLAYER_SPEED);
    player.anims.play('down', true);

    direction = PLAYER_DIRECTION.DOWN;
  }
}

function moveLeft() {
  let playerXPosInLevelMatrix = ((player.x + 16) / 32) - 1;
  let playerYPosInLevelMatrix = ((player.y + 16) / 32) - 1;

  if (level[playerYPosInLevelMatrix][playerXPosInLevelMatrix - 1] === 4) {
    reset('Você não pode ser mover para uma parede.');
  }
  else {
    destinationX = player.x - TILE_WIDTH;
    destinationY = player.y;
    isMoving = true;

    player.setVelocityX(-PLAYER_SPEED);
    player.anims.play('left', true);

    direction = PLAYER_DIRECTION.LEFT;
  }
}

function moveRight() {
  let playerXPosInLevelMatrix = ((player.x + 16) / 32) - 1;
  let playerYPosInLevelMatrix = ((player.y + 16) / 32) - 1;

  if (level[playerYPosInLevelMatrix][playerXPosInLevelMatrix + 1] === 4) {
    reset('Você não pode ser mover para uma parede.');
  }
  else {
    destinationX = player.x + TILE_WIDTH;
    destinationY = player.y;
    isMoving = true;

    player.setVelocityX(PLAYER_SPEED);
    player.anims.play('right', true);

    direction = PLAYER_DIRECTION.RIGHT;
  }
}

function preload() {
  this.load.image('level', '/assets/tiles/icy.png');
  this.load.image('activableWall', '/assets/tiles/icyfakewall.png');
  this.load.spritesheet(
    'switch',
    '/assets/tiles/switch.png',
    { frameWidth: TILE_WIDTH, frameHeight: TILE_HEIGHT }
  );
  this.load.spritesheet(
    'redcoin',
    '/assets/tiles/redcoin.png',
    { frameWidth: TILE_WIDTH, frameHeight: TILE_HEIGHT }
  );
  this.load.spritesheet(
    'coin',
    '/assets/tiles/coin.png',
    { frameWidth: TILE_WIDTH, frameHeight: TILE_HEIGHT }
  );
  this.load.spritesheet(
    'destination',
    '/assets/tiles/destination.png',
    { frameWidth: TILE_WIDTH, frameHeight: TILE_HEIGHT }
  );
  this.load.spritesheet(
    'char',
    '/assets/tiles/char.png',
    { frameWidth: TILE_WIDTH, frameHeight: TILE_HEIGHT }
  );
}

function create() {
  const map = this.make.tilemap({
    data: level,
    tileWidth: TILE_WIDTH,
    tileHeight: TILE_HEIGHT
  });

  const tiles = map.addTilesetImage('level');
  const layer = map.createStaticLayer(0, tiles, 0, 0);
  layer.setCollision(0);
  layer.setCollision(4);

  wallSwitch = this.physics.add.staticSprite(
    WALL_SWITCH_POS.x,
    WALL_SWITCH_POS.y,
    'switch'
  );

  activableWalls = this.physics.add.staticGroup({
    key: 'activableWall',
    repeat: ACTIVABLE_WALLS_POS.length - 1
  });

  coins = this.physics.add.group({
    key: 'coin',
    repeat: COINS_POS.length - 1
  });

  archivementCoin = this.physics.add.sprite(
    ARCHIVEMENT_COIN_POS.x,
    ARCHIVEMENT_COIN_POS.y,
    'redcoin'
  );

  spawnCoins();

  player = this.physics.add.sprite(
    PLAYER_SPAWN_POINT.x,
    PLAYER_SPAWN_POINT.y,
    'dude'
  );

  player.setCollideWorldBounds(true);

  this.physics.add.collider(
    player,
    wallSwitch,
    onPlayerCollideWithWallSwitch,
    null,
    this
  );

  this.physics.add.collider(
    player,
    activableWalls,
    onPlayerCollideWithActivableWall,
    null,
    this
  );

  this.physics.add.collider(
    player,
    layer,
    onPlayerCollideWithLayer,
    null,
    this
  );

  this.physics.add.overlap(
    player,
    coins,
    onPlayerCollideWithCoin,
    null,
    this
  );

  this.physics.add.overlap(
    player,
    archivementCoin,
    onPlayerCollideWithArchivementCoin,
    null,
    this
  );

  destination = this.physics.add.sprite(
    PLAYER_END_POINT.x,
    PLAYER_END_POINT.y,
    'destination'
  );

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('char', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: 1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'char', frame: 1 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('char', { start: 6, end: 7 }),
    frameRate: 10,
    repeat: 1
  });

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('char', { start: 9, end: 10 }),
    frameRate: 10,
    repeat: 1
  });

  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('char', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: 3
  });

  this.anims.create({
    key: 'celebrate',
    frames: this.anims.generateFrameNumbers('char', { start: 0, end: 9 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'point',
    frames: this.anims.generateFrameNumbers('destination', { start: 0, end: 7 }),
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: 'rotate',
    frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'rotatered',
    frames: this.anims.generateFrameNumbers('redcoin', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'switchon',
    frames: this.anims.generateFrameNumbers('switch', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: 0
  });

  this.anims.create({
    key: 'switchoff',
    frames: this.anims.generateFrameNumbers('switch', { start: 0, end: 0 }),
    frameRate: 10,
    repeat: 0
  });

  destination.anims.play('point', true);
  coins.playAnimation('rotate', true);
  archivementCoin.anims.play('rotatered', true);
  player.anims.play('turn', true);

  activateWalls();

  setHelperText(
    'Cuidado, o chão parece ser escorregadio...<br>'
    + 'Colete no mínimo 4 moedas e vá para o destino. '
    + 'Mas há uma alavanca ali que só pode ser alternada com no mínimo '
    + '5 moedas.<br>' 
    + 'Há uma conquista neste desafio...'
  );
}

function update() {
}
