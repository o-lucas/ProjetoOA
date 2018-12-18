'use strict'

goog.require('Blockly.Blocks');

Blockly.Blocks["logic_boolean"] = {
    init: function(){
        this.jsonInit({
            "type": "logic_boolean",
            "message0": "%1",
            "args0": [
              {
                "type": "field_dropdown",
                "name": "bool",
                "options": [
                  ["true", "true"],
                  ["false", "false"]
                ]
              }
            ],
            "output": "Boolean",
            "colour": "%{BKY_LOGIC_HUE}",
            "tooltip": "%{BKY_LOGIC_BOOLEAN_TOOLTIP}",
            "helpUrl": "%{BKY_LOGIC_BOOLEAN_HELPURL}"
        });
    }
}

Blockly.Blocks["logic_if"] = {
    init: function(){
        this.jsonInit({
            "type": "controls_if",
            "message0": "se %1",
            "args0": [
                {
                    "type": "input_value",
                    "check": "Boolean",
                    "name": "if_condition"
                }
            ],
            "message1": "%1",
            "args1": [
                {
                    "type": "input_statement",
                    "name": "if_statements"
                }
            ],
			"message2": "fim se",
            "nextStatement": null,
            "previousStatement": null,
            "colour": 255,
            "tooltip": "Tomada de decisão",
            "helpUrl": "wwww.insiraajudaaqui.com"
        });
    }
}

Blockly.Blocks["logic_if_else"] = {
    init: function(){
        this.jsonInit({
            "type": "controls_if",
            "message0": "se %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "if_condition",
                    "check": "Boolean"
                }
            ],
            "message1": "%1",
            "args1": [
                {
                    "type": "input_statement",
                    "name": "if_statements"
                }
            ],
            "message2": "senão %1",
            "args2": [
                {
                    "type": "input_statement",
                    "name": "else_statements"
                }
            ],
			"message3": "fim se",
            "nextStatement": null,
            "previousStatement": null,
            "colour": 255,
            "tooltip": "Tomada de decisão",
            "helpUrl": "wwww.insiraajudaaqui.com"
        });
    }
}
