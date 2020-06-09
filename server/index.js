const express = require("express");
const mongoose = require("mongoose");
const { mongoURI } = require("./config/keys");
require("./models/User");
require("./services/passport");

const app = express();

require("./routes/authRoutes")(app);
mongoose.connect(mongoURI);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
