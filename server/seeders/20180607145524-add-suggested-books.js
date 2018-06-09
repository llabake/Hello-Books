
module.exports = {
  up: queryInterface =>
  // Add Request Books
    queryInterface.bulkInsert('RequestBooks', [{
      title: 'There Alchemist' ,
      author: 'Paul Coelho',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'The Secret Life of Baba Segi\'s wives',
      author: 'Lola Shoneyin',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'The Fault in our Stars' ,
      author: 'John Green',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Don\'t be Sad' ,
      author: 'Aaidh ibn Abdullah al-Qarni',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Malcolm X',
      author: 'Alex Haley, Malcolm X',
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('RequestBooks', null, {})
};
