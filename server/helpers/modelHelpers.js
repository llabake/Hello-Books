export const dummyData = {
    books: {
    
      
    }
};
  
export const getObjectId = (objectType) => {
    const dummyDataTypes = ['books'];
    if (dummyDataTypes.indexOf(objectType) !== -1 ){
      let id =  Object.keys(dummyData[objectType]).length + 1;
      return id;
    } else throw new Error (`dummyData type: ${objectType} not yet created`);
}

 