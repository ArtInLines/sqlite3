export = bindToQuery;
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
declare function bindToQuery(query: string, opts: bindToQueryOptions | null, ...bindings: any[]): (string | import('../SQLiteDB').Statement);
declare namespace bindToQuery {
    export { bindToQueryOptions };
}
type bindToQueryOptions = {
    /**
     * Whether `this.bindToQuery` should return a String or a Statement. Defaults to `this.defualtOpts.bindToStr`.
     */
    bindToStr?: boolean;
    /**
     * The Prefix for named bindings. Defaults to `this.defualtOpts.namedBindingPrefix`.
     */
    namedBindingPrefix?: string;
    /**
     * Indicates whether strings should be quoted or not. Defaults to `this.defualtOpts.qutoeStr`.
     */
    quoteStr?: boolean;
};
