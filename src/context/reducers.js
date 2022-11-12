import AsyncStorage from '@react-native-async-storage/async-storage';

export default (state, action) => {
  switch (action.type) {
    case 'ADD_CATEGORYLIST':   
      return {...state, categoryList: action.payload.list};
    case 'ADD_PRODUCTLIST':   
      return {...state, productList: action.payload.list};
    case 'CHANGE_CATEGORY':
      return {...state, plSelectedCategory: action.payload.category};
    case 'CHANGE_TABLE':
      return {...state, qrTableName: action.payload.tableName};
    case 'UPDATE_STAFF':
      const {staff} = action.payload;
      AsyncStorage.setItem('@user', JSON.stringify(staff));
      return {...state, staff: staff};
    default:
      return state;
  }
};
