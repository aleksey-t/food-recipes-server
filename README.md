# Food Recipes Server

## What is it
This is a REST API CRUD application for a food blog. It allows you to manage recipes, ingredients, users, and recipe groups.

## Why
I created this project while learning Node.js. It's a student project that I created from scratch to learn the basics of working with Express, MariaDB, and the REST API.

### Prerequisites

To run this you need **Node.js** and **MariaDB** installed on you machine.

### Steps to run this app locally
clone this repo ```git clone https://github.com/aleksey-t/food-recipes-server.git```

cd into it ```cd food-recipes-server```

install dependencies ```npm install```

create a .env file in food-recipes-server folder. .env file should have you database settings:

```
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=recipes
```

run npm script to create the database ```npm run create-database```

(optional) fill the database with test data. test data is in now in russian language only recipes, ingredients etc. 
```npm run insert-test-data-into-database```

run the application ```npm run dev```

by default, it runs on http://localhost:8080

example 1: GET http://localhost:8080/api/recipes

example 2: GET http://localhost:8080/api/recipes/2

example 3: GET http://localhost:8080/api/ingredients