import React, { Fragment } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle';
import BillTo from './BillTo';
import InvoiceNo from './InvoiceNo';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceThankYouMsg from './InvoiceThankYouMsg';
import invoice from './data/invoice-data';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  }
});

const GenInvoice = ({invoiceData}) => {
  
  return (
    <Fragment>
        <PDFViewer width="850" height="600" className="app">
          <Document>
            <Page size="A4" style={styles.page}>
              <InvoiceTitle />
              <BillTo invoiceData={invoiceData} />
              <InvoiceNo invoiceData={invoiceData} />
              <InvoiceItemsTable invoice={invoice} />
              <InvoiceThankYouMsg />
            </Page>
          </Document>
        </PDFViewer>
      </Fragment>
  );
}

export default GenInvoice;