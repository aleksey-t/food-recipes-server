const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use("/api/ingredients", require("./controllers/ingredientsController"));

app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}`);
});
