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
  let rows = ''
    rows = Object.keys(items).map( (keyName, i) => (
      <View key={i}>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}>{items[keyName].name || 'Name'}</Text>
        </View>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}></Text>
          <Text style={styles.column2}>{(items[keyName].fees).toFixed(2) || 0.00}</Text>
          <Text style={styles.column2}>{items[keyName].unbillableFees || '0.00'}</Text>
          <Text style={styles.column2}>{(items[keyName].interest * 1).toFixed(2) || 0.00}</Text>
          <Text style={styles.column2}>{(items[keyName].payments).toFixed(2) || 0.00}</Text>
          <Text style={styles.column2}>{(items[keyName].priorBalance * 1).toFixed(2) || 0.00}</Text>
        </View>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}>{items[keyName].lastBill || " "}</Text>
          <Text style={styles.column2}>{(items[keyName].costs).toFixed(2) || 0.00}</Text>
          <Text style={styles.column2}>{(items[keyName].unbillableCosts) || '0.00'}</Text>
          <Text style={styles.column2}>{(items[keyName].finCharge) || '0.00'}</Text>
          <Text style={styles.column2}>{(items[keyName].credits).toFixed(2) || 0.00}</Text>
          <Text style={styles.column2}>{(items[keyName].newCharges * 1).toFixed(2) || 0.00}</Text>
        </View>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}>{items[keyName].lastCharge || " "}</Text>
          <Text style={styles.column2}>{(items[keyName].hours).toFixed(2) || '0:00'}</Text>
          <Text style={styles.column2}>{(items[keyName].unbillableHours) || '0.00'}</Text>
          <Text style={styles.column2}>{(items[keyName].taxFees) || '0.00'}</Text>
          <Text style={styles.column2}>{(items[keyName].wrtOffs) || '0.00'}</Text>
          <Text style={styles.column2}>{(items[keyName].newAR).toFixed(2) || 0.00}</Text>
        </View>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}></Text>
          <Text style={styles.column2}></Text>
          <Text style={styles.column2}></Text>
          <Text style={styles.column2}>{(items[keyName].taxCosts || '0.00')}</Text>
          <Text style={styles.column2}>{(items[keyName].refunds || '0.00')}</Text>
          <Text style={styles.column2}>{(items[keyName].newBalance)}</Text>
        </View>
      </View>
    ))
    
    return (<Fragment>{rows}</Fragment> )
};
  
export default SummaryTableRow