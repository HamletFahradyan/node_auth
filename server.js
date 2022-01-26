const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "node-session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true,
        sameSite: 'strict'
    })
);

// database
const db = require("./app/models");

db.sequelize.sync();

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});