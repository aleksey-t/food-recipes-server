const Model = require("../common/Model/Model");

class UserModel extends Model {
  constructor() {
    super();
  }

  findById(id) {
    return super.findById(id, "users");
  }

  getUsers(limit, offset) {
    return super.getAll(limit, offset, "users");
  }

  async createUser(userName) {
    return super.insert({
      tableName: "users",
      columnName: "user",
      value: userName,
    });
  }

  async updateUser(userId, userName) {
    return super.update({
      tableName: "users",
      columnName: "user",
      value: userName,
      id: userId,
    });
  }

  async deleteUser(userId) {
    return super.delete({
      tableName: "users",
      id: userId,
    });
  }
}

module.exports = UserModel;
