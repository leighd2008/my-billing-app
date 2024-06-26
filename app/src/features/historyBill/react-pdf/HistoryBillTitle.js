import React, { Fragment } from "react";
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  dateTime: {
    width: '20%',
    textAlign: 'left',
    paddingRight: 8,
  },
  title: {
    width: '60%',
    textAlign: 'center',
    paddingLeft: 8,
  },
  page: {
    width: '20%',
    textAlign: 'right',
    paddingRight: 8,
  },
});

let curr = new Date()
  curr.setDate(curr.getDate())
  // let currDate = curr.toISOString().substring(0,10)
  let currDate = curr.toLocaleDateString()
  let currTime = curr.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "2-digit"
  })

const InvoiceTitle = ({title}) => (
  <View style={styles.titleContainer}>
    {/* <View style={styles.titleRow}>
      <Text style={styles.dateTime}>{currDate}</Text>
      <Text style={styles.title}>History Bill</Text>
      <Text style={styles.page} render={({ pageNumber }) => (`Page ${pageNumber}`)}/>
    </View>
    <View style={styles.titleRow}>
      <text></text>
    </View> */}
    <View style={styles.titleContainer}>
      <Text>Scott L. Patterson, P.L.L.C</Text>
      <Text>5420 S. Lakeshore Dr., Ste. 101</Text>
      <Text>Tempe, AZ 85283</Text>
    </View>
  </View>
);

export default InvoiceTitle;