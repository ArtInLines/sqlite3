const createJoinSubquery = require('../util/joinSubquery');

/**
 * @typedef {Object} joinOptions
 * @property {('INNER JOIN' | 'LEFT JOIN' | 'CROSS JOIN')} type
 * @property {?(String | String[])} using
 * @property {?(String | String[])} on
 */

/**
 * @typedef {Object} queryOptions
 * @property {Boolean} distinct
 * @property {?(String | String[])} columnList
 * @property {?(String | String[])} tableList
 * @property {?(joinOptions | createJoinSubquery.joinSubqueryRes)} join
 * @property {?(String | String[])} rowFilter
 * @property {?(String | String[])} orderBy
 * @property {?(Number | String)} limitCount
 * @property {?(Number | String)} offset
 * @property {?(String | String[])} groupBy
 * @property {?(String | String[])} groupFilter
 * @property {} valueList
 */

function select() {}

module.exports = select;
