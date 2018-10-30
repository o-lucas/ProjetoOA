'use strict';

Blockly.JavaScript['logic_boolean'] = function(block) {
    var code = block.getFieldValue('bool');
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_if'] = function(block) {
    let code;
    let ifCondition;
    let ifCode;

    ifCondition = Blockly.JavaScript.valueToCode(
        block,
        'if_condition',
        Blockly.JavaScript.ORDER_NONE
    );

    ifCode = Blockly.JavaScript.statementToCode(block, 'if_statements');
    code = 'if(' + ifCondition + ') {\n' + ifCode + '}\n';

    return code;
}

Blockly.JavaScript['logic_if_else'] = function(block) {
    let code;
    let ifCondition;
    let ifCode;
    let elseCode;

    ifCondition = Blockly.JavaScript.valueToCode(
        block,
        'if_condition',
        Blockly.JavaScript.ORDER_NONE
    );
    ifCode = Blockly.JavaScript.statementToCode(block, 'if_statements');
    code = 'if(' + ifCondition + ') {\n' + ifCode + '}\n';

    elseCode = Blockly.JavaScript.statementToCode(block, 'else_statements');
    if(elseCode)
        code += 'else {\n' + elseCode + '}\n';

    return code;
}
