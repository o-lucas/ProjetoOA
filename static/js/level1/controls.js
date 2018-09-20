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