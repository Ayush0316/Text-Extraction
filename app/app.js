const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(cors({origin:"*"}));
app.use(express.json());

app.use("/api/users", userRouter);
// app.use("/util", require('./routes/utilRoutes'));

module.exports = app;
