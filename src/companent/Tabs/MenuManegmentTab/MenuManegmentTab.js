import React, {useState} from 'react';
import {Text, TouchableOpacity, View, FlatList} from 'react-native';
import IconButton from '../../FormElement/IconButton';
import Styles from './Style';

const MenuManegmentTab = ({tabs, OnChangeTab, activeTab,  handleDeleteTab ,children}) => {

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={Styles.tabItem(activeTab === item.Id)}
        onPress={() => {
          OnChangeTab(item.Id);
        }}>
        <View style={{flexDirection:"row"}}>
          <Text style={Styles.tabItemText}>{item.Text}</Text>
          {handleDeleteTab != null &&   <IconButton
                    handlePress={handleDeleteTab}
                    icon={{name: 'trash-can', size: 20, textColor: '#f66'}}
                    iconType={'IconMaterial'}
                    style={{alignSelf:"flex-end"}}
                  />
          }
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.container}>
      <FlatList
        horizontal={true}
        data={tabs}
        keyExtractor={item => item.Id}
        renderItem={renderItem}
      />

      {children}
    </View>
  );
};

export default MenuManegmentTab;
