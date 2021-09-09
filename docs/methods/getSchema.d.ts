export = getSchema;
/**
 * Gets the schema of the specified table
 * @param {String} table Table name
 * @param {Boolean} parse Indicates whether to parse the schema into a JS object. Defaults to `false`
 * @returns {(String | import('./createTable').createTableOpts)} Returns the schema of the specified table as a `String` if `parse` is set to `false` and as an `Object` otherwise.
 */
declare function getSchema(table: string, parse?: boolean): (string | import('./createTable').createTableOpts);
