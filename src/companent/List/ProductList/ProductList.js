import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TextInput} from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import parseUtilsDataArray from '../../../utilities/parseUtilsDataArray';
import {readProduct} from '../../../pages/MenuManegment/menuFuncLib';
import IconButton from '../../FormElement/IconButton';
import {Picker} from '@react-native-picker/picker';

import Styles from './Style';

const ProductList = ({onRemove, onEdit}) => {
  const categoryList = useSelector(w => w.categoryList);
  let selectedCategory = useSelector(w => w.plSelectedCategory);
  if (!selectedCategory) selectedCategory = categoryList[0].id;

  const dispatch = useDispatch();

  const [productList, setproductList] = useState(null);

  useEffect(() => {
    readProduct(categoryList, list => {
      dispatch({type: 'ADD_PRODUCTLIST', payload: {list}});
      if (selectedCategory != '' && list.length > 0)
        list = list.filter(f => f.Category.id == selectedCategory);
      setproductList(list);
    });
  }, [selectedCategory]);

  const renderItem = ({item}) => {
    return (
      <View style={Styles.ProductCard}>
        <Icon name={item.Category.Icon} backgroundColor="#3b5998" size={60} />
        <View style={Styles.categoryTextContainer}>
          <Text style={Styles.CategoryText}>{item.ProductName}</Text>
          <Text numberOfLines={2} style={Styles.ProductDescText}>
            {item.Description}
          </Text>
          <Text style={Styles.AmountText}>{item.Amount} ₺</Text>
        </View>
        <View style={Styles.toolboxContainer}>
          <IconButton
            handlePress={() => onEdit(item)}
            icon={{name: 'square-edit-outline', size: 30, textColor: '#ff9800'}}
            iconType={'IconMaterial'}
          />
          <IconButton
            handlePress={() => onRemove(item)}
            icon={{name: 'trash-can', size: 30, textColor: '#f66'}}
            iconType={'IconMaterial'}
          />
        </View>
      </View>
    );
  };

  const ListHeader = () => {
    return (
      <>
        <View style={Styles.header}>
          <Text style={Styles.headerText}>Ürünler</Text>
        </View>
        <Picker
          style={{backgroundColor: '#75a478'}}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            dispatch({type: 'CHANGE_CATEGORY', payload: {category: itemValue}})
          }>
          {categoryList.map(item => {
            return (
              <Picker.Item
                key={item.id}
                label={item.Category}
                value={item.id}
              />
            );
          })}
        </Picker>
      </>
    );
  };

  const EmptyProductList = () => {
    return (
      <View style={Styles.emptyCategoryContainer}>
        <Text style={Styles.emptyCategoryText}>Ürününüz Bulunmamakta</Text>
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      <FlatList
        data={productList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyProductList}
      />
    </View>
  );
};

export default ProductList;
