import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import InvoiceTableFooter from './InvoiceTableFooter';

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    // borderWidth: 1,
    // borderColor: 'grey',
  },
});


const InvoiceItemsTable = ({items}) => {
  console.log(items)
  console.log(items.length)
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