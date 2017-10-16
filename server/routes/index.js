import IndexRoute from './indexRoute';
import bookRoute from './bookRoute';

const routes = (app) => {
  IndexRoute(app);
  bookRoute(app);
};

export default routes;
