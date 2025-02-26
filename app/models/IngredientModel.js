const Model = require("../common/Model/Model");

class IngredientModel extends Model {
  constructor() {
    super();
  }

  findById(id) {
    return super.findById(id, "ingredients");
  }

  getIngredients(limit, offset) {
    return super.getAll(limit, offset, "ingredients");
  }

  async createIngredient(ingredientName) {
    return super.insert({
      tableName: "ingredients",
      columnName: "ingredient",
      value: ingredientName,
    });
  }

  async updateIngredient(ingredientId, ingredientName) {
    return super.update({
      tableName: "ingredients",
      columnName: "ingredient",
      value: ingredientName,
      id: ingredientId,
    });
  }

  async deleteIngredient(ingredientId) {
    return super.delete({
      tableName: "ingredients",
      id: ingredientId,
    });
  }
}

module.exports = IngredientModel;
