import React,{ useState, useEffect } from 'react';
import {View, DeviceEventEmitter} from 'react-native';
import {useSelector} from 'react-redux';

import { getOrderReport } from '../../../pages/TableDetail/userFuncLib';
import { PaymentMethods } from '../../../utilities/Constants';
import toast from '../../../utilities/toast';
import DateInput from '../DateInput/DateInput';
import IconButton from '../IconButton';
import Styles from './style';

 const FilterPanel = ({setData, setDataPayment, setDataTotals, customFunc = null, filters = null}) => {

    const [isFilterShow, setFilterShow] = useState(false);
    const [startDate, setStartDate] = useState(filters != null ? new Date(filters.startDate) : new Date());
    const [endDate, setEndDate] = useState(filters != null ? new Date(filters.endDate) : new Date());
    const productList = useSelector(s => s.productList);
  
    const arrangeFilterPanel = () => {
      let state = isFilterShow;
      setFilterShow(!state);
    };
  
    useEffect(() => {
      var listener =  DeviceEventEmitter.addListener('SHOW_FILTER', arrangeFilterPanel);
      if(customFunc == null)
        ReportFilter();

      return () => { 
        listener.remove();
      };
    }, [isFilterShow]);

  
    const ReportFilter = () => {
      let filters = {startDate, endDate};

      var diffDays = parseInt((endDate - startDate) / (1000 * 60 * 60 * 24), 10); 
      if(diffDays < 0)
      {
        toast.danger({message:"2.Tarih 1.Tarih'den kücük olmamalı"});
        return;
      }

      if(customFunc != null)
      {
        console.log(diffDays);
        if(diffDays > 1)
        {
          toast.danger({message:"İki tarih arasında 1 günden fazla olmamalı"});
          return;
        }

        customFunc(filters)
      }
      else
      { // Report Filter Admin
        getOrderReport(filters, arr => {
          arrangeLineChartData(arr);
          arrangePieChartData(arr);
  
          setDataTotals(arr[2])
        });
      }
    };
  
    const arrangePieChartData = (arr) => {
      let newArr = arr[0].map(val => {
        let item = productList.filter(f => f.id == val.id)[0];
        val.name = item ? item.ProductName : '';
        val.color =
          '#' +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
        val.legendFontColor = '#7F7F7F';
        val.legendFontSize = 15;
        return val;
      });

      setData(newArr);
    }

    const arrangeLineChartData = (arr) => {

      let nakit =  arr[1].filter(f=>f.id == PaymentMethods.Cash).length > 0 ? arr[1].filter(f=>f.id == PaymentMethods.Cash)[0].TotalPrice : 0;
      let krediKartı =  arr[1].filter(f=>f.id == PaymentMethods.CreditCard).length > 0 ? arr[1].filter(f=>f.id ==  PaymentMethods.CreditCard)[0].TotalPrice : 0;

      let newArr1 = {
          labels: ['Nakit', 'KrediKartı'],
          datasets: [
            {
              data: [nakit , krediKartı],
              strokeWidth: 2,
            },
          ],
        };

        let nakit1 =  arr[1].filter(f=>f.id == PaymentMethods.Cash).length > 0 ? arr[1].filter(f=>f.id == PaymentMethods.Cash)[0].Quantity : 0;
        let krediKartı1 =  arr[1].filter(f=>f.id == PaymentMethods.CreditCard).length > 0 ? arr[1].filter(f=>f.id ==  PaymentMethods.CreditCard)[0].Quantity : 0;
  
        let newArr2 = {
            labels: ['Nakit', 'KrediKartı'],
            datasets: [
              {
                data: [nakit1 , krediKartı1],
                strokeWidth: 2,
              },
            ],
          };

      setDataPayment([newArr1,newArr2]);

    }

    return (
      <View>
        {isFilterShow && (
          <View style={Styles.row}>
            <View style={Styles.flex}>
              <DateInput date={startDate} setDate={setStartDate} />
              <DateInput date={endDate} setDate={setEndDate} />
            </View>
            <IconButton
              text={'Filtele'}
              style={Styles.searchBt}
              icon={{name: 'search', size: 30, textColor: 'white'}}
              handlePress={ReportFilter}></IconButton>
          </View>
        )}
      </View>
    );
  };

  export default FilterPanel;
