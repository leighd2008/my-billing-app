import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    date: {
      width: '15%',
  },
    description: {
        width: '60%',
        textAlign: 'left',
        paddingRight: 8,
    },
    description2: {
      width: '70%',
      textAlign: 'left',
      paddingRight: 8,
  },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingTop: 4,
        paddingRight: 8,
        borderTopWidth: 1,
        borderTopColor: 'grey',
    },
    hours: {
      width: '10%',
      textAlign: 'right',
      paddingTop: 4,
      paddingRight: 8,
      borderTopWidth: 1,
      borderTopColor: 'grey',
  },
  });

const InvoiceTableFooter = ({items}) => {
  let total
  let totalHours
  let totals
  if(items[0].chargeType==='task') {
    totalHours = items.map(item => item.hours * 1)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    total = items.map(item => item.hours * item.rate)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    totals = (
      <View style={styles.row}>
        <Text style={styles.date}></Text>
        <Text style={styles.description}>Total for professional services rendered</Text>
        <Text style={styles.hours}>{ Number.parseFloat(totalHours).toFixed(2)}</Text>
        <Text style={styles.total}>{ Number.parseFloat(total).toFixed(2)}</Text>
      </View>
    )
  } else if(items[0].chargeType==='expense') {
    total = items.map(item => item.fee * 1)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    totals = (
      <View style={styles.row}>
        <Text style={styles.date}></Text>
        <Text style={styles.description2}>Total additional charges</Text>
        <Text style={styles.total}>{ Number.parseFloat(total).toFixed(2)}</Text>
      </View>
    )
  } else if(!items[0].chargeType) {
    total = items.map(item => item.amount * 1)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    totals = (
      <View style={styles.row}>
        <Text style={styles.date}></Text>
        <Text style={styles.description2}>Total payments</Text>
        <Text style={styles.total}>{ Number.parseFloat(total).toFixed(2)}</Text>
      </View>
    )
  }
  
  return(    
      <Fragment>
        {totals}
      </Fragment>
  )
};
 
export default InvoiceTableFooter