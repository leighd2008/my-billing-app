import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../components/Auth";

import { selectAllClients, fetchClients, selectClientById } from "../clients/clientsSlice";

import GenPaymentReg from './react-pdf/genPaymentReg'

const PaymentReg = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (!currentUser ) {
      alert('Please login to access this page')
      return navigate('/')
    }
  }, [currentUser])
  
  const { state } = useLocation()
  
  let paymentRegData
  state ? paymentRegData = state.paymentRegData : null

  console.log(paymentRegData)
  
  return (
    <React.Fragment>
      <section className="section">
        <div className="centered-view">
          <section className="centered-container">
            <div className="header">Generate a payment register</div>
            {/* <form >
              {invoiceContent}
            </form> */}
          </section>
        </div>
          <section className="centered-container">
            {paymentRegData 
              ? <GenPaymentReg paymentRegData={paymentRegData} />
              : null}
            {/* {pastInvData 
            ? <GenPaymentReg invoiceData={pastInvData} /> : null} */}
          </section>
      </section>
    </React.Fragment>
    );
}

export default PaymentReg;