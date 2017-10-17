const indexRoute = (app) => {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to Hello Books',
  })
)};

export default indexRoute;
