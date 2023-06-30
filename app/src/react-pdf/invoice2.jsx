import React, { Component, Fragment } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle';
import BillTo from './BillTo';
import InvoiceNo from './InvoiceNo';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceThankYouMsg from './InvoiceThankYouMsg';
// import logo from '../../../src/logo.svg';
import invoice from './data/invoice-data';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logo: {
    width: 74,
    height: 68,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

const Invoice = () => {
  
  return (
    <Fragment>
        <PDFViewer width="1000" height="600" className="app">
          <Document>
            <Page size="A4" style={styles.page}>
              {/* <Image style={styles.logo} src={logo} /> */}
              <InvoiceTitle title="Invoice" />
              <InvoiceNo invoice={invoice} />
              <BillTo invoice={invoice} />
              <InvoiceItemsTable invoice={invoice} />
              <InvoiceThankYouMsg />
            </Page>
          </Document>
        </PDFViewer>
      </Fragment>
  );
}

export default Invoice;