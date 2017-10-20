export const dummyData = {
    books: { 
        1: {
            "title": "so long a letter",
            "author": "mariam ba",
            "isbn": 65486565,
            "quantity": 56,
            "publishedYear": 2009,
            "deleted": "false",
            "id": 1
        },
        2: {
            "title": "fine boys",
            "author": "ehabsuen",
            "isbn": 65487565,
            "quantity": 6,
            "publishedYear": 2015,
            "deleted": "false",
            "id": 2
        }
    },
    reviews: {
        1: {
            "bookId": 1,
            "userId": 2,
            "text": "mesmerising",
            "id": 1
        },
        2: {
            "bookId": 2,
            "userId": 2,
            "text": "suspense",
            "id": 2
        },
        3: {
            "bookId": 1,
            "userId": 1,
            "text": "intrigue",
            "id": 3
        },

    },
    users: {
        1: {
            "username": "labakelagos",
            "email": "lagoslabake@gmail.com",
            "password": "mesmerising",
            "id": 1
        },
        2: {
            "username": "simbad",
            "email": "badsim@rocketmail.com",
            "password": "pandenomium",
            "id": 2
        },
        3: {
            "username": "keinzy",
            "email": "ayinla1",
            "password": "love4eva",
            "id": 3
        }
    }
};
  
export const getObjectId = (objectType) => {
    const dummyDataTypes = ['books', 'reviews'];
    if (dummyDataTypes.indexOf(objectType) !== -1 ){
      let id =  Object.keys(dummyData[objectType]).length + 1;
      return id;
    } else throw new Error (`dummyData type: ${objectType} not yet created`);
};

