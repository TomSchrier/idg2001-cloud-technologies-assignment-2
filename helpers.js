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