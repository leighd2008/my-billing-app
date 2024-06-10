import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../components/Auth";

import { selectAllClients, fetchClients, selectClientById } from "../clients/clientsSlice";

import GenHistoryBill from './react-pdf/genHistoryBill'

const HistoryBill = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (!currentUser ) {
      alert('Please login to access this page')
      return navigate('/')
    }
  }, [currentUser])
  
  const { state } = useLocation()
  
  let historyBillData
  state ? historyBillData = state.historyBillData : null

  console.log(historyBillData)
  
  return (
    <React.Fragment>
      <section className="section">
        <div className="centered-view">
          <section className="centered-container">
            <div className="header">Generate a History Bill</div>
            {/* <form >
              {invoiceContent}
            </form> */}
          </section>
        </div>
          <section className="centered-container">
            {historyBillData 
              ? <GenHistoryBill historyBillData={historyBillData} />
              : null}
          </section>
      </section>
    </React.Fragment>
    );
}

export default HistoryBill;