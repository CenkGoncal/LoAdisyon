import React, {useState} from 'react';
import {View, Dimensions, Text} from 'react-native';
import DrawChart from '../../companent/DrawChart/DrawChart';

import FilterPanel from '../../companent/FormElement/FilterPanel/FilterPanel';


const AdminPanel = () => {
  const [data, setData] = useState(null);
 const [dataPayment, setDataPayment] = useState(null);
  const [dataTotals, setDataTotals] = useState(null); 

  return (
    <View style={{flex: 1}}>
      <FilterPanel
        setData={setData}
        setDataPayment={setDataPayment}
        setDataTotals={setDataTotals}
      />
      <DrawChart
        data={data}
        dataPayment={dataPayment}
        dataTotals={dataTotals}
      />
    </View>
  );
};

export default AdminPanel;
