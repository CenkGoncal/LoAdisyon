import React, {useState, useEffect} from 'react';
import QRCode from 'react-native-qrcode-svg';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {View, Text} from 'react-native';

import Styles from './Style';
import IconButton from '../../FormElement/IconButton';

const QrModal = ({isVisible, onClose}) => {
  const qrTableName = useSelector(w => w.qrTableName);

  const handlePrint = () => {};

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose} style={{justifyContent:"center",alignItems:"center"}}>
      <View style={Styles.container}>
        <View style={Styles.toolboxContainer}>
          <Text style={{flex:1,color:"black"}}>Masa Karekod Bilgisi</Text>
          <IconButton
            handlePress={handlePrint}
            icon={{
              name: 'printer',
              size: 30,
              textColor: "#707070",
            }}
            
            iconType={'IconMaterial'}
          />
        </View>
        <QRCode value={qrTableName} />
      </View>
    </Modal>
  );
};

export default QrModal;
