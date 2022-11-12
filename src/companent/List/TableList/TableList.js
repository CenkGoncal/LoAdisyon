import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

import Styles from './Style';

const TableList = ({list, onTableItem, orderList = null}) => {
  const dispatch = useDispatch();

  const renderItem = ({item}) => {
    let dto = orderList ? orderList.filter(f=>f.TableName == item.name)[0] :  null;

    return (
      <TouchableOpacity
        style={dto ? Styles.tableFull : Styles.table}
        onPress={() => TableItem(item)}>
        <Text style={Styles.tableName}>{item.name}</Text>
        <Text style={Styles.tablePrice}>Tutar: {dto ? dto.TotalPrice : 0}</Text>
      </TouchableOpacity>
    );
  };

  const TableItem = item => {
    dispatch({type: 'CHANGE_TABLE', payload: {tableName: item.name}});
    onTableItem();
  };

  return (
    <View style={Styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        numColumns={2}
      />
    </View>
  );
};

export default TableList;
