import React, { Fragment } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import Header from './Summary';
import SummaryTitle from './SummaryTitle';
import BillTo from './BillTo';
import SummaryNo from './SummaryNo';
import SummaryItemsTable from './SummaryItemsTable';
import SummaryThankYouMsg from './SummaryThankYouMsg';

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

const GenSummary = ({summaryData}) => {
  return (
    <Fragment>
      <PDFViewer width="850" height="600" className="app">
        <Document>
          <Page size="A4" style={styles.page}>
            {/* <Header name={invoiceData.name}/> */}
            <SummaryTitle />
            {/* <BillTo invoiceData={invoiceData} /> */}
            {/* <SummaryNo invoiceData={invoiceData} /> */}
            <SummaryItemsTable className='services' /*items={summaryData}*/></SummaryItemsTable>
            {/* <SummaryItemsTable className='expenses' items={invoiceData.expenses} /> */}
            {/* <SummaryItemsTable className='payments' items={invoiceData.payments} /> */}
            {/* <SummaryThankYouMsg className='stuff' invoiceData={invoiceData} /> */}
          </Page>
        </Document>
      </PDFViewer>
    </Fragment>
  );
}

export default GenSummary;