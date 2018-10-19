/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var renderWebGL = require('../../../utils/NOOP');
var renderCanvas = require('../../../utils/NOOP');

if (typeof WEBGL_RENDERER)
{
    renderWebGL = require('./StarWebGLRenderer');
}

if (typeof CANVAS_RENDERER)
{
    renderCanvas = require('./StarCanvasRenderer');
}

module.exports = {

    renderWebGL: renderWebGL,
    renderCanvas: renderCanvas

};
