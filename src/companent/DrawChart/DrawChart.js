import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {LineChart, PieChart} from 'react-native-chart-kit';

import MenuManegmentTab from '../../companent/Tabs/MenuManegmentTab/MenuManegmentTab';
import styles from "./Style";

const DrawChart = ({data, dataPayment, dataTotals}) => {

  const tabs = [
    {Text: 'Fiyat', Id: 'Price'},
    {Text: 'Adet', Id: 'Amount'},
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].Id);

  const DataNotFoundForDrawChart = () => {
    return (
      <Text style={{textAlign: 'center', fontSize: 16, color: 'red'}}>
        Yapılan Satış Bulunamadı{' '}
      </Text>
    );
  };

  if (data == null && dataPayment == null) return null;

  const DrawLineChart = () => {
    let chartConfig2 = {...styles.chartStyle.config};
    chartConfig2.decimalPlaces = 0;

    return (
      <View
        style={styles.center}>
        <Text style={styles.infoPanel}>
          Ödeme Yöntemine Göre Satış Dağılımı
        </Text>
        <LineChart
          width={styles.chartStyle.width}
          height={styles.chartStyle.height}
          chartConfig={chartConfig2}
          yAxisSuffix={activeTab == 'Price' ? ' ₺' : ' Adet'}
          data={activeTab == 'Price' ? dataPayment[0] : dataPayment[1]}
        />
      </View>
    );
  };

  const DrawPieChart = () => {
    return (
      <View
      style={styles.center}>
        <Text style={styles.infoPanel}>
          Ürüne Göre Satış Dağılımı
        </Text>
        <PieChart
          data={data}
          width={styles.chartStyle.width}
          height={styles.chartStyle.height}
          chartConfig={styles.chartStyle.config}
          accessor={activeTab == 'Price' ? 'TotalPrice' : 'Quantity'}
          backgroundColor="lightgray"
          paddingLeft="15"
          absolute
        />
      </View>
    );
  };

  const DataTotals = () => {

    if(!dataTotals) return null;

    return (
      <View style={styles.pullBottom}>
        <View
          style={styles.center2}>
          <Text
            style={styles.infoPanel2}>
            {activeTab == 'Price'
              ? 'Toplam Satış: ' + dataTotals.TotalSalesPrice + ' ₺'
              : 'Toplam Satılan Ürün Adedi: ' +
                dataTotals.TotalQuantity +
                ' Adet'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <MenuManegmentTab
        tabs={tabs}
        OnChangeTab={setActiveTab}
        activeTab={activeTab}>
        {data != null ? <DrawPieChart /> : <DataNotFoundForDrawChart />}
        {dataPayment != null && dataPayment.length > 0 ? (
          <DrawLineChart />
        ) : (
          <DataNotFoundForDrawChart />
        )}
      </MenuManegmentTab>
      <DataTotals />
    </>
  );
};

export default DrawChart;
