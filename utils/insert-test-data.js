const mysql = require("mysql2/promise");
require("dotenv").config();

// Конфигурация подключения к базе данных
const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "recipes",
};

// Тестовые данные для вставки
const testData = {
    ingredients: [
        { ingredient: "Картофель" },
        { ingredient: "Морковь" },
        { ingredient: "Лук" },
        { ingredient: "Чеснок" },
        { ingredient: "Куриное филе" },
        { ingredient: "Сливки" },
        { ingredient: "Сыр" },
        { ingredient: "Помидоры" },
        { ingredient: "Огурцы" },
        { ingredient: "Зелень" },
        { ingredient: "Рис" },
        { ingredient: "Гречка" },
        { ingredient: "Макароны" },
        { ingredient: "Говядина" },
        { ingredient: "Свинина" },
        { ingredient: "Яйца" },
        { ingredient: "Молоко" },
        { ingredient: "Масло сливочное" },
        { ingredient: "Масло растительное" },
        { ingredient: "Сметана" },
        { ingredient: "Творог" },
        { ingredient: "Мука" },
        { ingredient: "Сахар" },
        { ingredient: "Соль" },
        { ingredient: "Перец" },
        { ingredient: "Лавровый лист" },
        { ingredient: "Укроп" },
        { ingredient: "Петрушка" },
        { ingredient: "Базилик" },
        { ingredient: "Кинза" },
        { ingredient: "Кукуруза" },
        { ingredient: "Горошек" },
        { ingredient: "Фасоль" },
        { ingredient: "Грибы" },
        { ingredient: "Баклажаны" },
        { ingredient: "Кабачки" },
        { ingredient: "Тыква" },
        { ingredient: "Капуста" },
        { ingredient: "Брокколи" },
        { ingredient: "Шпинат" },
        { ingredient: "Лимон" },
        { ingredient: "Апельсин" },
        { ingredient: "Яблоки" },
        { ingredient: "Груши" },
        { ingredient: "Бананы" },
        { ingredient: "Клубника" },
        { ingredient: "Малина" },
        { ingredient: "Черника" },
        { ingredient: "Мед" },
        { ingredient: "Орехи" },
        { ingredient: "Изюм" },
        { ingredient: "Корица" },
        { ingredient: "Ваниль" },
        { ingredient: "Кунжут" },
        { ingredient: "Соевый соус" },
        { ingredient: "Уксус" },
        { ingredient: "Горчица" },
        { ingredient: "Майонез" },
        { ingredient: "Кетчуп" },
    ],
    recipes: [
        {
            recipe_name: "Картофельное пюре",
            recipe_description: "Отварите картофель, разомните его с маслом и молоком, добавьте соль по вкусу.",
        },
        {
            recipe_name: "Куриный суп",
            recipe_description: "Сварите куриный бульон, добавьте нарезанные овощи и варите до готовности.",
        },
        {
            recipe_name: "Салат из помидоров и огурцов",
            recipe_description: "Нарежьте помидоры и огурцы, добавьте зелень, соль, перец и заправьте маслом.",
        },
        {
            recipe_name: "Жареная курица",
            recipe_description: "Обжарьте куриное филе на сковороде с чесноком и специями до золотистой корочки.",
        },
        {
            recipe_name: "Сырный соус",
            recipe_description: "Растопите сливочное масло, добавьте муку, молоко и сыр, перемешайте до однородности.",
        },
    ],
    recipe_ingredients: [
        // Картофельное пюре
        { recipe_id: 1, ingredient_id: 1, quantity: "500 г" }, // Картофель
        { recipe_id: 1, ingredient_id: 18, quantity: "50 г" },  // Масло сливочное
        { recipe_id: 1, ingredient_id: 17, quantity: "100 мл" }, // Молоко
        { recipe_id: 1, ingredient_id: 24, quantity: "по вкусу" }, // Соль

        // Куриный суп
        { recipe_id: 2, ingredient_id: 5, quantity: "300 г" },  // Куриное филе
        { recipe_id: 2, ingredient_id: 2, quantity: "1 шт." },  // Морковь
        { recipe_id: 2, ingredient_id: 3, quantity: "1 шт." },  // Лук
        { recipe_id: 2, ingredient_id: 1, quantity: "2 шт." },  // Картофель
        { recipe_id: 2, ingredient_id: 24, quantity: "по вкусу" }, // Соль

        // Салат из помидоров и огурцов
        { recipe_id: 3, ingredient_id: 8, quantity: "2 шт." },  // Помидоры
        { recipe_id: 3, ingredient_id: 9, quantity: "2 шт." },  // Огурцы
        { recipe_id: 3, ingredient_id: 10, quantity: "по вкусу" }, // Зелень
        { recipe_id: 3, ingredient_id: 24, quantity: "по вкусу" }, // Соль
        { recipe_id: 3, ingredient_id: 25, quantity: "по вкусу" }, // Перец

        // Жареная курица
        { recipe_id: 4, ingredient_id: 5, quantity: "400 г" },  // Куриное филе
        { recipe_id: 4, ingredient_id: 4, quantity: "2 зубчика" }, // Чеснок
        { recipe_id: 4, ingredient_id: 19, quantity: "2 ст.л." }, // Масло растительное
        { recipe_id: 4, ingredient_id: 24, quantity: "по вкусу" }, // Соль
        { recipe_id: 4, ingredient_id: 25, quantity: "по вкусу" }, // Перец

        // Сырный соус
        { recipe_id: 5, ingredient_id: 18, quantity: "50 г" },  // Масло сливочное
        { recipe_id: 5, ingredient_id: 22, quantity: "1 ст.л." }, // Мука
        { recipe_id: 5, ingredient_id: 17, quantity: "200 мл" }, // Молоко
        { recipe_id: 5, ingredient_id: 7, quantity: "100 г" },  // Сыр
        { recipe_id: 5, ingredient_id: 24, quantity: "по вкусу" }, // Соль
    ],
    users: [
        { user: "Иван Иванов" },
        { user: "Мария Петрова" },
        { user: "Алексей Сидоров" },
    ],
    recipe_groups: [
        { recipe_group: "Основные блюда" },
        { recipe_group: "Супы" },
        { recipe_group: "Салаты" },
        { recipe_group: "Соусы" },
        { recipe_group: "Завтраки" },
        { recipe_group: "Десерты" },
    ],
};

// Основная функция для вставки тестовых данных
async function insertTestData() {
    let connection;

    try {
        // Подключаемся к базе данных
        connection = await mysql.createConnection(dbConfig);
        console.log("Подключение к базе данных установлено.");

        // Вставляем данные в таблицу ingredients
        for (const item of testData.ingredients) {
            await connection.query("INSERT INTO ingredients (ingredient) VALUES (?)", [item.ingredient]);
            console.log(`Добавлен ингредиент: ${item.ingredient}`);
        }

        // Вставляем данные в таблицу recipes
        for (const item of testData.recipes) {
            await connection.query(
                "INSERT INTO recipes (recipe_name, recipe_description) VALUES (?, ?)",
                [item.recipe_name, item.recipe_description]
            );
            console.log(`Добавлен рецепт: ${item.recipe_name}`);
        }

        // Вставляем данные в таблицу recipe_ingredients
        for (const item of testData.recipe_ingredients) {
            await connection.query(
                "INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES (?, ?, ?)",
                [item.recipe_id, item.ingredient_id, item.quantity]
            );
            console.log(`Связан рецепт ${item.recipe_id} с ингредиентом ${item.ingredient_id}`);
        }

        // Вставляем данные в таблицу users
        for (const item of testData.users) {
            await connection.query("INSERT INTO users (user) VALUES (?)", [item.user]);
            console.log(`Добавлен пользователь: ${item.user}`);
        }

        // Вставляем данные в таблицу recipe_groups
        for (const item of testData.recipe_groups) {
            await connection.query("INSERT INTO recipe_groups (recipe_group) VALUES (?)", [item.recipe_group]);
            console.log(`Добавлена группа рецептов: ${item.recipe_group}`);
        }

        console.log("Тестовые данные успешно добавлены.");
    } catch (error) {
        console.error("Ошибка при вставке данных:", error);
    } finally {
        // Закрываем соединение
        if (connection) {
            await connection.end();
            console.log("Соединение с базой данных закрыто.");
        }
    }
}

// Запуск скрипта
insertTestData();