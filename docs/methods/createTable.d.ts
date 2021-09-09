export = createTable;
/**
 * @typedef {('SET NULL' | 'SET DEFAULT' | 'RESTRICT' | 'NO ACTION' | 'CASCADE')} foreignKeyAction
 */
/**
 * @typedef {Object} ForeignKeyOpts
 * @property {String} key Name of the key in this table
 * @property {String} foreignTable Name of the referenced table
 * @property {?String} foreignKey Name of the key in the foreign table. Defaults to `key`.
 * @property {foreignKeyAction} onUpdate What action should the key take when the parent key is updated
 * @property {foreignKeyAction} onDelete What action should the key take when the parent key is deleted
 */
/**
 * @typedef {Object} tableConstraints
 * @property {?String[]} unique List of columns, that have the unique property.
 * @property {?String[]} primaryKey List of columns, that are primary keys.
 * @property {?ForeignKeyOpts[]} foreignKey List of Foreign Keys. Foreign Keys specified in the same column take precedence.
 * @property {?String[]} check Check expressions that hsve to be true, each time a row is added to this table.
 */
/**
 * @typedef {Object} columnOpts
 * @property {String} name Name of the column
 * @property {('TEXT' | 'REAL' | 'BLOB' | 'INTEGER')} type The data type of the column. For JS numbers "REAL" is prefered over "INTEGER"
 * @property {Boolean} notNull Indicates whether the `NULL` is allowed in this column. This is automatically enabled, if `primaryKey` is enabled
 * @property {Boolean} autoincrement Indicates whether this column should increment automatically for each entry. It is recommended to only enable `autoincrement` if completely necessary
 * @property {*} default A default value for this column
 * @property {Boolean} primaryKey Indicates whether this column is a Primary Key. You are allowed to set this to true for several columns, unlike in usual SQLite3.
 * @property {Boolean} unique Indicates whether entries in this column have to be unique.
 * @property {ForeignKeyOpts} foreignKey List of Foreign Keys. Foreign Keys specified in the same column take precedence.
 * @property {?String} check expression to check for each entry to this column. Check needs to return true, for the column to be inserted
 */
/**
 * @typedef {Object} createTableOpts
 * @property {String} name Name of the table
 * @property {Boolean} ifNotExists Indicates whether to to only create the table if it doesn't already exists in the DB. An error is thrown, if this is set to `false` and the table already exists. Defaults to `true`.
 * @property {?String} schemaName The name of the schema, to which the table belongs. Defaults to `null`.
 * @property {Boolean} withoutRowID Whether the table should have an id row or not. Defaults to `false`.
 * @property {(columnOpts[] | String[])} cols List of columns.
 * @property {?tableConstraints} tableChecks Table constraints
 * @property {foreignKeyAction} onUpdateDefaultAction
 * @property {foreignKeyAction} onDeleteDefaultAction
 */
/** @type {createTableOpts} */
/**
 * Create a table
 * @param {createTableOpts} opts Options for creating the table
 * @returns {import('../SQLiteDB').RunResult}
 */
declare function createTable({ name, ifNotExists, schemaName, withoutRowID, cols, tableChecks, onUpdateDefaultAction, onDeleteDefaultAction }: createTableOpts): import('../SQLiteDB').RunResult;
declare namespace createTable {
    export { foreignKeyAction, ForeignKeyOpts, tableConstraints, columnOpts, createTableOpts };
}
type createTableOpts = {
    /**
     * Name of the table
     */
    name: string;
    /**
     * Indicates whether to to only create the table if it doesn't already exists in the DB. An error is thrown, if this is set to `false` and the table already exists. Defaults to `true`.
     */
    ifNotExists: boolean;
    /**
     * The name of the schema, to which the table belongs. Defaults to `null`.
     */
    schemaName: string | null;
    /**
     * Whether the table should have an id row or not. Defaults to `false`.
     */
    withoutRowID: boolean;
    /**
     * List of columns.
     */
    cols: (columnOpts[] | string[]);
    /**
     * Table constraints
     */
    tableChecks: tableConstraints | null;
    onUpdateDefaultAction: foreignKeyAction;
    onDeleteDefaultAction: foreignKeyAction;
};
type foreignKeyAction = ('SET NULL' | 'SET DEFAULT' | 'RESTRICT' | 'NO ACTION' | 'CASCADE');
type ForeignKeyOpts = {
    /**
     * Name of the key in this table
     */
    key: string;
    /**
     * Name of the referenced table
     */
    foreignTable: string;
    /**
     * Name of the key in the foreign table. Defaults to `key`.
     */
    foreignKey: string | null;
    /**
     * What action should the key take when the parent key is updated
     */
    onUpdate: foreignKeyAction;
    /**
     * What action should the key take when the parent key is deleted
     */
    onDelete: foreignKeyAction;
};
type tableConstraints = {
    /**
     * List of columns, that have the unique property.
     */
    unique: string[] | null;
    /**
     * List of columns, that are primary keys.
     */
    primaryKey: string[] | null;
    /**
     * List of Foreign Keys. Foreign Keys specified in the same column take precedence.
     */
    foreignKey: ForeignKeyOpts[] | null;
    /**
     * Check expressions that hsve to be true, each time a row is added to this table.
     */
    check: string[] | null;
};
type columnOpts = {
    /**
     * Name of the column
     */
    name: string;
    /**
     * The data type of the column. For JS numbers "REAL" is prefered over "INTEGER"
     */
    type: ('TEXT' | 'REAL' | 'BLOB' | 'INTEGER');
    /**
     * Indicates whether the `NULL` is allowed in this column. This is automatically enabled, if `primaryKey` is enabled
     */
    notNull: boolean;
    /**
     * Indicates whether this column should increment automatically for each entry. It is recommended to only enable `autoincrement` if completely necessary
     */
    autoincrement: boolean;
    /**
     * A default value for this column
     */
    default: any;
    /**
     * Indicates whether this column is a Primary Key. You are allowed to set this to true for several columns, unlike in usual SQLite3.
     */
    primaryKey: boolean;
    /**
     * Indicates whether entries in this column have to be unique.
     */
    unique: boolean;
    /**
     * List of Foreign Keys. Foreign Keys specified in the same column take precedence.
     */
    foreignKey: ForeignKeyOpts;
    /**
     * expression to check for each entry to this column. Check needs to return true, for the column to be inserted
     */
    check: string | null;
};
