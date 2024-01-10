import React from "react";
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
});

const InvoiceTitle = ({title}) => (
  <View style={styles.titleContainer}>
    <Text>Scott L. Patterson, P.L.L.C</Text>
    <Text>5420 S. Lakeshore Dr., Ste. 101</Text>
    <Text>Tempe, AZ 85283</Text>
  </View>
);

export default InvoiceTitle;