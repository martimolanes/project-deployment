// Import necessary modules
const express = require("express");
const cors = require("cors");
const v1Router = require("./routes/v1.js");

// Create Express app
const app = express();

// Set up middleware
app.use(express.json()); // for parsing application/json
app.use(cors());

// Use the v1 router for all routes starting with /v1
app.use("/v1", v1Router);

// Start the server
const port = 3333;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
