<<<<<<< HEAD
/**
* A polyfill for Array.isArray
*/
if (!Array.isArray)
{
    Array.isArray = function (arg)
    {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
=======
/**
* A polyfill for Array.isArray
*/
if (!Array.isArray)
{
    Array.isArray = function (arg)
    {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
>>>>>>> phazer-version
