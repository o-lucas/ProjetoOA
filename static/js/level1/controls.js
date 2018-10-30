'use strict'

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks["controls_moveUp"] = {
    init: function(){
        this.jsonInit({
            "message0": "Mover para cima",
            "previousStatement": null,
            "nextStatement": null,
            "colour": 290,
            "tooltip": "Move o jogador para um bloco acima"
        });
    }
};

Blockly.Blocks["controls_moveDown"] = {
    init: function(){
        this.jsonInit({
            "message0": "Mover para baixo",
            "previousStatement": null,
            "nextStatement": null,
            "colour": 290,
            "tooltip": "Move o jogador para um bloco abaixo"
        });
    }
};

Blockly.Blocks["controls_moveLeft"] = {
    init: function(){
        this.jsonInit({
            "message0": "Mover para esquerda",
            "previousStatement": null,
            "nextStatement": null,
            "colour": 290,
            "tooltip": "Move o jogador para um bloco para a esquerda"
        });
    }
};

Blockly.Blocks["controls_moveRight"] = {
    init: function(){
        this.jsonInit({
            "message0": "Mover para direita",
            "previousStatement": null,
            "nextStatement": null,
            "colour": 290,
            "tooltip": "Move o jogador para um bloco a direita"
        });
    }
};

Blockly.Blocks["controls_takeCoin"] = {
    init: function(){
        this.jsonInit({
            "message0": "Pegar moeda",
            "previousStatement": null,
            "nextStatement": null,
            "colour": 290,
            "tooltip": "Pega a moeda abaixo do personagem."
        });
    }
};

Blockly.Blocks["math_number"] = {
    init: function() {
        this.jsonInit({
            "type": "number",
            "message0": "%1",
            "args0": [{
              "type": "field_number",
              "name": "NUM",
              "value": 0
            }],
            "output": "number",
            "colour": "#d20000",
            "tooltip": "Número para inserir em outros blocos",
            "helpUrl": "",
        });
    }
}

Blockly.Blocks["controls_moveUpWithParameter"] = {
    init: function() {
        this.jsonInit({
            "type": "moveUpWithParameter",
            "message0": "Mover para cima %1",
            "previousStatement": null,
            "nextStatement": null,
            "args0": [
              {
                "type": "input_value",
                "name": "parameter",
                "check": "number"
              }
            ],
            "colour": 290,
            "tooltip": "Move o personagem N passos para cima",
            "helpUrl": ""
        });
    }
};

Blockly.Blocks["controls_moveDownWithParameter"] = {
    init: function() {
        this.jsonInit({
            "type": "moveDownWithParameter",
            "message0": "Mover para baixo %1",
            "previousStatement": null,
            "nextStatement": null,
            "args0": [
              {
                "type": "input_value",
                "name": "parameter",
                "check": "number"
              }
            ],
            "colour": 290,
            "tooltip": "Move o personagem N passos para baixo",
            "helpUrl": ""
        });
    }
};

Blockly.Blocks["controls_moveLeftWithParameter"] = {
    init: function() {
        this.jsonInit({
            "type": "moveLeftWithParameter",
            "message0": "Mover para esquerda %1",
            "previousStatement": null,
            "nextStatement": null,
            "args0": [
              {
                "type": "input_value",
                "name": "parameter",
                "check": "number"
              }
            ],
            "colour": 290,
            "tooltip": "Move o personagem N passos para esquerda",
            "helpUrl": ""
        });
    }
};

Blockly.Blocks["controls_moveRightWithParameter"] = {
    init: function() {
        this.jsonInit({
            "type": "moveRightWithParameter",
            "message0": "Mover para direita %1",
            "previousStatement": null,
            "nextStatement": null,
            "args0": [
              {
                "type": "input_value",
                "name": "parameter",
                "check": "number"
              }
            ],
            "colour": 290,
            "tooltip": "Move o personagem N passos para direita",
            "helpUrl": ""
        });
    }
};

Blockly.Blocks["controls_toggleSwitch"] = {
    init: function() {
        this.jsonInit({
            "type": "toggleSwitch",
            "message0": "Alternar alavanca",
            "previousStatement": null,
            "nextStatement": null,
            "colour": 290,
            "tooltip": "Alterna a alavanca se esta estiver na frente do personagem",
            "helpUrl": ""
        });
    }
};
