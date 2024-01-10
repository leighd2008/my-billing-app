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
    <View style={styles.titleRow}>
      <Text style={styles.dateTime}>{currDate}</Text>
      <Text style={styles.title}>Scott L. Patterson, P.L.L.C</Text>
      <Text style={styles.page}></Text>
    </View>
    <View style={styles.titleRow}>
      <Text style={styles.dateTime}>{currTime}</Text>
      <Text style={styles.title}>Billing Worksheet Summary</Text>
      <Text style={styles.page} render={({ pageNumber }) => (`Page ${pageNumber}`)}/>
    </View>
    <View style={{
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      marginLeft: 0,
      marginRight: 4
    }} />
  </View>
);

export default InvoiceTitle;