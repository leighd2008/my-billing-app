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
      width: '20%',
      textAlign: 'left',
    },
    column2: {
      width: '90%',
      textAlign: 'left',
      paddingRight: 12,
    },
  });

  const SummaryTableHeader = () => {
    let tableContent = ''
    tableContent = (
      <View>
        <View style={styles.container}>
          <Text style={styles.column1}>ID:</Text>
          <Text style={styles.column1}>Type:</Text>
          <Text style={styles.column2}>Client</Text>
          <Text style={styles.column1}></Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.column1}>Date</Text>
          <Text style={styles.column1}>Invoice #</Text>
          <Text style={styles.column2}>Check Number</Text>
          <Text style={styles.column1}>Value</Text>
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