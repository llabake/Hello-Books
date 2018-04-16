import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
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
app.use(express.static(path.join(__dirname, 'dist/')));
app.use(express.static(path.join(__dirname, 'client/')));

// Allow cross origin resource sharing
app.use(cors())

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
  back a response message in JSON format.
*/
app.use('/api/*', (req, res) => res.status(404).send({
  message: 'Route does not exist, explore at api/v1',
}));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'))
});

if (process.env.NODE_ENV !== 'test') {
  db.sequelize.sync().then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${port}`);
    });
  });
}

export default app;
