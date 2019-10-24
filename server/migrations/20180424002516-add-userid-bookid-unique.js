'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.addConstraint('Reviews', ['userId', 'bookId'], {
      type: 'unique',
      name:'user_id_book_id_unique'
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeConstraint('Reviews' , 'user_id_book_id_unique')
  }
};
