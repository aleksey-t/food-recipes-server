const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use("/api/ingredients", require("./controllers/ingredientsController"));
app.use("/api/recipes", require("./controllers/recipeController"));
app.use("/api/users", require("./controllers/userController"));
app.use("/api/recipe-groups", require("./controllers/recipeGroupController"));

app.use(express.json());

app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}`);
});
