import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 0,
    flexDirection: 'row'
  },
  name: {
    width: '85%',
    textAlign: 'left',
    paddingLeft: 8,
    fontFamily: 'Helvetica-Oblique',
    fontSize: 10,
  },
  header: {
    paddingBottom: 20,
    fontFamily: 'Helvetica-Oblique',
    fontSize: 10,
  },
});

const HistoryBillHeader = ({name}) => (
  <View render={({ pageNumber }) => (
    pageNumber !== 1 && (
      <View style={styles.headerContainer} >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.header} render={({ pageNumber, totalPages }) => (
              `Page ${pageNumber} of  ${totalPages}`
            )}/>
      </View>
    )
  )} fixed />
);

export default HistoryBillHeader