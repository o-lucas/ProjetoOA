document.getElementById("runGame").onclick = function () {
  try {
    reset();

    // A cada execução de um bloco, chama highlightBlock(idDoBloco)
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');

    let code = Blockly.JavaScript.workspaceToCode(workspace);

    // https://neil.fraser.name/software/JS-Interpreter/docs.html
    var initFunc = function (interpreter, scope) {
      blockHighlightWrapper = function (id) {
        return workspace.highlightBlock(id);
      }

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
        'highlightBlock',
        interpreter.createNativeFunction(blockHighlightWrapper)
      );
    };

    let interpreter = new Interpreter(code, initFunc);

    function nextStep() {
      if (interpreter.step())
        pidBlockly = window.setTimeout(nextStep, 50);
    }

    nextStep();
  }
  catch (e) {
    console.log(e);
  }
};
const level = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const MAP_ROWS = level.length;
const MAP_COLS = level[0].length;

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

let tileManager = new TileManager(level, TILE_WIDTH, TILE_HEIGHT);

const MAP_WIDTH = TILE_WIDTH * MAP_COLS;
const MAP_HEIGHT = TILE_HEIGHT * MAP_ROWS;

const PLAYER_SPAWN_POINT = tileManager.convertXYToTilePoint(2, 2);
const PLAYER_END_POINT = tileManager.convertXYToTilePoint(8, 4);
const PLAYER_SPEED = 120;

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

var pidBlockly;

var player;
var isMoving = false;
var destinationX;
var destinationY;
var destination;

var game = new Phaser.Game(config);

function setHelperText(text) {
  document.getElementById('helper-text').innerHTML = text;
}

function hasPlayerWon() {
  return player.x == PLAYER_END_POINT.x && player.y == PLAYER_END_POINT.y;
}

function win() {
  setHelperText(
    "Parabéns! \"A paciência é uma virtude\" :D<br>"
    + "Dica: Quando você estiver programando e pensar: "
    + "\"Deve ter um jeito mais produtivo de implementar isso\" é "
    + "porque provavelmente tem!<br><hr>"
    + "<button class=\"helperButton\""
    +          "onclick=\"window.location.href='/desafios/basico/3'\">"
    +   "Próximo desafio"
    + "</button>"
  );

  player.anims.play('celebrate', true);
}

function reset() {
  window.clearTimeout(pidBlockly);

  player.x = PLAYER_SPAWN_POINT.x;
  player.y = PLAYER_SPAWN_POINT.y;
  player.anims.play('turn', true);
}

function onPlayerCollideWithLayer(player, layer) {
  window.setTimeout(reset, 400);
}

function moveUp() {
  destinationX = player.x;
  destinationY = player.y - TILE_HEIGHT;
  isMoving = true;

  player.setVelocityY(-PLAYER_SPEED);
  player.anims.play('up', true);
}

function moveDown() {
  destinationX = player.x;
  destinationY = player.y + TILE_HEIGHT;
  isMoving = true;

  player.setVelocityY(PLAYER_SPEED);

  player.anims.play('down', true);
}

function moveLeft() {
  destinationX = player.x - TILE_WIDTH;
  destinationY = player.y;
  isMoving = true;

  player.setVelocityX(-PLAYER_SPEED);
  player.anims.play('left', true);
}

function moveRight() {
  destinationX = player.x + TILE_WIDTH;
  destinationY = player.y;
  isMoving = true;

  player.setVelocityX(PLAYER_SPEED);
  player.anims.play('right', true);
}

function preload() {
  this.load.image('level', '/assets/tiles/forest.png');
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

  player.anims.play('turn', true);

  setHelperText(
    "Um algoritmo é uma sequência de passos à serem seguidos. "
    + "Por isso, não deve-se pular etapas! Tenha paciência e elabore "
    + "o seu passo a passo para levar o personagem da<br> origem ao destino. "
    + "Mas no próximo desafio te ensinarei algo para facilitar a sua vida."
  );
}

function update() {
  if (
    (isMoving)
    && (player.x == destinationX)
    && (player.y == destinationY)
  ) {
    player.setVelocity(0, 0);
    isMoving = false;

    if (hasPlayerWon())
      win();
  }

  destination.anims.play('point', true);
}
