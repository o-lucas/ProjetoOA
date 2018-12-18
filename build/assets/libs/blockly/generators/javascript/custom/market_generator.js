Blockly.JavaScript["controls_moveTo"] = function(block){
    return `moveTo("${block.getFieldValue("TYPE")}");`;
};

Blockly.JavaScript["controls_hasItem"] = function(block){
    let currentItem = block.getFieldValue("ITEM");
    return [`hasItem("${currentItem}")`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["controls_buy"] = function(block){
    return "buy();"
};

Blockly.JavaScript["controls_goHome"] = function(block){
    return "goHome();"
};