import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 18,
        fontStyle: 'bold',
        marginTop: 12
        // flexGrow: 1,
    },
    description2: {
        width: '85%',
        textAlign: 'left',
        paddingRight: 8,
    },
    amount: {
      width: '15%',
      textAlign: 'right',
      paddingRight: 8,
    },
    titleContainer:{
        flexDirection: 'row',
        marginTop: 12
    },
    reportTitle:{
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
  });


  const InvoiceThankYouMsg = ({invoiceData}) => {
    let tableContent = ''
    tableContent = tableContent = (
      <Fragment>
        <View style={styles.container}>
          <Text style={styles.description2}>Interest Charges</Text>
          <Text style={styles.amount}>{invoiceData.interestCharges.toFixed(2)}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.description2}>Total Charges for this Bill</Text>
          <Text style={styles.amount}>{invoiceData.totalCharges}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.description2}>Previous Balance</Text>
          <Text style={styles.amount}>{invoiceData.prevBalance.toFixed(2)}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.description2}>Total Payments and Adjustments</Text>
          <Text style={styles.amount}>{invoiceData.totalPayments.toFixed(2)}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.description2}>Balance Due</Text>
          <Text style={styles.amount}>{invoiceData.balance.toFixed(2)}</Text>
        </View>
      </Fragment>
    )
    return(
      <Fragment>
        {tableContent}
        <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>Thank you for your business</Text>
        </View>
      </Fragment>
    )
  };
  
  export default InvoiceThankYouMsg