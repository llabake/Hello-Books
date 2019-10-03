'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addConstraint('Reviews', ['userId', 'bookId'], {
      type: 'unique',
      name:'user_id_book_id_unique'
    });
  },

  down: async(queryInterface) => {
    await queryInterface.removeConstraint('Reviews' , 'user_id_book_id_unique')
  }
};
