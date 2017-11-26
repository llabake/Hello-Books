import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import logger from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import routes from './server/routes';
import db from './server/models/index';

dotenv.config();

// Set up the express app
const app = express();

const hostUrl = process.env.NODE_ENV === 'production' ?
  'myhellobooks.herokuapp.com' :
  'localhost:5000';

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Hello Books API',
    version: '1.0.0',
    description: 'An application that helps manage a library and its' +
    ' processes like stocking, tracking and renting of books.',
  },
  host: hostUrl,
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(express.static(path.join(__dirname, 'server/')));

// Log requests to the console.
app.use(logger('dev'));

const port = process.env.PORT || 5000;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Call all routes with app instance
routes(app);

/*
  Setup a default catch-all route that sends
  back a welcome message in JSON format.
*/
app.get('*', (req, res) => res.status(200).send({
  message: 'Route does not exist, explore at api/v1',
}));

if (process.env.NODE_ENV !== 'test') {
  db.sequelize.sync().then(() => {
    if (!module.parent) {
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    }
  });
}


export default app;
