import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 0,
    flexDirection: 'row'
  },
  header: {
    paddingBottom: 20,
    fontFamily: 'Helvetica-Oblique',
    fontSize: 10,
  },
});

const Header = ({name}) => (
  <View render={({ pageNumber }) => (
    pageNumber !== 1 && (
      <View style={styles.headerContainer} >
        <Text style={styles.header} render={({ pageNumber, totalPages }) => (
              `${name} Page ${pageNumber} of  ${totalPages}`
            )}/>
      </View>
    )
  )} fixed />
);

export default Header