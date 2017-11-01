import { dummyData } from '../helpers/modelHelpers';


const userExists = (req, res, next) => {
  const { userId } = req.params.userId;
  if (Object.prototype.hasOwnProperty.call(dummyData.users, userId)) {
    next();
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export default userExists;
