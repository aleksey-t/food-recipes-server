const express = require("express");
const recipesRouter = express.Router();

const Recipe = require("../models/RecipeModel.js");
const recipeModel = new Recipe();

recipesRouter.get("/:id", function (req, res) {
  recipeModel
    .findById(req.params.id)
    .then((data) => {
      if (!data[0]) {
        return res.status(404).json({ message: "Рецепт не найден" });
      }

      const result = {
        id: data[0].id,
        recipe_name: data[0].recipe_name,
        recipe_description: data[0].recipe_description,
      };
      res.json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send("Ошибка: " + err);
    });
});

recipesRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const recipes = await recipeModel.getRecipes(limit, offset);
    res.json(recipes);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

recipesRouter.post("/", async (req, res) => {
  try {
    const { recipe_name, recipe_description } = req.body;
    const result = await recipeModel.createRecipe(
      recipe_name,
      recipe_description,
    );
    res.json({
      message: "Рецепт создан",
      id: result.insertId,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

recipesRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { recipe_name, recipe_description } = req.body;
    await recipeModel.updateRecipe(id, recipe_name, recipe_description);
    res.json({
      message: "Рецепт изменен",
      id: id,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

recipesRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await recipeModel.deleteRecipe(id);
    res.json({
      message: "Рецепт удален",
      id: id,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

module.exports = recipesRouter;
