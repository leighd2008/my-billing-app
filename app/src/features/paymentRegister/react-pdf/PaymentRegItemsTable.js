import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import PaymentRegTableHeader from './PaymentRegTableHeader';
import PaymentRegTableRow from './PaymentRegTableRow';
import PaymentRegTableFooter from './PaymentRegTableFooter';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
  },
});


const PaymentRegItemsTable = ({items}) => {
  // if (items.length > 0) {
  return (
  <View style={styles.tableContainer} widows orphans >
    <PaymentRegTableHeader />
    <PaymentRegTableRow items={items} />
    {/* <PaymentRegTableFooter items={items} /> */}
  </View>
);
// } else {
//   return null
// }
}

export default PaymentRegItemsTable;