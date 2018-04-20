'use strict';

module.exports = {
  up: (queryInterface) => {
    queryInterface.addConstraint('Reviews', ['userId', 'bookId'], {
      type: 'unique',
      name:'user_id_book_id_unique'
    });
  },

  down: (queryInterface) => {
    queryInterface.removeConstraint('Reviews' , 'user_id_book_id_unique')
  }
};
