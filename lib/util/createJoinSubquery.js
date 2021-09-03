const getStrForBindings = require('./getStrForBindings').default;

/**
 * @typedef {Object} subqueryRes
 * @property {String} str
 * @property {(String[] | Object)} bindings
 */

class joinSubquery {
	defaultOptions = {
		returnStr: false,
		preferNamedBindings: false,
	};

	static get defaultOptions() {
		return this.defaultOptions;
	}

	static set defaultOptions(obj) {
		this.defaultOptions = { ...this.defaultOptions, ...obj };
		return this;
	}

	/**
	 * Get the subquery of a cross join
	 * @param {String} table Table name
	 * @param {Object} [opts] Options object. Defaults to `this.defaultOptions`
	 * @param {Boolean} [opts.returnStr] Indicates whether to return a String or not.
	 * @returns {(String | subqueryRes)} If `opts.returnStr` is set to `true`, returns a String, otherwise returns a {@link subqueryRes}.
	 */
	static cross(table, opts) {
		opts = { ...this.defaultOptions, ...opts };
		let str = `CROSS JOIN `;
		if (opts.returnStr) return str + table;
		else return { str: str + '?', bindings: [table] };
	}

	#join(type, table, conditionalExp, opts) {
		opts = { ...this.defaultOptions, ...opts };
		let conditionalExpBindings = conditionalExp?.bindings || [];
		conditionalExp = conditionalExp?.str || conditionalExp;
		let str = `${type} JOIN `;

		if (opts.returnStr) return str + table + Array.isArray(conditionalExp) ? ` USING(${conditionalExp.join(',')})` : ` ON ${conditionalExp}`;

		str += '? ';
		if (Array.isArray(conditionalExp)) return { str: str + `USING(${getStrForBindings(conditionalExp, opts.preferNamedBindings)})`, bindings: conditionalExp };
		else return { str: 'ON ' + conditionalExp, bindings: conditionalExpBindings };
	}

	// TODO: Get rid of copy-pasted JSDoc comment for both `this.left` and `this.inner`

	/**
	 * Get the subquery of a left join
	 * @param {String} table Table name
	 * @param {(subqueryRes | String | String[])} conditionalExp Either a conditional Expression or an Array of values. If it's an Array of strings, the tables will be joined with the keyword `USING()`. Otherwise, the keyword `ON conditional_expression` will be used. If `conditionalExp` is a {@link subqueryRes}, the bindings will be returned with the string. Otherwise, the bindings will be set to an empty array.
	 * @param {Object} [opts] Options object. Defaults to `this.defaultOptions`
	 * @param {Boolean} [opts.returnStr] Indicates whether to return a String or not. Defaults to `false`
	 * @param {Boolean} [opts.preferNamedBindings] Indicates whether to write named Bindings instead of `?` to the return String. Is ignored, when `returnStr === true` or `!Array.isArray(conditionalExp)`. Defaults to `false`.
	 * @returns {(String | subqueryRes)} If `opts.returnStr` is set to `true`, returns a String, otherwise returns a {@link subqueryRes}.
	 */
	static left(table, conditionalExp, opts) {
		return this.#join('LEFT', table, conditionalExp, opts);
	}

	/**
	 * Get the subquery of an inner join
	 * @param {String} table Table name
	 * @param {(subqueryRes | String | String[])} conditionalExp Either a conditional Expression or an Array of values. If it's an Array of strings, the tables will be joined with the keyword `USING()`. Otherwise, the keyword `ON conditional_expression` will be used. If `conditionalExp` is a {@link subqueryRes}, the bindings will be returned with the string. Otherwise, the bindings will be set to an empty array.
	 * @param {Object} [opts] Options object. Defaults to `this.defaultOptions`
	 * @param {Boolean} [opts.returnStr] Indicates whether to return a String or not. Defaults to `false`
	 * @param {Boolean} [opts.preferNamedBindings] Indicates whether to write named Bindings instead of `?` to the return String. Is ignored, when `returnStr === true` or `!Array.isArray(conditionalExp)`. Defaults to `false`.
	 * @returns {(String | subqueryRes)} If `opts.returnStr` is set to `true`, returns a String, otherwise returns a {@link subqueryRes}.
	 */
	static inner(table, conditionalExp, opts) {
		return this.#join('INNER', table, conditionalExp, opts);
	}

	// TODO: Add methods for other common joins, that aren't natively supported by SQLite3 and need some hacks
}

module.exports = joinSubquery;
