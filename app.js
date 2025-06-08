const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const adminRoute = require("./routes/admin");

const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  "mongodb+srv://nthauit96:MxssdtqaZQ2noerN@cluster0.bs1do.mongodb.net/deploy";

const app = express();
app.use(
  cors({
    origin: "https://session-client.vercel.app",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const store = new MongoDBStore({ uri: MONGODB_URI, collection: "sessions" });
app.use(
  session({
    secret: "deploy node",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(adminRoute);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error);
  });
