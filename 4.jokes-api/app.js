// Import necessary modules
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const database = require("./database.js");

// Create Express app
const app = express();

// Set up middleware
app.use(express.json()); // for parsing application/json
app.use(cors());

let db = database.setupDatabase();

// API endpoints
// default route
app.get("/", (_, res) => { res.send("Hello, world!"); });
// Retrieve a random joke from all jokes in the database
app.get("/jokes/random", async (_, res) => { 
    try {
        const joke_content = await database.getRandomJoke(db);
        res.json({ joke: joke_content });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Retrieve a random joke from a category of jokes
app.get("/jokes/category/:category/random", async (req, res) => { 
    const category = req.params.category;
    try {
        const joke_content = await database.getRandomJokeByCategory(db, category);
        res.json({ joke: joke_content });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Retrieve a list of categories
app.get("/categories", async (_, res) => { 
    try {
        const categories = await database.getCategories(db);
        res.json({ categories });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Retrieve all jokes for a category 
app.get("/jokes/category/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const jokes = await database.getJokesByCategory(db, category);
        res.json({ jokes });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Retrieve a joke by id
app.get("/jokes/:id", async (req, res) => { 
    const id_joke = req.params.id
    try {
        const joke_content = await database.getJokeContent(db, id_joke);
        res.json({ joke: joke_content });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Add a new category of jokes
app.post("/categories", async (req, res) => { 
    const category = req.body.category;
    try {
        await database.addCategory(db, category);
        res.json({ category });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Add a new joke to a category
app.post("/jokes/category/:category", async (req, res) => {
    const category = req.params.category;
    const joke_content = req.body.joke_content;
    try {
        await database.addNewJokeToCategory(db, joke_content, category);
        res.json({ joke_content });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Add an existing joke to a category by joke id
app.post("/jokes/:id/category/:category", async (req, res) => {
    const id_joke = req.params.id;
    const category = req.params.category;
    try {
        const id_category = await database.getCategoryId(db, category);
        await database.addJokeToCategory(db, id_joke, id_category);
        res.json({ id_joke, category });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// like a joke
app.post("/jokes/:id/like", async (req, res) => {
    const id_joke = req.params.id;
    try {
        await database.likeJoke(db, id_joke);
        res.json({ id_joke });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// dislike a joke
app.post("/jokes/:id/dislike", async (req, res) => {
    const id_joke = req.params.id;
    try {
        await database.dislikeJoke(db, id_joke);
        res.json({ id_joke });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Start the server
const port = 3333;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
