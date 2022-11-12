import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore} from 'redux';

import reducers from './reducers';
import InitialState from './store';
import { loadInformationForCache } from '../pages/MenuManegment/menuFuncLib';

const UserProvider = ({children}) => {
  const [User, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);


  useEffect(() => {
    AsyncStorage.getItem('@user').then(usersesion => {

      if(usersesion != null)
      {
        setLoading(prev=>!prev);
        loadInformationForCache(dto => {
          InitialState.productList = dto.ProductList;
          InitialState.categoryList = dto.CategoryList;
          setUser(JSON.parse(usersesion));
          setLoading(prev=>!prev);
        });
      }
      
    });

    return () => {};
  }, [InitialState]);

  const store = createStore(reducers,{...InitialState, staff: User, isStaffLoading:Loading });

  return <Provider store={store}>{children}</Provider>;
};

export default UserProvider;
