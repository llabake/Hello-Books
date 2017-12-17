<content>
<snippet>

# Hello-Books
Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books.

[![Build Status](https://travis-ci.org/llabake/Hello-Books.svg?branch=develop)](https://travis-ci.org/llabake/Hello-Books) [![Coverage Status](https://coveralls.io/repos/github/llabake/Hello-Books/badge.svg?branch=develop)](https://coveralls.io/github/llabake/Hello-Books?branch=develop)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)

# Description

Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books. The application also has an admin section where the admin can do things like add books, delete books, increase the quantity of a book etc.

# Built With

* [ExpressJs](https://expressjs.com/) - The web framework used
* [Sequelize](http://docs.sequelizejs.com/) - The ORM used
* [Postgres](https://www.postgresql.org/) - Database Used
* [NPM](https://www.npmjs.com/) - Dependency Management

# Installation

Clone the repo git clone https://github.com/llabake/hello-books.git and navigate to the project root directory

Install dependencies

Set up Express

Set up Database and make migrations by running the following commands.<br> 
- `sequelize db model:create.`
- `create necessary tables in the database.`
- `sequelize db migrate to apply changes in the table.`


# Available Scripts

In the project directory, you can :

## Start

- To start the app run `npm start-dev`. It restarts app when changes are made to the source code

## Test 
- To test run `npm test` or `npm run test`

## Coverage
- To check coverage `npm run coveralls`

Launches the interactive test runner and display test coverage reports

# Hosted API

https://myhellobooks.herokuapp.com/

# Published Template

https://llabake.github.io/Hello-Books/

# Functionality and Endpoints

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/api/v1/users/signup](#create-user) | Registers a new user
POST | [/api/v1/users/sigin](#login) | Logs a user in
POST | [/api/v1/users/signout](#logout) | Logs a user out
POST | [/api/v1/books/](#add-book) | Add a new book
PUT | [/api/v1/books/:bookId](#update-a-book) | Update book details
GET | [/api/v1/books/:bookId](#get-a-book) | Get a book
GET | [/api/v1/book](#get-all-books) | Get all books
POST | [/api/v1/users/borrow/:bookId](#borrow-book) | Borrow a book
POST | [/api/v1/users/return/:bookId](#return-book) | Return a book
PUT | [/api/v1/admin/user/:userId/borrow/:bookId](#borrow-book) | Accept a borrow request
PUT | [/api/v1/admin/user/:userId/return/:bookId](#return-book) | Accept return of book
GET | [/api/v1/borrowedbooks](#get-all-borrowed-books) | Get all borrowed books
POST | [/api/v1/book/:bookId/upvotes](#upvote-a-book) | Vote a book
POST | [/api/v1/book/:bookId/downvotes](#downvote-a-book) | Vote a book
GET | [/api/v1/books?sort=upvotes&order=decending](#get-book-most-upvote) | Get book with the most upvote
GET | [/api/v1/books?search=](#get-book-by-search) | Get book by search
POST | [/api/v1/books/fav/:bookId](#favorite-book) | Post a book as favorite
GET | [/api/v1/books/favbooks](#get-favorite-books) | Get a user's favorite book.
DELETE | [/api/v1/books/fav/:bookId](#delete-from-favorite-list) | Delete a book from a user's favorite list.
POST | [/api/v1/books/:bookId/review/](#post-reviews) | Post review for a book
DELETE | [/api/v1/books/review/:reviewId](#delete-reviews) | Delete review for a book
 

# Usage
- Run database migration with `npm run db:migrate`
- Start app development with `npm run start-dev`
- Install **Postman** and use to test all endpoints

# References
http://materializecss.com/<br/>
https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize#toc-generating-models <br/>
http://docs.sequelizejs.com/manual/tutorial/models-usage.html </br>
https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6</br>

# Author
Lemboye Labake

# License

</content>
</snippet>