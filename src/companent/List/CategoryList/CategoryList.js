import React, {useState, useEffect} from 'react';
import {View, Text, FlatList,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from "react-redux";

import { readCategory } from '../../../pages/MenuManegment/menuFuncLib';
import IconButton from '../../FormElement/IconButton';
import colors from '../../../styles/colors';

import Styles from './Style';

const CategoryList = ({onRemove, onEdit}) => {
  const [categoryList, setCategoryList] = useState(null);
  const [isSearch, setSearch] = useState(false);
  const [searchText, setsearchText] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {

    readCategory(list => {
      dispatch({type:"ADD_CATEGORYLIST", payload: { list  }});
      setCategoryList(list);

    })

  }, [searchText]);



  const renderItem = ({item}) => {
    return (
      <View style={Styles.CategoryCard}>
        <Icon name={item.Icon} backgroundColor="#3b5998" size={40} />
        <View style={Styles.categoryTextContainer}>
          <Text style={Styles.CategoryText}>{item.Category}</Text>
        </View>
        <View style={Styles.toolboxContainer}>
          <IconButton handlePress={()=>onEdit(item)}
            icon={{name: 'square-edit-outline', size: 30, textColor: '#ff9800'}}
            iconType={'IconMaterial'}
          />
          <IconButton handlePress={()=>onRemove(item)}
            icon={{name: 'trash-can', size: 30, textColor: '#f66'}}
            iconType={'IconMaterial'}
          />
        </View>
      </View>
    );
  };

  const ListHeader = () => {
    return (
      <View style={Styles.header}>
        <Text style={Styles.headerText}>Kategoriler</Text>
        <View style={Styles.searchContainer}>
        {isSearch && (
            <TextInput
              placeholder={'Ara'}
              onChangeText={val =>{ if(val.length >= 3)   setsearchText(val)}}
              text={searchText}
              style={Styles.searchBox}
            />
          )}
          <IconButton
            handlePress={() => setSearch(!isSearch)}
            icon={{name: 'search', size: 30, textColor: colors.darkGren}}
          />
        </View>
      </View>
    );
  };

  const EmptyCategoryList = () => {
    return (
      <View style={Styles.emptyCategoryContainer} >
        <Text style={Styles.emptyCategoryText}>Kategoriniz Bulunmamakta</Text>
      </View>
    )
  }

  return (
    <View style={Styles.container}>
      <FlatList
        data={categoryList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyCategoryList}
      />
    </View>
  );
};

export default CategoryList;
