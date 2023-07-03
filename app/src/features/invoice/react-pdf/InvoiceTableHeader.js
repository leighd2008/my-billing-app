import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    date: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    description: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    description2: {
        width: '70%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    hours: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });

  const InvoiceTableHeader = ({items}) => {
    let tableContent = ''
    if(items[0].chargeType === 'task') {
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
          <Text style={styles.date}>Date</Text>
          <Text style={styles.description2}>Additional Charges</Text>
          {/* <Text style={styles.hours}>Hours</Text> */}
          <Text style={styles.amount}>Amount</Text>
        </View>
      )
    }else if(!items[0].chargeType) {
      tableContent = tableContent = (
        <View style={styles.container}>
          <Text style={styles.date}>Date</Text>
          <Text style={styles.description2}>Payments</Text>
          {/* <Text style={styles.hours}>Hours</Text> */}
          <Text style={styles.amount}>Amount</Text>
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