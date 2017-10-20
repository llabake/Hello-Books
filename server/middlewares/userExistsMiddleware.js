import { dummyData } from '../helpers/modelHelpers';


const userExists = (req, res, next) => {
    const userId = req.params.userId;
    if (dummyData.books.hasOwnProperty(userId)) {
        next();
    } else {
       return res.status(404).json({message: "User not found."})
    }
}

export default userExists;