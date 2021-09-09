export = joinSubquery;
declare class joinSubquery {
    /** @type {defaultOpts} */
    static defaultOptions: defaultOpts;
    /** @param {defaultOpts} [obj] */
    static setDefaultOpts(obj?: defaultOpts): typeof import("./joinSubquery");
    /** Resets the defaultOptions to the original default */
    static resetDefaultOpts(): typeof import("./joinSubquery");
    /**
     * Get the subquery of a cross join
     * @param {String} table Table name
     * @param {defaultOpts} [opts] Options object. Defaults to `this.defaultOptions`
     * @returns {(String | subqueryRes)} If `opts.returnStr` is set to `true`, returns a String, otherwise returns a {@link subqueryRes}.
     */
    static cross(table: string, opts?: defaultOpts): (string | subqueryRes);
    static "__#1@#join"(type: any, table: any, conditionalExp: any, opts: any): string | {
        str: string;
        bindings: any[];
    };
    /**
     * Get the subquery of a left join
     * @param {String} table Table name
     * @param {(subqueryRes | String | String[])} conditionalExp Either a conditional Expression or an Array of values. If it's an Array of strings, the tables will be joined with the keyword `USING()`. Otherwise, the keyword `ON conditional_expression` will be used. If `conditionalExp` is a {@link subqueryRes}, the bindings will be returned with the string. Otherwise, the bindings will be set to an empty array.
     * @param {defaultOpts} [opts] Options object. Defaults to `this.defaultOptions`
     * @returns {(String | subqueryRes)} If `opts.returnStr` is set to `true`, returns a String, otherwise returns a {@link subqueryRes}.
     */
    static left(table: string, conditionalExp: (subqueryRes | string | string[]), opts?: defaultOpts): (string | subqueryRes);
    /**
     * Get the subquery of an inner join
     * @param {String} table Table name
     * @param {(subqueryRes | String | String[])} conditionalExp Either a conditional Expression or an Array of values. If it's an Array of strings, the tables will be joined with the keyword `USING()`. Otherwise, the keyword `ON conditional_expression` will be used. If `conditionalExp` is a {@link subqueryRes}, the bindings will be returned with the string. Otherwise, the bindings will be set to an empty array.
     * @param {defaultOpts} [opts] Options object. Defaults to `this.defaultOptions`
     * @returns {(String | subqueryRes)} If `opts.returnStr` is set to `true`, returns a String, otherwise returns a {@link subqueryRes}.
     */
    static inner(table: string, conditionalExp: (subqueryRes | string | string[]), opts?: defaultOpts): (string | subqueryRes);
}
declare namespace joinSubquery {
    export { subqueryRes, defaultOpts };
}
declare namespace defaultOpts {
    const returnStr: boolean;
    const preferNamedBindings: boolean;
    const permamentOpts: boolean;
}
type subqueryRes = {
    str: string;
    bindings: (string[] | any);
};
/**
 * The options are stored only until you create a join subquery, unless `permamentOpts === true`
 */
type defaultOpts = {
    /**
     * Indicates whether to return a String or not. Defaults to `true`.
     */
    returnStr: boolean;
    /**
     * Indicates whether to write named Bindings instead of `?` to the return String. Is ignored, when `returnStr === true` or `!Array.isArray(conditionalExp)`. Defaults to `false`.
     */
    preferNamedBindings: boolean;
    /**
     * Indicates whether to store the options for more than a single join. Defaults to `false`. Has no effect when set to true in a function call other than `this.setDefaultOpts`
     */
    permamentOpts: boolean;
};
