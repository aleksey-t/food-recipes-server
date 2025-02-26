### Food Recipes Server

## What is it: it is a rest api crud application for a food blog

## Why: ***I created it while learning node.js - it's a student project***


### Prerequisites

To run this you need node.js and mariaDB installed on you machine.

### Steps to run this app locally
- clone this repo
- cd into it
> cd food-recipes-server

- install dependencies
> npm install

- create a .env file in food-recipes-server folder

- .env file should have you database settings:

> PORT=8080
> 
> DB_HOST=localhost
> 
> DB_USER=root
> 
> DB_PASSWORD=your_db_password
> 
> DB_NAME=recipes

change your_db_password to the password that is set in your database.

- run a npm script to create the database
> npm run create-database

- (optional) fill the database with test data. test data is in now in russian language only - recipes, ingredients etc.
> npm run insert-test-data-into-database

- run the application
> npm run dev

by default, it runs on http://localhost:8080

example 1: GET http://localhost:8080/api/recipes
example 2: GET http://localhost:8080/api/recipes/2
example 3: GET http://localhost:8080/api/ingredients