/**
 * Transform a string of a SQLite Query into a JS value
 * @param {String} str String to convert
 * @param {Boolean} [strToDate] Indicates whether to return stringified Dates as Date instances. Defaults to `true`
 * @param {Boolean} [removeQuote] Indicates whether to remove quotes around string values. Defaults to `true`
 * @returns {*} JS value of the string
 */
function strToVal(str, strToDate = true, removeQuote = true) {
	if (/null/i.test(str)) return null;
	if (!isNaN(Number(str))) return Number(str);
	if (strToDate && !isNaN(Date.parse(str))) return new Date(str);
	if (removeQuote) {
		if (/^('|")/.test(str)) str = str.slice(1);
		if (/('|")$/.test(str)) str = str.slice(0, str.length - 1);
	}
	return str;
}

module.exports = strToVal;
