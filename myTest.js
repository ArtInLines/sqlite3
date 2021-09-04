const SQLiteDB = require('./lib/SQLiteDB');

let db = new SQLiteDB('temp.db', { verbose: console.log });

db.db.prepare('CREATE TABLE IF NOT EXISTS cats ( name TEXT, age INTEGER, color TEXT )').run();
db.db.prepare('CREATE TABLE IF NOT EXISTS people ( name TEXT, age INTEGER )').run();
db.db.prepare('CREATE TABLE IF NOT EXISTS test ( name TEXT, age INTEGER )').run();
db.insert('people', ['name', 'age'], ['Baby', 1]);
db.insert('people', ['name', 'age'], ['Mia', 25]);
db.insert('cats', ['name', 'age'], ['Xavi', 8]);
db.insert('cats', ['name', 'age'], ['Sissy', 1]);
db.insert('test', ['name', 'age'], ['test', 1]);
console.log(db.tables());
db.deleteTable('test');
console.log(db.tables());
