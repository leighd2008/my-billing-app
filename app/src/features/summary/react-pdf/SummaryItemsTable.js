import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import SummaryTableHeader from './SummaryTableHeader';
import SummaryTableRow from './SummaryTableRow';
import SummaryTableFooter from './SummaryTableFooter';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
  },
});


const InvoiceItemsTable = (/*{items}*/) => {
  // if (items.length > 0) {
  return (
  <View style={styles.tableContainer} widows orphans >
    <SummaryTableHeader />
    {/* <SummaryTableRow items={items} /> */}
    {/* <SummaryTableFooter items={items} /> */}
  </View>
);
// } else {
//   return null
// }
}

export default InvoiceItemsTable;