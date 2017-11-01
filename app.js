import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './server/routes';

// Set up the express app
const app = express();

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
  message: 'Welcome to Hello Books.',
}));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}


export default app;
