const valToStr = require('../util/valToSQLiteStr');

/**
 * @typedef {Object} bindToQueryOptions
 * @property {Boolean} [bindToStr] Whether `this.bindToQuery` should return a String or a Statement. Defaults to `this.defualtOpts.bindToStr`.
 * @property {String} [namedBindingPrefix] The Prefix for named bindings. Defaults to `this.defualtOpts.namedBindingPrefix`.
 * @property {Boolean} [quoteStr] Indicates whether strings should be quoted or not. Defaults to `this.defualtOpts.qutoeStr`.
 */

/**
 * Insert values into a query string. Different from the `Statement.bind()` method, in that this method transforms the string, while the `Statement.bind()` method binds values to the string, meaning, that this method allows you to insert any values into the string (e.g. table name, column name, etc.), while the `Statement.bind()` method only allows to bind actual values that are inserted into the DB.
 * Named bindings have to be prefixed with `this.namedBindingPrefix`.
 * If there are more bindings than references in the query string, the last bindings will be ignored. Likewise, if a named binding doesn't have a reference, it will also be silently ignored.
 * Date values will by default be transformed to a String. If you want to modify the default behaviour, you need to transform the Date to a string or number before calling this method.
 * @param {String} query Query string
 * @param {?bindToQueryOptions} opts
 * @param {...any} bindings For named bindings, input an object. For unnamed bindings a spread array. The bindings array will be flattened (with max-depth 1), so `'(query, 'foo', 'bar', ['baz']) === (query, ['foo', 'bar'], 'baz')`. If you want to reference named bindings with a 2D-Array, make sure not to spread the bindings array (i.e. `(query, ['foo', ['bar', value], ['baz', value2]])`)
 * @returns {(String | import('../SQLiteDB').Statement)} Returns a `String` if `opts.bindToStr` is set to true and a `Statement` otherwise
 */
function bindToQuery(query, opts, ...bindings) {
	opts = { ...this.defaultOpts, ...opts };
	let namedBindings = {};

	// Unnamed bindings
	if (Array.isArray(bindings)) {
		bindings = bindings.flat(1);
		let j = 0;
		for (let i = 0; i < bindings.length; i++) {
			const binding = bindings[i];
			if (Array.isArray(binding)) {
				namedBindings[binding[0]] = binding[1];
				continue;
			} else if (binding instanceof Object) {
				namedBindings = { ...namedBindings, ...binding };
				continue;
			}
			const indexInQuery = query.indexOf('?', j);
			if (indexInQuery >= 0) query = query.slice(0, indexInQuery) + valToStr(binding, opts.quoteStr) + query.slice(indexInQuery + 1);
		}
	}

	// Named bindings
	const keys = Object.keys(namedBindings);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const reference = opts.namedBindingPrefix + key;
		const indexInQuery = query.indexOf(reference);
		if (indexInQuery >= 0) query = query.slice(0, indexInQuery) + valToStr(namedBindings[key], opts.quoteStr) + query.slice(indexInQuery + reference.length);
	}

	console.log({ query });
	if (opts.bindToStr) return query;
	else return this.prepare(query);
}

module.exports = bindToQuery;
