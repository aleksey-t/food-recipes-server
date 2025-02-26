const pool = require("../../database/db");
class Model {
  findById(id, tableName) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject("id not defined");
      }

      pool.query(`SELECT * FROM ${tableName} WHERE id=${id}`, (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  }

  getAll(limit = 10, offset = 0, tableName) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, rows) => {
          if (err) {
            return reject(err);
          }

          resolve(rows);
        },
      );
    });
  }

  insert({ value, tableName, columnName }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO ${tableName} (${columnName}) VALUES (?)`,
        [value],
        (err, rows) => {
          if (err) {
            return reject(err);
          }

          resolve(rows);
        },
      );
    });
  }

  update({ value, tableName, columnName, id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE ${tableName} SET ${columnName} = ? WHERE id = ${id}`,
        [value],
        (err, rows) => {
          if (err) {
            return reject(err);
          }

          resolve(rows);
        },
      );
    });
  }

  delete({ tableName, id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM ${tableName} WHERE id=?`,
          [id],
        (err, rows) => {
          if (err) {
            return reject(err);
          }

          resolve(rows);
        },
      );
    });
  }
}

module.exports = Model;
