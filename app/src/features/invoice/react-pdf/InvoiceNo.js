import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 20,
    justifyContent: 'flex-left'
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    marginRight: 20,
    justifyContent: 'flex-left'
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: 'bold',
  },
  label: {
    width: 60
  }
});

const InvoiceNo = ({invoiceData}) => (
  <Fragment>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Invoice No:</Text>
      <Text style={styles.invoiceDate}>{invoiceData.invoice_no}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date: </Text>
      <Text >{invoiceData.trans_date}</Text>
    </View>
  </Fragment>
);

export default InvoiceNo