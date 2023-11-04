import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from './SummaryTableHeader';
import InvoiceTableRow from './SummaryTableRow';
import InvoiceTableFooter from './SummaryTableFooter';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
  },
});


const InvoiceItemsTable = ({items}) => {
  if (items.length > 0) {
  return (
  <View style={styles.tableContainer} widows orphans >
    <InvoiceTableHeader items={items}/>
    <InvoiceTableRow items={items} />
    {/* <InvoiceTableFooter items={items} /> */}
  </View>
);
} else {
  return null
}
}

export default InvoiceItemsTable;