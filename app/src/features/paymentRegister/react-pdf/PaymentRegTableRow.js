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
    width: '20%',
    textAlign: 'left',
  },
  column2: {
    width: '90%',
    textAlign: 'left',
    paddingRight: 12,
  },
});


const PaymentRegTableRow = ({items}) => {
  let rows = ''
    rows = Object.keys(items[0].payments).map( (keyName, i) => (
      <View key={i}>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}>{items[0].payments[i].id}</Text>
          <Text style={styles.column1}>PAY</Text>
          <Text style={styles.column2}>{items[0].name}</Text>
          <Text style={styles.column1}>{''}</Text>
        </View>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}>{items[0].payments[i].date}</Text>
          <Text style={styles.column1}>{items[0].payments[i].invoice_no || 'na'}</Text>
          <Text style={styles.column2}>{'Check no'}</Text>
          <Text style={styles.column1}>({items[0].payments[i].amount})</Text>
        </View>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}></Text>
          <Text style={styles.column2}>Payment - Thank You</Text>
          <Text style={styles.column1}></Text>
          <Text style={styles.column1}></Text>
        </View>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}></Text>
          <Text style={styles.column1}></Text>
          <Text style={styles.column2}></Text>
          <Text style={styles.column1}></Text>
        </View>
      </View>
    ))
    
    return (<Fragment>{rows}</Fragment> )
};
  
export default PaymentRegTableRow