//============================[Requirements]========================
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json());

// =============================[ Connect DataBase ]=========================
mongoose
  .connect(
    "mongodb+srv://Shivanandkasture:W7tqiVrCQy7g4F7h@cluster0.a35v6.mongodb.net/ForgetPassword?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("database is connected"))
  .catch((err) => console.log(err.message));

app.use("/", route);


app.listen( 3001, function () {
  console.log("Express app is running on port " +  3001);
});
