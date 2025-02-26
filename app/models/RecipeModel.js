const Model = require("../common/Model/Model");
const pool = require("../database/db");

class RecipeModel extends Model {
  constructor() {
    super();
  }

  findById(id) {
    return super.findById(id, "recipes");
  }

  getRecipes(limit, offset) {
    return super.getAll(limit, offset, "recipes");
  }

  async createRecipe(recipeName, recipeDescription) {
    if (!recipeName) {
      throw new Error("Название рецепта обязательно");
    }

    const sql = `
      INSERT INTO recipes (recipe_name, recipe_description)
      VALUES (?, ?)
    `;
    const values = [recipeName, recipeDescription || null]; // Если описание не указано, используем null

    return new Promise((resolve, reject) => {
      pool.query(sql, values, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId); // Возвращаем ID созданного рецепта
      });
    });
  }

  async updateRecipe(recipeId, recipeName, recipeDescription) {
    if (!recipeId) {
      throw new Error("ID рецепта обязательно");
    }

    const sql = `
      UPDATE recipes
      SET recipe_name = ?, recipe_description = ?
      WHERE id = ?
    `;
    const values = [recipeName, recipeDescription || null, recipeId];

    return new Promise((resolve, reject) => {
      pool.query(sql, values, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.affectedRows); // Возвращаем количество обновленных строк
      });
    });
  }

  async deleteRecipe(recipeId) {
    if (!recipeId) {
      throw new Error("ID рецепта обязательно");
    }

    return super.delete({
      tableName: "recipes",
      id: recipeId,
    });
  }
}

module.exports = RecipeModel;
