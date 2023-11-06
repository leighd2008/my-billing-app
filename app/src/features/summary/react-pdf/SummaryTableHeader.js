import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // height: 24,
        textAlign: 'center',
        fontSize: 12,
        fontStyle: 'bold',
        flexGrow: 1,
    },
    column1: {
      width: '12%',
      textAlign: 'left',
    },
    column2: {
      width: '19%',
      textAlign: 'right',
      paddingRight: 12,
    },
  });

  const SummaryTableHeader = () => {
    let tableContent = ''
    tableContent = (
      <View>
        <View style={styles.container}>
          <Text style={styles.column1}></Text>
          <Text style={styles.column2}>Billable:</Text>
          <Text style={styles.column2}>Unbillable:</Text>
          <Text style={styles.column2}>Interest</Text>
          <Text style={styles.column2}>Payments</Text>
          <Text style={styles.column2}>Prior bal</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.column1}>Client</Text>
          <Text style={styles.column2}>Fees</Text>
          <Text style={styles.column2}>Fees</Text>
          <Text style={styles.column2}>Fin charge</Text>
          <Text style={styles.column2}>Credits</Text>
          <Text style={styles.column2}>New charges</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.column1}>Last bill</Text>
          <Text style={styles.column2}>Costs</Text>
          <Text style={styles.column2}>Costs</Text>
          <Text style={styles.column2}>Tax fees</Text>
          <Text style={styles.column2}>Wrt offs</Text>
          <Text style={styles.column2}>New A/R</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.column1}>Last charge</Text>
          <Text style={styles.column2}>Hours</Text>
          <Text style={styles.column2}>Hours</Text>
          <Text style={styles.column2}>Tax costs</Text>
          <Text style={styles.column2}>Refunds</Text>
          <Text style={styles.column2}>New bal</Text>
        </View>
        <View style={{
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      marginLeft: 0,
      marginRight: 4
    }} />
      </View>
      )
    return(
      <Fragment>
        {tableContent}
      </Fragment>
    )
  }        
  export default SummaryTableHeader