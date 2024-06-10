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


const HistoryBillTableRow = ({items}) => {
  let rows = ''
    rows = Object.keys(items[0].services).map( (keyName, i) => (
      <View key={i}>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}>{items[0].services[i].date}</Text>
          <Text style={styles.column2}>{items[0].services[i].category}</Text>
          <Text style={styles.column1}>{items[0].services[i].hours}</Text>
          <Text style={styles.column1}>{items[0].services[i].total}</Text>
        </View>
        <View style={styles.container} key={i}>
          <Text style={styles.column1}></Text>
          <Text style={styles.column2}></Text>
          <Text style={styles.column1}></Text>
          <Text style={styles.column1}></Text>
        </View>
      </View>
    ))
    
    return (<Fragment>{rows}</Fragment> )
};
  
export default HistoryBillTableRow