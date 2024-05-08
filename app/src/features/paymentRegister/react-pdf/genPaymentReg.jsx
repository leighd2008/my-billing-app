import React, { Fragment } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import Header from './PaymentReg';
import PaymentRegTitle from './PaymentRegTitle';
import BillTo from './BillTo';
import PaymentRegNo from './PaymentRegNo';
import PaymentRegItemsTable from './PaymentRegItemsTable';
import PaymentRegThankYouMsg from './PaymentRegThankYouMsg';

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

const GenPaymentReg = ({paymentRegData}) => {
  return (
    <Fragment>
      <PDFViewer width="850" height="600" className="app">
        <Document>
          <Page size="A4" style={styles.page}>
            {/* <Header name={invoiceData.name}/> */}
            <PaymentRegTitle />
            {/* <BillTo invoiceData={invoiceData} /> */}
            {/* <PaymentRegNo invoiceData={invoiceData} /> */}
            <PaymentRegItemsTable className='services' items={paymentRegData}></PaymentRegItemsTable>
            {/* <PaymentRegItemsTable className='expenses' items={invoiceData.expenses} /> */}
            {/* <PaymentRegItemsTable className='payments' items={invoiceData.payments} /> */}
            <PaymentRegThankYouMsg className='stuff' items={paymentRegData} />
          </Page>
        </Document>
      </PDFViewer>
    </Fragment>
  );
}

export default GenPaymentReg;