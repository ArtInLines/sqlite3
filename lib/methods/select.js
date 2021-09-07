const createJoinSubquery = require('../util/joinSubquery');

/**
 * @typedef {Object} joinOptions
 * @property {('INNER JOIN' | 'LEFT JOIN' | 'CROSS JOIN')} type Defaults to `CROSS JOIN`
 * @property {String} table
 * @property {?(String | String[])} conditionalExp
 */

/**
 * @typedef {Object} queryOptions
 * @property {Boolean} distinct
 * @property {?(String | String[])} columnList If
 * @property {?(String | String[])} tableList
 * @property {?(joinOptions | createJoinSubquery.subqueryRes | String)} join
 * @property {?(String | String[])} rowFilter
 * @property {?(String | String[])} orderBy
 * @property {?(Number | String)} limitCount
 * @property {?(Number | String)} offset
 * @property {?(String | String[])} groupBy
 * @property {?(String | String[])} groupFilter
 * @property {?(any | any[] | any[][])} valueList
 * @property {Boolean} bindToQuery Indicates whether to bind values to the string via `this.bind` (`true`) or to a statement via `Statement.bind` (`false`). Defaults to `true`
 * @property {Boolean} quoteStr Indicates whether to quote string values that are bound to the query. Defaults to `true`. Doesn't apply to the join subquery. Only necessary when `bindToQuery` is `true`
 */

const DEFAULT_OPTS = {
	distinct: false,
	columnList: '*',
	tableList: null,
	join: null,
	rowFilter: null,
	orderBy: null,
	limitCount: null,
	offset: null,
	groupBy: null,
	groupFilter: null,
	valueList: null,
	bindToQuery: true,
	quoteStr: true,
};

/**
 * Select data from the DB
 * @param {(queryOptions | String)} opts If you input a single string, it is assumed that you want to select all columns from the table with the name `opts`
 * @returns {import('better-sqlite3').Statement}
 */
function select(opts) {
	if (typeof opts === 'string') return this.prepare(`SELECT * FROM ${opts}`);

	opts = { ...DEFAULT_OPTS, ...opts };

	let sql = `SELECT`;
	if (opts.distinct) sql += ` DISTINCT`;

	if (opts.columnList) {
		if (!Array.isArray(opts.columnList)) opts.columnList = [opts.columnList];
		sql += ` ${opts.columnList.join(', ')}`;
	} else sql += ' *';

	if (!Array.isArray(opts.tableList)) opts.tableList = [opts.tableList];
	sql += ` FROM ${opts.tableList.join(', ')}`;
	if (opts.join) {
		if (typeof opts.join === 'string') sql += ` ${opts.join}`;
		else if (opts.join.hasOwnProperty('bindings')) sql += ` ${this.bind(opts.join.str, { bindToStr: true, quoteStr: false }, opts.join.bindings)}`;
		else {
			const joinOpts = { returnStr: true };
			if (/^\s*inner/i.test(opts.join.type)) sql += ` ${createJoinSubquery.inner(opts.join.table, opts.join.conditionalExp, joinOpts)}`;
			else if (/^\s*left/i.test(opts.join.type)) sql += ` ${createJoinSubquery.left(opts.join.table, opts.join.conditionalExp, joinOpts)}`;
			else sql += ` ${createJoinSubquery.cross(opts.join.table, joinOpts)}`;
		}
	}
	if (opts.rowFilter) {
		if (!Array.isArray(opts.rowFilter)) opts.rowFilter = [opts.rowFilter];
		sql += ` WHERE ${opts.rowFilter.join(', ')}`;
	}
	if (opts.orderBy) {
		if (!Array.isArray(opts.orderBy)) opts.orderBy = [opts.orderBy];
		sql += ` ORDER BY ${opts.orderBy.join(', ')}`;
	}
	if (opts.limitCount) sql += ` LIMIT ${String(opts.limitCount)}`;
	if (opts.offset) sql += ` OFFSET ${String(opts.offset)}`;
	if (opts.groupBy) {
		if (!Array.isArray(opts.groupBy)) opts.groupBy = [opts.groupBy];
		sql += ` GROUP BY ${opts.groupBy.join(', ')}`;
	}
	if (opts.groupFilter) {
		if (!Array.isArray(opts.groupFilter)) opts.groupFilter = [opts.groupFilter];
		sql += ` HAVING ${opts.groupFilter.join(', ')}`;
	}

	if (!Array.isArray(opts.valueList)) opts.valueList = [opts.valueList];

	console.log({ sql });
	if (opts.bindToQuery) return this.bindToQuery(sql, { bindToStr: false, quoteStr: opts.uoteStr }, ...opts.valueList);
	else return this.prepare(sql);
}

module.exports = select;
