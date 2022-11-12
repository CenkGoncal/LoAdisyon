import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import * as Yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import { useSelector } from 'react-redux';


import InputText from '../../FormElement/TextInput';
import Styles from './Style';
import IconButton from '../../FormElement/IconButton';
import colors from '../../../styles/colors';

const ProductModal = ({isVisible, item = null, onClose, onSend}) => {
  const ProductSchema = Yup.object().shape({
    product: Yup.string()
      .min(3, 'Ürün İsmi çok kısa')
      .required('Ürün girmeniz gerekli'),
    amount: Yup.number('Geçerli bir tutar giriniz')
      .moreThan(0, 'Geçerli bir tutar giriniz')
      .required('Tutar girmeniz gerekli'),
  });


  const categoryList = useSelector(w => w.categoryList);
  const [selectedCategory, setCategory] = useState(categoryList != null ? categoryList[0].id : null );

  useEffect(()=> {
    if(item != null)
      setCategory(item.Category.id);
  },[item])
   
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={Styles.container}>
        <Formik
          initialValues={{product: item != null ? item.ProductName : '', 
                          description: item != null ? item.Description : '', 
                          amount: item != null ? item.Amount : "0"}}
          validationSchema={ProductSchema}
          onSubmit={(values, {resetForm}) => {
            values.id = item != null ? item.id : '';
            values.category = selectedCategory;
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
                  {item != null ? 'Ürün Düzenle' : 'Ürün Ekle'}
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
              <Picker 
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setCategory(itemValue)
                }>
                {
                  categoryList.map(item => {
                    return(
                      <Picker.Item key={item.id} label={item.Category} value={item.id}  />
                    )
                  })
                }  
              </Picker>
              <InputText
                placeholder={'Ürün'}
                text={values.product}
                onChange={handleChange('product')}
                error={errors.product}
                onBlur={handleBlur('product')}
              />
              <InputText
                placeholder={'Açıklaması'}
                text={values.description}
                onChange={handleChange('description')}
                error={errors.description}
                onBlur={handleBlur('description')}
              />
              <InputText
                placeholder={'Fiyatı'}
                text={values.amount}
                onChange={handleChange('amount')}
                error={errors.amount}
                onBlur={handleBlur('amount')}
                isNumeric={true}
              />
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default ProductModal;
