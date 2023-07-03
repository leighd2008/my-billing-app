import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });

const InvoiceTableFooter = ({items}) => {
  let total
  if(items[0].chargeType==='task') {
    total = items.map(item => item.hours * item.rate)
        .reduce((accumulator, currentValue) => accumulator + currentValue , 0)
  } else if(items[0].chargeType==='expense') {
    total = items.map(item => item.fee * 1)
        .reduce((accumulator, currentValue) => accumulator + currentValue , 0)
  } else if(!items[0].chargeType) {
    total = items.map(item => item.amount * 1)
        .reduce((accumulator, currentValue) => accumulator + currentValue , 0)
  }
  
  return(    
      <View style={styles.row}>
          <Text style={styles.description}>TOTAL</Text>
          <Text style={styles.total}>{ Number.parseFloat(total).toFixed(2)}</Text>
      </View>
  )
};
 
export default InvoiceTableFooter