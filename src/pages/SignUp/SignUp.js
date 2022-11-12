import React, {useState, useRef} from 'react';
import {Text, View, KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';

import Style from './Style';
import InputText from '../../companent/FormElement/TextInput';
import Button from '../../companent/FormElement/Button/Button';
import ErrorMessageParser from '../../utilities/ErrorMessageParser';
import toast from '../../utilities/toast';
import Logo from '../../companent/Logo/Logo';
import {userUpdate} from './../UserManegment/userFuncLib';

const SignUp = ({navigation, route}) => {

  const [isLoading, setLoading] = useState(-1);
  const [isStaff, setStaff] = useState(route.params?.isStaff ? true : false);

  const SignupSchema = Yup.object().shape({
    username: isStaff ? Yup.string()
      .required('Kullanıcını adını girmediniz gerekli') : 
      Yup.string()
      .email('Düzgün bir email giriniz')
      .required('Kullanıcını adını girmediniz gerekli'),
    password: Yup.string()
      .min(5, 'Şifre çok kısa')
      .max(50, 'Şifreniz çok uzun')
      .required('Şifre girmeniz gerekli'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmedi')
      .required('Şifreyi tekrardan girmeniz gerekli'),
  });

  const SignUpWithEmail = values => {

    setLoading(0);
    auth()
      .createUserWithEmailAndPassword(values.username, values.password)
      .then(() => {
        toast.success({message: "Kayıt Başarılı İle Oluşturuldu", afterFunc: handleFinish()});
        setLoading(1);
      })
      .catch(error => {

        toast.danger({message: ErrorMessageParser(error.code).retMessage});
        setLoading(1);
      });
  };

  const handleFinish = () => {
    navigation.goBack();
  };

  const UpdatePassStaff = values => {

    let user = route.params?.user;
    user.password = values.password;
    user.isChangePass = false;

    userUpdate(user,()=>{
      toast.success({message: "Şifre değiştirildi", afterFunc: handleFinish()});
    });
  }

  return (
    <KeyboardAvoidingView style={Style.container}>
      <Logo />
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{username: isStaff ? route.params?.user.username : '', password: '', rePassword: ''}}
        validationSchema={SignupSchema}
        onSubmit={isStaff ? UpdatePassStaff : SignUpWithEmail}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={Style.loginFormContainer}>
            <InputText
              placeholder={'Kullancı İsmi'}
              text={values.username}
              icon={{name: 'user', size: 20}}
              error={errors.username}
              onChange={handleChange('username')}
              onBlur={handleBlur('username')}
              isEditable={isStaff ? false : true}
            />
            <InputText
              placeholder={'Şifre'}
              text={values.password}
              icon={{name: 'key', size: 20}}
              error={errors.password}
              isSecure={true}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
            />

            <InputText
              placeholder={'Şifre Tekrarı'}
              text={values.rePassword}
              icon={{name: 'key', size: 20}}
              error={errors.rePassword}
              isSecure={true}
              onChange={handleChange('rePassword')}
              onBlur={handleBlur('rePassword')}
            />

            <View style={Style.buttonContainer}>
              {isStaff ? (
                <Button
                  text={'Şifre Değiştir'}
                  sizeDiveder={1}
                  handlePress={handleSubmit}
                  isLoading={isLoading}
                />
              ) : (
                <>
                  <Button
                    text={'Üye Ol'}
                    sizeDiveder={3}
                    handlePress={handleSubmit}
                    isLoading={isLoading}
                  />
                  <Button
                    text={'Geri'}
                    sizeDiveder={3}
                    theme="secondary"
                    handlePress={() => navigation.goBack()}
                  />
                </>
              )}
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
