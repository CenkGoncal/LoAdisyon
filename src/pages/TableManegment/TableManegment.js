import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';

import Styles from './Style';
import colors from '../../styles/colors';
import TableModal from '../../companent/Modal/TableModal/TableModal';
import toast from '../../utilities/toast';
import parseUtilsDataArray from '../../utilities/parseUtilsDataArray';
import MenuManegmentTab from '../../companent/Tabs/MenuManegmentTab/MenuManegmentTab';
import IconButton from '../../companent/FormElement/IconButton';
import TableList from '../../companent/List/TableList';
import QrModal from '../../companent/Modal/QrModal/QrModal';

const TableManegment = () => {
  useEffect(() => {
    database()
      .ref('TableList')
      .on('value', shapshot => {

        var list = parseUtilsDataArray(shapshot.val());
        //dispatch({type: 'ADD_CATEGORYLIST', payload: {list}});

        if (list)
          setTabs(
            list.map(function (element) {
              return {
                Text: element.Part,
                Id: element.id,
                List:
                  element.TableList != null
                    ? JSON.parse(element.TableList)
                    : [],
              };
            }),
          );
      });
  }, []);

  const [tabs, setTabs] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalQrVisible, setModalQrVisible] = useState(false);

  const handleFinish = () => {
    setModalVisible(false);
    setModalQrVisible(false);
  };
  const SaveTable = values => {
    let tableList = createTables(values);

    database()
      .ref('/TableList')
      .push()
      .set({
        Part: values.part,
        Abb: values.abbreviation,
        TableList: tableList,
      })
      .then(() => {
        handleFinish();
    
        toast.success({message:"Bölüm Kaydedildi"}) 

      });
  };
  const handleDeleteTab = () => {
    database()
      .ref(`TableList/${activeTab}`)
      .remove()
      .then(() => {

        toast.success({message:"Bölüm Silindi"}) 
      });
  };

  const handleChangeTab = id => {
    setActiveTab(id);
  };

  const createTables = values => {
    var tables = [];
    for (var i = 0; i < values.count; i++) {
      tables.push({name: `${values.abbreviation}-${i}`});
    }
    return JSON.stringify(tables);
  };

  return (
    <View style={Styles.container}>
      <MenuManegmentTab
        tabs={tabs}
        OnChangeTab={handleChangeTab}
        activeTab={activeTab}
        handleDeleteTab={handleDeleteTab}>
        <TableList
          list={
            activeTab != null
              ? tabs.filter(f => f.Id == activeTab)[0].List
              : null
          }
          onTableItem={() => setModalQrVisible(true)}
        />
      </MenuManegmentTab>
      <TableModal
        isVisible={isModalVisible}
        onClose={handleFinish}
        onSend={SaveTable}
      />
      <QrModal isVisible={isModalQrVisible} onClose={handleFinish} />
      <IconButton
        icon={{name: 'plus', size: 40, textColor: colors.white}}
        style={Styles.circleButton}
        handlePress={() => setModalVisible(true)}
        iconType={'IconMaterial'}
      />

    </View>
  );
};

export default TableManegment;
