/**
 * @typedef {Object} conditionalExpressionOptions
 * @property {?(String | String[])} in
 * @property {?String} like
 * @property {?(String[] | Number[])} between
 * @property {?Boolean} not
 * @property {?Boolean} equal
 * @property {?Boolean} less
 * @property {?Boolean} greater
 * @property {String[]} values
 * @property {} and
 * @property {} or
 */

/** @type {conditionalExpressionOptions} */
const DEFAULT_OPTIONS = {};

function createConditionalExp(opts = DEFAULT_OPTIONS) {}

module.exports = { createConditionalExp };
