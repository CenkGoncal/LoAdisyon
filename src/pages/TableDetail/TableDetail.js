import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import StaffHeader from '../../companent/Header/StaffHeader';
import IconMate from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import IconButton from '../../companent/FormElement/IconButton';
import MenuListModal from '../../companent/Modal/MenuListModal/MenuListModal';
import {DateToString, getOrderDetail,DeleteOrder, updateTableOrderStatus} from './userFuncLib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './Style';
import toast from '../../utilities/toast';
import PaymentModal from '../../companent/Modal/PaymentModal/PaymentModal';

export default function TableDetail({navigation, route}) {
  const qrTableName = useSelector(s => s.qrTableName);
  const productList = useSelector(s => s.productList);
  

  const [price, setPrice] = useState(0);
  const [isShowMenuModal, setShowMenuModal] = useState(false);
  const [isPaymentMenuModal, setPaymentMenuModal] = useState(false);

  const [orderList, setOrderList] = useState([]);

  const handleFinish = () => {
    setShowMenuModal(false);

    ReadOrders();
  };

  const paymentHandleFinish= (paymentType) => {
    let list = orderList.map(item=> {
       item.PaymentMethod = paymentType;
       return item;
    }) 
    updateTableOrderStatus(list,()=>{
      toast.success({message:"Ödeme Alındı ve Masa Kapatıldı"});
      goBackTableList();
    })

  }

  const goBackTableList = () => {
    route.params.onNavigateBack(); 
    navigation.goBack();
  }


  useEffect(() => {
    ReadOrders();
  }, []);

  const ReadOrders = () => { 
 

    let {filters} = route.params;
    filters.qrTableName = qrTableName;
   
    getOrderDetail(filters, val => { console.log(val);
      setOrderList(arrangeProductList(val));
    });
  }


  const arrangeProductList = orderList => { 
    let totalPrice = 0;
    var newlist = orderList.map(function (element, index, array) {
      element.Product = productList.filter(f => f.id == element.ProductId)[0];
      element.OrderDateStr = DateToString(element.OrderDate.toDate());

      let price = element.Quantity * element.UnitPrice;
      totalPrice += price;
      return element;
    });

    setPrice(totalPrice);

    return newlist.sort(function (a, b) {
      let x = a.ProductId.toLowerCase();
      let y = b.ProductId.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  };

  const DeleteOrderFunc= (item) =>{
    DeleteOrder(item.Id,()=>{
        toast.success({message:"Sipariş Silindi"});
        ReadOrders();
    })
  }

  const TableDetailFooter = () => {
    return (
      <View style={Styles.FooterContainer}>
        <IconButton
          icon={{name: 'cash', textColor: colors.white, size: 40}}
          text={{
            value: 'Ödeme Al',
            style: {color: colors.white, paddingLeft: 5},
          }}
          style={Styles.PaymentBtn}
          iconType={'IconMaterial'}
          handlePress = {()=> setPaymentMenuModal(true)}
        />

        <IconButton
          handlePress={() => setShowMenuModal(true)}
          icon={{name: 'plus', size: 45, textColor: colors.darkGren}}
          style={Styles.MenuBtn}
          iconType={'IconMaterial'}
        />
        <Text style={Styles.TotalPrice}>Tutar: {price} ₺</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={Styles.OrderItemContainer}>
        <Text
          style={Styles.orderCaption}>
          Sipariş Tarihi: {item.OrderDateStr}
        </Text>
        <View style={Styles.OrderItemInfo}>
          <Icon
            name={item.Product.Category.Icon}
            backgroundColor="#3b5998"
            size={50}
          />
          <View style={Styles.OrderInfoText}>
            <Text style={Styles.ProductName}>{item.Product.ProductName}</Text>
            <View>
              <View style={Styles.Row}>
                <Text style={Styles.Caption}>Birim Fiyat:</Text>
                <Text style={Styles.textColor}>{item.UnitPrice} ₺</Text>
              </View>
              <View style={Styles.Row}>
                <Text style={Styles.Caption}>Adet:</Text>
                <Text style={Styles.textColor}>{item.Quantity}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={Styles.DeleteBtn} onPress={()=> DeleteOrderFunc(item)}>
            <Icon name={'delete'} color="white" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={Styles.OrderInfoText}>
      <StaffHeader isFilterShow={false} />

      <View style={Styles.DetailHeader}>
        <IconMate
          name="clipboard-list-outline"
          color={colors.CardTextGreen}
          size={23}
        />
        <Text style={Styles.DetailHeaderText}>{qrTableName} Masa Detayı</Text>
        <IconButton
          handlePress={() => goBackTableList()}
          icon={{name: 'backburger', size: 23, textColor: colors.CardTextGreen}}
          iconType={'IconMaterial'}
        />
      </View>
      <FlatList
        data={orderList}
        keyExtractor={item => item.Id}
        renderItem={renderItem}
      />
      <TableDetailFooter />
      <MenuListModal isVisible={isShowMenuModal} onClose={handleFinish} />
      <PaymentModal  isVisible={isPaymentMenuModal} onClose={paymentHandleFinish} />
    </View>
  );
}
