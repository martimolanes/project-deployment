// Import necessary modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const database = require('./database.js');

// Create Express app
const app = express();

app.use(express.json()); // for parsing application/json

// Set up middleware
app.use(cors());

let db = database.setupDatabase();

// Define routes
app.get('/', (_, res) => { res.send('Hello, world!'); });
app.get('/categories', (_, res) => { 
    db.all('SELECT * FROM Categories', (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        res.send(rows);
    });
});
app.get('/jokes/random', (req, res) => { /* ... */ });
app.get('/jokes/category/:category/random', (req, res) => { 
    const category = req.params.category;
    console.log(category);
    const stmt = db.prepare('SELECT id_category FROM Categories WHERE category = ?');
    stmt.get(category, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        const id_category = row.id_category;
        console.log(id_category);
        const stmt1 = db.prepare('SELECT id_joke FROM JokesCategories WHERE id_category = ? ORDER BY RANDOM() LIMIT 1');
        stmt1.get(id_category, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            const id_joke = row.id_joke;
            console.log(id_joke);
            const stmt2 = db.prepare('SELECT joke_content FROM Jokes WHERE id_joke = ?');
            stmt2.get(id_joke, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                const joke_content = row.joke_content;
                res.json({ joke: joke_content });
            });
            stmt2.finalize();
        });
        stmt1.finalize();
    });
    stmt.finalize();
});
app.get('/jokes/category/:category', (req, res) => { });
app.get('/jokes/:id', (req, res) => { /* ... */ });
app.post('/categories', (req, res) => { 
    console.log('body: ' + JSON.stringify(req.body));
    const category = req.body.category;
    console.log(category);
    const stmt = db.prepare('INSERT INTO Categories (category) VALUES (?)');
    stmt.run(category, (err) => {
        if (err) {
            console.error(err.message);
        }
        res.json({ category });
    })
    stmt.finalize();
});
app.post('/jokes/category/:category', (req, res) => {
    const category = req.params.category;
    console.log(category);
    const joke_content = req.body.joke_content;
    console.log(joke_content);

    const stmt = db.prepare('INSERT INTO Jokes (joke_content) VALUES (?)');
    stmt.run(joke_content, (err) => {
        if (err) {
            console.error(err.message);
        }
        res.json({ joke: joke_content });
    })
    stmt.finalize();

    const stmt1 = db.prepare('SELECT id_joke FROM Jokes WHERE joke_content = ?');
    stmt1.get(joke_content, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        const id_joke = row.id_joke;
        const stmt2 = db.prepare('SELECT id_category FROM Categories WHERE category = ?');
        stmt2.get(category, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            const id_category = row.id_category;
            const stmt3 = db.prepare('INSERT INTO JokesCategories (id_joke, id_category) VALUES (?, ?)');
            stmt3.run(id_joke, id_category, (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
            stmt3.finalize();
        });
        stmt2.finalize();
    });
});
app.put('/jokes/:id/category/:category', (req, res) => { /* ... */ });
app.post('/jokes/:id/like', (req, res) => { /* ... */ });
app.post('/jokes/:id/dislike', (req, res) => { /* ... */ });

// Start the server
const port = 3333;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

