<content>
<snippet>

# Hello-Books

Andela100 Project

[![Build Status](https://travis-ci.org/llabake/more-recipes.svg?branch=develop)](https://travis-ci.org/llabake/more-recipes) [![Coverage Status](https://coveralls.io/repos/github/llabake/more-recipes/badge.svg?branch=develop)](https://coveralls.io/github/llabake/more-recipes?branch=develop)

# Description

Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books. The application also has an admin section where the admin can do things like add books, delete books, increase the quantity of a book etc.

# Installation

Clone the repo git clone https://github.com/llabake/hello-books.git and navigate to the project root directory

Install depndencies

Set up Express

Set up Database and make migrations by running the following commands.<br> 
- `sequelize db model:create.`
- `create necessary tables in the database.`
- `sequelize db migrate to apply changes in the table.`

# Hosted API

https://myhellobooks.herokuapp.com/

# Published Template

https://llabake.github.io/hello-books/

# Functionality and Endpoints

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/api/v1/users/sigup](#create-user) | Registers a new user
POST | [/api/v1/users/sigin](#login) | Logs a user in
POST | [/api/v1/recipe/](#create-recipe) | Create a new recipe
PUT | [api/v1/recipe/recipeId](#update-a-recipe) | Update a recipe details
DELETE | [/api/v1/recipeid/recipeId](#delete-a-recipe) | Delete a recipe
GET | [api/v1/recipes/recipeId](#get-a-recipes) | Get a recipes
GET | [api/v1/recipe](#get-all-recipes) | Get all recipes
POST | [api/v1/recipe/recipeId/votes](#vote-a-recipe) | Vote a recipe
GET | [api/v1/recipes?sort=upvotes&order=ascending](#get-recipe-most-upvote) | Get recipe with the most upvote
POST | [api/v1/users/userId/recipes/recipeId](#favorite-recipe) | Post a recipe as favorite
GET | [api/v1/users/userId/recipes/recipeId](#get-favorite-recipes) | Get a user's favorite recipe.
POST | [api/v1/recipe/recipeId/reviews](#post-reviews) | Post review for a recipe
 

# Usage

The app can be used with Postman, before making requests, make sure the server is running by running nodemon app.js

# References

https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize#toc-generating-models <br/>
http://docs.sequelizejs.com/manual/tutorial/models-usage.html </br>
https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6</br>

# Author
Lemboye Labake

# License

</content>
</snippet>