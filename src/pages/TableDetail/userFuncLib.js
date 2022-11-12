import React from 'react';
import firestore from '@react-native-firebase/firestore';
import parseUtilsDataArray from '../../utilities/parseUtilsDataArray';
import {PaymentMethods} from '../../utilities/Constants';

export function readUsers(callback) {
  firestore()
    .collection('users')
    .get()
    .then(querySnapshot => {
      let arr = [];
      querySnapshot.forEach(documentSnapshot => {
        let item = {...documentSnapshot.data()};
        item.Id = documentSnapshot.id;
        arr.push(item);
      });

      callback(arr);
    });
}

export function userAdd(user, callback) {
  firestore()
    .collection('users')
    .add(user)
    .then(() => {
      readUsers(val => {
        callback(val);
      });
    });
}

export function userUpdate(user, callback) {
  firestore()
    .doc(`users/${user.Id}`)
    .update(user)
    .then(() => {
      readUsers(val => {
        callback(val);
      });
    });
}

export function deleteUser(user, callback) {
  firestore()
    .collection('users')
    .doc(user.Id)
    .delete()
    .then(() => {
      readUsers(val => {
        callback(val);
      });
    });
}

export function addOrder(orders, callback) {
  var batch = firestore().batch();

  orders.forEach(doc => {
    batch.set(firestore().collection('Orders').doc(), doc);
  });

  batch.commit().then(function () {
    callback();
  });
}

export function getOrderDetail(filter, callback) {

  var startfulldate = firestore.Timestamp.fromDate(
    new Date(filter.startDate),
  );
  var endfulldate = firestore.Timestamp.fromDate(
    new Date(filter.endDate),
  );

  firestore()
    .collection('Orders')
    .where('TableName', '==', filter.qrTableName)
    .where('PaymentState', '==', false)
    .where('OrderDate', '>=', startfulldate)
    .where('OrderDate', '<=', endfulldate)
    .get()
    .then(querySnapshot => {
      let arr = [];
      querySnapshot.forEach(documentSnapshot => {
        let item = {...documentSnapshot.data()};

        if (arr.filter(f => f.ProductId)) item.Id = documentSnapshot.id;
        arr.push(item);
      });

      const sums = [
        ...arr
          .reduce((map, item) => {
            const {ProductId: key, Quantity} = item;
            const prev = map.get(key);

            if (prev) {
              prev.Quantity += Quantity;
            } else {
              map.set(key, Object.assign({}, item));
            }

            return map;
          }, new Map())
          .values(),
      ];

      callback(sums);
    });
}

export function getOrderDetailAll(request,callback) {
  var startfulldate = firestore.Timestamp.fromDate(
    new Date(request.startDate),
  );
  var endfulldate = firestore.Timestamp.fromDate(
    new Date(request.endDate),
  );

  firestore()
    .collection('Orders')
    .where('PaymentState', '==', false)
    .where('OrderDate', '>=', startfulldate)
    .where('OrderDate', '<=', endfulldate)
    .get()
    .then(querySnapshot => {
      let arr = [];
      querySnapshot.forEach(documentSnapshot => {
        let data = {...documentSnapshot.data()};
        debugger;
        if (
          arr.length < 0 ||
          arr.filter(f => f.TableName == data.TableName).length <= 0
        )
          arr.push({
            TableName: data.TableName,
            TotalPrice: data.Quantity * data.UnitPrice,
          });
        else
          arr = arr.map(item => {
            if (item.tableName == data.tableName)
              item.TotalPrice += data.Quantity * data.UnitPrice;

            return item;
          });
      });
      console.log(arr);

      callback(arr);
    });
}

export function getOrderReport(filters, callback) {
  var startfulldate = firestore.Timestamp.fromDate(new Date(filters.startDate));
  var endfulldate = firestore.Timestamp.fromDate(new Date(filters.endDate));

  firestore()
    .collection('Orders')
    .where('PaymentState', '==', true)
    .where('OrderDate', '>=', startfulldate)
    .where('OrderDate', '<=', endfulldate)
    .get()
    .then(documentSnapshot => {
      var data = [];

      documentSnapshot.forEach(querySnapshot => {
        let value = {...querySnapshot.data()};
        data.push(value);
      });

      console.log(data);

      const dataByProduct = data.reduce((acc, value) => {
        // Group initialization
        if (!acc[value.ProductId]) {
          acc[value.ProductId] = {};
          acc[value.ProductId].Quantity = value.Quantity;
          acc[value.ProductId].TotalPrice = value.Quantity * value.UnitPrice;
        } else {
          acc[value.ProductId].Quantity += value.Quantity;
          acc[value.ProductId].TotalPrice += value.Quantity * value.UnitPrice;
        }

        return acc;
      }, {});

      const dataByPaymentMethod = data.reduce((acc, value) => {
        // Group initialization
        if (!acc[value.PaymentMethod]) {
          acc[value.PaymentMethod] = {};
          acc[value.PaymentMethod].Name =
            value.PaymentMethod == PaymentMethods.Cash
              ? 'Nakit'
              : 'Kredi Kartı';
          acc[value.PaymentMethod].Quantity = value.Quantity;
          acc[value.PaymentMethod].TotalPrice =
            value.Quantity * value.UnitPrice;
        } else {
          acc[value.PaymentMethod].Quantity += value.Quantity;
          acc[value.PaymentMethod].TotalPrice +=
            value.Quantity * value.UnitPrice;
        }

        return acc;
      }, {});

      const dataTotals = {};
      dataTotals.TotalQuantity = data.reduce((acc, value) => {
        return acc + value.Quantity;
      }, 0);
      dataTotals.TotalSalesPrice = data.reduce((acc, value) => {
        return acc + value.Quantity * value.UnitPrice;
      }, 0);

      let result = [];
      result.push(parseUtilsDataArray(dataByProduct));
      result.push(parseUtilsDataArray(dataByPaymentMethod));
      result.push(dataTotals);
      callback(result);
    });
}

export function DeleteOrder(oID, callback) {
  firestore()
    .collection('Orders')
    .doc(oID)
    .delete()
    .then(() => {
      callback();
    });
}

export function updateTableOrderStatus(orders, callback) {
  var batch = firestore().batch();

  orders.forEach(doc => {
    batch.update(firestore().collection('Orders').doc(doc.Id), {
      PaymentMethod: doc.PaymentMethod,
      PaymentState: true,
    });
  });

  batch.commit().then(function () {
    callback();
  });
}

export function DateToString(m) {
  var dateString =
    m.getUTCFullYear() +
    '/' +
    ('0' + (m.getUTCMonth() + 1)).slice(-2) +
    '/' +
    ('0' + m.getUTCDate()).slice(-2) +
    ' ' +
    ('0' + m.getUTCHours()).slice(-2) +
    ':' +
    ('0' + m.getUTCMinutes()).slice(-2) +
    ':' +
    ('0' + m.getUTCSeconds()).slice(-2);

  return dateString;
}
