'use strict'

goog.require('Blockly.Blocks');

Blockly.Blocks["variable_coinValue"] = {
    init: function(){
        this.jsonInit({
            "type": "variable",
            "message0": "Valor da moeda",
            "output": "variable",
            "colour": "#d20000",
            "tooltip": "Variável que contém o valor de uma moeda",
            "helpUrl": "",
        });
    }
}
