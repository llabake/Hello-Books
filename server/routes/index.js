import IndexRoute from './indexRoute';
import BookRoute from './bookRoute';
import UserRoute from './userRoute';

const routes = (app) => {
  IndexRoute(app);
  BookRoute(app);
  UserRoute(app);
};

export default routes;
