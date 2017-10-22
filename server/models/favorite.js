import { getObjectId, dummyData } from '../helpers/modelHelpers';

// const retrieveUserFavorite = (favorites) => {
//   myFavorite = [];
//   const allFavorites = dummyData.favorites;
//   for (let favId in allFavorites) {
//     if (allFavorites[favId].userId === req.params.userId) {
//       myFavorite.push(allFavorites[favId]);
//     }
//   }
// };

export default class Favorite {
  constructor(args) {
    const fields = ['bookId', 'userId'];
    const errors = [];
    const dataType = { bookId: 'number', userId:'number' };
    
    // check if required fields are present
    fields.forEach(field => {
      if (!args[field]) {
        errors.push({ path: field, message: `${field} is required` });
      } else if (typeof(args[field]) !== dataType[field]) {
        errors.push({ path: field, message: `${field} must be a ${dataType[field]}` });
      };
    });
    
    for (let key in args) {
      if (fields.indexOf(key) == -1) {
        errors.push({ message: `invalid field: ${key} found in args` });
      } else {
        this[key] = args[key];        
      };
    };

    if (errors.length) {
      throw errors;
    };
    this.deleted = 'false';
    this.id = getObjectId('favorites');
  };
    
  create () {
    dummyData.favorites[this.id] = this;
  };

  static getAll () {
    const returnedFavorites = [];
    const allFavorites = dummyData.favorites;
    for (let id in allFavorites) {
      const favorite = allFavorites[id];
      delete favorite.deleted;
      returnedFavorites.push(favorite);
    }
    return returnedFavorites;
  };
  
  static getById (id) {
    const favorite = dummyData.favorites[id];
    if (favorite) {
      delete favorite.deleted;
      return favorite;
    } else {
      throw `favorite with id: ${id} not found`;
    }
  };

  static getAllByUserId (userId) {
    const favorites = this.getAll();
    return favorites.filter(favorite => favorite.userId === userId);
  };
}

