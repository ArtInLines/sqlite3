export = schemaToObj;
/**
 * Transform a "Create Table"-Query to an Object
 * @param {String} schema "Create Table" Query string
 * @returns {import('../methods/createTable').createTableOpts} The returned object is in a format that it could be used to create a table schema string via `this.createTable()`
 */
declare function schemaToObj(schema: string): import('../methods/createTable').createTableOpts;
