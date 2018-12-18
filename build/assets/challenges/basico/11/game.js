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
        'goHome',
        interpreter.createNativeFunction(goHome)
      );

      interpreter.setProperty(
        scope,
        'highlightBlock',
        interpreter.createNativeFunction(blockHighlightWrapper)
      );

    };

    let interpreter = new Interpreter(code, initFunc);

    console.log(interpreter);

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
var price = 0.0;
var vitamins = 0;

var destX = PLAYER_SPAWN_POINT.x;
var destY = PLAYER_SPAWN_POINT.y;

var game = new Phaser.Game(config);

var buyAnim;

function preload() {
  this.load.spritesheet(
    'char',
    '/assets/tiles/char.png',
    { frameWidth: 32, frameHeight: 32 }
  );
  this.load.image('market', '/assets/challenges/basico/11/assets/market.png');
  this.load.image('hills', '/assets/challenges/basico/11/assets/hills.png');
  this.load.tilemapTiledJSON('map', '/assets/challenges/basico/11/assets/map.json');
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
    key: 'turn',
    frames: [{ key: 'char', frame: 1 }],
    frameRate: 20
  });

  player.anims.play('turn', true);

  setHelperText(`Olha ele nas compras novamente!
      Mas como ele gastou muitas moedas na última compra, agora ele está economizando.
      Agora ele precisa fazer um almoço saudável com <b>VERDURAS</b> e <b>LEGUMES</b>, gastando o mínimo possível, e que, ao mesmo tempo, forneça pelo menos <b>50</b> de vitaminas.`);

  var label = this.add.text(this.sys.canvas.width, 150, "$", { fill: '#ffc700', fontSize: '96px' });
  label.visible = false;

  var labelTween = this.tweens.add({
    targets: label,
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    y: {
      getStart: () => 500,
      getEnd: () => 0
    },
    alpha: {
      getStart: () => 100,
      getEnd: () => 0
    }
  });

  buyAnim = function () {
    label.visible = true;
    console.log(labelTween);
    labelTween.restart();
  };
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
  setHelperText(`Olha ele nas compras novamente!
      Mas como ele gastou muitas moedas na última compra, agora ele está economizando.
      Agora ele precisa fazer um almoço saudável com <b>VERDURAS</b> e <b>LEGUMES</b>, gastando o mínimo possível, e que, ao mesmo tempo, forneça pelo menos <b>50</b> de vitaminas.`)
  player.anims.play('turn', true);
}

function goHome() {
  if (vitamins < 50) {
    setHelperText("Você não alcançou a quantidade de vitaminas!");
    return;
  }

  if (price > 2.1) {
    setHelperText("Hmmmm.. eu acho que você consegue economizar mais.");
    return;
  }

  win();
}

function showInfo() {
  alert(`Preços e Informações nutricionais
------\n\n
Verduras
------
Couve - R$ 1.00 - 10 vitaminas
Alface - R$ 1.20 - 20 vitaminas
Espinafre - R$ 1.10 - 30 vitaminas\n\n
Legumes
------
Cenoura - R$ 0.80 - 15 vitaminas
Batata - R$ 1.00 - 20 vitaminas
Feijão - R$ 1.00 - 25 vitaminas`);
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
    case "ALFACE":
    case "ESPINAFRE":
      if (currentStall == "VERDURAS") {
        currentItem = item;
        return true;
      }
      else {
        setHelperText(`Parece que você está procurando ${item} na banca de ${currentStall}`);
      }
      break;
    case "CENOURA":
    case "BATATA":
    case "FEIJAO":
      if (currentStall == "LEGUMES") {
        currentItem = item;
        return true;
      } else {
        setHelperText(`Parece que você está procurando ${item} na banca de ${currentStall}`);
      }
      break;
    default:
      setHelperText(`Hmmm.. acho que nosso amigo não precisa de ${item} no momento. Apenas LEGUMES e VERDURAS.`);
      currentItem = null;
      currentStall = null;
  }
}

function getItemAttr(item) {
  switch (item) {
    case "COUVE":
      return { price: 1.0, vitamin: 10 };
    case "ALFACE":
      return { price: 1.2, vitamin: 20 };
    case "ESPINAFRE":
      return { price: 1.1, vitamin: 30 };
    case "CENOURA":
      return { price: .8, vitamin: 15 };
    case "BATATA":
      return { price: 1.0, vitamin: 20 };
    case "FEIJAO":
      return { price: 1.0, vitamin: 25 };
  }
}

function buy() {
  if (currentItem == null) {
    setHelperText("Você precisa ver se o vendedor tem o item na banca antes de tentar comprá-lo.");
    return;
  }

  buyAnim();
  //Definir objetos pra facilitar o gerenciamento disso
  let attr = getItemAttr(currentItem);
  price += attr.price;
  vitamins += attr.vitamin;
  cart.push(currentItem);
}

function update(time, delta) {
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