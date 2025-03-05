const mysql = require("mysql2/promise"); // Используем промисы для удобства
require("dotenv").config(); // Для загрузки переменных окружения

// Конфигурация подключения к базе данных
const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
};

// SQL-запросы для создания базы данных и таблиц
const sqlQueries = [
    `DROP DATABASE IF EXISTS \`recipes\`;`, // Удаляем базу данных, если она существует
    `CREATE DATABASE IF NOT EXISTS \`recipes\``, // Создаем базу данных
    `USE \`recipes\`;`, // Используем созданную базу данных

    // Таблица ingredients
    `
    CREATE TABLE IF NOT EXISTS \`ingredients\` (
      \`id\` INT(11) NOT NULL AUTO_INCREMENT,
      \`ingredient\` VARCHAR(50) NOT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB;
  `,

    // Таблица recipes
    `
    CREATE TABLE IF NOT EXISTS \`recipes\` (
      \`id\` INT(11) NOT NULL AUTO_INCREMENT,
      \`recipe_name\` VARCHAR(50) NOT NULL,
      \`recipe_description\` VARCHAR(255) DEFAULT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB;
  `,

    // Таблица recipe_ingredients (связующая таблица)
    `
    CREATE TABLE IF NOT EXISTS \`recipe_ingredients\` (
      \`recipe_id\` INT(11) NOT NULL,
      \`ingredient_id\` INT(11) NOT NULL,
      \`quantity\` VARCHAR(50) DEFAULT NULL, -- Количество ингредиента
      PRIMARY KEY (\`recipe_id\`, \`ingredient_id\`),
      FOREIGN KEY (\`recipe_id\`) REFERENCES \`recipes\` (\`id\`) ON DELETE CASCADE,
      FOREIGN KEY (\`ingredient_id\`) REFERENCES \`ingredients\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB;
  `,

    // Таблица users
    `
    CREATE TABLE IF NOT EXISTS \`users\` (
      \`id\` INT(11) NOT NULL AUTO_INCREMENT,
      \`user\` VARCHAR(50) NOT NULL DEFAULT '0',
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB;
  `,

    // Таблица recipe_groups
    `
    CREATE TABLE IF NOT EXISTS \`recipe_groups\` (
      \`id\` INT(11) NOT NULL AUTO_INCREMENT,
      \`recipe_group\` VARCHAR(50) NOT NULL DEFAULT '0',
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB;
  `,
];

// Основная функция для выполнения скрипта
async function createDatabase() {
    let connection;

    try {
        // Подключаемся к базе данных
        connection = await mysql.createConnection(dbConfig);
        console.log("Подключение к базе данных установлено.");

        // Выполняем SQL-запросы
        for (const query of sqlQueries) {
            await connection.query(query);
            console.log(`Запрос выполнен: ${query.split("\n")[0]}...`);
        }

        console.log("База данных и таблицы успешно созданы.");
    } catch (error) {
        console.error("Ошибка при выполнении скрипта:", error);
    } finally {
        // Закрываем соединение
        if (connection) {
            await connection.end();
            console.log("Соединение с базой данных закрыто.");
        }
    }
}

// Запуск скрипта
createDatabase();