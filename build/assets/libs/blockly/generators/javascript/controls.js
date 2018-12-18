Blockly.JavaScript["controls_moveUp"] = function(block){
    return 'moveUp();';
}

Blockly.JavaScript["controls_moveDown"] = function(block){
    return 'moveDown();';
}

Blockly.JavaScript["controls_moveLeft"] = function(block){
    return 'moveLeft();';
}

Blockly.JavaScript["controls_moveRight"] = function(block){
    return 'moveRight();';
}

Blockly.JavaScript["controls_takeCoin"] = function(block){
    return 'takeCoin();';
}

Blockly.JavaScript["controls_toggleSwitch"] = function(block){
    return 'toggleSwitch();';
}

Blockly.JavaScript['math_number'] = function(block) {
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.JavaScript.ORDER_ATOMIC :
              Blockly.JavaScript.ORDER_UNARY_NEGATION;
  return [code, order];
};

Blockly.JavaScript['controls_moveUpWithParameter'] = function(block) {
    var value_parameter = Blockly.JavaScript.valueToCode(
        block,
        'parameter',
         Blockly.JavaScript.ORDER_ATOMIC
    );

    var code = "moveUp(" + value_parameter + ");";
    return code;
};

Blockly.JavaScript['controls_moveDownWithParameter'] = function(block) {
    var value_parameter = Blockly.JavaScript.valueToCode(
        block,
        'parameter',
         Blockly.JavaScript.ORDER_ATOMIC
    );

    var code = "moveDown(" + value_parameter + ");";
    return code;
};


Blockly.JavaScript['controls_moveLeftWithParameter'] = function(block) {
    var value_parameter = Blockly.JavaScript.valueToCode(
        block,
        'parameter',
         Blockly.JavaScript.ORDER_ATOMIC
    );

    var code = "moveLeft(" + value_parameter + ");";
    return code;
};

Blockly.JavaScript['controls_moveRightWithParameter'] = function(block) {
    var value_parameter = Blockly.JavaScript.valueToCode(
        block,
        'parameter',
         Blockly.JavaScript.ORDER_ATOMIC
    );

    var code = "moveRight(" + value_parameter + ");";
    return code;
};
