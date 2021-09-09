const schemaToObj = require('../util/createTableQueryToObj');

/**
 * Gets the schema of the specified table
 * @param {String} table Table name
 * @param {Boolean} parse Indicates whether to parse the schema into a JS object. Defaults to `false`
 * @returns {(String | import('./createTable').createTableOpts)} Returns the schema of the specified table as a `String` if `parse` is set to `false` and as an `Object` otherwise.
 */
function getSchema(table, parse = false) {
	const res = this.prepare(`SELECT sql FROM sqlite_master WHERE type = 'table' AND name = '${table}'`).raw(true).get()[0];
	if (parse) return schemaToObj(res);
	return res;
}

module.exports = getSchema;
