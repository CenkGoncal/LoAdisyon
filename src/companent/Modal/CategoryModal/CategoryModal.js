import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import InputText from '../../FormElement/TextInput';
import Styles from './Style';
import IconButton from '../../FormElement/IconButton';
import colors from '../../../styles/colors';

const CategoryModal = ({isVisible, item = null, onClose, onSend}) => {
  const CategorySchema = Yup.object().shape({
    category: Yup.string()
      .min(3, 'Kategori çok kısa')
      .required('Kategori girmeniz gerekli'),
  });

  const iconTypes = [
    'food-fork-drink',
    'cupcake',
    'food',
    'food-drumstick',
    'food-hot-dog',
    'bottle-soda',
  ];
  console.log(item);

  const [activeIcon, setActiveIcon] = useState('food-fork-drink');

  useEffect(()=>{
      setActiveIcon(item ? item.Icon : "food-fork-drink");
  },[item])
  
  const renderIcon = ({item}) => {
    return (
      <TouchableOpacity onPress={() => setActiveIcon(item)}>
        <Icon
          name={item}
          color={activeIcon == item ? '#3b5998' : colors.CardGrey}
          size={40}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={Styles.container}>
        <Formik
          initialValues={{category: item != null ? item.Category : ''}}
          validationSchema={CategorySchema}
          onSubmit={(values, {resetForm}) => {
            values.id = item != null ? item.id : '';
            values.icon = activeIcon;
            onSend(values).then(() => {
              resetForm();
            });
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            resetForm,
            values,
            errors,
          }) => (
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{flex: 1}}>
                  {item != null ? 'Kategori Düzenle' : 'Kategori Ekle'}
                </Text>
                <View style={Styles.toolboxContainer}>
                  <IconButton
                    handlePress={handleSubmit}
                    icon={{
                      name: 'plus',
                      size: 40,
                      textColor: colors.lightGreen,
                    }}
                    iconType={'IconMaterial'}
                  />
                  <IconButton
                    handlePress={resetForm}
                    icon={{name: 'trash-can', size: 40, textColor: '#f66'}}
                    iconType={'IconMaterial'}
                  />
                </View>
              </View>
              <InputText
                placeholder={'Kategori'}
                text={values.category}
                onChange={handleChange('category')}
                error={errors.category}
                onBlur={handleBlur('category')}
              />
              <View style={{alignItems:"center"}}>
                <FlatList
                  data={iconTypes}
                  renderItem={renderIcon}
                  keyExtractor={item => item}
                  horizontal={true}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default CategoryModal;
