'use strict'

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks["controls_moveTo"] = {
    init: function(){
        this.jsonInit({
            "message0": "Ir até tenda de %1",
            "colour": 290,
            "previousStatement": null,
            "nextStatement": null,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [["frutas", "FRUITS"], 
                                ["legumes", "VEGS"], 
                                ["verduras", "GREENS"],
                                ["carnes", "MEAT"]]
                }
            ]
        });
    }
};

Blockly.Blocks["controls_hasItem"] = {
    init: function(){
        this.jsonInit({
            "message0": "tenda possui %1",
            "colour": 190,
            "output": "Boolean",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "ITEM",
                    "options": [["couve", "COUVE"],
                                ["cenoura", "CENOURA"]]
                }
            ]
        });
    }
};

Blockly.Blocks["controls_buy"] = {
    init: function(){
        this.jsonInit({
            "message0": "Comprar",
            "colour": 190,
            "previousStatement": null
        });
    }
};