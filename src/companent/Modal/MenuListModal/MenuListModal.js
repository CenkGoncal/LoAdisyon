import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MenuManegmentTab from '../../Tabs/MenuManegmentTab/MenuManegmentTab';
import Styles from './Style';
import {addOrder} from '../../../pages/TableDetail/userFuncLib';

const MenuProductList = ({activeTab, arrangeOrderList, orderList}) => { 
  const productList = useSelector(w => w.productList);
  let products = productList.filter(f => f.Category.id == activeTab);

  const EmptyProductList = () => {
    return <Text>Kategoriye ait ürün bulunmamaktadır</Text>;
  };

  const renderItem = ({item}) => {  
    return ( 
      <View style={Styles.menuItemContainer}>
        <View style={Styles.row}>
          <Icon name={item.Category.Icon} backgroundColor="#3b5998" size={60} />
          <View style={Styles.flex}>
            <Text style={Styles.menuItemCaption}>{item.ProductName}</Text>
            <Text>{item.Description}</Text>
          </View>
          <View style={Styles.center}>
            <Text style={Styles.priceText}>{item.Amount} ₺</Text>
          </View>
        </View>
        <View style={Styles.row}>
          <TouchableOpacity
            onPress={() => arrangeOrderList(item, false)}
            style={Styles.menuItembtn}>
            <Icon name={'minus-thick'} color="white" size={25} />
          </TouchableOpacity>
          <View style={Styles.menuItemQuantity}>
            <Text>
              {orderList.length > 0 &&
              orderList.filter(f => f.ProductId == item.id).length > 0
                ? orderList.filter(f => f.ProductId == item.id)[0].Quantity
                : 0}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => arrangeOrderList(item, true)}
            style={Styles.menuItembtn}>
            <Icon name={'plus-thick'} color="white" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      //ListHeaderComponent={ListHeader}
      ListEmptyComponent={EmptyProductList}
    />
  );
};

const MenuListModal = ({isVisible, onClose, setOrder = null}) => {
  const categoryList = useSelector(w => w.categoryList);
  const qrTableName = useSelector(s => s.qrTableName);
  const staff = useSelector(s => s.staff);
  const [tabs, setTabs] = useState(
    categoryList.map(item => {
      return {Text: item.Category, Id: item.id, item: item};
    }),
  );
  const [activeTab, setActiveTab] = useState(tabs[0].Id);
  const [orderList, setOrderList] = useState([]);

  const arrangeOrderList = (item, isAdd) => {
    let isOrderItem = orderList.filter(
      f => f.TableName == qrTableName && f.ProductId == item.id,
    );

    if (isOrderItem.length > 0) {
      let newOrderList = orderList.map(oitem => {
        if (oitem.TableName == qrTableName && oitem.ProductId == item.id) {
          oitem.Quantity = isAdd ? oitem.Quantity + 1 : oitem.Quantity - 1;
          if (oitem.Quantity < 0) oitem.Quantity = 0;
        }

        return oitem;
      });

      setOrderList(newOrderList.filter(f => f.Quantity > 0));
    } else if (isAdd) {
      let newOrderList = [...orderList];
      let newItem = {};
      newItem.TableName = qrTableName;
      newItem.Quantity = 1;
      newItem.ProductId = item.id;
      newItem.UnitPrice = item.Amount;
      newItem.OrderDate = new Date();
      newItem.StaffId = staff != null ? staff.Id : -1;
      newItem.PaymentState = false;
      newItem.PaymentMethod = '';

      newOrderList.push(newItem);
      setOrderList(newOrderList);
    }
  };

  const onCloseModal = () => {
    if (orderList.length > 0) {
      addOrder(orderList, () => {
        setOrderList([]);
        onClose();
        setOrder(true);
      });
    } else {
      setOrderList([]);
      onClose();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onCloseModal}
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}>
      <View style={Styles.container}>
        <MenuManegmentTab
          tabs={tabs}
          OnChangeTab={setActiveTab}
          activeTab={activeTab}>
          <MenuProductList
            activeTab={activeTab}
            arrangeOrderList={arrangeOrderList}
            orderList={orderList}
          />
        </MenuManegmentTab>
      </View>
    </Modal>
  );
};

export default MenuListModal;
