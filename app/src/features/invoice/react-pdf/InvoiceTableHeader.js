import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    date: {
        width: '15%',
    },
    description: {
        width: '60%',
    },
    description2: {
        width: '70%',
    },
    hours: {
        width: '10%',
    },
    amount: {
      width: '15%',
      textAlign: 'right',
      paddingRight: 8,
    },
  });

  const InvoiceTableHeader = ({items}) => {
    let tableContent = ''
    if(!items.length) {
      
    } else if(items[0].chargeType === 'task') {
      tableContent = (
        <View style={styles.container}>
          <Text style={styles.date}>Date</Text>
          <Text style={styles.description}>Professional Services</Text>
          <Text style={styles.hours}>Hours</Text>
          <Text style={styles.amount}>Amount</Text>
        </View>
      )
    } else if(items[0].chargeType === 'expense') {
      tableContent = tableContent = (
        <View style={styles.container}>
          <Text style={styles.date}></Text>
          <Text style={styles.description2}>Additional Charges</Text>
          <Text style={styles.amount}></Text>
        </View>
      )
    }else if(!items[0].chargeType) {
      tableContent = tableContent = (
        <View style={styles.container}>
          <Text style={styles.date}></Text>
          <Text style={styles.description2}>Payments</Text>
          <Text style={styles.amount}></Text>
        </View>
      )
    }
    return(
      <Fragment>
        {tableContent}
      </Fragment>
    )
          
  }
  export default InvoiceTableHeader