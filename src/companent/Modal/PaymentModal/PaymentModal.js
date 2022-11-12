import React from 'react';
import {Text, View, TouchableOpacity,Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from "./Style";

export default function PaymentModal({isVisible, onClose}) {

  const paymentState = { Cash:1, CreditCard:2 }

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.paymentStateBtn} onPress={()=>onClose(paymentState.Cash)}>
          <Icon name={'cash'} backgroundColor="#3b5998" size={30} />
          <Text style={styles.paymentStateBtnText}>Nakit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentStateBtn} onPress={()=>onClose(paymentState.CreditCard)}>
          <Icon name={'credit-card'} backgroundColor="#3b5998" size={28} />
          <Text style={styles.paymentStateBtnText}>Kredi Kartı</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
