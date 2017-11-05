<content>
<snippet>

# Hello-Books

Andela100 Project

[![Build Status](https://travis-ci.org/llabake/Hello-Books.svg?branch=develop)](https://travis-ci.org/llabake/Hello-Books) [![Coverage Status](https://coveralls.io/repos/github/llabake/Hello-Books/badge.svg?branch=develop)](https://coveralls.io/github/llabake/Hello-Books?branch=develop)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)

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

https://llabake.github.io/Hello-Books/

# Functionality and Endpoints

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/api/v1/users/sigup](#create-user) | Registers a new user
POST | [/api/v1/users/sigin](#login) | Logs a user in
POST | [/api/v1/books/](#add-book) | Add a new book
PUT | [api/v1/book/bookId](#update-a-book) | Update a book details
DELETE | [/api/v1/bookid/bookId](#delete-a-book) | Delete a book
GET | [api/v1/books/bookId](#get-a-books) | Get a books
GET | [api/v1/book](#get-all-books) | Get all books
POST | [/api/v1/users/userId/borrow/bookId](#borrow-book) | Borrow a book
POST | [/api/v1/users/userId/return/bookId](#return-book) | Return a book
PUT | [/api/v1/users/userId/borrow/bookId](#borrow-book) | Accept a borrow request
PUT | [/api/v1/users/userId/return/bookId](#return-book) | Accept return of book
POST | [api/v1/book/bookId/votes](#vote-a-book) | Vote a book
GET | [api/v1/books?sort=upvotes&order=decending](#get-book-most-upvote) | Get book with the most upvote
POST | [api/v1/users/userId/fav/bookId](#favorite-book) | Post a book as favorite
GET | [api/v1/users/userId/books/favbooks](#get-favorite-books) | Get a user's favorite book.
POST | [api/v1/users/userId/review/bookId](#post-reviews) | Post review for a book
 

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