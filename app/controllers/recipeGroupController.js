const express = require("express");
const recipeGroupsRouter = express.Router();

const RecipeGroup = require("../models/RecipeGroupModel.js");
const recipeGroupModel = new RecipeGroup();

recipeGroupsRouter.get("/:id", function (req, res) {
  recipeGroupModel
    .findById(req.params.id)
    .then((data) => {
      if (!data[0]) {
        return res.status(404).json({ message: "Группа рецептов не найдена" });
      }

      const result = {
        id: data[0].id,
        recipe_group: data[0].recipe_group,
      };
      res.json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send("Ошибка: " + err);
    });
});

recipeGroupsRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const recipeGroups = await recipeGroupModel.getRecipeGroups(limit, offset);
    res.json(recipeGroups);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

recipeGroupsRouter.post("/", async (req, res) => {
  try {
    const { recipe_group } = req.body;
    const result = await recipeGroupModel.createRecipeGroup(recipe_group);
    res.json({
      message: "Группа рецептов создана",
      id: result.insertId,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

recipeGroupsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { recipe_group } = req.body;
    await recipeGroupModel.updateRecipeGroup(id, recipe_group);
    res.json({
      message: "Группа рецептов обновлена",
      id: id,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

recipeGroupsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await recipeGroupModel.deleteRecipeGroup(id);
    res.json({
      message: "Группа рецептов удалена",
      id: id,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

module.exports = recipeGroupsRouter;
