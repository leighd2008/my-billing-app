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
    borderWidth: 1,
    borderColor: '#bff0fd',
  },
});


const InvoiceItemsTable = ({items}) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader items={items}/>
    <InvoiceTableRow items={items} />
    <InvoiceTableFooter items={items} />
  </View>
);

export default InvoiceItemsTable;