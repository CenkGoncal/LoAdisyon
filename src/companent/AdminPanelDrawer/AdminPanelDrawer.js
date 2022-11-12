import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import IconFont from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

import Styles from './Style';
import AdminPanel from '../../pages/AdminPanel/AdminPanel';
import CustomHeader from '../Header/CustomHeader';
import colors from '../../styles/colors';
import MenuManagement from '../../pages/MenuManegment/MenuManegment';
import TableManegment from '../../pages/TableManegment';
import StockManegment from '../../pages/StockManegment';
import UserManegment from '../../pages/UserManegment/UserManagment';

const AdminPanelDrawer = () => {
  const CustomDrawer = props => {

    const authobj = auth();

    return (
      <View style={Styles.container}>
        <DrawerContentScrollView {...props}>
          <View style={Styles.userContainer}>
            <View>
              <Text style={Styles.userText}>{authobj?.currentUser.photoURL}</Text>
              <Text style={Styles.userText}>{authobj?.currentUser.email}</Text>
            </View>
            <View style={Styles.circleUser}>
              <IconFont name="user-o" color={'white'} size={25} />
            </View>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View style={Styles.logOutContainer}>
          <TouchableOpacity
            onPress={() => authobj?.signOut()}
            style={Styles.logoutButtonContainer}>
            <MaterialIcons name="logout" color={'#263238'} size={25} />
            <Text style={Styles.logOutButtonText}>Çıkış</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerTitle: (props) =>  <CustomHeader isFilterShow={props.children == "Dashboard"} />,
        headerStyle: {
          backgroundColor: colors.darkGren,
          elevation: 0,
          shadowOpacity: 0,
          height: 50,
        },
        headerTintColor: 'white',
        drawerActiveBackgroundColor: colors.darkGren,
        drawerActiveTintColor: colors.white,
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontSize: 15,
          fontFamily: 'Roboto-Medium',
        },
      }}>
      <Drawer.Screen
        name="AdminPanel"
        component={AdminPanel}
        options={{
          drawerIcon: ({color}) => (
            <IconFont name="dashboard" color={color} size={22} />
          ),
          title: 'Dashboard',
        }}
      />
      <Drawer.Screen
        name="MenuManagement"
        component={MenuManagement}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="restaurant-menu" color={color} size={22} />
          ),
          title: 'Menu Yönetimi',
        }}
      />

      <Drawer.Screen
        name="DeskManagment"
        component={TableManegment}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="dinner-dining" color={color} size={22} />
          ),
          title: 'Masa Yönetimi',
        }}
      />
      <Drawer.Screen
        name="StockManagment"
        component={StockManegment}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="storage" color={color} size={22} />
          ),
          title: 'Stok Yönetimi',
        }}
      />
      <Drawer.Screen
        name="EmployeeManagment"
        component={UserManegment}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="person" color={color} size={22} />
          ),
          title: 'Çalışan Yönetimi',
        }}
      />
    </Drawer.Navigator>
  );
};

export default AdminPanelDrawer;
