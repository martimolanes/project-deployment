// Set up SQLite database
const sqlite3 = require("sqlite3").verbose();

const setupDatabase = () => {
    let db = new sqlite3.Database("./jokes.db", (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the jokes database.");
    });

    const createJokesTable = `
    CREATE TABLE IF NOT EXISTS Jokes (
        id_joke INTEGER PRIMARY KEY,
        joke_content TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        dislikes INTEGER DEFAULT 0
    )
    `
    const createCategoriesTable = `
    CREATE TABLE IF NOT EXISTS Categories (
        id_category INTEGER PRIMARY KEY,
        category TEXT UNIQUE NOT NULL 
    )
    `
    const createJokesCategoriesTable = `
    CREATE TABLE IF NOT EXISTS JokesCategories (
        id_joke INTEGER NOT NULL,
        id_category INTEGER NOT NULL,
        PRIMARY KEY (id_joke, id_category),
        FOREIGN KEY (id_joke) REFERENCES Jokes (id_joke),
        FOREIGN KEY (id_category) REFERENCES Categories (id_category)
    )
    `


    db.run( createJokesTable, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Jokes table created.");
    });

    db.run( createCategoriesTable, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Categories table created.");
    }
    );

    db.run( createJokesCategoriesTable, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("JokesCategories table created.");
    }
    );

    return db;
}

async function getCategoryId(db, category) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("SELECT id_category FROM Categories WHERE category = ?");
        stmt.get(category, (err, row) => {
            if (err) {
                reject(err);
            } else if (row) {
                resolve(row.id_category);
            } else {
                reject(new Error("No category found with name: " + category));
            }
        });
    });
}

async function getJokeId(db, joke_content) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("SELECT id_joke FROM Jokes WHERE joke_content = ?");
        stmt.get(joke_content, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.id_joke);
            }
        });
    });
}

async function getJoke(db, joke_id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("SELECT * FROM Jokes WHERE id_joke = ?");
        stmt.get(joke_id, (err, row) => {
            if (err) {
                reject(err);
            } else if (row) {
                resolve(row);
            } else {
                reject(new Error("No joke found with id: " + joke_id));
            }
        });
    });
}

async function getRandomJoke(db) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("SELECT * FROM Jokes ORDER BY RANDOM() LIMIT 1");
        stmt.get((err, row) => {
            if (err) {
                reject(err);
            } else if (row) {
                resolve(row);
            } else {
                resolve("There are NO jokes in the database!");
            }
        });
    });
}

async function getRandomJokeByCategory(db, category_name) {
    try {
        const id_category = await getCategoryId(db, category_name)
        const id_joke = await getRandomJokeId(db, id_category);
        const joke = await getJoke(db, id_joke);
        return joke;
    } catch (err) {
        throw err;
    }
}

async function getRandomJokeId(db, category_id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("SELECT id_joke FROM JokesCategories WHERE id_category = ? ORDER BY RANDOM() LIMIT 1");
        stmt.get(category_id, (err, row) => {
            if (err) {
                reject(err);
            } else if (row) {
                resolve(row.id_joke);
            } else {
                reject(new Error("No joke found"));
            }
        });
    });
}

async function getJokesByCategory(db, category_name) {
    try {
        const id_category = await getCategoryId(db, category_name)
        const rows = await getJokesIdByCategoryId(db, id_category);
        const jokes = await Promise.all(rows.map(async (row) => {
            const joke_id = row.id_joke;
            const joke = await getJoke(db, joke_id);
            return joke;
        }));
        return jokes;
    } catch (err) {
        throw err;
    }
}

async function getCategories(db) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("SELECT * FROM Categories");
        stmt.all((err, rows) => {
            stmt.finalize();
            if (err) {
                reject(err);
            } else if (rows) {
                resolve(rows);
            } else {
                reject(new Error("No categories found"));
            }
        });
    });
}

async function getJokesIdByCategoryId(db, category_id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("SELECT id_joke FROM JokesCategories WHERE id_category = ?");
        stmt.all(category_id, (err, rows) => {
            stmt.finalize();
            if (err) {
                reject(err);
            } else if (rows) {
                resolve(rows);
            } else {
                reject(new Error("No joke found with id: " + category_id));
            }
        });
    });
}

async function addCategory(db, category_name) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO Categories (category) VALUES (?)");
        stmt.run(category_name, (err) => {
            stmt.finalize();
            if (err) {
                reject(err);
            } else {
                resolve(category_name);
            }
        });
    });
}

async function addJoke(db, joke_content) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO Jokes (joke_content) VALUES (?)");
        stmt.run(joke_content, (err) => {
            stmt.finalize();
            if (err) {
                reject(err);
            } else {
                resolve(joke_content);
            }
        });
    });
}

async function addNewJokeToCategory(db, joke_content, category_name) {
    try {
        await addJoke(db, joke_content);
        const id_joke = await getJokeId(db, joke_content);
        const id_category = await getCategoryId(db, category_name);
        await addJokeToCategory(db, id_joke, id_category);
    } catch (err) {
        throw err;
    }
}

async function addJokeToCategory(db, joke_id, category_id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO JokesCategories (id_joke, id_category) VALUES (?, ?)");
        stmt.run(joke_id, category_id, (err) => {
            stmt.finalize();
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function likeJoke(db, joke_id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("UPDATE Jokes SET likes = likes + 1 WHERE id_joke = ?");
        stmt.run(joke_id, (err) => {
            stmt.finalize();
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function dislikeJoke(db, joke_id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("UPDATE Jokes SET dislikes = dislikes + 1 WHERE id_joke = ?");
        stmt.run(joke_id, (err) => {
            stmt.finalize();
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    setupDatabase,
    getCategoryId,
    getJoke,
    getRandomJoke, 
    getCategories,
    addCategory,
    likeJoke,
    dislikeJoke,
    getRandomJokeByCategory,
    getJokesByCategory,
    addNewJokeToCategory,
    addJokeToCategory,
}
