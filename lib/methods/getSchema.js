const schemaToObj = require('../util/schemaToObj');

/**
 * Gets the schema of the specified table
 * @param {String} table Table name
 * @param {Boolean} parse Indicates whether to parse the schema into a JS object. Defaults to false
 * @returns {(String | Object)}
 */
function getSchema(table, parse = false) {
	const res = this.prepare(`SELECT sql FROM sqlite_master WHERE type = 'table' AND name = '${table}'`).get();
	if (parse) return schemaToObj(res);
	return res;
}

module.exports = getSchema;
