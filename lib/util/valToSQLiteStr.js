/**
 * Transform a JS value into a string for a SQLite Query
 * @param {?(String | Number | Date)} val Value to convert
 * @param {Boolean} [quoteStr] Indicates whether to put quotes around string values. Defaults to `false`
 * @returns {String} Stringified version of the value, that SQLite understands
 */
function valToStr(val, quoteStr = false) {
	if (typeof val === 'string') return quoteStr ? `'${val}'` : val;
	if (typeof val === 'number') {
		val = String(val);
		if (val.includes('.')) return val;
		else return val + '.0';
	}
	if (val === null) return 'NULL';
	if (val instanceof Date) return val.toDateString();
	throw TypeError("Invalid type can't be transformed to a SQLite understandable string");
}

module.exports = valToStr;
