export = select;
/**
 * Select data from the DB
 * @param {(queryOptions | String)} opts If you input a single string, it is assumed that you want to select all columns from the table with the name `opts`
 * @returns {import('../SQLiteDB').Statement}
 */
declare function select(opts: (queryOptions | string)): import('../SQLiteDB').Statement;
declare namespace select {
    export { joinOptions, queryOptions };
}
type queryOptions = {
    /**
     * Indicates whether duplicate rows should be removed from the result set. Defaults to `false`.
     */
    distinct?: boolean;
    /**
     * List of columns of the table that should be returned. If set to `null`or `*`, all rows will be returned. Defaults to `*`
     */
    columnList?: (string | string[]) | null;
    /**
     * List of tables to get columns from. Make sure that the columns in `columnList` indicate what table the column is from
     */
    tableList?: (string | string[]) | null;
    /**
     * A join subquery or data to dynamically create such a subquery
     */
    join?: (joinOptions | import('../util/joinSubquery').subqueryRes | string) | null;
    /**
     * A list of expressions for filtering the returned data. Filtering occurs via the keyword `WITH`
     */
    rowFilter?: (string | string[]) | null;
    /**
     * A list of expressions for ordering the returned data. Each expression can either be sorted in ascending `ASC` or descending `DESC` order. Defaults to `ASC` if not specified. Ordering occurs via the keyword `ORDER BY`
     */
    orderBy?: (string | string[]) | null;
    /**
     * The max amount of rows to return. If set to `null`, all rows will be returned. Defaults to `null`
     */
    limitCount?: (number | string) | null;
    /**
     * The number by which to offset the result, meaning the result will omit the first `n` rows. If set to `null` no rows are omitted. Defaults to `null`
     */
    offset?: (number | string) | null;
    /**
     * An expression for grouping the results by. Ordering occurs via the keyword `GROUP BY`
     */
    groupBy?: (string | string[]) | null;
    /**
     * An expression for filtering the groups of `groupBy`. Filtering occurs via the keyword `HAVING`
     */
    groupFilter?: (string | string[]) | null;
    /**
     * A list of values to bind to the query.
     */
    valueList?: (any | any[] | any[][]) | null;
    /**
     * Indicates whether to bind values to the string via `this.bind` (`true`) or to a statement via `Statement.bind` (`false`). Defaults to `true`
     */
    bindToQuery?: boolean;
    /**
     * Indicates whether to quote string values that are bound to the query. Defaults to `true`. Doesn't apply to the join subquery. Only necessary when `bindToQuery` is `true`
     */
    quoteStr?: boolean;
};
type joinOptions = {
    /**
     * Defaults to `CROSS JOIN`
     */
    type: ('INNER JOIN' | 'LEFT JOIN' | 'CROSS JOIN');
    table: string;
    conditionalExp: (string | string[]) | null;
};
