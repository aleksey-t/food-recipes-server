const Model = require("../common/Model/Model");

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
  const insertNameResult = super.insert({
      tableName: "recipes",
      columnName: "recipe_name",
      value: recipeName,
    });

  if(!recipeDescription){
    return insertNameResult;
  }

  const insertDscriptionResult = super.insert({
      tableName: "recipes",
      columnName: "recipe_description",
      value: recipeDescription,
    });

  return [insertNameResult,
    insertDscriptionResult];
  }

  async updateRecipeName(recipeId, recipeName) {
    return super.update({
      tableName: "recipes",
      columnName: "recipe_name",
      value: recipeName,
      id: recipeId,
    });
  }

  async updateRecipeDescription(recipeId, recipeDescription) {
    return super.update({
      tableName: "recipes",
      columnName: "recipe_description",
      value: recipeDescription,
      id: recipeId,
    });
  }

  async deleteRecipe(recipeId) {
    return super.delete({
      tableName: "recipes",
      id: recipeId,
    });
  }
}

module.exports = RecipeModel;
