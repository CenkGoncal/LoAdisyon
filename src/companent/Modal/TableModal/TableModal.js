import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import * as Yup from 'yup';



import InputText from '../../FormElement/TextInput';
import Styles from './Style';
import IconButton from '../../FormElement/IconButton';
import colors from '../../../styles/colors';

const TableModal = ({isVisible, item = null, onClose, onSend}) => {
  const TableSchema = Yup.object().shape({
    part: Yup.string()
      .min(3, 'Bölüm İsmi çok kısa')
      .required('Bölüm girmeniz gerekli'),
    abbreviation: Yup.string()
      .max(3, 'Kısaltma 3 karakterden fazla olamaz')
      .required('Ürün girmeniz gerekli'),
    count: Yup.number('Geçerli bir adet giriniz')
      .moreThan(0, 'Geçerli bir adet giriniz')
      .required('Masa sayısı girmeniz gerekli'),
  });


  const [selectedCategory, setCategory] = useState(item != null ? item.Category.id : null );

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
          initialValues={{part: item != null ? item.ProductName : '', 
                          abbreviation: item != null ? item.Description : '', 
                          count: item != null ? item.Amount : "0"}}
          validationSchema={TableSchema}
          onSubmit={(values, {resetForm}) => {
            values.id = item != null ? item.id : '';
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
                  {item != null ? 'Bölüm Düzenle' : 'Bölüm Ekle'}
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
                placeholder={'Bölüm'}
                text={values.part}
                onChange={handleChange('part')}
                error={errors.part}
                onBlur={handleBlur('part')}
              />
              <InputText
                placeholder={'Kısaltması'}
                text={values.abbreviation}
                onChange={handleChange('abbreviation')}
                error={errors.abbreviation}
                onBlur={handleBlur('abbreviation')}
              />
              <InputText
                placeholder={'Masa Sayısı'}
                text={values.count}
                onChange={handleChange('count')}
                error={errors.count}
                onBlur={handleBlur('count')}
                isNumeric={true}
              />
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default TableModal;
