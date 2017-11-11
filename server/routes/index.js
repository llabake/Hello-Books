import IndexRoute from './indexRoute';
import bookRoute from './bookRoute';
import userRoute from './userRoute';

const routes = (app) => {
  IndexRoute(app);
  bookRoute(app);
  userRoute(app);
};

export default routes;
