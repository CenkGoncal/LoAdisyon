import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import AdminSplash from '../../pages/AdminSplash/AdminSplash';
import Login from '../../pages/Login';
import QrOrder from '../../pages/QrOrder';
import SignUp from '../../pages/SignUp';
import Staff from '../../pages/Staff/Staff';
import TableDetail from '../../pages/TableDetail/TableDetail';
import AdminPanelDrawer from '../AdminPanelDrawer';

import { loadInformationForCache } from '../../pages/MenuManegment/menuFuncLib';

const Stack = createStackNavigator();


const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminPanelDrawer"
        options={{headerShown: false}}
        component={AdminPanelDrawer}
      />
    </Stack.Navigator>
  );
};

const SplahScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        options={{headerShown: false}}
        component={AdminSplash}
      />
    </Stack.Navigator>
  );
};

const StaffStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StaffPage"
        options={{headerShown: false}}
        component={Staff}
      />
      <Stack.Screen
        name="TableDetail"
        options={{headerShown: false}}
        component={TableDetail}
      />
    </Stack.Navigator>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={Login}
      />
      <Stack.Screen
        name="SignUp"
        options={{headerShown: false}}
        component={SignUp}
      />
      <Stack.Screen
        name="QrOrder"
        options={{headerShown: false}}
        component={QrOrder}
      />
    </Stack.Navigator>
  );
};




export default function StackManegment() {
  const [userSesion, setUserSesion] = useState();
  const [isSplashForAdmin, setSpashAdmin] = useState(null);
  const dispatch = useDispatch();

  const TempFunct = () => {
    
    if (useSelector(s => s.isStaffLoading) || isSplashForAdmin)
    return <SplahScreen />;

    if (userSesion) return <AdminStack />;

    if (useSelector(s => s.staff) != null) return <StaffStack />;

    return <LoginStack />;
  }

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) setSpashAdmin(true);
      loadInformationForCache(dto => {
        dispatch({type: 'ADD_CATEGORYLIST', payload: {list: dto.CategoryList}});
        dispatch({type: 'ADD_PRODUCTLIST', payload: {list: dto.ProductList}});
        setSpashAdmin(false);
        setUserSesion(!!user);
      });
    });
  }, []);



  return <TempFunct />
}
