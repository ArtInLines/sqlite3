const SQLiteDB = require('./lib/SQLiteDB');

let db = new SQLiteDB('temp.db');

// console.log(db.db.prepare('CREATE TABLE IF NOT EXISTS cats ( name TEXT, age INTEGER, color TEXT )').run());
// console.log(db.db.prepare('CREATE TABLE IF NOT EXISTS people ( name TEXT, age INTEGER )').run());
// console.log(db.insert('people', ['name', 'age'], ['Baby', 1]));
// console.log(db.tables());
