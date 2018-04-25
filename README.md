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
* [Swaggerhub](https://swaggerhub.com) -API Documentation
* [Webpack](https://webpack.js.org/) -Build Front End
* [Reactjs](reactjs.org) Front End framework
* [Jest](https://facebook.github.io/jest) Front End test 


# Installation

* Install [**Node JS**](https://nodejs.org/en/)
* Install [**Postgres**](https://www.postgresql.org/)
* Clone this **repository**
> - To clone this repository.
> - Scroll to the top of the page and look for the `clone or download` green button
> - click on this green button and a white tab pops up with an https url and an option to either `Open in Desktop` or `Download Zip`
> - copy the https link may look like this `https://github.com/llabake/hello-books.git`
> - open your terminal and `cd` to the directory where you would want the repository to be cloned
> - run the command `git clone https://github.com/llabake/hello-books.git` in order to clone the repository.
* **cd** into the root of the **project directory**.
> after cloning the repository, change directory into the repository
> in the repository run `npm install` in the terminal to install all Dependecies
* Create Postgresql database, and run migrations
* After Setting your database run the following command to run `database migrations and seed`<br>
> - `sequelize db:migrate:undo:all` to drop database,
> - `sequelize db:migrate` to run migration,
> - `sequelize db:seed:all` to seed the database,
> - `sequelize db:seed:undo:all` to undo seed,

* Create a `.env` file in the root directory of the application as in the .env.example file. Set up your database for test and development configuration
* Start the app

# Available Scripts

In the project directory, you can :

## Start

- To start the app run `npm start-dev`. It restarts app when changes are made to the source code

## Test

- Server side testing is done through the use of `supertest`, `mocha` and `chai` packages. `supertest` is used to make requests to the api and `mocha` is the testing framework and `chai` is the assertion library. They will both be installed when you run `npm install` and the tests will run when you run `npm test`.
- Run `npm test` or `npm run test`

## Coverage
- To check coverage `npm run coveralls`

Launches the interactive test runner and display test coverage reports


# Authentication

- It uses JSON Web Token (JWT) for authentication.
- Token is generated at sign up
- Token gets verified each time user interact with the    application
- Admin user will be created when you run seed

# Hosted API

https://myhellobooks.herokuapp.com/

# Published Template

https://llabake.github.io/Hello-Books/

# API Docs

To get more information on how to use the API, a good place to start would be here: [Hello Books Doc](https://myhellobooks.herokuapp.com/api-docs/) on swaggerhub.

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

# Contibution
- If you are interested in contributing to the development of this project , check the [**Contributing**](CONTRIBUTING.md) file.

# References
[Materializecss](http://materializecss.com/)<br/>
[Scotch](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize#toc-generating-models) <br/>
[Sequelize](http://docs.sequelizejs.com/manual/tutorial/models-usage.html) </br>
[Medium ](https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6)</br>

# Author
Lemboye Labake

# License
[License](https://github.com/llabake/Hello-Books/blob/develop/LICENSE)

</content>
</snippet>