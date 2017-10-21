import { getObjectId, dummyData } from '../helpers/modelHelpers';

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

//   update (args) {
//     const updateFields = [ 'text'];    
//     updateFields.forEach(field => {
//         this[field] = args [field] || this[field];
//     });
//   }
}

