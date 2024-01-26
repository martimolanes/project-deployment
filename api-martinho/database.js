// Set up SQLite database
const sqlite3 = require('sqlite3').verbose();

const setupDatabase = () => {
    let db = new sqlite3.Database('./jokes.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the jokes database.');
    });

    const createJokesTable = `
    CREATE TABLE IF NOT EXISTS Jokes ( id_joke INTEGER PRIMARY KEY, joke_content TEXT NOT NULL, likes INTEGER DEFAULT 0, dislikes INTEGER DEFAULT 0)
    `
    const createCategoriesTable = `
    CREATE TABLE IF NOT EXISTS Categories ( id_category INTEGER PRIMARY KEY, category TEXT NOT NULL)
    `
    const createJokesCategoriesTable = `
    CREATE TABLE IF NOT EXISTS JokesCategories ( id_joke INTEGER NOT NULL, id_category INTEGER NOT NULL, PRIMARY KEY (id_joke, id_category), FOREIGN KEY (id_joke) REFERENCES Jokes (id_joke), FOREIGN KEY (id_category) REFERENCES Categories (id_category))
    `


    db.run( createJokesTable, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Jokes table created.');
    });

    db.run( createCategoriesTable, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Categories table created.');
    }
    );

    db.run( createJokesCategoriesTable, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('JokesCategories table created.');
    }
    );

    return db;
}

module.exports = {
    setupDatabase
}
