import React, {useState, useEffect} from 'react';
import { View} from 'react-native';

import TableList from '../../companent/List/TableList';
import MenuManegmentTab from '../../companent/Tabs/MenuManegmentTab/MenuManegmentTab';
import {readTabs} from './../TableManegment/TableLibFunc';

import Styles from './Style';
import StaffHeader from '../../companent/Header/StaffHeader';
import { getOrderDetailAll } from '../TableDetail/userFuncLib';
import FilterPanel from '../../companent/FormElement/FilterPanel/FilterPanel';

export default function Staff({navigation}) {
  const [tabs, setTabs] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [orderList, setOrderList] = useState(null);

   var filters = {};
  filters.startDate = new Date().setHours(0, 0, 0);
  filters.endDate = new Date().setHours(23, 59, 0); 
  const [filterList, setfilterList] = useState(filters);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    readTabs(tabs => {  
      setTabs(tabs);  
      setActiveTab(tabs[0].Id);
    });

  }, []);

  useEffect(() => {
       getOrderDetailAll(filterList, list=>{
        setOrderList(list);
      })

  }, [refresh]);

  const customFunc =  (filters) => { 
    setfilterList(filters);  
    setRefresh(!refresh);
  }


  const handleChangeTab = id => {
    setActiveTab(id);
  };

  return (
    <View style={Styles.container}>
      <StaffHeader isFilterShow={true} />
      <FilterPanel customFunc={customFunc} filters={filterList}/>
      <MenuManegmentTab
        tabs={tabs}
        OnChangeTab={handleChangeTab}
        activeTab={activeTab}>
        <TableList
          orderList={orderList}
          list={
            activeTab != null
              ? tabs.filter(f => f.Id == activeTab)[0].List
              : null
          }
          onTableItem={() => navigation.navigate("TableDetail", 
                  { filters:filterList,
                    onNavigateBack:() => setRefresh(!refresh)})}
        />
      </MenuManegmentTab>
    </View>
  );
}
