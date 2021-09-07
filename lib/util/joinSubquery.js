const getStrForBindings = require('./getStrForBindings').default;

/**
 * @typedef {Object} subqueryRes
 * @property {String} str
 * @property {(String[] | Object)} bindings
 */

/**
 * @typedef {Object} defaultOpts The options are stored only until you create a join subquery, unless `permamentOpts === true`
 * @property {Boolean} returnStr Indicates whether to return a String or not. Defaults to `true`.
 * @property {Boolean} preferNamedBindings Indicates whether to write named Bindings instead of `?` to the return String. Is ignored, when `returnStr === true` or `!Array.isArray(conditionalExp)`. Defaults to `false`.
 * @property {Boolean} permamentOpts Indicates whether to store the options for more than a single join. Defaults to `false`. Has no effect when set to true in a function call other than `this.setDefaultOpts`
 */
const defaultOpts = {
	returnStr: true,
	preferNamedBindings: false,
	permamentOpts: false,
};

class joinSubquery {
	/** @type {defaultOpts} */
	static defaultOptions = defaultOpts;

	/** @param {defaultOpts} [obj] */
	static setDefaultOpts(obj = {}) {
		this.defaultOptions = { ...defaultOpts, ...obj };
		return this;
	}

	/** Resets the defaultOptions to the original default */
	static resetDefaultOpts() {
		this.defaultOptions = defaultOpts;
		return this;
	}

	/**
	 * Get the subquery of a cross join
	 * @param {String} table Table name
	 * @param {defaultOpts} [opts] Options object. Defaults to `this.defaultOptions`
	 * @returns {(String | subqueryRes)} If `opts.returnStr` is set to `true`, returns a String, otherwise returns a {@link subqueryRes}.
	 */
	static cross(table, opts) {
		let result;
		opts = { ...this.defaultOptions, ...opts };
		let str = `CROSS JOIN `;
		if (opts.returnStr) result = str + table;
		else result = { str: str + '?', bindings: [table] };

		if (!this.defaultOptions.permamentOpts) this.resetDefaultOpts();
		return result;
	}

	static #join(type, table, conditionalExp, opts) {
		opts = { ...this.defaultOptions, ...opts };
		let conditionalExpBindings = [table, ...(conditionalExp?.bindings || conditionalExp)];
		conditionalExp = conditionalExp?.str || conditionalExp;
		let str = `${type} JOIN `;
		let result;

		if (opts.returnStr) {
			if (Array.isArray(conditionalExp)) conditionalExp = ` USING(${conditionalExp.join(',')})`;
			else conditionalExp = ` ON ${conditionalExp}`;
			result = str + table + conditionalExp;
		} else {
			str += '? ';
			if (Array.isArray(conditionalExp)) result = { str: str + `USING(${getStrForBindings(conditionalExp, opts.preferNamedBindings)})`, bindings: conditionalExpBindings };
			else result = { str: str + 'ON ' + conditionalExp, bindings: conditionalExpBindings };
		}

		if (!this.defaultOptions.permamentOpts) this.resetDefaultOpts();
		return result;
	}

	// TODO: Get rid of copy-pasted JSDoc comment for both `this.left` and `this.inner`

	/**
	 * Get the subquery of a left join
	 * @param {String} table Table name
	 * @param {(subqueryRes | String | String[])} conditionalExp Either a conditional Expression or an Array of values. If it's an Array of strings, the tables will be joined with the keyword `USING()`. Otherwise, the keyword `ON conditional_expression` will be used. If `conditionalExp` is a {@link subqueryRes}, the bindings will be returned with the string. Otherwise, the bindings will be set to an empty array.
	 * @param {defaultOpts} [opts] Options object. Defaults to `this.defaultOptions`
	 * @returns {(String | subqueryRes)} If `opts.returnStr` is set to `true`, returns a String, otherwise returns a {@link subqueryRes}.
	 */
	static left(table, conditionalExp, opts) {
		return this.#join('LEFT', table, conditionalExp, opts);
	}

	/**
	 * Get the subquery of an inner join
	 * @param {String} table Table name
	 * @param {(subqueryRes | String | String[])} conditionalExp Either a conditional Expression or an Array of values. If it's an Array of strings, the tables will be joined with the keyword `USING()`. Otherwise, the keyword `ON conditional_expression` will be used. If `conditionalExp` is a {@link subqueryRes}, the bindings will be returned with the string. Otherwise, the bindings will be set to an empty array.
	 * @param {defaultOpts} [opts] Options object. Defaults to `this.defaultOptions`
	 * @returns {(String | subqueryRes)} If `opts.returnStr` is set to `true`, returns a String, otherwise returns a {@link subqueryRes}.
	 */
	static inner(table, conditionalExp, opts) {
		return this.#join('INNER', table, conditionalExp, opts);
	}

	// TODO: Add methods for other common joins, that aren't natively supported by SQLite3 and need some hacks
}

module.exports = joinSubquery;
