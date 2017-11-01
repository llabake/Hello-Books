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
    
    Object.keys(args).forEach((field)=>{
      this[field] = args[field];        
    });

    if (errors.length) {
      throw errors;
    };
    this.deleted = false;
    this.id = getObjectId('favorites');
  };
    
  create () {
    dummyData.favorites[this.id] = this;
  };

  static getAll () {
     const allFavorites = Object.keys(dummyData.favorites)
    .map(key => dummyData.favorites[key]).map((favorite) => {
        delete favorite.deleted;
        return favorite;
    });  
    return allFavorites;
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

