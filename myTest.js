const SQLiteDB = require('./lib/SQLiteDB');

let db = new SQLiteDB(':memory:', { verbose: console.log, bindToStr: true });

db.createTable({
	name: 'cats',
	cols: [
		{ name: 'catId', type: 'INTEGER', autoincrement: true, primaryKey: true },
		{ name: 'name', type: 'TEXT', notNull: true },
		{ name: 'age', type: 'REAL' },
		{ name: 'color', type: 'TEXT' },
	],
});
console.log(db.tableNames());
console.log(db.schema('cats', false));
// console.log(db.tables());

return;

db.prepare('CREATE TABLE IF NOT EXISTS cats ( name TEXT, age INTEGER, color TEXT )').run();
db.prepare('CREATE TABLE IF NOT EXISTS people ( name TEXT, age INTEGER )').run();
db.prepare('CREATE TABLE IF NOT EXISTS test ( name TEXT, age INTEGER )').run();
db.insert('people', ['name', 'age'], ['Baby', 1]);
db.insert('people', ['name', 'age'], ['Mia', 25]);
db.insert('cats', ['name', 'age'], ['Xavi', 8]);
db.insert('cats', ['name', 'age'], ['Sissy', 1]);
db.insert('test', ['name', 'age'], ['test', 1]);
console.log(db.tables());
db.deleteTable('test');
console.log(db.tables());

let query1 = db.bindToQuery('INSERT INTO ? (?,?)', null, 'cats', ['name', 'age']);
let query2 = db.bindToQuery('VALUES(@name,@age), (?,?)', { quoteStr: true }, 'Kitty', 2, { name: 'cat', age: 9 });
db.exec(query1 + ' ' + query2);
console.log(db.bindToQuery('SELECT ?, ? FROM ?', { bindToStr: false }, 'name', 'age', 'cats').all());
