const express = require("express");
const usersRouter = express.Router();

const User = require("../models/UserModel.js");
const userModel = new User();

usersRouter.get("/:id", function (req, res) {
  userModel
    .findById(req.params.id)
    .then((data) => {
      if (!data[0]) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const result = {
        id: data[0].id,
        user: data[0].user,
      };
      res.json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send("Ошибка: " + err);
    });
});

usersRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const users = await userModel.getUsers(limit, offset);
    res.json(users);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const { user } = req.body;
    const result = await userModel.createUser(user);
    res.json({
      message: "Пользователь создан",
      id: result.insertId,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

usersRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    await userModel.updateUser(id, user);
    res.json({
      message: "Пользователь обновлен",
      id: id,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

usersRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.deleteUser(id);
    res.json({
      message: "Пользователь удален",
      id: id,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Ошибка: " + err);
  }
});

module.exports = usersRouter;
