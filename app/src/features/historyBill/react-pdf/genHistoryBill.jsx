import React, { Fragment } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import Header from './HistoryBill';
import HistoryBillTitle from './HistoryBillTitle';
import BillTo from './BillTo';
import HistoryBillNo from './HistoryBillNo';
import HistoryBillItemsTable from './HistoryBillItemsTable';
import HistoryBillThankYouMsg from './HistoryBillThankYouMsg';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    lineHeight: 1.5,
    flexDirection: 'column',
  }
});

const GenHistoryBill = ({historyBillData}) => {
  return (
    <Fragment>
      <PDFViewer width="850" height="600" className="app">
        <Document>
          <Page size="A4" style={styles.page}>
            {/* <Header name={invoiceData.name}/> */}
            <HistoryBillTitle />
            {/* <BillTo invoiceData={invoiceData} /> */}
            {/* <HistoryBillNo invoiceData={invoiceData} /> */}
            <HistoryBillItemsTable className='services' items={historyBillData}></HistoryBillItemsTable>
            {/* <HistoryBillItemsTable className='expenses' items={invoiceData.expenses} /> */}
            {/* <HistoryBillItemsTable className='payments' items={invoiceData.payments} /> */}
            <HistoryBillThankYouMsg className='stuff' items={historyBillData} />
          </Page>
        </Document>
      </PDFViewer>
    </Fragment>
  );
}

export default GenHistoryBill;