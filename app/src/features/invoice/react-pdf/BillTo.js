import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: 'Helvetica-Oblique'
  },
});

const BillTo = ({invoiceData}) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Bill To:</Text>
    <Text>{invoiceData.name}</Text>
    <Text>{invoiceData.address1}</Text>
    <Text>{invoiceData.address2}</Text>
    <Text>{invoiceData.email}</Text>
  </View>
);

export default BillTo