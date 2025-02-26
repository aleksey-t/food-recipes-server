const Model = require("../common/Model/Model");

class RecipeGroupModel extends Model {
  constructor() {
    super();
  }

  findById(id) {
    return super.findById(id, "recipe_groups");
  }

  getRecipeGroups(limit, offset) {
    return super.getAll(limit, offset, "recipe_groups");
  }

  async createRecipeGroup(recipeGroupName) {
    return super.insert({
      tableName: "recipe_groups",
      columnName: "recipe_group",
      value: recipeGroupName,
    });
  }

  async updateRecipeGroup(recipeGroupId, recipeGroupName) {
    return super.update({
      tableName: "recipe_groups",
      columnName: "recipe_group",
      value: recipeGroupName,
      id: recipeGroupId,
    });
  }

  async deleteRecipeGroup(recipeGroupId) {
    return super.delete({
      tableName: "recipe_groups",
      id: recipeGroupId,
    });
  }
}

module.exports = RecipeGroupModel;
