import axios from 'axios';

/**
 * @description: secure token in the front-end
 * 
 * @class Authorization
 */
export default class Authorization {
/**
 * @description: sets token in axios headers for every server request
 * @param {String} token token to set
 * @return {Void} Void
 */
  static setToken(token) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }
}