import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    date: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'left',
        paddingRight: 8,
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    description2: {
        width: '70%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    hours: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableRow = ({items}) => {
  let rows = ''
  console.log(items[0].chargeType)
  if(items[0].chargeType === 'task') {
    rows = items.map( item => 
      <View style={styles.row} key={item.id}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.description}>{item.category}</Text>
        <Text style={styles.hours}>{item.hours}</Text>
        <Text style={styles.amount}>{(item.hours * item.rate).toFixed(2)}</Text>
      </View>
    )} else if(items[0].chargeType === 'expense') {
      rows = items.map( item =>
        <View style={styles.row} key={item.id}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.description2}>{item.category}</Text>
        <Text style={styles.amount}>{(item.fee * 1).toFixed(2)}</Text>
      </View>
      )
    } else if(!items[0].chargeType) {
      rows = items.map( item =>
        <View style={styles.row} key={item.id}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.description2}>Payment - Thank You!</Text>
        <Text style={styles.amount}>{(item.amount * 1).toFixed(2)}</Text>
      </View>)
    } else {
      <Text >No items in file</Text>
    }
    
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableRow