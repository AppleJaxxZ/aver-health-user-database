const express = require("express");
const expressValidator = require("express-validator");
const app = express();
//combo is used instead of body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//morgan middleware logger
const morgan = require("morgan");

//import mongoose
const mongoose = require("mongoose");

//middleware (morgan is a console logger.  Dev option highlights the color of the responses and requests and status.)
app.use(morgan("dev"));

app.use(expressValidator());

//for using he .env file
const dotenv = require("dotenv");
dotenv.config();

//DB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//bring in routes
const userRoutes = require("./routes/user");
//we can now use app.use instead of app.get because we are now using the middleware with express Router();
app.use("/", userRoutes);

const port = 8880;
app.listen(port, () => {
  console.log(`A Node Js Api is listening on port: ${port} `);
});
