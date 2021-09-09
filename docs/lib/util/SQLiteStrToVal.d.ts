export = strToVal;
/**
 * Transform a string of a SQLite Query into a JS value
 * @param {String} str String to convert
 * @param {Boolean} [strToDate] Indicates whether to return stringified Dates as Date instances. Defaults to `true`
 * @param {Boolean} [removeQuote] Indicates whether to remove quotes around string values. Defaults to `true`
 * @returns {*} JS value of the string
 */
declare function strToVal(str: string, strToDate?: boolean, removeQuote?: boolean): any;
