export = SQLiteDB;
/** Represents a single SQLite DB */
declare class SQLiteDB {
    /**
     * @param {String} filename Name/Path of the DB file. If set to ':memory:', an in-memory DB will be created
     * @param {DB_Options} opts Options for creating the DB instance
     */
    constructor(filename: string, opts: DB_Options);
    defaultOpts: {
        namedBindingPrefix: string;
        bindToStr: boolean;
        quoteStr: boolean;
    };
    select: typeof import("./methods/select");
    insert: typeof import("./methods/insert");
    replace: typeof import("./methods/replace");
    update: typeof import("./methods/update");
    delete: typeof import("./methods/delete");
    createTable: typeof import("./methods/createTable");
    deleteTable: typeof import("./methods/deleteTable");
    schema: typeof import("./methods/getSchema");
    tables: typeof import("./methods/getTables");
    tableNames: typeof import("./methods/getTableNames");
    bindToQuery: typeof import("./methods/bind");
}
declare namespace SQLiteDB {
    export { RunResult, runStmt, column, getColumns, Statement, verboseFunc, DB_Options };
}
type DB_Options = {
    /**
     * Whether the DB is readonly. Defaults to `false`
     */
    readonly?: boolean;
    /**
     * Whether the DB is only created when the DB file exists. Defaults to `false`
     */
    fileMustExist?: boolean;
    /**
     * How many milliseconds to wait for any operation to resolve, before throwing an error. Defaults to `5000`
     */
    timeout?: number;
    /**
     * A function to call on every interaction with the DB. Usually takes the query string sent to the DB as first parameter. Defaults to `null`
     */
    verbose?: verboseFunc | null;
    /**
     * The Prefix for named bindings. Defaults to `@`
     */
    namedBindingPrefix?: string;
    /**
     * Whether `this.bindToQuery` should return a String or a Statement. Defaults to `false`.
     */
    bindToStr?: boolean;
    /**
     * Indicates whether strings should be quoted or not. Defaults to `this.defualtOpts.qutoeStr`.
     */
    quoteStr?: boolean;
    /**
     * Indicates whether to activate WAL mode. It is recommended for performance increases in concurrent applications (e.g. web applications). However, there may be some issues with transactions involving attached databases and when using several concurrent threads, WAL mode may cause "Checkpoint starvation". Defaults to `false`. This setting can be changed at any point by executing `this.pragma('journal_mode = WAL')`
     */
    WAL_Mode?: boolean;
    /**
     * Indicates whether foreign Keys are allowed in databases. Defaults to `true`. This setting can be changed at any point by executing `this.pragma('foreign_keys = OFF')`
     */
    foreignKeys?: boolean;
};
type RunResult = {
    /**
     * the total number of rows that were inserted, updated, or deleted by this operation. Changes made by foreign key actions or trigger programs do not count.
     */
    changes: number;
    /**
     * the rowid of the last row inserted into the database (ignoring those caused by trigger programs). If the current statement did not insert any rows into the database, this number should be completely ignored.
     */
    lastInsertRowid: number;
};
type runStmt = (...bindParams: any[]) => RunResult;
type column = {
    /**
     * Name or alias of the result column
     */
    name: string;
    /**
     * The name of the originating table column or `null` if it's an expression or subquery
     */
    column: string | null;
    /**
     * The name of the originating table or `null` if it's an expression or subquery
     */
    table: string | null;
    /**
     * The name of the originating database or `null` if it's an expression or subquery
     */
    database: string | null;
    /**
     * The name of the declared type, or null if it's an expression or subquery.
     */
    type: string | null;
};
type getColumns = () => column[];
type Statement = {
    /**
     * The parent database object
     */
    database: any;
    /**
     * The source string that was used to create the prepared statement
     */
    source: string;
    /**
     * Whether the prepared statement returns data
     */
    reader: boolean;
    /**
     * Whether the prepared statement is readonly
     */
    readonly: boolean;
    /**
     * Executes the prepared statement.
     */
    run: runStmt;
    /**
     * Gets the first row retrieved by the query. The returned Object's keys represent the column names. If no data is retrieved `undefined` is returned
     */
    get: Function;
    /**
     * Gets all rows retrieved by the query. If no data is found, an empty array is returned.
     */
    all: Function;
    /**
     * Similar to `all()` but instead returns an iterator. If all rows should be retrieved anyways, `all()` is recommended.
     */
    iterate: Function;
    /**
     * Causes the prepared statement to only return the value of the first column of any rows that it retrieves rahter than the entire row object. Can be toggled on/off by inputting the corresponding Boolean value
     */
    pluck: Function;
    /**
     * Causes the prepared statement to return data namespaced by table. Each key in a row object will be a table name, and each corresponding value will be a nested object that contains the associated column data. This is useful when performing a JOIN between two tables that have overlapping column names. If a result column is an expression or subquery, it will be available within the special $ namespace. Can be toggled on/off by inputting the corresponding Boolean value
     */
    expand: Function;
    /**
     * Causes the prepared statement to return rows as arrays instead of objects. This is primarily used as a performance optimization when retrieving a very high number of rows. Column names can be recovered by using the .columns() method. Can be toggled on/off by inputting the corresponding Boolean value
     */
    raw: Function;
    /**
     * This method is primarily used in conjunction with raw mode. It returns an array of objects, where each object describes a result column of the prepared statement.
     */
    columns: getColumns;
    /**
     * Binds the given parameters to the statement permanently. Unlike binding parameters upon execution, these parameters will stay bound to the prepared statement for its entire life. This method is primarily used as a performance optimization when you need to execute the same prepared statement many times with the same bound parameters
     */
    bind: Function;
};
type verboseFunc = (message: any, ...additionalArgs: any[]) => void;
