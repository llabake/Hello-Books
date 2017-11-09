import { getObjectId, dummyData } from '../helpers/modelHelpers';

/**
 *
 *
 * @export
 * @class Favorite
 */
export default class Favorite {
  /**
   * Creates an instance of Favorite.
   * @param {any} args
   * @memberof Favorite
   */
  constructor(args) {
    const errors = [];

    Object.keys(args).forEach((field) => {
      this[field] = args[field];
    });

    if (errors.length) {
      throw errors;
    }
    this.deleted = false;
    this.id = getObjectId('favorites');
  }
  /**
   *
   *
   * @memberof Favorite
   * @returns {any} favorite book object
   */
  create() {
    dummyData.favorites[this.id] = this;
  }
  /**
 *
 *
 * @static
 * @returns {any} all favorite object
 * @memberof Favorite
 */
  static getAll() {
    const allFavorites = Object.keys(dummyData.favorites)
      .map(key => dummyData.favorites[key]).map((favorite) => {
        delete favorite.deleted;
        return favorite;
      });
    return allFavorites;
  }
  /**
 *
 *
 * @static
 * @param {any} id
 * @returns {any} a single favorite object
 * @memberof Favorite
 */
  static getById(id) {
    const favorite = dummyData.favorites[id];
    if (favorite) {
      delete favorite.deleted;
      return favorite;
    }
    throw `favorite with id: ${id} not found`;
  }
  /**
 *
 *
 * @static
 * @param {any} userId
 * @returns {any} user's favorite
 * @memberof Favorite
 */
  static getAllByUserId(userId) {
    const favorites = this.getAll();
    return favorites.filter(favorite => favorite.userId === userId);
  }
}

