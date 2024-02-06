const express = require("express");
const database = require("../database.js");

const router = express.Router();

let db = database.setupDatabase();
// API endpoints
// default route
router.get("/", (_, res) => { res.send("Hello, world!"); });
// Retrieve a random joke from all jokes in the database
router.get("/jokes/random", async (_, res) => { 
    try {
        const joke = await database.getRandomJoke(db);
        res.json({ joke });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Retrieve a random joke from a category of jokes
router.get("/jokes/category/:category/random", async (req, res) => { 
    const category = req.params.category;
    try {
        const joke = await database.getRandomJokeByCategory(db, category);
        res.json({ joke });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Retrieve a list of categories
router.get("/categories", async (_, res) => { 
    try {
        const categories = await database.getCategories(db);
        res.json({ categories });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Retrieve all jokes for a category 
router.get("/jokes/category/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const jokes = await database.getJokesByCategory(db, category);
        res.json({ jokes });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Retrieve a joke by id
router.get("/jokes/:id", async (req, res) => { 
    const id_joke = req.params.id
    try {
        const joke = await database.getJokeContent(db, id_joke);
        res.json({ joke });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Add a new category of jokes
router.post("/categories", async (req, res) => { 
    const category = req.body.category;
    try {
        await database.addCategory(db, category);
        res.json({ category });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// Add a new joke to a category
router.post("/jokes/category/:category", async (req, res) => {
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
router.post("/jokes/:id/category/:category", async (req, res) => {
    const id_joke = req.params.id;
    const category_name = req.params.category;
    try {
        const id_category = await database.getCategoryId(db, category_name);
        await database.addJokeToCategory(db, id_joke, id_category);
        res.json({ id_joke, category: category_name });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// like a joke
router.post("/jokes/:id/like", async (req, res) => {
    const id_joke = req.params.id;
    try {
        await database.likeJoke(db, id_joke);
        res.json({ id_joke });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
// dislike a joke
router.post("/jokes/:id/dislike", async (req, res) => {
    const id_joke = req.params.id;
    try {
        await database.dislikeJoke(db, id_joke);
        res.json({ id_joke });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;
