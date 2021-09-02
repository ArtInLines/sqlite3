const SQLiteDB = require('./lib/SQLiteDB');

let db = new SQLiteDB(':memory:');

db.db.prepare('CREATE TABLE IF NOT EXISTS cats (name, age, color)').run();
console.log(db.insert('cats', ['name', 'age', 'color'], ['Xavi', '8', 'orange']));
