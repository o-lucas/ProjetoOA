Blockly.Python["controls_moveUp"] = function(block){
    return 'moveUp()\n';
}

Blockly.Python["controls_moveDown"] = function(block){
    return 'moveDown()\n';
}

Blockly.Python["controls_moveLeft"] = function(block){
    return 'moveLeft()\n';
}

Blockly.Python["controls_moveRight"] = function(block){
    return 'moveRight()\n';
}

Blockly.Python["controls_takeCoin"] = function(block){
    return 'takeCoin()\n';
}

Blockly.Python["controls_toggleSwitch"] = function(block){
    return 'toggleSwitch()\n';
}

Blockly.Python['math_number'] = function(block) {
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.JavaScript.ORDER_ATOMIC :
              Blockly.JavaScript.ORDER_UNARY_NEGATION;
  return [code, order];
};

Blockly.Python["controls_moveUpWithParameter"] = function(block){
    var value_parameter = Blockly.JavaScript.valueToCode(
        block,
        'parameter',
         Blockly.JavaScript.ORDER_ATOMIC
    );

    var code = "moveUp(" + value_parameter + ")\n";
    return code;
}

Blockly.Python["controls_moveDownWithParameter"] = function(block){
    var value_parameter = Blockly.JavaScript.valueToCode(
        block,
        'parameter',
         Blockly.JavaScript.ORDER_ATOMIC
    );

    var code = "moveDown(" + value_parameter + ")\n";
    return code;
}


Blockly.Python["controls_moveLeftWithParameter"] = function(block){
    var value_parameter = Blockly.JavaScript.valueToCode(
        block,
        'parameter',
         Blockly.JavaScript.ORDER_ATOMIC
    );

    var code = "moveLeft(" + value_parameter + ")\n";
    return code;
}


Blockly.Python["controls_moveRightWithParameter"] = function(block){
    var value_parameter = Blockly.JavaScript.valueToCode(
        block,
        'parameter',
         Blockly.JavaScript.ORDER_ATOMIC
    );

    var code = "moveRight(" + value_parameter + ")\n";
    return code;
}

