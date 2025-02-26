const express = require("express");
const ingredientsRouter = express.Router();

const Ingredient = require("../models/IngredientModel.js");
const ingredientModel = new Ingredient();

ingredientsRouter.get("/:id", function (req, res) {
  ingredientModel
    .findById(req.params.id)
    .then((data) => {
      if (!data[0]) {
        return res.json([]);
      }

      const result = {
        id: data[0].id,
        ingredient: data[0].ingredient,
      };
      res.json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send("Ошибка: " + err);
    });
});

ingredientsRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const ingredients = await ingredientModel.getIngredients(
      limit,
      offset,
    );
    res.json(ingredients);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

ingredientsRouter.post("/", async (req, res) => {
  try {
    const ingredientName = req.body.ingredient;
    const ingredients = await ingredientModel.createIngredient(ingredientName);
    res.json({
        message: 'Created ingredient',
        id: ingredients.insertId,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

ingredientsRouter.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
      const ingredientName = req.body.ingredient;
    const ingredients = await ingredientModel.updateIngredient(id, ingredientName);
    res.json({
        message: 'Updated ingredient',
        id: ingredients.insertId,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

ingredientsRouter.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const ingredients = await ingredientModel.deleteIngredient(id);
    res.json({
        message: 'Deleted ingredient',
        id: ingredients.insertId,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

module.exports = ingredientsRouter;
