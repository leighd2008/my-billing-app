import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import InvoiceTableFooter from './InvoiceTableFooter';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
});


const InvoiceItemsTable = ({items}) => {
  if (items.length > 0) {
  return (
  <View style={styles.tableContainer} widows orphans >
    <InvoiceTableHeader items={items}/>
    <InvoiceTableRow items={items} />
    <InvoiceTableFooter items={items} />
  </View>
);
} else {
  return null
}
}

export default InvoiceItemsTable;