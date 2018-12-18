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

      let moveUpWrapper = function (nTiles) {
        return moveUp(nTiles);
      };

      let moveDownWrapper = function (nTiles) {
        return moveDown(nTiles);
      };

      let moveLeftWrapper = function (nTiles) {
        return moveLeft(nTiles);
      };

      let moveRightWrapper = function (nTiles) {
        return moveRight(nTiles);
      };

      interpreter.setProperty(scope, 'coinValue', coinValue);
      interpreter.setProperty(
        scope,
        'takeCoin',
        interpreter.createNativeFunction(takeCoin)
      );
      interpreter.setProperty(
        scope,
        'moveUp',
        interpreter.createNativeFunction(moveUpWrapper)
      );
      interpreter.setProperty(
        scope,
        'moveDown',
        interpreter.createNativeFunction(moveDownWrapper)
      );
      interpreter.setProperty(
        scope,
        'moveLeft',
        interpreter.createNativeFunction(moveLeftWrapper)
      );
      interpreter.setProperty(
        scope,
        'moveRight',
        interpreter.createNativeFunction(moveRightWrapper)
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
        pidBlockly = window.setTimeout(nextStep, 150);
    }

    nextStep();
  }
  catch (e) {
    console.log(e);
  }
};

var level = [
  [4, 6, 4, 4, 4, 4, 4, 4],
  [4, 5, 5, 5, 5, 5, 5, 4],
  [4, 5, 5, 4, 5, 4, 5, 4],
  [4, 5, 4, 5, 5, 4, 5, 4],
  [4, 5, 5, 5, 4, 5, 5, 4],
  [4, 5, 5, 5, 5, 5, 4, 4],
  [4, 5, 5, 4, 4, 5, 5, 5],
  [4, 4, 4, 4, 4, 4, 4, 4]
];
const MAP_ROWS = level[0].length;
const MAP_COLS = level.length;
const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;
const MAP_WIDTH = TILE_WIDTH * MAP_COLS;
const MAP_HEIGHT = TILE_HEIGHT * MAP_ROWS;

var player;
var playerEnteredATileWithCoin = false;
var isMoving = false;
var isSliding = false;
var destinationX;
var destinationY;
const PLAYER_SPAWN_POINT = { x: 2 * 32 - 16, y: 1 * 32 - 16 };
const PLAYER_END_POINT = { x: 8 * 32 - 16, y: 7 * 32 - 16 };
const PLAYER_SPEED = 120;

var coins;
var coinStack = [];
var coinValue;
const COINS_POS = [
  { x: 5 * 32 - 16, y: 4 * 32 - 16 },
  { x: 3 * 32 - 16, y: 6 * 32 - 16 },
  { x: 6 * 32 - 16, y: 7 * 32 - 16 }
];
var playerMoney;
var playerMoneyLabel;

var destination;

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

function hasPlayerWon() {
  return (coinsCollected == COINS_POS.length)
    && (player.x == PLAYER_END_POINT.x)
    && (player.y == PLAYER_SPAWN_POINT.y);
}

function win() {
  player.anims.play('celebrate', true);

  setHelperText(
    "Parabéns!"
  );
}

function isPlayerAt(x, y) {
  return player.x === x && player.y === y;
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

function takeCoin() {
  let coinNumber = 0;
  coins.children.iterate(function (child) {
    child.x = COINS_POS[coinNumber].x;
    child.y = COINS_POS[coinNumber].y;

    if (isPlayerAt(child.x, child.y)) {
      child.disableBody(true, true);
      playerMoney += coinValue;
      playerMoneyLabel.setText("$" + playerMoney);
      atributeCoinValue();
    }

    coinNumber++;
  });
}

function atributeCoinValue() {
  coinValue = coinStack.pop();
}

function generateCoinValueStack() {
  for (let i = 0; i < COINS_POS.length; i++)
    coinStack[i] = 5;

  for (let i = 0; i < 4; i++) {
    let pos = Phaser.Math.Between(0, COINS_POS.length);

    while (coinStack[pos] === 10)
      pos = Phaser.Math.Between(0, COINS_POS.length)

    coinStack[pos] = 10;
  }

  console.log(coinStack);
}

function reset() {
  window.clearTimeout(pidBlockly);

  player.setVelocity(0, 0);
  player.x = PLAYER_SPAWN_POINT.x;
  player.y = PLAYER_SPAWN_POINT.y;
  player.anims.play('turn', true);

  spawnCoins();
  generateCoinValueStack();
  atributeCoinValue();
  playerMoney = 0;
  playerMoneyLabel.setText('$0');
}

function onPlayerCollideWithLayer(player, layer) {
  window.clearTimeout(pidBlockly);
  window.setTimeout(reset, 400);
}

function moveUp(nTiles = 0) {
  if (!isNaturalNumber(nTiles)) {
    alert(`${nTiles} não é ℕ*`);
    reset();
    return;
  }

  destinationX = player.x;
  destinationY = player.y - TILE_HEIGHT * nTiles;
  isMoving = true;

  player.setVelocityY(-PLAYER_SPEED);
  player.anims.play('up', true);
}

function moveDown(nTiles = 0) {
  if (!isNaturalNumber(nTiles)) {
    alert(`${nTiles} não é ℕ*`);
    reset();
    return;
  }

  destinationX = player.x;
  destinationY = player.y + TILE_HEIGHT * nTiles;
  isMoving = true;

  player.setVelocityY(PLAYER_SPEED);
  player.anims.play('down', true);
}

function moveLeft(nTiles = 0) {
  if (!isNaturalNumber(nTiles)) {
    alert(`${nTiles} não é ℕ*`);
    reset();
    return;
  }

  destinationX = player.x - TILE_WIDTH * nTiles;
  destinationY = player.y;
  isMoving = true;

  player.setVelocityX(-PLAYER_SPEED);
  player.anims.play('left', true);
}

function moveRight(nTiles = 0) {
  if (!isNaturalNumber(nTiles)) {
    alert(`${nTiles} não é ℕ*`);
    reset();
    return;
  }

  destinationX = player.x + TILE_WIDTH * nTiles;
  destinationY = player.y;
  isMoving = true;

  player.setVelocityX(PLAYER_SPEED);
  player.anims.play('right', true);
}

function isNaturalNumber(number) {
  return number > 0 && Math.floor(number) == number;
}

function preload() {
  this.load.image('level', '/assets/tiles/icy.png');
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
  generateCoinValueStack();
  atributeCoinValue();

  const map = this.make.tilemap({
    data: level,
    tileWidth: TILE_WIDTH,
    tileHeight: TILE_HEIGHT
  });

  const tiles = map.addTilesetImage('level');
  const layer = map.createStaticLayer(0, tiles, 0, 0);
  layer.setCollision(0);

  coins = this.physics.add.group({
    key: 'coin',
    repeat: COINS_POS.length - 1
  });

  spawnCoins();

  playerMoneyLabel = this.add.text(
    190,
    0,
    '$0',
    { fontSize: '36px', fill: '#F6FF00' }
  );

  playerMoneyLabel.setStroke("#000000", 2);

  player = this.physics.add.sprite(
    PLAYER_SPAWN_POINT.x,
    PLAYER_SPAWN_POINT.y,
    'dude'
  );

  player.setCollideWorldBounds(true);

  this.physics.add.collider(
    player,
    layer,
    onPlayerCollideWithLayer,
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
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'char', frame: 1 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('char', { start: 6, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('char', { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('char', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'celebrate',
    frames: this.anims.generateFrameNumbers('char', { start: 0, end: 9 }),
    frameRate: 18,
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

  destination.anims.play('point', true);
  coins.playAnimation('rotate', true);
  player.anims.play('turn', true);

  setHelperText(
    "Neste desafio você precisa utilizar o bloco \"se\" para resolver o seguinte problema:<br>"
    + "Você precisa coletar apenas as moedas que tem o valor 10. Mas você não "
    + "sabe quais são essas moedas.<br><br>"
    + "Observe que o bloco \"se\" precisa se encaixar com o outro bloco azul: "
    + "\"Valor da moeda\""
  );
}

function update() {
  if (
    (isMoving)
    && (player.x === destinationX)
    && (player.y === destinationY)
  ) {
    isMoving = false;
    player.setVelocity(0, 0);
    player.anims.play('turn', true);
  }
}
