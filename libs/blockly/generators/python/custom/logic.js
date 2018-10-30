'use strict';


Blockly.Python['logic_boolean'] = function(block) {
    var code = block.getFieldValue('bool');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['logic_if'] = function(block) {
    let code;
    let ifCondition;
    let ifCode;

    ifCondition = Blockly.Python.valueToCode(
        block,
        'if_condition',
        Blockly.Python.ORDER_NONE
    );

    ifCode = Blockly.Python.statementToCode(block, 'if_statements');
    code = 'if ' + ifCondition + ':\n' + ifCode + '\n';

    return code;
}

Blockly.Python['logic_if_else'] = function(block) {
    let code;
    let ifCondition;
    let ifCode;
    let elseCode;

    ifCondition = Blockly.Python.valueToCode(
        block,
        'if_condition',
        Blockly.Python.ORDER_NONE
    );
    ifCode = Blockly.Python.statementToCode(block, 'if_statements');
    code = 'if ' + ifCondition + ':\n' + ifCode + '\n';

    elseCode = Blockly.Python.statementToCode(block, 'else_statements');
    if(elseCode)
        code += 'else:\n' + elseCode + '\n';

    return code;
}

Blockly.Python['logic_variable_equals_number'] = function(block) {
    var order = Blockly.Python.ORDER_RELATIONAL;
    var argument0 = Blockly.Python.valueToCode(block, 'variable', order) || '0';
    var argument1 = Blockly.Python.valueToCode(block, 'number', order) || '0';
    var code = argument0 + ' == ' + argument1;

    return [code, order];
}

Blockly.Python['logic_coinValue_equals_number'] = function(block) {
      // Comparison operator.
      var OPERATORS = {
        'EQ': '==',
        'NEQ': '!=',
        'LT': '<',
        'LTE': '<=',
        'GT': '>',
        'GTE': '>='
      };

      var operator = OPERATORS[block.getFieldValue('operation')];
      var order = Blockly.Python.ORDER_RELATIONAL;
      var number = Blockly.Python.valueToCode(block, 'number', order) || '0';
      var code = 'coinValue ' + operator + ' ' + number;
      return [code, order];
}
