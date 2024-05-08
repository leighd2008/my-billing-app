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
        width: '90%',
        textAlign: 'left',
        paddingRight: 8,
    },
    amount: {
      width: '13%',
      textAlign: 'left',
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


  const InvoiceThankYouMsg = ({items}) => {
    console.log(items)
    let tableContent = ''
    tableContent = tableContent = (
      <Fragment>
        <View>
          <View style={styles.container}>
            <text style={styles.description2}>    </text>
            <text style={{
                width: '15%',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginLeft: 0,
                marginRight: 4
              }} />
          </View>
          <View style={styles.container}>
            <Text style={styles.description2}>Grand Total Payment</Text>
            <Text style={styles.amount}>({items[0].totalPayments.toFixed(2)})</Text>
          </View>
        </View>
      </Fragment>
    )
    return(
      <Fragment>
        {tableContent}
      </Fragment>
    )
  };
  
  export default InvoiceThankYouMsg