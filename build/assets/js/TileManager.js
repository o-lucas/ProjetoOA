// requires PointFunctions.js

class TileManager
{
    constructor(levelMatrix, tileWidth, tileHeight)
    {
        this.levelMatrix = levelMatrix;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tileCenter = { x: tileWidth / 2, y: tileHeight / 2 };

        this.COLS = levelMatrix[0].length;
        this.ROWS = levelMatrix.length;
    }

    throwExceptionIfTilePointDoesntExists(tilePoint)
    {
        if(
            ((tilePoint.x > this.COLS) || (tilePoint.x < 0))
            || ((tilePoint.y > this.ROWS) && (tilePoint.y < 0))
        )
            throw RangeError('TileManager: tile point out of range.')
    }

    revertPointToTilePoint(point)
    {
        this.throwExceptionIfTilePointDoesntExists(tilePoint);

        return {
            x: (point.x + this.tileCenter.x) / this.tileWidth,
            y: (point.y + this.tileCenter.y) / this.tileHeight
        };
    }

    convertXYToTilePoint(xPosInMatrix, yPosInMatrix)
    {
        return {
            x: xPosInMatrix*this.tileWidth - this.tileCenter.x,
            y: yPosInMatrix*this.tileHeight - this.tileCenter.y
        };
    }

    revertXYToTilePoint(x, y)
    {
        this.throwExceptionIfTilePointDoesntExists(tilePoint);

        return {
            x: (x + this.tileCenter.x) / this.tileWidth,
            y: (y + this.tileCenter.y) / this.tileHeight
        };
    }

    isPointAtTilePoint(point, tilePoint)
    {
        this.throwExceptionIfTilePointDoesntExists(tilePoint);
        point = this.revertPointToTilePoint(point);

        return isPointAtPoint(point, tilePoint);
    }

    isXYAtTilePoint(x, y, tilePoint)
    {
        this.throwExceptionIfTilePointDoesntExists(tilePoint);
        point = this.revertXYToTilePoint(x, y);

        return isPointAtPoint(point, tilePoin);
    }

    isPointAtLastNorthTile(point)
    {
        point = this.revertPointToTilePoint(point);
        return point.y === 1;
    }

    isPointAtLastSouthTile(point)
    {
        point = this.revertPointToTilePoint(point);
        return point.y === this.ROWS;
    }

    isPointAtLastWestTile(point)
    {
        point = this.revertPointToTilePoint(point);
        return point.x === 1;
    }

    isPointAtLastEastTile(point)
    {
        point = this.revertPointToTilePoint(point);
        return point.x === this.COLS;
    }
}
