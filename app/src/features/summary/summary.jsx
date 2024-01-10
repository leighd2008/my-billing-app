import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../components/Auth";

import { selectAllClients, fetchClients, selectClientById } from "../clients/clientsSlice";

import GenSummary from './react-pdf/genSummary'

const Summary = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (!currentUser ) {
      alert('Please login to access this page')
      return navigate('/')
    }
  }, [currentUser])
  
  const { state } = useLocation()
  
  let summaryData
  state ? summaryData = state.summaryData : null
  
  return (
    <React.Fragment>
      <section className="section">
        <div className="centered-view">
          <section className="centered-container">
            <div className="header">Generate a summary</div>
            {/* <form >
              {invoiceContent}
            </form> */}
          </section>
        </div>
          <section className="centered-container">
            {summaryData 
              ? <GenSummary summaryData={summaryData} />
              : null}
            {/* {pastInvData 
            ? <GenSummary invoiceData={pastInvData} /> : null} */}
          </section>
      </section>
    </React.Fragment>
    );
}

export default Summary;