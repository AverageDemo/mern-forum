const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const admin = require("./routes/api/admin");
const forum = require("./routes/api/forum");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const keys = require("./config/keys");

mongoose.set("useFindAndModify", false);
mongoose
    .connect(
        keys.mongoURI,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/forum", forum);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
