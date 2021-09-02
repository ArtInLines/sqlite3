/**
 * @typedef {Object} joinSubqueryRes
 * @property {String} str
 * @property {String[]} bindings
 */

class joinSubquery {
	defaultOptions = {
		returnStr: false,
		on: null,
		using: null,
	};

	static get defaultOptions() {
		return this.defaultOptions;
	}

	static set defaultOptions(obj) {
		this.defaultOptions = { ...this.defaultOptions, ...obj };
		return this;
	}

	static cross(table, opts) {
		opts = { ...this.defaultOptions, ...opts };
		let str = `CROSS JOIN `;
		if (opts.returnStr) return str + table;
		else return { str: str + '?', bindings: [table] };
	}

	static left(table, conditionalExp, opts) {
		opts = { ...this.defaultOptions, ...opts };
		let str = `LEFT JOIN `;

		if (opts.returnStr) return str + table + Array.isArray(conditionalExp) ? ` USING(${conditionalExp.join(',')})` : ` ON ${conditionalExp}`;

		str += '? ';
		if (Array.isArray(conditionalExp)) return { str: str + `USING(${conditionalExp.reduce()})` };
	}
}

module.exports = joinSubquery;
