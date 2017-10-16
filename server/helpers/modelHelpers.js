export const dummyData = {
    books: { 1: {
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
    }
};
  
export const getObjectId = (objectType) => {
    const dummyDataTypes = ['books'];
    if (dummyDataTypes.indexOf(objectType) !== -1 ){
      let id =  Object.keys(dummyData[objectType]).length + 1;
      return id;
    } else throw new Error (`dummyData type: ${objectType} not yet created`);
}
