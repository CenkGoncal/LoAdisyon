import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Switch} from 'react-native';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';

import IconButton from '../../companent/FormElement/IconButton';
import InputText from '../../companent/FormElement/TextInput';
import Styles from './Style';
import colors from '../../styles/colors';
import Button from '../../companent/FormElement/Button/Button';
import {readUsers, userAdd, userUpdate, deleteUser} from './userFuncLib';
import toast from '../../utilities/toast';

const UserManegment = () => {
  const [userList, setUserList] = useState([]);
  const [isFormActive, setFormActive] = useState(false);
  const [selectUser, setselectUser] = useState([]);

  useEffect(() => {
    readUsers((arr)=> {
      setUserList(arr);
    });
  }, []);

  const renderUser = ({item}) => {
    return (
      <View style={Styles.container}>
        <Icon
          name={item.gender == 'E' ? 'face-man' : 'face-woman'}
          color={item.gender == 'E' ? '#616161' : '#e91e63'}
          size={20}
        />
        <Text style={Styles.userText}>
          {item.name} {item.surname} ({item.age})
        </Text>
        <View style={Styles.toolBoxContainer}>
          <IconButton
          handlePress={()=>setFormState(item)}
          icon={{name: 'square-edit-outline', size: 30, textColor: '#ff9800'}}
            iconType={'IconMaterial'}
          />
          <IconButton
            handlePress={() => deleteUser(item,(arr)=>{ setUserList(arr)  })}
            icon={{name: 'trash-can', size: 30, textColor: '#f66'}}
            iconType={'IconMaterial'}
          />
        </View>
      </View>
    );
  };

  const listHeader = () => {
    return (
      <View style={Styles.listHeader}>
        <Text style={Styles.listHeaderText}>Kullanıcı Listesi</Text>
        <IconButton
          handlePress={()=>setFormState(null)}
          iconType={'IconMaterial'}
          icon={{name: 'account-plus', size: 30, textColor: colors.darkGren}}
        />
      </View>
    );
  };

  const setFormState = (values) => {
    if(values)
      values.age =values.age.toString();
    setselectUser(values); 
    setFormActive(true)
  }

  const UserForm = () => {
    return (
      <View style={Styles.formContainer}>
        <Formik
          initialValues={selectUser ? selectUser : {
            name: '',
            gender: 'E',
            age: "0",
            username: '',
            password: '123',
            isChangePass: true,
          }}
          validationSchema={UserSchema}
          onSubmit={(values, {resetForm}) => {
            values.age = parseInt(values.age);
            
            let func = selectUser ? userUpdate : userAdd ;
            func(values,(arr)=>{
              setUserList(arr);
              setselectUser(values);
              toast.success({message:"Kullanıcı kaydedildi",afterFunc:()=>{ resetForm();  }}) 
    
            })          

          }}>
          {({
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            resetForm,
            values,
            errors,
          }) => (
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 20,
                marginLeft: 5,
                marginRight: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: colors.CardGreen,
                  padding: 5,
                }}>
                <Text style={Styles.listHeaderText}>Çalışan Ekle</Text>
                <IconButton
                  handlePress={() =>     setFormActive(false)}
                  iconType={'IconMaterial'}
                  text={{value:'Listeye Dön', style:{borderBottomColor:colors.darkGren,borderBottomWidth:1}}}
                  icon={{name: 'backburger', size: 30, textColor: colors.darkGren}}
                />
              </View>
              <InputText
                placeholder={'Çalışan Adı'}
                text={values.name}
                onChange={handleChange('name')}
                error={errors.name}
                onBlur={handleBlur('name')}
              />
              <InputText
                placeholder={'Yaş'}
                text={values.age}
                onChange={handleChange('age')}
                error={errors.age}
                onBlur={handleBlur('age')}
                isNumeric={true}
              />
              <View style={{flexDirection: 'row', paddingLeft: 10}}>
                <Icon name={'face-woman'} color={'#e91e63'} size={30} />
                <Switch
                  trackColor={'#767577'}
                  thumbColor={values.gender == 'E' ? '#616161' : '#e91e63'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={value =>
                    setFieldValue('gender', value ? 'E' : 'K')
                  }
                  value={values.gender == 'E'}
                />
                <Icon name={'face-man'} color={'#616161'} size={30} />
              </View>

              <InputText
                placeholder={'Kullanıcı Adı'}
                text={values.username}
                onChange={handleChange('username')}
                error={errors.username}
                onBlur={handleBlur('username')}
              />

              <View
                style={{
                  marginTop: 20,
                  marginLeft:5,
                  marginRight:5,
                  justifyContent: 'space-evenly',
                }}>
                <Button
                  text={'Kaydet'}
                  sizeDiveder={1}
                  handlePress={handleSubmit}
                  isLoading={true}
                />
                <Button
                  text={'Temizle'}
                  sizeDiveder={1}
                  theme="secondary"
                  handlePress={() => resetForm()}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  };

  const UserSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Kullanıcı ismi çok kısa')
      .required('Kullanıcı ismi girmeniz gerekli'),
      name: Yup.string()
      .min(3, 'İsim 3 karakterden fazla olamaz')
      .required('İsim girmeniz gerekli'),
      age: Yup.number('Geçerli bir yaş giriniz')
      .moreThan(0, 'Geçerli bir yaş giriniz')
      .required('yaşı girmeniz gerekli'),
  });


  return (
    <View>
      {!isFormActive ? (
        <FlatList
          data={userList}
          renderItem={renderUser}
          keyExtractor={item => item.Id}
          ListEmptyComponent={() => <Text>Bos</Text>}
          ListHeaderComponent={listHeader}
        />
      ) : (
        <UserForm />
      )}
    </View>
  );
};

export default UserManegment;
