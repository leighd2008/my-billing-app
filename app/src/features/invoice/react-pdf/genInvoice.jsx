import React, { Fragment } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import Header from './InvoiceHeader';
import InvoiceTitle from './InvoiceTitle';
import BillTo from './BillTo';
import InvoiceNo from './InvoiceNo';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceThankYouMsg from './InvoiceThankYouMsg';

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

const GenInvoice = ({invoiceData}) => {
  return (
    <Fragment>
      <PDFViewer width="850" height="600" className="app">
        <Document>
          <Page size="A4" style={styles.page}>
            <Header name={invoiceData.name}/>
            <InvoiceTitle />
            <BillTo invoiceData={invoiceData} />
            <InvoiceNo invoiceData={invoiceData} />
            <InvoiceItemsTable className='services' items={invoiceData.services} />
            <InvoiceItemsTable className='expenses' items={invoiceData.expenses} />
            <InvoiceItemsTable className='payments' items={invoiceData.payments} />
            <InvoiceThankYouMsg className='stuff' invoiceData={invoiceData} />
          </Page>
        </Document>
      </PDFViewer>
    </Fragment>
  );
}

export default GenInvoice;