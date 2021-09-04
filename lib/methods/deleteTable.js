function deleteTable(table, opts = { ifExists: true, schemaName: null }) {
	return this.prepare(`DROP TABLE ${opts.ifExists ? 'IF EXISTS' : ''} ${opts.schemaName ? opts.schemaName + '.' : ''}${table}`).run();
}

module.exports = deleteTable;
