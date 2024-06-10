import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import HistoryBillTableHeader from './HistoryBillTableHeader';
import HistoryBillTableRow from './HistoryBillTableRow';
import HistoryBillTableFooter from './HistoryBillTableFooter';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
  },
});


const HistoryBillItemsTable = ({items}) => {
  // if (items.length > 0) {
  return (
  <View style={styles.tableContainer} widows orphans >
    <HistoryBillTableHeader />
    <HistoryBillTableRow items={items} />
    {/* <HistoryBillTableFooter items={items} /> */}
  </View>
);
// } else {
//   return null
// }
}

export default HistoryBillItemsTable;