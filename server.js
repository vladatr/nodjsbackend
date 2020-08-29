const express = require("express");
const dotenv = require("dotenv");
const Middleware = require("./middleware/middleware");

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

const UsersController = require("./controllers/users-controller");

Middleware(app);

app.use("/api/users", UsersController);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})