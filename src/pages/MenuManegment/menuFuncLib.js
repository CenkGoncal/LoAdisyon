import React from 'react';
import database from '@react-native-firebase/database';
import parseUtilsDataArray from '../../utilities/parseUtilsDataArray';

const newReference = database();
//const dispatch = useDispatch();

export function UpdateCategory(values, callback) {
  newReference
    .ref(`CategoryList/${values.id}`)
    .update({
      Category: values.category,
      Icon: values.icon,
    })
    .then(() => {
      callback();
    });
}

export function AddCategory(values, callback) {
  newReference
    .ref('/CategoryList')
    .push()
    .set({
      Category: values.category,
      Icon: values.icon,
    })
    .then(() => {
      callback();
    });
}

export function RemoveCategory(values, callback) {
  newReference
    .ref(`CategoryList/${values.id}`)
    .remove()
    .then(() => {
      callback();
    });
}

export function AddProduct(values, callback) {
  newReference
    .ref('/ProductList')
    .push()
    .set({
      Category: values.category,
      ProductName: values.product,
      Description: values.description,
      Amount: values.amount,
    })
    .then(() => {
      callback();
    });
}

export function UpdateProduct(values, callback) {
  newReference
    .ref(`/ProductList/${values.id}`)
    .update({
      Category: values.category,
      ProductName: values.product,
      Description: values.description,
      Amount: values.amount,
    })
    .then(() => {
      callback();
    });
}

export function RemoveProduct(values, callback) {
  newReference
    .ref(`ProductList/${values.id}`)
    .remove()
    .then(() => {
      callback();
    });
}

export function readUsers(callback) {
  firestore()
    .collection('users')
    .get()
    .then(querySnapshot => {
      //console.log(querySnapshot);
      let arr = [];
      querySnapshot.forEach(documentSnapshot => {
        //console.log(querySnapshot);
        let item = {...documentSnapshot.data()};
        item.Id = documentSnapshot.id;
        arr.push(item);
      });

      callback(arr);
    });
}

export function readCategory(callback) {
  database()
    .ref('CategoryList/')
    .on('value', shapshot => {
      var list = null;
      if (shapshot.val() != null) list = parseUtilsDataArray(shapshot.val());

      callback(list);
    });
}

export function readProduct(categoryList, callback) {
  database()
    .ref('ProductList/')
    .on('value', shapshot => {
      var list = null;
      if (shapshot.val() != null) {
        list = arrangeProductList(
          parseUtilsDataArray(shapshot.val()),
          categoryList,
        );
        callback(list);
      }
    });
}

const arrangeProductList = (productList, categoryList) => {
  var newlist = productList.map(function (element, index, array) {
    element.Category = categoryList.filter(f => f.id == element.Category)[0];
    return element;
  });

  return newlist.sort(function (a, b) {
    let x = a.Category.id.toLowerCase();
    let y = b.Category.id.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
};

export const loadInformationForCache = callback => {
  let dto = {};
  readCategory(list => {
    dto.CategoryList = list;
    readProduct(dto.CategoryList, val => {
      dto.ProductList = val;
      callback(dto);
    });
  });
};
