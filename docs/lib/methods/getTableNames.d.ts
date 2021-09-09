export = getTableNames;
/**
 * Gets a list of all tables' names from the DB
 * @param {Boolean} temp Indicates whether to get temporary or permament tables. Defaults to `false` (i.e. permament tables)
 * @returns {String[]} List of table names
 */
declare function getTableNames(temp?: boolean): string[];
