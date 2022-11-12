import React from 'react';
import database from '@react-native-firebase/database';
import parseUtilsDataArray from '../../utilities/parseUtilsDataArray';
import {G} from 'react-native-svg';

const newReference = database();

export function readTabs(callback) {
  newReference.ref('TableList').on('value', shapshot => {
    var list = parseUtilsDataArray(shapshot.val());

    if (list) {
      list = list.map(function (element) {
        return {
          Text: element.Part,
          Id: element.id,
          List: element.TableList != null ? JSON.parse(element.TableList) : [],
        };
      });

      callback(list);
    }
  });
}

export function findTable(tablename) {
  const reference = database().ref(`/TableList/${tablename}`);

  // Execute transaction
  return reference.transaction(currentvalue => {
    return (currentvalue === null);
  });
}
