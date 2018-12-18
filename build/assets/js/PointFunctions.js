function throwExceptionIfIsNotAPoint(point)
{
    if(point.x === undefined || point.y === undefined)
        throw TypeError('Invalid point (without x or y)');
}

function throwExceptionIfIsNotAnArray(points)
{
    if(!Array.isArray(points))
        throw TypeError('Is not an array.');
}

function isXYatXY(x1, y1, x2, y2)
{
    return x1 === x2 && y1 === y2;
}

function isPointAtXY(point, x, y)
{
    throwExceptionIfIsNotAPoint(point);

    return point.x === x && point.y === y;
}

function isPointAtPoint(APoint, BPoint)
{
    throwExceptionIfIsNotAPoint(APoint);
    throwExceptionIfIsNotAPoint(BPoint);

    return APoint.x === BPoint.x && APoint.y === BPoint.y;
}

function isPointAtPoints(point, points)
{
    throwExceptionIfIsNotAPoint(point);
    throwExceptionIfIsNotAnArray(points);

    for(let i = 0; i < points.length; i++)
    {
        throwExceptionIfIsNotAPoint(points[i]);

        if(isPointAtPoint(point, points[i]))
            return true;
    }
    
    return false;
}
