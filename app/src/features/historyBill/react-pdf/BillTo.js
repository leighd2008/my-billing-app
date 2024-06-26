import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20
  },
  billTo: {
    marginTop: 10,
    paddingBottom: 3,
    fontFamily: 'Helvetica-Oblique'
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

const BillTo = ({historyBillData}) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Invoice submitted to:</Text>
    <Text>{historyBillData[0].name}</Text>
    <Text>{historyBillData[0].address1}</Text>
    <Text>{historyBillData[0].address2}</Text>
    <Text style={styles.dateTime}>      </Text>
    <Text style={styles.dateTime}>{currDate}</Text>
  </View>
);

export default BillTo