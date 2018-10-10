function getBlocksByType(type) {
    let blocks = [];
    for (let block in workspace.blockDB_) {
        if (workspace.getBlockById(block).type == type) {
            blocks.push(workspace.getBlockById(block));
        }
    }

    return blocks;
}

function generateHighlightableCode(code, selectedBlock) {
    if(selectedBlock == null)
        return code;
    //let selectedBlock = Blockly.selected;
    //let genCode = Blockly.Python.blockToCode(selectedBlock);

    let blocks = workspace.getAllBlocks(true);
    let i;
    for (i = 0; i < blocks.length; i++) {
        if (blocks[i].id === selectedBlock.id) {
            break;
        }
    }

    let splitCode = code.trim().split('\n').filter(function (el) {
        return el.trim() !== 'pass' && el.trim() !== '';
    });

    let color = workspace.getBlockById(selectedBlock.id).colour_;

    if (splitCode[i] !== '')
        splitCode[i] = splitCode[i].replace(splitCode[i],
            ("<div style='font-weight: bold; background-color:" + color + "'>" + splitCode[i] + "</div>").trim());
            
    code = splitCode.join("\n");
    return code;
}
