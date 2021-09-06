const SQLiteDB = require('./lib/SQLiteDB');

let db = new SQLiteDB(':memory:', { /* verbose: console.log, */ bindToStr: true });

db.createTable({
	name: 'cats',
	cols: [
		{ name: 'cat_id', type: 'INTEGER', autoincrement: true, primaryKey: true },
		{ name: 'name', type: 'TEXT', notNull: true, unique: true },
		{ name: 'age', type: 'REAL' },
		{ name: 'color', type: 'TEXT', default: 'grey' },
	],
	withoutRowID: false,
	onUpdateDefaultAction: 'NO ACTION',
	onDeleteDefaultAction: 'CASCADE',
});

db.createTable({
	name: 'people',
	cols: [
		{ name: 'person_id', type: 'INTEGER', autoincrement: true, primaryKey: true },
		{ name: 'name', type: 'TEXT', notNull: true, unique: true },
		{ name: 'age', type: 'INTEGER', default: 18, notNull: true },
		{ name: 'profile_pic', type: 'BLOB', unique: true },
	],
	tableChecks: {
		check: ['age >= 18', 'age <= 99'],
	},
});

db.createTable({
	name: 'people_cats_group',
	cols: [
		{ name: 'person_id', notNull: true, type: 'REAL', foreignKey: { foreignTable: 'people', onUpdate: 'CASCADE', onDelete: 'SET NULL' } },
		{ name: 'cat_id', notNull: true, type: 'INTEGER', primaryKey: true },
	],
	tableChecks: {
		primaryKey: ['person_id', 'cat_id'],
		foreignKey: [
			{
				key: 'cat_id',
				foreignTable: 'cats',
				onUpdate: 'CASCADE',
			},
		],
	},
	onDeleteDefaultAction: 'CASCADE',
});

db.insert('cats', ['name', 'color', 'age'], ['Sissy', 'grey', 1], ['Kitty', 'greyish', null]);
db.insert('cats', ['name', 'age', 'color'], 'Xavi', 8, 'orange');
db.insert(
	'people',
	['name', 'age'],
	[
		['Firefly', 23],
		['John Doe', 33],
	]
);
db.insert('people', 'name', 'Art');
// db.insert('people_cats_group', null, ['SELECT person_id FROM people WHERE name=Firefly', 0]);

console.log(db.prepare('SELECT * FROM cats').all());
console.log(db.prepare('SELECT * FROM people').all());
console.log(db.prepare('SELECT * FROM people_cats_group').all());

db.replace('people', ['name', 'age'], 'Jane Doe', 29);
db.replace('people', ['person_id', 'name', 'age'], 2, 'John Doe', 34);

db.update('people', ['age', 30], "name = 'Jane Doe'", null, 1, null);
db.update(
	'cats',
	[
		['color', 'grey'],
		['age', 1],
	],
	"color LIKE 'grey%'"
);

console.log(db.prepare('SELECT * FROM cats').all());
console.log(db.prepare('SELECT * FROM people').all());
console.log(db.prepare('SELECT * FROM people_cats_group').all());
