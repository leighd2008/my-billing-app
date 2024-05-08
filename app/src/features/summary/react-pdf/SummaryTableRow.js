import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 12,
      fontStyle: 'bold',
      flexGrow: 1,
  },
  column1: {
    width: '17%',
    textAlign: 'left',
  },
  column2: {
    width: '18%',
    textAlign: 'right',
    paddingRight: 12,
  },
});


const SummaryTableRow = ({items}) => {
  console.log(items)
  let rows = ''
    rows = Object.keys(items).map( (keyName, i) => (
      <View key={i}>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}>{items[keyName][0].name || 'Name'}</Text>
        </View>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}></Text>
          <Text style={styles.column2}>{(items[keyName][0].fees * 1).toFixed(2) || 0.00}</Text>
          <Text style={styles.column2}>{items[keyName][0].unbillableFees || "0.00"}</Text>
          <Text style={styles.column2}>{(items[keyName][0].interest * 1).toFixed(2) || 0.00}</Text>
          <Text style={styles.column2}>{(items[keyName][0].payments* 1).toFixed(2) || 0.00}</Text>
          <Text style={styles.column2}>{(items[keyName][0].priorBalance * 1).toFixed(2) || 0.00}</Text>
        </View>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}>{items[keyName][0].lastBill || " "}</Text>
          <Text style={styles.column2}>{(items[keyName][0].costs* 1).toFixed(2) || 0.00}</Text>
          <Text style={styles.column2}>{(items[keyName][0].unbillableCosts) || '0.00'}</Text>
          <Text style={styles.column2}>{(items[keyName][0].finCharge) || '0.00'}</Text>
          <Text style={styles.column2}>{(items[keyName][0].credits* 1).toFixed(2) || 0.00}</Text>
          <Text style={styles.column2}>{(items[keyName][0].newCharges * 1).toFixed(2) || 0.00}</Text>
        </View>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}>{items[keyName][0].lastCharge || " "}</Text>
          <Text style={styles.column2}>{(items[keyName][0].hours* 1).toFixed(2) || '0:00'}</Text>
          <Text style={styles.column2}>{(items[keyName][0].unbillableHours) || '0.00'}</Text>
          <Text style={styles.column2}>{(items[keyName][0].taxFees) || '0.00'}</Text>
          <Text style={styles.column2}>{(items[keyName][0].wrtOffs) || '0.00'}</Text>
          <Text style={styles.column2}>{(items[keyName][0].newAR* 1).toFixed(2) || 0.00}</Text>
        </View>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}></Text>
          <Text style={styles.column2}></Text>
          <Text style={styles.column2}></Text>
          <Text style={styles.column2}>{(items[keyName][0].taxCosts || '0.00')}</Text>
          <Text style={styles.column2}>{(items[keyName][0].refunds || '0.00')}</Text>
          <Text style={styles.column2}>{(items[keyName][0].newBalance)}</Text>
        </View>
      </View>
    ))
    
    return (<Fragment>{rows}</Fragment> )
};
  
export default SummaryTableRow