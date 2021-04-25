/**
 * Convert a UNIX timestamp to readable date
 * @param { Number } timestamp 
 * @returns { String } DD.MM.YYYY, HH:MM:SS
 */

//Use the exports keyword to make properties and methods available outside the module file.
exports.readableDate = function (timestamp) {
    const dateObject = new Date(parseInt(timestamp))
    const humanDateFormat = dateObject.toLocaleString() //DD.MM.YYYY, HH:MM:SS
    return humanDateFormat.toString();
}

/**
 * @param {Number} min minimum number to generate
 * @param {Number} max maximum number to generate
 * @returns {Number} Random Number between min and max (inclusive)
 */

//Use the exports keyword to make properties and methods available outside the module file.
exports.getRandomNum = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Returns true 25% of the time, 75% of the time it returns false
 * @returns { Boolean } true or false
 */
exports.generateIsBurning = function () {
    return Math.random() < 0.25 // 25% chance for fire = true
}