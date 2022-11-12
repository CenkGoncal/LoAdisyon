import React, {useState} from 'react';
import {Text, View, KeyboardAvoidingView, Switch} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';


import Button from '../../companent/FormElement/Button/Button';
import IconButton from '../../companent/FormElement/IconButton';
import Line from '../../companent/Line/Line';
import Logo from '../../companent/Logo/Logo';
import InputText from '../../companent/FormElement/TextInput';
import Style from './Style';
import ErrorMessageParser from '../../utilities/ErrorMessageParser';
import toast from '../../utilities/toast';

import {loadInformationForCache} from '../MenuManegment/menuFuncLib';

const Login = ({navigation}) => {
  const [isLoading, setLoading] = useState(-1);
  const [isStaffLogin, setStaffLogin] = useState(false);
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    email: isStaffLogin
      ? Yup.string().required('Kullanıcını adını girmediniz gerekli')
      : Yup.string()
          .email('Düzgün bir email giriniz')
          .required('Kullanıcını adını girmediniz gerekli'),
    password: Yup.string()
      .min(isStaffLogin ? 3 : 5, 'Şifre çok kısa')
      .max(50, 'Şifreniz çok uzun')
      .required('Şifre girmeniz gerekli'),
  });

  const LoginWithEmail = async values => {
    setLoading(0);

    try {
      await auth().signInWithEmailAndPassword(values.email, values.password);
      toast.success({message: 'Giriş Başarılı', afterFunc: handleFinish()});

      setLoading(1);
    } catch (error) {
      // console.log(error.code);

      toast.danger({message: ErrorMessageParser(error.code).retMessage});
      setLoading(1);
    }
  };

  const LoginStaff = async values => {
    setLoading(0);

    let user = await firestore()
      .collection('users')
      .where('username', '==', values.email)
      .where('password', '==', values.password)
      .get();

    if (user.empty) {
      toast.danger({
        message: 'Giriş Başarısız Kullanıcı adı ve Şifeyi kontrol edin',
      });
      setLoading(1);
      return;
    }

    user.forEach(documentSnapshot => {
      let data = documentSnapshot.data();

      loadInformationForCache(dto => {
        dispatch({
          type: 'ADD_CATEGORYLIST',
          payload: {list: dto.CategoryList},
        });
        dispatch({type: 'ADD_PRODUCTLIST', payload: {list: dto.ProductList}});
        dispatch({type: 'UPDATE_STAFF', payload: {staff: data}});
        if (data.isChangePass)
          navigation.navigate('SignUp', {user: data, isStaff: true});
      });
    });
  };

  const handleFinish = () => {
    navigation.navigate('AdminPanelDrawer');
  };

  const StaffSignUp = () => {
    return (
      <>
        <View style={Style.lineContainer}>
          <Line />
          <Text style={Style.lineCenterText}>Yada</Text>
          <Line />
        </View>
        <View style={Style.buttonContainer}>
          <IconButton
            icon={{name: 'facebook', size: 25, textColor: '#0e8cf1'}}
          />
          <IconButton icon={{name: 'google', size: 25, textColor: 'tomato'}} />
        </View>
        <View style={Style.OrderButonContainer}>
          <Button
            text={'Sipariş Ver'}
            sizeDiveder={1}
            icon={{name: 'qrcode', size: 25, textColor: 'white'}}
            handlePress={() => navigation.navigate('QrOrder')}
          />
        </View>
      </>
    );
  };

  return (
    <KeyboardAvoidingView style={Style.container}>
      <Logo />
      <View style={Style.loginFormContainer}>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{email: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={isStaffLogin ? LoginStaff : LoginWithEmail}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View>
              <InputText
                placeholder={'Kullancı İsmi'}
                text={values.email}
                icon={{name: 'user', size: 20}}
                onChange={handleChange('email')}
                error={errors.email}
                onBlur={handleBlur('email')}
              />
              <InputText
                placeholder={'Şifre'}
                text={values.password}
                icon={{name: 'key', size: 20}}
                isSecure={true}
                onChange={handleChange('password')}
                error={errors.password}
                onBlur={handleBlur('password')}
              />
              <View style={Style.buttonContainer}>
                {isStaffLogin ? (
                  <Button
                    text={'Giriş Yap'}
                    sizeDiveder={1}
                    handlePress={handleSubmit}
                    isLoading={isLoading}
                  />
                ) : (
                  <>
                    <Button
                      text={'Giriş Yap'}
                      sizeDiveder={3}
                      handlePress={handleSubmit}
                      isLoading={isLoading}
                    />
                    <Button
                      text={'Üye Ol'}
                      sizeDiveder={3}
                      theme="secondary"
                      handlePress={() => navigation.navigate('SignUp')}
                    />
                  </>
                )}
              </View>
            </View>
          )}
        </Formik>
        <View style={Style.personalContainer}>
          <Text style={Style.personelText}>Personel Girişi</Text>
          <Switch
            value={isStaffLogin}
            onValueChange={() => setStaffLogin(previousState => !previousState)}
          />
        </View>
        {!isStaffLogin && <StaffSignUp />}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
