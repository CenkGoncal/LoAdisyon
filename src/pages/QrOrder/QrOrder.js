import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

import Button from '../../companent/FormElement/Button/Button';
import Logo from '../../companent/Logo/Logo';
import {findTable} from '../TableManegment/TableLibFunc';
import MenuListModal from '../../companent/Modal/MenuListModal/MenuListModal';
import {loadInformationForCache} from '../MenuManegment/menuFuncLib';
import toast from '../../utilities/toast';

const QrOrder = ({navigation}) => {
  const [isShowMenuModal, setShowMenuModal] = useState(false);
  const [isSetOrder, setOrder] = useState(false);

  const dispatch = useDispatch();

  const handleAddOrder = () => {
    setShowMenuModal(false);
    if(isSetOrder) 
    { 
      toast.success({message:'Siparşiniz Alındı'});
      setOrder(false);
    }
  }

  const onSuccess = e => {
    console.log(e.data);

    findTable(e.data).then(transaciton => { 
      console.log(transaciton.snapshot.val());

      if (!transaciton.snapshot.val()) {
        console.log(transaciton.snapshot.val());

        loadInformationForCache(dto => {
          dispatch({
            type: 'ADD_CATEGORYLIST',
            payload: {list: dto.CategoryList},
          });
          dispatch({type: 'ADD_PRODUCTLIST', payload: {list: dto.ProductList}});
          dispatch({type: 'CHANGE_TABLE', payload: {tableName: e.data}});
          setShowMenuModal(true);
        });
      }
    });
  };

  return (
    <View style={styles.background}>
      {!isShowMenuModal && (
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.torch}
          topContent={<Logo />}
          bottomContent={
            <View style={styles.BottomContainer}>
              <Text style={styles.logoSubText}>
                Sipariş vermek için masanın üstündeki Qr kodu okutun
              </Text>
              <Button
                text={'Geri'}
                sizeDiveder={1}
                theme="secondary"
                handlePress={() => navigation.navigate('Login')}
              />
            </View>
          }
        />
      )}
      <MenuListModal
        isVisible={isShowMenuModal}
        onClose={handleAddOrder}
        setOrder={setOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#01a47d',
  },

  buttonTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoSubText: {
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
  },

  BottomContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default QrOrder;
