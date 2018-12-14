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
        'moveTo',
        interpreter.createNativeFunction(moveTo)
      );

      interpreter.setProperty(
        scope,
        'hasItem',
        interpreter.createNativeFunction(hasItem)
      );

      interpreter.setProperty(
        scope,
        'buy',
        interpreter.createNativeFunction(buy)
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
        window.setTimeout(nextStep, 50);
    }

    nextStep();
  }
  catch (e) {
    console.log(e.message);
  }
};

const PLAYER_SPAWN_POINT = { x: 80, y: 48 };

var config = {
  type: Phaser.AUTO,
  width: document.getElementById("gameDiv").offsetWidth,
  height: document.getElementById("gameDiv").offsetHeight / 2,
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

var player;
var currentStall;
var currentItem;
var cart = [];

var destX = PLAYER_SPAWN_POINT.x;
var destY = PLAYER_SPAWN_POINT.y;

var game = new Phaser.Game(config);

var dest = {};

function preload() {
  this.load.spritesheet(
    'char',
    '../../assets/char.png',
    { frameWidth: 32, frameHeight: 32 }
  );
  this.load.image('market', 'assets/market.png');
  this.load.image('hills', 'assets/hills.png');
  this.load.tilemapTiledJSON('map', 'assets/map.json');
}

function create() {
  const map = this.make.tilemap({ key: 'map' });

  var market = map.addTilesetImage('market', 'market');
  var hills = map.addTilesetImage('hills', 'hills');

  var terrain = map.createStaticLayer('Terrain', hills);
  var objects = map.createStaticLayer('Objects', market);
  var food = map.createStaticLayer('Food', market);

  this.cameras.main.setZoom(.55);
  this.cameras.main.centerOn(terrain.width / 2, terrain.height / 2);

  player = this.physics.add.sprite(
    PLAYER_SPAWN_POINT.x,
    PLAYER_SPAWN_POINT.y,
    'dude'
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

  player.anims.play('turn', true);
}

function setHelperText(text) {
  document.getElementById('helper-text').innerHTML = text;
}

function hasPlayerWon() {
  // TODO
  return false;
}

function win() {
  setHelperText(":)))");
  alert('!!!');
}

function reset() {
  player.x = PLAYER_SPAWN_POINT.x;
  player.y = PLAYER_SPAWN_POINT.y;
  destX = null;
  destY = null;
  setHelperText(`Depois de solucionar quebra-cabeças e deslizar no gelo, agora o nosso amigo vai usar as moedas coletadas para fazer as compras! <br>
      Ele precisa de carne e cenoura para o jantar. <br>
      Você consegue ajudá-lo?`)
  player.anims.play('turn', true);
}

function moveTo(where) {
  switch (where) {
    case "FRUTAS":
      destX = 415;
      destY = 450;
      break;
    case "CARNES":
      destX = 125;
      destY = 450;
      break;
    case "LEGUMES":
      destX = 410;
      destY = 150;
      break;
    case "VERDURAS":
      destX = 650;
      destY = 180;
      break;
  }
  console.log(`Mover até ${where}`);
  currentStall = where;
}

function hasItem(item) {
  if (currentStall == null) {
    setHelperText(`Que tal ir até a tenda e perguntar ao vendedor se tem o que você procura?`);
    return;
  }
  switch (item) {
    case "COUVE":
      if (currentStall == "VERDURAS") {
        currentItem = item;
        return true;
      }
      else {
        setHelperText(`Parece que você está procurando ${item} na banca de ${currentStall}`);
      }
      break;
    case "CARNE":
      if (currentStall == "CARNES") {
        currentItem = item;
        return true;
      } else {
        setHelperText(`Parece que você está procurando ${item} na banca de ${currentStall}`);
      }
    default:
      setHelperText(`Hmmm.. acho que nosso amigo não precisa de ${item} no momento. Apenas COUVE e CARNE.`);
      currentItem = null;
      currentStall = null;
  }
}

function buy() {
  if (currentItem == null) {
    setHelperText("Você precisa ver se o vendedor tem o item na banca antes de tentar comprá-lo.");
    return;
  }

  cart.push(currentItem);
}

function update(time, delta) {
  if (cart.includes("COUVE")) {
    win();
    game.destroy();
  }

  if (destX == null || destY == null)
    return;

  let s = .5 * delta;
  var x;
  var y;
  if (s < Phaser.Math.Distance.Between(player.x, player.y, destX, destY)) {
    var d = s / Phaser.Math.Distance.Between(player.x, player.y, destX, destY);
    x = Phaser.Math.Linear(player.x, destX, d);
    y = Phaser.Math.Linear(player.y, destY, d);
  } else {
    x = destX;
    y = destY;
  }
  player.setPosition(x, y);
}
